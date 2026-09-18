import type { ComponentType } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { LuLinkedin } from "react-icons/lu";

type ContactSection = { 
  ContactInfo: {
    text: string;
    items: {
      id: number;
      icon: ComponentType<{ className?: string; size?: number }>;
      heading: string;
      link?: string;
    }[];
  };
  ResponseTime: {
    text: string;
    firstDescription: string;
    time: number;
    lastDescription: string;
  };
  Availability: {
    iconColor: string;
    text: string;
    description: string;
  };
};

export const ContactSectionData: ContactSection = {
  ContactInfo: {
    text: "Contact Info",
    items: [
      {
        id: 1,
        icon: MdOutlineEmail,
        heading: "Email",
        link: "sudiptyo444@gmail.com",
      },
      {
        id: 2,
        icon: FaGithub,
        heading: "GitHub",
        link: "https://github.com/Sudiptyo",
      },
      {
        id: 3,
        icon: LuLinkedin,
        heading: "LinkedIn",
        link: "https://shorturl.at/gNZHF",
      },
    ],
  },
  ResponseTime: {
    text: "Response Time",
    firstDescription: "I typically respond within",
    time: 24,
    lastDescription:
      "For urgent inquiries, feel free to reach out directly via email.",
  },
  Availability: {
    iconColor: "[#0FD3FA]",
    text: "Currently Available",
    description:
      "Open to freelance projects, full-time opportunities, and creative collaborations.",
  },
};
