import { JobTitleSalaryInsight } from "./analytics.schema";
import { CountrySalaryInsight } from "./analytics.types";

export interface AnalyticsRepository {
  getCountrySalaryInsights(): Promise<
    CountrySalaryInsight[]
  >;

  getJobTitleSalaryInsights(
    country: string,
  ): Promise<JobTitleSalaryInsight[]>;
}