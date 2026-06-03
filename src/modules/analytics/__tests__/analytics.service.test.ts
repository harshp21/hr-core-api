import { AnalyticsService } from "../analytics.service";

describe("AnalyticsService", () => {
  const mockRepository = {
    getCountrySalaryInsights: jest.fn(),
    getJobTitleSalaryInsights: jest.fn(),
  };

  let service: AnalyticsService;

  beforeEach(() => {
    jest.clearAllMocks();

    service = new AnalyticsService(
      mockRepository as any
    );
  });

  it("should return country salary insights", async () => {

    const countrySalaryInsights = [
      {
        country: "India",
        employeeCount: 10,
        averageSalary: 100000,
        minimumSalary: 50000,
        maximumSalary: 200000,
      },
    ];

    const analyticsRepositoryMock = {
      ...mockRepository,
      getCountrySalaryInsights: jest.fn().mockResolvedValue(countrySalaryInsights)
    };
    const service = new AnalyticsService(analyticsRepositoryMock);

    const result =
      await service.getCountrySalaryInsights();

    expect(result).toEqual(countrySalaryInsights);
  });


  it("should return average salary by job title for a country", async () => {
    const insights = [
      {
        jobTitle: "Software Engineer",
        averageSalary: 150000,
      },
    ];

    const analyticsRepositoryMock = {
      ...mockRepository,
      getJobTitleSalaryInsights:
        jest.fn().mockResolvedValue(insights),
    };
    const service = new AnalyticsService(analyticsRepositoryMock);

    const result =
      await service.getJobTitleSalaryInsights(
        "India",
      );

    expect(analyticsRepositoryMock.getJobTitleSalaryInsights).toHaveBeenCalledWith(
      "India",
    );

    expect(result).toEqual(insights);
  });
});