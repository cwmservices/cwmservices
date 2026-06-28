"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MessageModal from "../utils/MessageBox";

const NAV_ITEMS = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/#projects" },
  { label: "Testimonials", path: "/#testimonials" },
  { label: "Contact", path: "/#contact" },
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  /* Cross-page hash navigation fix */
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, [pathname]);

  /*
    Start as false (matches server render exactly → no hydration mismatch).
    useLayoutEffect runs synchronously after hydration but before the browser
    paints, so the thumb snaps to the correct position with zero visible flicker.
  */
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  /* Scroll elevation */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Outside-click closes drawer */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        drawerRef.current && !drawerRef.current.contains(e.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)
      ) closeDrawer();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeDrawer = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => { setMobileOpen(false); setIsClosing(false); }, 320);
  }, []);

  const toggleDrawer = useCallback(() => {
    mobileOpen ? closeDrawer() : setMobileOpen(true);
  }, [mobileOpen, closeDrawer]);

  const toggleTheme = useCallback(() => {
    const nextDark = !isDark;
    document.documentElement.classList.toggle("dark", nextDark);
    try { localStorage.setItem("theme", nextDark ? "dark" : "light"); } catch (_) { }
    setIsDark(nextDark);
  }, [isDark]);

  return (
    <>
      <style jsx>{`
        /* ── Nav underline ── */
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 50%;
          width: 0; height: 1.5px;
          background: var(--color-primary);
          border-radius: 2px;
          transition: width .2s ease, left .2s ease;
        }
        .nav-link:hover::after { width: 100%; left: 0; }

        /* ── Hamburger bars ── */
        .bar {
          display: block;
          width: 20px; height: 1.75px;
          background: currentColor;
          border-radius: 2px;
          transition: transform .28s cubic-bezier(.4,0,.2,1),
                      opacity  .28s,
                      width    .28s;
          transform-origin: center;
        }
        .bar-open-1 { transform: translateY(5.75px) rotate(45deg); }
        .bar-open-2 { opacity: 0; width: 0; }
        .bar-open-3 { transform: translateY(-5.75px) rotate(-45deg); }

        /* ── Drawer ── */
        @keyframes drawerIn  { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes drawerOut { from { opacity:1; transform:translateY(0); }    to { opacity:0; transform:translateY(-6px); } }
        .drawer-in  { animation: drawerIn  .32s cubic-bezier(.4,0,.2,1) forwards; }
        .drawer-out { animation: drawerOut .32s cubic-bezier(.4,0,.2,1) forwards; }

        @keyframes itemIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
        .item-in { opacity:0; animation: itemIn .28s cubic-bezier(.4,0,.2,1) forwards; }

        /* Drawer link hover */
        .drawer-link:hover { color: var(--color-primary) !important; opacity: 1 !important; }

        /* ── Toggle pill ── */
        .toggle-pill {
          display: flex;
          align-items: center;
          width: 46px; height: 26px;
          border-radius: 999px;
          padding: 0 3px;
          background: #EDEEF5;
          border: 1.5px solid #DDE0EE;
          transition: background .25s, border-color .25s;
          cursor: pointer;
          flex-shrink: 0;
        }
        :global(html.dark) .toggle-pill {
          background: #1D2538;
          border-color: #252E44;
        }
        .toggle-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: #fff;
          color: #F08700;
          box-shadow: 0 1px 4px rgba(0,0,0,.18);
          transition: transform .28s cubic-bezier(.4,0,.2,1),
                      background .25s,
                      color .25s;
        }
        .thumb-dark {
          transform: translateX(20px);
          background: #F08700;
          color: #fff;
        }
      `}</style>

      <header className="sticky top-0 z-50 font-body">

        {/* ── Bar ── */}
        <div className={[
          "relative transition-all duration-300",
          scrolled
            ? "bg-light/95 dark:bg-dark/95 backdrop-blur-xl shadow-nav dark:shadow-nav-dark"
            : "bg-light dark:bg-dark",
        ].join(" ")}>

          <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto flex items-center justify-between h-16 sm:h-[68px] lg:h-[76px] xl:h-[84px] transition-all duration-300">

            {/* ── Logo: mobile (tap = drawer toggle) ── */}
            <button
              ref={toggleBtnRef}
              onClick={toggleDrawer}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              className="flex lg:hidden items-center gap-3 focus:outline-none"
            >
              <span className="flex flex-col gap-[4.5px] text-ink dark:text-ink-dark" aria-hidden>
                <span className={`bar ${mobileOpen ? "bar-open-1" : ""}`} />
                <span className={`bar ${mobileOpen ? "bar-open-2" : ""}`} />
                <span className={`bar ${mobileOpen ? "bar-open-3" : ""}`} />
              </span>
              <Image
                src="/cwmlogo.png"
                alt="CWM"
                width={40} height={40}
                className="rounded-full"
              />
            </button>

            {/* ── Logo: desktop ── */}
            <Link href="/" className="hidden lg:block focus:outline-none shrink-0">
              <div className="relative w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] xl:w-[56px] xl:h-[56px] transition-all duration-300">
                <Image
                  src="/cwmlogo.png"
                  alt="CWM"
                  fill
                  sizes="(max-width: 1024px) 42px, (max-width: 1280px) 48px, 56px"
                  className="rounded-full object-cover"
                />
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav aria-label="Main" className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6">
              {NAV_ITEMS.map(({ label, path }) => (
                <Link
                  key={path}
                  href={path}
                  className="nav-link
                             font-body text-[14.5px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] font-[400] tracking-[0.012em]
                             px-3 lg:px-4 xl:px-5 py-2 rounded-lg
                             text-ink/60 dark:text-ink-dark/60
                             hover:text-ink dark:hover:text-ink-dark
                             transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-5">

              {/*
                suppressHydrationWarning on the button itself covers the
                aria-label attribute which differs between server (isDark=false)
                and the post-layout-effect client read.
                The pill/thumb use `mounted` to skip the transition class on
                first render so there's no animated jump — it just appears in
                the right position instantly.
              */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                suppressHydrationWarning
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                           focus-visible:ring-offset-2 rounded-full"
              >
                <div className="toggle-pill xl:scale-110 xl:ml-2 origin-center transition-all duration-300">
                  <div
                    className={`toggle-thumb ${mounted && isDark ? "thumb-dark" : ""}`}
                    suppressHydrationWarning
                  >
                    {/* Render nothing until mounted so server & client match */}
                    {mounted ? (isDark ? <MoonIcon /> : <SunIcon />) : <SunIcon />}
                  </div>
                </div>
              </button>

              {/* CTA */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-display text-[13px] lg:text-[14px] xl:text-[15px] font-[600] tracking-[0.03em]
                           px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-xl
                           bg-primary hover:bg-secondary text-white
                           shadow-glow-sm hover:shadow-glow
                           transition-all duration-200 active:scale-[.97]
                           whitespace-nowrap"
              >
                Get a Quote
              </button>
            </div>
          </div>

          {/* Bottom hairline accent */}
          <span className="absolute bottom-0 left-0 right-0 h-px
                           bg-gradient-to-r from-transparent via-primary/20 to-transparent
                           pointer-events-none" />
        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div
            ref={drawerRef}
            className={`lg:hidden absolute top-full left-0 right-0 z-40 overflow-hidden ${isClosing ? "drawer-out" : "drawer-in"}`}
            style={{
              background: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            }}
          >
            <div className="w-[92%] mx-auto py-2 pb-5">
              <ul className="flex flex-col">
                {NAV_ITEMS.map(({ label, path }, i) => (
                  <li
                    key={path}
                    className={isClosing ? "" : "item-in"}
                    style={{ animationDelay: isClosing ? "0ms" : `${i * 40}ms` }}
                  >
                    <Link
                      href={path}
                      onClick={closeDrawer}
                      className="drawer-link flex items-center py-3.5
                                 font-body text-[15px] font-[400] tracking-[0.01em]
                                 transition-colors duration-200"
                      style={{
                        color: "var(--color-ink)",
                        borderBottom: "1px solid var(--color-border)",
                        opacity: 0.75,
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}

                <li
                  className={isClosing ? "" : "item-in"}
                  style={{ animationDelay: isClosing ? "0ms" : `${NAV_ITEMS.length * 40}ms` }}
                >
                  <button
                    onClick={() => { closeDrawer(); setIsModalOpen(true); }}
                    className="w-full mt-4 font-display text-[14px] font-[600] tracking-[0.03em]
                               py-3 rounded-xl text-white
                               transition-all duration-200 active:scale-[.98]"
                    style={{
                      background: "var(--color-primary)",
                      boxShadow: "0 2px 12px rgba(240,135,0,0.30)",
                    }}
                  >
                    Get a Quote
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}