// health.service.test.ts
import { checkPostgresDatabase, aggregateStatus } from './health.service';
import { PrismaClient } from '@prisma/client';
import { DependencyStatus } from './health.types';
import { HEALTH_DEPENDENCY, HEALTH_STATUS } from './health.constants';

describe('Functional Health Check Unit Tests', () => {
  describe('checkPostgresDatabase', () => {
    it('should return UP when PostgreSQL responds successfully', async () => {
      // Mock the PrismaClient structural footprint functionally
      const mockPrismaSuccess = {
        $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
      } as unknown as PrismaClient;

      const result = await checkPostgresDatabase(mockPrismaSuccess);
      expect(result).toEqual({
        name: HEALTH_DEPENDENCY.POSTGRES,
        status: HEALTH_STATUS.UP,
      });
    });

    it('should return DOWN when PostgreSQL connection throws an error', async () => {
      const mockPrismaFailure = {
        $queryRaw: jest.fn().mockRejectedValue(new Error('PostgreSQL Connection Timeout')),
      } as unknown as PrismaClient;

      const result = await checkPostgresDatabase(mockPrismaFailure);
      expect(result).toEqual({
        name: HEALTH_DEPENDENCY.POSTGRES,
        status: HEALTH_STATUS.DOWN,
      });
    });
  });

  describe('aggregateStatus', () => {
    it('should evaluate to UP if all dependencies are running', () => {
      const mockDeps: readonly DependencyStatus[] = [
        { name: HEALTH_DEPENDENCY.POSTGRES, status: HEALTH_STATUS.UP },
      ];
      expect(aggregateStatus(mockDeps)).toBe(HEALTH_STATUS.UP);
    });

    it('should evaluate to DOWN if any dependency drops', () => {
      const mockDeps: readonly DependencyStatus[] = [
        { name: HEALTH_DEPENDENCY.POSTGRES, status: HEALTH_STATUS.DOWN },
      ];
      expect(aggregateStatus(mockDeps)).toBe(HEALTH_STATUS.DOWN);
    });
  });
});
