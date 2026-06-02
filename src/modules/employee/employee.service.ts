import { ConflictError, NotFoundError } from "@shared/errors/app.error";
import { EmployeeRepository } from "./employee.repository.interface";
import { EMPLOYEE_ERROR_CODES } from "@shared/constants/errorCodes";
import { CreateEmployeeInput, Employee, ListEmployeesQuery, PaginatedEmployees, UpdateEmployeeInput } from "./employee.schema";
export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) { }

  private async getExistingEmployee(
    id: string,
  ): Promise<Employee> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new NotFoundError(
        EMPLOYEE_ERROR_CODES.NOT_FOUND,
        "Employee not found",
      );
    }

    return employee;
  }

  async createEmployee(payload: CreateEmployeeInput): Promise<Employee> {

    const employee = await this.repository.findByEmail(payload.email);

    if (employee) {
      throw new ConflictError(EMPLOYEE_ERROR_CODES.EMAIL_EXISTS, "Employee email already exists");
    }

    const employeeCode = await this.repository.findByEmployeeCode(payload.employeeCode);

    if (employeeCode) {
      throw new ConflictError(EMPLOYEE_ERROR_CODES.CODE_EXISTS, "Employee code already exists");
    }
    return this.repository.create(payload);
  }

  async updateEmployee(id: string, payload: UpdateEmployeeInput): Promise<Employee> {
    await this.getExistingEmployee(id);
    return this.repository.update(id, payload);
  }

  async deleteEmployee(id: string): Promise<void> {
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