import { Router } from "express";
import { healthRouter } from "./health.route";

export const healthModule = Router();

healthModule.use("/health", healthRouter);
