import { z } from 'zod';

export const countrySalaryInsightSchema = z.object({
  country: z.string(),
  employeeCount: z.number(),
  averageSalary: z.number(),
  minimumSalary: z.number(),
  maximumSalary: z.number(),
});

export const jobTitleSalaryInsightsQuerySchema = z.object({
  country: z.string().trim().min(1),
});

export interface JobTitleSalaryInsight {
  jobTitle: string;
  averageSalary: number;
}
export interface DepartmentSalaryInsight {
  department: string;
  averageSalary: number;
  employeeCount: number;
}

export type CountrySalaryInsight = z.infer<typeof countrySalaryInsightSchema>;
