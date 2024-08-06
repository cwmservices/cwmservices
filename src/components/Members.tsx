"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FaDotCircle } from "react-icons/fa";

function Members() {
  const [members, setMembers] = useState([]);
  const fetchMembers = async () => {
    const membersJSON = await fetch("https://cwmservices.vercel.app/api/portfolio");
    const membersData = await membersJSON.json();
    setMembers(membersData.Members);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const renderMembers = () => {
    return members.map((Member: any) => (
      <div
        key={Member.id}
        className="flex h-full relative flex-col my-4 px-6 shadow-lg justify-center w-full md:justify-between md:w-[400px] bg-white py-8"
      >
        <div className="mt-4 flex justify-center items-center flex-col">
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
      </div>
    ));
  };

  return (
    <div id="scrollToTeam" className="relative w-[90%] mx-auto">
      <h1
        id="scrollToElement"
        className="text-center pt-10 text-3xl lg:text-5xl font-primary font-bold text-primary"
      >
        Who<span className="border-b pb-3 border-gray-300">m We</span> Work
      </h1>
      <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10">
        Our Aspiring Members
      </p>

      <div className="flex lg:flex-nowrap mt-4 flex-wrap justify-center items-center">
        <div className="overflow-hidden w-full md:my-0 my-6 flex flex-wrap justify-between items-center pb-3 h-full scrollbar-hide whitespace-nowrap scroll-smooth">
          {renderMembers()}
        </div>
      </div>
    </div>
  );
}

export default Members;
