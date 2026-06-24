import { site, sameAs, directionsHref } from "@/lib/site";
import { faqs, serviceCities, testimonials, pricingTiers } from "@/lib/content";

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;

/**
 * LocalBusiness (AnimalCareBusiness) — the anchor entity for local + AI search.
 * Enriched with offers/pricing, images, service knowledge, and reviews so search
 * engines and answer engines (ChatGPT/Perplexity/Gemini) can ground answers.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AnimalCareBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.name,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phoneRaw,
    email: site.email,
    image: [
      `${site.url}/opengraph-image`,
      `${site.url}/dogs/dog-1.png`,
      `${site.url}/dogs/about.png`,
      `${site.url}/reviews/g-9.jpg`,
    ],
    logo: `${site.url}/logo.png`,
    priceRange: site.priceRange,
    currenciesAccepted: "USD",
    hasMap: directionsHref,
    knowsAbout: [
      "Dog boarding",
      "Dog daycare",
      "Dog walking",
      "Drop-in pet visits",
      "Pet sitting",
      "Overnight dog boarding",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    // Flexible hours — broad daily window. OWNER TODO: refine exact hours.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    sameAs,
    areaServed: serviceCities.map((c) => ({ "@type": "City", name: c.name })),
    makesOffer: pricingTiers.map((tier) => ({
      "@type": "Offer",
      name: `${tier.name} dog care`,
      price: tier.price,
      priceCurrency: "USD",
      url: `${site.url}/#pricing`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tier.price,
        priceCurrency: "USD",
        unitText: tier.period,
      },
      itemOffered: {
        "@type": "Service",
        name: tier.name,
        provider: { "@id": BUSINESS_ID },
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.text,
      publisher: { "@type": "Organization", name: "Google" },
    })),
  };
}

/** WebSite entity, linked to the business as publisher. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Service schema for a programmatic /{service}/{city} page. */
export function localServiceSchema({
  serviceName,
  cityName,
  url,
}: {
  serviceName: string;
  cityName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    name: `${serviceName} in ${cityName}`,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: cityName },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
  };
}
