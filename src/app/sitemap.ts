import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localServices, serviceCities } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const localPages: MetadataRoute.Sitemap = localServices.flatMap((service) =>
    serviceCities.map((city) => ({
      url: `${site.url}/${service.slug}/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...home, ...localPages];
}
