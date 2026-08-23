import { logger } from "../../Utils/logger.js";
import { redis } from "../Redis/redis.service.js";

const BEST_FEEDBACK_KEY = "feedback:best";
const BEST_FEEDBACK_LIMIT = 10;
const MAX_CACHED_FEEDBACK_LIMIT = 5;
const BEST_FEEDBACK_TTL = 60 * 60;

interface CachedFeedback {
  _id: string;
  fullName: string;
  role: string;
  rating: number;
  comment: string;
  createdAt: string;
  // createdAt: Date;
  profileImage?: string;
}

// Get the best feedback from the cache
const getBestFeedback = async (): Promise<CachedFeedback[] | null> => {
  const cached = await redis.get(BEST_FEEDBACK_KEY);

  if (!cached) {
    logger.debug("Feedback cache miss");
    return null;
  }

  try {
    const feedback = JSON.parse(cached) as CachedFeedback[];

    logger.debug("Feedback cache hit");

    return feedback;
  } catch (err) {
    logger.warn(
      { err },
      "Failed to parse feedback cache; clearing corrupted cache",
    );

    await redis.del(BEST_FEEDBACK_KEY);

    return null;
  }
};

// Set the best feedback in the cache
const setBestFeedback = async (feedbacks: CachedFeedback[]): Promise<void> => {
  const bestFive = [...feedbacks]
    .sort((a, b) => {
      // Higher rating first
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }

      // Newer feedback first if rating is equal
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, MAX_CACHED_FEEDBACK_LIMIT);

  await redis.set(
    BEST_FEEDBACK_KEY,
    JSON.stringify(bestFive),
    "EX",
    BEST_FEEDBACK_TTL,
  );

  logger.debug({ count: bestFive.length }, "Feedback cache set");
};

/**
 * Update Redis when a new approved feedback is submitted.
 *
 * If Redis currently has the best-feedback cache:
 * - Add the new feedback
 * - Sort by rating DESC
 * - For equal ratings, newer feedback first
 * - Keep only the top 10
 *
 * If Redis doesn't have the cache, do nothing.
 * The next GET will rebuild it from MongoDB.
 */
const addFeedbackToCache = async (
  newFeedback: CachedFeedback,
): Promise<void> => {
  const current = await getBestFeedback();

  /*
   * If Redis has no cache yet, don't create a cache containing
   * only the newly submitted feedback.
   *
   * The next GET will fetch the actual top 5 from MongoDB.
   */
  if (!current) {
    logger.debug(
      "No existing feedback cache; MongoDB will rebuild it on next request",
    );

    return;
  }

  /*
   * Add the new feedback to the cached top 5.
   */
  const combined = [...current, newFeedback];

  /*
   * Sort:
   *
   * 1. Higher rating first
   * 2. Newer feedback first when ratings are equal
   */
  combined.sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  /*
   * Keep only the best 5.
   */
  const bestFive = combined.slice(0, MAX_CACHED_FEEDBACK_LIMIT);

  await setBestFeedback(bestFive);

  logger.debug({ count: bestFive.length }, "Feedback cache updated");
};

const clearBestFeedback = async () => {
  await redis.del(BEST_FEEDBACK_KEY);

  logger.info("Feedback cache cleared");
};

export {
  getBestFeedback,
  setBestFeedback,
  addFeedbackToCache,
  clearBestFeedback,
};
