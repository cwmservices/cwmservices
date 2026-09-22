import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";


// updated 

const geist = localFont({
  src: [{ path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2", weight: "100 900" }],
  variable: "--font-geist",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cwmservices.dev"),
  title: {
    default: "Cwmservices | Software Development Services",
    template: "%s | Cwmservices",
  },
  description:
    "Developing Professional Web, Mobile & AI Applications. Specializing in modern technologies including React, Node, Next.js, AI Systems, RAG and MCP integrations.",
  keywords: ["Software Development", "Web Development", "Mobile Apps", "AI Systems", "AI Software", "AI Website", "RAG", "MCP", "Next.js", "React", "Node.js"],
  openGraph: {
    title: "Cwmservices | Software & AI Development Services",
    description: "Developing Professional Web, Mobile & AI Applications. Specializing in modern technologies including React, Node, Next.js, AI Systems, RAG and MCP integrations.",
    url: "https://cwmservices.dev",
    siteName: "Cwmservices",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Cwmservices",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://cwmservices.dev",
  },
  verification: {
    google: "nCYkPCUFZtmL1Lxk3M43fmYBzEVp7PtGDTW_huf3dQA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      suppressHydrationWarning is required because the blocking script below
      may add class="dark" to <html> before React hydrates — that's intentional.
    */
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-canvas scroll-smooth scroll-pt-[80px] lg:scroll-pt-[90px] xl:scroll-pt-[100px]"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { var t = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; document.documentElement.classList.toggle('dark', t === 'dark'); document.documentElement.dataset.theme = t === 'dark' ? 'cwmdark' : 'cwmlight'; } catch (_) { document.documentElement.dataset.theme = 'cwmlight'; }` }} />
      </head>
      <body
        className={`${geist.variable} font-body bg-canvas text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}