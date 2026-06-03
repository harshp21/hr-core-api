import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "@config/env";
import { healthModule } from "@modules/health";
import { errorHandler } from "@shared/middleware/error-handler.middleware";
import { employeeRouter } from "./modules/employee/employee.container";
import analyticsRoutes from "./modules/analytics/analytics.routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigins }));
app.use(express.json());
app.use(morgan("combined"));


app.use("/", healthModule);
app.use(
  "/api/employees",
  employeeRouter,
);

app.use(
  "/api/v1/analytics",
  analyticsRoutes,
);

app.use(errorHandler);


export default app;
