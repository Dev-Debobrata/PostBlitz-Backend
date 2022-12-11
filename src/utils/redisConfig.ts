import * as dotenv from "dotenv";
import { createClient } from "redis";
import { logger } from './logger';

dotenv.config({ path: __dirname + "/../.env" });

export const redisClient = createClient({
  url: `${process.env.REDIS_URL}`,
}); 
