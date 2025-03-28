"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
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
  color: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Creative Director",
    company: "Design Studio",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with this team was a breath of fresh air! They understood our vision immediately and delivered a website that perfectly captures our brand&pos;s personality.",
    rating: 5,
    color: "pink",
  },
  {
    id: 2,
    name: "Jamie Wilson",
    role: "Startup Founder",
    company: "TechLaunch",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    rating: 5,
    color: "blue",
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "Marketing Manager",
    company: "Brand Innovators",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The creative approach they brought to our marketing materials completely transformed our campaign. We saw engagement increase by 200% within the first month!",
    rating: 5,
    color: "purple",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Product Owner",
    company: "SaaS Platform",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their attention to detail and user-focused design philosophy helped us simplify our complex product. Our users love the new interface!",
    rating: 4,
    color: "green",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    role: "E-commerce Director",
    company: "Retail Innovations",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The e-commerce solution they built for us increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible.",
    rating: 5,
    color: "yellow",
  },
];

const PastelNeonTestimonials = () => {
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

  const getNeonColor = (color: string) => {
    const colors: Record<
      string,
      {
        bg: string;
        text: string;
        shadow: string;
        border: string;
        glow: string;
        darkBg: string;
        darkText: string;
        darkShadow: string;
        darkBorder: string;
        darkGlow: string;
      }
    > = {
      pink: {
        bg: "bg-pink-100",
        text: "text-pink-500",
        shadow: "shadow-pink-200",
        border: "border-pink-200",
        glow: "from-pink-200 to-pink-100",
        darkBg: "dark:bg-pink-900/30",
        darkText: "dark:text-pink-400",
        darkShadow: "dark:shadow-pink-900/30",
        darkBorder: "dark:border-pink-800",
        darkGlow: "dark:from-pink-900/30 dark:to-pink-800/30",
      },
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-500",
        shadow: "shadow-blue-200",
        border: "border-blue-200",
        glow: "from-blue-200 to-blue-100",
        darkBg: "dark:bg-blue-900/30",
        darkText: "dark:text-blue-400",
        darkShadow: "dark:shadow-blue-900/30",
        darkBorder: "dark:border-blue-800",
        darkGlow: "dark:from-blue-900/30 dark:to-blue-800/30",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-500",
        shadow: "shadow-purple-200",
        border: "border-purple-200",
        glow: "from-purple-200 to-purple-100",
        darkBg: "dark:bg-purple-900/30",
        darkText: "dark:text-purple-400",
        darkShadow: "dark:shadow-purple-900/30",
        darkBorder: "dark:border-purple-800",
        darkGlow: "dark:from-purple-900/30 dark:to-purple-800/30",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-500",
        shadow: "shadow-green-200",
        border: "border-green-200",
        glow: "from-green-200 to-green-100",
        darkBg: "dark:bg-green-900/30",
        darkText: "dark:text-green-400",
        darkShadow: "dark:shadow-green-900/30",
        darkBorder: "dark:border-green-800",
        darkGlow: "dark:from-green-900/30 dark:to-green-800/30",
      },
      yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-500",
        shadow: "shadow-yellow-200",
        border: "border-yellow-200",
        glow: "from-yellow-200 to-yellow-100",
        darkBg: "dark:bg-yellow-900/30",
        darkText: "dark:text-yellow-400",
        darkShadow: "dark:shadow-yellow-900/30",
        darkBorder: "dark:border-yellow-800",
        darkGlow: "dark:from-yellow-900/30 dark:to-yellow-800/30",
      },
    };

    return colors[color] || colors.pink;
  };

  const currentTestimonial = testimonials[activeIndex];
  const neonColor = getNeonColor(currentTestimonial.color);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.03]" />

        {/* Animated grid lines */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-6">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute bottom-0 top-0 w-px bg-gray-200 dark:bg-gray-700"
              style={{ left: `${(i + 1) * (100 / 12)}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                height: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 8,
                delay: i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          ))}

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"
              style={{ top: `${(i + 1) * (100 / 6)}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                width: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 8,
                delay: i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          ))}
        </div>

        {/* Pastel glow effects */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 opacity-70 blur-xl dark:from-pink-900/50 dark:to-blue-900/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-pink-400 dark:text-pink-500" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent dark:from-pink-500 dark:via-purple-500 dark:to-blue-500">
              Client Testimonials
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Hear what our clients have to say about their experience
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className={`rounded-full border p-3 ${neonColor.border} ${neonColor.darkBorder} ${neonColor.bg} ${neonColor.darkBg} shadow-lg transition-colors hover:bg-opacity-80 ${neonColor.shadow} ${neonColor.darkShadow}`}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1), 0 0 30px currentColor",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                className={`h-6 w-6 ${neonColor.text} ${neonColor.darkText}`}
              />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className={`rounded-full border p-3 ${neonColor.border} ${neonColor.darkBorder} ${neonColor.bg} ${neonColor.darkBg} shadow-lg transition-colors hover:bg-opacity-80 ${neonColor.shadow} ${neonColor.darkShadow}`}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1), 0 0 30px currentColor",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight
                className={`h-6 w-6 ${neonColor.text} ${neonColor.darkText}`}
              />
            </motion.button>
          </div>

          {/* Pastel neon card */}
          <motion.div
            className={`relative overflow-hidden rounded-2xl border-2 bg-white dark:bg-gray-800 ${neonColor.border} ${neonColor.darkBorder} shadow-xl ${neonColor.shadow} ${neonColor.darkShadow}`}
            animate={{
              boxShadow: [
                "0 10px 25px rgba(0, 0, 0, 0.1)",
                "0 15px 35px rgba(0, 0, 0, 0.1)",
                "0 10px 25px rgba(0, 0, 0, 0.1)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            {/* Neon glow lines */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <motion.div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${neonColor.glow} ${neonColor.darkGlow}`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 5px currentColor",
                    "0 0 10px currentColor",
                    "0 0 5px currentColor",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <motion.div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${neonColor.glow} ${neonColor.darkGlow}`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 5px currentColor",
                    "0 0 10px currentColor",
                    "0 0 5px currentColor",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <motion.div
                className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${neonColor.glow} ${neonColor.darkGlow}`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 5px currentColor",
                    "0 0 10px currentColor",
                    "0 0 5px currentColor",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <motion.div
                className={`absolute inset-y-0 right-0 w-1 bg-gradient-to-b ${neonColor.glow} ${neonColor.darkGlow}`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 5px currentColor",
                    "0 0 10px currentColor",
                    "0 0 5px currentColor",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-8 md:flex-row"
                >
                  {/* Author image */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className={`absolute -inset-1 rounded-full bg-gradient-to-br ${neonColor.glow} ${neonColor.darkGlow} blur-md`}
                      />
                      <div
                        className={`relative h-24 w-24 overflow-hidden rounded-full border-2 md:h-32 md:w-32 ${neonColor.border} ${neonColor.darkBorder}`}
                      >
                        <Image
                          src={
                            currentTestimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          }
                          alt={currentTestimonial.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow text-center md:text-left">
                    <div className="mb-4 flex justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < currentTestimonial.rating ? neonColor.text + " " + neonColor.darkText : "text-gray-200 dark:text-gray-600"} ${i < currentTestimonial.rating ? "fill-current" : ""}`}
                        />
                      ))}
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-gray-100 dark:text-gray-800">
                        <Quote className="h-12 w-12" />
                      </div>
                      <blockquote className="relative z-10">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl">
                          &quot;{currentTestimonial.content}&quot;
                        </p>
                      </blockquote>
                    </div>

                    <div>
                      <h3
                        className={`text-xl font-bold ${neonColor.text} ${neonColor.darkText}`}
                      >
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pastel glow background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${neonColor.glow} ${neonColor.darkGlow} pointer-events-none opacity-10`}
            />
          </motion.div>

          {/* Pagination dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => {
              const dotColor = getNeonColor(testimonial.color);
              return (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === activeIndex
                      ? `${dotColor.bg} ${dotColor.darkBg} shadow-md ${dotColor.shadow} ${dotColor.darkShadow} scale-125`
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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

export default PastelNeonTestimonials;
