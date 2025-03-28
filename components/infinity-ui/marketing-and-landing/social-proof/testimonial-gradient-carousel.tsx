"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  companyLogo?: string;
  accent: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content:
      "This product has completely transformed our workflow. The intuitive interface and powerful features have increased our team's productivity by 40%. I can't imagine going back to our old system.",
    rating: 5,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    companyLogo:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    accent: "from-violet-500 to-purple-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "Innovate Inc",
    content:
      "The level of customer support we&apos;ve received has been exceptional. Any questions or issues we&apos;ve had were resolved quickly and professionally. It's rare to find this level of service these days.",
    rating: 5,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    companyLogo:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "DesignHub",
    content:
      "We&apos;ve seen a significant ROI since implementing this solution. Not only has it streamlined our processes, but it's also helped us identify new opportunities for growth. Highly recommended!",
    rating: 4,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    companyLogo:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "David Kim",
    role: "CEO",
    company: "Startup Ventures",
    content:
      "As a fast-growing startup, we needed a solution that could scale with us. This platform has been the perfect fit, adapting to our changing needs while maintaining performance and reliability.",
    rating: 5,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    companyLogo:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    accent: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    role: "UX Director",
    company: "Creative Solutions",
    content:
      "The attention to detail in this product is impressive. It's clear that the team understands the challenges we face and has designed features specifically to address them. It's been a game-changer for our design team.",
    rating: 5,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    companyLogo:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    accent: "from-pink-500 to-rose-500",
  },
];

const TestimonialGradientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 6000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, currentIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {/* Gradient blobs */}
          <motion.div
            className="absolute left-1/4 top-1/4 h-[40vw] w-[40vw] rounded-full bg-gradient-to-r from-violet-200/40 to-purple-200/40 blur-3xl dark:from-violet-900/20 dark:to-purple-900/20"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-[35vw] w-[35vw] rounded-full bg-gradient-to-r from-blue-200/40 to-cyan-200/40 blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 60 + 20;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-md bg-white/20 backdrop-blur-3xl dark:bg-white/5"
              style={{
                width: size,
                height: size,
                x: `${initialX}vw`,
                y: `${initialY}vh`,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [
                  `${initialY}vh`,
                  `${initialY + (Math.random() * 20 - 10)}vh`,
                ],
                x: [
                  `${initialX}vw`,
                  `${initialX + (Math.random() * 20 - 10)}vw`,
                ],
                rotate: [0, 360],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay,
              }}
            />
          );
        })}
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            What Our Clients Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Don&apos;t just take our word for it — hear from some of our
            satisfied customers!
          </motion.p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction === 1 ? 200 : -200,
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{
                opacity: 0,
                x: direction === 1 ? -200 : 200,
                transition: { duration: 0.2 },
              }}
              className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800"
            >
              <div className="grid gap-0 md:grid-cols-5">
                {/* Image column */}
                <div className="relative md:col-span-2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={
                        currentTestimonial.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                      }
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.accent} opacity-20 mix-blend-overlay`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 md:bg-gradient-to-l md:from-black/50 md:via-transparent md:to-transparent" />
                  </div>

                  {/* Company logo overlay */}
                  {currentTestimonial.companyLogo && (
                    <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 p-2 shadow-lg backdrop-blur-sm dark:bg-slate-800/90">
                      <div className="relative h-8 w-24">
                        <Image
                          src={
                            currentTestimonial.companyLogo ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={currentTestimonial.company}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content column */}
                <div className="flex flex-col justify-between p-8 md:col-span-3">
                  <div>
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < currentTestimonial.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -left-2 -top-2 h-8 w-8 text-slate-200 dark:text-slate-700" />
                      <p className="relative z-10 mb-6 text-lg italic text-slate-700 dark:text-slate-300">
                        {currentTestimonial.content}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between">
            <button
              onClick={prevTestimonial}
              className="pointer-events-auto rounded-full bg-white/80 p-2 text-slate-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="pointer-events-auto rounded-full bg-white/80 p-2 text-slate-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-slate-800 dark:bg-white"
                  : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialGradientCarousel;
