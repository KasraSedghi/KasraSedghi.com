// A thin decorative "halfway line and center circle" divider, echoing a
// soccer pitch, used between sections instead of a plain rule.
export default function PitchDivider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-3 py-2 text-gold/30" aria-hidden="true">
      <span className="h-px flex-1 bg-current" />
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
