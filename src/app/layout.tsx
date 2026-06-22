import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // One variable file (wght axis only). Requesting opsz/SOFT/WONK/italic split
  // Fraunces into several files that loaded progressively and made the big
  // headline visibly re-render ("blink") on load. Emphasis is color-only.
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Dog Boarding, Daycare & Walking in El Sobrante`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dog boarding El Sobrante",
    "dog daycare El Sobrante",
    "dog walking East Bay",
    "pet sitting Richmond CA",
    "dog boarding near me",
    "Bay Area dog boarding",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Dog Boarding, Daycare & Walking`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Dog Boarding, Daycare & Walking`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "pets",
};

export const viewport: Viewport = {
  themeColor: "#fbf8f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-on-forest focus:shadow-lift"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
