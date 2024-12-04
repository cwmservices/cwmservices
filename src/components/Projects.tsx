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
  const [visibleProjects, setVisibleProjects] = useState(3); // Initial number of projects to show

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const fetchProjects = async () => {
    const projectsJSON = await fetch("https://www.cwmservices.dev/api/portfolio");
    const projectsData = await projectsJSON.json();
    setProjects(projectsData.Projects);
    setFilteredProjects(projectsData.Projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterProjects = (category: any) => {
    setActiveCategory(category);
    setVisibleProjects(3); // Reset visible projects when category changes
    if (category === "ALL") {
      setFilteredProjects(projects);
    } else {
      const filteredProjects = projects.filter((singleProject: any) => {
        return singleProject.category === category;
      });
      setFilteredProjects(filteredProjects);
    }
  };

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 3); // Show 3 more projects on click
  };

  return (
    <div id="scrollToProjects" className="dark:bg-gray-800 bg-gray-100 dark:text-gray-100">
      <h1 className="text-center text-3xl lg:text-5xl pt-10 font-primary font-bold text-primary">
        Some of our finest work.
      </h1>
      <p className="text-center font-bold text-2xl px-4 lg:text-4xl mt-6">
        Our projects
      </p>
      {/* tabs */}
      <div className="tabs flex justify-center items-center mt-10 bg-transparent tabs-boxed">
        <a
          className={`tab ${activeCategory === "ALL" && "tab-active"} font-secondory m-1 text-lg dark:text-white dark:bg-gray-700 bg-gray-200`}
          onClick={() => filterProjects("ALL")}
        >
          ALL
        </a>
        <a
          className={`tab m-1 font-secondory bg-gray-200 dark:text-white dark:bg-gray-700 ${activeCategory === "MOBILE" && "tab-active"} text-lg`}
          onClick={() => filterProjects("MOBILE")}
        >
          Mobile Apps
        </a>
        <a
          className={`tab m-1 font-secondory text-lg dark:text-white dark:bg-gray-700 bg-gray-200 ${activeCategory === "WEB" && "tab-active"}`}
          onClick={() => filterProjects("WEB")}
        >
          Web Apps
        </a>
        <a
          className={`tab m-1 font-secondory bg-gray-200 dark:text-white dark:bg-gray-700 ${activeCategory === "UI/UX" && "tab-active"} text-lg`}
          onClick={() => filterProjects("UI/UX")}
        >
          UI/UX
        </a>
        <a
          className={`tab m-1 font-secondory dark:text-white dark:bg-gray-700 bg-gray-200 ${activeCategory === "WORDPRESS" && "tab-active"} text-lg`}
          onClick={() => filterProjects("WORDPRESS")}
        >
          Wordpress
        </a>
      </div>

      {/* projects */}
      <div className="flex justify-center flex-wrap lg:justify-between items-center mt-10 w-[90%] mx-auto">
        {filteredProjects.slice(0, visibleProjects).map((project: any) => {
          return (
            <div
              onClick={() => openModal(project)}
              className="card w-96 bg-base-100 shadow-xl relative group my-4"
              key={project.title}
            >
              <figure>
                <Image
                  src={project.img}
                  width={400}
                  height={400}
                  className="w-[500px] h-[400px] rounded-lg"
                  alt="web development"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
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

      {/* Load More Button */}
      {visibleProjects < filteredProjects.length && (
        <div className="flex justify-center py-6">
          <button
            onClick={loadMoreProjects}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-gray-200 hover:text-black transition duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {isModalOpen && (
        <ProjectSidebar project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}

export default Projects;
