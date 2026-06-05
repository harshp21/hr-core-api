import { ZodError, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestValidationSchema = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

export const validateRequest =
  (schema: RequestValidationSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }

      next();
    } catch (err: unknown) {
      const validationError = err instanceof ZodError ? err : null;

      res.status(400).json({
        message: 'Validation error',
        errors: validationError?.issues ?? [],
      });

      return;
    }
  };

export const validate = validateRequest;
