import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone, Star } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/stars";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import {
  localServices,
  serviceCities,
  trustItems,
  testimonials,
} from "@/lib/content";
import { site, telHref } from "@/lib/site";
import {
  breadcrumbSchema,
  localServiceSchema,
} from "@/lib/schema";

export const dynamicParams = false;

type Params = { service: string; city: string };

export function generateStaticParams(): Params[] {
  return localServices.flatMap((service) =>
    serviceCities.map((city) => ({ service: service.slug, city: city.slug })),
  );
}

function resolve(serviceSlug: string, citySlug: string) {
  const service = localServices.find((s) => s.slug === serviceSlug);
  const city = serviceCities.find((c) => c.slug === citySlug);
  if (!service || !city) return null;
  return { service, city };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const match = resolve(serviceSlug, citySlug);
  if (!match) return {};
  const { service, city } = match;

  const title = `${service.noun} in ${city.name}, CA`;
  const description = `Trusted ${service.label.toLowerCase()} for ${city.name} dogs. ${service.blurb} 4.9★ rated, 500+ happy dogs. Call ${site.phone}.`;
  const path = `/${service.slug}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}${path}`,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function LocalServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { service: serviceSlug, city: citySlug } = await params;
  const match = resolve(serviceSlug, citySlug);
  if (!match) notFound();
  const { service, city } = match;

  const path = `/${service.slug}/${city.slug}`;
  const otherServices = localServices.filter((s) => s.slug !== service.slug);
  const nearbyCities = serviceCities.filter((c) => c.slug !== city.slug).slice(0, 6);
  const review = testimonials[0];

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: service.label, url: `${site.url}/${service.slug}/el-sobrante` },
    { name: city.name, url: `${site.url}${path}` },
  ]);
  const serviceLd = localServiceSchema({
    serviceName: service.noun,
    cityName: city.name,
    url: `${site.url}${path}`,
  });

  return (
    <main id="main">
      <JsonLd data={[serviceLd, breadcrumb]} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(55%_60%_at_75%_-5%,var(--color-honey-soft),transparent_60%)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <Reveal>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-stone">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-forest">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-forest-ink">{service.label}</li>
                <li aria-hidden>/</li>
                <li className="text-forest-ink">{city.name}</li>
              </ol>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-stone shadow-soft">
              <MapPin className="size-4 text-clay" aria-hidden="true" />
              Serving {city.name} &amp; the East Bay
            </span>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] text-forest-ink sm:text-5xl lg:text-6xl">
              {service.noun} in{" "}
              <em className="not-italic text-clay" style={{ fontVariationSettings: '"SOFT" 90, "WONK" 1' }}>
                {city.name}
              </em>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">
              {service.blurb} Whether you&apos;re {city.proximity} {city.name} or just
              passing through, Doggli gives your dog warm, supervised, genuinely loving
              care — with daily photo updates so you never wonder how they&apos;re doing.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="honey" size="lg">
                <Link href="/#book">
                  Book a Stay <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={telHref}>
                  <Phone className="size-5" /> {site.phone}
                </a>
              </Button>
            </div>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-soft">
              <Stars rating={site.rating.value} size={18} />
              <span className="text-sm text-stone">
                <span className="font-semibold text-forest-ink">{site.rating.value.toFixed(1)}/5</span>{" "}
                · {site.rating.count}+ reviews · 500+ happy dogs
              </span>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-sand shadow-lift">
              <Image
                src="/dogs/dog-3.png"
                alt={`A happy dog enjoying ${service.label.toLowerCase()} near ${city.name}, CA`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why local pet parents choose us */}
      <Section className="bg-cream">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Why {city.name} chooses Doggli</span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Care that {city.name} pet parents trust
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.slice(0, 6).map((item) => (
            <RevealItem key={item.title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand text-forest">
                <Icon name={item.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-forest-ink">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-stone">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Review + included */}
      <Section className="bg-sand grain">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "Free meet & greet before any stay",
                "Small groups, careful introductions, constant supervision",
                "Outdoor play and scenic walks",
                "Daily photo & message updates",
                "Flexible early drop-off & late pick-up",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-honey-soft text-honey-deep">
                    <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <Button asChild variant="primary" size="lg" className="mt-8">
              <Link href="/#book">Plan {city.name} care</Link>
            </Button>
          </Reveal>

          <Reveal direction="left">
            <figure className="flex h-full flex-col justify-center rounded-3xl border border-line bg-card p-8 shadow-soft">
              <Stars rating={5} size={20} />
              <blockquote className="mt-4 font-display text-xl leading-relaxed text-forest-ink">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-forest font-display text-sm font-semibold text-on-forest">
                  {review.name.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-forest-ink">{review.name}</span>
                  <span className="text-stone">Dog parent to {review.dogName}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Internal links: other services + nearby areas */}
      <Section className="bg-cream">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">More ways we help in {city.name}</h2>
            <ul className="mt-5 flex flex-col gap-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}/${city.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-line bg-card px-5 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-forest"
                  >
                    <span className="font-medium text-forest-ink">
                      {s.noun} in {city.name}
                    </span>
                    <ArrowRight className="size-4 text-forest transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{service.label} nearby</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {nearbyCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${service.slug}/${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-forest hover:text-forest"
                  >
                    <MapPin className="size-3.5 text-clay" aria-hidden="true" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-forest-deep">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <Reveal className="mx-auto max-w-2xl">
            <Star className="mx-auto size-8 fill-honey text-honey" strokeWidth={1.25} aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold text-on-forest sm:text-4xl">
              Ready for {service.noun.toLowerCase()} in {city.name}?
            </h2>
            <p className="mt-3 text-on-forest-muted">
              Start with a free meet &amp; greet. We&apos;ll make sure it&apos;s the right fit
              for your pup.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="honey" size="lg">
                <Link href="/#book">Book a Stay</Link>
              </Button>
              <Button asChild variant="onForest" size="lg">
                <a href={telHref}>
                  <Phone className="size-5" /> Call {site.phone}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
