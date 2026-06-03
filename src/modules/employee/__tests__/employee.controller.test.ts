import { HttpStatus } from "@shared/constants/httpStatus";
import { NextFunction, Request, Response } from "express";
import { EmployeeController } from "../employee.controller";
import { EmployeeService } from "../employee.service";
import { apiResponse } from "@shared/utils/apiResponse";

describe("EmployeeController", () => {
  let serviceMock: jest.Mocked<EmployeeService>;
  let controller: EmployeeController;

  type MockResponse = {
    status: jest.Mock;
    json: jest.Mock;
  };

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
      employee as Awaited<
        ReturnType<EmployeeService["createEmployee"]>
      >,
    );

    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.createEmployee(
      typedReq,
      typedRes,
      next,
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

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    serviceMock.getEmployeeById
      .mockResolvedValue(employee as Awaited<
        ReturnType<EmployeeService["getEmployeeById"]>
      >);

    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.getEmployeeById(
      typedReq,
      typedRes,
      next,
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

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    serviceMock.updateEmployee.mockResolvedValue(
      updatedEmployee as unknown as Awaited<
        ReturnType<EmployeeService["updateEmployee"]>
      >,
    );

    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.updateEmployee(
      typedReq,
      typedRes,
      next,
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

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    serviceMock.deleteEmployee.mockResolvedValue(
      {} as Awaited<
        ReturnType<EmployeeService["deleteEmployee"]>
      >,
    );

    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.deleteEmployee(
      typedReq,
      typedRes,
      next,
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

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    serviceMock.listEmployees.mockResolvedValue(
      response as unknown as Awaited<
        ReturnType<EmployeeService["listEmployees"]>
      >,
    );

    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.listEmployees(
      typedReq,
      typedRes,
      next,
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