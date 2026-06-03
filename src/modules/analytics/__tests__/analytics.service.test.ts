import { AnalyticsRepository } from "../analytics.repository.interface";
import { AnalyticsService } from "../analytics.service";

describe("AnalyticsService", () => {
  let analyticsService: AnalyticsService;

  const analyticsRepository: jest.Mocked<AnalyticsRepository> = {
    getCountrySalaryInsights: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    analyticsService = new AnalyticsService(
      analyticsRepository
    );
  });

  describe("getCountrySalaryInsights", () => {
    it("should return country salary insights", async () => {
      analyticsRepository.getCountrySalaryInsights.mockResolvedValue([
        {
          country: "India",
          employeeCount: 10,
          averageSalary: 100000,
          minimumSalary: 50000,
          maximumSalary: 200000,
        },
      ]);

      const result =
        await analyticsService.getCountrySalaryInsights();

      expect(result).toHaveLength(1);

      expect(result[0]).toEqual({
        country: "India",
        employeeCount: 10,
        averageSalary: 100000,
        minimumSalary: 50000,
        maximumSalary: 200000,
      });
    });
  });
});