import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@shared/constants/httpStatus';

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist.',
  });
};
