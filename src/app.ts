import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@config/env';
import { healthModule } from '@modules/health';
import { errorHandler } from '@shared/middleware/error-handler.middleware';
import { notFoundHandler } from '@shared/middleware/notFound.middleware';
import { employeeRouter } from './modules/employee/employee.container';
import { analyticsRouter } from './modules/analytics/analytics.container';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigins }));
app.use(express.json());
app.use(morgan('combined'));

app.use('/', healthModule);
app.use('/api/v1/employees', employeeRouter);

app.use('/api/v1/analytics', analyticsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
