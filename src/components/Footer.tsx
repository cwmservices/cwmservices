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
    <div className="bg-light dark:bg-gray-800 dark:text-gray-100 border-t dark:border-gray-700">
      <footer className="border-t dark:border-gray-700">
        <div className="w-[90%] max-w-7xl mx-auto py-4 flex flex-col md:flex-row items-center md:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center md:text-left mb-3 md:mb-0">
            © {new Date().getFullYear()} CWMServices. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/cwmservices"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-primary hover:bg-primary hover:text-white transition"
            >
              <AiFillLinkedin size={18} />
            </a>
            <a
              href="https://www.github.com/cwmservices"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-primary hover:bg-primary hover:text-white transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.x.com/cwmservices"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-primary hover:bg-primary hover:text-white transition"
            >
              <FaXTwitter size={18} />
            </a>

            <a
              href="https://www.youtube.com/@CodeWithMasood"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-primary hover:bg-primary hover:text-white transition"
            >
              <AiFillYoutube size={18} />
            </a>
            <a
              href="https://www.discord.com/cwmservices"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-primary hover:bg-primary hover:text-white transition"
            >
              <FaDiscord size={18} />
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      <ScrollToTopButton />
    </div>
  );
}

export default Footer;
