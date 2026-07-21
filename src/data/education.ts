export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  period: string;
  program?: string;
  programHref?: string;
  description: string;
  icon: "university";
};

export const education: EducationEntry[] = [
  {
    id: "umd",
    school: "University of Maryland, College Park",
    degree: "B.S. Computer Science, B.S. Finance, Minor in Data Science",
    period: "Expected May 2029",
    program: "Interdisciplinary Business Honors College",
    description:
      "Double majoring in Computer Science and Finance with a Data Science minor, through the Interdisciplinary Business Honors College.",
    icon: "university",
  },
];

// Extracurricular and honors programs, kept separate from for-credit education.
export type ActivityEntry = {
  id: string;
  name: string;
  role: string;
  period: string;
  href?: string;
  description: string;
  icon: "growth" | "ascend" | "heart-code" | "rocket";
};

export const activities: ActivityEntry[] = [
  {
    id: "dingman-vc",
    name: "Dingman Venture Capitalist Group",
    role: "Junior Analyst",
    period: "October 2025 to Present",
    description:
      "Helping design and run a $140,000 fund that invests in student startups at Maryland, from finding companies to deciding who gets funded, including how applications get scored.",
    icon: "growth",
  },
  {
    id: "mlt",
    name: "Management Leadership for Tomorrow",
    role: "Ascend Program Scholar",
    period: "August 2025 to Present",
    description:
      "An eleven month program for first generation college students that pairs me with a coach and a network of professionals to help me grow.",
    icon: "ascend",
  },
  {
    id: "hack4impact",
    name: "Hack4Impact",
    role: "Software Engineering Member",
    period: "September 2025 to Present",
    href: "https://umd.hack4impact.org/",
    description:
      "Picked from the top eight percent of applicants for a technical bootcamp, now building real full stack apps for local nonprofits with a small developer team.",
    icon: "heart-code",
  },
  {
    id: "startup-shell",
    name: "Startup Shell",
    role: "Member",
    period: "October 2025 to Present",
    description:
      "A student run startup incubator where I go to idea sessions and help other students shape their own companies.",
    icon: "rocket",
  },
];
