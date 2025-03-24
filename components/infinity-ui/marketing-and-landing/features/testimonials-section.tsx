"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Linkedin,
  User2,
} from "lucide-react";
import Image from "next/image";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      content:
        "This platform completely transformed our workflow. The intuitive design and powerful features have boosted our team's productivity by at least 40%. I can't imagine going back to our old systems.",
      author: "Alexandra Chen",
      position: "CTO at TechNova",
      rating: 5,
      image: "/images/default-avatar.png",
      social: {
        twitter: "alexchen",
        linkedin: "alexandra-chen",
      },
      color: "from-violet-500 to-indigo-500",
    },
    {
      content:
        "The attention to detail in this product is remarkable. Every feature feels thoughtfully designed and implemented. Our customers have noticed the improved experience, and our satisfaction ratings have never been higher.",
      author: "Marcus Williams",
      position: "Product Director at Elevate",
      rating: 5,
      image: "/images/default-avatar.png",
      social: {
        twitter: "marcusw",
        linkedin: "marcus-williams",
      },
      color: "from-emerald-500 to-teal-500",
    },
    {
      content:
        "I've used many similar tools before, but this one stands out for its performance and reliability. The support team is also exceptional - they solved our complex integration challenges within hours.",
      author: "Sophia Rodriguez",
      position: "Engineering Lead at Apex",
      rating: 4,
      image: "/images/default-avatar.png",
      social: {
        twitter: "sophiar",
        linkedin: "sophia-rodriguez",
      },
      color: "from-amber-500 to-orange-500",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-b from-violet-100/40 to-transparent blur-3xl dark:from-violet-900/20 dark:to-transparent"></div>
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-gradient-to-t from-indigo-100/40 to-transparent blur-3xl dark:from-indigo-900/20 dark:to-transparent"></div>

        <svg
          className="absolute inset-0 h-full w-full opacity-30 dark:opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#grid-pattern)"
          />
        </svg>

        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-violet-300/20 to-indigo-300/20 blur-3xl dark:from-violet-900/10 dark:to-indigo-900/10"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-300/20 to-violet-300/20 blur-3xl dark:from-indigo-900/10 dark:to-violet-900/10"></div>

        {/* Floating quote marks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-indigo-500/10 dark:text-indigo-500/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${3 + Math.random() * 4}rem`,
              transform: `rotate(${Math.random() * 40 - 20}deg)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? {
                    opacity: 0.5 + Math.random() * 0.5,
                    y: 0,
                  }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1 + Math.random() * 2,
              delay: Math.random() * 1,
              ease: "easeOut",
            }}
          >
            &quot;
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-3 py-1 text-sm font-medium text-violet-600 dark:from-violet-500/20 dark:to-indigo-500/20 dark:text-violet-400">
            Client Success Stories
          </span>
          <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
            People love what we do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Discover why thousands of customers trust our platform to achieve
            their goals.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 dark:from-violet-500/10 dark:to-indigo-500/10"></div>
                <div className="relative z-10 grid grid-cols-1 gap-8 p-8 md:p-12 lg:grid-cols-5">
                  <div className="flex flex-col justify-center lg:col-span-3">
                    <div className="mb-8 flex">
                      <div className="relative">
                        <div
                          className={`absolute -inset-1.5 rounded-full bg-gradient-to-r ${testimonials[activeIndex].color} opacity-70 blur-sm`}
                        ></div>
                        <div className="relative rounded-full bg-white p-1 dark:bg-gray-800">
                          <Quote className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                    </div>

                    <blockquote className="mb-6 text-2xl font-medium italic leading-relaxed text-gray-900 dark:text-white md:text-3xl">
                      &quot;{testimonials[activeIndex].content}&quot;
                    </blockquote>

                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center">
                      <div className="flex gap-2">
                        <button
                          onClick={prevTestimonial}
                          className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={nextTestimonial}
                          className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>

                      <div className="ml-4 flex items-center gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                              index === activeIndex
                                ? "scale-125 bg-indigo-600 dark:bg-indigo-400"
                                : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="relative h-full">
                      <div className="absolute -inset-4 -rotate-2 transform rounded-3xl bg-gradient-to-r from-violet-500/20 to-indigo-500/20 blur-xl"></div>
                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                        <div
                          className={`h-24 bg-gradient-to-r ${testimonials[activeIndex].color}`}
                        >
                          <div className="absolute left-1/2 top-16 -translate-x-1/2 transform rounded-full bg-white p-1.5 dark:bg-gray-800">
                            <div
                              className={`h-24 w-24 rounded-full bg-gradient-to-r ${testimonials[activeIndex].color} p-1`}
                            >
                              <div className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-gray-800">
                                {testimonials[activeIndex].image ? (
                                  <Image
                                    src={
                                      testimonials[activeIndex].image ||
                                      "/images/default-avatar.png"
                                    }
                                    alt={testimonials[activeIndex].author}
                                    width={80}
                                    height={80}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    <User2 className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6 pt-20">
                          <div className="text-center">
                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                              {testimonials[activeIndex].author}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {testimonials[activeIndex].position}
                            </p>
                          </div>

                          <div className="mt-auto flex justify-center gap-4 pt-6">
                            {testimonials[activeIndex].social.twitter && (
                              <a
                                href={`https://twitter.com/${testimonials[activeIndex].social.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                              >
                                <Twitter className="h-5 w-5" />
                              </a>
                            )}
                            {testimonials[activeIndex].social.linkedin && (
                              <a
                                href={`https://linkedin.com/in/${testimonials[activeIndex].social.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                              >
                                <Linkedin className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-70 blur-lg transition-opacity group-hover:opacity-100"></div>
              <div className="relative rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="mb-4 flex items-center">
                  <Quote className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mb-4 text-gray-600 dark:text-gray-300">
                  &quot;The interface is beautifully designed and incredibly
                  intuitive. This tool has become an essential part of our daily
                  workflow.&quot;
                </blockquote>

                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                    <User2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Jamie Lewis
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Design Lead
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800">
            <Star className="mr-2 h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">
                4.9/5
              </span>{" "}
              from over 1,200 reviews
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {["Trustpilot", "G2", "Capterra", "ProductHunt", "AppSumo"].map(
              (platform, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      {platform.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {platform}
                  </span>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
