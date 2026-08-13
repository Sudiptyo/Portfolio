// import * as React from "react";
// import { Section, Text } from "@react-email/components";
// import BaseTemplate from "../Template/BaseTemplate.js";

// interface RejectedProjectEmailProps {
//   name: string;
//   message?: string;
// }

// export default function RejectedProjectEmail({
//   name,
//   message,
// }: RejectedProjectEmailProps) {
//   return (
//     <BaseTemplate preview="Update regarding your project request">
//       <Text style={greeting}>
//         Hi <strong>{name}</strong>,
//       </Text>

//       <Text style={paragraph}>
//         Thank you for taking the time to share your project with me.
//       </Text>

//       <Section style={infoCard}>
//         <Text style={paragraph}>
//           {message ??
//             "After careful consideration, I won't be able to take on your project at this time. This is usually due to schedule availability or project fit, and not a reflection on the quality of your idea."}
//         </Text>
//       </Section>

//       <Text style={paragraph}>
//         I sincerely appreciate your interest and wish you every success with
//         your project.
//       </Text>

//       <Text style={signature}>
//         Best regards,
//         <br />
//         <strong>Sudiptyo Das</strong>
//       </Text>
//     </BaseTemplate>
//   );
// }

// const greeting = { color: "#F9FAFB", fontSize: "16px" };

// const paragraph = {
//   color: "#D1D5DB",
//   fontSize: "15px",
//   lineHeight: "28px",
// };

// const infoCard = {
//   backgroundColor: "#1F2937",
//   border: "1px solid #374151",
//   borderRadius: "12px",
//   padding: "20px",
//   margin: "28px 0",
// };

// const signature = {
//   color: "#D1D5DB",
//   marginTop: "30px",
// };

import * as React from "react";
import { Section, Text, Button } from "@react-email/components";
import BaseTemplate from "../Template/BaseTemplate.js";

interface RejectedProjectEmailProps {
  name: string;
  message?: string;
}

export default function RejectedProjectEmail({
  name,
  message,
}: RejectedProjectEmailProps) {
  return (
    <BaseTemplate
      preview="Update regarding your project request"
      accentColor="#DC2626"
      accentLabel="Project Rejected"
    >
      <Text style={greeting}>
        Hi <strong>{name}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for taking the time to share your project with me. I sincerely
        appreciate your interest and the opportunity to review your proposal.
      </Text>

      <Section style={statusCard}>
        <Text style={statusTitle}>Unfortunately, I'm unable to proceed.</Text>

        <Text style={statusText}>
          {message ??
            "After carefully reviewing your requirements, I won't be able to take on this project at the moment. This decision is usually based on current availability, project scope, or overall fit, and is not a reflection of the quality of your idea."}
        </Text>
      </Section>

      <Section style={infoCard}>
        <Text style={infoTitle}>Thank You</Text>

        <Text style={infoText}>
          I genuinely appreciate your interest in working with me. I wish you
          every success with your project and hope you find the right developer
          to bring your vision to life.
        </Text>
      </Section>

      <Section style={buttonSection}>
        <Button href="https://your-portfolio.com" style={button}>
          View My Portfolio
        </Button>
      </Section>

      <Text style={paragraph}>
        Thank you once again for your understanding, and I wish you all the very
        best for your project.
      </Text>
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

const statusCard = {
  backgroundColor: "#FEF2F2",
  border: "1px solid #FECACA",
  borderLeft: "5px solid #DC2626",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
};

const statusTitle = {
  color: "#B91C1C",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const statusText = {
  color: "#7F1D1D",
  fontSize: "15px",
  lineHeight: "26px",
  margin: 0,
};

const infoCard = {
  backgroundColor: "#FAFAFA",
  border: "1px solid #E5E7EB",
  borderRadius: "12px",
  padding: "22px",
  margin: "30px 0",
};

const infoTitle = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const infoText = {
  color: "#4B5563",
  fontSize: "14px",
  lineHeight: "26px",
  margin: 0,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "36px 0 12px",
};

const button = {
  backgroundColor: "#DC2626",
  color: "#FFFFFF",
  padding: "14px 26px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
};
