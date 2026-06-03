import { prisma } from "../../../lib/prisma";
import { PrismaAnalyticsRepository } from "../prisma-analytics.repository";

describe("AnalyticsRepository", () => {
  let repository: PrismaAnalyticsRepository;

  beforeEach(async () => {
    repository = new PrismaAnalyticsRepository(prisma);

    await prisma.employee.deleteMany();
  });

  afterEach(async () => {
    await prisma.employee.deleteMany();
  });

  it("should return average salary grouped by job title for a country", async () => {
    const suffix = Date.now();

    await prisma.employee.createMany({
      data: [
        {
          employeeCode: `EMP-${suffix}-1`,
          firstName: "John",
          lastName: "Doe",
          email: `john-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 100000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
        {
          employeeCode: `EMP-${suffix}-2`,
          firstName: "Jane",
          lastName: "Doe",
          email: `jane-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 200000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
      ],
    });

    const result =
      await repository.getJobTitleSalaryInsights(
        "India",
      );

    expect(result).toEqual([
      {
        jobTitle: "Software Engineer",
        averageSalary: 150000,
      },
    ]);
  });

  it("should return insights for multiple job titles", async () => {
    const suffix = Date.now();

    await prisma.employee.createMany({
      data: [
        {
          employeeCode: `EMP-${suffix}-1`,
          firstName: "John",
          lastName: "Doe",
          email: `john-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 100000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
        {
          employeeCode: `EMP-${suffix}-2`,
          firstName: "Jane",
          lastName: "Doe",
          email: `jane-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Senior Engineer",
          salary: 300000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
      ],
    });

    const result =
      await repository.getJobTitleSalaryInsights(
        "India",
      );

    expect(result).toHaveLength(2);
  });

  it("should only include employees from the requested country", async () => {
    const suffix = Date.now();

    await prisma.employee.createMany({
      data: [
        {
          employeeCode: `EMP-${suffix}-1`,
          firstName: "John",
          lastName: "Doe",
          email: `john-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 100000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
        {
          employeeCode: `EMP-${suffix}-2`,
          firstName: "Jane",
          lastName: "Doe",
          email: `jane-${suffix}@test.com`,
          country: "USA",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 500000,
          currency: "USD",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
      ],
    });

    const result =
      await repository.getJobTitleSalaryInsights(
        "India",
      );

    expect(result).toEqual([
      {
        jobTitle: "Software Engineer",
        averageSalary: 100000,
      },
    ]);
  });

  it("should exclude soft deleted employees", async () => {
    const suffix = Date.now();

    await prisma.employee.createMany({
      data: [
        {
          employeeCode: `EMP-${suffix}-1`,
          firstName: "John",
          lastName: "Doe",
          email: `john-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 100000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: false,
        },
        {
          employeeCode: `EMP-${suffix}-2`,
          firstName: "Jane",
          lastName: "Doe",
          email: `jane-${suffix}@test.com`,
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 200000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
          isDeleted: true,
        },
      ],
    });

    const result =
      await repository.getJobTitleSalaryInsights(
        "India",
      );

    expect(result).toEqual([
      {
        jobTitle: "Software Engineer",
        averageSalary: 100000,
      },
    ]);
  });

  it("should return empty array when country has no employees", async () => {
    const result =
      await repository.getJobTitleSalaryInsights(
        "India",
      );

    expect(result).toEqual([]);
  });
});