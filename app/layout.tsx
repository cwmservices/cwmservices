import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

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
  title: "Cwmservices | Software Development Services",
  description:
    "Developing Professional Web and Mobile Applications Using Modern Technologies — React, Node, Tailwind CSS and Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      suppressHydrationWarning is required because the blocking script below
      may add class="dark" to <html> before React hydrates — that's intentional.
    */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          ── BLOCKING theme script ────────────────────────────────────────
          Runs synchronously before the first paint so there is NEVER a
          flash of the wrong theme. It reads localStorage['theme']; if not
          set it falls back to the OS preference (prefers-color-scheme).
          Because it's a plain <script> (not async/defer) the browser must
          execute it before rendering any HTML below it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* ── CSS custom properties — single source of truth ── */}
        <style>{`
          :root {
            --color-dark:          #0F1420;
            --color-light:         #F7F8FC;
            --color-primary:       #F08700;
            --color-secondary:     #F5A623;
            --color-surface:       #F7F8FC;
            --color-surface-muted: #EDEEF5;
            --color-border:        #DDE0EE;
            --color-ink:           #0F1420;
            --color-ink-muted:     #5A6075;
            --bg:                  var(--color-light);
            --fg:                  var(--color-ink);
          }
          html.dark {
            --color-surface:       #161C2D;
            --color-surface-muted: #1D2538;
            --color-border:        #252E44;
            --color-ink:           #E4E7F2;
            --color-ink-muted:     #8892AA;
            --bg:                  var(--color-dark);
            --fg:                  var(--color-ink);
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; }
          body {
            font-family: var(--font-geist), system-ui, sans-serif;
            background-color: var(--bg);
            color: var(--fg);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transition: background-color 0.25s, color 0.25s;
          }
        `}</style>
      </head>
      <body className={`${outfit.variable} ${geist.variable} font-body`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}