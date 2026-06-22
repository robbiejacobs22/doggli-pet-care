import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing" className="bg-sand grain">
      <SectionHeading
        eyebrow="Simple pricing"
        title="Transparent rates, no surprises"
        emphasis="no surprises"
        subtitle="Honest pricing for honest care. Pick what fits your dog's stay — and ask us about longer bookings."
      />

      <RevealGroup className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <RevealItem key={tier.id} className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
                tier.popular
                  ? "border-forest bg-card shadow-lift lg:-my-3 lg:py-10"
                  : "border-line bg-card/70 shadow-soft hover:shadow-lift",
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-honey px-4 py-1.5 text-xs font-semibold text-forest-ink shadow-soft">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Most popular
                </span>
              )}

              <div>
                <h3 className="font-display text-xl font-semibold text-forest-ink">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-stone">{tier.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold text-forest">
                  ${tier.price}
                </span>
                <span className="text-stone">/ {tier.period}</span>
              </div>
              {tier.note && (
                <p className="mt-2 inline-flex w-fit rounded-full bg-clay-soft px-3 py-1 text-xs font-medium text-clay">
                  {tier.note}
                </p>
              )}

              <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-7">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-honey-soft text-honey-deep">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={tier.popular ? "honey" : "outline"}
                className="mt-8 w-full"
              >
                <Link href="/#book">Book {tier.name}</Link>
              </Button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-8 text-center text-sm text-stone">
        Have a multi-dog family or a longer stay?{" "}
        <Link href="/#book" className="font-semibold text-forest underline-offset-4 hover:underline">
          Ask about custom pricing
        </Link>
        .
      </p>
    </Section>
  );
}
