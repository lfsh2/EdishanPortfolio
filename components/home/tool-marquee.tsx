const tools = ["GoHighLevel", "n8n", "OpenAI", "Twilio", "APIs", "Next.js", "React", "Node.js"];

/** A restrained, slowly scrolling toolkit strip. Tools are the delivery stack, not the identity. */
export function ToolMarquee() {
  // Each half of the track must be wider than the container for a seamless loop.
  const half = [...tools, ...tools];
  return (
    <section aria-labelledby="tools-title" className="shell py-12 md:py-16">
      <h2 id="tools-title" className="label text-faint">
        Tools I work with
      </h2>
      <div className="marquee relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="sr-only">
          {tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div aria-hidden className="marquee-track flex w-max gap-3">
          {[...half, ...half].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.9375rem] text-fg"
            >
              <span className="grid size-6 place-items-center rounded-full bg-raised font-mono text-[0.6rem] text-muted">
                {t.slice(0, 2)}
              </span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
