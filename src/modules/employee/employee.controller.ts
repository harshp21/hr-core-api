import { Request, Response, NextFunction } from "express";
import { EmployeeService } from "./employee.service";
import { apiResponse } from "@shared/utils/apiResponse";
import { HttpStatus } from "@shared/constants/httpStatus";

export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createEmployee(req.body);
      res.status(HttpStatus.CREATED).json(apiResponse(result, "Employee created successfully"));
    } catch (err) {
      next(err);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getEmployeeById(req.params.id);
      res.status(HttpStatus.OK).json(apiResponse(result, "Employee retrieved successfully"));
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
      res.status(HttpStatus.OK).json(apiResponse(result, "Employee updated successfully"));
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteEmployee(req.params.id);
      res.status(HttpStatus.NO_CONTENT).json(apiResponse(null, "Employee deleted successfully"));
    } catch (err) {
      next(err);
    }
  };

  listEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.listEmployees(req.query as any);
      res.status(HttpStatus.OK).json(apiResponse(result, "Employees retrieved successfully"));
    } catch (err) {
      next(err);
    }
  };
}