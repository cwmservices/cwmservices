"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

// updated

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center py-20 lg:py-24">
        <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto flex flex-col items-center">

          {/* Profile Image with subtle premium glow */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-8 ring-4 ring-primary/20 hover:ring-primary/40 dark:ring-primary/10 dark:hover:ring-primary/30 transition-all duration-500 shadow-nav dark:shadow-nav-dark">
            <Image
              src="/masood2.png"
              alt="Masood Ur Rehman"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority
              sizes="(max-width: 768px) 160px, 192px"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-ink dark:text-ink-dark drop-shadow-sm transition-colors duration-300">
            Masood Ur Rehman
          </h1>

          <p className="mt-4 text-primary text-sm sm:text-base md:text-lg font-bold font-display tracking-[0.15em] uppercase">
            Founder of Cwmservices
          </p>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent my-10 relative"></div>

          {/* Structured Text Content using Brand Fonts */}
          <article className="max-w-4xl text-ink-muted dark:text-ink-dark-muted font-body text-[15px] sm:text-base md:text-[17px] lg:text-lg leading-relaxed text-center space-y-6 transition-colors duration-300">
            <p>
              I began my journey as a full-stack developer, building end-to-end applications for individuals and working on hobby projects. Over time, this path naturally evolved
              into successful freelancing and then founding my own agency, where I focus on delivering reliable,
              modern digital solutions for real businesses. Today, I work across
              backend and frontend development, helping clients turn ideas into
              scalable applications.
            </p>
            <p>
              Alongside client work, I actively create
              educational content on YouTube and write technical articles, sharing
              practical knowledge and documenting my growth in the tech space.
            </p>
            <p>
              As a founder, I care deeply about clean engineering, long-term impact, and
              continuous learning. I’m currently exploring AI and agentic
              development, with a strong interest in how intelligent systems can
              improve workflows and digital products.
            </p>
            <p className="font-semibold text-ink dark:text-ink-dark text-lg pt-4">
              ~ Driven by curiosity. Focused on quality. Building with purpose.
            </p>
          </article>

          {/* Social Links Styled with Theme Variables */}
          <div className="mt-14 flex items-center justify-center gap-4 sm:gap-6">
            <Link href="#" className="p-3.5 rounded-full bg-surface-muted dark:bg-surface-dark-muted text-ink/70 dark:text-ink-dark/70 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-[#121826] hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
              <Github size={22} />
            </Link>
            <Link href="#" className="p-3.5 rounded-full bg-surface-muted dark:bg-surface-dark-muted text-ink/70 dark:text-ink-dark/70 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-[#121826] hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
              <Linkedin size={22} />
            </Link>
            <Link href="#" className="p-3.5 rounded-full bg-surface-muted dark:bg-surface-dark-muted text-ink/70 dark:text-ink-dark/70 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-[#121826] hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
              <Twitter size={22} />
            </Link>
            <Link href="#" className="p-3.5 rounded-full bg-surface-muted dark:bg-surface-dark-muted text-ink/70 dark:text-ink-dark/70 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-[#121826] hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
              <Globe size={22} />
            </Link>
            <Link href="#" className="p-3.5 rounded-full bg-surface-muted dark:bg-surface-dark-muted text-ink/70 dark:text-ink-dark/70 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-[#121826] hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
              <Mail size={22} />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
