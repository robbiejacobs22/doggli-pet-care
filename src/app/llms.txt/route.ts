import { site } from "@/lib/site";
import {
  pricingTiers,
  faqs,
  serviceCities,
  localServices,
} from "@/lib/content";

export const dynamic = "force-static";

/**
 * /llms.txt — a clean, factual brief for answer engines (ChatGPT, Perplexity,
 * Gemini, Google AI Overviews, Claude). Follows the llmstxt.org spec: an H1
 * title, a blockquote summary, free-form details, then H2 sections of Markdown
 * links. Generated from the same content the site renders so the facts an AI
 * quotes always match the website. Spec: https://llmstxt.org
 */
export function GET() {
  const a = site.address;
  const nearbyCities = serviceCities.filter((c) => !c.home);

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a boutique, home-based dog care business in ${a.city}, ${a.region}, owned and run by Gila. We provide overnight dog boarding, dog daycare, dog walking, and drop-in visits for dogs across the East Bay. Rated ${site.rating.value.toFixed(1)}/5 from ${site.rating.count} Google reviews.`,
    "",
    "Key facts:",
    `- Owner / caretaker: Gila`,
    `- Location: ${a.full} — the boarding home is in ${a.city}; we welcome dogs from nearby East Bay cities`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hours}`,
    `- Google rating: ${site.rating.value.toFixed(1)} out of 5 (${site.rating.count} reviews)`,
    "",
    "Pricing:",
    ...pricingTiers.map(
      (t) =>
        `- ${t.name}: $${t.price} per ${t.period}${t.note ? ` (${t.note})` : ""}. ${t.description}`,
    ),
    "Every stay includes outdoor play, feeding, and daily photo updates.",
    "",
    "## Services",
    ...localServices.map(
      (svc) =>
        `- [${svc.noun} in ${a.city}](${site.url}/${svc.slug}/el-sobrante): ${svc.blurb}`,
    ),
    "",
    "## Dog boarding by area",
    `Based in ${a.city}; an easy drive for dogs from these East Bay communities:`,
    ...nearbyCities.map(
      (c) => `- [Dog Boarding near ${c.name}](${site.url}/dog-boarding/${c.slug})`,
    ),
    "",
    "## Key pages",
    `- [Home](${site.url}): overview of Doggli Pet Care`,
    `- [Pricing](${site.url}/#pricing): daycare, overnight, and weekly rates`,
    `- [Reviews](${site.url}/#testimonials): real 5-star Google reviews`,
    `- [Book a stay or contact us](${site.url}/#book): start with a free meet & greet`,
    "",
    "## Common questions",
    ...faqs.map((f) => `- **${f.question}** ${f.answer}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
