import { Employee, PrismaClient } from "@prisma/client";

import type { EmployeeRepository } from "./employee.repository.interface";
import { CreateEmployeeInput, ListEmployeesQuery, PaginatedEmployees, UpdateEmployeeInput } from "./employee.schema";

export class PrismaEmployeeRepository
  implements EmployeeRepository {

  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async findByEmail(
    email: string,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }

  async findById(
    id: string,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmployeeCode(
    employeeCode: string,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        employeeCode,
      },
    });
  }

  async create(
    input: CreateEmployeeInput,
  ): Promise<Employee> {
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

  async update(
    id: string,
    input: UpdateEmployeeInput,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
    });
  }

  async delete(
    id: string,
  ): Promise<void> {
    await this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }

  async list(
    query: ListEmployeesQuery,
  ): Promise<PaginatedEmployees> {
    const page = query.page ?? 1;
    const limit = query?.pageSize ?? 10;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.department) {
      where.department = query.department;
    }

    if (query.country) {
      where.country = query.country;
    }

    if (query.search) {
      where.OR = [
        {
          firstName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          employeeCode: {
            contains: query.search,
          },
        },
      ];
    }

    const [data, total] =
      await this.prisma.$transaction([
        this.prisma.employee.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),

        this.prisma.employee.count({
          where,
        }),
      ]);

    const mappedData = data.map((employee) => ({
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

 async getSalaryInsights(): Promise<SalaryInsights> {
  const result =
    await this.prisma.employee.aggregate({
      _count: {
        id: true,
      },
      _avg: {
        salary: true,
      },
      _sum: {
        salary: true,
      },
      _min: {
        salary: true,
      },
      _max: {
        salary: true,
      },
    });

  return {
    totalEmployees: result._count.id,
    averageSalary:
      result._avg.salary?.toNumber() ?? 0,
    totalSalaryExpense:
      result._sum.salary?.toNumber() ?? 0,
    minSalary:
      result._min.salary?.toNumber() ?? 0,
    maxSalary:
      result._max.salary?.toNumber() ?? 0,
  };
}
}