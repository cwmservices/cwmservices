"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MessageModal from "../utils/MessageBox";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const mobileNavbar = useRef<HTMLUListElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleNavbar = () => {
    if (navbar) {
      setIsClosing(true);
      setTimeout(() => {
        setNavbar(false);
        setIsClosing(false);
      }, 300);
    } else {
      setNavbar(true);
    }
  };

  const closeNavbar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNavbar(false);
      setIsClosing(false);
    }, 300);
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
        closeNavbar();
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

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/all-services" },
    { label: "Projects", path: "/projects" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Team", path: "/team" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky z-50 top-0">
      <div className="bg-gray-100/95 backdrop-blur-md dark:bg-[#1E293B]/95 shadow-lg relative">
        <div className="w-[90%] mx-auto flex justify-between items-center py-3">
         <div className="flex items-center" ref={toggleButtonRef}>
  <button 
    onClick={toggleNavbar}
    className="lg:hidden"
  >
    <Image
      src="/cwmlogo.png"
      alt="logo"
      width={55}
      height={55}
      className="rounded-full cursor-pointer"
    />
  </button>
  
  <Link href="/" className="hidden lg:block">
    <Image
      src="/cwmlogo.png"
      alt="logo"
      width={55}
      height={55}
      className="rounded-full cursor-pointer"
    />
  </Link>
</div>

          <nav className="hidden lg:flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
              >
                {item.label}
              </Link>
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
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-100 to-transparent dark:from-[#1E293B] dark:to-transparent opacity-90 blur-sm pointer-events-none"></div>
      </div>

      {navbar && (
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-gray-200/95 backdrop-blur-md dark:bg-gray-800/95 shadow-md z-50 overflow-hidden ${
            isClosing ? 'animate-slideUp' : 'animate-slideDown'
          }`}
        >
          <div className="w-[90%] mx-auto">
            <ul ref={mobileNavbar} className="flex flex-col">
              {navItems.map((item, index) => (
                <li 
                  key={item.path} 
                  onClick={closeNavbar}
                  className={`${isClosing ? '' : 'animate-fadeIn'}`}
                  style={{ 
                    animationDelay: isClosing ? '0ms' : `${index * 50}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <Link
                    href={item.path}
                    className="block py-3 text-gray-700 dark:text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 500px;
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            max-height: 500px;
            opacity: 1;
          }
          to {
            max-height: 0;
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}

export default Header;