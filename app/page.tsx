import { ContactCTA } from "@/components/contact-cta";
import { Faq } from "@/components/faq";
import { Capabilities } from "@/components/home/capabilities";
import { Differentiator } from "@/components/home/differentiator";
import { Experience } from "@/components/home/experience";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { PipelineRail } from "@/components/pipeline-rail";
import { faq } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <PipelineRail />
      <Hero />
      <Capabilities />
      <FeaturedWork />
      <Differentiator />
      <Experience />
      <Faq items={faq} />
      <ContactCTA step />
    </>
  );
}
