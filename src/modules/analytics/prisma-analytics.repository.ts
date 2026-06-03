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
    const groupedEmployees =
      await this.prisma.employee.groupBy({
        by: ["country"],

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

      averageSalary: Number(
        group._avg.salary ?? 0
      ),

      minimumSalary: Number(
        group._min.salary ?? 0
      ),

      maximumSalary: Number(
        group._max.salary ?? 0
      ),
    }));
  }
}