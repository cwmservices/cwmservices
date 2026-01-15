"use client";
import { useState,useEffect } from "react";
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
      className={`fixed right-4 bottom-4 p-2 bg-light transition-colors ${
        showButton ? "bg-primary opacity-90 hover:opacity-100" : "hidden"
      }`}
    >
      <FaChevronUp size="20" className="text-white" />
    </button>
  );
};

export default ScrollToTopButton;
