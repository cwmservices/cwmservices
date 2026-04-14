"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

function Services() {
  const services = [
    {
      id: "web-development",
      title: "Web Development",
      image: "/webdev.jpg",
      shortDesc:
        "Building Full Stack Professional and Responsive Websites and Web Applications.",
      longDesc:
        "We specialize in creating cutting-edge web solutions that drive business growth. Our full-stack development expertise covers everything from interactive front-end interfaces to robust back-end systems. Whether you need a corporate website, e-commerce platform, or custom web application, we deliver scalable, secure, and high-performance solutions tailored to your unique requirements.",
      technologies: ["React", "Node", "Tailwind", "PostgreSQL", "Next.js", "MongoDB", "Express", "TypeScript"],
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      image: "/appdev.jpg",
      shortDesc: "Building Full Stack Android and IOS Mobile Applications.",
      longDesc:
        "Transform your ideas into powerful mobile experiences. We develop native and cross-platform mobile applications that engage users and deliver exceptional performance. From concept to deployment, our team ensures your app stands out in the crowded app marketplace with intuitive design, seamless functionality, and optimal user experience across all devices.",
      technologies: ["React Native", "Firebase", "Node", "Tailwind", "Redux", "REST APIs", "Push Notifications", "App Store Optimization"],
    },
    {
      id: "ui-ux",
      title: "UI/UX",
      image: "/uiux.jpg",
      shortDesc: "Building UI/UX of Both Web and Mobile Applications.",
      longDesc:
        "Great design is invisible. We create user interfaces that are not only visually stunning but also intuitive and user-friendly. Our design process focuses on understanding your users' needs and behaviors to craft experiences that delight and convert. From wireframes to high-fidelity prototypes, we ensure every pixel serves a purpose.",
      technologies: ["Figma", "Zeplin", "Adobe XD", "Sketch", "InVision", "User Research", "Wireframing", "Prototyping"],
    },
    {
      id: "wordpress",
      title: "WordPress",
      image: "/wordpress.jpg",
      shortDesc:
        "Creating WordPress Websites Ranging From Business Websites To Fully Functioning E-commerce Stores.",
      longDesc:
        "Leverage the power of WordPress with our expert development services. We build custom WordPress solutions that are easy to manage, SEO-friendly, and conversion-optimized. Whether you need a simple blog, corporate website, or a complete e-commerce store, we provide solutions that empower you to manage your content with ease while maintaining professional quality.",
      technologies: ["Elementor", "Woocommerce", "Astra", "ACF", "Yoast SEO", "Custom Themes", "Plugin Development", "WP Security"],
    },
    {
      id: "ai-integration",
      title: "AI Agent Development",
      image: "/ai.jpg",
      shortDesc: "We build and integrate AI Agents for modern web and mobile app systems.",
      longDesc:
        "Step into the future with AI-powered solutions. We integrate cutting-edge artificial intelligence and machine learning capabilities into your applications to automate workflows, enhance user experiences, and unlock valuable insights from your data. From chatbots to predictive analytics, we help you harness the power of AI to stay ahead of the competition.",
      technologies: ["OpenAI", "Gemini", "TensorFlow", "PyTorch", "n8n", "LangChain", "Machine Learning", "Neural Networks"],
    },
    {
      id: "collaboration",
      title: "Collaboration",
      image: "/collaboration.jpg",
      shortDesc:
        "Want to promote your brand with actual audience who are actually interested in coding?",
      longDesc:
        "Expand your reach and connect with a highly engaged tech-savvy audience. We offer collaboration opportunities across multiple platforms to help you promote your brand, products, or services to developers and tech enthusiasts. Our authentic content and established community ensure your message reaches the right people at the right time.",
      technologies: ["YouTube", "Medium", "Instagram", "Twitter", "LinkedIn", "Content Marketing", "Brand Partnerships", "Influencer Marketing"],
    },
  ];

  return (
    <>
      <style jsx>{`
        /* ── Card hover glow — mirrors header shadow-glow-sm ── */
        .service-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(240, 135, 0, 0.2),
                      0 8px 32px rgba(240, 135, 0, 0.12),
                      0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* ── Image zoom mirrors header logo hover ── */
        .service-img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card:hover .service-img {
          transform: scale(1.05);
        }

        /* ── Title colour transition on hover ── */
        .service-title {
          transition: color 0.2s ease;
        }
        .service-card:hover .service-title {
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
        .card-animate:nth-child(1) { animation-delay: 0.05s; }
        .card-animate:nth-child(2) { animation-delay: 0.12s; }
        .card-animate:nth-child(3) { animation-delay: 0.19s; }
        .card-animate:nth-child(4) { animation-delay: 0.26s; }
        .card-animate:nth-child(5) { animation-delay: 0.33s; }
        .card-animate:nth-child(6) { animation-delay: 0.40s; }

        /* ── Arrow icon transition ── */
        .arrow-icon {
          transition: transform 0.2s ease;
        }
        .service-card:hover .arrow-icon {
          transform: translate(2px, -2px);
        }
      `}</style>

      <section
        id="services"
        className="bg-light dark:bg-dark transition-colors duration-300 relative py-16 sm:py-20 lg:py-24 xl:py-20"
      >
        <span id="scrollToServices" />

        {/* ── Single shared container — same as header ── */}
        <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">

          <div className="py-14">

            <span id="scrollToServices"></span>
            <h1
              id="scrollToElement"
              className="text-center text-3xl lg:text-5xl font-bold dark:text-gray-100"
            >
              Wh<span className="border-b pb-3 text-primary border-primary">at We</span> Do
            </h1>
            <p className="text-center text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-gray-600 dark:text-gray-300">

              Transforming your business processes for the digital future.
            </p>
          </div>

          {/* ── Services Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 xl:gap-8 2xl:gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card card-animate group relative flex flex-col bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark rounded-2xl overflow-hidden"
              >
                {/* ── Image ── */}
                <div className="relative w-full overflow-hidden bg-surface-muted dark:bg-dark"
                  style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 28vw"
                    className="service-img object-cover"
                  />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* ── Card Body ── */}
                <div className="p-5 sm:p-6 xl:p-7 2xl:p-8 flex flex-col flex-grow">

                  {/* Title row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="focus:outline-none cursor-pointer min-w-0">
                      <h3 className="service-title font-display font-semibold text-lg sm:text-xl lg:text-[1.25rem] xl:text-[1.375rem] text-ink dark:text-ink-dark leading-snug">
                        {service.title}
                      </h3>
                    </span>

                  </div>

                  {/* Short description */}
                  <p className="font-body text-ink-muted dark:text-ink-dark-muted text-[13.5px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] leading-relaxed mb-5 sm:mb-6 xl:mb-7 flex-grow">
                    {service.shortDesc}
                  </p>

                  {/* ── Footer: tech pills + arrow ── */}
                  <div className="flex items-end justify-between gap-3 mt-auto">
                    {/* Tech chips — max 4 visible */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 min-w-0">
                      {service.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="font-body text-[10.5px] sm:text-[11.5px] xl:text-[12.5px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-muted dark:bg-dark text-ink-muted dark:text-ink-dark-muted border border-border-light dark:border-border-dark whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>{/* end grid */}
        </div>{/* end shared container */}
      </section >
    </>
  );
}

export default Services;