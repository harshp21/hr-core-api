import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = result.body;
      req.query = result.query;
      req.params = result.params;

      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    }
  };