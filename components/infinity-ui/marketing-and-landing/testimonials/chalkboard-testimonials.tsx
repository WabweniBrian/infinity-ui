"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Award,
  BookOpen,
  Star,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Marketing Director",
    company: "Brand Innovators",
    content:
      "The creative approach they brought to our marketing materials completely transformed our campaign. We saw engagement increase by 200% within the first month!",
    rating: 5,
  },
  {
    id: 2,
    name: "Jamie Wilson",
    role: "Startup Founder",
    company: "TechLaunch",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "E-commerce Director",
    company: "Retail Innovations",
    content:
      "The e-commerce solution they built for us increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    company: "Design Studio",
    content:
      "Working with this team was a breath of fresh air! They understood our vision immediately and delivered a website that perfectly captures our brand&pos;s personality.",
    rating: 4,
  },
  {
    id: 5,
    name: "Olivia Wilson",
    role: "Product Owner",
    company: "SaaS Platform",
    content:
      "Their attention to detail and user-focused design philosophy helped us simplify our complex product. Our users love the new interface!",
    rating: 5,
  },
];

const ChalkboardTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-green-900 py-24 dark:bg-green-950"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Chalkboard background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950 dark:from-green-950 dark:to-black">
        {/* Chalk texture */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-10 mix-blend-overlay" />

        {/* Chalk dust */}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const opacity = Math.random() * 0.3 + 0.1;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: size,
                height: size,
                top: `${top}%`,
                left: `${left}%`,
                opacity,
              }}
            />
          );
        })}

        {/* Wooden frame */}
        <div className="absolute inset-x-0 top-0 h-6 bg-amber-800 dark:bg-amber-900" />
        <div className="absolute inset-x-0 bottom-0 h-6 bg-amber-800 dark:bg-amber-900" />
        <div className="absolute inset-y-0 left-0 w-6 bg-amber-800 dark:bg-amber-900" />
        <div className="absolute inset-y-0 right-0 w-6 bg-amber-800 dark:bg-amber-900" />
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
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap className="h-16 w-16 text-white/80" />
            </div>
          </motion.div>

          <h2 className="font-chalk mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Client Testimonials
          </h2>
          <p className="font-chalk mx-auto max-w-2xl text-lg text-green-100">
            What our clients are saying about us
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <motion.button
            onClick={handlePrev}
            className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.button>
        </div>

        {/* Chalkboard testimonial */}
        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            {testimonials.map((testimonial, index) => {
              if (index !== activeIndex) return null;

              return (
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    y: direction * 50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: direction * -50,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  className="w-full"
                >
                  {/* Chalk drawing */}
                  <div className="relative rounded-lg border-2 border-white/20 p-8 md:p-12">
                    {/* Chalk dust effect */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {[...Array(20)].map((_, i) => {
                        const size = Math.random() * 3 + 1;
                        const top = Math.random() * 100;
                        const left = Math.random() * 100;
                        const opacity = Math.random() * 0.2 + 0.1;

                        return (
                          <div
                            key={i}
                            className="absolute rounded-full bg-white/30"
                            style={{
                              width: size,
                              height: size,
                              top: `${top}%`,
                              left: `${left}%`,
                              opacity,
                            }}
                          />
                        );
                      })}
                    </motion.div>

                    {/* Content */}
                    <div className="text-center">
                      {/* Rating stars */}
                      <div className="mb-6 flex justify-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{
                              scale: 1,
                              rotate: 0,
                              transition: {
                                delay: i * 0.1,
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              },
                            }}
                          >
                            <Star
                              className={`h-8 w-8 ${i < testimonial.rating ? "text-yellow-300" : "text-white/30"}`}
                              fill={i < testimonial.rating ? "#fde047" : "none"}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="relative mb-8">
                        <motion.div
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                        >
                          <svg
                            className="absolute -top-6 left-0 h-12 w-12 text-white/40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 21C3 16.5 6.5 13 11 13V7C11 5.9 10.1 5 9 5H5C3.9 5 3 5.9 3 7V21ZM16 21C16 16.5 19.5 13 24 13V7C24 5.9 23.1 5 22 5H18C16.9 5 16 5.9 16 7V21Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </motion.div>

                        <blockquote>
                          <motion.p
                            className="font-chalk text-xl leading-relaxed text-white md:text-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          >
                            &quot;{testimonial.content}&quot;
                          </motion.p>
                        </blockquote>
                      </div>

                      {/* Divider */}
                      <motion.div
                        className="my-8 h-px w-full bg-white/30"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />

                      {/* Author */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        <h3 className="font-chalk mb-1 text-2xl font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="font-chalk text-green-100">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </motion.div>
                    </div>

                    {/* Decorative chalk drawings */}
                    <svg
                      className="absolute left-4 top-4 h-16 w-16 text-white/20"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                      />
                      <motion.path
                        d="M30,50 L70,50 M50,30 L50,70"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>

                    <svg
                      className="absolute bottom-4 right-4 h-16 w-16 text-white/20"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <motion.path
                        d="M20,80 L80,20 M20,20 L80,80"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`h-3 w-3 rounded-full transition-all ${
                index === activeIndex
                  ? "scale-125 bg-white"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 text-white/20">
          <Award className="h-12 w-12" />
        </div>

        <div className="absolute right-10 top-10 text-white/20">
          <BookOpen className="h-12 w-12" />
        </div>
      </div>

      {/* Add custom font for chalk look */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

        .font-chalk {
          font-family: "Architects Daughter", cursive;
          letter-spacing: 0.5px;
        }
      `}</style>
    </section>
  );
};

export default ChalkboardTestimonials;
