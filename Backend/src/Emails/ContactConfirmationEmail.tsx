// // emails/ContactConfirmationEmail.tsx

// import * as React from "react";
// import {
//   Button,
//   Section,
//   Text,
// } from "@react-email/components";
// import BaseTemplate from "../Template/BaseTemplate.js";

// interface ContactConfirmationEmailProps {
//   name: string;
//   projectType: string;
//   budget?: number;
// }

// export default function ContactConfirmationEmail({
//   name,
//   projectType,
//   budget,
// }: ContactConfirmationEmailProps) {
//   return (
//     <BaseTemplate preview="Thanks for reaching out! I've received your project request.">
//       <Text style={greeting}>
//         Hi <strong>{name || "there"}</strong>,
//       </Text>

//       <Text style={paragraph}>
//         Thanks for reaching out and sharing your project details 🙌
//         <br />
//         I've received your request and will review it carefully.
//       </Text>

//       {/* Project Summary */}

//       <Section style={card}>
//         <Text style={label}>Project Type</Text>

//         <Text style={value}>{projectType}</Text>

//         <Text style={label}>Estimated Budget</Text>

//         <Text style={value}>
//           {budget
//             ? `₹${budget.toLocaleString("en-IN")}`
//             : "Not specified"}
//         </Text>
//       </Section>

//       <Text style={paragraph}>
//         ⏳ I usually respond within <strong>24–48 hours</strong>.
//       </Text>

//       <Text style={paragraph}>
//         If your project aligns well with my expertise, I'll get back to you
//         with the next steps.
//       </Text>

//       <Section style={buttonSection}>
//         <Button
//           href="https://your-portfolio.com"
//           style={button}
//         >
//           View My Portfolio
//         </Button>
//       </Section>

//       <Text style={paragraph}>
//         Looking forward to working with you 🚀
//       </Text>

//       <Text style={signature}>
//         Best regards,
//         <br />
//         <strong>Sudiptyo Das</strong>
//         <br />
//         <span style={{ color: "#9CA3AF" }}>
//           Full Stack Developer
//         </span>
//       </Text>
//     </BaseTemplate>
//   );
// }

// const greeting = {
//   color: "#F9FAFB",
//   fontSize: "16px",
//   lineHeight: "28px",
// };

// const paragraph = {
//   color: "#D1D5DB",
//   fontSize: "15px",
//   lineHeight: "28px",
// };

// const card = {
//   backgroundColor: "#1F2937",
//   border: "1px solid #374151",
//   borderRadius: "12px",
//   padding: "20px",
//   margin: "28px 0",
// };

// const label = {
//   color: "#9CA3AF",
//   fontSize: "13px",
//   marginBottom: "4px",
// };

// const value = {
//   color: "#F9FAFB",
//   fontSize: "16px",
//   fontWeight: "600",
//   marginTop: "0",
//   marginBottom: "18px",
// };

// const buttonSection = {
//   textAlign: "center" as const,
//   margin: "36px 0",
// };

// const button = {
//   background: "linear-gradient(135deg,#2563EB,#7C3AED)",
//   color: "#FFFFFF",
//   padding: "14px 26px",
//   borderRadius: "10px",
//   textDecoration: "none",
//   fontWeight: "600",
//   fontSize: "15px",
// };

// const signature = {
//   color: "#D1D5DB",
//   fontSize: "15px",
//   lineHeight: "28px",
//   marginTop: "32px",
// };

import * as React from "react";
import { Button, Section, Text } from "@react-email/components";
import BaseTemplate from "../Template/BaseTemplate.js";

interface ContactConfirmationEmailProps {
  name: string;
  projectType: string;
  budget?: number;
}

export default function ContactConfirmationEmail({
  name,
  projectType,
  budget,
}: ContactConfirmationEmailProps) {
  return (
    <BaseTemplate
      preview="Thanks for reaching out! Your project request has been received."
      accentColor="#2563EB"
      accentLabel="Contact Confirmation"
    >
      <Text style={greeting}>
        Hi <strong>{name || "there"}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for getting in touch and sharing your project idea. Your
        inquiry has been received successfully and I'll review the information
        carefully.
      </Text>

      <Section style={summaryCard}>
        <Text style={cardTitle}>Project Summary</Text>

        <Section style={item}>
          <Text style={label}>Project Type</Text>
          <Text style={value}>{projectType}</Text>
        </Section>

        <Section style={item}>
          <Text style={label}>Estimated Budget</Text>
          <Text style={value}>
            {budget ? `₹${budget.toLocaleString("en-IN")}` : "Not specified"}
          </Text>
        </Section>
      </Section>

      <Section style={timelineCard}>
        <Text style={timelineTitle}>📅 What happens next?</Text>

        <Text style={timelineText}>
          • I'll carefully review your requirements.
          <br />
          • If additional information is needed, I'll contact you.
          <br />• You'll typically receive a response within{" "}
          <strong>24–48 hours.</strong>
        </Text>
      </Section>

      <Text style={paragraph}>
        I appreciate the opportunity to work with you and look forward to
        discussing your project further.
      </Text>

      <Section style={buttonSection}>
        <Button href="https://your-portfolio.com" style={button}>
          View My Portfolio
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

const summaryCard = {
  backgroundColor: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderLeft: "5px solid #2563EB",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
};

const cardTitle = {
  color: "#111827",
  fontSize: "17px",
  fontWeight: "700",
  margin: "0 0 20px",
};

const item = {
  marginBottom: "18px",
};

const label = {
  color: "#6B7280",
  fontSize: "13px",
  margin: "0 0 6px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const value = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  margin: 0,
};

const timelineCard = {
  backgroundColor: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderRadius: "12px",
  padding: "22px",
  margin: "30px 0",
};

const timelineTitle = {
  color: "#1D4ED8",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const timelineText = {
  color: "#1E40AF",
  fontSize: "14px",
  lineHeight: "26px",
  margin: 0,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "36px 0 12px",
};

const button = {
  backgroundColor: "#2563EB",
  color: "#FFFFFF",
  padding: "14px 26px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
};
