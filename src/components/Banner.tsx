import React, { useState, useEffect } from "react";
import Image from "next/image";

function Banner() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero p-0 m-0 w-full relative dark:bg-gray-800 bg-primary lg:min-h-[92vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in ${
          isVideoLoaded ? "opacity-100 visible" : "opacity-0 invisible"
        } pointer-events-none`}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-primary dark:bg-gray-800 absolute top-0 left-0 w-full h-full opacity-75 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-12 items-center lg:min-h-[80vh]">
          
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-white text-sm sm:text-xl lg:text-xl font-semibold font-primary mb-6">
              <span className="border-b-2 border-white pb-2">CRAFTING DIGIT</span>AL
              EXPERIENCES THAT INSPIRE
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold font-primary leading-tight">
              Elevate Your Vision with Our Awesome AI Powered Web and Mobile App Expertise.
            </h1>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] aspect-square">
              <Image
                src="/banner6.png"
                alt="banner image"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Banner;