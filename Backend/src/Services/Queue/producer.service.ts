import { emailQueue } from "./Queue.service.js";

export const emailJobNames = {
  CONTACT_CONFIRMATION: "contact-confirmation",

  PROJECT_APPROVED: "project-approved",

  PROJECT_REJECTED: "project-rejected",

  PROJECT_PENDING: "project-pending",

  FEEDBACK_THANK_YOU: "feedback-thank-you",
} as const;

export const emailProducer = {
  addContactConfirmation(data: {
    to: string;
    name: string;
    projectType: string;
    budget?: number;
  }) {
    return emailQueue.add(emailJobNames.CONTACT_CONFIRMATION, data);
  },

  addProjectApproved(data: { to: string; name: string }) {
    return emailQueue.add(emailJobNames.PROJECT_APPROVED, data);
  },

  addProjectRejected(data: { to: string; name: string; message?: string }) {
    return emailQueue.add(emailJobNames.PROJECT_REJECTED, data);
  },

  addProjectPending(data: { to: string; name: string; message?: string }) {
    return emailQueue.add(emailJobNames.PROJECT_PENDING, data);
  },

  addFeedbackThankYou(data: { to: string; name: string; rating: number }) {
    return emailQueue.add(emailJobNames.FEEDBACK_THANK_YOU, data);
  },
};
