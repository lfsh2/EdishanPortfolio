import Image from "next/image";

/** Official marks, self-hosted in /public/logos. "APIs" is a capability, not a brand, so it gets a neutral glyph. */
const tools: { name: string; logo?: string }[] = [
  // Automation & AI
  { name: "GoHighLevel", logo: "/logos/gohighlevel.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "Claude Code", logo: "/logos/claude.svg" },
  { name: "Twilio", logo: "/logos/twilio.svg" },
  { name: "APIs" },
  // Languages & frameworks
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Next.js", logo: "/logos/nextdotjs.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "shadcn/ui", logo: "/logos/shadcnui.svg" },
  { name: "Node.js", logo: "/logos/nodedotjs.svg" },
  { name: "PHP", logo: "/logos/php.svg" },
  { name: "Laravel", logo: "/logos/laravel.svg" },
  { name: "Go", logo: "/logos/go.svg" },
  // Infrastructure & editors
  { name: "AWS", logo: "/logos/aws.svg" },
  { name: "DigitalOcean", logo: "/logos/digitalocean.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
  { name: "VS Code", logo: "/logos/vscode.svg" },
  { name: "Cursor", logo: "/logos/cursor.svg" },
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
  // The track is the list twice, so translating by -50% loops seamlessly. With this many
  // tools one copy is already wider than the container; duration scales to keep a slow pace.
  const half = tools;
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
        <div aria-hidden className="marquee-track flex w-max gap-3" style={{ animationDuration: `${tools.length * 3.5}s` }}>
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
