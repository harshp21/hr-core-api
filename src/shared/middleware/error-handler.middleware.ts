import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

import { AppError }
  from "../errors/app.error";
import { SYSTEM_ERROR_CODES } from "@shared/constants/errorCodes";
import z, { ZodError } from "zod";
import { HttpStatus } from "@shared/constants/httpStatus";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.errorCode,
      message: error.message,
    });

    return;
  }

  if (error instanceof ZodError) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      errors: error.issues.map(issue => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });

    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: SYSTEM_ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });

}