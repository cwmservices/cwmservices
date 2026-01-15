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

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
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

  return (
    <div id="scrollToProjects" className="dark:bg-gray-800 bg-gray-100 dark:text-gray-100">
      <h1 className="text-center text-3xl lg:text-5xl pt-10 font-primary font-bold text-primary">
        Some of our finest work.
      </h1>
      <p className="text-center font-bold text-2xl px-4 lg:text-4xl mt-6">
        Our projects
      </p>


     <div className="flex flex-wrap justify-between items-center mt-10 w-[90%] mx-auto gap-6">
        {projects.map((project: any) => {
          return (
            <div
              onClick={() => openModal(project)}
           className="card w-full sm:w-[300px] lg:w-[350px] xl:w-[400px] bg-base-100 shadow-xl relative group my-4"
              key={project.title}
            >
              <figure>
        <Image
          src={project.img}
          width={400}
          height={400}
          className="w-full h-[380px] sm:h-[380px] lg:h-[380px] xl:h-[400px] rounded-lg object-cover object-top"
          alt={project.title}
        />
            </figure>

              <div className="lg:hidden cursor-pointer lg:group-hover:block rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-[0.45]"></div>

              <div className="card-body cursor-pointer absolute bottom-0 lg:hidden lg:group-hover:block animate-slide-up">
                <h2 className="card-title text-xl font-bold font-primary text-white">
                  {project.title}
                  <div className="badge badge-secondary">
                    {project.category}
                  </div>
                </h2>
                <p
                  className="text-lg pb-2 text-gray-200 font-semibold font-secondary"
                  style={{ lineHeight: "24px" }}
                >
                  {project.description.slice(0, 70) + ".."}
                </p>
                <div className="card-actions justify-start">
                  {project.skills.map((skill: any) => {
                    return (
                      <div
                        key={skill}
                        className="badge badge-outline border-none bg-gray-600 text-white"
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
        <ProjectSidebar project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}

export default Projects;
