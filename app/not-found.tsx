import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label font-mono text-faint">
        <span className="text-accent">404</span> · route not found
      </p>
      <h1 className="mt-8 max-w-4xl text-display text-fg">
        This path isn&apos;t <Mark onLoad>wired to anything.</Mark>
      </h1>
      <p className="mt-8 max-w-xl text-lede text-muted">The page may have moved. The work is still here.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/work" variant="text">
          View work
        </ButtonLink>
      </div>
    </section>
  );
}
