import { z } from "zod";

export const countrySalaryInsightSchema = z.object({
  country: z.string(),
  employeeCount: z.number(),
  averageSalary: z.number(),
  minimumSalary: z.number(),
  maximumSalary: z.number(),
});

export interface JobTitleSalaryInsight {
  jobTitle: string;
  averageSalary: number;
}

export type CountrySalaryInsight = z.infer<
  typeof countrySalaryInsightSchema
>;