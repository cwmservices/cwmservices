import React from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillPhone,
  AiFillSkype,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineMail,
} from "react-icons/ai";
import { FaQuora } from "react-icons/fa";

import { MdFace, MdFacebook } from "react-icons/md";

function Contact() {
  return (
    <div className="bg-light" id="scrollToContact">
      <div className="w-[90%] mt-2 py-20 mx-auto flex justify-around items-center flex-wrap">
        <div className="lg:w-[35%]">
          <h1 className="text-primary font-primary font-bold text-2xl lg:text-5xl">
            <span className="border-b pb-2">Get in Tou</span>ch
          </h1>
          <p className="pt-10">
            We enjoy partnering with companies that share our vision of
            enhancing their online presence.
            <br />
            <br />
            Let us turn your aspirations into our objectives by bringing your
            company&apos;s vision to reality through cutting-edge digital
            solutions. At CWMServices, we embrace limitless possibilities and
            are committed to providing your company with the competitive
            advantage to achieve its maximum digital potential. We offer web,
            app, UI/UX, and WordPress services to simplify your online
            experience.
          </p>
          <div className="my-6">
            <div className="flex justify-left items-center">
              <div>
                <AiFillSkype size="20" />
              </div>
              <div className="pl-2">
                <span className="font-bold pr-2">Skype</span>
                ID-8c8b46fdad7744c2
              </div>
            </div>
            <div className="flex justify-left items-center">
              <div>
                <AiOutlineMail size="20" />
              </div>
              <div className="pl-2 py-3">
                <span className="font-bold pr-2">Email</span>
                cwmservicesofficial@gmail.com
              </div>
            </div>
            <div className="flex justify-left items-center">
              <div>
                <AiFillPhone size="20" />
              </div>
              <div className="pl-2">
                <span className="font-bold pr-2">Phone</span>+92 3319272285
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-64">
            <h4 className="pr-3 font-bold font-primary text-lg text-primary">
              Keep in Touch
            </h4>
            <a
              href="https://www.facebook.com/MasoodUrRehmanOfficial"
              target="_blank"
            >
              <MdFacebook
                size="32"
                className="hover:text-gray-700 cursor-pointer
            "
              />
            </a>
            <a href="https://www.twitter.com/cwmservices" target="_blank">
              <AiFillTwitterCircle
                size="30"
                className="hover:text-gray-700 cursor-pointer"
              />
            </a>
            <a href="https://www.linkedin.com/in/cwmservices" target="_blank">
              <AiFillLinkedin
                size="30"
                className="hover:text-gray-700 cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="lg:w-[30%] w-full lg:mt-0 mt-10 bg-white p-6 shadow-xl">
          <h3 className="py-2 font-bold text-xl text-primary">
            Let&apos;s Work Togather.
          </h3>
          <div className="flex flex-col justify-center items-left flex-wrap">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered my-2 w-full"
            />
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered my-2 w-full"
            />
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full my-2"
            />
            <textarea
              placeholder="Your Message"
              className="resize-none textarea textarea-bordered my-2 textarea-lg w-full"
            ></textarea>
            <button className="btn bg-primary hover:bg-secondory text-white">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
