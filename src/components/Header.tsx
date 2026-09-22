"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MessageModal from "../utils/MessageBox";

const NAV_ITEMS = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/#projects" },
  { label: "Testimonials", path: "/#testimonials" },
  { label: "Contact", path: "/#contact" },
  { label: "Blog", path: "/blog" },
];

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* Animated hamburger <-> close icon, driven entirely by framer-motion */
function MenuToggleIcon({ open }: { open: boolean }) {
  const bar = "block h-[1.75px] w-full rounded-full bg-current";
  return (
    <div className="relative w-5 h-[14px] flex flex-col justify-between">
      <motion.span
        className={bar}
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className={bar}
        animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        className={bar}
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    const sync = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      const next = event.newValue === "dark" ? "dark" : "light";
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.dataset.theme = next === "dark" ? "cwmdark" : "cwmlight";
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.dataset.theme = next === "dark" ? "cwmdark" : "cwmlight";
    try { localStorage.setItem("theme", next); } catch (_) { /* Storage may be unavailable. */ }
  };
  const themeButton = (
    <button type="button" onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-foreground hover:bg-tint transition-colors">
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );

  /* Cross-page hash navigation fix */
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [pathname]);

  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  /* Scroll state — only used to nudge the header to a slightly transparent fill. No border, no shadow. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while the full-screen menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close the menu automatically on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const closeDrawer = useCallback(() => setMobileOpen(false), []);
  const toggleDrawer = useCallback(() => setMobileOpen((v) => !v), []);

  /* Full text button — used inside the mobile full-screen menu, in the same spot the icon pill would sit.
     Uses the ink tones (not primary orange) so it reads as a secondary control, not another CTA. */
  const MobileQuoteButton = (
    <button
      onClick={() => { closeDrawer(); setIsModalOpen(true); }}
      suppressHydrationWarning
      className="w-full flex items-center justify-center gap-2 font-nav text-[15px] font-semibold tracking-[0.01em]
                 py-3 rounded-full bg-primary text-white
                 opacity-90 hover:opacity-100 transition-opacity duration-200"
    >
      Get a Quote
    </button>
  );

  return (
    <>
      <header className="sticky top-0 z-50 font-nav">
        {/* ── Bar ── */}
        <div
          className={[
            "relative transition-colors duration-300",
            scrolled
              ? "bg-canvas/75 backdrop-blur-md"
              : "bg-canvas",
          ].join(" ")}
        >
         <div className="relative w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto flex items-center justify-between h-14 sm:h-[60px] lg:h-[68px] xl:h-[76px] transition-all duration-300">

            {/* ── Logo: mobile (left) ── */}
            <Link href="/" className="flex lg:hidden items-center focus:outline-none shrink-0">
              <Image src="/cwmlogo.png" alt="CWM" width={34} height={34} className="rounded-full" />
            </Link>

            {/* ── Logo: desktop ── */}
            <Link href="/" className="hidden lg:block focus:outline-none shrink-0">
              <div className="relative w-[36px] h-[36px] lg:w-[42px] lg:h-[42px] xl:w-[48px] xl:h-[48px] transition-all duration-300">
                <Image
                  src="/cwmlogo.png"
                  alt="CWM"
                  fill
                  sizes="(max-width: 1024px) 36px, (max-width: 1280px) 42px, 48px"
                  className="rounded-full object-cover"
                />
              </div>
            </Link>

            {/* ── Desktop nav ── */}
         <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
  {NAV_ITEMS.map(({ label, path }) => (
    <Link
      key={path}
      href={path}
      className="font-nav text-[14.5px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium tracking-[0.01em]
                 px-2.5 lg:px-3 xl:px-3.5 py-2 rounded-lg text-foreground
                 opacity-70 hover:opacity-100 transition-opacity duration-200"
    >
      {label}
    </Link>
  ))}
</nav>

            {/* ── Mobile: Get a Quote — centered in the bar ── */}
            <div className="flex lg:hidden items-center gap-2">
              {themeButton}
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-nav text-[13px] xl:text-[15px] font-semibold tracking-[0.02em]
                           px-4 py-1.5 lg:hidden rounded-full bg-transparent border border-line hover:bg-tint duration-300 text-foreground whitespace-nowrap
                           opacity-90 hover:opacity-100 transition-opacity duration-200"
            >
              Get a Quote
            </button>
            </div>

            {/* ── Desktop right controls ── */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5">
              {themeButton}
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-nav text-[13px] xl:text-[15px] font-semibold tracking-[0.02em]
                           px-6 py-2.5 rounded-full bg-transparent border border-line hover:bg-tint duration-300 transition-background text-foreground whitespace-nowrap
                           opacity-90 hover:opacity-100 transition-all duration-200"
              >
                Get a Quote
              </button>
            </div>

            {/* ── Mobile: menu toggle (right) ── */}
            <button
              ref={toggleBtnRef}
              onClick={toggleDrawer}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              className="flex lg:hidden items-center justify-center w-9 h-9 text-foreground focus:outline-none"
            >
              <MenuToggleIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* ── Full-screen mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-14 sm:top-[60px] z-40 bg-canvas overflow-y-auto">
            <div className="w-[92%] mx-auto h-full flex flex-col pt-10 pb-10">
              {/* Dark / light mode, first */}
              {MobileQuoteButton}

              {/* Links */}
              <ul className="flex flex-col mt-10 gap-1">
                {NAV_ITEMS.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      onClick={closeDrawer}
                      className="block py-3.5 font-nav text-[22px] font-medium tracking-[0.01em] text-foreground
                                 opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}