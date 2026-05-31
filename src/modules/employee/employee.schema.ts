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

export type CreateEmployeeInput =
  z.infer<typeof createEmployeeSchema>;

export type UpdateEmployeeInput =
  z.infer<typeof updateEmployeeSchema>;

export type Employee = z.infer<typeof employeeSchema>;