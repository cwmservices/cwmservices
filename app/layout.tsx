import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Plus_Jakarta_Sans } from "next/font/google";


const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});


const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

// updated 

const geist = localFont({
  src: [
    { path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2", weight: "400" },
    { path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2", weight: "500" },
    { path: "../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2", weight: "600" },
  ],
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
      className="bg-[#0B0B0D] scroll-smooth scroll-pt-[80px] lg:scroll-pt-[90px] xl:scroll-pt-[100px]"
    >
      <head>
        {/*
          ── BLOCKING theme script ────────────────────────────────────────
          Runs synchronously before the first paint so there is NEVER a
          flash of the wrong theme. It reads localStorage['theme']; if not
          set it falls back to the OS preference (prefers-color-scheme).
          Because it's a plain <script> (not async/defer) the browser must
          execute it before rendering any HTML below it.
        */}

      </head>
      <body
        className={`${outfit.variable} ${geist.variable} ${jakarta.variable} font-body bg-[#0B0B0D] text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}