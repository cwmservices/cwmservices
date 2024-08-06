"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

function Header() {
  const [navbar, setNavbar] = useState(false);

  const handleMenuItemClick = (sectionId: any) => {
    document?.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setNavbar(false);
  };

  function toggleNavbar() {
    setNavbar(!navbar);
  }

  return (
    <div className="navbar bg-base-100 w-[90%] mx-auto">
      <div className="navbar-start">
        <div className="dropdownbutton" onClick={toggleNavbar}>
          <div
            tabIndex={0}
            className="btn btn-ghost bg-slate-100 lg:hidden md:mr-0 mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            style={{ position: "absolute", top: 51 }}
            className={`menu menu-sm mt-3 z-[1] py-2 shadow bg-base-100 rounded-sm md:hidden ${
              navbar ? "block" : "hidden"
            }`}
          >
            <li onClick={() => handleMenuItemClick("scrollToHome")}>
              <a className="py-2 pl-2 text-lg font-secondary">Home</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToServices")}>
              <a className="py-2 text-lg font-secondary">Services</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToProjects")}>
              <a className="py-2 text-lg font-secondary">Projects</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToTestimonials")}>
              <a className="py-2 text-lg font-secondary">Testimonials</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToTeam")}>
              <a className="py-2 text-lg font-secondary">Team</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToContact")}>
              <a className="py-2 text-lg font-secondary">Contact</a>
            </li>
          </ul>
        </div>
        <Image
          src="/cwm.png"
          className="md:pr-0 pr-3"
          alt="logo"
          width={100}
          height={39}
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-secondary">
          <li onClick={() => handleMenuItemClick("scrollToHome")}>
            <a>Home</a>
          </li>

          <li onClick={() => handleMenuItemClick("scrollToServices")}>
            <a>Services</a>
          </li>
          <li onClick={() => handleMenuItemClick("scrollToProjects")}>
            <a>Projects</a>
          </li>
          <li onClick={() => handleMenuItemClick("scrollToTestimonials")}>
            <a>Testimonials</a>
          </li>
          <li onClick={() => handleMenuItemClick("scrollToTeam")}>
            <a className="py-2 text-lg font-secondary">Team</a>
          </li>
          <li onClick={() => handleMenuItemClick("scrollToContact")}>
            <a>Contact</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <a href="https://www.fiverr.com/cwmservices" target="_blank">
          <button className="btn bg-primary hover:bg-secondory text-white">
            Get A Quote
          </button>
        </a>
      </div>
    </div>
  );
}

export default Header;
