import { ConflictError, NotFoundError } from "@shared/errors/app.error";
import { EmployeeRepository } from "./employee.repository.interface";
import { ERROR_CODES } from "@shared/constants/errorCodes";
import { CreateEmployeeInput, ListEmployeesQuery, PaginatedEmployees, UpdateEmployeeInput } from "./employee.schema";
import { Employee } from "./types/employee.types";
export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) { }

  private isUniqueConstraintError(error: unknown): error is {
    code: string;
    meta?: {
      target?: string[];
    };
  } {
    if (!error || typeof error !== "object") {
      return false;
    }

    const maybeError = error as {
      code?: unknown;
      meta?: {
        target?: unknown;
      };
    };

    return maybeError.code === "P2002";
  }

  private async getExistingEmployee(
    id: string,
  ): Promise<Employee> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new NotFoundError(
        ERROR_CODES.EMPLOYEE.NOT_FOUND,
        "Employee not found",
      );
    }

    return employee;
  }

  async createEmployee(payload: CreateEmployeeInput): Promise<Employee> {

    const employee = await this.repository.findByEmail(payload.email);

    if (employee) {
      throw new ConflictError(ERROR_CODES.EMPLOYEE.EMAIL_EXISTS, "Employee email already exists");
    }

    const employeeCode = await this.repository.findByEmployeeCode(payload.employeeCode);

    if (employeeCode) {
      throw new ConflictError(ERROR_CODES.EMPLOYEE.CODE_EXISTS, "Employee code already exists");
    }
    try {
      return await this.repository.create(payload);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        const target = error.meta?.target ?? [];

        if (target.includes("employeeCode")) {
          throw new ConflictError(
            ERROR_CODES.EMPLOYEE.CODE_EXISTS,
            "Employee code already exists",
          );
        }

        if (target.includes("email")) {
          throw new ConflictError(
            ERROR_CODES.EMPLOYEE.EMAIL_EXISTS,
            "Employee email already exists",
          );
        }
      }

      throw error;
    }
  }

  async updateEmployee(id: string, payload: UpdateEmployeeInput): Promise<Employee> {
    await this.getExistingEmployee(id);
    return this.repository.update(id, payload);
  }

  async deleteEmployee(id: string): Promise<Employee> {
    await this.getExistingEmployee(id);
    return this.repository.delete(id);
  }


  async getEmployeeById(id: string): Promise<Employee> {
    return await this.getExistingEmployee(id);
  }


  async listEmployees(
    query: ListEmployeesQuery,
  ): Promise<PaginatedEmployees> {
    return this.repository.list(query);
  }
}