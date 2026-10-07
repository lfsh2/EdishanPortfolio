import Image from "next/image";

/** Official marks, self-hosted in /public/logos. "APIs" is a capability, not a brand, so it gets a neutral glyph. */
const tools: { name: string; logo?: string }[] = [
  { name: "GoHighLevel", logo: "/logos/gohighlevel.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "Twilio", logo: "/logos/twilio.svg" },
  { name: "APIs" },
  { name: "Next.js", logo: "/logos/nextdotjs.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "Node.js", logo: "/logos/nodedotjs.svg" },
];

function ApiGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4 text-fg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
    </svg>
  );
}

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
            <li key={t.name}>{t.name}</li>
          ))}
        </ul>
        <div aria-hidden className="marquee-track flex w-max gap-3">
          {[...half, ...half].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-2 pr-4 text-[0.9375rem] text-fg"
            >
              <span className="grid size-8 place-items-center rounded-full bg-canvas ring-1 ring-line">
                {t.logo ? (
                  <Image src={t.logo} alt="" width={18} height={18} unoptimized className="size-[18px] object-contain" />
                ) : (
                  <ApiGlyph />
                )}
              </span>
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
