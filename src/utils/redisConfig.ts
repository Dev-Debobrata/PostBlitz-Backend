import * as dotenv from "dotenv";
import { createClient, RedisClientOptions } from "redis";

dotenv.config({ path: __dirname + "/../.env" });

export const redisClient = createClient({
  url: `${process.env.REDIS_URL}`,
});