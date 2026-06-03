import { HttpStatus } from "@shared/constants/httpStatus";
import { EmployeeController } from "../employee.controller";
import { EmployeeService } from "../employee.service";
import { apiResponse } from "@shared/utils/apiResponse";

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
    const next = jest.fn();

    serviceMock.createEmployee.mockResolvedValue(
      employee as any,
    );

    await controller.createEmployee(
      req as any,
      res as any,
      next as any,
    );

    expect(
      serviceMock.createEmployee,
    ).toHaveBeenCalledWith(req.body);

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.CREATED);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(employee, "Employee created successfully"),
      );
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
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    serviceMock.getEmployeeById
      .mockResolvedValue(employee as any);

    await controller.getEmployeeById(
      req as any,
      res as any,
      next as any,
    );

    expect(
      serviceMock.getEmployeeById,
    ).toHaveBeenCalledWith(
      "employee-id",
    );

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.OK);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(employee, "Employee retrieved successfully"),
      );
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
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    serviceMock.updateEmployee.mockResolvedValue(
      updatedEmployee as any,
    );

    await controller.updateEmployee(
      req as any,
      res as any,
      next as any,
    );

    expect(
      serviceMock.updateEmployee,
    ).toHaveBeenCalledWith(
      "employee-id",
      req.body,
    );

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.OK);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(updatedEmployee, "Employee updated successfully"),
      );
  });

  it("should delete employee and return 204", async () => {
    const req = {
      params: {
        id: "employee-id",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    serviceMock.deleteEmployee.mockResolvedValue(
      undefined,
    );

    await controller.deleteEmployee(
      req as any,
      res as any,
      next as any,
    );

    expect(
      serviceMock.deleteEmployee,
    ).toHaveBeenCalledWith(
      "employee-id",
    );

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.NO_CONTENT);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(null, "Employee deleted successfully"),
      );
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
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    serviceMock.listEmployees.mockResolvedValue(
      response as any,
    );

    await controller.listEmployees(
      req as any,
      res as any,
      next as any,
    );

    expect(
      serviceMock.listEmployees,
    ).toHaveBeenCalledWith(req.query);

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.OK);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(response, "Employees retrieved successfully"),
      );
  });

});