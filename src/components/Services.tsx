"use client";

import React from "react";
import { MonitorSmartphone, Cpu, Rocket, Lightbulb, Check } from "lucide-react";

function Services() {
  const services = [
    {
      title: "Custom Web Development",
      subtitle: "React & Next.js, Built to Scale",
      description:
        "We build fast, scalable, and fully custom web applications tailored exactly to your business needs using modern stacks like React and Next.js.",
      icon: <MonitorSmartphone className="w-7 h-7 text-primary" />,
      features: [
        "React / Next.js development",
        "Responsive, mobile-first design",
        "SEO-optimized architecture",
        "CMS & third-party integrations",
      ],
    },
    {
      title: "AI Systems Development",
      subtitle: "Automation & LLM Integrations",
      description:
        "Integrate powerful AI capabilities into your workflow. From custom automation and RAG architectures to MCP integrations and LLM fine-tuning.",
      icon: <Cpu className="w-7 h-7 text-primary" />,
      features: [
        "RAG & custom AI pipelines",
        "MCP & API integrations",
        "LLM fine-tuning & prompting",
        "Workflow automation",
      ],
    },
    {
      title: "SaaS & Product Development",
      subtitle: "Idea to Launch, End-to-End",
      description:
        "End-to-end product development for SaaS startups and enterprises. We handle the architecture, frontend, backend, and deployment.",
      icon: <Rocket className="w-7 h-7 text-primary" />,
      features: [
        "Full-stack architecture",
        "Frontend & backend build",
        "Cloud deployment & CI/CD",
        "Post-launch support",
      ],
    },
    {
      title: "Consultation",
      subtitle: "Strategic Technical Guidance",
      description:
        "Strategic technical consultation to help you make the right architectural decisions, scale your existing systems, or plan your next big feature.",
      icon: <Lightbulb className="w-7 h-7 text-primary" />,
      features: [
        "Architecture & tech-stack review",
        "Scaling & performance audits",
        "Roadmap & feature planning",
        "Ongoing technical advisory",
      ],
    },
  ];

  return (
    <section id="services" className="bg-[#0A0B10] py-20 relative sm:py-24 lg:py-28">
      <div className="w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto">
        <div className="mb-14 lg:mb-20">
          <h2 className="text-center text-3xl lg:text-5xl font-bold text-gray-100 font-display">
            Ou<span className="border-b pb-3 text-primary border-primary">r Servic</span>es
          </h2>
          <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-300 font-body max-w-3xl mx-auto">
            We deliver high-quality digital solutions engineered for performance, scale and user experience.
          </p>
        </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-6">
  {services.map((service, index) => (
    <div
      key={index}
      className="bg-[#10121A] border border-white/10 rounded-2xl p-6 xl:p-7 flex flex-col h-full transition-colors duration-300 hover:border-primary/50"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
        {service.icon}
      </div>

      <h3 className="font-display font-semibold text-lg xl:text-xl text-gray-100 mb-1.5">
        {service.title}
      </h3>
      <p className="font-body text-[13px] text-gray-500 mb-4">
        {service.subtitle}
      </p>

      <p className="font-body text-gray-400 text-[14px] leading-relaxed mb-5">
        {service.description}
      </p>

      <ul className="flex flex-col gap-2 mb-7">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-[13px] text-gray-300 font-body">
            <Check className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2.5} />
            {feature}
          </li>
        ))}
      </ul>

      <button className="mt-auto w-full font-nav text-[13.5px] font-semibold tracking-[0.02em] py-2.5 rounded-full bg-primary text-white opacity-90 hover:opacity-100 transition-opacity duration-200">
        Get Started
      </button>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}

export default Services;