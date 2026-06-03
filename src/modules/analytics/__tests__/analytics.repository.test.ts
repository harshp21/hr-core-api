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

  it("should return country salary insights", async () => {
    await prisma.employee.createMany({
      data: [
        {
          employeeCode: "EMP001",
          firstName: "John",
          lastName: "Doe",
          email: "john@test.com",
          country: "India",
          department: "Engineering",
          jobTitle: "Software Engineer",
          salary: 100000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
        },
        {
          employeeCode: "EMP002",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@test.com",
          country: "India",
          department: "Engineering",
          jobTitle: "Senior Engineer",
          salary: 200000,
          currency: "INR",
          employmentType: "FULL_TIME",
          dateOfJoining: new Date(),
        },
      ],
    });

    const result =
      await repository.getCountrySalaryInsights();

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject({
      country: "India",
      employeeCount: 2,
      averageSalary: 150000,
      minimumSalary: 100000,
      maximumSalary: 200000,
    });
  });
});