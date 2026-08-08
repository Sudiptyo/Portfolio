type testimonialSection = {
  id: number;
  stars: 1 | 2 | 3 | 4 | 5;
  description: string;
  image?: string;
  name: string;
  designation: string | "verified Client";
};

export const testimonialSectionData: testimonialSection[] = [
  {
    id: 1,
    stars: 5,
    description:
      "Delivered a complete web app with both frontend and backend. The API integration, auth system, and UI all worked seamlessly. Very reliable and professional.",
    image: "I",
    name: "Startup Founder",
    designation: "Verified Client",
  },
  {
    id: 2,
    stars: 5,
    description:
      "Not just a designer — built the entire product from scratch. Clean code, great communication, and delivered on time. Would hire again without hesitation.",
    image: "I",
    name: "Freelance Client",
    designation: "Verified Client",
  },
];
