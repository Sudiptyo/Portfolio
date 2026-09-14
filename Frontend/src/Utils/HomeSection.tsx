import type { ComponentType } from "react";
import { FaGithub, FaLinkedinIn, FaPenNib } from "react-icons/fa";
import { MapPin, Rocket } from "lucide-react";

type HomeSection = {
  header: {
    title: string;
    title2: {
      icon: ComponentType<{ className?: string; size?: number }>;
      title: string;
    };
  };
  title: string;
  name: string;
  qualification: {
    title1: string;
    title2: string;
  };
  descriptionDev: string;
  descriptionDsa: string;
  place: {
    icon: ComponentType<{ className?: string; size?: number }>;
    place: string;
  };
  availability: {
    icon: ComponentType<{ className?: string; size?: number }>;
    availability: string;
  };
  work: {
    link: string;
    work: string;
  };
  contact: {
    link: string;
    contact: string;
  };
  links: {
    id: number;
    icon: ComponentType<{ className?: string; size?: number }>;
    link: string;
  }[];
};

export const HomeSectionData: HomeSection = {
  header: {
    title: "Available for Opportunities",
    title2: {
      icon: Rocket,
      title: "Seeking Internships(Full Stack / Backend)",
    },
  },
  title: "Hey, I'm",
  name: "Sudiptyo",
  qualification: {
    title1: "Full Stack Developer",
    title2: "Strong in DSA & Problem Solving",
  },
  descriptionDev:
    "I build fast, scalable, and user-focused web applications from frontend to backend. Combining clean design with strong engineering to create real-world solutions that perform.",
  descriptionDsa:
    "I design scalable systems and solve complex problems using Data Structures & Algorithms.",
  place: {
    icon: MapPin,
    place: "India",
  },
  availability: {
    icon: FaPenNib,
    availability: "freelance & full-time opportunities",
  },
  work: {
    link: "portfolio",
    work: "View My Work",
  },
  contact: {
    link: "/contact",
    contact: "Contact Me",
  },
  links: [
    {
      id: 1,
      icon: FaGithub,
      link: "https://github.com/sudiptyo",
    },
    {
      id: 2,
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/sudiptyo-undefined-776472432?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  ],
};
