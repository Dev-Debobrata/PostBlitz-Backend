import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description - Logger
 * @constructor
 * @param {string} level - For the purpose of Debugging
 * @param {string} format - Format
 * @returns {Promise<void>} - Promise
 */

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
  ],
});