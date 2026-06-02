import { Employee, PrismaClient } from "@prisma/client";

import type { EmployeeRepository } from "./employee.repository.interface";

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
    throw new Error("Not implemented");
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

  async create(input: any): Promise<Employee | null> {
    throw new Error("Not implemented");
  }

  async update(id: string, input: any): Promise<Employee | null> {
    throw new Error("Not implemented");
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