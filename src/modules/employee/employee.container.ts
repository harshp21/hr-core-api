import { EmployeeService } from "./employee.service";
import { PrismaEmployeeRepository } from "./repositories/prisma-employee.repository";
import { EmployeeController } from "./employee.controller";

const repository = new PrismaEmployeeRepository(prisma); // ensure prisma imported

const service = new EmployeeService(repository);

export const employeeController = new EmployeeController(service);

export const employeeRouter = employeeRoutes(employeeController);