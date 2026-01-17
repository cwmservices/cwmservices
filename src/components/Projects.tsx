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
    <div id="scrollToProjects" className="dark:bg-gray-800 pt-10 bg-gray-100 dark:text-gray-100">
      <h1 className="text-center text-3xl lg:text-5xl pt-10 font-primary font-bold text-primary">
        Some of our finest work.
      </h1>
      <p className="text-center font-bold text-2xl px-4 lg:text-4xl pt-6">
        Our projects
      </p>

      <div className="flex flex-wrap justify-between items-center pt-10 w-[90%] mx-auto gap-6 pb-10">
        {projects.map((project: any) => {
          return (
            <div
              onClick={() => openModal(project)}
              className="card w-full sm:w-[300px] lg:w-[350px] xl:w-[400px] bg-base-100 shadow-xl relative group cursor-pointer my-4 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              key={project.title}
            >
              <figure className="relative overflow-hidden">
                <Image
                  src={project.img}
                  width={400}
                  height={400}
                  className="w-full h-[380px] sm:h-[380px] lg:h-[380px] xl:h-[400px] rounded-lg object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
                  alt={project.title}
                />
              </figure>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/80 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

              <div className="card-body absolute bottom-0 left-0 right-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <h2 className="card-title text-xl font-bold font-primary text-white drop-shadow-lg">
                  {project.title}
                  <div className="badge badge-secondary bg-orange-500 border-orange-400 text-white">
                    {project.category}
                  </div>
                </h2>
                <p
                  className="text-lg pb-2 text-white font-semibold font-secondary drop-shadow-lg opacity-90"
                  style={{ lineHeight: "24px" }}
                >
                  {project.description.slice(0, 70) + ".."}
                </p>
                <div className="card-actions justify-start flex-wrap">
                  {project.skills.slice(0, 4).map((skill: any) => {
                    return (
                      <div
                        key={skill}
                        className="badge badge-outline border-white/50 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                      >
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <>
          <div 
            className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-0 animate-fadeIn'
            }`}
            onClick={closeModal}
            style={{ 
              animation: isClosing ? 'none' : 'fadeIn 0.3s ease-out forwards'
            }}
          ></div>
          
          <div 
            className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-out ${
              isClosing ? 'translate-x-full' : 'translate-x-full'
            }`}
            style={{
              animation: isClosing ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.3s ease-out forwards'
            }}
          >
            <ProjectSidebar project={selectedProject} onClose={closeModal} />
          </div>
        </>
      )}

      <style jsx>{`
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
            opacity: 0.5;
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
      `}</style>
    </div>
  );
}

export default Projects;