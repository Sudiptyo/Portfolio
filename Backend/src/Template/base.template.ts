export const baseTemplate = (content: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Thanks for reaching out! I’ve received your project and will review it shortly.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:20px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" style="max-width:600px;background:#111827;border-radius:12px;padding:24px;color:#e5e7eb;" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td style="font-size:20px;font-weight:bold;color:#ffffff;padding-bottom:10px;">
              🚀 Sudiptyo Das — Full Stack Developer
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-bottom:1px solid #374151;padding-bottom:10px;"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding-top:20px;font-size:15px;line-height:1.6;">
              ${content}
            </td>
          </tr>

          <!-- Extra Message -->
          <tr>
            <td style="padding-top:20px;font-size:13px;color:#9ca3af;text-align:center;">
              If you have any additional details or questions, feel free to reply to this email.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:30px;font-size:12px;color:#9ca3af;text-align:center;">
              © ${new Date().getFullYear()} Sudiptyo Das. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
