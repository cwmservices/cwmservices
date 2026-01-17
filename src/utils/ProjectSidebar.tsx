"use client";

import React, { useEffect } from "react";
import Image from "next/image";

function ProjectSidebar({ project, onClose }: any) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <div
      id="project-sidebar"
      className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] h-full dark:bg-gray-900 dark:text-gray-100 bg-white text-dark overflow-y-auto shadow-2xl"
    >
      <div className="p-6">
        <div className="sticky pt-4 top-0 bg-white dark:bg-gray-900 z-50 flex justify-between items-center w-full border-b border-b-gray-300 dark:border-b-gray-700 pb-3 mb-4">
          <div onClick={onClose} className="cursor-pointer hover:scale-110 transition-transform">
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
            className="font-bold cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          >
            Back To Projects
          </div>
        </div>

        <div className="flex justify-between w-full items-center pt-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
          {project.sticker && project.sticker !== "" && (
            <img width="50px" src={project.sticker} alt="sticker" />
          )}
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6 group">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold pb-3 text-gray-800 dark:text-white">About</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold pb-3 text-gray-800 dark:text-white">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill: any, index: number) => (
              <div
                key={index}
                className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg font-medium text-sm hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {(project.demo || project.code) && (
          <div className="mb-20">
            <div className="flex items-center font-bold dark:text-gray-100 text-gray-800 mb-3">
              <Image
                src="/earth.png"
                alt="website icon"
                width={20}
                height={20}
              />
              <h3 className="pl-2 text-xl">Project Links</h3>
            </div>
            
            <div className="space-y-3">
              {project.demo && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline break-all transition-colors"
                  >
                    {project.demo}
                  </a>
                </div>
              )}
              
              {project.code && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline break-all transition-colors"
                  >
                    {project.code}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {project.demo && (
        <div className="sticky w-full bottom-0 border-t border-gray-200 dark:border-gray-700">
          <a target="_blank" rel="noopener noreferrer" href={project.demo}>
            <button className="w-full bg-primary hover:opacity-100 opacity-90 text-white py-4 flex justify-center items-center transition-all duration-200 group">
              <h3 className="font-bold text-lg">Open Project</h3>
              <Image
                src="/share.png"
                alt="open icon"
                width={30}
                height={30}
                className="pl-2 filter invert group-hover:translate-x-1 transition-transform"
              />
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default ProjectSidebar;