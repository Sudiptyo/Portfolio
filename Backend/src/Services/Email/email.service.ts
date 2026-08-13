import { render } from "@react-email/render";
import * as React from "react";

import ContactConfirmationEmail from "../../Emails/ContactConfirmationEmail.js";
import ApprovedProjectEmail from "../../Emails/ApprovedProjectEmail.js";
import PendingProjectEmail from "../../Emails/PendingProjectEmail.js";
import RejectedProjectEmail from "../../Emails/RejectedProjectEmail.js";

import { sendMail } from "../../Utils/nodeMailer.js";
import FeedbackThankYouEmail from "../../Emails/FeedbackThankYouEmail.js";

interface ContactConfirmationProps {
  to: string;
  name: string;
  projectType: string;
  budget?: number;
}

interface FeedbackEmailProps {
  to: string;
  name: string;
  rating: number;
}

interface StatusEmailProps {
  to: string;
  name: string;
  message?: string;
}

const sendReactEmail = async (
  element: React.ReactElement,
  to: string,
  subject: string,
) => {
  const html = await render(element);

  await sendMail({
    to,
    subject,
    html,
  });
};

const sendContactConfirmationEmail = async ({
  to,
  name,
  projectType,
  budget,
}: ContactConfirmationProps) => {
  await sendReactEmail(
    React.createElement(ContactConfirmationEmail, {
      name,
      projectType,
      budget,
    }),
    to,
    "Thanks for reaching out 🚀",
  );
};

const sendFeedbackThankYouEmail = async ({
  to,
  name,
  rating,
}: FeedbackEmailProps) => {
  await sendReactEmail(
    React.createElement(FeedbackThankYouEmail, {
      name,
      rating,
    }),
    to,
    "Thank you for your feedback 💙",
  );
};

const sendApprovedProjectEmail = async ({
  to,
  name,
}: Omit<StatusEmailProps, "message">) => {
  await sendReactEmail(
    React.createElement(ApprovedProjectEmail, {
      name,
    }),
    to,
    "Project Accepted 🎉",
  );
};

const sendRejectedProjectEmail = async ({
  to,
  name,
  message,
}: StatusEmailProps) => {
  await sendReactEmail(
    React.createElement(RejectedProjectEmail, {
      name,
      message,
    }),
    to,
    "Project Rejected",
  );
};

const sendPendingProjectEmail = async ({
  to,
  name,
  message,
}: StatusEmailProps) => {
  await sendReactEmail(
    React.createElement(PendingProjectEmail, {
      name,
      message,
    }),
    to,
    "Project Update (Pending)",
  );
};

export {
  sendContactConfirmationEmail,
  sendApprovedProjectEmail,
  sendRejectedProjectEmail,
  sendPendingProjectEmail,
  sendFeedbackThankYouEmail,
};
