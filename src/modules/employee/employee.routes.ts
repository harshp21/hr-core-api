import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { validate } from "@/shared/middleware/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  listEmployeesSchema,
} from "./employee.schema";

export const employeeRoutes = (
  controller: EmployeeController,
) => {
  const router = Router();

  // CREATE
  router.post(
    "/",
    validate(createEmployeeSchema),
    controller.createEmployee,
  );

  // LIST
  router.get(
    "/",
    validate(listEmployeesSchema),
    controller.listEmployees,
  );

  // SALARY INSIGHTS
  router.get(
    "/salary-insights",
    controller.getSalaryInsights,
  );

  // READ ONE
  router.get(
    "/:id",
    controller.getEmployeeById,
  );

  // UPDATE
  router.put(
    "/:id",
    validate(updateEmployeeSchema),
    controller.updateEmployee,
  );

  // DELETE
  router.delete(
    "/:id",
    controller.deleteEmployee,
  );

  return router;
};