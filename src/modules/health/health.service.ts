// health.service.ts
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { CheckStatus, DependencyStatus, MemoryMetrics, HealthResult } from './health.types';
import { HEALTH_DEPENDENCY, HEALTH_STATUS } from './health.constants';

export const getMemoryUsage = (): MemoryMetrics => {
  const { heapUsed, heapTotal } = process.memoryUsage();
  return {
    heapUsedMB: Math.round(heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(heapTotal / 1024 / 1024),
  };
};

/**
 * Safe PostgreSQL engine verification with error handling.
 */
export const checkPostgresDatabase = async (client?: PrismaClient): Promise<DependencyStatus> => {
  const dbClient = client ?? prisma;
  try {
    await dbClient.$queryRaw`SELECT 1`;
    return { name: HEALTH_DEPENDENCY.POSTGRES, status: HEALTH_STATUS.UP };
  } catch (error) {
    console.error('Health check: Database connection failed', error);
    return { name: HEALTH_DEPENDENCY.POSTGRES, status: HEALTH_STATUS.DOWN };
  }
};

export const aggregateStatus = (dependencies: readonly DependencyStatus[]): CheckStatus =>
  dependencies.every((dep) => dep.status === HEALTH_STATUS.UP)
    ? HEALTH_STATUS.UP
    : HEALTH_STATUS.DOWN;

export const evaluateSystemHealth = async (): Promise<HealthResult> => {
  const dependencies = await Promise.all([checkPostgresDatabase()]);

  return {
    status: aggregateStatus(dependencies),
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: getMemoryUsage(),
    dependencies,
  };
};
