import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChromeGate } from "@/components/v2/chrome-gate";
import { Footer, Navbar } from "@/components/ui";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yintechsolutions.com"),
  title: {
    default: "YinTech Solutions | AI Automation & Business Systems",
    template: "%s",
  },
  description: site.description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "YinTech Solutions | AI Automation & Business Systems",
    description: site.description,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YinTech Solutions | AI Automation & Business Systems",
    description: site.description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: "https://yintechsolutions.com",
      description: site.description,
    },
    {
      "@type": "WebSite",
      name: site.name,
      url: "https://yintechsolutions.com",
      description: site.description,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ChromeGate footer={<Footer />} header={<Navbar />}>
          <main id="main">{children}</main>
        </ChromeGate>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
