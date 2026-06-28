"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url?: string },
        HTMLElement
      >;
    }
  }
}

function Banner({ onLoad }: { onLoad?: () => void }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src*="spline-viewer"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";
      document.head.appendChild(script);
    }
    const timer = setTimeout(() => setIsVideoLoaded(true), 100);

    // ── Detect when the Spline scene is ready and dismiss the loader ──
    // Safety-net: always resolve after 10 s even if the event never fires.
    const safetyTimer = setTimeout(() => { onLoad?.(); }, 10000);

    const tryAttach = () => {
      const viewers = document.querySelectorAll("spline-viewer");
      viewers.forEach((el) => {
        const handler = () => {
          onLoad?.();
          clearTimeout(safetyTimer);
        };
        el.addEventListener("load", handler, { once: true });
      });
    };

    // Give the custom element a tick to be parsed into the DOM.
    const attachTimer = setTimeout(tryAttach, 200);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      clearTimeout(attachTimer);
    };
  }, [onLoad]);

  return (
    <div className="banner-height relative w-full flex items-center transition-colors duration-300"
      style={{ overflow: "hidden" }}
    >

      <div className="absolute inset-0 bg-[#f0f0ef] dark:bg-[#0C101A] transition-colors duration-300" />
      {/* Top-left glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-10%",
          width: "55%",
          height: "70%",
          background: "radial-gradient(ellipse at top left, #6366f1 0%, transparent 70%)",
          opacity: 0.12,
          zIndex: 1,
        }}
      />

      {/* Bottom-right subtle glow for depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "50%",
          height: "60%",
          background: "radial-gradient(ellipse at bottom right, #8b5cf6 0%, transparent 70%)",
          opacity: 0.07,
          zIndex: 1,
        }}
      />

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto pt-6 pb-0 lg:pt-8 xl:pt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center lg:min-h-[68vh]">

          {/* Left — text */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center pb-6 lg:pb-10"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >

            {/* Eyebrow — magic sparkle + thin label, black/white adaptive */}
            <motion.div
              className="mb-5 inline-flex items-center justify-center lg:justify-start gap-2.5"
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } } }}
            >
              <svg
                width="15" height="15" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z"
                  fill="#EAB308"
                />
              </svg>
              <p className="text-ink dark:text-ink-dark text-sm lg:text-[14px] font-light font-display tracking-[0.18em] uppercase">
                Welcome to CWMServices
              </p>
            </motion.div>

            {/* Headline — "Custom AI Development" on its own line, highlighted */}
            <motion.h1
              className="lg:block hidden text-[32px] sm:text-[40px] lg:text-[44px] xl:text-[54px] text-ink dark:text-ink-dark font-semibold font-display leading-[1.13] tracking-tight mb-5 drop-shadow-sm transition-colors duration-300 max-w-[500px] xl:max-w-[580px]"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary whitespace-nowrap">
                Custom AI Development
              </span>
              <br />
              Services Built for Real{" "}
              Business Impact.
            </motion.h1>

            <motion.h1
              className="lg:hidden block text-[32px] sm:text-[40px] text-ink dark:text-ink-dark font-semibold font-display leading-[1.13] tracking-tight mb-5 drop-shadow-sm transition-colors duration-300"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Custom AI Development
              </span>
              <br />
              Services Built for Real Business Impact.
            </motion.h1>

            <motion.p
              className="text-ink-muted dark:text-ink-dark-muted font-body text-base lg:text-[15px] xl:text-lg max-w-xl mx-auto lg:mx-0 mb-7 lg:mb-8 leading-relaxed transition-colors duration-300"
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } } }}
            >
              We build and deliver AI-powered solutions to automate workflows,
              improve decision-making and scale operations. Inspire your audience
              with flawless, cutting-edge technology.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }}
            >
              <Link
                href="/#projects"
                className="font-display text-[15px] xl:text-[16px] font-[600] tracking-[0.03em]
                           px-8 py-3.5 xl:px-10 xl:py-4 rounded-xl
                           bg-primary hover:bg-secondary text-white
                           shadow-glow-sm hover:shadow-glow
                           transition-all duration-300 active:scale-[.97]
                           w-full sm:w-auto text-center"
              >
                View Our Work
              </Link>
              <Link
                href="/#contact"
                className="font-display text-[15px] xl:text-[16px] font-[600] tracking-[0.03em]
                           px-8 py-3.5 xl:px-10 xl:py-4 rounded-xl
                           bg-surface-muted dark:bg-surface-dark-muted hover:bg-border-light dark:hover:bg-border-dark
                           text-ink dark:text-ink-dark
                           transition-all duration-300 active:scale-[.97]
                           w-full sm:w-auto text-center border border-transparent"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Spline robot */}
          <div className="order-1 lg:order-2 relative visible lg:block overflow-hidden lg:overflow-visible">
            {/* Spacer — shorter on mobile so text sits closer to robot */}
            <div className="lg:hidden" style={{ height: "clamp(200px, 75vw, 280px)" }} />
            <div className="hidden lg:block" style={{ height: "clamp(380px, 75vh, 680px)" }} />

            {/* Mobile robot */}
            <div
              className="lg:hidden"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                height: "clamp(320px, 75vw, 420px)",
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <spline-viewer
                loading-anim-type="none"
                loading="lazy"
                url="https://prod.spline.design/bL1EAIV962hvryEQ/scene.splinecode"
                style={{
                  display: "block",
                  width: "100%",
                  height: "180%",
                  marginTop: "-14%",
                  background: "transparent",
                  pointerEvents: "all",
                } as React.CSSProperties}
              />
              {/* glow mobile */}
              <div
                className="dark:hidden"
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50%",
                  height: "80px",
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="hidden dark:block"
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50%",
                  height: "80px",
                  background: "radial-gradient(ellipse at center, rgba(99,102,241,0.6) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />


            </div>

            {/* Desktop robot — untouched */}
            <div
              className="hidden lg:block"
              style={{
                position: "absolute",
                bottom: "-2px",
                right: "-5%",
                width: "125%",
                height: "clamp(480px, 72vh, 760px)",
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <spline-viewer
                loading-anim-type="none"
                loading="lazy"
                url="https://prod.spline.design/bL1EAIV962hvryEQ/scene.splinecode"
                style={{
                  display: "block",
                  width: "118%",
                  height: "220%",
                  marginLeft: "-9%",
                  marginTop: "-15%",        // ← desktop unchanged
                  background: "transparent",
                  pointerEvents: "all",
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
