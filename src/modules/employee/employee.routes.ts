import { Router } from "express";

import { employeeService } from "@container/employee.container";

import { EmployeeController } from "./employee.controller";

const router = Router();

const controller =
  new EmployeeController(employeeService);

router.post(
  "/",
  controller.createEmployee.bind(controller),
);

router.get(
  "/",
  controller.listEmployees.bind(controller),
);

router.get(
  "/insights",
  controller.getSalaryInsights.bind(controller),
);

router.get(
  "/:id",
  controller.getEmployeeById.bind(controller),
);

router.put(
  "/:id",
  controller.updateEmployee.bind(controller),
);

router.delete(
  "/:id",
  controller.deleteEmployee.bind(controller),
);

export { router as employeeRoutes };