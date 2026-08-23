import { Job, Worker } from "bullmq";
import { connection } from "./Queue.service.js";
import { emailJobNames } from "./producer.service.js";
import {
  sendApprovedProjectEmail,
  sendContactConfirmationEmail,
  sendFeedbackThankYouEmail,
  sendPendingProjectEmail,
  sendRejectedProjectEmail,
} from "../Email/email.service.js";
import { logger } from "../../Utils/logger.js";

const worker = new Worker(
  "emails",
  async (job: Job) => {
    switch (job.name) {
      case emailJobNames.CONTACT_CONFIRMATION:
        await sendContactConfirmationEmail(job.data);
        break;

      case emailJobNames.PROJECT_APPROVED:
        await sendApprovedProjectEmail(job.data);
        break;

      case emailJobNames.PROJECT_REJECTED:
        await sendRejectedProjectEmail(job.data);
        break;

      case emailJobNames.PROJECT_PENDING:
        await sendPendingProjectEmail(job.data);
        break;

      case emailJobNames.FEEDBACK_THANK_YOU:
        await sendFeedbackThankYouEmail(job.data);
        break;

      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  },
  {
    connection: connection,
    concurrency: 5,
  },
);

worker.on("completed", (job) => {
  logger.info(
    {
      jobId: job.id,
      jobName: job.name,
    },
    "Email job completed",
  );
});

worker.on("failed", (job, err) => {
  if (!job) {
    logger.error({ err }, "Email job failed without job information");
    return;
  }

  logger.error(
    {
      err,
      jobId: job.id,
      jobName: job.name,
    },
    "Email job failed",
  );
});

worker.on("error", (err) => {
  logger.error({ err }, "Email worker error");
});
