import { AnalyticsService } from '../analytics.service';
import { AnalyticsRepository } from '../analytics.repository.interface';

describe('AnalyticsService', () => {
  const mockRepository: jest.Mocked<AnalyticsRepository> = {
    getCountrySalaryInsights: jest.fn(),
    getJobTitleSalaryInsights: jest.fn(),
    getDepartmentInsights: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return country salary insights', async () => {
    const countrySalaryInsights = [
      {
        country: 'India',
        employeeCount: 10,
        averageSalary: 100000,
        minimumSalary: 50000,
        maximumSalary: 200000,
      },
    ];

    const analyticsRepositoryMock = {
      ...mockRepository,
      getCountrySalaryInsights: jest.fn().mockResolvedValue(countrySalaryInsights),
    };
    const service = new AnalyticsService(analyticsRepositoryMock);

    const result = await service.getCountrySalaryInsights();

    expect(result).toEqual(countrySalaryInsights);
  });

  it('should return average salary by job title for a country', async () => {
    const insights = [
      {
        jobTitle: 'Software Engineer',
        averageSalary: 150000,
      },
    ];

    const analyticsRepositoryMock = {
      ...mockRepository,
      getJobTitleSalaryInsights: jest.fn().mockResolvedValue(insights),
    };
    const service = new AnalyticsService(analyticsRepositoryMock);

    const result = await service.getJobTitleSalaryInsights('India');

    expect(analyticsRepositoryMock.getJobTitleSalaryInsights).toHaveBeenCalledWith('India');

    expect(result).toEqual(insights);
  });

  it('should return department salary insights', async () => {
    const insights = [
      {
        department: 'Engineering',
        averageSalary: 100000,
        employeeCount: 10,
      },
    ];

    const analyticsRepositoryMock = {
      ...mockRepository,
      getDepartmentInsights: jest.fn().mockResolvedValue(insights),
    };
    const service = new AnalyticsService(analyticsRepositoryMock);

    const result = await service.getDepartmentInsights();

    expect(analyticsRepositoryMock.getDepartmentInsights).toHaveBeenCalled();

    expect(result).toEqual(insights);
  });
});
