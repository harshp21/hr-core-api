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

    res.status(HttpStatus.OK).json(employee);
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

    res.status(HttpStatus.OK).json(employee);
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
}