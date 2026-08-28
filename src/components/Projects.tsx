"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import ProjectSidebar from "../utils/ProjectSidebar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsModalOpen(false);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 200);
  };

  const fetchProjects = async () => {
    const projectsJSON = await fetch("/api/portfolio");
    const projectsData = await projectsJSON.json();
    setProjects(projectsData.Projects);
    setFilteredProjects(projectsData.Projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <style jsx>{`
        /* ── Card border/glow on hover — no lift, no other movement ── */
        .project-card {
          transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.3s ease;
        }
        .project-card:hover {
          border-color: rgba(240, 135, 0, 0.35);
          box-shadow: 0 0 0 1px rgba(240, 135, 0, 0.15),
                      0 8px 28px rgba(240, 135, 0, 0.10);
        }

        /* ── Minimal modal fade ── */
        .modal-overlay {
          transition: opacity 0.2s ease;
        }
        .modal-panel {
          transition: opacity 0.2s ease;
        }
      `}</style>

      <section
        className="bg-[#0A0B10] pb-20 mt-[-10px] pt-20 duration-300 relative sm:pb-20 lg:pb-20 xl:pb-20"
      >
        {/* ── Single shared container — same as header/services ── */}
        <div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto">
          <div id="projects" className="py-14 scroll-mt-8">
            <h1 className="text-center text-3xl lg:text-5xl font-bold text-gray-100 font-display">
              Ou<span className="border-b pb-3 text-primary border-primary">r Fine</span>st Work
            </h1>
            <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-300 font-body">
              A showcase of our capabilities and the projects we&apos;ve built.
            </p>
          </div>

          {/* ── Projects Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 xl:gap-8 2xl:gap-10">
            {projects.map((project: any, i: number) => (
              <div
                key={project.title}
                onClick={() => openModal(project)}
                className="project-card group relative flex flex-col bg-[#10121A] border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* ── Image — padded, rounded, slightly dimmer bg than the card ── */}
                <div className="p-3 bg-[#141922] mb-3 sm:p-4">
                  <div
                    className="relative w-full overflow-hidden rounded-xl bg-black/20"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 28vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="px-5 sm:px-6 xl:px-7 pb-5 sm:pb-6 xl:pb-7 flex flex-col flex-grow">
                  {/* Tech chips — above title, max 4 visible */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
                    {project.skills.slice(0, 3).map((skill: any) => (
                      <span
                        key={skill}
                        className="font-body text-[10.5px] sm:text-[11.5px] xl:text-[12.5px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="font-body text-[10.5px] sm:text-[11.5px] xl:text-[12.5px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-lg sm:text-xl lg:text-[1.25rem] xl:text-[1.375rem] text-gray-100 leading-snug mb-2.5 sm:mb-3 transition-colors duration-200 group-hover:text-primary">
                    {project.title}
                  </h3>

                  {/* Short description */}
                  <p className="font-body text-gray-400 text-[13.5px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] leading-relaxed mb-5 sm:mb-6 flex-grow">
                    {project.description.slice(0, 100) + ".."}
                  </p>

                  {/* ── Footer: View Project — arrow moves only when THIS is hovered ── */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(project);
                    }}
                    className="group/btn font-nav text-[13px] sm:text-[13.5px] font-semibold text-gray-100 hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 w-fit"
                  >
                    View Project
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>{/* end grid */}
        </div>{/* end shared container */}
      </section>

      {/* ── Modal Portal — minimal fade only ── */}
      {isModalOpen && (
        <>
          <div
            className={`modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] ${isClosing ? "opacity-0" : "opacity-100"
              }`}
            onClick={closeModal}
          ></div>

          <div
            className={`modal-panel fixed top-0 right-0 h-full z-[110] ${isClosing ? "opacity-0" : "opacity-100"
              }`}
          >
            <ProjectSidebar project={selectedProject} onClose={closeModal} />
          </div>
        </>
      )}
    </>
  );
}

export default Projects;