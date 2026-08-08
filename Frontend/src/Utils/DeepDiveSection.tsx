import { Sparkles, Trophy } from "lucide-react";
import type { ComponentType } from "react";
import { FaRegFaceFrown } from "react-icons/fa6";

type Language = {
  id: number;
  name: string;
};

type LowerSectionItem = {
  id: number;
  icon: ComponentType<{
    className?: string;
    size?: number;
    style?: React.CSSProperties;
  }>;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
};

type DeepDiveSection = {
  topHeading: string;
  languages: Language[];
  lowerSection: LowerSectionItem[];
};

export const DeepDiveSectionData: DeepDiveSection = {
  topHeading: "E-commerce Platform Redesign & Optimization",
  languages: [
    {
      id: 1,
      name: "React",
    },
    {
      id: 2,
      name: "Node.js",
    },
    {
      id: 3,
      name: "Spring Boot",
    },
    {
      id: 4,
      name: "MongoDB",
    },
    {
      id: 5,
      name: "PostgreSQL",
    },
    {
      id: 6,
      name: "REST APIs",
    },
    {
      id: 7,
      name: "UI/UX Design",
    },
  ],
  lowerSection: [
    {
      id: 1,
      icon: FaRegFaceFrown,
      iconColor: "#FF5A5F",
      //   bgColor: "oklab(0.635585_0.188125_0.0892456/0.2)",
      bgColor: "hsl(0 84% 60% / 0.2)",
      borderColor: "hsl(0 84% 60% / 0.3)",
      title: "Problem",
      description:
        "Users struggled with complex navigation and high checkout drop-off rates. Backend bottlenecks also caused slow load times and failed transactions.",
    },
    {
      id: 2,
      icon: Sparkles,
      iconColor: "#16D9FF",
      //   bgColor: "oklab(0.800338_-0.112242_-0.0872615/0.2)",
      bgColor: "hsl(190 96% 52% / 0.2)",
      borderColor: "hsl(190 96% 52% / 0.3)",
      title: "Solution",
      description:
        "Redesigned the frontend with improved UX and built a streamlined backend checkout flow using REST APIs. Reduced steps, optimized data handling, and improved API response time.",
    },
    {
      id: 3,
      icon: Trophy,
      iconColor: "#8B5CF6",
      //   bgColor: "oklab(0.590488_0.0997159_-0.199661/0.2)",
      bgColor: "hsl(263 83% 63% / 0.2)",
      borderColor: "hsl(263 83% 63% / 0.3)",
      title: "Result",
      description:
        "Improved user experience, faster interactions, and a ~30% increase in conversion rate. Load time reduced by 40% through backend caching and API optimization.",
    },
  ],
};
