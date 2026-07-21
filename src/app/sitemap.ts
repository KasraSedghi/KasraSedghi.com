import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "about", "projects", "contact"];
  return routes.map((route) => ({
    url: `${site.domain}/${route}${route ? "/" : ""}`,
    lastModified: new Date(),
  }));
}
