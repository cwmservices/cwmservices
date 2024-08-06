import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className="hero w-full relative">
      <video
        autoPlay
        loop
        muted
        className="inset-0 w-full h-[550px] object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="bg-primary absolute top-0 left-0 w-full opacity-[0.75] h-[550px]"></div>

      <div
        style={{ maxWidth: "90%" }}
        className="hero-content flex-col lg:flex-row-reverse"
      >
        <Image
          src="/banner6.png"
          alt="banner image"
          className="md:w-[550px] w-[300px]"
          width={550}
          height={550}
        />

        <div>
          <p className="py-6 text-white lg:text-xl font-semibold font-primary">
            <span className="border-b pb-7 md:pb-3">CRAFTING DIGIT</span>AL
            EXPERIENCES THAT INSPIRE
          </p>
          <h1 className="xl:w-[600px] xl:text-7xl text-4xl text-white font-bold font-primary">
            Elevate Your Vision with Our Web and Mobile App Expertise.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Banner;
