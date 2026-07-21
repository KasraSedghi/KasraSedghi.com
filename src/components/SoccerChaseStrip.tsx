// A thin looping strip that sits above the navbar on every page: a kid
// kicking a ball, chased by a dog and a cat, jogging left to right forever.
// Pure personality, no interaction, no state. Distinct on purpose from the
// site's other soccer moments (the timeline's scroll-linked ball and the
// home-page shootout intro): this one never asks anything of the visitor.
//
// Hand-drawn flat shapes in the same family as OrgIcon.tsx. Each character
// has a two-frame running gait done by cross-fading two leg poses (leg-a /
// leg-b), plus a small gallop bob; the ball spins. Everything is CSS
// keyframes (chase-run, gallop, run-a/run-b, ball-spin in globals.css), so
// this ships zero extra JS and never re-renders. The whole run is slowed to
// 18s across the screen so it's easy to follow.
export default function SoccerChaseStrip() {
  return (
    <div className="relative h-9 w-full overflow-hidden bg-ink" aria-hidden="true">
      {/* faint pitch ground line, echoes PitchDivider's halfway line */}
      <div className="absolute bottom-1.5 left-0 h-px w-full bg-gold/10" />

      <div className="chase-runner absolute bottom-0 left-0 w-[128px]">
        <svg viewBox="0 0 128 36" className="h-9 w-[128px]" aria-hidden="true">
          {/* Cat, trailing furthest back */}
          <g className="gallop text-gold/55" style={{ animationDelay: "-0.06s" }} fill="currentColor" stroke="currentColor">
            <path d="M6 21C1.5 20 1.5 13 5.5 12.5" fill="none" strokeWidth="1.3" strokeLinecap="round" />
            <ellipse cx="17" cy="21" rx="7.5" ry="3.6" stroke="none" />
            <circle cx="25.5" cy="17.5" r="3.1" stroke="none" />
            <path d="M22.6 15.4l0.7-2.6 1.6 2z M25.2 15l0.7-2.7 1.7 2.2z" stroke="none" />
            <g className="leg-a" strokeWidth="1.5" strokeLinecap="round">
              <line x1="13" y1="23.5" x2="10.5" y2="30" />
              <line x1="21" y1="23.5" x2="23.5" y2="30" />
            </g>
            <g className="leg-b" strokeWidth="1.5" strokeLinecap="round">
              <line x1="13" y1="23.5" x2="15" y2="30" />
              <line x1="21" y1="23.5" x2="19" y2="30" />
            </g>
          </g>

          {/* Dog, chasing just behind the kid */}
          <g className="gallop text-white/60" style={{ animationDelay: "-0.15s" }} fill="currentColor" stroke="currentColor">
            <line x1="46" y1="18.5" x2="41.5" y2="12.5" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="57" cy="20" rx="9.5" ry="4.2" stroke="none" />
            <circle cx="68.5" cy="16.5" r="3.7" stroke="none" />
            <path d="M71 16l4.5 1.2-4.5 1.8z" stroke="none" />
            <path d="M65.5 13.5l-1.5-3.2 3.2 1z" stroke="none" />
            <g className="leg-a" strokeWidth="1.6" strokeLinecap="round">
              <line x1="51" y1="23" x2="48" y2="30.5" />
              <line x1="63" y1="23" x2="66" y2="30.5" />
            </g>
            <g className="leg-b" strokeWidth="1.6" strokeLinecap="round">
              <line x1="51" y1="23" x2="54" y2="30.5" />
              <line x1="63" y1="23" x2="60" y2="30.5" />
            </g>
          </g>

          {/* Kid, mid-stride, front foot reaching toward the ball */}
          <g className="gallop text-gold" style={{ animationDelay: "0s" }} stroke="currentColor" fill="currentColor">
            <circle cx="97" cy="8" r="3.7" stroke="none" />
            <path d="M97 11.8L94.5 22" fill="none" strokeWidth="2.1" strokeLinecap="round" />
            <g className="leg-a" strokeWidth="1.9" strokeLinecap="round">
              <line x1="94.5" y1="22" x2="90.5" y2="30.5" />
              <line x1="94.5" y1="22" x2="101" y2="28" />
              <line x1="95.6" y1="14.5" x2="100.5" y2="12.5" strokeWidth="1.6" />
              <line x1="95.6" y1="14.5" x2="91" y2="17.5" strokeWidth="1.6" />
            </g>
            <g className="leg-b" strokeWidth="1.9" strokeLinecap="round">
              <line x1="94.5" y1="22" x2="97.5" y2="30.5" />
              <line x1="94.5" y1="22" x2="92" y2="29" />
              <line x1="95.6" y1="14.5" x2="99.5" y2="16.5" strokeWidth="1.6" />
              <line x1="95.6" y1="14.5" x2="91.5" y2="12.5" strokeWidth="1.6" />
            </g>
          </g>

          {/* Ball, just ahead of the kicking foot, spinning */}
          <g transform="translate(112 27)">
            <g className="ball-spin">
              <circle r="4.4" fill="#f5f5f5" stroke="#111" strokeWidth="0.9" />
              <path
                d="M0 -2.4l2.3 1.7-0.9 2.7h-2.8l-0.9-2.7z"
                fill="#111"
              />
              <path
                d="M0 -4.4l0.9 1.4M3.5 -1.7l-1.6 0.9M2.2 3.4l-0.6-1.6M-2.2 3.4l0.6-1.6M-3.5 -1.7l1.6 0.9"
                stroke="#111"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
