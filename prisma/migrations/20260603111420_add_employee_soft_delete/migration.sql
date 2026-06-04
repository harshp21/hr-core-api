-- DropIndex
DROP INDEX "Employee_country_department_idx";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "salary" SET DATA TYPE DECIMAL(65,30);
