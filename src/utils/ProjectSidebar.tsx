"use client";

import React, { useEffect } from "react";
import Image from "next/image";

function ProjectSidebar({ project, onClose }: any) {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebar = document.getElementById("project-sidebar");
      if (sidebar && window.scrollY && !sidebar.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-[998] h-full bg-black opacity-60"></div>
      <div
        style={{ zIndex: 999 }}
        id="project-sidebar"
        className="fixed top-0 right-0 h-full w-full md:w-1/4 dark:bg-gray-900 dark:text-gray-100 bg-light text-dark overflow-y-scroll overflow-x-hidden"
      >
        {/* Drawer content */}
        <div className="p-6">
          <div className="flex justify-between items-center w-full border-b border-b-gray-300 pb-3">
            <div onClick={onClose} className="cursor-pointer">
              <Image
                className="opacity-70 dark:brightness-100 dark:invert"
                src="/back-button.png"
                width={25}
                height={25}
                alt="back button"
              />
            </div>

            <div
              onClick={onClose}
              className="font-bold cursor-pointer opacity-80"
            >
              Back To Projects
            </div>
          </div>
          <div className="flex justify-between w-full items-center pt-4">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            {project.sticker !== "" && (
              <img width="50px" src={project.sticker} alt="sticker" />
            )}
          </div>
          <Image
            src={project.img}
            alt="Project gif"
            width={300}
            height={400}
            className="my-4 rounded-lg w-full h-[400px]"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          <h3 className="text-xl font-semibold pb-2">About</h3>
          <p className="text-dark dark:text-gray-200">{project.description}</p>
          <h3 className="text-xl font-semibold pb-2 pt-3">Technologies</h3>
          {project.skills.map((skill: any) => {
            return (
              <div
                key={skill}
                className="badge badge-outline border-none m-1 md:text-[14px] text-[11px] bg-gray-600 text-white"
              >
                {skill}
              </div>
            );
          })}
          <div className="mt-4  flex justify-start flex-col">
            <div className="flex items-center font-bold dark:text-gray-100 text-dark">
              <Image
                src="/earth.png"
                alt="website icon"
                width={20}
                height={20}
              />
              <h4 className="pl-1">Live Preview</h4>
            </div>
            <a
              href={project.demo}
              target="_blank"
              className="text-dark hover:text-blue-500 underline pb-2 dark:text-gray-100 dark:hover:text-blue-500"
            >
              {project.demo}
            </a>
            
            <a
              href={project.code}
              target="_blank"
              className="text-dark hover:text-blue-500 underline"
            >
              {project.code}
            </a>
          </div>
        </div>

        {/* Open Project Button */}
        <div className="sticky w-full bottom-0">
          <a target="_blank" href={project.demo}>
            <button className="w-full bg-dark text-light py-2 flex justify-center items-center hover:bg-gray-800">
              <h3 className="font-bold">Open Project</h3>
              <Image
                src="/share.png"
                alt="website icon"
                width={30}
                height={30}
                className="pl-2 filter invert"
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectSidebar;
