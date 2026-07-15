"use client"

import Banner from "@/src/components/Banner";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Members from "@/src/components/Members";
import PageLoader from "@/src/components/PageLoader";
import Projects from "@/src/components/Projects";
import Services from "@/src/components/Services";
import Testimonials from "@/src/components/Testimonials";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ClipLoader } from 'react-spinners';

export default function Home() {





  // updated version 2.0 with new node version and awesome UI
  return (
    <main>
      {/* <PageLoader isLoading={isLoading} /> */}
      <Header />
      <Banner />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />

      <Footer />
    </main>
  );
}
