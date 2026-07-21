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

// Reconciled from Kasra's resume revisions (kept the most specific/current
// bullet where two versions overlapped — e.g. Amazon's bullets below describe
// the actual Alexa Shopping work rather than the earlier placeholder text).
export const experience: ExperienceEntry[] = [
  {
    id: "amazon",
    title: "Software Development Engineer Intern",
    org: "Amazon",
    location: "Seattle, WA",
    period: "June 2026 – August 2026",
    icon: "amazon",
    summary:
      "Selected for Amazon's competitive 12-week SDE internship, building a cross-platform feature for Alexa's generative-AI shopping assistant.",
    achievements: [
      "Engineered a full-stack, cross-platform Share feature using React Native and Java for Alexa for Shopping, scaled to an active audience exceeding 300 million users.",
      "Optimized latency and data persistence by caching deep-linked search contexts in Amazon DynamoDB, enabling instant context loading and real-time follow-up suggestion pills.",
      "Analyzed live customer interaction telemetry to evaluate post-share recipient behavior, using data-driven insight to validate product adoption and incremental sales conversions.",
    ],
  },
  {
    id: "mtv",
    title: "AI Engineer Intern",
    org: "Maryland Tech Ventures",
    location: "College Park, MD",
    period: "January 2026 – Present",
    icon: "sparkles",
    summary:
      "Building an AI-powered intelligence layer for the NSF I-Corps curriculum used by UMD's venture accelerator.",
    achievements: [
      "Architected an AI-powered intelligence layer automating ingestion and analysis of 1,500+ presentation slides, hypothesis logs, and interview frameworks previously reviewed manually.",
      "Engineered a Retrieval-Augmented Generation pipeline (LangChain + GPT-4) to synthesize unstructured data — raw customer discovery transcripts and spreadsheets — into evidence-based insight.",
      "Deployed automated LLM workflows that score interview quality and hypothesis alignment, standardizing the feedback loop across hundreds of customer discovery sessions.",
      "Designed a scoring system integrating program data, improving hypothesis-analysis throughput by 70%.",
    ],
  },
  {
    id: "terrapin-tech",
    title: "IT Support Technician",
    org: "Terrapin Tech, University of Maryland",
    location: "College Park, MD",
    period: "September 2025 – Present",
    icon: "university",
    summary:
      "Front-line technical support for UMD students and faculty as part of a 5-person team.",
    achievements: [
      "Resolve 60+ student/faculty issues per week across Wi-Fi, Duo MFA, OS, and hardware.",
      "Assess and close tickets using diagnostics, ticketing workflows, and security protocols; document fixes to accelerate repeat-issue handling.",
      "Restore network stability by removing conflicting VPN/AV software, updating firmware/drivers, and validating BIOS/Windows updates.",
    ],
  },
  {
    id: "bizbuzz",
    title: "Project Manager & SDET Intern",
    org: "BizBuzz",
    location: "Annapolis, MD",
    period: "October 2024 – August 2025",
    icon: "bug",
    summary:
      "QA and project management for a social-media/digital-marketing startup's app.",
    achievements: [
      "Led training for a team of 3 Virtual Assistants, improving task automation for app features and report generation.",
      "Created 10+ step-by-step visual guides and FAQs supporting 1,000+ app users.",
      "Ran regression and exploratory tests on core algorithms; streamlined bug intake and prioritization, reducing reported defects by 25%.",
      "Delivered weekly QA dashboards (bug severity, code-quality KPIs) and processed 25+ tickets/week to shorten engineering feedback cycles.",
    ],
  },
  {
    id: "red-bean",
    title: "Business Operations Manager",
    org: "The Red Bean",
    location: "Annapolis, MD",
    period: "January 2023 – August 2025",
    icon: "coffee",
    summary:
      "End-to-end operations for a local café — inventory, vendors, staffing, financials, and marketing.",
    achievements: [
      "Grew revenue 30% year-over-year by trimming costs and launching new product lines based on sales-mix and margin analysis.",
      "Managed end-to-end operations — inventory, vendor terms, staff schedules, financial reporting — to improve cash flow, lifting profitability 15% through better inventory turnover.",
      "Built a social presence reaching 3,000+ followers; produced targeted video creative, including a Marriott-lobby placement to drive foot traffic and brand awareness.",
    ],
  },
];
