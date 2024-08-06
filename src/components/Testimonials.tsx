"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from "react-icons/ai";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const scrollTestimonials: any = useRef();

  const fetchProjects = async () => {
    const testimonialsJSON = await fetch(
      "https://cwmservices.vercel.app/api/portfolio"
    );
    const testimonialsData = await testimonialsJSON.json();
    setTestimonials(testimonialsData.Testimonials);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section
      className="mx-auto relative w-[90%] pt-20"
      id="scrollToTestimonials"
    >
      <h2 className="md:text-4xl text-3xl pb-2 font-bold tracking-tight text-primary sm:text-5xl text-center">
        What O<span className="border-b pb-4">ur Clie</span>nts Say
      </h2>
      <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10">
        Our Testimonials
      </p>
      <div className="absolute right-0 md:pt-0 pt-4">
        <button
          onClick={() => scrollTestimonials.current.scrollBy(-340, 0)}
          className="bg-transparent hover:bg-gray-300 border border-gray-400 rounded-full p-4"
        >
          <AiFillCaretLeft color="black" size="10" />
        </button>
        <button
          onClick={() => scrollTestimonials.current.scrollBy(340, 0)}
          className="bg-transparent hover:bg-gray-300 border border-gray-400 ml-2 rounded-full p-4"
        >
          <AiFillCaretRight color="black" size="10" />
        </button>
      </div>

      <div className="flex lg:flex-nowrap md:mt-14 mt-8 flex-wrap justify-center items-center">
        <div
          ref={scrollTestimonials}
          className="overflow-hidden md:w-auto w-[300px] flex justify-between items-center pb-10 h-full scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {testimonials.map((Testimonial: any) => {
            return (
              <blockquote
                key={Testimonial.id}
                className="flex h-full flex-col shadow-lg justify-between w-[300px] md:w-[450px] bg-white px-6 py-8 m-4"
              >
                <div>
                  <div className="flex">
                    <span className="flex gap-0.5 mr-1 w-8 bg-orange-400 text-white p-2">
                      <AiFillStar />
                    </span>
                    <span className="flex gap-0.5 mr-1 w-8 bg-orange-400 text-white p-2">
                      <AiFillStar />
                    </span>
                    <span className="flex gap-0.5 mr-1 w-8 bg-orange-400 text-white p-2">
                      <AiFillStar />
                    </span>
                    <span className="flex gap-0.5 mr-1 w-8 bg-orange-400 text-white p-2">
                      <AiFillStar />
                    </span>
                    <span className="flex gap-0.5 mr-1 w-8 bg-orange-400 text-white p-2">
                      <AiFillStar />
                    </span>
                  </div>

                  <div className="mt-4">
                    <p
                      className="mt-4 w-[300px] md:w-[450px] text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: Testimonial.testimonial,
                      }}
                    ></p>
                  </div>
                </div>

                <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                  &mdash; {Testimonial.name}
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
