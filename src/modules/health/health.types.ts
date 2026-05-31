// health.types.ts

/**
 * Represents the status of the entire system or an individual dependency
 */
export type CheckStatus = 'UP' | 'DOWN';

/**
 * Immutable system memory evaluation metrics in Megabytes
 */
export interface MemoryMetrics {
  readonly heapUsedMB: number;
  readonly heapTotalMB: number;
}

/**
 * Individual tracking status block for external infrastructure like PostgreSQL or Redis
 */
export interface DependencyStatus {
  readonly name: 'postgres' | string; // Type safety for explicit dependencies
  readonly status: CheckStatus;
}

/**
 * Complete, standardized payload contract returned by the /health endpoint
 */
export interface HealthResult {
  readonly status: CheckStatus;
  readonly timestamp: string; // ISO 8601 string format
  readonly uptime: number;     // Application process uptime in seconds
  readonly memory: MemoryMetrics;
  readonly dependencies: readonly DependencyStatus[]; // Readonly array to prevent array mutations
}
