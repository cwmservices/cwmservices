"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from "react-icons/ai";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const scrollTestimonials: any = useRef();

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
    <>
      <style jsx>{`
        /* Hide scrollbar for standard webkit */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <section
        className="bg-[#0A0B10] mt-[-10px] duration-300 relative py-20 sm:py-20 lg:py-20 xl:py-20"
      >
        <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">
          <div id="testimonials" className="py-14 relative scroll-mt-24">
            <h1 className="text-center text-3xl lg:text-5xl font-display font-bold text-gray-100">
              What O<span className="border-b pb-3 text-primary border-primary">ur Clie</span>nts Say
            </h1>
            <p className="text-center font-body text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-300">
              Hear from our clients around the world
            </p>

            {/* Navigation buttons */}
            <div className="hidden md:flex absolute right-0 bottom-0 flex-row gap-3 z-40">
              <button
                onClick={() => scrollTestimonials.current.scrollBy({ left: -360, behavior: "smooth" })}
                className="bg-[#10121A] border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300 rounded-full p-3 flex items-center justify-center group"
              >
                <AiFillCaretLeft size={20} className="transition-colors group-hover:text-primary" />
              </button>
              <button
                onClick={() => scrollTestimonials.current.scrollBy({ left: 360, behavior: "smooth" })}
                className="bg-[#10121A] border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300 rounded-full p-3 flex items-center justify-center group"
              >
                <AiFillCaretRight size={20} className="transition-colors group-hover:text-primary" />
              </button>
            </div>
          </div>

          <div className="flex relative lg:flex-nowrap flex-wrap justify-center items-center w-full">
            <div
              ref={scrollTestimonials}
              className="flex overflow-x-auto w-full items-stretch no-scrollbar gap-5 lg:gap-6 pb-12 pt-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: "none" }}
            >
              {testimonials.map((Testimonial: any, i: number) => (
                <blockquote
                  key={Testimonial.id}
                  className="flex-none snap-center sm:snap-start items-start flex flex-col justify-between w-[85vw] sm:w-[340px] md:w-[400px] lg:w-[420px] bg-[#10121A] border border-white/10 rounded-2xl cursor-pointer px-6 md:px-8 py-8 md:py-10 relative h-auto"
                >
                  <div className="flex justify-between items-start w-full mb-6">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, idx) => (
                        <AiFillStar key={idx} className="text-primary" size={22} />
                      ))}
                    </div>
                    <img
                      src={Testimonial.origin}
                      alt="origin"
                      className="h-8 object-contain opacity-90 drop-shadow-sm brightness-110"
                    />
                  </div>

                  <p className="font-body text-gray-400 text-[14.5px] sm:text-[15px] lg:text-[15.5px] leading-relaxed flex-grow">
                    "{Testimonial.testimonial}"
                  </p>

                  <footer className="mt-8 flex items-center gap-3 w-full pt-5">
                    <span className="font-display font-semibold text-gray-100 flex-grow">
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
        </div>
      </section>
    </>
  );
}

export default Testimonials;