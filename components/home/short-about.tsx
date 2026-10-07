import Image from "next/image";

import portrait from "@/assets/people/edishan.jpg";
import { ArrowLink } from "@/components/ui/button";

export function ShortAbout() {
  return (
    <section aria-labelledby="about-title" className="shell pb-20 md:pb-28">
      <div className="card grid items-center gap-8 p-5 md:grid-cols-12 md:p-8">
        <div className="md:col-span-4 lg:col-span-3">
          <Image
            src={portrait}
            alt="Edishan Lee Tenorio"
            sizes="(min-width: 768px) 260px, 100vw"
            placeholder="blur"
            className="aspect-[4/5] w-full rounded-2xl object-cover object-[50%_30%] md:aspect-square"
          />
        </div>
        <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
          <p className="label text-faint">About</p>
          <h2 id="about-title" data-reveal className="mt-4 text-headline text-fg">
            Hi, I&apos;m Edishan.
          </h2>
          <p className="mt-5 max-w-2xl text-lede text-muted">
            An independent engineer in the Philippines. I build automation and CRM systems for agencies and service businesses, and because
            I&apos;m also a full-stack developer, I can build the missing piece when a platform runs out of road. Every system I ship is
            documented, so it keeps working after handover.
          </p>
          <p className="mt-4 text-sm text-faint">Recently: SoftlinkIQ · Tippler · independent clients since 2023</p>
          <ArrowLink href="/about" className="mt-4">
            More about me
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
