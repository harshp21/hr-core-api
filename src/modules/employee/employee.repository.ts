import { PrismaClient } from "@prisma/client";
import type { Employee } from "./employee.schema";

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public findByEmployeeCode(employeeCode: string) {
    return this.prisma.employee.findUnique({
      where: { employeeCode },
    });
  }

  public findByEmail(email: string) {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }

  public create(employee: Employee) {
    return this.prisma.employee.create({ data: employee });
  }
}
