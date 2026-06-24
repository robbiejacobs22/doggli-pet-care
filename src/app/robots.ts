import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Explicitly welcome answer-engine / AI crawlers so Doggli can surface in
// ChatGPT, Perplexity, Gemini, Google AI Overviews, Copilot, etc. (The wildcard
// already allows them; listing them makes the intent unambiguous.)
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
