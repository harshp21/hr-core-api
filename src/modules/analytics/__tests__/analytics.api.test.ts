import { prisma } from "../../../lib/prisma";
import request from "supertest";
import app from "../../../app";

describe("GET /api/v1/analytics/countries", () => {
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

    const response = await request(app)
      .get("/api/v1/analytics/countries");

    expect(response.status).toBe(200);

    expect(response.body.data).toEqual([
      {
        country: "India",
        employeeCount: 2,
        averageSalary: 150000,
        minimumSalary: 100000,
        maximumSalary: 200000,
      },
    ]);
  });
});