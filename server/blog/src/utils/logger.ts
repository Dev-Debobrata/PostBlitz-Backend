/**
 * @description - Logger
 * @constructor
 * @param {string} level - For the purpose of Debugging
 * @param {string} format - Format
 * @returns {Promise<void>} - Promise
 */

import { config } from 'dotenv';
import { createLogger, format, transports } from 'winston';

config({ path: `${__dirname}/../../.env` });

export const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.colorize(),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: `logs/error.log`,
      level: 'error'
    }),
    new transports.File({ filename: `logs/system.log` })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}
