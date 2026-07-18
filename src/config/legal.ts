import type { Metadata } from "next";
import { appConfig } from "@/config/app";

export const LEGAL_EFFECTIVE_DATE = "July 18, 2026";
export const LEGAL_LAST_UPDATED = "July 18, 2026";

export function buildPublicPageMetadata(input: {
  title: string;
  description: string;
  pathname: string;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.pathname,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${input.title} | ${appConfig.name}`,
      description: input.description,
      url: `${appConfig.urls.publicWebsite}${input.pathname}`,
      siteName: appConfig.brandName,
      type: "website",
    },
  };
}

export function buildNoIndexPageMetadata(input: {
  title: string;
  description: string;
  pathname?: string;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: input.pathname
      ? {
          canonical: input.pathname,
        }
      : undefined,
    robots: {
      index: false,
      follow: false,
    },
  };
}
