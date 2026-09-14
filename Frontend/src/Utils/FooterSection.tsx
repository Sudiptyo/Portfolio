import type React from "react";
import type { ComponentType } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { LuMail } from "react-icons/lu";

type Link = {
  id: number;
  icon: ComponentType<{
    className?: string;
    size?: number;
    style?: React.CSSProperties;
  }>;
  name: string;
  link?: string;
};

type FooterSection = {
  description: {
    name: string;
    title: string;
    description: string;
  };
  links: {
    title: string;
    links: Link[];
  };
  connect: {
    title: string;
    links: Link[];
  };
};

export const footerSectionData: FooterSection[] = [
  {
    description: {
      name: "Sudiptyo",
      title: "Full Stack Developer & DSA Enthusiast",
      description:
        "Full Stack Developer passionate about crafting modern, scalable, and user-centric web applications. With a strong foundation in Data Structures & Algorithms, I enjoy solving complex problems, optimizing performance, and building clean, maintainable software from frontend to backend.",
    },

    links: {
      title: "Quick Links",
      links: [
        {
          id: 1,
          icon: RiExternalLinkLine,
          name: "About",
        },
        {
          id: 2,
          icon: RiExternalLinkLine,
          name: "Projects",
        },
        {
          id: 3,
          icon: RiExternalLinkLine,
          name: "Services",
        },
        {
          id: 4,
          icon: RiExternalLinkLine,
          name: "Contact",
        },
      ],
    },

    connect: {
      title: "Connect",
      links: [
        {
          id: 1,
          icon: FaGithub,
          name: "Github",
          link: "https://github.com/Sudiptyo",
        },
        {
          id: 2,
          icon: FiLinkedin,
          name: "LinkedIn",
          link: "https://www.linkedin.com/in/sudiptyo-undefined-776472432?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        },
        {
          id: 3,
          icon: LuMail,
          name: "Mail",
          link: "mailto:sudiptyo.dev@gmail.com",
        },
      ],
    },
  },
];
