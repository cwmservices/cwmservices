"use client"

import React, { useState, useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] animate-fadeIn">
      <div className="bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark rounded-2xl p-8 max-w-md w-full transform transition-all animate-scaleIn shadow-2xl mx-4">
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
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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
    <section
      id="contact"
      className="bg-light dark:bg-dark transition-colors duration-300 relative pb-20 sm:pb-20 lg:pb-20 xl:pb-20"
    >
      <span id="scrollToContact"></span>
      <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">
        <div className="text-center mb-3 py-14">
          <h1 className="text-center text-3xl lg:text-5xl font-display font-bold text-ink dark:text-ink-dark">
            Ge<span className="border-b pb-3 text-primary border-primary">t In Tou</span>ch
          </h1>
          <p className="max-w-2xl mx-auto font-body text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-ink-muted dark:text-ink-dark-muted">
            We enjoy partnering with companies that share our vision of enhancing their online presence.
            Let's turn your ideas into powerful digital solutions. <span className="font-semibold text-ink dark:text-ink-dark">masood@cwmservices.dev</span>
          </p>
        </div>

        <div className="bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-6 sm:p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden group">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`w-full font-body text-ink dark:text-ink-dark bg-surface-muted dark:bg-dark border border-border-light dark:border-border-dark rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.name ? "border-red-500 shake" : ""} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 font-body text-xs mt-2 ml-1 animate-slideDown">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className={`w-full font-body text-ink dark:text-ink-dark bg-surface-muted dark:bg-dark border border-border-light dark:border-border-dark rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.email ? "border-red-500 shake" : ""} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 font-body text-xs mt-2 ml-1 animate-slideDown">{errors.email}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isSubmitting}
                  className={`w-full font-body text-ink dark:text-ink-dark bg-surface-muted dark:bg-dark border border-border-light dark:border-border-dark rounded-xl px-5 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span>{formData.requestType}</span>
                  <svg
                    className={`w-5 h-5 text-ink-muted dark:text-ink-dark-muted transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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
                  <div className="absolute z-20 w-full mt-2 bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-xl overflow-hidden animate-slideDown">
                    <div
                      onClick={() => {
                        setFormData({ ...formData, requestType: "Service Request" });
                        setIsDropdownOpen(false);
                      }}
                      className="px-5 py-4 font-body text-ink dark:text-ink-dark hover:bg-surface-muted dark:hover:bg-dark cursor-pointer transition-colors"
                    >
                      Service Request
                    </div>
                    <div
                      onClick={() => {
                        setFormData({ ...formData, requestType: "Career Opportunity" });
                        setIsDropdownOpen(false);
                      }}
                      className="px-5 py-4 font-body text-ink dark:text-ink-dark hover:bg-surface-muted dark:hover:bg-dark cursor-pointer transition-colors border-t border-border-light dark:border-border-dark"
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
                className={`w-full h-40 font-body text-ink dark:text-ink-dark bg-surface-muted dark:bg-dark border border-border-light dark:border-border-dark rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.message ? "border-red-500 shake" : ""} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 font-body text-xs mt-2 ml-1 animate-slideDown">{errors.message}</p>
              )}
              <p className="font-body text-xs text-ink-muted dark:text-ink-dark-muted mt-2 text-right">
                {formData.message.length}/2000 characters
              </p>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto rounded-xl px-10 py-4 bg-primary text-white font-display font-semibold transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
        <div className="text-center font-body">
          {submitStatus === 'success' ? (
            <>
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold mb-4 text-ink dark:text-ink-dark">Message Sent!</h2>
              <p className="mb-8 text-ink-muted dark:text-ink-dark-muted leading-relaxed">
                Thank you for reaching out! We've received your message and will get back to you within 24-48 hours.
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold mb-4 text-ink dark:text-ink-dark">Oops! Submission Failed</h2>
              <p className="mb-8 text-ink-muted dark:text-ink-dark-muted leading-relaxed">
                We couldn't send your message. Please try again or contact us directly at <strong className="text-ink dark:text-ink-dark">masood@cwmservices.dev</strong>
              </p>
            </>
          )}
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-8 py-3 bg-surface-muted dark:bg-dark text-ink dark:text-ink-dark border border-border-light dark:border-border-dark rounded-xl font-display font-medium hover:bg-surface dark:hover:bg-surface-dark transition-colors"
          >
            Close Window
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
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .shake {
          animation: shake 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Contact;