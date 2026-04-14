"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
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
    }, 300);
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
        /* Modal animations */
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        /* ── Card hover glow — mirrors header shadow-glow-sm ── */
        .project-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(240, 135, 0, 0.2),
                      0 8px 32px rgba(240, 135, 0, 0.12),
                      0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* ── Image zoom mirrors header logo hover ── */
        .project-img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        /* ── Title colour transition on hover ── */
        .project-title {
          transition: color 0.2s ease;
        }
        .project-card:hover .project-title {
          color: var(--color-primary, #F08700);
        }

        /* ── Stagger-in animation (pure CSS, no JS) ── */
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-animate {
          opacity: 0;
          animation: cardReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <section
        id="projects"
        className="bg-light dark:bg-dark transition-colors duration-300 relative pb-10 sm:pb-10 lg:pb-10 xl:pb-10"
      >
        <span id="scrollToProjects"></span>

        {/* ── Single shared container — same as header/services ── */}
        <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">
          <div className="py-14">
            <h1 className="text-center text-3xl lg:text-5xl font-bold dark:text-gray-100">
              Ou<span className="border-b pb-3 text-primary border-primary">r Fine</span>st Work
            </h1>
            <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-600 dark:text-gray-300">
              A showcase of our capabilities and the projects we&apos;ve built.
            </p>
          </div>

          {/* ── Projects Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 xl:gap-8 2xl:gap-10">
            {projects.map((project: any, i: number) => (
              <div
                key={project.title}
                onClick={() => openModal(project)}
                className="project-card card-animate group relative flex flex-col bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark rounded-2xl overflow-hidden cursor-pointer"
                style={{ animationDelay: (0.05 + Math.min(i * 0.07, 0.5)) + "s" }}
              >
                {/* ── Image ── */}
                <div className="relative w-full overflow-hidden bg-surface-muted dark:bg-dark" style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 28vw"
                    className="project-img object-cover object-top"
                  />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* ── Card Body ── */}
                <div className="p-5 sm:p-6 xl:p-7 2xl:p-8 flex flex-col flex-grow">
                  {/* Title row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="focus:outline-none min-w-0">
                      <h3 className="project-title font-display font-semibold text-lg sm:text-xl lg:text-[1.25rem] xl:text-[1.375rem] text-ink dark:text-ink-dark leading-snug">
                        {project.title}
                      </h3>
                    </span>
                    {/* <span className="font-body text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {project.category}
                    </span> */}
                  </div>

                  {/* Short description */}
                  <p className="font-body text-ink-muted dark:text-ink-dark-muted text-[13.5px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] leading-relaxed mb-5 sm:mb-6 xl:mb-7 flex-grow">
                    {project.description.slice(0, 100) + ".."}
                  </p>

                  {/* ── Footer: tech pills ── */}
                  <div className="flex items-end justify-between gap-3 mt-auto">
                    {/* Tech chips — max 4 visible */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 min-w-0">
                      {project.skills.slice(0, 4).map((skill: any) => (
                        <span
                          key={skill}
                          className="font-body text-[10.5px] sm:text-[11.5px] xl:text-[12.5px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-muted dark:bg-dark text-ink-muted dark:text-ink-dark-muted border border-border-light dark:border-border-dark whitespace-nowrap"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>{/* end grid */}
        </div>{/* end shared container */}
      </section>

      {/* ── Modal Portal ── */}
      {isModalOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
              }`}
            onClick={closeModal}
            style={{
              animation: isClosing ? 'none' : 'fadeIn 0.3s ease-out forwards'
            }}
          ></div>

          <div
            className={`fixed top-0 right-0 h-full z-[110] transition-transform duration-300 ease-out ${isClosing ? 'translate-x-full' : 'translate-x-0'
              }`}
            style={{
              animation: isClosing ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.3s ease-out forwards'
            }}
          >
            <ProjectSidebar project={selectedProject} onClose={closeModal} />
          </div>
        </>
      )}
    </>
  );
}

export default Projects;