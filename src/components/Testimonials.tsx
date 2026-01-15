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
    <div className="dark:bg-gray-800 bg-gray-100 py-24">
      <section className="mx-auto relative w-[90%] pt-8" id="scrollToTestimonials">
        <h2 className="md:text-4xl text-3xl pb-2 font-bold tracking-tight text-primary sm:text-5xl text-center">
          What O<span className="border-b pb-4 border-orange-400">ur Clie</span>nts Say
        </h2>
        <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-600 dark:text-gray-300">
          Hear from our clients around the world
        </p>

       

        <div className="flex relative lg:flex-nowrap md:mt-14 mt-12 flex-wrap justify-center items-center">
           <div className="absolute md:flex hidden right-0 -top-20 flex-row gap-2 z-40">
          <button
            onClick={() => scrollTestimonials.current.scrollBy({ left: -340, behavior: "smooth" })}
            className="bg-white dark:bg-gray-700 dark:text-white hover:scale-110 transition-transform duration-300 shadow-lg rounded-full p-4 flex items-center justify-center"
          >
            <AiFillCaretLeft size={20} className="dark:text-white text-orange-500" />
          </button>
          <button
            onClick={() => scrollTestimonials.current.scrollBy({ left: 340, behavior: "smooth" })}
            className="bg-white dark:bg-gray-700 hover:scale-110 transition-transform duration-300 shadow-lg rounded-full p-4 flex items-center justify-center"
          >
            <AiFillCaretRight size={20} className="dark:text-white text-orange-500" />
          </button>
        </div>
          <div
            ref={scrollTestimonials}
            className="flex overflow-x-auto items-center scrollbar-hide gap-6 pb-10 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }} 
          >
            {testimonials.map((Testimonial: any) => (
           <blockquote
  key={Testimonial.id}
  className="flex-none ml-4 snap-start items-center flex flex-col justify-between w-[300px] md:w-[400px] lg:w-[450px] bg-white dark:bg-gray-700 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300 px-6 py-10 relative mt-4 h-fit"
>
  <div className="flex justify-center items-center absolute top-4 right-4 opacity-80">
    <img
      src={Testimonial.origin}
      alt="origin"
      className="w-[50px] md:w-[70px] object-contain md:h-[30px]"
    />
  </div>

  <div className="flex gap-1 mb-4 mt-2">
    {[...Array(5)].map((_, i) => (
      <AiFillStar key={i} className="text-orange-400" size={20} />
    ))}
  </div>

  <p className="text-gray-700 dark:text-gray-200 break-words whitespace-normal text-base md:text-lg leading-relaxed mt-2">
    "{Testimonial.testimonial}"
  </p>

  <footer className="mt-6 flex items-center gap-2">
    <span className="font-semibold text-gray-800 dark:text-gray-100">
      &mdash; {Testimonial.name}
    </span>
    <img
      src={Testimonial.country}
      alt="Country flag"
      className="w-6 h-6 object-contain rounded-full"
    />
  </footer>
</blockquote>

            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
