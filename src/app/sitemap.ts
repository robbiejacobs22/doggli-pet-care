import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localServices, serviceCities } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const localPages: MetadataRoute.Sitemap = localServices.flatMap((service) =>
    serviceCities.map((city) => ({
      url: `${site.url}/${service.slug}/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...home, ...localPages];
}
