import type { ComponentType } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

type Skill = {
  id: number;
  icon: ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    size?: number;
  }>;
  name: string;
};

type EducationSection = {
  icon: ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    size?: number;
  }>;
  degree: string;
  instituteName: string;
  description: string;
  currentStatus: string;
  skills: Skill[];
};

export const EducationSectionData: EducationSection = {
  icon: FaGraduationCap,
  degree: "Bachelor of Technology (B.Tech)",
  instituteName: "Swami Vivekananda Institute of Technology",
  description: "Focused on software development, UI/UX design, and system fundamentals. Building a strong interdisciplinary foundation that bridges creative design thinking with technical engineering skills.",
  currentStatus: "Currently Pursuing",
  skills: [
    {
        id: 1,
        icon: FaCode,
        name: "Software Development"
    },
    {
        id: 2,
        icon: FiBookOpen,
        name: "Design & Development"
    },
    {
        id: 3,
        icon: LuGraduationCap,
        name: "System Fundamentals"
    },
  ],
};
