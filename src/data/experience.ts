export type ExperienceEntry = {
  id: string;
  title: string;
  org: string;
  location: string;
  period: string;
  icon: "amazon" | "university" | "bug" | "coffee" | "sparkles";
  summary: string;
  achievements: string[];
};

// Written at a high level in plain language on purpose. A portfolio isn't
// a resume: it should be quick to read and easy to understand, not a copy
// of dense resume bullets. See CLAUDE.md for the style rule.
export const experience: ExperienceEntry[] = [
  {
    id: "amazon",
    title: "Software Development Engineer Intern",
    org: "Amazon",
    location: "Seattle, WA",
    period: "June 2026 to August 2026",
    icon: "amazon",
    summary:
      "Spending the summer on Amazon's Alexa Shopping team, building a feature that lets people share what they find with an AI shopping assistant.",
    achievements: [
      "Built a share feature for Alexa's AI shopping assistant, used across an audience of hundreds of millions of people.",
      "Made the experience feel instant by caching what people were searching for, so shared links open right where the other person left off.",
      "Looked at how people actually used the feature after it shipped, to help the team understand what was working and what wasn't.",
    ],
  },
  {
    id: "mtv",
    title: "AI Engineer Intern",
    org: "Maryland Tech Ventures",
    location: "College Park, MD",
    period: "January 2026 to Present",
    icon: "sparkles",
    summary:
      "Building AI tools for the University of Maryland's startup accelerator, helping mentors get through mountains of pitch decks and interview notes faster.",
    achievements: [
      "Built a system that automatically reads through thousands of slides, interview notes, and research logs, so mentors don't have to review everything by hand.",
      "Used AI language models to pull useful insight out of messy customer interviews and spreadsheets.",
      "Created a way to automatically score how strong a startup's customer research is, cutting manual review time way down.",
    ],
  },
  {
    id: "terrapin-tech",
    title: "IT Support Technician",
    org: "Terrapin Tech, University of Maryland",
    location: "College Park, MD",
    period: "September 2025 to Present",
    icon: "university",
    summary:
      "Help students and staff across campus fix everyday tech problems, from Wi-Fi and login issues to broken laptops.",
    achievements: [
      "Solve dozens of tech support tickets every week, covering Wi-Fi, two factor login, and hardware issues.",
      "Work with a small team to track and close tickets, and write down fixes so the next person can solve similar problems faster.",
      "Untangle common software and hardware conflicts that knock people off the university network.",
    ],
  },
  {
    id: "bizbuzz",
    title: "Project Manager & SDET Intern",
    org: "BizBuzz",
    location: "Annapolis, MD",
    period: "October 2024 to August 2025",
    icon: "bug",
    summary:
      "Managed testing and training for a small marketing app startup, making sure both the software and the people using it worked well.",
    achievements: [
      "Trained a small team of virtual assistants to use the app more effectively.",
      "Wrote simple guides that helped over a thousand users troubleshoot the app on their own.",
      "Ran regular tests and organized incoming bug reports, cutting the number of reported problems by a quarter.",
      "Reported weekly on bug trends and code quality so the engineering team could prioritize better.",
    ],
  },
  {
    id: "red-bean",
    title: "Business Operations Manager",
    org: "The Red Bean",
    location: "Annapolis, MD",
    period: "January 2023 to August 2025",
    icon: "coffee",
    summary:
      "Ran the day to day business side of a local coffee shop, from ordering supplies to marketing.",
    achievements: [
      "Grew revenue thirty percent in a year by cutting costs and adding new menu items that actually sold.",
      "Handled inventory, vendors, staffing, and the books, which improved cash flow and profitability.",
      "Built the shop's social media following past three thousand followers, including a video ad that played in a hotel lobby.",
    ],
  },
];
