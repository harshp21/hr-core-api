import { prisma } from "../../../lib/prisma";
import { PrismaEmployeeRepository } from "../prisma-employee.repository";
import { Prisma } from "@prisma/client";

describe("PrismaEmployeeRepository", () => {
  let repository: PrismaEmployeeRepository;

  beforeEach(() => {
    repository =
      new PrismaEmployeeRepository(prisma);
  });

  afterEach(async () => {
    await prisma.employee.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should find employee by email", async () => {
    const employee =
      await prisma.employee.create({
        data: {
          employeeCode: "EMP001",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          department: "Engineering",
          country: "India",
          salary: new Prisma.Decimal(50000),
        },
      });

    const result =
      await repository.findByEmail(
        "john@example.com",
      );

    expect(result).not.toBeNull();

    expect(result?.id)
      .toBe(employee.id);

    expect(result?.email)
      .toBe("john@example.com");
  });

  it("should find employee by email", async () => {
    const employee =
      await prisma.employee.create({
        data: {
          employeeCode: "EMP001",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          department: "Engineering",
          country: "India",
          salary: new Prisma.Decimal(50000),
        },
      });

    const result =
      await repository.findByEmail(
        "john@example.com",
      );

    expect(result).not.toBeNull();

    expect(result?.id)
      .toBe(employee.id);

    expect(result?.email)
      .toBe("john@example.com");
  });

  it("should return null when email does not exist", async () => {
    const result =
      await repository.findByEmail(
        "missing@example.com",
      );

    expect(result).toBeNull();
  });

  it("should find employee by employee code", async () => {
    const employee =
      await prisma.employee.create({
        data: {
          employeeCode: "EMP001",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          department: "Engineering",
          country: "India",
          salary: new Prisma.Decimal(50000),
        },
      });

    const result =
      await repository.findByEmployeeCode(
        "EMP001",
      );

    expect(result).not.toBeNull();

    expect(result?.id)
      .toBe(employee.id);

    expect(result?.employeeCode)
      .toBe("EMP001");
  });

  it("should return null when employee code does not exist", async () => {
    const result =
      await repository.findByEmployeeCode(
        "UNKNOWN",
      );

    expect(result).toBeNull();
  });
});