import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

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