import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-sand grain">
      <SectionHeading
        eyebrow="How it works"
        title="Simple from hello to homecoming"
        emphasis="hello to homecoming"
        subtitle="First time boarding your dog? Here's exactly how it goes — no surprises, no stress."
      />

      <RevealGroup className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_8px,transparent_8px_16px)] lg:block"
        />

        {howItWorks.map((step, i) => (
          <RevealItem key={step.title} className="relative">
            <div className="flex flex-col items-start">
              <div className="relative z-10 grid size-14 place-items-center rounded-2xl border border-line bg-card text-forest shadow-soft">
                <Icon name={step.icon} className="size-6" />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-forest font-sans text-xs font-bold text-on-forest">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-stone">{step.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12 flex justify-center">
        <Button asChild variant="primary" size="lg">
          <Link href="/#book">Start with a free meet &amp; greet</Link>
        </Button>
      </Reveal>
    </Section>
  );
}
