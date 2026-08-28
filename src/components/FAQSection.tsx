"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "How fast can you actually deliver an MVP?",
    answer:
      "Most MVPs ship in 2-4 weeks depending on scope. We scope tightly upfront so you get a working, testable product fast — not a half-built prototype.",
  },
  {
    question: "What technologies do you build with?",
    answer:
      "React, Next.js, Flutter, Node.js, and Laravel form our core stack, alongside Firebase, Supabase, and Stripe for auth, data, and payments.",
  },
  {
    question: "Do you provide a fixed price or charge hourly?",
    answer:
      "We scope the project first and give you a fixed price wherever possible, so there are no surprises. Hourly is available for ongoing or open-ended work.",
  },
  {
    question: "Will I own the source code?",
    answer:
      "Yes. Once the project is delivered and paid for, full ownership of the source code and IP transfers to you.",
  },
  {
    question: "How do you keep me updated during development?",
    answer:
      "You get regular check-ins, a shared project board, and direct access to the team — no waiting weeks for an update.",
  },
  {
    question: "What if I already have a design — can you just build it?",
    answer:
      "Absolutely. Send over your Figma or design files and we'll build directly from them, pixel by pixel.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, every project includes a post-launch support window, and ongoing maintenance plans are available after that.",
  },
  {
    question: "Can you work with my existing development team?",
    answer:
      "Definitely. We regularly plug into existing teams to help ship features faster or take specific modules off their plate.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  const indexed = FAQS.map((f, i) => ({ ...f, i }));
  const leftColumn = indexed.filter((f) => f.i % 2 === 0);
  const rightColumn = indexed.filter((f) => f.i % 2 === 1);

  const renderItem = (faq: (typeof indexed)[number]) => (
    <div
      key={faq.question}
      className="bg-[#10121A] border border-white/10 rounded-2xl overflow-hidden transition-colors duration-200 hover:border-primary/40"
    >
      <button
        onClick={() => toggle(faq.i)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
      >
        <span className="font-nav text-[14px] sm:text-[15px] font-semibold text-gray-100">
          {faq.question}
        </span>
        <span className="shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-gray-400">
          {openIndex === faq.i ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      {openIndex === faq.i && (
        <p className="font-body text-[13.5px] sm:text-[14.5px] text-gray-400 leading-relaxed px-5 sm:px-6 pb-5">
          {faq.answer}
        </p>
      )}
    </div>
  );

  return (
    <section id="faq" className="bg-[#0A0B10] py-20 sm:py-24 lg:py-28 relative">
      <div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto">
        <div className="mb-14 lg:mb-16">
          <h2 className="text-center text-3xl lg:text-5xl font-bold text-gray-100 font-display">
            Questions We Get <span className="border-b pb-3 text-primary border-primary">Asked O</span>ften
          </h2>
          <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-300 font-body max-w-2xl mx-auto">
            Can&apos;t find an answer?{" "}
            <Link href="/#contact" className="text-primary hover:opacity-80 transition-opacity duration-200">
              Book a free call
            </Link>{" "}
            and we&apos;ll answer anything.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="flex flex-col gap-4 sm:gap-5">{leftColumn.map(renderItem)}</div>
          <div className="flex flex-col gap-4 sm:gap-5">{rightColumn.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;