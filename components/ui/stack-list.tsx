/** Tool list rendered as a quiet mono line separated by middots: reads like a spec sheet. */
export function StackList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-2 gap-y-1 font-mono text-[0.75rem] ${className}`} aria-label="Technologies">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden className="text-quiet">
              ·
            </span>
          ) : null}
          <span className="text-faint">{item}</span>
        </li>
      ))}
    </ul>
  );
}
