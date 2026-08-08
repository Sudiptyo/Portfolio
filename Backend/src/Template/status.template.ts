import { baseTemplate } from "./base.template.js";

export const approvedProjectEmail = (name: string): string =>
  baseTemplate(`
  <p>Hi <strong>${name}</strong>,</p>

  <p>🎉 Great news! Your project has been <strong style="color:#22c55e;">accepted</strong>.</p>

  <p>I’m excited to work with you. I’ll reach out shortly with the next steps.</p>

  <p style="margin-top:20px;">
    Thanks,<br/>
    <strong>Sudiptyo Das</strong>
  </p>
`);

export const rejectedProjectEmail = (
  name: string,
  message?: string,
): string =>
  baseTemplate(`
  <p>Hi <strong>${name}</strong>,</p>

  <p>Thank you for reaching out and sharing your project.</p>

  <p>
    ${
      message ??
      "After reviewing your request, I won’t be able to take this on right now. However, I’d be happy to connect in the future."
    }
  </p>

  <p style="margin-top:20px;">
    I truly appreciate your interest and wish you the best for your project.
  </p>

  <p>
    Thanks,<br/>
    <strong>Sudiptyo Das</strong>
  </p>
`);

export const pendingProjectEmail = (
  name: string,
  message?: string,
): string =>
  baseTemplate(`
  <p>Hi <strong>${name}</strong>,</p>

  <p>Your project is currently under review.</p>

  <p style="background:#1f2937;padding:12px;border-radius:8px;color:#d1d5db;">
    ${message ?? "I'll get back to you within a few days."}
  </p>

  <p style="margin-top:20px;">
    Thanks for your patience 🙏
  </p>

  <p>
    Regards,<br/>
    <strong>Sudiptyo Das</strong>
  </p>
`);