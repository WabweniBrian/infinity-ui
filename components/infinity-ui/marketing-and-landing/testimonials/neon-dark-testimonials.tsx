"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Zap } from "lucide-react";
import Image from "next/image";

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
    name: "Ryan Chen",
    role: "CTO",
    company: "NexTech Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that&pos;s positioned us for future growth.",
    rating: 5,
    color: "cyan",
  },
  {
    id: 2,
    name: "Mia Johnson",
    role: "Marketing Director",
    company: "Pulse Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    rating: 5,
    color: "pink",
  },
  {
    id: 3,
    name: "Jamal Williams",
    role: "Product Manager",
    company: "Quantum Innovations",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    rating: 5,
    color: "purple",
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    role: "Operations Director",
    company: "Synth Logistics",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%. The ROI has been exceptional.",
    rating: 4,
    color: "green",
  },
];

const NeonDarkTestimonials = () => {
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
      { text: string; shadow: string; border: string; bg: string }
    > = {
      cyan: {
        text: "text-cyan-400",
        shadow: "shadow-cyan-500/50",
        border: "border-cyan-500/50",
        bg: "bg-cyan-500/10",
      },
      pink: {
        text: "text-pink-400",
        shadow: "shadow-pink-500/50",
        border: "border-pink-500/50",
        bg: "bg-pink-500/10",
      },
      purple: {
        text: "text-purple-400",
        shadow: "shadow-purple-500/50",
        border: "border-purple-500/50",
        bg: "bg-purple-500/10",
      },
      green: {
        text: "text-green-400",
        shadow: "shadow-green-500/50",
        border: "border-green-500/50",
        bg: "bg-green-500/10",
      },
    };

    return colors[color] || colors.cyan;
  };

  const currentTestimonial = testimonials[activeIndex];
  const neonColor = getNeonColor(currentTestimonial.color);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 text-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.05]" />

        {/* Animated grid lines */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-6">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute bottom-0 top-0 w-px bg-gray-800"
              style={{ left: `${(i + 1) * (100 / 12)}%` }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
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
              className="absolute left-0 right-0 h-px bg-gray-800"
              style={{ top: `${(i + 1) * (100 / 6)}%` }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
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

        {/* Neon glow effects */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            opacity: [0.2, 0.5, 0.2],
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
            <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="h-10 w-10 text-cyan-400" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Hear what our clients have to say about their experience
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className={`rounded-full border p-3 ${neonColor.border} ${neonColor.bg} transition-colors hover:bg-opacity-20`}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.5), 0 0 30px currentColor",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className={`h-6 w-6 ${neonColor.text}`} />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className={`rounded-full border p-3 ${neonColor.border} ${neonColor.bg} transition-colors hover:bg-opacity-20`}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.5), 0 0 30px currentColor",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className={`h-6 w-6 ${neonColor.text}`} />
            </motion.button>
          </div>

          {/* Neon card */}
          <motion.div
            className={`relative overflow-hidden rounded-2xl border bg-gray-900 ${neonColor.border} ${neonColor.shadow}`}
            animate={{
              boxShadow: [
                "0 0 10px currentColor",
                "0 0 20px currentColor",
                "0 0 10px currentColor",
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
                className={`absolute inset-x-0 top-0 h-px ${neonColor.bg}`}
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
                className={`absolute inset-x-0 bottom-0 h-px ${neonColor.bg}`}
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
                className={`absolute inset-y-0 left-0 w-px ${neonColor.bg}`}
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
                className={`absolute inset-y-0 right-0 w-px ${neonColor.bg}`}
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
                        className={`absolute -inset-1 rounded-full ${neonColor.bg} blur-md`}
                      />
                      <div
                        className={`relative h-24 w-24 overflow-hidden rounded-full border-2 md:h-32 md:w-32 ${neonColor.border}`}
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
                          className={`h-5 w-5 ${i < currentTestimonial.rating ? neonColor.text : "text-gray-700"} ${i < currentTestimonial.rating ? "fill-current" : ""}`}
                        />
                      ))}
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-gray-800">
                        <Quote className="h-12 w-12" />
                      </div>
                      <blockquote className="relative z-10">
                        <p className="text-lg leading-relaxed text-white md:text-xl">
                          &quot;{currentTestimonial.content}&quot;
                        </p>
                      </blockquote>
                    </div>

                    <div>
                      <h3 className={`text-xl font-bold ${neonColor.text}`}>
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-400">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

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
                    ? `${neonColor.bg} ${neonColor.shadow} scale-125`
                    : "bg-gray-700 hover:bg-gray-600"
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

export default NeonDarkTestimonials;
