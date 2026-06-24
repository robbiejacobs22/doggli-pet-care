import { site } from "@/lib/site";
import {
  services,
  pricingTiers,
  faqs,
  serviceCities,
  localServices,
} from "@/lib/content";

export const dynamic = "force-static";

/**
 * /llms.txt — a clean, factual brief for answer engines (ChatGPT, Perplexity,
 * Gemini, Google AI Overviews, Claude). Generated from the same content the
 * site renders, so the facts an AI quotes always match the website.
 * Spec: https://llmstxt.org
 */
export function GET() {
  const a = site.address;

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a boutique, home-based dog care business in ${a.city}, ${a.region}, owned and run by Gila. We provide overnight dog boarding, dog daycare, dog walking, and drop-in visits for dogs across the East Bay. Rated ${site.rating.value.toFixed(1)}/5 from ${site.rating.count} Google reviews.`,
    "",
    "## Key facts",
    `- Business: ${site.name}`,
    `- Owner / caretaker: Gila`,
    `- Location: ${a.full} (the boarding home is in ${a.city}; we serve nearby East Bay cities)`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hours}`,
    `- Google rating: ${site.rating.value.toFixed(1)} out of 5 (${site.rating.count} reviews)`,
    `- Website: ${site.url}`,
    "",
    "## Services",
    ...services.map((s) => `- ${s.name}: ${s.description}`),
    "",
    "## Pricing",
    ...pricingTiers.map(
      (t) =>
        `- ${t.name}: $${t.price} per ${t.period}${t.note ? ` (${t.note})` : ""} — ${t.description}`,
    ),
    "",
    "## Service areas",
    `Based in ${a.city}; an easy drive for dogs from these East Bay communities: ${serviceCities
      .map((c) => c.name)
      .join(", ")}.`,
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Key links",
    `- Home: ${site.url}`,
    `- Book a stay / contact: ${site.url}/#book`,
    `- Pricing: ${site.url}/#pricing`,
    `- Reviews: ${site.url}/#testimonials`,
    ...localServices.map(
      (svc) => `- ${svc.label} in El Sobrante: ${site.url}/${svc.slug}/el-sobrante`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
