import { proof } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

export function ProofStrip() {
  return (
    <section aria-label="Track record" className="shell">
      <dl className="grid grid-cols-2 border-t border-fg/80 lg:grid-cols-4">
        {proof.map((item, i) => (
          <div
            key={item.label}
            data-reveal
            style={revealDelay(i * 70)}
            className="flex flex-col-reverse justify-end gap-3 border-b border-line py-8 pr-4 md:py-10"
          >
            <dt className="text-sm leading-snug text-muted">{item.label}</dt>
            <dd className="text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none tracking-[-0.04em] text-fg tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
