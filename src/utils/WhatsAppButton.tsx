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
        fixed left-4 z-50 transition-all duration-300
        ${nearBottom ? "bottom-[9px]" : "bottom-6"}
      `}
    >
      <Image
        className="whatsappanim"
        src="/whatsapp.png"
        width={50}
        height={50}
        alt="whatsapp logo"
      />
    </Link>
  );
};

export default WhatsAppButton;
