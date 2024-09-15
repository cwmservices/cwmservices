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
    const projectsJSON = await fetch("https://www.cwmservices.dev/api/portfolio");
    const projectsData = await projectsJSON.json();
    setProjects(projectsData.Projects);
    setLoading(false); 
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-center flex justify-center items-center flex-col">
          <img src="/cwmlogo.png" alt="logo" width="100px" height="100px" className="object-cover rounded-full"/>
          <div className="mt-4 text-white text-xl font-bold animate-bounce">
            Getting ready...
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Header />
      <Banner />
      <Services />
      <Projects />
      <Testimonials />
      <Members />
      <Contact />
      <div className="pb-4 pl-3 fixed bg-transparent bottom-3 left-5 inline-block">
        <Link
          target="_blank"
          href="https://api.whatsapp.com/send/?phone=923319272285&text&type=phone_number&app_absent=0"
        >
          <Image
            className="whatsappanim"
            src="/whatsapp.png"
            width={50}
            height={50}
            alt="whatsapp logo"
          />
        </Link>
      </div>
      <Footer />
    </main>
  );
}
