import type { ComponentType } from "react";
import { RiGithubLine, RiShareBoxLine } from "react-icons/ri";

type PortfolioLink = {
  icon: ComponentType<{
    className?: string;
    size?: number;
  }>;
  text: string;
  url: string;
};

type PortfolioSection = {
  id: number;
  upperCardColor: string;
  projectType: string;
  timeTaken: number;
  techStack: string[];
  title: string;
  description: string;
  livePreview: PortfolioLink;
  github: PortfolioLink;
}[];

export const PortfolioSectionData: PortfolioSection = [
  {
    id: 1,
    upperCardColor:
      "linear-gradient(135deg, rgba(92,113,255,.42), rgba(138,92,246,.28))",
    projectType: "Full Stack Social Platform",
    timeTaken: 12,
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    title: "Wave Chat",
    description:
      "A WhatsApp-inspired social media platform featuring real-time messaging, authentication, AI message assistant, media sharing, notifications, and scalable REST APIs.",
    livePreview: {
      icon: RiShareBoxLine,
      text: "Live Preview",
      url: "#",
    },
    github: {
      icon: RiGithubLine,
      text: "GitHub",
      url: "#",
    },
  },
  {
    id: 2,
    upperCardColor:
      "linear-gradient(135deg, rgba(59,165,255,.40), rgba(86,118,255,.26))",
    projectType: "AI Coding Platform",
    timeTaken: 10,
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "AI", "Prisma"],
    title: "AI LeetCode",
    description:
      "A coding interview platform with AI-powered hints, solution explanations, code reviews, progress tracking, contests, and personalized learning.",
    livePreview: {
      icon: RiShareBoxLine,
      text: "Live Preview",
      url: "#",
    },
    github: {
      icon: RiGithubLine,
      text: "GitHub",
      url: "#",
    },
  },
  {
    id: 3,
    upperCardColor:
      "linear-gradient(135deg, rgba(31,171,152,.38), rgba(70,186,112,.24))",
    projectType: "Enterprise SaaS",
    timeTaken: 16,
    techStack: ["React", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
    title: "College ERP System",
    description:
      "A complete university management platform with admissions, attendance, examinations, faculty portal, student dashboard, notices, fee management, and role-based access control.",
    livePreview: {
      icon: RiShareBoxLine,
      text: "Live Preview",
      url: "#",
    },
    github: {
      icon: RiGithubLine,
      text: "GitHub",
      url: "#",
    },
  },
  {
    id: 4,
    upperCardColor:
      "linear-gradient(135deg, rgba(255,142,72,.38), rgba(255,87,87,.24))",
    projectType: "Full Stack E-Commerce",
    timeTaken: 14,
    techStack: ["React", "Spring Boot", "PostgreSQL", "Stripe", "JWT"],
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce application featuring secure authentication, product management, shopping cart, wishlist, payments, order tracking, reviews, and an admin dashboard.",
    livePreview: {
      icon: RiShareBoxLine,
      text: "Live Preview",
      url: "#",
    },
    github: {
      icon: RiGithubLine,
      text: "GitHub",
      url: "#",
    },
  },
];
