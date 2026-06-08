import { PrismaClient } from '@prisma/client';
import { AnalyticsRepository } from './analytics.repository.interface';
import { CountrySalaryInsight } from './analytics.schema';

export class PrismaAnalyticsRepository implements AnalyticsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getCountrySalaryInsights(): Promise<CountrySalaryInsight[]> {
    const groupedEmployees = await this.prisma.employee.groupBy({
      by: ['country'],

      where: {
        isDeleted: false,
      },

      _count: {
        id: true,
      },

      _avg: {
        salary: true,
      },

      _min: {
        salary: true,
      },

      _max: {
        salary: true,
      },
    });

    return groupedEmployees.map((group) => ({
      country: group.country,

      employeeCount: group._count.id,

      averageSalary: Number(group._avg.salary ?? 0),

      minimumSalary: Number(group._min.salary ?? 0),

      maximumSalary: Number(group._max.salary ?? 0),
    }));
  }

  async getJobTitleSalaryInsights(country: string) {
    const result = await this.prisma.employee.groupBy({
      by: ['jobTitle'],
      where: {
        country,
        isDeleted: false,
      },
      _avg: {
        salary: true,
      },
    });

    return result.map((item) => ({
      jobTitle: item.jobTitle,
      averageSalary: Number(item._avg.salary) || 0,
    }));
  }

  public async getDepartmentInsights() {
    const result = await this.prisma.employee.groupBy({
      by: ['department'],
      where: {
        isDeleted: false,
      },
      _avg: {
        salary: true,
      },
      _count: {
        id: true,
      },
    });

    return result.map((item) => ({
      department: item.department,
      averageSalary: Number(item._avg.salary) || 0,
      employeeCount: item._count.id,
    }));
  }
}
