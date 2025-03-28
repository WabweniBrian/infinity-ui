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
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  link?: string;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "CEO",
    company: "Innovate Tech",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with this team transformed our business. Their strategic approach and technical expertise helped us launch our platform months ahead of schedule.",
    rating: 5,
    link: "#case-study-1",
    color: "blue",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    rating: 5,
    link: "#case-study-2",
    color: "purple",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Product Manager",
    company: "NextGen Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    rating: 5,
    link: "#case-study-3",
    color: "teal",
  },
  {
    id: 4,
    name: "Michael Johnson",
    role: "Operations Director",
    company: "Logistics Plus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%. The ROI has been exceptional.",
    rating: 4,
    link: "#case-study-4",
    color: "amber",
  },
];

const FrostedGlassTestimonials = () => {
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

  const getGlassColor = (color: string) => {
    const colors: Record<
      string,
      { border: string; shadow: string; accent: string }
    > = {
      blue: {
        border: "border-blue-200 dark:border-blue-700",
        shadow: "shadow-blue-200/20 dark:shadow-blue-900/20",
        accent: "bg-blue-500 dark:bg-blue-600",
      },
      purple: {
        border: "border-purple-200 dark:border-purple-700",
        shadow: "shadow-purple-200/20 dark:shadow-purple-900/20",
        accent: "bg-purple-500 dark:bg-purple-600",
      },
      teal: {
        border: "border-teal-200 dark:border-teal-700",
        shadow: "shadow-teal-200/20 dark:shadow-teal-900/20",
        accent: "bg-teal-500 dark:bg-teal-600",
      },
      amber: {
        border: "border-amber-200 dark:border-amber-700",
        shadow: "shadow-amber-200/20 dark:shadow-amber-900/20",
        accent: "bg-amber-500 dark:bg-amber-600",
      },
    };

    return colors[color] || colors.blue;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-24 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950" />

      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-100/50 to-purple-100/50 blur-3xl dark:from-blue-800/30 dark:to-purple-800/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-100/50 to-blue-100/50 blur-3xl dark:from-teal-800/30 dark:to-blue-800/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-100/30 to-pink-100/30 blur-3xl dark:from-amber-800/20 dark:to-pink-800/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Floating circles */}
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 60 + 20;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/90 backdrop-blur-sm dark:bg-white/20"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
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
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
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
              className="rounded-full border border-white/50 bg-white/40 p-3 shadow-lg backdrop-blur-md transition-colors hover:bg-white/60 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full border border-white/50 bg-white/40 p-3 shadow-lg backdrop-blur-md transition-colors hover:bg-white/60 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Glassmorphism card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/30 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
            {/* Accent color line */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                {testimonials.map((testimonial, index) => {
                  if (index !== activeIndex) return null;

                  const glassColor = getGlassColor(testimonial.color);

                  return (
                    <motion.div
                      key={testimonial.id}
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
                          <div className="absolute -inset-1 rounded-full bg-white/50 blur-sm dark:bg-white/20" />
                          <div
                            className={`relative h-24 w-24 overflow-hidden rounded-full border-2 md:h-32 md:w-32 ${glassColor.border}`}
                          >
                            <Image
                              src={
                                testimonial.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                              }
                              alt={testimonial.name}
                              width={128}
                              height={128}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {/* Accent dot */}
                          <div
                            className={`absolute bottom-0 right-0 h-6 w-6 rounded-full ${glassColor.accent} border-2 border-white dark:border-gray-800`}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow text-center md:text-left">
                        <div className="mb-4 flex justify-center md:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                            />
                          ))}
                        </div>

                        <div className="relative mb-6">
                          <div className="absolute -left-2 -top-2 text-white/20 dark:text-white/10">
                            <Quote className="h-12 w-12" />
                          </div>
                          <blockquote className="relative z-10">
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 md:text-xl">
                              &quot;{testimonial.content}&quot;
                            </p>
                          </blockquote>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {testimonial.role}, {testimonial.company}
                          </p>

                          {testimonial.link && (
                            <motion.a
                              href={testimonial.link}
                              className="mt-4 inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              whileHover={{ x: 5 }}
                            >
                              <span>View case study</span>
                              <ExternalLink className="h-4 w-4" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Glassmorphism reflections */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Pagination dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => {
              const glassColor = getGlassColor(testimonial.color);
              return (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === activeIndex
                      ? `${glassColor.accent} scale-125`
                      : "bg-white/50 hover:bg-white/70 dark:bg-white/20 dark:hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrostedGlassTestimonials;
