import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/", "/oauth/", "/account/", "/data-deletion/status/"],
      },
    ],
    sitemap: `${appConfig.urls.publicWebsite}/sitemap.xml`,
  };
}
