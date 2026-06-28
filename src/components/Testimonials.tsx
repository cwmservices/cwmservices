"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const scrollTestimonials: any = useRef();

  const fetchProjects = async () => {
    const testimonialsJSON = await fetch(
      "/api/portfolio"
    );
    const testimonialsData = await testimonialsJSON.json();
    setTestimonials(testimonialsData.Testimonials);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <style jsx>{`
        /* ── Card hover glow — mirrors header shadow-glow-sm ── */
        .testimonial-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(240, 135, 0, 0.2),
                      0 8px 32px rgba(240, 135, 0, 0.12),
                      0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        /* Hide scrollbar for standard webkit */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <section
        className="bg-light dark:bg-dark transition-colors duration-300 relative py-10 sm:py-10 lg:py-10 xl:py-10"
      >
        <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">
          <div id="testimonials" className="py-14 relative scroll-mt-24">
            <motion.h1
              className="text-center text-3xl lg:text-5xl font-display font-bold text-ink dark:text-ink-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              What O<span className="border-b pb-3 text-primary border-primary">ur Clie</span>nts Say
            </motion.h1>
            <motion.p
              className="text-center font-body text-lg px-4 lg:text-xl mt-6 lg:mt-10 text-ink-muted dark:text-ink-dark-muted"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              Hear from our clients around the world
            </motion.p>

            {/* Navigation buttons */}
            <div className="hidden md:flex absolute right-0 bottom-0 flex-row gap-3 z-40">
              <button
                onClick={() => scrollTestimonials.current.scrollBy({ left: -360, behavior: "smooth" })}
                className="bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 text-ink-muted dark:text-ink-dark-muted hover:text-primary dark:hover:text-primary transition-all duration-300 shadow-sm rounded-full p-3 flex items-center justify-center group"
              >
                <AiFillCaretLeft size={20} className="transition-colors group-hover:text-primary" />
              </button>
              <button
                onClick={() => scrollTestimonials.current.scrollBy({ left: 360, behavior: "smooth" })}
                className="bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 text-ink-muted dark:text-ink-dark-muted hover:text-primary dark:hover:text-primary transition-all duration-300 shadow-sm rounded-full p-3 flex items-center justify-center group"
              >
                <AiFillCaretRight size={20} className="transition-colors group-hover:text-primary" />
              </button>
            </div>
          </div>

          <div className="flex relative lg:flex-nowrap flex-wrap justify-center items-center w-full">
            <div
              ref={scrollTestimonials}
              className="flex overflow-x-auto w-full items-stretch no-scrollbar gap-5 lg:gap-6 pb-12 pt-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: "none" }}
            >
              {testimonials.map((Testimonial: any, i: number) => (
                <motion.blockquote
                  key={Testimonial.id}
                  className="testimonial-card flex-none snap-center sm:snap-start items-start flex flex-col justify-between w-[85vw] sm:w-[340px] md:w-[400px] lg:w-[420px] bg-surface dark:bg-surface-dark-muted border border-border-light dark:border-border-dark rounded-2xl cursor-pointer px-6 md:px-8 py-8 md:py-10 relative h-auto"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: Math.min(i * 0.07, 0.35) }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex justify-between items-start w-full mb-6">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, idx) => (
                        <AiFillStar key={idx} className="text-primary" size={22} />
                      ))}
                    </div>
                    <img
                      src={Testimonial.origin}
                      alt="origin"
                      className="h-8 object-contain opacity-90 drop-shadow-sm dark:brightness-110"
                    />
                  </div>

                  <p className="font-body text-ink-muted dark:text-ink-dark-muted text-[14.5px] sm:text-[15px] lg:text-[15.5px] leading-relaxed flex-grow">
                    "{Testimonial.testimonial}"
                  </p>

                  <footer className="mt-8 flex items-center gap-3 w-full border-t border-border-light dark:border-border-dark pt-5">
                    <span className="font-display font-semibold text-ink dark:text-ink-dark flex-grow">
                      {Testimonial.name}
                    </span>
                    <img
                      src={Testimonial.country}
                      alt="Country flag"
                      className="w-7 h-7 object-cover rounded-full shadow-sm"
                    />
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
