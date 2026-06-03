import request from "supertest";
import app from "./../../../app";
import { ERROR_CODES } from "@shared/constants/errorCodes";
import { HttpStatus } from "@shared/constants/httpStatus";

describe("Employee API", () => {
  const unique = () => Math.random().toString(36).slice(2, 10);

  it("should create employee via API", async () => {
    const suffix = unique();

    const response = await request(app)
      .post("/api/employees")
      .send({
        employeeCode: `EMP-${suffix}`,
        firstName: "John",
        lastName: "Doe",
        email: `john-${suffix}@example.com`,
        department: "Engineering",
        country: "India",
        salary: 50000,
        jobTitle: "Engineer",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      });

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.data.email).toBe(`john-${suffix}@example.com`);
  });

  it("should fetch employee by id", async () => {
  const suffix = unique();

  const createRes = await request(app)
    .post("/api/employees")
    .send({
      employeeCode: `EMP-${suffix}`,
      firstName: "Jane",
      lastName: "Doe",
      email: `jane-${suffix}@example.com`,
      department: "Engineering",
      country: "India",
      salary: 60000,
      jobTitle: "Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    const id = createRes.body.data.id;

    const res = await request(app).get(
      `/api/employees/${id}`,
    );

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(id);
  });

  it("should delete employee via API", async () => {
  const suffix = unique();

  const createRes = await request(app)
    .post("/api/employees")
    .send({
      employeeCode: `EMP-${suffix}`,
      firstName: "Mark",
      lastName: "Smith",
      email: `mark-${suffix}@example.com`,
      department: "Engineering",
      country: "India",
      salary: 70000,
      jobTitle: "Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    const id = createRes.body.data.id;

    const deleteRes = await request(app)
      .delete(`/api/employees/${id}`);

    expect(deleteRes.status).toBe(HttpStatus.NO_CONTENT);
  });

  it("should list employees via API", async () => {
  const suffix = unique();

  await request(app).post("/api/employees").send({
    employeeCode: `EMP-${suffix}`,
    firstName: "A",
    lastName: "B",
    email: `a-${suffix}@example.com`,
    department: "Engineering",
    country: "India",
    salary: 50000,
    jobTitle: "Engineer",
    currency: "INR",
    employmentType: "FULL_TIME",
    dateOfJoining: "2024-01-01",
  });

  const res = await request(app)
    .get("/api/employees?page=1&limit=10");

  expect(res.status).toBe(HttpStatus.OK);
  expect(res.body.data.data.length).toBeGreaterThan(0);
});

  it("should return 409 when employee code already exists", async () => {
    const suffix = unique();
    const employeeCode = `EMP-${suffix}`;

    await request(app)
      .post("/api/employees")
      .send({
        employeeCode,
        firstName: "John",
        lastName: "Doe",
        email: `john-${suffix}@example.com`,
        department: "Engineering",
        country: "India",
        salary: 50000,
        jobTitle: "Engineer",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      });

    const response = await request(app)
      .post("/api/employees")
      .send({
        employeeCode,
        firstName: "Jane",
        lastName: "Doe",
        email: `jane-${suffix}@example.com`,
        department: "Engineering",
        country: "India",
        salary: 60000,
        jobTitle: "Engineer",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      });

    expect(response.status).toBe(HttpStatus.CONFLICT);
    expect(response.body.code).toBe(ERROR_CODES.EMPLOYEE.CODE_EXISTS);
  });
});