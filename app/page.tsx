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

export default function Home() {
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
