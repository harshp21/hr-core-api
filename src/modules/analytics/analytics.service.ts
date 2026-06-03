import { AnalyticsRepository } from "./analytics.repository.interface";

export class AnalyticsService {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository
  ) {}

  async getCountrySalaryInsights() {
    return this.analyticsRepository.getCountrySalaryInsights();
  }
}