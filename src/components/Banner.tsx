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
    <div className="hero p-0 m-0 w-full relative dark:bg-gray-800 bg-primary">
   <video
  autoPlay
  loop
  muted
  playsInline
  onLoadedData={handleVideoLoad}
  className={`inset-0 w-full h-[550px] object-cover transition-opacity duration-700 ease-in ${
    isVideoLoaded ? "opacity-100 visible" : "opacity-0 invisible"
  } pointer-events-none`}
>
  <source src="/video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

<div className="bg-primary dark:bg-gray-800 absolute top-0 left-0 w-full h-[550px] opacity-75 pointer-events-none"></div>

    <div
  style={{ maxWidth: "90%" }}
  className="hero-content flex-col lg:flex-row-reverse relative z-10"
>
  <div className="relative md:w-[550px] w-[300px] flex-shrink-0 h-[550px] md:h-[550px]">
    <Image
      src="/banner6.png"
      alt="banner image"
      fill
      className="object-contain"
      priority
    />
  </div>

  <div>
    <p className="py-6 text-white lg:text-xl font-semibold font-primary">
      <span className="border-b pb-9 md:pb-3">CRAFTING DIGIT</span>AL
      EXPERIENCES THAT INSPIRE
    </p>
    <h1 className="xl:w-[600px] xl:text-7xl text-3xl leading-[2.35rem] text-[2.199rem] text-white font-bold font-primary">
      Elevate Your Vision with Our Web and Mobile App Expertise.
    </h1>
  </div>
</div>

    </div>
  );
}

export default Banner;
