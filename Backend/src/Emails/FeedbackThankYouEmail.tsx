import * as React from "react";
import { Button, Section, Text } from "@react-email/components";
import BaseTemplate from "../Template/BaseTemplate.js";

interface FeedbackThankYouEmailProps {
  name: string;
  rating: number;
}

export default function FeedbackThankYouEmail({
  name,
  rating,
}: FeedbackThankYouEmailProps) {
  return (
    <BaseTemplate
      preview="Thank you for sharing your feedback!"
      accentColor="#F59E0B"
      accentLabel="Feedback Received"
    >
      <Text style={greeting}>
        Hi <strong>{name || "there"}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for taking the time to share your experience. Your feedback is
        genuinely appreciated and helps me continuously improve the quality of
        my work and the experience I provide to every client.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>⭐ Feedback Summary</Text>

        <Section style={item}>
          <Text style={label}>Your Rating</Text>
          <Text style={value}>
            {"⭐".repeat(rating)} ({rating}/5)
          </Text>
        </Section>

        <Section style={item}>
          <Text style={label}>Submission Status</Text>
          <Text style={status}>Successfully Received</Text>
        </Section>
      </Section>

      <Section style={highlightCard}>
        <Text style={highlightTitle}>Thank You!</Text>

        <Text style={highlightText}>
          Your opinion is valuable and helps build trust for future clients.
          Thank you for your support and for being part of my journey.
        </Text>
      </Section>

      <Text style={paragraph}>
        I truly appreciate the opportunity to work with you and hope our paths
        cross again on future projects.
      </Text>

      <Section style={buttonSection}>
        <Button href="https://your-portfolio.com" style={button}>
          Visit My Portfolio
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

const card = {
  backgroundColor: "#FFFBEB",
  border: "1px solid #FDE68A",
  borderLeft: "5px solid #F59E0B",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
};

const cardTitle = {
  color: "#92400E",
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
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 6px",
};

const value = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  margin: 0,
};

const status = {
  color: "#B45309",
  fontSize: "16px",
  fontWeight: "600",
  margin: 0,
};

const highlightCard = {
  backgroundColor: "#FFF7ED",
  border: "1px solid #FED7AA",
  borderRadius: "12px",
  padding: "22px",
  margin: "30px 0",
};

const highlightTitle = {
  color: "#C2410C",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const highlightText = {
  color: "#9A3412",
  fontSize: "14px",
  lineHeight: "26px",
  margin: 0,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "36px 0 12px",
};

const button = {
  backgroundColor: "#F59E0B",
  color: "#FFFFFF",
  padding: "14px 26px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
};
