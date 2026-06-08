import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";

import { generateEmployees } from "./utils/employee-generator";
const prisma = new PrismaClient();

const EMPLOYEE_COUNT = 10_000;
const BATCH_SIZE = 1_000;

async function main() {
  console.log("Cleaning existing employees...");

  await prisma.employee.deleteMany({});

  console.log("Existing employees deleted.");

  const firstNamesPath = path.resolve(
    process.cwd(),
    "prisma",
    "data",
    "first-names.txt",
  );

  const lastNamesPath = path.resolve(
    process.cwd(),
    "prisma",
    "data",
    "last-names.txt",
  );

  const firstNames = fs
    .readFileSync(firstNamesPath, "utf8")
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean);

  const lastNames = fs
    .readFileSync(lastNamesPath, "utf8")
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean);

  const employees = generateEmployees({
    count: EMPLOYEE_COUNT,
    firstNames,
    lastNames,
  });

  console.log(
    `Generating ${EMPLOYEE_COUNT.toLocaleString()} employees...`,
  );

  for (
    let i = 0;
    i < employees.length;
    i += BATCH_SIZE
  ) {
    await prisma.employee.createMany({
      data: employees.slice(
        i,
        i + BATCH_SIZE,
      ),
    });

    console.log(
      `Inserted ${Math.min(
        i + BATCH_SIZE,
        employees.length,
      )} employees`,
    );
  }

  console.log(
    `Successfully seeded ${EMPLOYEE_COUNT.toLocaleString()} employees`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });