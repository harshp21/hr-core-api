import { prisma } from "../../lib/prisma";

import { AnalyticsService }
  from "./analytics.service";

import { PrismaAnalyticsRepository }
  from "./prisma-analytics.repository";

import { AnalyticsController }
  from "./analytics.controller";

import { analyticsRoutes }
  from "./analytics.routes";

const repository =
  new PrismaAnalyticsRepository(prisma);

const service =
  new AnalyticsService(repository);

export const analyticsController =
  new AnalyticsController(service);

export const analyticsRouter =
  analyticsRoutes(analyticsController);