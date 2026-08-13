// import * as React from "react";
// import { Button, Section, Text } from "@react-email/components";
// import BaseTemplate from "../Template/BaseTemplate.js";

// interface ApprovedProjectEmailProps {
//   name: string;
// }

// export default function ApprovedProjectEmail({
//   name,
// }: ApprovedProjectEmailProps) {
//   return (
//     <BaseTemplate preview="Your project has been approved! 🎉">
//       <Text style={greeting}>
//         Hi <strong>{name}</strong>,
//       </Text>

//       <Text style={paragraph}>
//         🎉 Congratulations! After reviewing your project, I'm happy to let you
//         know that it has been <strong>approved</strong>.
//       </Text>

//       <Section style={successCard}>
//         <Text style={successTitle}>✅ Project Accepted</Text>

//         <Text style={successText}>
//           I'll contact you shortly with the project timeline, requirements, and
//           the next steps so we can get started.
//         </Text>
//       </Section>

//       <Section style={buttonSection}>
//         <Button href="https://your-portfolio.com" style={button}>
//           Visit Portfolio
//         </Button>
//       </Section>

//       <Text style={paragraph}>Looking forward to working with you! 🚀</Text>

//       <Text style={signature}>
//         Best regards,
//         <br />
//         <strong>Sudiptyo Das</strong>
//       </Text>
//     </BaseTemplate>
//   );
// }

// const greeting = {
//   color: "#F9FAFB",
//   fontSize: "16px",
// };

// const paragraph = {
//   color: "#D1D5DB",
//   fontSize: "15px",
//   lineHeight: "28px",
// };

// const successCard = {
//   backgroundColor: "#052E16",
//   border: "1px solid #22C55E",
//   borderRadius: "12px",
//   padding: "20px",
//   margin: "28px 0",
// };

// const successTitle = {
//   color: "#4ADE80",
//   fontSize: "18px",
//   fontWeight: "700",
// };

// const successText = {
//   color: "#DCFCE7",
//   fontSize: "15px",
//   lineHeight: "26px",
// };

// const buttonSection = {
//   textAlign: "center" as const,
//   margin: "32px 0",
// };

// const button = {
//   backgroundColor: "#22C55E",
//   color: "#fff",
//   padding: "14px 24px",
//   borderRadius: "8px",
//   textDecoration: "none",
// };

// const signature = {
//   color: "#D1D5DB",
//   marginTop: "30px",
// };

import * as React from "react";
import { Button, Section, Text } from "@react-email/components";
import BaseTemplate from "../Template/BaseTemplate.js";

interface ApprovedProjectEmailProps {
  name: string;
}

export default function ApprovedProjectEmail({
  name,
}: ApprovedProjectEmailProps) {
  return (
    <BaseTemplate
      preview="Your project has been approved! 🎉"
      accentColor="#16A34A"
      accentLabel="Project Approved"
    >
      <Text style={greeting}>
        Hi <strong>{name}</strong>,
      </Text>

      <Text style={paragraph}>
        Great news! After carefully reviewing your project proposal, I'm pleased
        to let you know that your project has been <strong>approved</strong>.
      </Text>

      <Section style={successCard}>
        <Text style={successTitle}>🎉 Project Approved</Text>

        <Text style={successText}>
          I'll be reaching out shortly with the project timeline, milestones,
          required information, and the next steps to officially kick things
          off.
        </Text>
      </Section>

      <Text style={paragraph}>
        Thank you for choosing to work with me. I'm excited to bring your idea
        to life and look forward to building something amazing together.
      </Text>

      <Section style={buttonSection}>
        <Button href="https://your-portfolio.com" style={button}>
          Visit Portfolio
        </Button>
      </Section>
    </BaseTemplate>
  );
}

const greeting = {
  color: "#111827",
  fontSize: "16px",
  lineHeight: "28px",
  marginBottom: "16px",
};

const paragraph = {
  color: "#4B5563",
  fontSize: "15px",
  lineHeight: "28px",
  margin: "0 0 20px",
};

const successCard = {
  backgroundColor: "#F0FDF4",
  border: "1px solid #BBF7D0",
  borderLeft: "5px solid #16A34A",
  borderRadius: "12px",
  padding: "22px",
  margin: "32px 0",
};

const successTitle = {
  color: "#166534",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const successText = {
  color: "#166534",
  fontSize: "15px",
  lineHeight: "26px",
  margin: 0,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "36px 0 12px",
};

const button = {
  backgroundColor: "#16A34A",
  color: "#FFFFFF",
  padding: "14px 26px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
};
