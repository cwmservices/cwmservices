"use client"

import Banner from "@/src/components/Banner";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Members from "@/src/components/Members";
import Projects from "@/src/components/Projects";
import Services from "@/src/components/Services";
import Testimonials from "@/src/components/Testimonials";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {ClipLoader} from 'react-spinners';

export default function Home() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const projectsJSON = await fetch("/api/portfolio");
    const projectsData = await projectsJSON.json();
    setProjects(projectsData.Projects);
    setLoading(false); 
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('darkMode', newIsDark.toString());
    document.documentElement.classList.toggle('dark');
  };



  return (
    <main>
      <Header />
      <Banner />
      <Services />
      <Projects />
      <Testimonials />
      <Members />
      <Contact />
      <button
      onClick={toggleTheme}
      className="p-2 rounded-full absolute top-[18px] right-44 lg:right-56 bg-gray-200 dark:bg-gray-600 transition-colors duration-200"
      >
      {isDark ? '🌞' : '🌙'}
      </button>
      <Footer />
    </main>
  );
}
