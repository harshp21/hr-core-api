import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

import { AppError }
  from "../errors/app.error";
import { SYSTEM_ERROR_CODES } from "@shared/constants/errorCodes";

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

  res.status(500).json({
    code: SYSTEM_ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });
}