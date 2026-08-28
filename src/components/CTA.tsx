"use client";

import React from "react";
import Link from "next/link";
import { Phone, Check, Clock } from "lucide-react";

const CTA_POINTS = [
  "Free 15-min call",
  "Fixed-price quotes",
  "MVP in 2-4 weeks",
  "30+ apps delivered",
];

function CTA() {
  return (
    <section className="bg-[#0A0B10] pb-20 sm:pb-24 lg:pb-28">
      <div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto">
        <div className="relative rounded-3xl bg-[#10121A] border border-white/10 px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20 text-center overflow-hidden">
          <div className="absolute -inset-x-20 -top-20 h-40 bg-primary/10 blur-3xl pointer-events-none" />

          <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 max-w-2xl mx-auto leading-tight">
            Ready to Build Your App?
          </h2>

          <p className="relative font-body text-[15px] sm:text-[16.5px] lg:text-[18px] text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
            Book a free 15-minute discovery call. Tell us your idea, we&apos;ll tell you exactly how fast and how much.
          </p>

          <div className="relative mt-9 lg:mt-10">
            <Link href="/#contact">
              <button className="inline-flex items-center gap-2.5 font-nav text-[15px] font-semibold tracking-[0.02em] px-8 py-3.5 rounded-full bg-white text-[#0A0B10] hover:opacity-90 transition-opacity duration-200">
                <Phone size={16} strokeWidth={2.5} />
                Book Your Free Discovery Call
              </button>
            </Link>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-9 lg:mt-10">
            {CTA_POINTS.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 font-body text-[13.5px] sm:text-[14.5px] text-gray-300"
              >
                <Check size={15} className="text-primary shrink-0" strokeWidth={2.5} />
                {point}
              </span>
            ))}
          </div>

          <div className="relative mt-7 lg:mt-8">
            <span className="inline-flex items-center gap-2 font-body text-[13px] sm:text-[13.5px] text-gray-300 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Clock size={14} className="text-primary" />
              Limited spots available this month
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;