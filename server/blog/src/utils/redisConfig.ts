import * as dotenv from 'dotenv';
import { createClient } from 'redis';
dotenv.config({ path: __dirname + '/../../.env' });

/**
 * @description - Connects to Redis Cluster
 */

export const redisClient = createClient({
  url: `${process.env.REDIS_URL}`
});
