import { z } from 'zod';
import { Request, Response } from 'express';
import { validateRequest } from '../validate-request.middleware';

describe('validateRequest', () => {
  it('should validate request body', () => {
    const middleware = validateRequest({
      body: z.object({
        firstName: z.string(),
      }),
    });

    const req = {
      body: {
        firstName: 'John',
      },
    } as Request;

    const res = {} as Response;

    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should validate request params', () => {
    const middleware = validateRequest({
      params: z.object({
        id: z.string().uuid(),
      }),
    });

    const req = {
      params: {
        id: crypto.randomUUID(),
      },
    } as Request;

    const res = {} as Response;

    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should validate request query', () => {
    const middleware = validateRequest({
      query: z.object({
        page: z.string(),
      }),
    });

    const req = {
      query: {
        page: '1',
      },
    } as Request;

    const res = {} as Response;

    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
