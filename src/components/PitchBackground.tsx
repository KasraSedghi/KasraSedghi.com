// Very low opacity mowed-grass stripes + a hint of pitch markings behind the
// hero content. Decorative only, kept faint enough not to affect text contrast.
export default function PitchBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #FFD700 0px, #FFD700 2px, transparent 2px, transparent 64px)",
        }}
      />
      <svg
        className="absolute -bottom-24 -right-24 h-96 w-96 text-gold/10 sm:h-[28rem] sm:w-[28rem]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="6" fill="currentColor" stroke="none" />
        <path d="M100 30v140M30 100h140" />
      </svg>
    </div>
  );
}
