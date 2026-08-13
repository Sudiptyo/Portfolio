// // emails/components/BaseTemplate.tsx
// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";
// import * as React from "react";

// interface BaseTemplateProps {
//   preview: string;
//   children: React.ReactNode;
// }

// export default function BaseTemplate({ preview, children }: BaseTemplateProps) {
//   return (
//     <Html>
//       <Head />
//       <Preview>{preview}</Preview>

//       <Body style={body}>
//         <Container style={container}>
//           {/* Header */}

//           <Section style={header}>
//             <Heading style={heading}>🚀 Sudiptyo Das</Heading>

//             <Text style={subHeading}>Full Stack Developer</Text>
//           </Section>

//           <Hr style={divider} />

//           {/* Dynamic Content */}

//           <Section style={content}>{children}</Section>

//           <Hr style={divider} />

//           {/* Footer */}

//           <Section>
//             <Text style={footerText}>
//               If you have any additional questions or project details, simply
//               reply to this email.
//             </Text>

//             <Text style={copyright}>
//               © {new Date().getFullYear()} Sudiptyo Das
//               <br />
//               Crafted with React Email ❤️
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

// const body = {
//   backgroundColor: "#0F172A",
//   fontFamily:
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//   margin: 0,
//   padding: "40px 20px",
// };

// const container = {
//   backgroundColor: "#111827",
//   maxWidth: "620px",
//   margin: "0 auto",
//   borderRadius: "18px",
//   overflow: "hidden" as const,
//   border: "1px solid #1F2937",
//   boxShadow: "0 12px 40px rgba(0,0,0,.35)",
// };

// const header = {
//   background: "linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)",
//   padding: "40px 36px",
//   textAlign: "center" as const,
// };

// const heading = {
//   color: "#FFFFFF",
//   fontSize: "28px",
//   fontWeight: "700",
//   margin: 0,
// };

// const subHeading = {
//   color: "#E5E7EB",
//   fontSize: "15px",
//   marginTop: "8px",
//   marginBottom: 0,
// };

// const divider = {
//   borderColor: "#1F2937",
//   margin: 0,
// };

// const content = {
//   padding: "36px",
// };

// const footerText = {
//   color: "#9CA3AF",
//   textAlign: "center" as const,
//   fontSize: "14px",
//   lineHeight: "24px",
//   margin: "0 36px",
// };

// const copyright = {
//   color: "#6B7280",
//   textAlign: "center" as const,
//   fontSize: "12px",
//   lineHeight: "20px",
//   marginTop: "28px",
//   marginBottom: "28px",
// };

// emails/Template/BaseTemplate.tsx

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BaseTemplateProps {
  preview: string;
  accentColor?: string;
  title?: string;
  children: React.ReactNode;
}

export default function BaseTemplate({
  preview,
  accentColor = "#2563EB",
  title = "Sudiptyo Das",
  children,
}: BaseTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>

      <Body style={body}>
        <Container style={container}>
          {/* Accent Bar */}

          <Section
            style={{
              ...accentBar,
              backgroundColor: accentColor,
            }}
          />

          {/* Header */}

          <Section style={header}>
            <Heading style={heading}>{title}</Heading>

            <Text style={role}>
              Full Stack Developer • React • Next.js • Spring Boot
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Email Body */}

          <Section style={content}>{children}</Section>

          <Hr style={divider} />

          {/* Footer */}

          <Section style={footer}>
            <Text style={footerHeading}>Thank you for your interest.</Text>

            <Text style={footerText}>
              If you have any questions or would like to discuss your project
              further, simply reply to this email. I usually respond within
              24–48 hours.
            </Text>

            <Hr style={footerDivider} />

            <Text style={signature}>
              Best regards,
              <br />
              <strong>Sudiptyo Das</strong>
              <br />
              Full Stack Developer
            </Text>

            <Text style={links}>
              🌐 Portfolio &nbsp;•&nbsp; 💼 LinkedIn &nbsp;•&nbsp; 🖥 GitHub
            </Text>

            <Text style={copyright}>
              © {new Date().getFullYear()} Sudiptyo Das. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  margin: "0",
  padding: "40px 20px",
  backgroundColor: "#F3F4F6",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
};

const container = {
  maxWidth: "620px",
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  overflow: "hidden" as const,
  border: "1px solid #E5E7EB",
  boxShadow: "0 8px 30px rgba(0,0,0,.06)",
};

const accentBar = {
  height: "6px",
};

const header = {
  padding: "36px 40px 30px",
};

const heading = {
  margin: "0",
  color: "#111827",
  fontSize: "30px",
  fontWeight: "700",
};

const role = {
  marginTop: "8px",
  marginBottom: "0",
  color: "#6B7280",
  fontSize: "15px",
  lineHeight: "24px",
};

const divider = {
  borderColor: "#E5E7EB",
  margin: "0",
};

const content = {
  padding: "40px",
};

const footer = {
  padding: "32px 40px",
};

const footerHeading = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "12px",
};

const footerText = {
  color: "#6B7280",
  fontSize: "14px",
  lineHeight: "24px",
};

const footerDivider = {
  borderColor: "#E5E7EB",
  margin: "28px 0",
};

const signature = {
  color: "#111827",
  fontSize: "14px",
  lineHeight: "24px",
};

const links = {
  marginTop: "20px",
  color: "#2563EB",
  fontSize: "13px",
  textAlign: "center" as const,
};

const copyright = {
  marginTop: "22px",
  color: "#9CA3AF",
  fontSize: "12px",
  textAlign: "center" as const,
};
