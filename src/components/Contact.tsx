"use client"

import React, { useState } from "react";
import {
  AiFillSkype,
  AiFillLinkedin,
  AiFillYoutube,
  AiFillPhone,
  AiOutlineMail,
} from "react-icons/ai";
import { FaCheck, FaCopy } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import {apiURL} from "../custom/api"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

function Contact() {
  const [copied, setCopied] = useState({ skype: false, email: false, phone: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "Service Request",
    message: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyText = async (type:any, textToCopy:any) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors:any = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiURL}/submit-contact-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(true); 
        setFormData({ name: "", email: "", requestType: "Service Request", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-light dark:bg-gray-800 dark:text-gray-100" id="scrollToContact">
      <div className="w-[90%] dark:mt-0 mt-2 py-20 mx-auto flex justify-around items-start flex-wrap">
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
              <div className="flex justify-start items-center">
              <div className="pl-2">
                <span className="font-bold pr-2">Skype</span>
                ID-8c8b46fdad7744c2
              </div>
              <button
                      onClick={()=>handleCopyText("skype","8c8b46fdad7744c2")}
                      className="bg-transparent rounded-lg px-4"
                    >
                      {copied.skype ? <FaCheck color="gray"/> : <FaCopy color="gray"/>}
                    </button>
              </div>
            </div>
            <div className="flex justify-left items-center">
              <div>
                <AiOutlineMail size="20" />
              </div>
              <div className="flex justify-start items-center">

              <div className="pl-2 py-3">
              
                <span className="font-bold pr-2">Email</span>
                masood@cwmservices.dev
              </div>
              <button
                      onClick={()=>handleCopyText("email","masood@cwmservices.dev")}
                      className="bg-transparent rounded-lg px-4"
                    >
                      {copied.email ? <FaCheck color="gray"/> : <FaCopy color="gray"/>}
                    </button>
              </div>
            </div>
            <div className="flex justify-left items-center">
              <div>
                <AiFillPhone size="20" />
              </div>
              <div className="flex justify-start items-center">

              <div className="pl-2">
                <span className="font-bold pr-2">Phone</span>+92 3319272285
              </div>
              <button
                      onClick={()=>handleCopyText("phone","+92 3319272285")}
                      className="bg-transparent rounded-lg px-4"
                    >
                      {copied.phone ? <FaCheck color="gray"/> : <FaCopy color="gray"/>}
                    </button>
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
                className="hover:text-gray-700 dark:text-gray-200 dark:hover:text-white cursor-pointer
            "
              />
            </a>
            <a href="https://www.youtube.com/@CodeWithMasood" target="_blank">
              <AiFillYoutube
                size="30"
                className="hover:text-gray-700 dark:text-gray-200 dark:hover:text-white cursor-pointer"
              />
            </a>
            <a href="https://www.linkedin.com/in/cwmservices" target="_blank">
              <AiFillLinkedin
                size="30"
                className="hover:text-gray-700 dark:text-gray-200 dark:hover:text-white cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="lg:w-[35%]">
          {/* Left side content (unchanged) */}
        </div>
        <div className="lg:w-[30%] w-full lg:mt-0 mt-10 dark:bg-gray-700 dark:text-gray-100 bg-white p-6 shadow-xl">
          <h3 className="py-2 font-bold text-xl text-primary">
            Let's Connect.
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-left flex-wrap">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={`input dark:bg-gray-800 input-bordered my-2 w-full ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Contact Email"
              className={`input dark:bg-gray-800 input-bordered my-2 w-full ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleInputChange}
              className="select dark:bg-gray-800 select-bordered w-full my-2"
            >
              <option>Service Request</option>
              <option>Career Opportunity</option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Request Details"
              className={`resize-none dark:bg-gray-800 textarea textarea-bordered my-2 textarea-lg w-full ${errors.message ? 'border-red-500' : ''}`}
            ></textarea>
            {errors.message && <p className="text-red-500 mb-4 text-xs">{errors.message}</p>}

            <button 
              type="submit" 
              className="btn bg-primary hover:bg-yellow-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Thank You!</h2>
          <p className="mb-6 text-gray-700">
         
            Your message has been sent successfully. We'll get back to you via the provided email as soon as possible.
          </p>
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition duration-200 ease-in-out"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Contact;