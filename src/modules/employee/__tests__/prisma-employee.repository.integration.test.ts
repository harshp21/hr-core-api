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
    const employee = await repository.create({
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      department: "Engineering",
      country: "India",
      salary: 50000,
      jobTitle: "Senior Software Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
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
    const employee = await repository.create({
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      department: "Engineering",
      country: "India",
      salary: 50000,
      jobTitle: "Senior Software Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
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
    const employee = await repository.create({
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      department: "Engineering",
      country: "India",
      salary: 50000,
      jobTitle: "Senior Software Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
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

  it("should create employee", async () => {
    const result = await repository.create({
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      department: "Engineering",
      country: "India",
      salary: 50000,
      jobTitle: "Senior Software Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    expect(result.id)
      .toBeDefined();

    expect(result.employeeCode)
      .toBe("EMP001");

    expect(result.email)
      .toBe("john@example.com");

    const saved =
      await prisma.employee.findUnique({
        where: {
          email: "john@example.com",
        },
      });

    expect(saved).not.toBeNull();

    expect(saved?.employeeCode)
      .toBe("EMP001");
  });

  it("should find employee by id", async () => {
    const employee = await repository.create({
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      department: "Engineering",
      country: "India",
      salary: 50000,
      jobTitle: "Senior Software Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    const result =
      await repository.findById(
        employee.id,
      );

    expect(result).not.toBeNull();

    expect(result?.id)
      .toBe(employee.id);

    expect(result?.email)
      .toBe(employee.email);
  });

  it("should return null when employee id does not exist", async () => {
    const result =
      await repository.findById(
        crypto.randomUUID(),
      );

    expect(result).toBeNull();
  });


  it("should update employee", async () => {
    const employee =
      await repository.create({
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",

        department: "Engineering",
        country: "India",

        jobTitle: "Senior Software Engineer",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",

        salary: 50000,
      });

    const result =
      await repository.update(
        employee.id,
        {
          firstName: "Jane",
          department: "Platform",
        },
      );

    expect(result.firstName)
      .toBe("Jane");

    expect(result.department)
      .toBe("Platform");
  });


  it("should delete employee", async () => {
    const employee =
      await repository.create({
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",

        department: "Engineering",
        country: "India",

        salary: 50000,

        jobTitle: "Senior Software Engineer",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      });

    await repository.delete(
      employee.id,
    );

    const result =
      await repository.findById(
        employee.id,
      );

    expect(result)
      .toBeNull();
  });

  it("should list employees with pagination", async () => {
    await repository.create({
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john1@example.com",
      department: "Engineering",
      country: "India",
      salary: 50000,
      jobTitle: "Dev",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    await repository.create({
      employeeCode: "EMP002",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      department: "Engineering",
      country: "India",
      salary: 60000,
      jobTitle: "Dev",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    const result =
      await repository.list({
        page: 1,
        pageSize: 10,
      });

    expect(result.data.length).toBe(2);
    expect(result.total).toBe(2);
  });

  it("should paginate employees", async () => {
    for (let i = 1; i <= 5; i++) {
      await repository.create({
        employeeCode: `EMP00${i}`,
        firstName: "User",
        lastName: `${i}`,
        email: `user${i}@mail.com`,
        department: "Engineering",
        country: "India",
        salary: 50000,
        jobTitle: "Dev",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      });
    }

    const result =
      await repository.list({
        page: 2,
        pageSize: 2,
      });

    expect(result.data.length).toBe(2);
    expect(result.page).toBe(2);
  });

  it("should return salary insights", async () => {
  await repository.create({
    employeeCode: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john1@mail.com",
    department: "Engineering",
    country: "India",
    salary: 50000,
    jobTitle: "Dev",
    currency: "INR",
    employmentType: "FULL_TIME",
    dateOfJoining: "2024-01-01",
  });

  await repository.create({
    employeeCode: "EMP002",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@mail.com",
    department: "Engineering",
    country: "India",
    salary: 100000,
    jobTitle: "Dev",
    currency: "INR",
    employmentType: "FULL_TIME",
    dateOfJoining: "2024-01-01",
  });

  const result =
    await repository.getSalaryInsights();

  expect(result.totalEmployees).toBe(2);

  expect(result.totalSalaryExpense)
    .toBe(150000);

  expect(result.averageSalary)
    .toBe(75000);
});
});