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

type Country = (typeof COUNTRIES)[number];
type Department = (typeof DEPARTMENTS)[number];

type CountryWeightedItem = {
  country: Country;
  weight: number;
};

const COUNTRY_CURRENCY: Record<
  (typeof COUNTRIES)[number],
  string
> = {
  India: "INR",
  "United States": "USD",
  "United Kingdom": "GBP",
  Germany: "EUR",
  Canada: "CAD",
  Australia: "AUD",
};

const EMAIL_DOMAINS = [
  "acme.com",
  "globex.com",
  "initech.io",
  "umbrella.dev",
] as const;

const DEPARTMENT_JOB_TITLES: Record<
  (typeof DEPARTMENTS)[number],
  readonly (typeof JOB_TITLES)[number][]
> = {
  Engineering: [
    "Software Engineer",
    "Senior Software Engineer",
    "Engineering Manager",
  ],
  HR: ["HR Manager"],
  Finance: ["Financial Analyst"],
  Marketing: ["Marketing Specialist"],
  Sales: ["Sales Executive"],
};

const DATE_JOINING_START = new Date("2018-01-01T00:00:00.000Z").getTime();
const GLOBAL_MIN_SALARY = 30000;
const GLOBAL_MAX_SALARY = 300000;

function randomDateOfJoining(): Date {
  const now = Date.now();
  const timestamp = Math.floor(
    Math.random() * (now - DATE_JOINING_START) + DATE_JOINING_START,
  );

  return new Date(timestamp);
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createRunCountryWeights(): CountryWeightedItem[] {
  const rawWeights = COUNTRIES.map((country) => ({
    country,
    raw: randomFloat(0.4, 2.2),
  }));

  const totalRaw = rawWeights.reduce((sum, item) => sum + item.raw, 0);

  return rawWeights.map((item) => ({
    country: item.country,
    weight: item.raw / totalRaw,
  }));
}

function weightedRandomCountry(
  runCountryWeights: CountryWeightedItem[],
): Country {
  const value = Math.random();
  let cumulative = 0;

  for (const item of runCountryWeights) {
    cumulative += item.weight;

    if (value <= cumulative) {
      return item.country;
    }
  }

  return runCountryWeights[runCountryWeights.length - 1].country;
}

function createRunCountrySalaryFactors(): Record<Country, number> {
  return COUNTRIES.reduce((factors, country) => {
    factors[country] = randomFloat(0.72, 1.38);
    return factors;
  }, {} as Record<Country, number>);
}

function createRunDepartmentSalaryFactors(): Record<Department, number> {
  return DEPARTMENTS.reduce((factors, department) => {
    factors[department] = randomFloat(0.78, 1.24);
    return factors;
  }, {} as Record<Department, number>);
}

function salaryRangeFor(
  country: Country,
  department: Department,
  runCountrySalaryFactors: Record<Country, number>,
  runDepartmentSalaryFactors: Record<Department, number>,
): { min: number; max: number } {
  const combinedFactor = runCountrySalaryFactors[country] * runDepartmentSalaryFactors[department];
  const min = Math.max(25000, Math.floor(GLOBAL_MIN_SALARY * combinedFactor * 0.78));
  const max = Math.min(350000, Math.floor(GLOBAL_MAX_SALARY * combinedFactor * 1.02));

  if (max <= min) {
    return {
      min,
      max: min + 1000,
    };
  }

  return {
    min,
    max,
  };
}

function normalizeNameForEmail(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 12);
}

function createSeedRunToken(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase();

  return `${timestamp}-${random}`;
}

export function generateEmployees({
  count,
  firstNames,
  lastNames,
}: GenerateEmployeesOptions): SeedEmployee[] {
  const employees: SeedEmployee[] = [];
  const seedRunToken = createSeedRunToken();
  const runCountryWeights = createRunCountryWeights();
  const runCountrySalaryFactors = createRunCountrySalaryFactors();
  const runDepartmentSalaryFactors = createRunDepartmentSalaryFactors();

  for (let i = 1; i <= count; i++) {
    const country = weightedRandomCountry(runCountryWeights);
    const department = randomItem(DEPARTMENTS);
    const departmentJobTitles = DEPARTMENT_JOB_TITLES[department];
    const salaryRange = salaryRangeFor(
      country,
      department,
      runCountrySalaryFactors,
      runDepartmentSalaryFactors,
    );
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const emailDomain = randomItem(EMAIL_DOMAINS);
    const emailLocalPart = `${normalizeNameForEmail(firstName)}.${normalizeNameForEmail(lastName)}.${seedRunToken.toLowerCase()}.${i}`;

    employees.push({
      employeeCode: `EMP-${seedRunToken}-${String(i).padStart(5, "0")}`,
      firstName,
      lastName,
      email: `${emailLocalPart}@${emailDomain}`,
      country,
      department,
      jobTitle: randomItem(departmentJobTitles),
      salary: randomSalary(
        salaryRange.min,
        salaryRange.max,
      ),
      currency: COUNTRY_CURRENCY[country],
      employmentType: randomItem(
        EMPLOYMENT_TYPES,
      ),
      dateOfJoining: randomDateOfJoining(),
      isDeleted: false,
    });
  }

  return employees;
}