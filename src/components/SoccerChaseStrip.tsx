// A thin looping strip that sits above the navbar on every page: a kid
// kicking a ball, chased by a dog and a cat, running left to right forever.
// Pure personality, no interaction, no state. Distinct on purpose from the
// other two soccer moments on the site (the timeline's scroll-linked ball
// and the penalty shootout widget, both of which need a visitor to scroll
// or click): this one never asks anything of the visitor, it just plays.
//
// Hand-drawn flat/monoline shapes in the same family as OrgIcon.tsx, but
// flattened to simple filled silhouettes rather than fine stroke detail,
// because at strip height (32px) thin monoline strokes disappear while a
// solid silhouette still reads as "cat", "dog", "kid" at a glance. The ball
// keeps a monoline treatment (stroke facets) to echo PitchBackground's
// center-circle motif.
//
// No "use client": nothing here needs a hook or event handler, it's a
// static SVG animated entirely by the chase-run/chase-bob CSS keyframes in
// globals.css, so it ships zero extra JS and never re-renders.
export default function SoccerChaseStrip() {
  return (
    <div
      className="relative h-8 w-full overflow-hidden bg-ink"
      aria-hidden="true"
    >
      {/* faint pitch ground line, echoes PitchDivider's halfway line */}
      <div className="absolute bottom-1 left-0 h-px w-full bg-gold/10" />

      <div className="chase-runner absolute bottom-0 left-0 w-[132px]">
        <svg
          viewBox="0 0 132 32"
          className="h-8 w-[132px]"
          fill="none"
          aria-hidden="true"
        >
          {/* cat, trailing furthest behind */}
          <g
            className="chase-bob text-gold/40"
            style={{ animationDelay: "-0.05s" }}
          >
            <ellipse cx="10" cy="21" rx="6" ry="3" fill="currentColor" />
            <circle cx="17" cy="16.5" r="3" fill="currentColor" />
            <path d="M15 14l0.6-2.6 1.8 2.4z" fill="currentColor" />
            <path d="M18.6 14l0.6-2.6 1.8 2.4z" fill="currentColor" />
            <path
              d="M4 20c-2.2-0.6-3.4-3-2-5.4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M7 24l-1.6 2.6M13 24l1.6 2.6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </g>

          {/* dog, chasing just behind the kid */}
          <g
            className="chase-bob text-white/45"
            style={{ animationDelay: "-0.18s" }}
          >
            <ellipse cx="34" cy="22" rx="8" ry="3.6" fill="currentColor" />
            <circle cx="44" cy="17" r="3.4" fill="currentColor" />
            <path d="M42.5 14.5l-1-3 2.6 1.6z" fill="currentColor" />
            <path
              d="M27 20c-2.6-1-4-4.2-2-7.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M29 25.5l-1.8 3M38 25.5l1.8 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>

          {/* kid, mid stride, kicking foot reaching toward the ball */}
          <g className="chase-bob text-gold" style={{ animationDelay: "0s" }}>
            <circle cx="64" cy="9" r="3.2" fill="currentColor" />
            <path d="M64 12.2l-3.2 9h6.4z" fill="currentColor" />
            <path
              d="M61.5 15l-4.5 2.5M66.5 15l4 1"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M62 21l-3 6.5M65.5 21l6 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* ball, just ahead of the kicking foot, monoline like the pitch icons */}
          <g className="text-white/80">
            <circle
              cx="86"
              cy="25.5"
              r="3.6"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M86 22.4v6.2M83 25.5h6M84.1 23.3l3.8 4.4M87.9 23.3l-3.8 4.4"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
