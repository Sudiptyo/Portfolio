import type { ComponentType } from "react";
import { LuCodeXml } from "react-icons/lu";
import { LuMonitor } from "react-icons/lu";
import { FiServer } from "react-icons/fi";
import { FiPenTool } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

type ServiceItem = {
  id: number;
  badge?: string;
  icon: ComponentType<{ className?: string; size?: number }>
  title: string;
  description: string;
};

export const ServiceSectionData: ServiceItem[] = [
    {
        id: 1,
        badge: "Core Service",
        icon: LuCodeXml ,
        title: "Full Stack Development",
        description: "Building complete web applications from frontend to backend with scalable architecture, clean APIs, and production-ready deployment.",

    },
    {
        id: 2,
        icon: LuMonitor ,
        title: "Frontend Development",
        description: "Responsive, fast, and modern UIs using React and best practices — optimized for performance and accessibility.",

    },
    {
        id: 3,
        icon: FiServer ,
        title: "Backend Development",
        description: "Designing APIs, authentication systems, and database architecture that are secure, efficient, and built to scale.",

    },
    {
        id: 4,
        icon: FiPenTool ,
        title: "UI/UX Design",
        description: "Creating intuitive and user-centered interfaces through research, wireframing, and high-fidelity prototypes in Figma.",

    },
{
  id: 5,
  icon: FiZap ,
  title: "DSA & Problem Solving",
  description:
    "Designing optimized algorithms, solving complex coding challenges, and writing efficient, scalable solutions with a strong focus on time and space complexity.",
},
    {
        id: 6,
        icon: LuShieldCheck ,
        title: "Security Implementation",
        description: "Applying authentication, input validation, and secure coding practices to protect your application and user data.",

    },
]
