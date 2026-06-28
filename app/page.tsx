"use client"

import Banner from "@/src/components/Banner";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Members from "@/src/components/Members";
import PageLoader from "@/src/components/PageLoader";
import Projects from "@/src/components/Projects";
import Testimonials from "@/src/components/Testimonials";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ClipLoader } from 'react-spinners';

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

  // ── Page loader — dismissed when Spline scene fires its load event ──
  const [isLoading, setIsLoading] = useState(true);
  const handleSplineLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main>
      <PageLoader isLoading={isLoading} />
      <Header />
      <Banner onLoad={handleSplineLoad} />
      <Projects />
      <Testimonials />
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
