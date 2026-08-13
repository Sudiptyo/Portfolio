// import * as React from "react";
// import { Section, Text } from "@react-email/components";
// import BaseTemplate from "../Template/BaseTemplate.js";

// interface PendingProjectEmailProps {
//   name: string;
//   message?: string;
// }

// export default function PendingProjectEmail({
//   name,
//   message,
// }: PendingProjectEmailProps) {
//   return (
//     <BaseTemplate preview="Your project is currently under review">
//       <Text style={greeting}>
//         Hi <strong>{name}</strong>,
//       </Text>

//       <Text style={paragraph}>Thank you for your submission.</Text>

//       <Section style={pendingCard}>
//         <Text style={pendingTitle}>⏳ Project Status: Under Review</Text>

//         <Text style={pendingText}>
//           {message ??
//             "I'm currently reviewing your project carefully. You can expect an update within the next few days."}
//         </Text>
//       </Section>

//       <Text style={paragraph}>
//         Thanks for your patience. I appreciate your interest and will get back
//         to you as soon as possible.
//       </Text>

//       <Text style={signature}>
//         Regards,
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

// const pendingCard = {
//   backgroundColor: "#1E293B",
//   border: "1px solid #FACC15",
//   borderRadius: "12px",
//   padding: "20px",
//   margin: "28px 0",
// };

// const pendingTitle = {
//   color: "#FACC15",
//   fontWeight: "700",
//   fontSize: "17px",
// };

// const pendingText = {
//   color: "#E5E7EB",
//   fontSize: "15px",
//   lineHeight: "26px",
// };

// const signature = {
//   color: "#D1D5DB",
//   marginTop: "30px",
// };

import * as React from "react";
import { Section, Text } from "@react-email/components";
import BaseTemplate from "../Template/BaseTemplate.js";

interface PendingProjectEmailProps {
  name: string;
  message?: string;
}

export default function PendingProjectEmail({
  name,
  message,
}: PendingProjectEmailProps) {
  return (
    <BaseTemplate
      preview="Your project is currently under review"
      accentColor="#EAB308"
      accentLabel="Project Pending"
    >
      <Text style={greeting}>
        Hi <strong>{name}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for submitting your project proposal. I appreciate the time
        you've taken to provide the project details.
      </Text>

      <Section style={statusCard}>
        <Text style={statusTitle}>⏳ Project Under Review</Text>

        <Text style={statusText}>
          {message ??
            "Your project is currently being reviewed. I'm evaluating the requirements, timeline, and scope to ensure I can deliver the best possible outcome."}
        </Text>
      </Section>

      <Section style={timelineCard}>
        <Text style={timelineTitle}>📅 What's Next?</Text>

        <Text style={timelineText}>
          • Your requirements are being reviewed carefully.
          <br />
          • I may contact you if additional information is needed.
          <br />• You'll receive another update as soon as the review is
          complete.
        </Text>
      </Section>

      <Text style={paragraph}>
        Thank you for your patience and understanding. I appreciate your
        interest and will get back to you as soon as possible.
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
  backgroundColor: "#FEFCE8",
  border: "1px solid #FDE68A",
  borderLeft: "5px solid #EAB308",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
};

const statusTitle = {
  color: "#A16207",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const statusText = {
  color: "#854D0E",
  fontSize: "15px",
  lineHeight: "26px",
  margin: 0,
};

const timelineCard = {
  backgroundColor: "#FFFDF5",
  border: "1px solid #FDE68A",
  borderRadius: "12px",
  padding: "22px",
  margin: "30px 0",
};

const timelineTitle = {
  color: "#A16207",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const timelineText = {
  color: "#854D0E",
  fontSize: "14px",
  lineHeight: "26px",
  margin: 0,
};
