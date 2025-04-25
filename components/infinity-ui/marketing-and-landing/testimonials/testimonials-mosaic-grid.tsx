"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Star,
  Twitter,
  Linkedin,
  User2,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const TestimonialsMosaicGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(
    null,
  );

  const testimonials = [
    {
      content:
        "This platform completely transformed our workflow. The intuitive design and powerful features have boosted our team's productivity by at least 40%. I can't imagine going back to our old systems.",
      author: "Alexandra Chen",
      position: "CTO at TechNova",
      rating: 5,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      social: {
        twitter: "alexchen",
        linkedin: "alexandra-chen",
      },
      color: "from-violet-500 to-indigo-500",
      size: "col-span-1 md:col-span-2 row-span-1",
      featured: true,
    },
    {
      content:
        "The attention to detail in this product is remarkable. Every feature feels thoughtfully designed and implemented.",
      author: "Marcus Williams",
      position: "Product Director at Elevate",
      rating: 5,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      social: {
        twitter: "marcusw",
      },
      color: "from-emerald-500 to-teal-500",
      size: "col-span-1 row-span-1",
    },
    {
      content:
        "I've used many similar tools before, but this one stands out for its performance and reliability.",
      author: "Sophia Rodriguez",
      position: "Engineering Lead at Apex",
      rating: 4,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      social: {
        linkedin: "sophia-rodriguez",
      },
      color: "from-amber-500 to-orange-500",
      size: "col-span-1 row-span-1",
    },
    {
      content:
        "The customer support team is exceptional - they solved our complex integration challenges within hours.",
      author: "David Kim",
      position: "IT Manager at GlobalTech",
      rating: 5,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      social: {
        twitter: "davidkim",
        linkedin: "david-kim",
      },
      color: "from-rose-500 to-pink-500",
      size: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      content:
        "We&apos;ve seen a 200% ROI since implementing this solution. The analytics features alone have paid for the investment.",
      author: "Emma Johnson",
      position: "CEO at StartupX",
      rating: 5,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      social: {
        linkedin: "emma-johnson",
      },
      color: "from-blue-500 to-cyan-500",
      size: "col-span-1 md:col-span-2 row-span-1",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400/30 to-indigo-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/30 to-orange-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="20"
                cy="20"
                r="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              ></circle>
            </pattern>
            <rect
              id="rect"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
        </div>

        {/* Floating Quote Marks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-serif text-indigo-500/10 dark:text-indigo-500/5"
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
            <span className="mx-2 font-medium text-violet-500">
              TESTIMONIALS
            </span>
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            What our{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              customers
            </span>{" "}
            are saying
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Don&apos;t just take our word for it. Hear from some of our amazing
            customers who have transformed their businesses with our platform.
          </p>
        </motion.div>

        {/* Testimonials Mosaic Grid */}
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-6 md:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`${testimonial.size} group relative cursor-pointer`}
              onClick={() =>
                setExpandedTestimonial(
                  expandedTestimonial === index ? null : index,
                )
              }
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                <div
                  className={`absolute right-0 top-0 h-40 w-40 bg-gradient-to-br ${testimonial.color} -translate-y-1/2 translate-x-1/2 transform rounded-full opacity-5 blur-3xl transition-opacity duration-300 group-hover:opacity-10`}
                ></div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <Quote className="h-8 w-8 text-violet-500 dark:text-violet-400" />
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 flex-grow">
                    <AnimatePresence>
                      {expandedTestimonial === index ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          {testimonial.content}
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="line-clamp-3 text-gray-600 dark:text-gray-300"
                        >
                          {testimonial.content}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      {testimonial.image ? (
                        <Image
                          src={
                            testimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={testimonial.author}
                          fill
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User2 className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {testimonial.social.twitter && (
                        <a
                          href={`https://twitter.com/${testimonial.social.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 transition-colors hover:text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {testimonial.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${testimonial.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 transition-colors hover:text-blue-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {testimonial.featured && (
                <div className="absolute left-6 top-0 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  Featured
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Join thousands of satisfied customers who are already using our
            platform.
          </p>
          <button className="inline-flex transform items-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-violet-500/25">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsMosaicGrid;
