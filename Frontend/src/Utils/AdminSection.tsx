import { type ComponentType, type CSSProperties } from "react";

import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleCheckBig,
  CircleX,
  Clock,
  Clock3,
  ExternalLink,
  LayoutDashboard,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

type AdminSection = {
  adminSideBar: {
    header: {
      icon: ComponentType<{
        className?: string;
        size?: number;
      }>;

      title: string;
      description: string;
    };

    pages: {
      id: number;

      icon: ComponentType<{
        className?: string;
        size?: number;
      }>;

      title: string;
      link: string;
    }[];

    footer: {
      icon: ComponentType<{
        className?: string;
        size?: number;
      }>;

      url: string;
      title: string;
    };
  };

  adminHeader: {
    title: string;
  };

  adminDashboard: {
    header: {
      title: string;
      description: string;
      text: string;
    };

    cards: {
      id: number;

      cardColor?: string;
      borderColor?: string;

      icon: ComponentType<{
        className?: string;
        size?: number;
        style?: CSSProperties;
      }>;

      iconColor?: string;

      submission: number;
      contentType: string;
    }[];

    footer: {
      charts: {
        title: string;
        description: string;

        dateRange: {
          id: number;
          date?: number;
          text: string;
        }[];

        contents: {
          id: number;
          circleColor: string;
          text: string;
        }[];
      };

      right: {
        title: string;
        description: string;

        icon: ComponentType<{
          className?: string;
          size?: number;
        }>;

        content: {
          id: number;
          title: string;
          description: string;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          submission: number;
          link: string;
        }[];

        approvalRate: {
          percentage: number;
          title: string;
        };

        rating: {
          percentage: number;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          title: string;
        };
      };

      footer: {
        title: string;
        description: string;
        text: string;

        content: {
          id: number;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          boxColor?: string;
          iconColor?: string;

          title: string;
          description: string;

          date?: string;
          text?: string;

          link: string;
        }[];
      };
    };
  };

  adminContacts: {
    header: {
      title: string;
      description: string;

      right: {
        title: string;

        icon: ComponentType<{
          className?: string;
          size?: number;
        }>;
      };
    };

    status: {
      id: number;
      title: string;
    }[];

    order: {
      id: number;
      title: string;
    }[];

    content: {
      header: {
        id: number;
        title: string;
      }[];
      body: {
        id: number;
        name: string;
        email: string;
        project: string;
        budget: number;
        message: string;
        selectedStatus: {
          status: string;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          color?: string;
        };

        date: string;

        changeStatus?: {
          id: number;
          status: string;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          color: string;
        }[];
      }[];
    };
  };

  adminFeedbacks: {
    header: {
      title: string;
      description: string;

      right: {
        title: string;

        icon: ComponentType<{
          className?: string;
          size?: number;
        }>;
      };
    };

    filters: {
      status: {
        id: number;
        title: string;
      }[];

      featured: {
        id: number;
        title: string;
      }[];

      sort: {
        id: number;
        title: string;
      }[];

      rating: {
        id: number;
        title: string;
        value: number | null;
      }[];
    };

    content: {
      header: {
        id: number;
        title: string;
      }[];

      body: {
        id: number;
        name: string;
        image?: string;
        initials?: string;
        role: string;
        rating: number;
        comment: string;

        status: {
          status: string;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          color?: string;
        };

        featured: boolean;

        date: string;

        changeStatus?: {
          id: number;
          status: string;

          icon: ComponentType<{
            className?: string;
            size?: number;
          }>;

          color: string;
        }[];
      }[];
    };
  };
};

export const adminSectionData: AdminSection = {
  adminSideBar: {
    header: {
      icon: ShieldCheck,
      title: "Admin Panel",
      description: "Sudiptyo's Portfolio",
    },

    pages: [
      {
        id: 1,
        icon: LayoutDashboard,
        title: "Dashboard",
        link: "dashboard",
      },

      {
        id: 2,
        icon: Users,
        title: "Contacts",
        link: "contacts",
      },

      {
        id: 3,
        icon: MessageSquareText,
        title: "Feedbacks",
        link: "feedbacks",
      },
    ],

    footer: {
      icon: ExternalLink,
      url: "/",
      title: "View Portfolio",
    },
  },

  adminHeader: {
    title: "Admin Mode Active",
  },

  adminDashboard: {
    header: {
      title: "Dashboard Overview",
      description: "A pulse check on your client pipeline and social proof.",
      text: "Live workspace",
    },

    cards: [
      {
        id: 1,

        cardColor:
          "linear-gradient(135deg, rgba(74,163,255,.18), rgba(113,89,255,.08))",

        borderColor: "rgba(74,163,255,.25)",

        iconColor: "oklch(0.707 0.165 254.624)",

        icon: Users,

        submission: 0,
        contentType: "Total Contacts",
      },

      {
        id: 2,

        cardColor:
          "linear-gradient(135deg, rgba(147,51,234,.16), rgba(59,130,246,.10))",

        borderColor: "rgba(147,51,234,.25)",

        iconColor: "oklch(0.590 0.224 296.430)",

        icon: Clock,

        submission: 0,
        contentType: "Pending Contacts",
      },

      {
        id: 3,

        cardColor:
          "linear-gradient(135deg, rgba(168,85,247,.17), rgba(99,102,241,.08))",

        borderColor: "rgba(168,85,247,.25)",

        iconColor: "oklch(0.702 0.183 293.541)",

        icon: CircleCheckBig,

        submission: 0,
        contentType: "Approved Contacts",
      },

      {
        id: 4,

        cardColor:
          "linear-gradient(135deg, rgba(16,185,129,.17), rgba(14,165,233,.08))",

        borderColor: "rgba(16,185,129,.25)",

        iconColor: "oklch(0.765 0.177 163.223)",

        icon: MessageSquareText,

        submission: 0,
        contentType: "Total Feedbacks",
      },

      {
        id: 5,

        cardColor:
          "linear-gradient(135deg, rgba(249,115,22,.16), rgba(234,179,8,.07))",

        borderColor: "rgba(249,115,22,.25)",

        iconColor: "oklch(0.75 0.183 55.934)",

        icon: Clock,

        submission: 0,
        contentType: "Pending Feedbacks",
      },

      {
        id: 6,

        cardColor:
          "linear-gradient(135deg, rgba(236,72,153,.16), rgba(168,85,247,.08))",

        borderColor: "rgba(236,72,153,.25)",

        iconColor: "oklch(0.718 0.202 349.761)",

        icon: Star,

        submission: 0,
        contentType: "Featured Feedbacks",
      },
    ],

    footer: {
      charts: {
        title: "Submission Activity",

        description: "Contacts and feedback received over time",

        dateRange: [
          {
            id: 1,
            date: 7,
            text: "7 days",
          },

          {
            id: 2,
            date: 30,
            text: "30 days",
          },

          {
            id: 3,
            date: 90,
            text: "3 months",
          },

          {
            id: 4,
            text: "All time",
          },
        ],

        contents: [
          {
            id: 1,
            circleColor: "#8E52EF",
            text: "Contacts",
          },

          {
            id: 2,
            circleColor: "oklch(0.865 0.127 207.078)",
            text: "Feedbacks",
          },
        ],
      },

      right: {
        title: "Needs Attention",

        description: "Keep your queue moving",

        icon: Activity,

        content: [
          {
            id: 1,

            title: "Client Inquiries",

            description: "Pending review · Open contacts",

            icon: ArrowUpRight,

            submission: 0,

            link: "contacts",
          },

          {
            id: 2,

            title: "Testimonials",

            description: "Pending moderation · Open feedbacks",

            icon: ArrowUpRight,

            submission: 0,

            link: "feedbacks",
          },
        ],

        approvalRate: {
          percentage: 0,
          title: "Contact approval rate",
        },

        rating: {
          percentage: 0,
          icon: Star,
          title: "Average rating",
        },
      },

      footer: {
        title: "Recent Activity",

        description: "Latest updates across your portfolio",

        text: "Today",

        content: [
          {
            id: 1,

            icon: MessageSquareText,

            boxColor: "bg-blue-400/10",

            iconColor: "text-blue-300",

            title: "New Feedback",

            description: "1 new feedback",

            date: "Just now",

            link: "feedbacks",
          },

          {
            id: 2,

            icon: MessageSquareText,

            boxColor: "bg-emerald-400/10",

            iconColor: "text-emerald-300",

            title: "Testimonial Approved",

            description: "New User",

            date: "2 hours ago",

            link: "feedbacks",
          },

          {
            id: 3,

            icon: MessageSquareText,

            boxColor: "bg-cyan-400/10",

            iconColor: "text-cyan-300",

            title: "New Testimonial Submitted",

            description: "New User",

            date: "Just now",

            link: "feedbacks",
          },
        ],
      },
    },
  },

  adminContacts: {
    header: {
      title: "Contacts",

      description: "4 inquiries · 2 need your attention",

      right: {
        title: "Refresh",
        icon: RefreshCw,
      },
    },
    status: [
      {
        id: 1,
        title: "All Status",
      },
      {
        id: 2,
        title: "Pending",
      },
      {
        id: 3,
        title: "Approved",
      },
      {
        id: 4,
        title: "Rejected",
      },
    ],

    order: [
      {
        id: 1,
        title: "Latest First",
      },
      {
        id: 2,
        title: "Oldest First",
      },
    ],

    content: {
      header: [
        {
          id: 1,
          title: "NAME / EMAIL",
        },

        {
          id: 2,
          title: "PROJECT",
        },

        {
          id: 3,
          title: "BUDGET",
        },

        {
          id: 4,
          title: "MESSAGE",
        },

        {
          id: 5,
          title: "STATUS",
        },

        {
          id: 6,
          title: "DATE",
        },

        {
          id: 7,
          title: "CHANGE STATUS",
        },
      ],

      body: [
        {
          id: 1,

          name: "John Doe",

          email: "OgYD0@example.com",

          project: "Website Redesign",

          budget: 10000,

          message: "Hello, I'm interested in your services.",
          selectedStatus: {
            status: "Pending",
            icon: Clock,
          },

          date: "24 Aug 2026",

          changeStatus: [
            {
              id: 1,

              status: "Approved",

              icon: CircleCheckBig,

              color: "text-emerald-400",
            },

            {
              id: 2,

              status: "Rejected",

              icon: CircleX,

              color: "text-red-400",
            },
          ],
        },
      ],
    },
  },

  adminFeedbacks: {
    header: {
      title: "Feedbacks",
      description: "3 testimonials · 1 awaiting review",

      right: {
        title: "Refresh",
        icon: RefreshCw,
      },
    },

    filters: {
      status: [
        {
          id: 1,
          title: "All Status",
        },
        {
          id: 2,
          title: "Pending",
        },
        {
          id: 3,
          title: "Approved",
        },
        {
          id: 4,
          title: "Rejected",
        },
      ],

      featured: [
        {
          id: 1,
          title: "All",
        },
        {
          id: 2,
          title: "Featured Only",
        },
        {
          id: 3,
          title: "Not Featured",
        },
      ],

      sort: [
        {
          id: 1,
          title: "Latest First",
        },
        {
          id: 2,
          title: "Oldest First",
        },
      ],

      rating: [
        {
          id: 1,
          title: "All ratings",
          value: null,
        },
        {
          id: 2,
          title: "5 stars",
          value: 5,
        },
        {
          id: 3,
          title: "4 stars",
          value: 4,
        },
        {
          id: 4,
          title: "3 stars",
          value: 3,
        },
      ],
    },

    content: {
      header: [
        {
          id: 1,
          title: "Name",
        },
        {
          id: 2,
          title: "Role",
        },
        {
          id: 3,
          title: "Rating",
        },
        {
          id: 4,
          title: "Comment",
        },
        {
          id: 5,
          title: "Status",
        },
        {
          id: 6,
          title: "Featured",
        },
        {
          id: 7,
          title: "Date",
        },
        {
          id: 8,
          title: "Actions",
        },
      ],

      body: [
        {
          id: 1,

          name: "Rahul Mehta",

          // If you have actual images, replace this
          // with: image: "/images/..."
          image: null,

          initials: "R",

          role: "Founder, Lumen Labs",

          rating: 5,

          comment:
            "Sudiptyo brought clarity and polish to every part of the product.",

          status: {
            status: "Approved",
            icon: CheckCircle2,
          },

          featured: true,

          date: "23 Aug 2026",

          changeStatus: [
            {
              id: 1,
              status: "Approved",
              icon: CheckCircle2,
              color: "text-emerald-400",
            },
            {
              id: 2,
              status: "Rejected",
              icon: CircleX,
              color: "text-red-400",
            },
          ],
        },

        {
          id: 2,

          name: "Mira Sen",

          image: null,

          initials: "M",

          role: "Independent creative director",

          rating: 5,

          comment:
            "A rare designer who combines strong technical thinking with beautiful execution.",

          status: {
            status: "Pending",
            icon: Clock3,
          },

          featured: false,

          date: "22 Aug 2026",

          changeStatus: [
            {
              id: 1,
              status: "Approved",
              icon: CheckCircle2,
              color: "text-emerald-400",
            },
            {
              id: 2,
              status: "Rejected",
              icon: CircleX,
              color: "text-red-400",
            },
          ],
        },

        {
          id: 3,

          name: "Arjun Malhotra",

          image: null,

          initials: "A",

          role: "Product lead, Orbit",

          rating: 4,

          comment:
            "The prototype gave us a much clearer direction for the final product.",

          status: {
            status: "Approved",
            icon: CheckCircle2,
          },

          featured: false,

          date: "20 Aug 2026",

          changeStatus: [
            {
              id: 1,
              status: "Approved",
              icon: CheckCircle2,
              color: "text-emerald-400",
            },
            {
              id: 2,
              status: "Rejected",
              icon: CircleX,
              color: "text-red-400",
            },
          ],
        },
      ],
    },
  },
};
