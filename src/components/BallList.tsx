// A plain list, but each bullet is a tiny soccer ball instead of a dot.
// Small, cohesive detail to carry the ball motif into body copy.
export default function BallList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-left text-sm text-white/70 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br from-white to-gold"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
