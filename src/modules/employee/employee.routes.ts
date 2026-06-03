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
    asyncHandler(controller.createEmployee),
  );

  // LIST
  router.get(
    "/",
    asyncHandler(controller.listEmployees),
  );

  // READ ONE
  router.get(
    "/:id",
    asyncHandler(controller.getEmployeeById),
  );

  // UPDATE
  router.put(
    "/:id",
    asyncHandler(controller.updateEmployee),
  );

  // DELETE
  router.delete(
    "/:id",
    asyncHandler(controller.deleteEmployee),
  );

  return router;
};