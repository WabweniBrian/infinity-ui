"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jonathan Parker",
    role: "CEO",
    company: "Innovate Tech",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with this team has been transformative for our business. Their strategic approach and technical expertise helped us launch our platform months ahead of schedule.",
    rating: 5,
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "NextGen Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "CTO",
    company: "DataFlow Systems",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The custom software solution they built has automated our most complex processes, saving us thousands of hours in manual work annually.",
    rating: 5,
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Operations Director",
    company: "Logistics Plus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%. The ROI has been exceptional.",
    rating: 5,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    role: "E-commerce Manager",
    company: "Retail Innovations",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Since implementing their e-commerce solution, our mobile conversion rate has increased by 65% and average order value is up by 30%. Game-changing results.",
    rating: 5,
  },
];

const CubeRotationTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotating, setRotating] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handlePrev = () => {
    if (rotating) return;
    setRotating(true);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setRotating(false), 500);
  };

  const handleNext = () => {
    if (rotating) return;
    setRotating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setRotating(false), 500);
  };

  const getRotation = (index: number) => {
    const diff =
      (index - activeIndex + testimonials.length) % testimonials.length;
    return diff * 60; // 60 degrees per face for a hexagonal cube
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 py-24 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/30 dark:to-purple-900/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover why leading companies choose our services to drive their
            success
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* 3D Cube */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="perspective-1000 mx-auto aspect-square max-w-md">
              <div className="transform-style-3d relative h-full w-full">
                {/* Navigation buttons */}
                <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4">
                  <motion.button
                    onClick={handlePrev}
                    className="rounded-full bg-white p-2 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={rotating}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="rounded-full bg-white p-2 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={rotating}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </div>

                {/* Cube faces */}
                {testimonials.map((testimonial, index) => {
                  const rotation = getRotation(index);
                  const isActive = index === activeIndex;

                  return (
                    <motion.div
                      key={testimonial.id}
                      className="transform-style-3d backface-visibility-hidden absolute inset-0"
                      animate={{
                        rotateY: `${rotation}deg`,
                        z: isActive ? 150 : 0,
                        scale: isActive ? 1 : 0.85,
                        opacity: isActive ? 1 : 0.5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-center">
                          <div className="relative mx-auto mb-4 h-24 w-24">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-70 blur-sm" />
                            <div className="relative overflow-hidden rounded-full border-2 border-white dark:border-gray-700">
                              <Image
                                src={
                                  testimonial.image ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                                }
                                alt={testimonial.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="mb-4 flex justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                              />
                            ))}
                          </div>

                          <blockquote className="mb-4">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                              &quot;{testimonial.content}&quot;
                            </p>
                          </blockquote>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                Trusted by Industry Leaders
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Proven Results
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our clients consistently report significant improvements
                      in key metrics after implementing our solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Trusted Partnership
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We build long-term relationships with our clients,
                      becoming a trusted extension of their team.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0 rounded-full bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Expert Guidance
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our team of industry experts provides strategic guidance
                      to help you navigate complex challenges.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-none"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CubeRotationTestimonials;
