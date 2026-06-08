import request from 'supertest';

import app from '../../../app';
import { prisma } from '../../../lib/prisma';
import { HttpStatus } from '@shared/constants/httpStatus';

describe('Analytics API', () => {
  beforeEach(async () => {
    await prisma.employee.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/v1/analytics/job-titles', () => {
    it('should return average salary by job title', async () => {
      const suffix = Date.now();

      await prisma.employee.createMany({
        data: [
          {
            employeeCode: `EMP-${suffix}-1`,
            firstName: 'John',
            lastName: 'Doe',
            email: `john-${suffix}-1@test.com`,
            country: 'India',
            department: 'Engineering',
            jobTitle: 'Software Engineer',
            salary: 100000,
            currency: 'INR',
            employmentType: 'FULL_TIME',
            dateOfJoining: new Date(),
            isDeleted: false,
          },
          {
            employeeCode: `EMP-${suffix}-2`,
            firstName: 'Jane',
            lastName: 'Doe',
            email: `jane-${suffix}-2@test.com`,
            country: 'India',
            department: 'Engineering',
            jobTitle: 'Software Engineer',
            salary: 200000,
            currency: 'INR',
            employmentType: 'FULL_TIME',
            dateOfJoining: new Date(),
            isDeleted: false,
          },
        ],
      });

      const response = await request(app).get('/api/v1/analytics/job-titles').query({
        country: 'India',
      });

      expect(response.status).toBe(HttpStatus.OK);

      expect(response.body.response).toEqual([
        {
          jobTitle: 'Software Engineer',
          averageSalary: 150000,
        },
      ]);
    });

    it('should return empty array when no employees exist', async () => {
      const response = await request(app).get('/api/v1/analytics/job-titles').query({
        country: 'India',
      });

      expect(response.status).toBe(HttpStatus.OK);

      expect(response.body.response).toEqual([]);
    });

    it('should return 400 when country query is missing', async () => {
      const response = await request(app).get('/api/v1/analytics/job-titles');

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/analytics/departments', () => {
    it('should return department salary insights', async () => {
      const response = await request(app).get('/api/v1/analytics/departments');

      expect(response.status).toBe(200);

      expect(Array.isArray(response.body.response)).toBe(true);
    });
  });
});
