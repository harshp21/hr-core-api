import { Router } from "express";

import { AnalyticsController }
  from "./analytics.controller";

export const analyticsRoutes = (
  controller: AnalyticsController,
) => {
  const router = Router();

  router.get(
    "/countries",
    controller.getCountrySalaryInsights,
  );

  return router;
};