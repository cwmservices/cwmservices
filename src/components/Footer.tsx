'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import WhatsAppButton from "../utils/WhatsAppButton";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
];

const SERVICE_LINKS = [
  { label: "Custom Web Development", href: "/#services" },
  { label: "AI Systems Development", href: "/#services" },
  { label: "SaaS & Product Development", href: "/#services" },
  { label: "Consultation", href: "/#services" },
];

const CONTACT_LINKS = [
  { label: "+92 3319272285", href: "tel:+923319272285" },
  { label: "masood@cwmservices.dev", href: "mailto:masood@cwmservices.dev" },
  { label: "Book a Free Call", href: "/#contact" },
];

const SOCIALS = [
  { icon: AiFillLinkedin, href: "https://www.linkedin.com/in/cwmservices" },
  { icon: FaGithub, href: "https://www.github.com/cwmservices" },
  { icon: FaXTwitter, href: "https://www.x.com/cwmservices" },
  { icon: AiFillYoutube, href: "https://www.youtube.com/@CodeWithMasood" },
  { icon: FaDiscord, href: "https://www.discord.com/cwmservices" },
];

function Footer() {
  return (
    <>
      <footer className="bg-[#0A0B10] transition-colors duration-300 border-t border-gray-800 border-0.5 dark:border-border-dark relative z-30">
        {/* ── Upper section: logo left, menu columns right ── */}
        <div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-16">
            {/* Logo + description */}
            <div className="flex flex-col gap-4 max-w-xs">
              <Link href="/" className="flex items-center gap-2.5">
                <Image src="/cwmlogo.png" alt="CWM" width={32} height={32} className="rounded-full" />
                <span className="font-display font-bold text-lg text-gray-100">CWMServices</span>
              </Link>
              <p className="font-body text-[13.5px] leading-relaxed text-gray-400">
                We build fast, scalable web and mobile apps for startups and product teams — from MVP to production.
              </p>
            </div>

            {/* Menu columns group */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
              {/* Company */}
              <div>
                <h4 className="font-nav text-[12.5px] font-semibold uppercase tracking-[0.08em] text-gray-500 mb-4">
                  Company
                </h4>
                <ul className="flex flex-col gap-3">
                  {COMPANY_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-[14px] text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-nav text-[12.5px] font-semibold uppercase tracking-[0.08em] text-gray-500 mb-4">
                  Services
                </h4>
                <ul className="flex flex-col gap-3">
                  {SERVICE_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-[14px] text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get in touch */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-nav text-[12.5px] font-semibold uppercase tracking-[0.08em] text-gray-500 mb-4">
                  Get In Touch
                </h4>
                <ul className="flex flex-col gap-3 mb-5">
                  {CONTACT_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-[14px] text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {SOCIALS.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar — privacy links + copyright only ── */}
        <div className="border-t border-[0.5px] border-white/5">
          <motion.div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center justify-center gap-5 order-2 md:order-1">
              <Link
                href="/privacy-policy"
                className="font-body text-sm sm:text-[15px] text-gray-200 dark:text-ink-dark-muted opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="font-body text-sm sm:text-[15px] text-gray-200 dark:text-ink-dark-muted opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                Terms & Conditions
              </Link>
            </div>

            <p className="font-body text-sm sm:text-[15px] text-gray-400 dark:text-ink-dark-muted text-center md:text-right order-1 md:order-2">
              © 2026 CWMServices. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

export default Footer;