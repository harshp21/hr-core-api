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

  it("should return employee by id", async () => {
    const employee = {
      id: "employee-id",
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    const req = {
      params: {
        id: "employee-id",
      },
    };

    const res = {
      json: jest.fn(),
    };

    serviceMock.getEmployeeById
      .mockResolvedValue(employee as any);

    await controller.getEmployeeById(
      req as any,
      res as any,
    );

    expect(
      serviceMock.getEmployeeById,
    ).toHaveBeenCalledWith(
      "employee-id",
    );

    expect(res.json)
      .toHaveBeenCalledWith(employee);
  });

  it("should update employee and return updated employee", async () => {
    const updatedEmployee = {
      id: "employee-id",
      employeeCode: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      salary: 70000,
    };

    const req = {
      params: {
        id: "employee-id",
      },
      body: {
        salary: 70000,
      },
    };

    const res = {
      json: jest.fn(),
    };

    serviceMock.updateEmployee.mockResolvedValue(
      updatedEmployee as any,
    );

    await controller.updateEmployee(
      req as any,
      res as any,
    );

    expect(
      serviceMock.updateEmployee,
    ).toHaveBeenCalledWith(
      "employee-id",
      req.body,
    );

    expect(res.json)
      .toHaveBeenCalledWith(updatedEmployee);
  });

  it("should delete employee and return 204", async () => {
    const req = {
      params: {
        id: "employee-id",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    serviceMock.deleteEmployee.mockResolvedValue(
      undefined,
    );

    await controller.deleteEmployee(
      req as any,
      res as any,
    );

    expect(
      serviceMock.deleteEmployee,
    ).toHaveBeenCalledWith(
      "employee-id",
    );

    expect(res.status)
      .toHaveBeenCalledWith(204);

    expect(res.send)
      .toHaveBeenCalled();
  });

  it("should return paginated employees", async () => {
    const response = {
      data: [
        {
          id: "employee-id",
          employeeCode: "EMP001",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      ],
      total: 1,
      page: 1,
      pageSize: 20,
    };

    const req = {
      query: {
        page: "1",
        pageSize: "20",
      },
    };

    const res = {
      json: jest.fn(),
    };

    serviceMock.listEmployees.mockResolvedValue(
      response as any,
    );

    await controller.listEmployees(
      req as any,
      res as any,
    );

    expect(
      serviceMock.listEmployees,
    ).toHaveBeenCalledWith(req.query);

    expect(res.json)
      .toHaveBeenCalledWith(response);
  });
});