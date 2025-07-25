import { alanLogger } from '@alanos/core';

// Add client-specific context to logs
const clientLogger = {
  info: (msg: string, ...args: any[]) => {
    alanLogger.info({ source: 'client' }, msg, ...args);
  },
  error: (msg: string, ...args: any[]) => {
    alanLogger.error({ source: 'client' }, msg, ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    alanLogger.warn({ source: 'client' }, msg, ...args);
  },
  debug: (msg: string, ...args: any[]) => {
    alanLogger.debug({ source: 'client' }, msg, ...args);
  },
};

export default clientLogger;
