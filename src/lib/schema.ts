import { site, sameAs } from "@/lib/site";
import { faqs, serviceCities, testimonials } from "@/lib/content";

const ID = `${site.url}/#business`;

/**
 * LocalBusiness (AnimalCareBusiness) — the anchor entity for local SEO.
 * Includes geo, hours, price range, rating, reviews, and areaServed.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AnimalCareBusiness"],
    "@id": ID,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneRaw,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/logo.png`,
    priceRange: site.priceRange,
    currenciesAccepted: "USD",
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
    areaServed: serviceCities.map((c) => ({
      "@type": "City",
      name: c.name,
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
    })),
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
    provider: { "@id": ID },
    areaServed: { "@type": "City", name: cityName },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
  };
}
