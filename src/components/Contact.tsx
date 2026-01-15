"use client"

import React, { useState, useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-8 max-w-md w-full transform transition-all animate-scaleIn">
        {children}
      </div>
    </div>
  );
};
//updated
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
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 254) {
      newErrors.email = "Email is too long";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = "Message must be less than 2000 characters";
    }
    
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
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/portfolio', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          requestType: formData.requestType,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setIsModalOpen(true);
        setFormData({ name: "", email: "", requestType: "Service Request", message: "" });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setIsModalOpen(true);
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 py-20"
      id="scrollToContact"
    >
      <div className="w-[90%] max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-primary font-primary font-bold text-3xl lg:text-5xl mb-4">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            We enjoy partnering with companies that share our vision of enhancing their online presence.
            Let's turn your ideas into powerful digital solutions. <span className="font-bold">masood@cwmservices.dev</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 text-gray-800 dark:text-gray-200 md:grid-cols-2 gap-6"
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`input w-full bg-gray-100 dark:bg-gray-800 input-bordered transition-all ${
                  errors.name ? "border-red-500 shake" : ""
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 animate-slideDown">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className={`input w-full text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 input-bordered transition-all ${
                  errors.email ? "border-red-500 shake" : ""
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 animate-slideDown">{errors.email}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isSubmitting}
                  className={`w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span>{formData.requestType}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg animate-slideDown">
                    <div
                      onClick={() => {
                        setFormData({ ...formData, requestType: "Service Request" });
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                    >
                      Service Request
                    </div>
                    <div
                      onClick={() => {
                        setFormData({ ...formData, requestType: "Career Opportunity" });
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                    >
                      Career Opportunity
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project..."
                className={`textarea textarea-bordered w-full h-40 resize-none bg-gray-100 dark:bg-gray-800 transition-all ${
                  errors.message ? "border-red-500 shake" : ""
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 animate-slideDown">{errors.message}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                {formData.message.length}/2000 characters
              </p>
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-lg px-8 py-3 bg-primary duration-200 opacity-90 hover:opacity-100 text-white transition-all ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-8 text-center">
          {submitStatus === 'success' ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Message Sent Successfully!</h2>
              <p className="mb-6 text-gray-700 dark:text-white">
                Thank you for reaching out! We've received your message and will get back to you within 24-48 hours.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-red-600">Oops! Something went wrong</h2>
              <p className="mb-6 text-gray-700 dark:text-white">
                We couldn't send your message. Please try again or contact us directly at <strong>masood@cwmservices.dev</strong>
              </p>
            </>
          )}
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-primary text-white rounded-lg opacity-90 duration-200 hover:opacity-100 transition"
          >
            Close
          </button>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Contact;