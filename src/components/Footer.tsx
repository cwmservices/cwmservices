import React from "react";
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

function Footer() {
  return (
    <>
      <footer className="bg-light dark:bg-dark transition-colors duration-300 border-t border-border-light dark:border-border-dark relative z-30">
        <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink dark:text-ink-dark">
              CWM<span className="text-primary">Services</span>.
            </span>
            <p className="font-body text-sm sm:text-[15px] text-ink-muted dark:text-ink-dark-muted text-center md:text-left">
              © {new Date().getFullYear()} CWMServices. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
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
                className="p-3 rounded-full bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark text-ink-muted dark:text-ink-dark-muted hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-sm ring-1 ring-transparent hover:ring-primary/30"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

export default Footer;
