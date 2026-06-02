import request from "supertest";
import app from "@/app";

describe("Employee API", () => {
  it("should create employee via API", async () => {
    const response = await request(app)
      .post("/api/employees")
      .send({
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        department: "Engineering",
        country: "India",
        salary: 50000,
        jobTitle: "Engineer",
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe("john@example.com");
  });

  it("should fetch employee by id", async () => {
  const createRes = await request(app)
    .post("/api/employees")
    .send({
      employeeCode: "EMP002",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      department: "Engineering",
      country: "India",
      salary: 60000,
      jobTitle: "Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    const id = createRes.body.id;

    const res = await request(app).get(
      `/api/employees/${id}`,
    );

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("should delete employee via API", async () => {
  const createRes = await request(app)
    .post("/api/employees")
    .send({
      employeeCode: "EMP003",
      firstName: "Mark",
      lastName: "Smith",
      email: "mark@example.com",
      department: "Engineering",
      country: "India",
      salary: 70000,
      jobTitle: "Engineer",
      currency: "INR",
      employmentType: "FULL_TIME",
      dateOfJoining: "2024-01-01",
    });

    const id = createRes.body.id;

    const deleteRes = await request(app)
      .delete(`/api/employees/${id}`);

    expect(deleteRes.status).toBe(204);
  });

  it("should list employees via API", async () => {
  await request(app).post("/api/employees").send({
    employeeCode: "EMP004",
    firstName: "A",
    lastName: "B",
    email: "a@example.com",
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

  expect(res.status).toBe(200);
  expect(res.body.data.length).toBeGreaterThan(0);
});
});