"use client";

import React from "react";
import { MonitorSmartphone, Cpu, Rocket, Lightbulb } from "lucide-react";

function Services() {
  const services = [
    {
      title: "Custom Web Development",
      description: "We build fast, scalable, and fully custom web applications tailored exactly to your business needs using modern stacks like React and Next.js.",
      icon: <MonitorSmartphone className="w-8 h-8 text-primary" />,
    },
    {
      title: "AI Systems Development",
      description: "Integrate powerful AI capabilities into your workflow. From custom automation and RAG architectures to MCP integrations and LLM fine-tuning.",
      icon: <Cpu className="w-8 h-8 text-primary" />,
    },
    {
      title: "SaaS & Product Development",
      description: "End-to-end product development for SaaS startups and enterprises. We handle the architecture, frontend, backend, and deployment.",
      icon: <Rocket className="w-8 h-8 text-primary" />,
    },
    {
      title: "Consultation",
      description: "Strategic technical consultation to help you make the right architectural decisions, scale your existing systems, or plan your next big feature.",
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section id="services" className="bg-[#0A0B10] py-20 relative sm:py-24 lg:py-28">
      <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">
        <div className="mb-14 lg:mb-20">
          <h2 className="text-center text-3xl lg:text-5xl font-bold text-gray-100 font-display">
            Ou<span className="border-b pb-3 text-primary border-primary">r Servic</span>es
          </h2>
          <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-300 font-body max-w-3xl mx-auto">
            We deliver high-quality digital solutions engineered for performance, scale and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#10121A] border border-white/10 rounded-2xl p-8 flex flex-col h-full transition-colors duration-300 hover:border-primary/50"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="font-display font-semibold text-xl xl:text-2xl text-gray-100 mb-4">
                {service.title}
              </h3>
              <p className="font-body text-gray-400 text-[15px] leading-relaxed flex-grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
