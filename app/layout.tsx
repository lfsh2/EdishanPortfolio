import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { BottomNav } from "@/components/bottom-nav";
import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { site } from "@/lib/site";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | AI Automation & CRM Systems`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: ["AI automation", "GoHighLevel", "n8n", "CRM automation", "full-stack developer", "Next.js", "Laravel", "Philippines"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | AI Automation & CRM Systems`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | AI Automation & CRM Systems`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f1",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Naic, Cavite", addressCountry: "PH" },
  sameAs: [site.socials.linkedin, site.socials.github],
  knowsAbout: ["GoHighLevel", "n8n", "AI automation", "CRM", "Next.js", "TypeScript", "Laravel", "Java Spring Boot"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Opt into scroll-reveal styles only when JS is running, so content never hides without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-fg px-5 py-3 text-sm text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Sidebar />
        <div className="md:pl-60 lg:pl-[17.5rem]">
          <TopBar />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <BottomNav />
        <RevealObserver />
      </body>
    </html>
  );
}
