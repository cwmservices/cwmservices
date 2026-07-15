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
      className="w-full font-primary sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[600px] h-full bg-[#0A0B10] text-ink-dark overflow-y-auto shadow-2xl border-l border-border-dark"
    >
      <div className="p-6 md:p-7 lg:p-8">
        <div className="sticky pt-4 top-0 bg-[#0A0B10] z-50 flex justify-between items-center w-full pb-4 mb-6">
          <div onClick={onClose} className="cursor-pointer group flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#12141A] group-hover:bg-primary/10 transition-colors">
              <svg className="w-5 h-5 text-ink-dark-muted group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-display font-medium text-ink-dark-muted group-hover:text-primary transition-colors">
              Back To Projects
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full items-center pt-2 mb-6 gap-4">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-display font-bold leading-tight">{project.title}</h2>
          {project.sticker && project.sticker !== "" && (
            <img className="w-12 md:w-14 shrink-0 drop-shadow-md" src={project.sticker} alt="sticker" />
          )}
        </div>

        <div className="relative w-full h-[260px] md:h-[320px] lg:h-[340px] rounded-2xl overflow-hidden mb-8 group border border-border-dark">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-xl md:text-xl lg:text-2xl font-display font-semibold mb-4 text-ink-dark">About Project</h3>
          <p className="text-base md:text-base lg:text-lg font-body text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-xl md:text-xl lg:text-2xl font-display font-semibold mb-4 text-ink-dark">Technologies</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.skills.map((skill: any, index: number) => (
              <span
                key={index}
                className="font-body text-sm md:text-sm lg:text-base font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-transparent text-ink-dark-muted border border-border-dark whitespace-nowrap hover:border-primary/50 hover:text-primary transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {(project.demo || project.code) && (
          <div className="mb-24 p-6 rounded-2xl bg-[#12141A] border border-border-dark">
            <div className="flex items-center font-display font-semibold text-ink-dark mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <h3 className="pl-2 text-xl">Project Links</h3>
            </div>

            <div className="space-y-4">
              {project.demo && (
                <div className="flex items-center gap-3">
                  <span className="font-medium text-ink-dark-muted w-16">Live Site</span>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 font-body text-primary hover:text-orange-400 break-all transition-colors hover:underline"
                  >
                    {project.demo}
                  </a>
                </div>
              )}

              {project.code && (
                <div className="flex items-center gap-3">
                  <span className="font-medium text-ink-dark-muted w-16">Source</span>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 font-body text-ink-dark hover:text-primary hover:underline break-all transition-colors"
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
        <div className="sticky w-full bottom-0 left-0 bg-[#0A0B10] p-4 md:p-6 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] pb-8 md:pb-6">
          <a target="_blank" rel="noopener noreferrer" href={project.demo}>
            <button className="w-full bg-primary text-white py-4 rounded-xl flex justify-center items-center opacity-90 hover:opacity-100 transition-opacity duration-200">
              <span className="font-display font-semibold text-lg">View Live Project</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default ProjectSidebar;