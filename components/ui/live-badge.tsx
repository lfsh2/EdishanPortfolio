/** Production status marker for client systems that are deployed and in use. */
export function LiveBadge({ long = false, className = "" }: { long?: boolean; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 rounded-[4px] bg-canvas px-2 py-1 text-fg ring-1 ring-line ${className}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
      {long ? "Live in production" : "Live"}
    </span>
  );
}
