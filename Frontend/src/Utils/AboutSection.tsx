import type { ComponentType } from "react";
import { CodeXml, Brain, Layers, ShieldCheck } from "lucide-react";

type AboutSection = {
  id: number;
  icon: ComponentType<{ 
    className?: string;
    size?: number;
  }>;
  title: string;
  description: string;
}[];

export const aboutSectionData: AboutSection = [
  {
    id: 1,
    icon: CodeXml,
    title: "Full Stack Engineering",
    description: "Frontend + Backend + APIs",
  },
  {
    id: 2,
    icon: Brain,
    title: "DSA & Problem Solving",
    description: "200+ problems, optimized solutions",
  },
  {
    id: 3,
    icon: Layers,
    title: "FUI/UX Design",
    description: "User-centered, clean interfaces",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Security Mindset",
    description: "Cybersecurity & secure systems",
  },
];
