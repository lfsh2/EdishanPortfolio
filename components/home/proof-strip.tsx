import { CountUp } from "@/components/ui/count-up";
import { proof } from "@/lib/site";

export function ProofStrip() {
  return (
    <section aria-label="Track record" className="shell">
      <dl className="card grid grid-cols-2 overflow-hidden lg:grid-cols-4">
        {proof.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse justify-end gap-2 p-5 md:p-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i > 1 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="text-sm leading-snug text-faint">{item.label}</dt>
            <dd className="font-display text-[clamp(2.25rem,1.7rem+2vw,3.25rem)] leading-none tracking-[-0.01em] text-fg tabular-nums">
              <CountUp value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
