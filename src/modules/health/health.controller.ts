import { Request, Response } from 'express';
import { HttpStatus } from "@shared/constants/httpStatus";
import { evaluateSystemHealth } from './health.service';
import { HEALTH_ERROR_MESSAGE, HEALTH_STATUS } from './health.constants';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return HEALTH_ERROR_MESSAGE.UNKNOWN_EXECUTION_FAILURE;
};

export const handleHealthCheck = async (_req: Request, res: Response): Promise<void> => {
  try {
    const health = await evaluateSystemHealth();
    
    // Declarative response evaluation
    const statusCode =
      health.status === HEALTH_STATUS.UP ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
    
    res.status(statusCode).json(health);
  } catch (error: unknown) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HEALTH_STATUS.DOWN,
      error: getErrorMessage(error),
    });
  }
};
