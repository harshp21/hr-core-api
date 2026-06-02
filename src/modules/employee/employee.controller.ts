import { Request, Response, NextFunction } from "express";
import { EmployeeService } from "./employee.service";

export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createEmployee(req.body);
      res.status(HttpStatus.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getEmployeeById(req.params.id);
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateEmployee(
        req.params.id,
        req.body
      );
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteEmployee(req.params.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };

  listEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.listEmployees(req.query as any);
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  getSalaryInsights = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getSalaryInsights();
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}