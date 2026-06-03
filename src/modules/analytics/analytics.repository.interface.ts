import { CountrySalaryInsight } from "./analytics.types";

export interface AnalyticsRepository {
  getCountrySalaryInsights(): Promise<
    CountrySalaryInsight[]
  >;
}