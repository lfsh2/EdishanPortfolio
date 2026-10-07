import { ContactCTA } from "@/components/contact-cta";
import { Explore } from "@/components/home/explore";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { SelectedWork } from "@/components/home/selected-work";
import { ShortAbout } from "@/components/home/short-about";
import { ToolMarquee } from "@/components/home/tool-marquee";

/** Seven blocks, scannable in 60–90 seconds. Depth lives one click away on Work, Services and About. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ToolMarquee />
      <Explore />
      <SelectedWork />
      <ShortAbout />
      <ContactCTA />
    </>
  );
}
