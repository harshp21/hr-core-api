import { z } from "zod";

const requiredText = z.string().trim().min(1);
const positiveSalary = z.number().gt(0);

export const employeeSchema = z.object({
  employeeCode: requiredText,
  firstName: requiredText,
  lastName: requiredText,
  email: z.string().email(),
  country: requiredText,
  department: requiredText,
  jobTitle: requiredText,
  salary: positiveSalary,
  currency: requiredText,
  employmentType: requiredText,
  dateOfJoining: requiredText,
});

export const createEmployeeSchema = employeeSchema;

export const updateEmployeeSchema = employeeSchema
  .omit({
    employeeCode: true,
    email: true,
  })
  .partial();

export const employeeEntitySchema =
  employeeSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });


export const listEmployeesQuerySchema =
  z.object({
    page: z.coerce.number().int().positive().default(1),

    pageSize: z.coerce.number()
      .int()
      .positive()
      .max(100)
      .default(20),

    search: z.string().optional(),

    country: z.string().optional(),

    department: z.string().optional(),

    sortBy: z.enum([
      "firstName",
      "salary",
      "dateOfJoining",
    ]).optional(),

    sortOrder: z.enum([
      "asc",
      "desc",
    ]).optional(),
  });

export type CreateEmployeeInput =
  z.infer<typeof createEmployeeSchema>;

export type UpdateEmployeeInput =
  z.infer<typeof updateEmployeeSchema>;

export type ListEmployeesQuery =
  z.infer<typeof listEmployeesQuerySchema>;

export interface PaginatedEmployees {
  data: Employee[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SalaryInsights {
  totalEmployees: number;
  totalPayroll: number;
  averageSalary: number;
}

export type Employee = z.infer<typeof employeeSchema>;