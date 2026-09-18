import type { ComponentType } from "react";

import {
  Binary,
  Blocks,
  Boxes,
  Database,
  DatabaseZap,
  Globe,
  HardDrive,
  Key,
  Leaf,
  Lock,
  MonitorCog,
  Network,
  PackageOpen,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  WifiSync,
  Workflow,
  Zap,
} from "lucide-react";
import { SiMongodb, SiNpm, SiPostman } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGitAlt, FaJava } from "react-icons/fa";
import { RiGithubLine } from "react-icons/ri";
import { FiFigma } from "react-icons/fi";
import { SiIntellijidea } from "react-icons/si";
import { AiOutlinePython } from "react-icons/ai";
import { BsTypescript } from "react-icons/bs";
import { BsJavascript } from "react-icons/bs";
import { FaCss3Alt } from "react-icons/fa";
import { RiTailwindCssLine } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiApachemaven } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { SiRabbitmq } from "react-icons/si";
import { SiRedbull } from "react-icons/si";
import { SiFastify } from "react-icons/si";
import { SiPnpm } from "react-icons/si";

type Skill = {
  idx: number;
  name: string;
  icon: ComponentType<{ className?: string }>;
  hoverText: string;
};

type SkillSection = {
  id: number;
  title: string;
  titleColor: string;
  cardColor: string;
  skills: Skill[];
};

export const SkillsSectionData: SkillSection[] = [
  {
    id: 1,
    title: "LANGUAGES",
    titleColor: "oklch(0.707 0.165 254.624)",
    cardColor:
      "linear-gradient(135deg, rgba(74,163,255,.18), rgba(113,89,255,.08))",
    skills: [
      {
        idx: 1,
        name: "HTML",
        icon: Globe,
        hoverText: "Semantic Markup & page structure",
      },
      {
        idx: 2,
        name: "CSS",
        icon: FaCss3Alt,
        hoverText: "Styling, animations & layouts",
      },
      {
        idx: 3,
        name: "JavaScript",
        icon: BsJavascript,
        hoverText: "Dynamic interactivity & logic",
      },
      {
        idx: 4,
        name: "TypeScript",
        icon: BsTypescript,
        hoverText: "Type-safe JS development",
      },
      {
        idx: 5,
        name: "C",
        icon: Binary,
        hoverText: "Procedural programming fundamentals",
      },
      {
        idx: 6,
        name: "Python",
        icon: AiOutlinePython,
        hoverText: "General-purpose scripting & automation",
      },
      {
        idx: 7,
        name: "Java",
        icon: FaJava,
        hoverText: "Object-oriented application development",
      },
    ],
  },
  {
    id: 2,
    title: "FRONTEND",
    titleColor: "oklch(0.590 0.224 296.430)",
    cardColor:
      "linear-gradient(135deg, rgba(147,51,234,.16), rgba(59,130,246,.10))",
    skills: [
      {
        idx: 1,
        name: "React",
        icon: RiReactjsLine,
        hoverText: "Component-based UI development",
      },
      {
        idx: 2,
        name: "Next.js",
        icon: SiNextdotjs,
        hoverText: "React framework for full-stack web apps",
      },
      {
        idx: 3,
        name: "Tailwind CSS",
        icon: RiTailwindCssLine,
        hoverText: "Utility-first CSS framework",
      },
      {
        idx: 4,
        name: "Responsive Design",
        icon: Smartphone,
        hoverText: "Mobile-first development",
      },
      {
        idx: 5,
        name: "Performance Optimization",
        icon: TrendingUp,
        hoverText: "Core Web Vitals & speed optimization",
      },
    ],
  },
  {
    id: 3,
    title: "BACKEND",
    titleColor: "oklch(0.702 0.183 293.541)",
    cardColor:
      "linear-gradient(135deg, rgba(168,85,247,.17), rgba(99,102,241,.08))",
    skills: [
      {
        idx: 1,
        name: "Node.js/Express",
        icon: FaNodeJs,
        hoverText: "Server-side runtime & web framework",
      },
      {
        idx: 2,
        name: "Node.js/Fastify",
        icon: SiFastify,
        hoverText: "High-performance Node.js web framework",
      },
      {
        idx: 3,
        name: "Django",
        icon: Boxes,
        hoverText: "Python web framework",
      },
      {
        idx: 4,
        name: "Spring Boot",
        icon: Leaf,
        hoverText: "Production-ready Java backend framework",
      },
      {
        idx: 5,
        name: "Redis",
        icon: DatabaseZap,
        hoverText: "In-memory caching & data store",
      },
      {
        idx: 6,
        name: "BullMQ",
        icon: SiRedbull,
        hoverText: "Redis-backed background job processing",
      },
      {
        idx: 7,
        name: "RabbitMQ",
        icon: SiRabbitmq,
        hoverText: "Message broker for asynchronous communication",
      },
      {
        idx: 8,
        name: "Authentication",
        icon: Key,
        hoverText: "JWT, OAuth & session management",
      },
      {
        idx: 9,
        name: "DB Management",
        icon: Database,
        hoverText: "Database schema design & queries",
      },
      {
        idx: 10,
        name: "WebSockets",
        icon: WifiSync,
        hoverText: "Real-time bidirectional communication",
      },
    ],
  },
  {
    id: 4,
    title: "DATABASE",
    titleColor: "oklch(0.765 0.177 163.223)",
    cardColor:
      "linear-gradient(135deg, rgba(16,185,129,.17), rgba(14,165,233,.08))",
    skills: [
      {
        idx: 1,
        name: "MongoDB",
        icon: SiMongodb,
        hoverText: "NoSQL document database",
      },
      {
        idx: 2,
        name: "MySQL",
        icon: GrMysql,
        hoverText: "Relational database management",
      },
      {
        idx: 3,
        name: "PostgreSQL",
        icon: BiLogoPostgresql,
        hoverText: "Advanced open-source RDBMS",
      },
    ],
  },
  {
    id: 5,
    title: "TOOLS",
    titleColor: "oklch(0.75 0.183 55.934)",
    cardColor:
      "linear-gradient(135deg, rgba(249,115,22,.16), rgba(234,179,8,.07))",
    skills: [
      {
        idx: 1,
        name: "Git",
        icon: FaGitAlt,
        hoverText: "Version control & branching",
      },
      {
        idx: 2,
        name: "GitHub",
        icon: RiGithubLine,
        hoverText: "Code hosting & collaboration",
      },
      {
        idx: 3,
        name: "VS Code",
        icon: MonitorCog,
        hoverText: "Primary dev environment",
      },
      {
        idx: 4,
        name: "Intellij IDEA",
        icon: SiIntellijidea,
        hoverText: "Professional Java IDE",
      },
      {
        idx: 5,
        name: "Postman",
        icon: SiPostman,
        hoverText: "API testing & debugging",
      },
      {
        idx: 6,
        name: "Docker",
        icon: FaDocker,
        hoverText: "Containerization & application deployment",
      },
      {
        idx: 7,
        name: "Figma",
        icon: FiFigma,
        hoverText: "UI/UX design & prototyping",
      },
      {
        idx: 8,
        name: "Vite",
        icon: Zap,
        hoverText: "Lightning-fast frontend build tool",
      },
      {
        idx: 9,
        name: "NPM",
        icon: SiNpm,
        hoverText: "Package management for JS",
      },
      {
        idx: 10,
        name: "PNPM",
        icon: SiPnpm,
        hoverText: "Fast, disk-efficient package manager",
      },
      {
        idx: 11,
        name: "Maven",
        icon: SiApachemaven,
        hoverText: "Java build & dependency management",
      },
      {
        idx: 12,
        name: "PIP",
        icon: PackageOpen,
        hoverText: "Python package manager",
      },
    ],
  },
  {
    id: 6,
    title: "CONCEPTS",
    titleColor: "oklch(0.718 0.202 349.761)",
    cardColor:
      "linear-gradient(135deg, rgba(236,72,153,.16), rgba(168,85,247,.08))",
    skills: [
      {
        idx: 1,
        name: "System Design",
        icon: Network,
        hoverText: "Architecture & scalability basics",
      },
      {
        idx: 2,
        name: "API Design",
        icon: ServerCog,
        hoverText: "RESTful patterns & best practices",
      },
      {
        idx: 3,
        name: "Auth & Authorization",
        icon: Lock,
        hoverText: "Secure access control patterns",
      },
      {
        idx: 4,
        name: "REST APIs",
        icon: Workflow,
        hoverText: "API design & integration",
      },
      {
        idx: 5,
        name: "Caching",
        icon: HardDrive,
        hoverText: "Faster data access & performance",
      },
      {
        idx: 6,
        name: "Microservices",
        icon: Blocks,
        hoverText: "Distributed service architecture",
      },
      {
        idx: 7,
        name: "Basic Cybersecurity",
        icon: ShieldCheck,
        hoverText: "Security best practices",
      },
    ],
  },
];
