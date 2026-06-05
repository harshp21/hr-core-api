import { ConflictError, NotFoundError } from '@shared/errors/app.error';
import { errorHandler } from '../error-handler.middleware';
import { ERROR_CODES } from '@shared/constants/errorCodes';
import { HttpStatus } from '@shared/constants/httpStatus';
import { Request, Response } from 'express';
import z from 'zod';

describe('errorHandler', () => {
  it('should return 404 for NotFoundError', () => {
    const error = new NotFoundError(ERROR_CODES.EMPLOYEE.NOT_FOUND, 'Employee not found');
    const req = {} as Request;

    const res  = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Response;

    const next = jest.fn();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      code: ERROR_CODES.EMPLOYEE.NOT_FOUND,
      message: 'Employee not found',
    });
  });

  it('should return 409 for ConflictError', () => {
    const error = new ConflictError(
      ERROR_CODES.EMPLOYEE.EMAIL_EXISTS,
      'Employee email already exists'
    );

    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Response;

    const next = jest.fn();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);

    expect(res.json).toHaveBeenCalledWith({
      code: ERROR_CODES.EMPLOYEE.EMAIL_EXISTS,
      message: 'Employee email already exists',
    });
  });

  it('should return 400 for zod validation errors', () => {
    const schema = z.object({
      firstName: z.string(),
    });

    let error: Error;

    try {
      schema.parse({});
    } catch (err) {
      error = err as Error;
    }

    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Response;

    const next = jest.fn();

    errorHandler(error!, req, res, next);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);

    expect(res.json).toHaveBeenCalledWith({
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      errors: [
        {
          field: 'firstName',
          message: expect.any(String),
        },
      ],
    });
  });
});
