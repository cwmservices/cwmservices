import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => setIsVideoLoaded(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-light dark:bg-dark lg:min-h-[90vh] flex items-center transition-colors duration-300">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Advanced Theme Overlay */}
      <div className="absolute inset-0 bg-light/90 dark:bg-dark/90 backdrop-blur-[2px] pointer-events-none transition-colors duration-500"></div>

      {/* Subtle Gradient Accent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-light/95 via-light/80 to-transparent dark:from-dark/95 dark:via-dark/80 dark:to-transparent pointer-events-none"></div>

      {/* Main Content Container matching Header max-width */}
      <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto pt-6 pb-14 lg:pt-10 lg:pb-6 xl:pt-14 xl:pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center lg:min-h-[85vh]">

          {/* Left Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center justify-center lg:justify-start gap-3">
              <span className="h-[2px] w-8 lg:w-12 bg-primary self-center rounded-full"></span>
              <p className="text-primary text-sm sm:text-base lg:text-lg font-bold font-display tracking-[0.15em] uppercase">
                CRAFTING Digital Experiences
              </p>
            </div>

            <h1 className="lg:block hidden text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] text-ink dark:text-ink-dark font-bold font-display leading-[1.1] tracking-tight mb-6 lg:mb-8 drop-shadow-sm transition-colors duration-300">
              Elevate Your Vision with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Powered</span> App Expertise.
            </h1>

            <h1 className="lg:hidden block text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] text-ink dark:text-ink-dark font-bold font-display leading-[1.1] tracking-tight mb-6 lg:mb-8 drop-shadow-sm transition-colors duration-300">
              Elevate Your Vision with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Powered</span> App Expertise.
            </h1>

            <p className="text-ink-muted dark:text-ink-dark-muted font-body text-base lg:text-lg xl:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 lg:mb-10 leading-relaxed transition-colors duration-300">
              We craft modern websites and robust mobile applications tailored to your business needs.
              Inspire your audience with flawless, cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/#projects"
                className="font-display text-[15px] xl:text-[16px] font-[600] tracking-[0.03em]
                           px-8 py-3.5 xl:px-10 xl:py-4 rounded-xl
                           bg-primary hover:bg-secondary text-white
                           shadow-glow-sm hover:shadow-glow
                           transition-all duration-300 active:scale-[.97]
                           w-full sm:w-auto text-center"
              >
                View Our Work
              </Link>
              <Link
                href="/#contact"
                className="font-display text-[15px] xl:text-[16px] font-[600] tracking-[0.03em]
                           px-8 py-3.5 xl:px-10 xl:py-4 rounded-xl
                           bg-surface-muted dark:bg-surface-dark-muted hover:bg-border-light dark:hover:bg-border-dark
                           text-ink dark:text-ink-dark
                           transition-all duration-300 active:scale-[.97]
                           w-full sm:w-auto text-center border border-transparent"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-[85%] max-w-[380px] sm:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] aspect-square group">
              {/* Decorative Glow Behind Image */}
              <div className="absolute inset-4 rounded-full bg-primary/20 blur-[60px] lg:blur-[80px] group-hover:bg-primary/30 transition-all duration-700"></div>

              <Image
                src="/banner6.png"
                alt="Awesome AI Powered Apps"
                fill
                className="object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700 ease-out relative z-10"
                priority
                sizes="(max-width: 1024px) 85vw, 650px"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Banner;
