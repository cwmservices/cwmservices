"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface PageLoaderProps {
  isLoading: boolean;
}

export default function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <>
      {isLoading && (
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            overflow: hidden !important;
          }
        ` }} />
      )}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="page-loader"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 99999, background: "#0C101A" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* ── Warm amber radial glow centred behind logo ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(240,135,0,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Content column ── */}
          <div className="relative flex flex-col items-center gap-8">

            {/* ── Logo + spinning rings ── */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: 132, height: 132 }}
            >
              {/* Outer ring — spins clockwise */}
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2.5px solid transparent",
                  borderTopColor: "#F08700",
                  borderRightColor: "rgba(240,135,0,0.25)",
                  boxShadow: "0 0 14px rgba(240,135,0,0.35)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />

              {/* Middle ring — counter-clockwise, offset */}
              <motion.span
                style={{
                  position: "absolute",
                  inset: 14,
                  borderRadius: "50%",
                  border: "2px solid transparent",
                  borderBottomColor: "#F5A623",
                  borderLeftColor: "rgba(245,166,35,0.3)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner ring — fast, clockwise */}
              <motion.span
                style={{
                  position: "absolute",
                  inset: 26,
                  borderRadius: "50%",
                  border: "1.5px solid transparent",
                  borderTopColor: "rgba(240,135,0,0.6)",
                  borderRightColor: "rgba(240,135,0,0.15)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }}
              />

              {/* CWM logo — subtle pulse */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 20px rgba(240,135,0,0.25)",
                }}
              >
                <Image
                  src="/cwmlogo.png"
                  alt="CWM"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* ── Brand name ── */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 200,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontFamily: "var(--font-outfit), sans-serif",
              }}
            >
              CWM<span style={{ color: "#F08700" }}>Services</span>
            </motion.p>

            {/* ── Bouncing dots ── */}
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                width: "100%",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{
                    display: "block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#F08700",
                    flexShrink: 0,
                  }}
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
