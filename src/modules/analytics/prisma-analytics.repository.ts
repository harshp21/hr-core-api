import { PrismaClient } from "@prisma/client";
import { AnalyticsRepository } from "./analytics.repository.interface";
import { CountrySalaryInsight } from "./analytics.schema";

export class PrismaAnalyticsRepository
  implements AnalyticsRepository
{
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async getCountrySalaryInsights(): Promise<
    CountrySalaryInsight[]
  > {
    return [];
  }
}