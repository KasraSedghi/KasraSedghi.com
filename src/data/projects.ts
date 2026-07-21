export type Project = {
  id: string;
  name: string;
  /** Real GitHub repo name, when it differs from the portfolio-facing project name. */
  repoName?: string;
  period: string;
  category: "Technical" | "Business & Analytics";
  description: string;
  tech: string[];
  highlights: string[];
  href?: string;
  status?: "shipped" | "in-progress";
};

// Descriptions are written for a general reader first, then backed up with
// concrete detail, rather than compressed resume bullet fragments.
export const projects: Project[] = [
  {
    id: "market-simulator",
    name: "Agent-Based Market Simulator",
    repoName: "Project-Ruba",
    period: "June 2026 to July 2026",
    category: "Technical",
    description:
      "A tool that simulates dozens of fake customers with different tastes and budgets, so a business can test how people might react to a new product before actually building it.",
    tech: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "asyncio", "Pydantic", "Recharts", "Tailwind", "Anthropic Claude API"],
    highlights: [
      "Runs 50+ AI shopper personas at the same time to estimate how much people would pay, then suggests the price that would earn the most money overall.",
      "Built a way to swap between a paid AI model and a free local one under the hood, so testing at that scale doesn't blow through an API budget.",
    ],
    href: "https://github.com/KasraSedghi/Project-Ruba",
    status: "shipped",
  },
  {
    id: "shadowvest",
    name: "ShadowVest Portfolio Tracker",
    repoName: "Stocks101",
    period: "June 2026",
    category: "Technical",
    description:
      "A personal stock tracker that answers questions about your portfolio in plain English instead of making you dig through spreadsheets or menus.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Decimal.js", "REST APIs", "Tailwind CSS"],
    highlights: [
      "Figures out on its own which financial tool to use based on what you ask, so there's no manual menu digging.",
      "Caches market data so the app rarely calls outside services, keeping it fast and cheap to run.",
    ],
    href: "https://github.com/KasraSedghi/Stocks101",
    status: "shipped",
  },
  {
    id: "red-bean-scheduler",
    name: "The Red Bean Scheduler",
    repoName: "SmallBusiness-Scheduling-App",
    period: "June 2026",
    category: "Technical",
    description:
      "A scheduling app I built solo for a small business, so staff can see their shifts and managers don't have to chase people down for approvals.",
    tech: ["TypeScript", "JavaScript", "SQL", "Next.js", "React", "Node.js", "Supabase", "PostgreSQL", "Row Level Security"],
    highlights: [
      "Sends automatic reminders, approvals, and schedule updates by email, so nobody has to follow up by hand.",
      "Built the styling so the whole look of the app can be changed from one settings file instead of editing every page.",
    ],
    href: "https://github.com/KasraSedghi/SmallBusiness-Scheduling-App",
    status: "shipped",
  },
  {
    id: "clv-cac",
    name: "Customer Lifetime Value & CAC Analysis",
    period: "January 2026",
    category: "Business & Analytics",
    description:
      "A financial model estimating how much a company's customers are worth over time, compared to what it costs to win them in the first place.",
    tech: ["Excel", "Cohort Analysis", "NPV Modeling"],
    highlights: [
      "Estimated a year of customer value for over 36,000 customers using their buying history.",
      "Compared acquisition cost against customer value across 13 quarterly groups, to see which customers were actually worth chasing.",
      "Checked the marketing budget against a standard industry rule of thumb to see if spending made sense.",
    ],
  },
  {
    id: "ergobed",
    name: "ErgoBed Sales & Quality Analytics",
    period: "January 2026",
    category: "Business & Analytics",
    description:
      "An analysis of three years of sales data for a bedding company, looking at how a busier factory schedule affected product quality.",
    tech: ["Excel", "Statistical Analysis"],
    highlights: [
      "Measured how consistent product quality stayed as production increased.",
      "Modeled what a small cost increase would do to next year's profit across five product lines.",
    ],
  },
  {
    id: "red-bean-website",
    name: "The Red Bean Website",
    repoName: "redbean-website",
    period: "2024 to 2025",
    category: "Technical",
    description:
      "The first website I ever built: an event signup page for a coffee shop, made entirely with plain JavaScript and no frameworks.",
    tech: ["JavaScript", "HTML & CSS", "Form Validation", "Responsive Design"],
    highlights: [
      "Built a signup form that checks your answers as you type and shows friendly error messages.",
      "Added a pop up confirmation with a small animation, all built from scratch.",
    ],
    href: "https://github.com/KasraSedghi/redbean-website",
    status: "shipped",
  },
];
