import { employeeSchema, Employee } from "./employee.schema";

export type EmployeeRepository = {
  findByEmployeeCode(employeeCode: string): Promise<unknown | null>;
  findByEmail(email: string): Promise<unknown | null>;
  create(employee: Employee): Promise<unknown>;
};

export class EmployeeService {
  constructor(private repository: EmployeeRepository) {}

  public async createEmployee(payload: unknown) {
    const employee = employeeSchema.parse(payload);

    const existingByCode = await this.repository.findByEmployeeCode(employee.employeeCode);
    if (existingByCode) {
      throw new Error("Employee code already exists");
    }

    const existingByEmail = await this.repository.findByEmail(employee.email);
    if (existingByEmail) {
      throw new Error("Email already exists");
    }

    return this.repository.create(employee);
  }
}
