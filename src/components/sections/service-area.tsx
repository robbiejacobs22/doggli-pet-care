import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { serviceCities } from "@/lib/content";
import { site, directionsHref } from "@/lib/site";

export function ServiceArea() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.full,
  )}&z=13&output=embed`;

  return (
    <Section id="service-area" className="bg-cream">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Where we serve"
            title="Proudly caring for East Bay pups"
            emphasis="East Bay pups"
            subtitle="Based in El Sobrante and welcoming dogs from across the Bay Area. Boarding guests happily travel to us from all over."
          />

          <div className="mt-7 flex flex-wrap gap-2">
            {serviceCities.map((city) => (
              <Link
                key={city.slug}
                href={`/dog-boarding/${city.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-forest hover:text-forest"
              >
                <MapPin className="size-3.5 text-clay" aria-hidden="true" />
                {city.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-line bg-sand/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-forest-ink">{site.name}</p>
              <p className="text-sm text-stone">{site.address.full}</p>
            </div>
            <Button asChild variant="primary" size="md">
              <a href={directionsHref} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                Get directions
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal direction="left">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-sand shadow-lift">
            <iframe
              title={`Map showing ${site.name} in ${site.address.city}, ${site.address.region}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full sm:h-[440px]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
