"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FaDotCircle } from "react-icons/fa";

function Members() {
  const [members, setMembers] = useState([]);
  const scrollMembers: any = useRef();

  const fetchMembers = async () => {
    const membersJSON = await fetch("http://localhost:3000/api/portfolio");
    const membersData = await membersJSON.json();
    setMembers(membersData.Members);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="dark:bg-gray-800 bg-gray-100 py-16">
      <section className="mx-auto relative w-[90%]" id="scrollToTeam">
        <h2 className="md:text-5xl text-3xl pb-2 font-bold tracking-tight text-primary sm:text-5xl text-center">
          Whom<span className="border-b pb-4 px-3 border-orange-400">We</span> Work
        </h2>
        <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-600 dark:text-gray-300">
          Our Aspiring Members
        </p>


        <div className="flex relative lg:flex-nowrap md:mt-14 mt-12 flex-wrap justify-center items-center">
           <div className="absolute right-0 -top-16 flex flex-row gap-2 z-40">
          <button
            onClick={() => scrollMembers.current.scrollBy({ left: -340, behavior: "smooth" })}
            className="bg-white dark:bg-gray-700 hover:scale-110 transition-transform duration-300 shadow-lg rounded-full p-4 flex items-center justify-center"
          >
            <AiFillCaretLeft size={20} className="text-orange-500 dark:text-white" />
          </button>
          <button
            onClick={() => scrollMembers.current.scrollBy({ left: 340, behavior: "smooth" })}
            className="bg-white dark:bg-gray-700 hover:scale-110 transition-transform duration-300 shadow-lg rounded-full p-4 flex items-center justify-center"
          >
            <AiFillCaretRight size={20} className="text-orange-500 dark:text-white" />
          </button>
        </div>
          <div
            ref={scrollMembers}
            className="flex overflow-x-auto gap-6 pb-10 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }} 
          >
            {members.map((Member: any) => (
              <blockquote
                key={Member.id}
                className="flex-none ml-4 snap-start flex flex-col items-center justify-between w-[300px] md:w-[400px] lg:w-[450px] bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 px-6 py-10 relative mt-4"
              >
                {Member.name === "Masood" && (
                  <div className="flex justify-center items-center absolute top-4 right-4 gap-1">
                    <p className="pr-1 text-sm font-semibold">Founder</p>
                    <FaDotCircle className="text-orange-500" />
                  </div>
                )}

                <img
                  src={Member.img}
                  alt={Member.name}
                  className="mb-4 w-20 h-20 rounded-full object-cover"
                />
                <h3 className="font-primary dark:text-gray-300 text-gray-600 font-bold text-lg">{Member.name}</h3>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  From{" "}
                  <span
                    className={`pl-1 font-primary font-medium ${
                      Member.location === "Pakistan" ? "text-green-500" : "text-blue-500"
                    }`}
                  >
                    {Member.location}
                  </span>
                </span>
                <p className="mt-4 text-gray-700 dark:text-gray-200 font-primary font-normal text-center">
                  {Member.title}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Members;
