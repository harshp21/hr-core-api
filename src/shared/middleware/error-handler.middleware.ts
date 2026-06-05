import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app.error';
import { ERROR_CODES } from '@shared/constants/errorCodes';
import { ZodError } from 'zod';
import { HttpStatus } from '@shared/constants/httpStatus';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
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
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });

    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: ERROR_CODES.SYSTEM.INTERNAL,
    message: 'Internal server error',
  });
}
