import { Employee, Prisma, PrismaClient } from '@prisma/client';

import type { EmployeeRepository } from './employee.repository.interface';
import {
  CreateEmployeeInput,
  ListEmployeesQuery,
  PaginatedEmployees,
  UpdateEmployeeInput,
} from './employee.schema';

export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { email, isDeleted: false },
    });
  }

  async findById(id: string) {
    return this.prisma.employee.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findByEmployeeCode(employeeCode: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        employeeCode,
        isDeleted: false,
      },
    });
  }

  async create(input: CreateEmployeeInput): Promise<Employee> {
    return this.prisma.employee.create({
      data: {
        employeeCode: input.employeeCode,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        department: input.department,
        country: input.country,
        jobTitle: input.jobTitle,
        salary: input.salary,
        currency: input.currency,
        employmentType: input.employmentType,
        dateOfJoining: new Date(input.dateOfJoining),
      },
    });
  }

  async update(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    const updateData: Prisma.EmployeeUpdateInput = {
      ...input,
      ...(input.dateOfJoining
        ? {
            dateOfJoining: new Date(input.dateOfJoining),
          }
        : {}),
    };

    return this.prisma.employee.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async delete(id: string): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  async list(query: ListEmployeesQuery): Promise<PaginatedEmployees> {
    const page = query.page ?? 1;
    const limit = query.pageSize ?? 20;

    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeWhereInput = {
      isDeleted: false,
    };

    if (query.department) {
      where.department = query.department;
    }

    if (query.country) {
      where.country = query.country;
    }

    if (query.jobTitle) {
      where.jobTitle = query.jobTitle;
    }

    const orderBy: Prisma.EmployeeOrderByWithRelationInput = query.sortBy
      ? {
          [query.sortBy]: query.sortOrder ?? 'asc',
        }
      : {
          createdAt: 'desc',
        };

    if (query.search) {
      where.OR = [
        {
          firstName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          employeeCode: {
            contains: query.search,
          },
        },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),

      this.prisma.employee.count({
        where,
      }),
    ]);

    const mappedData = data.map((employee) => ({
      id: employee.id,
      employeeCode: employee.employeeCode,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      country: employee.country,
      department: employee.department,
      jobTitle: employee.jobTitle,
      salary: employee.salary.toNumber(),
      currency: employee.currency,
      employmentType: employee.employmentType,
      dateOfJoining: employee.dateOfJoining.toISOString(),
    }));

    return {
      data: mappedData,
      total,
      page,
      pageSize: limit,
    };
  }
}
