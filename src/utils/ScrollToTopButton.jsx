"use client";
import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (typeof window !== "undefined" && window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed right-4 bottom-4 md:right-3 md:bottom-4 z-50 p-2.5 sm:p-2.5 rounded-full bg-primary text-white shadow-[0_4px_10px_rgba(240,135,0,0.3)] hover:shadow-[0_8px_18px_rgba(240,135,0,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
    >
      <FaChevronUp size="16" />
    </button>
  );
};

export default ScrollToTopButton;
