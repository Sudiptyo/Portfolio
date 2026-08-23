import { Redis } from "ioredis";
import { logger } from "../../Utils/logger.js";

const REDIS_URL: string = process.env.REDIS_URL ?? "redis://localhost:6379";

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

redis.on("error", (err) => logger.error({ err }, "Redis client error"));

redis.on("connect", () => logger.info("Redis client connected"));
