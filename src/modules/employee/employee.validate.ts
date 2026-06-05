import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),

  department: z.string().min(1),
  country: z.string().min(1),

  salary: z.number().positive(),

  jobTitle: z.string().min(1),
  currency: z.string().min(1),
  employmentType: z.string().min(1),

  dateOfJoining: z.string(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();
