import type { MetadataRoute } from "next";
import { branches } from "@/lib/branches";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/sucursales`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${site.url}/marcas`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const branchRoutes: MetadataRoute.Sitemap = branches.map((b) => ({
    url: `${site.url}/sucursales/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...branchRoutes];
}
