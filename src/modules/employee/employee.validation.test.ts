import { employeeSchema } from "./employee.schema";

describe("Employee validation", () => {
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

  it("should validate a valid employee", () => {
    const result = employeeSchema.safeParse(validEmployee);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validEmployee);
    }
  });

  it("should reject missing required fields", () => {
    const result = employeeSchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      const missingFields = result.error.issues.map((issue) => issue.path.join("."));
      expect(missingFields).toEqual(
        expect.arrayContaining([
          "employeeCode",
          "firstName",
          "lastName",
          "email",
          "country",
          "department",
          "jobTitle",
          "salary",
          "currency",
          "employmentType",
          "dateOfJoining",
        ])
      );
    }
  });

  it("should reject invalid email", () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      email: "invalid-email",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: ["email"] }),
        ])
      );
    }
  });

  it("should reject salary less than or equal to zero", () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      salary: 0,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: ["salary"] }),
        ])
      );
    }
  });

  it("should reject empty firstName", () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      firstName: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: ["firstName"] }),
        ])
      );
    }
  });

  it("should reject empty lastName", () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      lastName: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: ["lastName"] }),
        ])
      );
    }
  });
});
