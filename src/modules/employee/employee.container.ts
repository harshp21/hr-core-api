import { EmployeeService } from "./employee.service";
import { prisma } from "../../lib/prisma";
import { PrismaEmployeeRepository } from "./prisma-employee.repository";
import { EmployeeController } from "./employee.controller";
import { employeeRoutes } from "./employee.routes";

const repository = new PrismaEmployeeRepository(prisma);

const service = new EmployeeService(repository);

export const employeeController = new EmployeeController(service);

export const employeeRouter = employeeRoutes(employeeController);