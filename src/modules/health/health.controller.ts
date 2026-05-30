import { Request, Response } from "express";
import { HttpStatus } from "@shared/constants/httpStatus";

export const getHealth = (_req: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};
