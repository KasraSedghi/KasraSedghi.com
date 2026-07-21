// Custom, hand-drawn monoline marks for each organization instead of real
// company logos (avoids trademark/asset-licensing questions entirely for a
// personal portfolio, and keeps every mark in the same gold-on-dark style).
export type OrgIconKey =
  | "amazon"
  | "university"
  | "bug"
  | "coffee"
  | "sparkles"
  | "growth"
  | "ascend"
  | "heart-code"
  | "rocket";

const commonProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Amazon() {
  return (
    <svg {...commonProps}>
      <path d="M4 8 12 5l8 3v6l-8 3-8-3z" />
      <path d="M4 8l8 3 8-3" />
      <path d="M12 11v6" />
      <path d="M6 17c2.5 2 9.5 2 12 0" />
    </svg>
  );
}

function University() {
  return (
    <svg {...commonProps}>
      <path d="M12 4 2 9l10 5 10-5z" />
      <path d="M6 11.5V17c0 1.2 2.7 3 6 3s6-1.8 6-3v-5.5" />
      <path d="M22 9v6" />
    </svg>
  );
}

function Bug() {
  return (
    <svg {...commonProps}>
      <rect x="8" y="8" width="8" height="10" rx="4" />
      <path d="M9 8c0-2 1.3-3.5 3-3.5S15 6 15 8" />
      <path d="M4 11h4M16 11h4M5 15h3M16 15h3M6 18l2-1M16 17l2 1" />
    </svg>
  );
}

function Coffee() {
  return (
    <svg {...commonProps}>
      <path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M16 10h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 4c-.5 1 .5 1.3 0 2.4M12 4c-.5 1 .5 1.3 0 2.4" />
    </svg>
  );
}

function Sparkles() {
  return (
    <svg {...commonProps}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function Growth() {
  return (
    <svg {...commonProps}>
      <path d="M4 19h16" />
      <path d="M6 19v-4M11 19v-8M16 19v-11" />
      <path d="M14 4h4v4" />
      <path d="M18 4l-6 6-3-3-4 4" />
    </svg>
  );
}

function Ascend() {
  return (
    <svg {...commonProps}>
      <path d="M4 19h16" />
      <path d="M6 19v-3h3v-3h3v-3h3v-3h3v9" />
    </svg>
  );
}

function HeartCode() {
  return (
    <svg {...commonProps}>
      <path d="M12 20s-7-4.4-9.3-8.7C1.4 8.6 3 6 6 6c1.7 0 3 1 4 2 1-1 2.3-2 4-2 3 0 4.6 2.6 3.3 5.3C19 15.6 12 20 12 20z" />
    </svg>
  );
}

function Rocket() {
  return (
    <svg {...commonProps}>
      <path d="M12 3c3 1.5 4.5 4.5 4.5 8 0 2-1 4-1 4h-7s-1-2-1-4c0-3.5 1.5-6.5 4.5-8z" />
      <circle cx="12" cy="9" r="1.4" />
      <path d="M9 15l-2.5 2.5M15 15l2.5 2.5M10 19.5l2-2 2 2" />
    </svg>
  );
}

const ICONS: Record<OrgIconKey, () => React.JSX.Element> = {
  amazon: Amazon,
  university: University,
  bug: Bug,
  coffee: Coffee,
  sparkles: Sparkles,
  growth: Growth,
  ascend: Ascend,
  "heart-code": HeartCode,
  rocket: Rocket,
};

export default function OrgIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: OrgIconKey;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <span className={className}>{<Icon />}</span>;
}
