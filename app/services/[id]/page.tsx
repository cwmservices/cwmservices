"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function ServicePage({ params }: { params: { id: string } }) {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const servicesJSON = await fetch("/api/portfolio");
      const data = await servicesJSON.json();
      setServicesData(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-gray-800 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl dark:text-white">Loading...</p>
        </div>
      </div>
    );
  }

  const service = servicesData.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
    
    <div className="min-h-screen dark:bg-gray-800 bg-gray-100 dark:text-gray-100">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl font-light">
            {service.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {service.longDesc}
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-16">
       <div className="max-w-5xl mx-auto px-4 pb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Technologies We Use
        </h2>
        <div className="w-32 h-0.5 bg-primary mx-auto mb-8"></div>
        
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {service.technologies.map((tech:any, index:any) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                {tech.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8">
            Let's bring your vision to life with our {service.title.toLowerCase()} expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:opacity-100 opacity-90 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/all-services"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>

  );
}