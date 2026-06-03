import { Request, Response, NextFunction }
  from "express";

import { HttpStatus }
  from "@shared/constants/httpStatus";

import { apiResponse }
  from "@shared/utils/apiResponse";

import { AnalyticsService }
  from "./analytics.service";

export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
  ) { }

  getCountrySalaryInsights = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const insights =
        await this.analyticsService
          .getCountrySalaryInsights();

      res
        .status(HttpStatus.OK)
        .json(
          apiResponse(
            insights,
            "Country salary insights retrieved successfully",
          ),
        );
    } catch (error) {
      next(error);
    }
  };

  getJobTitleSalaryInsights = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const country =
        req.query.country as string;

      const insights =
        await this.analyticsService
          .getJobTitleSalaryInsights(
            country,
          );

      res
        .status(HttpStatus.OK)
        .json(
          apiResponse(
            insights,
            "Job title salary insights retrieved successfully",
          ),
        );
    } catch (error) {
      next(error);
    }
  };
}