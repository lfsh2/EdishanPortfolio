import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { BottomNav } from "@/components/bottom-nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { graph, personSchema, websiteSchema } from "@/lib/schema";
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
    default: "Edishan Lee Tenorio: GoHighLevel & n8n Automation Developer",
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
    title: "Edishan Lee Tenorio: GoHighLevel & n8n Automation Developer",
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edishan Lee Tenorio: GoHighLevel & n8n Automation Developer",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Opt into scroll-reveal styles only when JS is running, so content never hides without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={graph(personSchema, websiteSchema)} />
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
