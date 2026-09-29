import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LitaBible — La Bible et les lectures du jour",
  description:
    "Lectures de la messe, office des heures, Bible et calendrier liturgique au quotidien. LitaBible — la Parole au cœur de chaque jour.",
  keywords: ["LitaBible", "Bible", "lectures du jour", "lecture quotidienne", "calendrier", "office des heures", "partage", "communauté"],
  authors: [{ name: "LitaBible" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} font-open antialiased`}
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
