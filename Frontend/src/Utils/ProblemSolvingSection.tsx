import type { ComponentType } from "react";

import { LuBrain, LuLayers3, LuGitBranch, LuCodeXml } from "react-icons/lu";
import { HiTrendingUp } from "react-icons/hi";
import { Network } from "lucide-react";
import { RiShareBoxLine } from "react-icons/ri";

type Link = {
  id: number;
  name: string;
  url: string;
  icon: ComponentType<{ className?: string; size?: number }>;
};

type HeroItem = {
  id: number;
  icon: ComponentType<{ className?: string; size?: number }>;
  solved: number;
  subTitle: string;
  description: string;
  links: Link[];
};

type StrongInItem = {
  id: number;
  icon: ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    size?: number;
  }>;
  text: string;
  cardColor: string;
  borderColor: string;
  iconColor: string;
  iconBg: string;
};

type ApproachItem = {
  id: number;
  text: string;
};

type CodingSection = {
  hero: HeroItem[];

  strongIn: StrongInItem[];

  approach: {
    id: number;
    title: string;
    items: ApproachItem[];
  }[];
};

export const ProblemSolvingSectionData: CodingSection = {
  hero: [
    {
      id: 1,
      icon: LuBrain,
      solved: 200,
      subTitle: "Problems Solved",

      description:
        "Consistently solving problems on competitive platforms with a focus on writing clean, optimized solutions. Strong emphasis on understanding time and space complexity.",

      links: [
        {
          id: 1,
          name: "LeetCode",
          url: "https://leetcode.com/username/",
          icon: RiShareBoxLine,
        },
        {
          id: 2,
          name: "Codeforces",
          url: "https://codeforces.com/username/",
          icon: RiShareBoxLine,
        },
      ],
    },
  ],

  strongIn: [
    {
      id: 1,
      icon: LuLayers3,
      text: "Arrays & Strings",
      cardColor:
        "linear-gradient(135deg, rgba(74,163,255,.12), rgba(59,130,246,.05))",
      borderColor: "rgba(74,163,255,.35)",
      iconColor: "#4AA3FF",
      iconBg: "rgba(74,163,255,.10)",
    },
    {
      id: 2,
      icon: LuGitBranch,
      text: "Recursion & Backtracking",
      cardColor:
        "linear-gradient(135deg, rgba(168,85,247,.12), rgba(124,58,237,.05))",
      borderColor: "rgba(168,85,247,.35)",
      iconColor: "#A855F7",
      iconBg: "rgba(168,85,247,.10)",
    },
    {
      id: 3,
      icon: Network,
      text: "Trees & Graphs",
      cardColor:
        "linear-gradient(135deg, rgba(16,185,129,.12), rgba(6,182,212,.05))",
      borderColor: "rgba(16,185,129,.35)",
      iconColor: "#10B981",
      iconBg: "rgba(16,185,129,.10)",
    },
    {
      id: 4,
      icon: LuBrain,
      text: "Dynamic Programming",
      cardColor:
        "linear-gradient(135deg, rgba(249,115,22,.12), rgba(234,179,8,.05))",
      borderColor: "rgba(249,115,22,.35)",
      iconColor: "#F97316",
      iconBg: "rgba(249,115,22,.10)",
    },
    {
      id: 5,
      icon: HiTrendingUp,
      text: "Sorting & Searching",
      cardColor:
        "linear-gradient(135deg, rgba(34,211,238,.12), rgba(59,130,246,.05))",
      borderColor: "rgba(34,211,238,.35)",
      iconColor: "#22D3EE",
      iconBg: "rgba(34,211,238,.10)",
    },
    {
      id: 6,
      icon: LuCodeXml,
      text: "Problem Patterns",
      cardColor:
        "linear-gradient(135deg, rgba(147,51,234,.12), rgba(99,102,241,.05))",
      borderColor: "rgba(147,51,234,.35)",
      iconColor: "#9333EA",
      iconBg: "rgba(147,51,234,.10)",
    },
  ],

  approach: [
    {
      id: 1,
      title: "APPROACH",

      items: [
        {
          id: 1,
          text: "Analyze time & space complexity first",
        },
        {
          id: 2,
          text: "Break problems into smaller subproblems",
        },
        {
          id: 3,
          text: "Prefer clean, readable code over clever hacks",
        },
        {
          id: 4,
          text: "Focus on edge cases and boundary conditions",
        },
      ],
    },
  ],
};
