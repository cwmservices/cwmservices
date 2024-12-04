"use client";

import React from "react";
import Image from "next/image";

function Services() {
  const scrollToHeading = () => {
    const element = document.getElementById("scrollToElement");
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="dark:bg-gray-800 bg-gray-100 dark:text-gray-100">
      <div
        className="w-full flex justify-center items-center py-12 filter brightness-50 cursor-pointer"
        onClick={scrollToHeading}
      >
        <Image
          src="/scrolldown.gif"
          alt="scroll down animation"
          width={70}
          height={70}
        />
      </div>
      <span id="scrollToServices"></span>
      <h1
        id="scrollToElement"
        className="text-center pt-10 text-3xl lg:text-5xl font-primary font-bold text-primary"
      >
        Wh<span className="border-b pb-3 border-gray-600">at We</span> Do
      </h1>
      <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10">
        Transforming your business processes for the digital future.
      </p>

      {/* cards section with 1 flex container and 3 card items */}
      <div className="flex justify-center lg:justify-between py-10 items-center w-[90%] flex-wrap mx-auto">
        <div className="card w-96 shadow-xl my-4">
          <figure>
            <Image
              src="/webdev.jpg"
              alt="web development"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body rounded-b-xl dark:bg-gray-700 bg-white dark:text-white">
            <h2 className="card-title">
              Web Development
              <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                Service
              </div>
            </h2>
            <p>
              Building Full Stack Professional and Responsive Websites and Web
              Applications.
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">React</div>
              <div className="badge badge-outline">Node</div>
              <div className="badge badge-outline">Tailwind</div>
              <div className="badge badge-outline">WordPress</div>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl my-4">
          <figure>
            <Image
              src="/appdev.jpg"
              alt="Mobile App development"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body bg-white rounded-b-xl dark:bg-gray-700 dark:text-white">
            <h2 className="card-title">
              Mobile App Development
              <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                Service
              </div>
            </h2>
            <p>Building Full Stack Android and IOS Mobile Applications.</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">React Native</div>
              <div className="badge badge-outline">Firebase</div>
              <div className="badge badge-outline">Node</div>
              <div className="badge badge-outline">Tailwind</div>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl my-4">
          <figure>
            <Image
              src="/uiux.jpg"
              alt="UI/UX Designing"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body rounded-b-xl bg-white dark:bg-gray-700 dark:text-white">
            <h2 className="card-title">
              UI/UX
              <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                Service
              </div>
            </h2>
            <p>Building UI/UX of Both Web and Mobile Applications.</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Figma</div>
              <div className="badge badge-outline">Zeplin</div>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl my-4">
          <figure>
            <Image
              src="/wordpress.jpg"
              alt="wordpress"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body rounded-b-xl bg-white dark:bg-gray-700 dark:text-white">
            <h2 className="card-title">
              WordPress
              <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                Service
              </div>
            </h2>
            <p>
              Creating WordPress Websites Ranging From Business Websites To
              Fully Funtioning E-commerce Stores.
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Elementor</div>
              <div className="badge badge-outline">Woocommerce</div>
              <div className="badge badge-outline">Astra</div>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl my-4">
          <figure>
            <Image
              src="/coaching.jpg"
              alt="Coaching"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body bg-white rounded-b-xl dark:bg-gray-700 dark:text-white">
            <h2 className="card-title">
              Coaching
              <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                Service
              </div>
            </h2>
            <p>
              With 2+ Years of Experience in Creating Courses and YouTube
              Tutorials. We are here to help people how to Code.
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Skype</div>
              <div className="badge badge-outline">Zoom</div>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl my-4">
          <figure>
            <Image
              src="/collaboration.jpg"
              alt="Collaboration Icon"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body bg-white rounded-b-xl dark:bg-gray-700 dark:text-white">
            <h2 className="card-title">
              Collaboration
              <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                Service
              </div>
            </h2>
            <p>
              Want to promote your brand with actual audience who are actually
              interested in coding?
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">YouTube</div>
              <div className="badge badge-outline">Medium</div>
              <div className="badge badge-outline">Instagram</div>
            </div>
          </div>
        </div>
      </div>
      {/* cards section ends */}
    </div>
  );
}

export default Services;
