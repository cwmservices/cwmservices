"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchProjects = async () => {
    const testimonialsJSON = await fetch(
      "/api/portfolio"
    );
    const testimonialsData = await testimonialsJSON.json();
    setTestimonials(testimonialsData.Testimonials);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section
      className="bg-[#0A0B10] mt-[-10px] duration-300 relative py-20 sm:py-20 lg:py-20 xl:py-20"
    >
      <div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto">
        <div id="testimonials" className="py-14 scroll-mt-24">
          <h1 className="text-center text-3xl lg:text-5xl font-display font-bold text-gray-100">
            What O<span className="border-b pb-3 text-primary border-primary">ur Clie</span>nts Say
          </h1>
          <p className="text-center font-body text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-300">
            Hear from our clients around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 xl:gap-8">
          {testimonials.slice(0, 6).map((Testimonial: any, i: number) => (
            <blockquote
              key={Testimonial.id}
              className="flex flex-col justify-between bg-[#10121A] border border-white/10 rounded-2xl px-6 md:px-7 xl:px-8 py-7 md:py-8 xl:py-9"
            >
              <div className="flex justify-between items-start w-full mb-5">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, idx) => (
                    <AiFillStar key={idx} className="text-primary" size={20} />
                  ))}
                </div>
                <img
                  src={Testimonial.origin}
                  alt="origin"
                  className="h-8 object-contain opacity-90 drop-shadow-sm brightness-110"
                />
              </div>

             <p className="font-body italic text-gray-300 text-[16px] lg:text-[17px] leading-relaxed flex-grow">
  "{Testimonial.testimonial}"
</p>

              <footer className="mt-7 flex items-center gap-3 w-full pt-4">
                <span className="font-display font-semibold text-gray-100 text-[15.5px] flex-grow">
                  {Testimonial.name}
                </span>
                <img
                  src={Testimonial.country}
                  alt="Country flag"
                  className="w-7 h-7 object-cover rounded-full shadow-sm"
                />
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;