"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Star, Globe, X } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type MapTestimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  coordinates: { x: number; y: number };
  image: string;
  content: string;
  rating: number;
  industry: string;
  color: string;
};

const testimonials: MapTestimonial[] = [
  {
    id: 1,
    name: "Richard Taylor",
    role: "CTO",
    company: "TechNorth Solutions",
    location: "Toronto, Canada",
    coordinates: { x: 25, y: 22 },
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The custom software solution has automated our most complex business processes, saving us over 30 hours per week in manual work.",
    rating: 5,
    industry: "Technology",
    color: "blue",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Marketing Director",
    company: "Sunshine Hospitality",
    location: "Barcelona, Spain",
    coordinates: { x: 48, y: 28 },
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Our digital marketing campaigns are now generating 3x the leads at half the cost. Their data-driven approach has transformed our customer acquisition strategy.",
    rating: 5,
    industry: "Hospitality",
    color: "amber",
  },
  {
    id: 3,
    name: "Hiroshi Tanaka",
    role: "Product Manager",
    company: "Future Electronics",
    location: "Tokyo, Japan",
    coordinates: { x: 82, y: 30 },
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The product development roadmap they created has given us clear direction and helped us prioritize features that deliver the most value to our customers.",
    rating: 4,
    industry: "Electronics",
    color: "teal",
  },
  {
    id: 4,
    name: "Amara Okafor",
    role: "CEO",
    company: "HealthPlus",
    location: "Lagos, Nigeria",
    coordinates: { x: 47, y: 42 },
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their healthcare software has improved patient care and reduced administrative overhead by 40%. The ROI has exceeded our expectations.",
    rating: 5,
    industry: "Healthcare",
    color: "green",
  },
  {
    id: 5,
    name: "Sarah Williams",
    role: "E-commerce Manager",
    company: "Fashion Forward",
    location: "Sydney, Australia",
    coordinates: { x: 85, y: 65 },
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Since implementing their e-commerce solution, our mobile conversion rate has increased by 65% and average order value is up by 30%.",
    rating: 5,
    industry: "Retail",
    color: "purple",
  },
  {
    id: 6,
    name: "Carlos Mendoza",
    role: "Operations Director",
    company: "Global Logistics",
    location: "São Paulo, Brazil",
    coordinates: { x: 32, y: 55 },
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their supply chain optimization project has reduced our delivery times by 35% and improved inventory accuracy to 99.8%.",
    rating: 5,
    industry: "Logistics",
    color: "indigo",
  },
];

const GlobalMapTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] =
    useState<MapTestimonial | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handlePinClick = (testimonial: MapTestimonial) => {
    setActiveTestimonial(testimonial);
  };

  const handleClose = () => {
    setActiveTestimonial(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 text-white dark:from-black dark:to-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.03]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-900/20 to-green-900/20 blur-3xl"
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
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative mx-auto mb-6 h-20 w-20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500">
              <Globe className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Global Client Success
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Delivering exceptional results for clients around the world
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          className="relative mb-12 overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 dark:border-gray-800 dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative aspect-[16/9]">
            {/* World map background */}
            <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-center bg-no-repeat opacity-20" />

            {/* Map overlay with grid lines */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 dark:from-gray-900/50 dark:to-black/50">
              <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.1]" />

              {/* Animated pulse effect */}
              <div className="absolute inset-0 animate-pulse bg-blue-500/5" />
            </div>

            {/* Location pins */}
            {testimonials.map((testimonial) => (
              <motion.button
                key={testimonial.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2 transform"
                style={{
                  left: `${testimonial.coordinates.x}%`,
                  top: `${testimonial.coordinates.y}%`,
                }}
                onClick={() => handlePinClick(testimonial)}
                initial={{ scale: 0 }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        transition: {
                          delay: 0.5 + testimonial.id * 0.1,
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        },
                      }
                    : { scale: 0 }
                }
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative">
                  {/* Ripple effect */}
                  <motion.div
                    className={`absolute -inset-4 rounded-full ${
                      testimonial.color === "blue"
                        ? "bg-blue-500/30"
                        : testimonial.color === "amber"
                          ? "bg-amber-500/30"
                          : testimonial.color === "teal"
                            ? "bg-teal-500/30"
                            : testimonial.color === "green"
                              ? "bg-green-500/30"
                              : testimonial.color === "purple"
                                ? "bg-purple-500/30"
                                : "bg-indigo-500/30"
                    } opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />

                  {/* Pin */}
                  <div
                    className={`rounded-full p-1 ${
                      testimonial.color === "blue"
                        ? "bg-blue-500"
                        : testimonial.color === "amber"
                          ? "bg-amber-500"
                          : testimonial.color === "teal"
                            ? "bg-teal-500"
                            : testimonial.color === "green"
                              ? "bg-green-500"
                              : testimonial.color === "purple"
                                ? "bg-purple-500"
                                : "bg-indigo-500"
                    }`}
                  >
                    <MapPin className="h-5 w-5 text-white" />
                  </div>

                  {/* Location tooltip */}
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-900">
                    {testimonial.location}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Industry stats */}
        <motion.div
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            "Technology",
            "Hospitality",
            "Electronics",
            "Healthcare",
            "Retail",
            "Logistics",
          ].map((industry, index) => (
            <div
              key={industry}
              className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-center backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50"
            >
              <div className="mb-1 text-2xl font-bold text-white">
                {index + 1}
              </div>
              <div className="text-sm text-gray-400">{industry}</div>
            </div>
          ))}
        </motion.div>

        {/* Selected testimonial popup */}
        <AnimatePresence>
          {activeTestimonial && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-gray-800 shadow-2xl dark:bg-gray-900"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`absolute left-0 right-0 top-0 h-2 ${
                    activeTestimonial.color === "blue"
                      ? "bg-blue-500"
                      : activeTestimonial.color === "amber"
                        ? "bg-amber-500"
                        : activeTestimonial.color === "teal"
                          ? "bg-teal-500"
                          : activeTestimonial.color === "green"
                            ? "bg-green-500"
                            : activeTestimonial.color === "purple"
                              ? "bg-purple-500"
                              : "bg-indigo-500"
                  }`}
                />

                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-full bg-gray-700 p-1 transition-colors hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                <div className="p-6">
                  <div className="mb-6 flex items-center">
                    <div className="mr-4 flex-shrink-0">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-700 dark:border-gray-800">
                        <Image
                          src={
                            activeTestimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={activeTestimonial.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-gray-300">
                        {activeTestimonial.role}, {activeTestimonial.company}
                      </p>
                      <div className="mt-1 flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {activeTestimonial.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < activeTestimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-400">
                      {activeTestimonial.industry}
                    </span>
                  </div>

                  <blockquote className="mb-6">
                    <p className="text-lg leading-relaxed text-gray-300">
                      &quot;{activeTestimonial.content}&quot;
                    </p>
                  </blockquote>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GlobalMapTestimonials;
