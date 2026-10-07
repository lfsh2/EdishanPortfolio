import type { Metadata } from "next";
import Image from "next/image";

import portrait from "@/assets/people/edishan.jpg";
import { ContactCTA } from "@/components/contact-cta";
import { ProofStrip } from "@/components/home/proof-strip";
import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { education, experience, principles, skills } from "@/lib/content";
import { site } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Edishan Lee Tenorio: automation engineer and full-stack developer in the Philippines, building GoHighLevel and n8n systems and the custom software underneath them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="shell grid items-center gap-14 pb-20 pt-14 md:pb-24 md:pt-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-2.5 text-faint">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            About · {site.location}
          </p>
          <h1 className="mt-8 text-display text-fg">
            The engineer behind <Mark onLoad>the automation.</Mark>
          </h1>
          <div className="mt-9 max-w-2xl space-y-5 text-lede text-muted">
            <p>
              I build automation systems for agencies and service businesses: GoHighLevel workflows, n8n pipelines, and the custom APIs and
              webhooks that connect them.
            </p>
            <p>
              Because I&apos;m also a full-stack developer, working in React and Next.js, Laravel and Java Spring Boot, I can build the
              integration layer myself instead of telling you &ldquo;GHL doesn&apos;t do that.&rdquo;
            </p>
            <p>
              I work remotely with clients from scoping through deployment and long-term maintenance. Every automation I ship is documented
              with its triggers, inputs and failure points, so it keeps working after I hand it over.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.calendar}>Book a strategy call</ButtonLink>
            <ButtonLink href={site.resume} variant="text" icon={<span aria-hidden>↓</span>} target="_blank">
              Download résumé
            </ButtonLink>
          </div>
        </div>

        <figure className="lg:col-span-4 lg:col-start-9">
          <div className="overflow-hidden rounded-xl border border-line bg-surface p-2">
            <Image
              src={portrait}
              alt="Edishan Lee Tenorio, outdoors on a tree-lined road."
              sizes="(min-width: 1024px) 30vw, 90vw"
              placeholder="blur"
              priority
              className="aspect-[4/5] w-full rounded-lg object-cover object-[50%_30%] grayscale-[0.35]"
            />
          </div>
          <figcaption className="label mt-3 px-1 text-faint">Cavite, PH · UTC+8</figcaption>
        </figure>
      </header>

      <ProofStrip />

      <section aria-labelledby="xp-title" className="shell py-24 md:py-32">
        <SectionHeader
          label="Experience"
          id="xp-title"
          title={
            <>
              Where I&apos;ve <Mark>done the work.</Mark>
            </>
          }
        />
        <ol className="mt-14 border-t border-fg/80 md:mt-20">
          {experience.map((role) => (
            <li key={role.company + role.period} data-reveal className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
              <p className="label text-faint lg:col-span-3 lg:pt-2">{role.period}</p>
              <div className="lg:col-span-4">
                <h3 className="text-2xl tracking-[-0.03em] text-fg">{role.company}</h3>
                <p className="mt-1 text-muted">{role.title}</p>
              </div>
              {role.points ? (
                <ul className="space-y-3 lg:col-span-5">
                  {role.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-quiet" />
                      {pt}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          {education.map((e) => (
            <li key={e.title} className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
              <p className="label text-faint lg:col-span-3 lg:pt-2">{e.period}</p>
              <div className="lg:col-span-9">
                <h3 className="text-2xl tracking-[-0.03em] text-fg">{e.title}</h3>
                <p className="mt-1 text-muted">{e.place} · Education</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills-title" className="theme-dark">
        <div className="shell py-24 md:py-32">
          <SectionHeader
            label="Toolkit"
            id="skills-title"
            title={
              <>
                What I <Mark>work with.</Mark>
              </>
            }
          />
          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group, i) => (
              <div key={group.group} data-reveal style={revealDelay(i * 70)} className="rounded-lg border border-line bg-surface p-7">
                <p className="label text-accent">{group.group}</p>
                <ul className="mt-6 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-[0.8rem] text-fg/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="shell py-24 md:py-32">
        <SectionHeader
          label="How I build"
          id="how-title"
          title={
            <>
              Flexible logic on top of <Mark>locked-down core.</Mark>
            </>
          }
        />
        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} data-reveal style={revealDelay(i * 90)} className="rounded-lg border border-line p-7">
              <p className="label text-faint">0{i + 1}</p>
              <h3 className="mt-8 text-xl tracking-[-0.02em] text-fg">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <ContactCTA />
    </>
  );
}
