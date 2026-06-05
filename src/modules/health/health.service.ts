// health.service.ts
import { PrismaClient } from '@prisma/client';
import { CheckStatus, DependencyStatus, MemoryMetrics, HealthResult } from './health.types';
import { HEALTH_DEPENDENCY, HEALTH_STATUS } from './health.constants';

let prismaClient: PrismaClient | null = null;

const getPrismaClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
};

export const getMemoryUsage = (): MemoryMetrics => {
  const { heapUsed, heapTotal } = process.memoryUsage();
  return {
    heapUsedMB: Math.round(heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(heapTotal / 1024 / 1024),
  };
};

/**
 * Functional Task: Safe PostgreSQL engine verification
 */
export const checkPostgresDatabase = async (client: PrismaClient): Promise<DependencyStatus> => {
  try {
    // Standard Postgres connection assertion query
    await client.$queryRaw`SELECT 1`;
    return { name: HEALTH_DEPENDENCY.POSTGRES, status: HEALTH_STATUS.UP };
  } catch {
    return { name: HEALTH_DEPENDENCY.POSTGRES, status: HEALTH_STATUS.DOWN };
  }
};

export const aggregateStatus = (dependencies: readonly DependencyStatus[]): CheckStatus =>
  dependencies.every((dep) => dep.status === HEALTH_STATUS.UP)
    ? HEALTH_STATUS.UP
    : HEALTH_STATUS.DOWN;

export const evaluateSystemHealth = async (): Promise<HealthResult> => {
  const dependencies = await Promise.all([checkPostgresDatabase(getPrismaClient())]);

  return {
    status: aggregateStatus(dependencies),
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: getMemoryUsage(),
    dependencies,
  };
};
