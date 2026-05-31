import { Router } from "express";
import { handleHealthCheck } from "./health.controller";
import { HEALTH_ROUTE_PATH } from "./health.constants";

export const healthRouter = Router();

healthRouter.get(HEALTH_ROUTE_PATH, handleHealthCheck);
