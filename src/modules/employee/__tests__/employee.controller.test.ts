import { EmployeeController } from "../employee.controller";
import { EmployeeService } from "../employee.service";

describe("EmployeeController", () => {
  let serviceMock: jest.Mocked<EmployeeService>;
  let controller: EmployeeController;

  beforeEach(() => {
    serviceMock = {
      createEmployee: jest.fn(),
      getEmployeeById: jest.fn(),
      updateEmployee: jest.fn(),
      deleteEmployee: jest.fn(),
      listEmployees: jest.fn(),
      getSalaryInsights: jest.fn(),
    } as unknown as jest.Mocked<EmployeeService>;

    controller = new EmployeeController(
      serviceMock,
    );
  });

  it("should create employee and return 201", async () => {
    const employee = {
      id: "employee-id",
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    const req = {
      body: {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    serviceMock.createEmployee.mockResolvedValue(
      employee as any,
    );

    await controller.createEmployee(
      req as any,
      res as any,
    );

    expect(
      serviceMock.createEmployee,
    ).toHaveBeenCalledWith(req.body);

    expect(res.status)
      .toHaveBeenCalledWith(201);

    expect(res.json)
      .toHaveBeenCalledWith(employee);
  });
});