import { LogLevel } from '@nestjs/common/services/logger.service';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];

export const getLogLevels = (level: number): LogLevel[] => {
  return logLevels.slice(0, level);
};
