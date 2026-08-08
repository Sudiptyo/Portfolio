import { baseTemplate } from "./base.template.js";

interface ContactConfirmationEmailProps {
  name: string;
  projectType: string;
  budget?: number;
}

export const contactConfirmationEmail = ({
  name,
  projectType,
  budget,
}: ContactConfirmationEmailProps): string =>
  baseTemplate(`
  <p>Hi <strong>${name || "there"}</strong>,</p>

  <p>
    Thanks for reaching out and sharing your project details 🙌
    I’ve received your request and will review it carefully.
  </p>

  <!-- Project Summary Card -->
  <div style="
    margin-top:20px;
    background:#1f2937;
    padding:16px;
    border-radius:10px;
    border:1px solid #374151;
  ">
    <p style="margin:0;font-size:13px;color:#9ca3af;">Project Type</p>
    <p style="margin:4px 0 12px 0;font-weight:600;">${projectType}</p>

    <p style="margin:0;font-size:13px;color:#9ca3af;">Estimated Budget</p>
    <p style="margin:4px 0;font-weight:600;">
      ₹${budget ? budget.toLocaleString("en-IN") : "Not specified"}
    </p>
  </div>

  <p style="margin-top:20px;">
    ⏳ I usually respond within <strong>24–48 hours</strong>.
  </p>

  <p>
    If your project aligns well, we'll move forward with the next steps.
  </p>

  <p style="margin-top:24px;">
    Looking forward to working with you 🚀
  </p>

<table cellpadding="0" cellspacing="0" style="margin-top:16px;">
  <tr>
    <td align="center" bgcolor="#22c55e" style="border-radius:6px;">
      <a href="https://your-portfolio.com"
         style="display:inline-block;padding:10px 16px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;">
        View My Work
      </a>
    </td>
  </tr>
</table>

  <p>
    Best regards,<br/>
    <strong>Sudiptyo Das</strong><br/>
    <span style="color:#9ca3af;">Full Stack Developer</span>
  </p>
`);