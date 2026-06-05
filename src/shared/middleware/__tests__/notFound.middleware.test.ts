import { NextFunction, Request, Response } from 'express';

import { HttpStatus } from '@shared/constants/httpStatus';
import { notFoundHandler } from '../notFound.middleware';

describe('notFoundHandler', () => {
  it('should return 404 status code', () => {
    const req = {} as Request;
    const next = jest.fn() as NextFunction;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    notFoundHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
  });

  it('should return standard not found payload', () => {
    const req = {} as Request;
    const next = jest.fn() as NextFunction;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    notFoundHandler(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Not Found',
      message: 'The requested endpoint does not exist.',
    });
  });
});
