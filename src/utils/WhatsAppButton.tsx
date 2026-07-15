"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const WhatsAppButton = () => {
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      setNearBottom(distanceFromBottom < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      target="_blank"
      href="https://api.whatsapp.com/send/?phone=923319272285&text&type=phone_number&app_absent=0"
      className={`
        fixed left-4 md:left-6 z-50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 drop-shadow-lg hover:drop-shadow-[0_8px_16px_rgba(37,211,102,0.4)]
        ${nearBottom ? "md:bottom-[130px] bottom-[100px]" : "bottom-6"}
      `}
      aria-label="Contact us on WhatsApp"
    >
      <Image
        className="whatsappanim"
        src="/whatsapp.png"
        width={50}
        height={50}
        alt="WhatsApp icon"
      />
    </Link>
  );
};

export default WhatsAppButton;
