"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from "react-icons/ai";
import { FaDotCircle } from "react-icons/fa";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const scrollTestimonials: any = useRef();

  const fetchProjects = async () => {
    const testimonialsJSON = await fetch(
      "https://www.cwmservices.dev/api/portfolio"
    );
    const testimonialsData = await testimonialsJSON.json();
    setTestimonials(testimonialsData.Members);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="dark:bg-gray-800 bg-gray-100 dark:text-gray-100">

    <section
      className="mx-auto relative w-[90%] pt-20"
      id="scrollToTeam"
    >
      <h2 className="md:text-5xl text-3xl pb-2 font-bold tracking-tight text-primary sm:text-5xl text-center">
        Whom<span className="border-b pb-4 px-3">We</span>Work
      </h2>
      <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10">
        Our Aspiring Members
      </p>
      <div className="absolute right-0 md:pt-0 pt-4">
        <button
          onClick={() => scrollTestimonials.current.scrollBy(-340, 0)}
          className="bg-transparent hover:bg-gray-300 border border-gray-400 dark:text-white dark:hover:text-black rounded-full p-4"
        >
          <AiFillCaretLeft size="10" />
        </button>
        <button
          onClick={() => scrollTestimonials.current.scrollBy(340, 0)}
          className="bg-transparent hover:bg-gray-300 border border-gray-400 dark:text-white dark:hover:text-black ml-2 rounded-full p-4"
        >
          <AiFillCaretRight size="10" />
        </button>
      </div>

      <div className="flex lg:flex-nowrap md:mt-14 mt-12 flex-wrap justify-center items-center">
        <div
          ref={scrollTestimonials}
          className="overflow-hidden md:w-auto w-[300px] flex justify-between items-center pb-10 h-full scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {testimonials.map((Member: any) => {
            return (
              <blockquote
                key={Member.id}
                className="flex h-full flex-col relative shadow-lg justify-between w-[300px] md:w-[450px] dark:bg-gray-700 dark:text-gray-200 bg-white pr-6 py-8 m-4"
              >
                <div className="mt-4 flex w-[300px] md:w-[450px] justify-center items-center flex-col">
          {Member.name === "Masood" && (
            <div className="flex justify-center items-center absolute top-4 right-4">
              <p className="pr-2">Founder</p>
              <FaDotCircle />
            </div>
          )}

          <img
            src={Member.img}
            width="70px"
            alt="icon name"
            className="mb-4 rounded-full"
          />
          <h3 className="font-primary font-bold text-lg">{Member.name}</h3>
          <span>
            From
            <span
              className={`pl-1 font-primary font-light ${
                Member.location === "Pakistan"
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {Member.location}
            </span>
          </span>
          <p className="mt-4 text-gray-700 font-primary font-normal">
            {Member.title}
          </p>
        </div>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
    </div>

  );
}

export default Testimonials;
