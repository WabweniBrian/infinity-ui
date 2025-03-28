"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SocialProofCta = () => {
  const controls = useAnimation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Testimonial data
  const testimonials = [
    {
      quote:
        "This product completely transformed our workflow. We&apos;ve seen a 40% increase in productivity since implementing it.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=64&width=64&text=SJ",
      rating: 5,
    },
    {
      quote:
        "The customer support is exceptional. Any time we&apos;ve had an issue, the team has responded quickly and effectively.",
      author: "Michael Rodriguez",
      role: "CTO, Innovate Inc.",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=64&width=64&text=MR",
      rating: 5,
    },
    {
      quote:
        "I was skeptical at first, but after using it for a month, I can't imagine going back to our old system.",
      author: "Jessica Williams",
      role: "Operations Manager, Global Solutions",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=64&width=64&text=JW",
      rating: 4,
    },
  ];

  // Company logos
  const companyLogos = [
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  ];

  useEffect(() => {
    controls.start("visible");

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, testimonials.length]);

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Testimonials */}
            <div className="p-8 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
              >
                <Star className="h-3 w-3 fill-purple-700" />
                TRUSTED BY THOUSANDS
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Don&apos;t just take our word for it
              </motion.h2>

              {/* Testimonial carousel */}
              <motion.div
                variants={itemVariants}
                className="relative mb-6 h-[240px]"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: activeTestimonial === index ? 1 : 0,
                      x: activeTestimonial === index ? 0 : 20,
                      zIndex: activeTestimonial === index ? 10 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${activeTestimonial === index ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Quote className="h-4 w-4" />
                      </div>

                      <p className="mb-4 text-gray-700">
                        &quot;{testimonial.quote}&quot;
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={
                                testimonial.avatar ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                              }
                              alt={testimonial.author}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {testimonial.author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>

                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial navigation */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex justify-center gap-2"
              >
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === index
                        ? "w-8 bg-purple-500"
                        : "w-2 bg-gray-300"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </motion.div>

              {/* Company logos */}
              <motion.div variants={itemVariants}>
                <div className="mb-2 text-center text-xs font-medium text-gray-500">
                  TRUSTED BY LEADING COMPANIES
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {companyLogos.map((logo, index) => (
                    <div key={index} className="h-8">
                      <Image
                        src={
                          logo ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={`Company ${index + 1}`}
                        width={120}
                        height={40}
                        className="h-full w-auto object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - CTA Form */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white md:p-10">
              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="mb-2 text-xl font-bold">
                  Join thousands of satisfied customers
                </h3>
                <p className="text-purple-100">
                  Get started today and see why so many businesses trust our
                  platform.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="mb-6 grid grid-cols-3 gap-4"
              >
                <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-xs text-purple-100">Customers</div>
                </div>
                <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-xs text-purple-100">Uptime</div>
                </div>
                <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-xs text-purple-100">Rating</div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div variants={itemVariants} className="mb-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none backdrop-blur-sm placeholder:text-white/60 focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none backdrop-blur-sm placeholder:text-white/60 focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Company Size
                  </label>
                  <select className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none backdrop-blur-sm focus:border-white/40">
                    <option value="" className="bg-indigo-700">
                      Select company size
                    </option>
                    <option value="1-10" className="bg-indigo-700">
                      1-10 employees
                    </option>
                    <option value="11-50" className="bg-indigo-700">
                      11-50 employees
                    </option>
                    <option value="51-200" className="bg-indigo-700">
                      51-200 employees
                    </option>
                    <option value="201-500" className="bg-indigo-700">
                      201-500 employees
                    </option>
                    <option value="501+" className="bg-indigo-700">
                      501+ employees
                    </option>
                  </select>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-purple-700 transition-all hover:bg-white/90"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>No credit card required • 14-day free trial</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialProofCta;
