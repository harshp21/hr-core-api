import { HttpStatus } from "@shared/constants/httpStatus";
import { EmployeeService } from "./employee.service";
import { Request, Response } from "express";

export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) { }


  async createEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    const employee =
      await this.employeeService.createEmployee(
        req.body,
      );

    res.status(HttpStatus.CREATED).json(employee);
  }

  async getEmployeeById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const employee =
      await this.employeeService.getEmployeeById(
        req.params.id,
      );

    res.json(employee);
  }

  async updateEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    const employee =
      await this.employeeService.updateEmployee(
        req.params.id,
        req.body,
      );

    res.json(employee);
  }

  async deleteEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    await this.employeeService.deleteEmployee(
      req.params.id,
    );

    res.status(HttpStatus.NO_CONTENT).send();
  }

  async listEmployees(
    req: Request,
    res: Response,
  ): Promise<void> {
    const result =
      await this.employeeService.listEmployees(
        req.query as any,
      );

    res.json(result);
  }

  async getSalaryInsights(
    req: Request,
    res: Response,
  ): Promise<void> {
    const insights =
      await this.employeeService.getSalaryInsights();

    res.json(insights);
  }
}