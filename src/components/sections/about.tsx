import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/stat-counter";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/content";
import { site } from "@/lib/site";

export function About() {
  return (
    <Section id="about" className="bg-cream">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal direction="right" className="order-1">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-sand shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/dogs/about.png"
                alt="The owner of Doggli Pet Care with a beloved dog"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* years badge */}
            <div className="absolute -bottom-5 -right-3 flex items-center gap-3 rounded-2xl bg-forest px-5 py-4 text-on-forest shadow-lift sm:-right-5">
              <Heart className="size-7 fill-honey text-honey" strokeWidth={1.5} aria-hidden="true" />
              <span>
                <span className="block font-display text-2xl font-semibold leading-none">5+ years</span>
                <span className="text-sm text-on-forest-muted">of tail wags</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal direction="left" className="order-2">
          <span className="eyebrow">Who we are</span>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            We treat your dog like{" "}
            <em
              className="not-italic text-clay"
              style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1' }}
            >
              our own
            </em>
          </h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone">
            <p>
              Doggli began with a simple belief: every dog deserves a day filled
              with fun and plenty of tail wags. We&apos;re a small, hands-on pet
              care home in El Sobrante — not a crowded kennel — so your pup gets
              real attention, scenic walks, and a comfy place to rest.
            </p>
            <p>
              Whether it&apos;s a single afternoon of play or a long vacation
              stay, your furry friend gets cozy napping spots, outdoor fun in the
              sun, and genuine love and affection every single day.
            </p>
          </div>

          {/* inline stats */}
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-forest sm:text-4xl">
                    <StatCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={"decimals" in s ? s.decimals : 0}
                    />
                  </span>
                  <span className="mt-1 block text-sm text-stone">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/#book">Meet us &amp; your pup</Link>
            </Button>
            <span className="inline-flex items-center gap-2 text-sm text-stone">
              <MapPin className="size-4 text-forest" aria-hidden="true" />
              {site.address.full}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
