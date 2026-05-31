import { Prisma, PrismaClient } from "@prisma/client";
import { EmployeeRepository } from "./employee.repository";

const validEmployee = {
  employeeCode: "EMP-001",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  country: "US",
  department: "Engineering",
  jobTitle: "Software Engineer",
  salary: 75000,
  currency: "USD",
  employmentType: "full-time",
  dateOfJoining: "2024-01-15",
};

describe("EmployeeRepository.create", () => {
  let prisma: PrismaClient;
  let repository: EmployeeRepository;

  beforeAll(async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL must be defined for Prisma integration tests");
    }

    prisma = new PrismaClient();
    await prisma.$connect();
    repository = new EmployeeRepository(prisma);
  });

  beforeEach(async () => {
    await prisma.employee.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates employee", async () => {
    const result = await repository.create(validEmployee);

    expect(result).toMatchObject({
      employeeCode: validEmployee.employeeCode,
      firstName: validEmployee.firstName,
      lastName: validEmployee.lastName,
      email: validEmployee.email,
      country: validEmployee.country,
      department: validEmployee.department,
      jobTitle: validEmployee.jobTitle,
      currency: validEmployee.currency,
      employmentType: validEmployee.employmentType,
    });
    expect(result.id).toEqual(expect.any(String));
    expect(result.salary).toEqual(validEmployee.salary);
    expect(result.dateOfJoining).toMatch(/^2024-01-15T00:00:00/);
  });

  it("throws on duplicate email", async () => {
    await prisma.employee.create({ data: validEmployee });

    const duplicateEmailEmployee = {
      ...validEmployee,
      employeeCode: "EMP-002",
      email: validEmployee.email,
    };

    await expect(repository.create(duplicateEmailEmployee)).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    await expect(repository.create(duplicateEmailEmployee)).rejects.toThrow(/P2002/);
  });

  it("throws on duplicate employee code", async () => {
    await prisma.employee.create({ data: validEmployee });

    const duplicateCodeEmployee = {
      ...validEmployee,
      employeeCode: validEmployee.employeeCode,
      email: "jane.duplicate@example.com",
    };

    await expect(repository.create(duplicateCodeEmployee)).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    await expect(repository.create(duplicateCodeEmployee)).rejects.toThrow(/P2002/);
  });
});
