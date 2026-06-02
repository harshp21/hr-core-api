import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { asyncHandler } from "@shared/utils/asyncHandler";

export const employeeRoutes = (
  controller: EmployeeController,
) => {
  const router = Router();

  // CREATE
  router.post(
    "/",
    asyncHandler((req, res) => controller.createEmployee(req, res)),
  );

  // LIST
  router.get(
    "/",
    asyncHandler((req, res) => controller.listEmployees(req, res)),
  );

  // SALARY INSIGHTS
  router.get(
    "/salary-insights",
    asyncHandler((req, res) => controller.getSalaryInsights(req, res)),
  );

  // READ ONE
  router.get(
    "/:id",
    asyncHandler((req, res) => controller.getEmployeeById(req, res)),
  );

  // UPDATE
  router.put(
    "/:id",
    asyncHandler((req, res) => controller.updateEmployee(req, res)),
  );

  // DELETE
  router.delete(
    "/:id",
    asyncHandler((req, res) => controller.deleteEmployee(req, res)),
  );

  return router;
};