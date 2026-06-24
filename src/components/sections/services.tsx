import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { services } from "@/lib/content";

export function Services() {
  const featured = services.find((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <Section id="services" className="bg-cream">
      <SectionHeading
        align="left"
        eyebrow="What we offer"
        title="Care for every kind of day"
        emphasis="every kind of day"
        subtitle="From a single afternoon of play to a two-week vacation stay — thoughtful, supervised care tailored to your dog."
      />

      {/* Featured: wide photo feature card */}
      {featured && (
        <Reveal className="mt-12">
          <Link
            href={`/${featured.slug}/el-sobrante`}
            className="group relative grid overflow-hidden rounded-3xl border border-line shadow-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lift md:grid-cols-2"
          >
            {/* Photo */}
            <div className="relative min-h-[260px] overflow-hidden md:min-h-[360px]">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt="Two dogs cuddling during an overnight boarding stay at Doggli"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[50%_47%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              )}
              {/* forest scrim: darken top + bottom to mute the photo's baked-in
                  captions, and melt the right edge into the green panel */}
              <div className="absolute inset-0 bg-forest-ink/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-forest-ink/60 via-transparent to-forest-ink/60" />
              <div className="absolute inset-0 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-forest-deep" />
            </div>

            {/* Copy */}
            <div className="relative flex flex-col justify-center bg-gradient-to-br from-forest to-forest-deep p-8 text-on-forest sm:p-10">
              <span className="grid size-14 place-items-center rounded-2xl bg-on-forest/10 text-honey">
                <Icon name={featured.icon} className="size-7" />
              </span>
              <p className="mt-6 text-sm font-medium text-honey">{featured.tagline}</p>
              <h3 className="mt-1 font-display text-3xl font-semibold leading-tight text-on-forest sm:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-on-forest-muted">
                {featured.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-honey">
                Learn more
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      {/* Equal-sized cards */}
      <RevealGroup className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((service) => (
          <RevealItem key={service.id}>
            <Link
              href={`/${service.slug}/el-sobrante`}
              className="group flex h-full flex-col rounded-3xl border border-line bg-card p-7 shadow-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-sand text-forest transition-colors group-hover:bg-honey-soft">
                <Icon name={service.icon} className="size-7" />
              </span>
              <div className="mt-6">
                <p className="text-sm font-medium text-clay">{service.tagline}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">
                  {service.name}
                </h3>
                <p className="mt-3 leading-relaxed text-stone">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
