import dotenv from "dotenv";
dotenv.config();

import { createTransport, SentMessageInfo } from "nodemailer";
import { logger } from "./logger.js";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("EMAIL_USER or EMAIL_PASS is missing.");
}

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: false,
  debug: false,
});

const sendMail = async ({
  to,
  subject,
  html,
}: SendMailOptions): Promise<SentMessageInfo> => {
  try {
    const info = await transporter.sendMail({
      from: `"Sudiptyo Das" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    logger.info(
      {
        messageId: info.messageId,
      },
      "Email sent successfully",
    );

    return info;
  } catch (err) {
    logger.error({ err }, "Failed to send email");
    throw err;
  }
};

export { transporter, sendMail };
