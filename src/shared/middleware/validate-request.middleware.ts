import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ValidationSchema }
  from "../validation/validation.schema";

export function validateRequest(
  schema: ValidationSchema,
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {

    schema.body?.parse(req.body);
    schema.params?.parse(req.params);
    schema.query?.parse(req.query);

    next();
  };
}