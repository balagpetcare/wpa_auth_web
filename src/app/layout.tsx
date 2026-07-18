import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { AuthProvider } from "@/features/auth/context";
import { appConfig } from "@/config/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.urls.publicWebsite),
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.tagline,
  applicationName: appConfig.name,
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: appConfig.name,
    description: appConfig.tagline,
    url: appConfig.urls.publicWebsite,
    siteName: appConfig.brandName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: appConfig.brandName,
      legalName: appConfig.legalEntityName,
      url: appConfig.urls.publicWebsite,
      logo: `${appConfig.urls.publicWebsite}/icon.svg`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: appConfig.emails.support,
          availableLanguage: ["en"],
        },
        {
          "@type": "ContactPoint",
          contactType: "privacy",
          email: appConfig.emails.privacy,
          availableLanguage: ["en"],
        },
        {
          "@type": "ContactPoint",
          contactType: "security",
          email: appConfig.emails.security,
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: appConfig.name,
      url: appConfig.urls.publicWebsite,
    },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
