import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const bodyFont = Source_Sans_3({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://www.litabible.com";
const SITE_TITLE = "LitaBible — La Bible en texte et en audio, lectures du jour";
const SITE_DESC =
  "Lisez et écoutez la Bible gratuitement en français, anglais, espagnol, allemand, twi, ewe, yoruba, igbo, haoussa, wolof et malinké. Bible audio, lectures de la messe du jour, office des heures et calendrier liturgique.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | LitaBible",
  },
  description: SITE_DESC,
  applicationName: "LitaBible",
  keywords: [
    "LitaBible",
    "Bible en ligne",
    "Bible audio",
    "Bible audio gratuite",
    "écouter la Bible",
    "Bible Louis Segond",
    "Bible en français",
    "lecture du jour",
    "lectures de la messe",
    "évangile du jour",
    "office des heures",
    "calendrier liturgique",
    "Bible twi",
    "Twi Bible audio",
    "Bible ewe",
    "Bible yoruba",
    "Bible igbo",
    "Bible haoussa",
    "Bible wolof",
    "Bible malinké",
    "Bible dioula",
    "Bible baoulé",
    "Bible Côte d'Ivoire",
    "Bible Ghana",
    "Bible Afrique de l'Ouest",
    "audio Bible",
    "free audio Bible",
    "Bible in African languages",
  ],
  authors: [{ name: "LitaBible", url: SITE_URL }],
  creator: "LitaBible",
  publisher: "LitaBible",
  category: "religion",
  alternates: {
    canonical: "/",
    languages: { "fr-FR": "/", "en-US": "/", "es-ES": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "LitaBible",
    title: SITE_TITLE,
    description: SITE_DESC,
    locale: "fr_FR",
    alternateLocale: ["en_US", "es_ES"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LitaBible — La Bible en texte et en audio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1a4fa0",
  width: "device-width",
  initialScale: 1,
};

/** Structured data (schema.org) — helps Google show a rich result + sitelinks search box. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "LitaBible",
      alternateName: ["Lita Bible", "LitaBible.com"],
      description: SITE_DESC,
      inLanguage: ["fr", "en", "es", "de", "tw", "ee", "yo", "ig", "ha", "wo"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LitaBible",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      areaServed: ["CI", "GH", "SN", "BF", "ML", "TG", "BJ", "NG"],
    },
    {
      "@type": "WebApplication",
      name: "LitaBible",
      url: SITE_URL,
      applicationCategory: "ReferenceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "XOF" },
      featureList: [
        "Bible texte multilingue",
        "Bible audio (anglais, twi, ewe, yoruba, igbo, haoussa)",
        "Lectures de la messe du jour",
        "Office des heures",
        "Calendrier liturgique",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} font-open antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
