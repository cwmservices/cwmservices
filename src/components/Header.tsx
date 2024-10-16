"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import MessageModal from "../utils/MessageBox"

function Header() {
  const [navbar, setNavbar] = useState(false);
  const mobileNavbar = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleButtonRef = useRef(null);

  
  const handleMenuItemClick = (sectionId: any) => {
    document?.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setNavbar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (navbar &&
          mobileNavbar.current && 
          !mobileNavbar.current.contains(event.target) &&
          toggleButtonRef.current &&
          !toggleButtonRef.current.contains(event.target)) {
        setNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbar]);

 const toggleNavbar =() => {
    setNavbar(!navbar);
  }

  return (
    <div className="bg-base-100 dark:bg-gray-800">

    <div className="navbar w-[90%] mx-auto">
      <div className="navbar-start">
        <div className="dropdownbutton" ref={toggleButtonRef} onClick={toggleNavbar}>
          <div
            tabIndex={0}
            className="btn btn-ghost bg-slate-100 dark:text-white text-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 lg:hidden md:mr-0 mr-4"
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
            style={{ position: "absolute",paddingLeft:"30px",paddingRight:"30px", left:0,top: 51 }}
            className={`menu menu-sm dark:text-white w-full mt-4 z-[999] py-2 shadow dark:bg-gray-800 bg-base-100 rounded-sm md:hidden ${
              navbar ? "block" : "hidden"
            }`}
            ref={mobileNavbar}
          >
            <li onClick={() => handleMenuItemClick("scrollToHome")}>
              <a className="py-2 dark:hover:bg-gray-100 text-lg font-secondary">Home</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToServices")}>
              <a className="py-2 dark:hover:bg-gray-100 text-lg font-secondary">Services</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToProjects")}>
              <a className="py-2 dark:hover:bg-gray-100 text-lg font-secondary">Projects</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToTestimonials")}>
              <a className="py-2 dark:hover:bg-gray-100 text-lg font-secondary">Testimonials</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToTeam")}>
              <a className="py-2 dark:hover:bg-gray-100 text-lg font-secondary">Team</a>
            </li>
            <li onClick={() => handleMenuItemClick("scrollToContact")}>
              <a className="py-2 dark:hover:bg-gray-100 text-lg font-secondary">Contact</a>
            </li>
          </ul>
        </div>
        <Image
          src="/cwmlogo.png"
          className="rounded-full dark:hidden block"
          alt="logo"
          width={55}
          height={55}
        />
        
        <Image
          src="/cwmlogo.png"
          className="rounded-full dark:block hidden"
          alt="logo"
          width={55}
          height={55}
        />
      </div>
      <div className="navbar-center dark:text-white hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-secondary">
          <li className="dark:hover:bg-white dark:rounded-xl" onClick={() => handleMenuItemClick("scrollToHome")}>
            <a>Home</a>
          </li>

          <li className="dark:hover:bg-white dark:rounded-xl" onClick={() => handleMenuItemClick("scrollToServices")}>
            <a>Services</a>
          </li>
          <li className="dark:hover:bg-white dark:rounded-xl" onClick={() => handleMenuItemClick("scrollToProjects")}>
            <a>Projects</a>
          </li>
          <li className="dark:hover:bg-white dark:rounded-xl" onClick={() => handleMenuItemClick("scrollToTestimonials")}>
            <a>Testimonials</a>
          </li>
          <li className="dark:hover:bg-white dark:rounded-xl" onClick={() => handleMenuItemClick("scrollToTeam")}>
            <a className="py-2 text-lg font-secondary">Team</a>
          </li>
          <li className="dark:hover:bg-white dark:rounded-xl" onClick={() => handleMenuItemClick("scrollToContact")}>
            <a>Contact</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
          <button
          onClick={() => setIsModalOpen(true)}
          className="btn bg-primary hover:bg-secondory text-white">
            Get A Quote
          </button>
      </div>

      <MessageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
    </div>

  );
}

export default Header;
