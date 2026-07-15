'use client'
import React from "react";
import { motion } from "framer-motion";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import {
  AiFillLinkedin,
  AiFillPhone,
  AiFillSkype,
  AiFillYoutube,
  AiOutlineMail,
} from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import WhatsAppButton from "../utils/WhatsAppButton";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className="bg-[#0A0B10] transition-colors duration-300 border-t border-gray-800 border-0.5 dark:border-border-dark relative z-30">
        <motion.div
          className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto py-8 sm:py-10 grid grid-cols-1 md:grid-cols-3 items-center gap-6"

        >

          {/* Privacy links — left */}
          <div className="flex items-center justify-center md:justify-start gap-5 order-2 md:order-1">
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

          {/* Social Links — center */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 order-1 md:order-2">
            {[
              { icon: AiFillLinkedin, href: "https://www.linkedin.com/in/cwmservices" },
              { icon: FaGithub, href: "https://www.github.com/cwmservices" },
              { icon: FaXTwitter, href: "https://www.x.com/cwmservices" },
              { icon: AiFillYoutube, href: "https://www.youtube.com/@CodeWithMasood" },
              { icon: FaDiscord, href: "https://www.discord.com/cwmservices" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-200 dark:text-ink-dark-muted opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright — right */}
          <p className="font-body text-sm sm:text-[15px] text-gray-400 dark:text-ink-dark-muted text-center md:text-right order-3">
            © 2026 CWMServices. All rights reserved.
          </p>
        </motion.div>
      </footer >

      {/* Floating Action Buttons */}
      < WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

export default Footer;