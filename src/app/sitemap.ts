import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

const PUBLIC_ROUTES = [
  appConfig.routes.home,
  appConfig.routes.about,
  appConfig.routes.contact,
  appConfig.routes.support,
  appConfig.routes.privacyPolicy,
  appConfig.routes.termsOfService,
  appConfig.routes.cookiePolicy,
  appConfig.routes.socialLoginInformation,
  appConfig.routes.security,
  appConfig.routes.accountDeletion,
  appConfig.routes.dataDeletion,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((pathname) => ({
    url: `${appConfig.urls.publicWebsite}${pathname}`,
    lastModified,
    changeFrequency: pathname === appConfig.routes.home ? "weekly" : "monthly",
    priority: pathname === appConfig.routes.home ? 1 : 0.7,
  }));
}
