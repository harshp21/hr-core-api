import { ErrorRequestHandler } from "express";
import { HttpStatus } from "@shared/constants/httpStatus";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = (err as any).status ?? HttpStatus.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    error: err.name ?? "InternalServerError",
    message: err.message ?? "An unexpected error occurred."
  });
};
