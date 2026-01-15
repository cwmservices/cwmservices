"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MessageModal from "../utils/MessageBox";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const mobileNavbar = useRef<HTMLUListElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDark, setIsDark] = useState(false);

  const handleMenuItemClick = (sectionId: string) => {
    document?.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setNavbar(false);
  };

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbar &&
        mobileNavbar.current &&
        !mobileNavbar.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navbar]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  return (
    <header className="bg-gray-100 sticky z-50 top-0 dark:bg-gray-800 shadow-md">
      <div className="w-[90%] mx-auto flex justify-between items-center py-3">
        <div className="flex items-center" ref={toggleButtonRef}>
          <Image
            src="/cwmlogo.png"
            alt="logo"
            width={55}
            height={55}
            className="rounded-full dark:hidden cursor-pointer"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setNavbar(!navbar);
              } else {
                handleMenuItemClick("scrollToHome");
              }
            }}
          />
          <Image
            src="/cwmlogo.png"
            alt="logo"
            width={55}
            height={55}
            className="rounded-full hidden dark:block cursor-pointer"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setNavbar(!navbar);
              } else {
                handleMenuItemClick("scrollToHome");
              }
            }}
          />
        </div>

        <nav className="hidden lg:flex gap-4">
          {[
            { label: "Home", id: "scrollToHome" },
            { label: "Services", id: "scrollToServices" },
            { label: "Projects", id: "scrollToProjects" },
            { label: "Testimonials", id: "scrollToTestimonials" },
            { label: "Team", id: "scrollToTeam" },
            { label: "Contact", id: "scrollToContact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="px-4 py-2 rounded-lg dark:hover:bg-gray-700 hover:text-black text-gray-700 dark:text-white transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const html = document.documentElement;
              html.classList.toggle("dark");
              setIsDark(html.classList.contains("dark"));
            }}
            className="w-8 h-8 mr-2 rounded-full bg-gray-600 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition flex items-center justify-center"
          >
            <span className="sr-only">Toggle Dark Mode</span>
            {isDark ? "🌙" : "☀️"}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-dark hover:bg-gray-900 duration-200 dark:hover:bg-white text-white dark:bg-gray-200 dark:text-dark"
          >
            Get A Quote
          </button>
        </div>

        {navbar && (
          <div className="absolute top-full left-0 w-full bg-gray-200 dark:bg-gray-800 shadow-md z-50">
            <div className="w-[90%] mx-auto">
              <ul ref={mobileNavbar} className="flex flex-col">
                {[
                  { label: "Home", id: "scrollToHome" },
                  { label: "Services", id: "scrollToServices" },
                  { label: "Projects", id: "scrollToProjects" },
                  { label: "Testimonials", id: "scrollToTestimonials" },
                  { label: "Team", id: "scrollToTeam" },
                  { label: "Contact", id: "scrollToContact" },
                ].map((item) => (
                  <li key={item.id} onClick={() => handleMenuItemClick(item.id)}>
                    <a className="block py-3 hover:text-black text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

export default Header;
