import { EmployeeService } from "./employee.service";

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

describe("EmployeeService.createEmployee", () => {
  let repository: {
    findByEmployeeCode: jest.Mock<Promise<unknown>, [string]>;
    findByEmail: jest.Mock<Promise<unknown>, [string]>;
    create: jest.Mock<Promise<unknown>, [unknown]>;
  };
  let service: EmployeeService;

  beforeEach(() => {
    repository = {
      findByEmployeeCode: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    service = new EmployeeService(repository as any);
  });

  it("creates employee successfully", async () => {
    const createdEmployee = { id: "emp-123", ...validEmployee };

    repository.findByEmployeeCode.mockResolvedValue(null);
    repository.findByEmail.mockResolvedValue(null);
    repository.create.mockResolvedValue(createdEmployee);

    await expect(service.createEmployee(validEmployee)).resolves.toEqual(createdEmployee);
    expect(repository.findByEmployeeCode).toHaveBeenCalledWith(validEmployee.employeeCode);
    expect(repository.findByEmail).toHaveBeenCalledWith(validEmployee.email);
    expect(repository.create).toHaveBeenCalledWith(validEmployee);
  });

  it("throws when employee code already exists", async () => {
    repository.findByEmployeeCode.mockResolvedValue({ id: "existing-1", employeeCode: validEmployee.employeeCode });
    repository.findByEmail.mockResolvedValue(null);

    await expect(service.createEmployee(validEmployee)).rejects.toThrow(/employee code/i);
    expect(repository.findByEmail).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("throws when email already exists", async () => {
    repository.findByEmployeeCode.mockResolvedValue(null);
    repository.findByEmail.mockResolvedValue({ id: "existing-2", email: validEmployee.email });

    await expect(service.createEmployee(validEmployee)).rejects.toThrow(/email/i);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("throws for invalid salary", async () => {
    const invalidEmployee = { ...validEmployee, salary: 0 };

    await expect(service.createEmployee(invalidEmployee)).rejects.toThrow(/salary/i);
    expect(repository.findByEmployeeCode).not.toHaveBeenCalled();
    expect(repository.findByEmail).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("propagates repository failure", async () => {
    repository.findByEmployeeCode.mockResolvedValue(null);
    repository.findByEmail.mockResolvedValue(null);
    repository.create.mockRejectedValue(new Error("repository failure"));

    await expect(service.createEmployee(validEmployee)).rejects.toThrow(/repository failure/i);
  });
});
