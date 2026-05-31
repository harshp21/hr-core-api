export const HEALTH_ROUTE_PATH = '/';

export const HEALTH_DEPENDENCY = {
  POSTGRES: 'postgres',
} as const;

export const HEALTH_STATUS = {
  UP: 'UP',
  DOWN: 'DOWN',
} as const;

export const HEALTH_ERROR_MESSAGE = {
  UNKNOWN_EXECUTION_FAILURE: 'Unknown functional execution failure',
} as const;
