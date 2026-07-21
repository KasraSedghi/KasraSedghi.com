export type Project = {
  id: string;
  name: string;
  /** Real GitHub repo name, when it differs from the resume-facing project name. */
  repoName?: string;
  period: string;
  category: "Technical" | "Business & Analytics";
  description: string;
  tech: string[];
  highlights: string[];
  href?: string;
  status?: "shipped" | "in-progress";
};

// Flagship projects link to their real GitHub repos (confirmed against
// github.com/KasraSedghi) even where the resume names the project
// differently than the repo itself.
export const projects: Project[] = [
  {
    id: "market-simulator",
    name: "Agent-Based Market Simulator",
    repoName: "Project-Ruba",
    period: "June 2026 – July 2026",
    category: "Technical",
    description:
      "An agent-based market simulation engine that fans out 50+ concurrent synthetic consumer personas to model demand and pricing.",
    tech: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "asyncio", "Pydantic", "Recharts", "Tailwind", "Anthropic Claude API"],
    highlights: [
      "Architected a simulation engine fanning out 50+ concurrent synthetic consumer personas via Python asyncio, aggregating purchase-intent and willingness-to-pay data into demand curves and revenue-maximizing price suggestions.",
      "Built a provider-agnostic LLM abstraction layer supporting Claude Haiku and free local models via Ollama, using prompt caching and strict Pydantic-validated JSON schemas to control per-agent token cost at 50x scale.",
    ],
    href: "https://github.com/KasraSedghi/Project-Ruba",
    status: "shipped",
  },
  {
    id: "shadowvest",
    name: "ShadowVest Portfolio Tracker",
    repoName: "Stocks101",
    period: "January 2024 – February 2024",
    category: "Technical",
    description:
      "An AI-powered market intelligence terminal that auto-routes user queries to the right financial analysis tool.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Decimal.js", "REST APIs", "Tailwind CSS"],
    highlights: [
      "Wrote semantic intent-matching logic to auto-route user queries to 5 distinct financial-analysis tools, reducing manual workflow selection to zero clicks.",
      "Designed a dual-provider data pipeline integrating live market data with in-memory TTL caching, cutting redundant network calls by over 80% to safely respect free-tier budget limitations.",
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
      "A solo-built scheduling app for a small business, automating the full staff-notification lifecycle.",
    tech: ["TypeScript", "JavaScript", "SQL", "Next.js", "React", "Node.js", "Supabase", "PostgreSQL", "Row-Level Security"],
    highlights: [
      "Automated the full notification lifecycle — submission reminders, manager approvals, published-roster broadcasts — via a Resend API integration triggered by scheduled cron jobs and workflow events, eliminating manual supervisor follow-up.",
      "Built a reusable design-token system and component library (Tailwind CSS v4) enabling a full visual re-theme of the application through centralized configuration rather than page-by-page rewrites.",
    ],
    href: "https://github.com/KasraSedghi/SmallBusiness-Scheduling-App",
    status: "shipped",
  },
  {
    id: "clv-cac",
    name: "Customer Lifetime Value (CLV) & CAC Analysis",
    period: "January 2026",
    category: "Business & Analytics",
    description:
      "Financial modeling of customer value and acquisition cost across a 36,600-customer dataset.",
    tech: ["Excel", "Cohort Analysis", "NPV Modeling"],
    highlights: [
      "Forecasted 1-year CLV for a 36,600-customer dataset using cohort matrices and retention curves, applying Net Present Value discounting for financial accuracy.",
      "Calculated CLV/CAC ratios and payback periods across 13 quarterly cohorts to identify high-return customer segments.",
      "Strategized marketing budget by benchmarking CAC against the industry-standard 3x LTV rule, translating raw data into business insight.",
    ],
  },
  {
    id: "ergobed",
    name: "ErgoBed Sales & Quality Analytics",
    period: "January 2026",
    category: "Business & Analytics",
    description:
      "Descriptive analytics on a 3-year manufacturing dataset, projecting 2026 financial outcomes.",
    tech: ["Excel", "Statistical Analysis"],
    highlights: [
      "Developed a descriptive analytics model over a 3-year transaction dataset (mean, variance, standard deviation) to evaluate how increased production shifts affected product quality.",
      "Projected 2026 financial outcomes by modeling a 4% unit-cost increase, automating net-profit calculations across five distinct product lines.",
    ],
  },
  {
    id: "red-bean-website",
    name: "The Red Bean Website",
    repoName: "redbean-website",
    period: "2024 – 2025",
    category: "Technical",
    description:
      "Kasra's first shipped website: an interactive event RSVP site for a local coffee shop.",
    tech: ["JavaScript", "HTML & CSS", "Form Validation", "Responsive Design"],
    highlights: [
      "Custom RSVP form with real-time validation and error handling.",
      "Animated modal pop-up with personalized messaging and image interaction, built with vanilla JavaScript — no libraries.",
    ],
    href: "https://github.com/KasraSedghi/redbean-website",
    status: "shipped",
  },
];
