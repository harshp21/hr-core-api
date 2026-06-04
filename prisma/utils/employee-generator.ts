import { Prisma } from "@prisma/client";

import { COUNTRIES } from "../constants/countries";
import { DEPARTMENTS } from "../constants/departments";
import { JOB_TITLES } from "../constants/job-titles";
import { EMPLOYMENT_TYPES } from "../constants/employment-types";

import {
  randomItem,
  randomSalary,
} from "../utils/random-utils";

export type SeedEmployee =
  Prisma.EmployeeCreateManyInput;

export interface GenerateEmployeesOptions {
  count: number;
  firstNames: string[];
  lastNames: string[];
}

export function generateEmployees({
  count,
  firstNames,
  lastNames,
}: GenerateEmployeesOptions): SeedEmployee[] {
  const employees: SeedEmployee[] = [];

  for (let i = 1; i <= count; i++) {
    employees.push({
      employeeCode: `EMP${String(i).padStart(5, "0")}`,
      firstName: randomItem(firstNames),
      lastName: randomItem(lastNames),
      email: `employee${i}@acme.com`,
      country: randomItem(COUNTRIES),
      department: randomItem(DEPARTMENTS),
      jobTitle: randomItem(JOB_TITLES),
      salary: randomSalary(),
      currency: "USD",
      employmentType: randomItem(
        EMPLOYMENT_TYPES,
      ),
      dateOfJoining: new Date(),
      isDeleted: false,
    });
  }

  return employees;
}