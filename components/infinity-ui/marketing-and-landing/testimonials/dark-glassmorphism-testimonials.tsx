"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  link?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CTO",
    company: "TechVision Inc.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that&pos;s positioned us for future growth.",
    rating: 5,
    link: "#case-study-1",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    rating: 5,
    link: "#case-study-2",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "NextGen Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    rating: 5,
    link: "#case-study-3",
  },
  {
    id: 4,
    name: "Olivia Martinez",
    role: "Operations Director",
    company: "Logistics Plus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%. The ROI has been exceptional.",
    rating: 4,
    link: "#case-study-4",
  },
];

const DarkGlassmorphismTestimonials = () => {
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
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black py-24 text-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.03]" />

        {/* Gradient orbs */}
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-900/20 to-blue-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30 backdrop-blur-sm"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          );
        })}
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Hear what our clients have to say about their experience working
            with us
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>

          {/* Glassmorphism card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
            {/* Animated gradient border */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonials[activeIndex].id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-8 md:flex-row"
                >
                  {/* Author image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-70 blur-sm" />
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 md:h-32 md:w-32">
                        <Image
                          src={
                            testimonials[activeIndex].image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          }
                          alt={testimonials[activeIndex].name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow text-center md:text-left">
                    <div className="mb-4 flex justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-white/10">
                        <Quote className="h-12 w-12" />
                      </div>
                      <blockquote className="relative z-10">
                        <p className="text-lg leading-relaxed text-white md:text-xl">
                          &quot;{testimonials[activeIndex].content}&quot;
                        </p>
                      </blockquote>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-gray-300">
                        {testimonials[activeIndex].role},{" "}
                        {testimonials[activeIndex].company}
                      </p>

                      {testimonials[activeIndex].link && (
                        <motion.a
                          href={testimonials[activeIndex].link}
                          className="mt-4 inline-flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
                          whileHover={{ x: 5 }}
                        >
                          <span>View case study</span>
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Glassmorphism reflections */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent" />
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
        </div>
      </div>
    </section>
  );
};

export default DarkGlassmorphismTestimonials;
