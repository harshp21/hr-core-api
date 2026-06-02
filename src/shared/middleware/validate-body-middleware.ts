import { Request, Response, NextFunction }
  from "express";

import { ZodSchema } from "zod";

export function validateBody(
  schema: ZodSchema,
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    schema.parse(req.body);

    next();
  };
}