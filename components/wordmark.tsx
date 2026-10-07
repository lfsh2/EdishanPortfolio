/** "edishan·lee": two-tone lowercase wordmark with the lime signal dot. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline text-[1.0625rem] font-medium tracking-[-0.03em] ${className}`}>
      <span className="text-fg">edishan</span>
      <span aria-hidden className="mx-[0.2em] inline-block size-[0.3em] translate-y-[-0.1em] rounded-full bg-lime" />
      <span className="text-quiet">lee</span>
    </span>
  );
}
