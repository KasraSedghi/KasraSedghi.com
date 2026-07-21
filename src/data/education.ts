export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  period: string;
  program?: string;
  programHref?: string;
  description: string;
};

export const education: EducationEntry[] = [
  {
    id: "umd",
    school: "University of Maryland, College Park",
    degree: "B.S. Computer Science · B.S. Finance · Minor in Data Science",
    period: "Expected May 2029",
    program: "Interdisciplinary Business Honors College",
    description:
      "Double-majoring in Computer Science and Finance with a Data Science minor, through the Interdisciplinary Business Honors College.",
  },
];

// Extracurricular / honors programs — kept separate from for-credit education.
export type ActivityEntry = {
  id: string;
  name: string;
  role: string;
  period: string;
  href?: string;
  description: string;
};

export const activities: ActivityEntry[] = [
  {
    id: "dingman-vc",
    name: "Dingman Venture Capitalist Group",
    role: "Junior Analyst",
    period: "October 2025 – Present",
    description:
      "Architecting the deployment strategy for a $140,000 non-dilutive fund accelerating UMD's startup ecosystem — responsible for the full investment lifecycle from sourcing to final funding decisions. Designing the fund's internal governance framework, including application processing, scoring rubrics, and weakness-assessment protocols for transparent, merit-based distribution.",
  },
  {
    id: "mlt",
    name: "Management Leadership for Tomorrow",
    role: "Ascend Program Scholar",
    period: "August 2025 – Present",
    description:
      "An 11-month personal and professional development program for first-generation college students. Cultivates professional networks through virtual and in-person skill-building summits, with monthly one-on-one coaching to refine goals and a professional portfolio.",
  },
  {
    id: "hack4impact",
    name: "Hack4Impact",
    role: "Software Engineering Member",
    period: "September 2025 – Present",
    href: "https://umd.hack4impact.org/",
    description:
      "Selected from the top 8% of applicants for an industry-standard technical bootcamp; now collaborating with local D.C./Maryland non-profits to build full-stack applications, mastering JavaScript, React, Flask, MongoDB, and Firebase through a project-based curriculum.",
  },
  {
    id: "startup-shell",
    name: "Startup Shell",
    role: "Member",
    period: "October 2025 – Present",
    description:
      "A non-profit startup incubator for UMD students building their own companies. Attends ideation and networking events to brainstorm and develop the community's startup ideas.",
  },
];
