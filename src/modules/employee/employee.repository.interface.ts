import type {
  CreateEmployeeInput,
  Employee,
  ListEmployeesQuery,
  PaginatedEmployees,
  SalaryInsights,
} from "./employee.schema";

export interface EmployeeRepository {

  findById(id: string): Promise<Employee | null>;

  findByEmail(email: string): Promise<Employee | null>;

  findByEmployeeCode(
    employeeCode: string,
  ): Promise<Employee | null>;

  create(
    employee: CreateEmployeeInput,
  ): Promise<Employee>;

  update(
    employeeId: string,
    updatePayload: Partial<CreateEmployeeInput>,
  ): Promise<Employee>;

  delete(id: string): Promise<void>;

  list(
    query: ListEmployeesQuery,
  ): Promise<PaginatedEmployees>;

  getSalaryInsights(): Promise<SalaryInsights>;
}