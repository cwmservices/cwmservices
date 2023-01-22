import Head from "next/head";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";

import { BsFillMoonStarsFill, BsFacebook } from "react-icons/bs";
import masood from "../public/masood.png";
import mobile from "../public/mobilelogo.png";
import design from "../public/figmalogo.png";
import web from "../public/weblogo.png";
import Image from "next/image";
import ecommerce from "../public/ecommerce.png";
import web2 from "../public/web2.png";
import web3 from "../public/web3.png";
import web4 from "../public/web4.png";
import web5 from "../public/web5.png";
import web6 from "../public/web6.png";
import { useEffect, useState, useRef } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const [testimonials, setTestimonials] = useState([]);
  const mobileversion = useRef();
  const [isClicked, setIsClicked] = useState(false);

  function handleResponsiveness(e) {
    mobileversion.current.style.display = "block";
    setIsClicked(true);
    if (isClicked) {
      mobileversion.current.style.display = "block";
      setIsClicked(false);
    } else {
      mobileversion.current.style.display = "none";
      setIsClicked(true);
    }
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://cwmservices.vercel.app/api/portfolio")
      .then((response) => response.json())
      .then((data) => setData(data["projects"]));
  }, []);

  useEffect(() => {
    fetch("https://cwmservices.vercel.app/api/portfolio")
      .then((response) => response.json())
      .then((data) => setTestimonials(data["testimonials"]));
  }, []);

  const formRef = useRef();
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_PRIVATE_KEY_FIRST,
        process.env.NEXT_PUBLIC_PRIVATE_KEY_SECOND,
        formRef.current,
        process.env.NEXT_PUBLIC_PRIVATE_KEY_THIRD
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    formRef.current.user_email.value = "";
    formRef.current.user_subject.value = "";
    formRef.current.message.value = "";
  };

  const [filterCategory, setFilterCategory] = useState(data);

  function filterProjects(type) {
    const newData = data.filter((project) => {
      return project.category === type;
    });
    setFilterCategory(newData);
  }

  const element = useRef(null);

  function scrollToSection() {
    if (element) {
      element.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>CWMSERVICES | Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-40">
        <section className="min-h-screen">
          {done && (
            <div className="alert px-8 py-6 bg-green-400 text-white flex justify-between rounded">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p>Great! Will start conversation soon!</p>
              </div>
              <button
                className="text-green-100 hover:text-white"
                onClick={() => setDone(!done)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <nav class="mobile-responsive-style bg-white border-gray-200 px-2 sm:px-4 py-5 rounded dark:bg-gray-900">
            <div class="container flex items-center mobile-navigation justify-between mx-auto">
              <li class="flex items-center dark:text-white">
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl"
                />
                <span class="pl-3 self-center text-xl font-burtons whitespace-nowrap dark:text-white">
                  CWMSERVICES
                </span>
              </li>
              <div class="flex md:order-2">
                <a
                  className="bg-gradient-to-r from-cyan-500 text- to-teal-500 text-white px-4 py-2 border-none rounded-md ml-8"
                  href="https://cwmservices.vercel.app/masoodresume.pdf"
                  target="blank"
                >
                  Resume
                </a>
                <button
                  onClick={(e) => handleResponsiveness(e)}
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  class="ml-3 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                ref={mobileversion}
                class="mobile-burgur items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-cta"
              >
                <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      aria-current="page"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => scrollToSection()}
                      href="#services"
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonails"
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="text-center p-10">
            <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-40 h-40 relative overflow-hidden mt-2 md:h-75 md:w-75">
              <Image src={masood} layout="fill" objectFit="cover" />
            </div>
            <h3 className="text-2xl pt-6 pb-2 text-teal-600 font-medium dark:text-teal-400 md:text-5xl">
              Masood Ur Rehman
            </h3>
            <h3 className="text-0xl py-2 dark:text-white md:text-2xl">
              Full Stack Developer & Designer.
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
              Expert full stack developer with a strong background in building
              and deploying web and mobile applications using cutting-edge
              technologies. Proven ability to deliver high-performance,
              scalable, and user-friendly solutions for diverse clients and
              industries.
            </p>
            <div className="text-5xl flex items-center justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
              <a
                target="blank"
                href="https://www.facebook.com/MasoodUrRehmanOfficial"
              >
                <BsFacebook size={40} />
              </a>
              <a target="blank" href="https://www.linkedin.com/in/cwmservices">
                <AiFillLinkedin />
              </a>
              <a target="blank" href="https://www.youtube.com/@CodeWithMasood">
                <AiFillYoutube />
              </a>
            </div>
          </div>
        </section>
        <section>
          <div>
            <h3
              ref={element}
              id="services"
              className="text-3xl text-center pt-6 pb-2 text-teal-600 font-medium dark:text-teal-400 md:text-5xl"
            >
              My Services
            </h3>
            <p className="text-md text-center text-e py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
              <Image src={web} width={100} height={100} />
              <h3 className="text-lg font-medium pt-8 pb-2  ">
                Web Development
              </h3>
              <p className="py-2">
                Creating fully functional website suited for your business.
              </p>
              <h4 className="py-4 text-teal-600">Technologies I Use</h4>

              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  React
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  90%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Next js
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Node js
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  MongoDB
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  75%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  SASS
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  70%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Git
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Firebase
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  MySQL
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Express js
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Wordpress
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
              <Image src={mobile} width={100} height={100} alt="" />
              <h3 className="text-lg font-medium pt-8 pb-2 ">
                App Development
              </h3>
              <p className="py-2">
                Do you have an idea for your next mobile app? Let&apos;s make it
                a reality.
              </p>
              <h4 className="py-4 text-teal-600">Technologies I Use</h4>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  React Native
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Node js
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  MongoDB
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  75%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Git
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Firebase
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  MySQL
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Express js
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Tailwind CSS
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  85%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
              <Image src={design} width={100} height={100} />
              <h3 className="text-lg font-medium pt-8 pb-2 ">
                UI/UX Designing
              </h3>
              <p className="py-2">
                Are you interested in creating a pixel perfect and minimalist
                design for your current project? Feel free to contact me.
              </p>
              <h4 className="py-4 text-teal-600">Design Tools I Use</h4>

              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Figma
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  80%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Adobe XD
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  60%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Illustrator
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  70%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-blue">
                  Canva
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  90%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10">
          <div id="projects">
            <h3 className="text-3xl text-center pt-14 pb-2 text-teal-600 font-medium dark:text-teal-400 md:text-5xl">
              Portfolio Projects
            </h3>
            <p className="text-md text-center text-e py-2 leading-8 text-gray-800 dark:text-gray-200">
              I have created many projects including E-Commerce and Chat
              Applications.
            </p>
            <ul className="flex py-10 justify-center dark:text-white">
              <button
                onClick={() => setFilterCategory(data)}
                className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                ALL
              </button>
              <button
                onClick={() => filterProjects("web")}
                className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Web
              </button>
              <button
                onClick={() => filterProjects("app")}
                className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Mobile
              </button>
              <button
                onClick={() => filterProjects("design")}
                className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Designs
              </button>
            </ul>
          </div>
          <div className="flex gap-5 flex-wrap justify-center py-10 lg:flex-wrap mobile-responsive">
            {filterCategory.map((item) => (
              <div className="card" key={item.name}>
                <Image src={item.image} layout="fill" alt="E-Commerce Image" />
                <div className="card-overlay">
                  <h3 className="text-lg text-center bg-white font-medium pt-2 pb-2">
                    {item.title}
                  </h3>
                  <div className="card-buttons">
                    <button className="card-button font-burtons">
                      <a href={item.code} target="blank">
                        Code
                      </a>
                    </button>
                    <button className="card-button font-burtons">
                      <a href={item.demo} target="blank">
                        Demo
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white">
          <div
            id="testimonails"
            className="mx-auto text-center max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
          >
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Read trusted reviews from my customers
              </h2>

              <p className="text-gring-offset-warm-gray-500 mx-auto mt-4 max-w-lg">
                I have had the pleasure of working with many clients on several
                projects including freelance coding projects, sponserships and
                teaching. I found potential clients with great communication and
                nice motivation towards quality work done.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
              {testimonials.map((testimon) => (
                <div key={testimon.title}>
                  <Image
                    width={100}
                    height={100}
                    alt="testimonial image"
                    src={testimon.image_url}
                    className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
                  />

                  <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
                    <p className="text-lg font-bold text-gray-700">
                      {testimon.name}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-500">
                      {testimon.title}
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                      {testimon.text}
                    </p>

                    <div className="mt-8 flex justify-center gap-0.5 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900">
          <div
            id="contact"
            className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md"
          >
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Let&apos;s Discuss Your Project
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              Got an idea? Want to make it happen? Need any web development and
              programming help? Let us know.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="john@gmail.com"
                  required
                  name="user_email"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Let us know how we can help you"
                  required
                  name="user_subject"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  name="message"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leave a message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 text- to-teal-500 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary"
              >
                Send message
              </button>
            </form>
          </div>
        </section>

        <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                cwmservices™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a
                target="blank"
                href="https://www.facebook.com/MasoodUrRehmanOfficial"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <BsFacebook />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                target="blank"
                href="https://www.youtube.com/@CodeWithMasood"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <AiFillYoutube />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                target="blank"
                href="https://www.linkedin.com/in/cwmservices"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <AiFillLinkedin />
                <span className="sr-only">Linkedin</span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
