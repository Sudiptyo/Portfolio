import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

const emailQueue = new Queue("emails", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
  },
});

export { emailQueue, connection };
