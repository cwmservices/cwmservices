"use client";

import React from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

function AboutPage() {
  const skills = [
    { name: "JavaScript & TypeScript", percentage: 90 },
    { name: "Node.js / Express", percentage: 90 },
    { name: "MongoDB / PostgreSQL", percentage: 90 },
    { name: "React & Next.js", percentage: 90 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "Python (Django, FastAPI)", percentage: 80 },
    { name: "System Design & Architecture", percentage: 85 },
  ];



  return (
    <>
      <Header />

      <section className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6">
          <Image
            src="/masood.jpeg"
            alt="Masood"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Masood Ur Rehman
        </h1>

        <p className="mt-2 text-primary font-medium tracking-wide">
          Founder of Cwmservices
        </p>

        <div className="w-24 h-0.5 bg-primary my-8 mx-auto"></div>

        <p className="max-w-3xl text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          I began my journey as a full-stack developer, building end-to-end applications for indivisuals and working on hobby projects. Over time, this path naturally evolved
          into successful freelancing and then founding my own agency, where I focus on delivering reliable,
          modern digital solutions for real businesses. Today, I work across
          backend and frontend development, helping clients turn ideas into
          scalable applications.<br/><br/>Alongside client work, I actively create
          educational content on YouTube and write technical articles, sharing
          practical knowledge and documenting my growth in the tech space. <br/><br/>As a
          founder, I care deeply about clean engineering, long-term impact, and
          continuous learning. I’m currently exploring AI and agentic
          development, with a strong interest in how intelligent systems can
          improve workflows and digital products. <br/><br/>~Driven by curiosity. Focused
          on quality. Building with purpose.
        </p>

        <div className="mt-14 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Core Expertise
          </h2>

          <div className="flex flex-col items-center gap-5">
            {skills.map((skill, index) => (
              <div key={index} className="md:w-[500px] w-full">
                <div className="flex justify-between text-sm mb-2 text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>

                <div className="h-2.5 w-full bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

   
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;
