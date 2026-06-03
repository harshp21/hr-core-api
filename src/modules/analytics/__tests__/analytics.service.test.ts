import { AnalyticsService } from "../analytics.service";

describe("AnalyticsService", () => {
  const mockRepository = {
    getCountrySalaryInsights: jest.fn(),
  };

  let service: AnalyticsService;

  beforeEach(() => {
    jest.clearAllMocks();

    service = new AnalyticsService(
      mockRepository as any
    );
  });

  it("should return country salary insights", async () => {
    mockRepository.getCountrySalaryInsights.mockResolvedValue([
      {
        country: "India",
        employeeCount: 10,
        averageSalary: 100000,
        minimumSalary: 50000,
        maximumSalary: 200000,
      },
    ]);

    const result =
      await service.getCountrySalaryInsights();

    expect(result).toEqual([
      {
        country: "India",
        employeeCount: 10,
        averageSalary: 100000,
        minimumSalary: 50000,
        maximumSalary: 200000,
      },
    ]);
  });
});