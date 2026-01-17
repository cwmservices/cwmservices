import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

  const services = [
    {
      id: "web-development",
      title: "Web Development",
      image: "/webdev.jpg",
      shortDesc: "Building Full Stack Professional and Responsive Websites and Web Applications.",
      longDesc: "We specialize in creating cutting-edge web solutions that drive business growth. Our full-stack development expertise covers everything from interactive front-end interfaces to robust back-end systems. Whether you need a corporate website, e-commerce platform, or custom web application, we deliver scalable, secure, and high-performance solutions tailored to your unique requirements.",
      technologies: ["React", "Node", "Tailwind", "PostgreSQL", "Next.js", "MongoDB", "Express", "TypeScript"]
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      image: "/appdev.jpg",
      shortDesc: "Building Full Stack Android and IOS Mobile Applications.",
      longDesc: "Transform your ideas into powerful mobile experiences. We develop native and cross-platform mobile applications that engage users and deliver exceptional performance. From concept to deployment, our team ensures your app stands out in the crowded app marketplace with intuitive design, seamless functionality, and optimal user experience across all devices.",
      technologies: ["React Native", "Firebase", "Node", "Tailwind", "Redux", "REST APIs", "Push Notifications", "App Store Optimization"]
    },
    {
      id: "ui-ux",
      title: "UI/UX",
      image: "/uiux.jpg",
      shortDesc: "Building UI/UX of Both Web and Mobile Applications.",
      longDesc: "Great design is invisible. We create user interfaces that are not only visually stunning but also intuitive and user-friendly. Our design process focuses on understanding your users' needs and behaviors to craft experiences that delight and convert. From wireframes to high-fidelity prototypes, we ensure every pixel serves a purpose.",
      technologies: ["Figma", "Zeplin", "Adobe XD", "Sketch", "InVision", "User Research", "Wireframing", "Prototyping"]
    },
    {
      id: "wordpress",
      title: "WordPress",
      image: "/wordpress.jpg",
      shortDesc: "Creating WordPress Websites Ranging From Business Websites To Fully Functioning E-commerce Stores.",
      longDesc: "Leverage the power of WordPress with our expert development services. We build custom WordPress solutions that are easy to manage, SEO-friendly, and conversion-optimized. Whether you need a simple blog, corporate website, or a complete e-commerce store, we provide solutions that empower you to manage your content with ease while maintaining professional quality.",
      technologies: ["Elementor", "Woocommerce", "Astra", "ACF", "Yoast SEO", "Custom Themes", "Plugin Development", "WP Security"]
    },
    {
      id: "ai-integration",
      title: "AI Agent Development",
      image: "/ai.jpg",
      shortDesc: "We build and integrate AI Agents for modern web and mobile app systems.",
      longDesc: "Step into the future with AI-powered solutions. We integrate cutting-edge artificial intelligence and machine learning capabilities into your applications to automate workflows, enhance user experiences, and unlock valuable insights from your data. From chatbots to predictive analytics, we help you harness the power of AI to stay ahead of the competition.",
      technologies: ["OpenAI", "Gemini", "TensorFlow", "PyTorch", "n8n", "LangChain", "Machine Learning", "Neural Networks"]
    },
    {
      id: "collaboration",
      title: "Collaboration",
      image: "/collaboration.jpg",
      shortDesc: "Want to promote your brand with actual audience who are actually interested in coding?",
      longDesc: "Expand your reach and connect with a highly engaged tech-savvy audience. We offer collaboration opportunities across multiple platforms to help you promote your brand, products, or services to developers and tech enthusiasts. Our authentic content and established community ensure your message reaches the right people at the right time.",
      technologies: ["YouTube", "Medium", "Instagram", "Twitter", "LinkedIn", "Content Marketing", "Brand Partnerships", "Influencer Marketing"]
    }
  ];





function page() {
  return (<>
    <Header/>
     <div className="dark:bg-gray-800 bg-gray-100 dark:text-gray-100">
 
   
      <div className="flex text-gray-800 flex-wrap justify-between gap-6 py-10 w-[90%] mx-auto">
        {services.map((service) => (
          <div key={service.id} className="card w-full sm:w-[300px] lg:w-[350px] md:my-2 my-0 xl:w-[400px] shadow-xl group">
            <figure className="overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={service?.id=='ai-integration'?270:250}
                className={`w-full ${service?.id=='ai-integration'?'h-[270px]':'h-auto'} object-cover transition-transform duration-300 group-hover:scale-110`}
              />
            </figure>
            <div className="card-body rounded-b-xl dark:bg-gray-700 bg-white dark:text-white">
              <Link href={`/services/${service.id}`}>
                <h2 className="card-title cursor-pointer hover:text-orange-500 transition-colors duration-200">
                  {service.title}
                  <div className="badge badge-secondary text-white bg-orange-500 border-orange-400">
                    Service
                  </div>
                </h2>
              </Link>
              <p>{service.shortDesc}</p>
              <div className="card-actions justify-end flex-wrap gap-2">
                {service.technologies.slice(0, 4).map((tech, index) => (
                  <div key={index} className="badge badge-outline">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default page