import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "@config/env";
import { healthModule } from "@modules/health";
import { errorHandler } from "@shared/middleware/error.middleware";
import { notFoundHandler } from "@shared/middleware/notFound.middleware";
import { HttpStatus } from "@shared/constants/httpStatus";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigins }));
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (_req, res) => {
  res.status(HttpStatus.OK).json({ service: env.appName, status: "ready" });
});

app.use("/", healthModule);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
