import { Employee, PrismaClient } from "@prisma/client";

import type { EmployeeRepository } from "./employee.repository.interface";
import { CreateEmployeeInput, UpdateEmployeeInput } from "./employee.schema";

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

  async delete(id: string): Promise<Employee | null> {
    throw new Error("Not implemented");
  }

  async list(query: any): Promise<Employee[] | null> {
    throw new Error("Not implemented");
  }

  async getSalaryInsights(): Promise<any> {
    throw new Error("Not implemented");
  }
}