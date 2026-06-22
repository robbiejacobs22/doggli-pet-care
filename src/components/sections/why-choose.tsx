import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { trustItems } from "@/lib/content";

export function WhyChoose() {
  return (
    <Section
      id="why-choose"
      className="relative overflow-hidden bg-forest-deep text-on-forest"
    >
      {/* subtle warm glow, no blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(50%_50%_at_85%_0%,oklch(48%_0.075_156/0.6),transparent_60%)]"
      />
      <div className="relative">
        <SectionHeading
          tone="onForest"
          eyebrow="Why pet parents trust us"
          title="Peace of mind, built in"
          emphasis="Peace of mind"
          subtitle="The small things that add up to a safe, happy stay — and to you relaxing while you're away."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <RevealItem key={item.title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-on-forest/10 text-honey">
                <Icon name={item.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-on-forest">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-on-forest-muted">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
