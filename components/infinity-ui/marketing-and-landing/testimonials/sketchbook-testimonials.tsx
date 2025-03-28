"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Eraser,
  Ruler,
  Palette,
  Highlighter,
} from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  sketch: "website" | "mobile" | "branding" | "dashboard" | "ecommerce";
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Creative Director",
    company: "Design Studio",
    content:
      "Working with this team was a breath of fresh air! They understood our vision immediately and delivered a website that perfectly captures our brand's personality.",
    sketch: "website",
  },
  {
    id: 2,
    name: "Jamie Wilson",
    role: "Startup Founder",
    company: "TechLaunch",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    sketch: "mobile",
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "E-commerce Director",
    company: "Retail Innovations",
    content:
      "The e-commerce solution they built for us increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible.",
    sketch: "ecommerce",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Product Manager",
    company: "NextGen Solutions",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    sketch: "dashboard",
  },
  {
    id: 5,
    name: "Olivia Wilson",
    role: "Marketing Director",
    company: "Brand Innovators",
    content:
      "The creative approach they brought to our marketing materials completely transformed our campaign. We saw engagement increase by 200% within the first month!",
    sketch: "branding",
  },
];

const SketchbookTestimonials = () => {
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

  const getSketchImage = (sketch: string) => {
    switch (sketch) {
      case "website":
        return "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400&text=Website+Sketch";
      case "mobile":
        return "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400&text=Mobile+App+Sketch";
      case "branding":
        return "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400&text=Brand+Identity+Sketch";
      case "dashboard":
        return "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400&text=Dashboard+Sketch";
      case "ecommerce":
        return "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400&text=E-commerce+Sketch";
      default:
        return "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400&text=Sketch";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-24"
    >
      {/* Paper texture background */}
      <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.05]" />

      {/* Decorative elements */}
      <div className="absolute right-10 top-10 rotate-12 opacity-20">
        <Pencil className="h-16 w-16 text-gray-400" />
      </div>

      <div className="absolute bottom-10 left-10 -rotate-6 opacity-20">
        <Ruler className="h-16 w-16 text-gray-400" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sketch mb-4 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
            Design Process Feedback
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Client notes from our design journey
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <motion.button
            onClick={handlePrev}
            className="rounded-full border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="rounded-full border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </motion.button>
        </div>

        {/* Sketchbook slider */}
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
                    x: direction * 100,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: direction * -100,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  className="w-full"
                >
                  {/* Sketchbook page */}
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Sketch side */}
                      <div className="relative border-r border-gray-100 p-6">
                        {/* Graph paper background */}
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `
                              linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: "10px 10px",
                          }}
                        />

                        {/* Sketch image */}
                        <div className="relative mb-4">
                          <div className="relative overflow-hidden rounded border border-gray-300">
                            <Image
                              src={
                                getSketchImage(testimonial.sketch) ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={`${testimonial.sketch} sketch`}
                              width="400"
                              height="300"
                              className="h-auto w-full"
                            />

                            {/* Sketch overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-transparent mix-blend-multiply" />
                          </div>

                          {/* Pencil marks and annotations */}
                          <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 400 300"
                          >
                            <motion.path
                              d="M50,50 C100,30 150,70 200,50 S250,20 300,50"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="1"
                              strokeDasharray="5,5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, delay: 0.5 }}
                            />
                            <motion.path
                              d="M70,150 L330,150"
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.8 }}
                            />
                            <motion.circle
                              cx="200"
                              cy="100"
                              r="30"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 1.2 }}
                            />
                          </svg>
                        </div>

                        {/* Design tools */}
                        <div className="flex justify-center gap-4 text-gray-500">
                          <Pencil className="h-5 w-5" />
                          <Eraser className="h-5 w-5" />
                          <Ruler className="h-5 w-5" />
                          <Palette className="h-5 w-5" />
                          <Highlighter className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Notes side */}
                      <div className="relative bg-amber-50 p-6">
                        {/* Notebook lines */}
                        <div className="pointer-events-none absolute inset-0 flex flex-col justify-start">
                          {[...Array(15)].map((_, i) => (
                            <div
                              key={i}
                              className="h-px w-full bg-amber-200"
                              style={{ marginTop: `${i * 1.5 + 2}rem` }}
                            />
                          ))}
                        </div>

                        {/* Client feedback */}
                        <div className="font-sketch relative pt-4">
                          <h3 className="mb-2 text-xl font-bold text-gray-800 underline decoration-amber-300 decoration-wavy underline-offset-4">
                            Client Feedback
                          </h3>

                          <p className="mb-6 text-lg leading-relaxed text-gray-700">
                            &quot;{testimonial.content}&quot;
                          </p>

                          {/* Highlighted notes */}
                          <div className="relative mb-6 inline-block">
                            <div
                              className="absolute inset-0 -rotate-1 transform-gpu bg-yellow-200"
                              style={{ zIndex: -1 }}
                            />
                            <p className="px-2 py-1 font-bold text-gray-800">
                              Key points:
                            </p>
                          </div>

                          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
                            {testimonial.content
                              .split(". ")
                              .slice(0, 2)
                              .map((point, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-gray-700" />
                                  <span>{point}</span>
                                </li>
                              ))}
                          </ul>

                          <div className="mt-auto">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-700">
                                {testimonial.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">
                                  {testimonial.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {testimonial.role}, {testimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Paper clip */}
                        <div className="absolute right-4 top-2">
                          <svg
                            width="30"
                            height="50"
                            viewBox="0 0 30 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15,0 L15,40 C15,45 20,45 20,40 L20,10 C20,5 15,5 15,10 L15,35 C15,40 20,40 20,35 L20,15"
                              stroke="#94a3b8"
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
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
                  ? "scale-125 bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      {/* Add custom font for sketch look */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

        .font-sketch {
          font-family: "Architects Daughter", cursive;
        }
      `}</style>
    </section>
  );
};

export default SketchbookTestimonials;
