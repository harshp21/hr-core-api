import { Router } from "express";

import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { prisma } from "../../lib/prisma";
import { PrismaAnalyticsRepository } from "./prisma-analytics.repository";

const router = Router();

const analyticsRepository =
  new PrismaAnalyticsRepository(prisma);

const analyticsService =
  new AnalyticsService(
    analyticsRepository,
  );

const analyticsController =
  new AnalyticsController(
    analyticsService,
  );

router.get(
  "/countries",
  analyticsController.getCountrySalaryInsights,
);

export default router;