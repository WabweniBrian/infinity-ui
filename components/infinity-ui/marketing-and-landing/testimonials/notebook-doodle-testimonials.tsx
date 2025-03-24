"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Smile,
  Coffee,
  LightbulbIcon as LightBulb,
  Rocket,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  doodle: "smile" | "coffee" | "lightbulb" | "rocket" | "heart";
  color: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jamie Wilson",
    role: "Creative Director",
    company: "Design Studio",
    content:
      "Working with this team was a breath of fresh air! They understood our vision immediately and delivered a website that perfectly captures our brand's personality.",
    rating: 5,
    doodle: "smile",
    color: "blue",
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Startup Founder",
    company: "TechLaunch",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    rating: 5,
    doodle: "rocket",
    color: "green",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "Brand Innovators",
    content:
      "The creative approach they brought to our marketing materials completely transformed our campaign. We saw engagement increase by 200% within the first month!",
    rating: 5,
    doodle: "lightbulb",
    color: "amber",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Product Owner",
    company: "SaaS Platform",
    content:
      "Their attention to detail and user-focused design philosophy helped us simplify our complex product. Our users love the new interface!",
    rating: 5,
    doodle: "coffee",
    color: "red",
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "E-commerce Director",
    company: "Retail Innovations",
    content:
      "The e-commerce solution they built for us increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible.",
    rating: 5,
    doodle: "heart",
    color: "purple",
  },
];

const NotebookDoodleTestimonials = () => {
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

  const getDoodleIcon = (doodle: string) => {
    switch (doodle) {
      case "smile":
        return <Smile className="h-full w-full" />;
      case "coffee":
        return <Coffee className="h-full w-full" />;
      case "lightbulb":
        return <LightBulb className="h-full w-full" />;
      case "rocket":
        return <Rocket className="h-full w-full" />;
      case "heart":
        return <Heart className="h-full w-full" />;
      default:
        return <Smile className="h-full w-full" />;
    }
  };

  const getDoodleColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "text-blue-500",
      green: "text-green-500",
      amber: "text-amber-500",
      red: "text-red-500",
      purple: "text-purple-500",
    };

    return colors[color] || colors.blue;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        background: `
          repeating-linear-gradient(
            0deg,
            #f8fafc,
            #f8fafc 24px,
            #e5e7eb 24px,
            #e5e7eb 25px
          )
        `,
      }}
    >
      {/* Notebook holes */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex w-16 flex-col items-center justify-center">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="my-8 h-8 w-8 rounded-full border-2 border-gray-300 bg-white shadow-inner"
          />
        ))}
      </div>

      {/* Red margin line */}
      <div className="pointer-events-none absolute bottom-0 left-16 top-0 w-px bg-red-400" />

      {/* Doodle elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-20 top-20 h-24 w-24 rotate-12 text-blue-400 opacity-20"
          initial={{ scale: 0, rotate: -20 }}
          animate={
            isInView ? { scale: 1, rotate: 12 } : { scale: 0, rotate: -20 }
          }
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Rocket className="h-full w-full" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-40 h-20 w-20 -rotate-12 text-amber-400 opacity-20"
          initial={{ scale: 0, rotate: 20 }}
          animate={
            isInView ? { scale: 1, rotate: -12 } : { scale: 0, rotate: 20 }
          }
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <LightBulb className="h-full w-full" />
        </motion.div>

        <motion.div
          className="absolute right-1/4 top-1/2 h-16 w-16 rotate-45 text-red-400 opacity-20"
          initial={{ scale: 0, rotate: 0 }}
          animate={
            isInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }
          }
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Heart className="h-full w-full" />
        </motion.div>

        {/* Scribble lines */}
        <svg
          className="absolute left-1/3 top-10 h-20 w-40 text-gray-300"
          viewBox="0 0 100 50"
        >
          <motion.path
            d="M10,25 C20,10 30,40 40,25 C50,10 60,40 70,25 C80,10 90,40 100,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </svg>

        <svg
          className="absolute bottom-20 right-1/3 h-20 w-40 text-gray-300"
          viewBox="0 0 100 50"
        >
          <motion.path
            d="M0,25 C10,40 20,10 30,25 C40,40 50,10 60,25 C70,40 80,10 90,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 pl-20">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-handwriting mb-4 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="font-handwriting mx-auto max-w-2xl text-lg text-gray-600">
            Real feedback from real people who love working with us
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full border-2 border-gray-300 bg-white p-3 transition-colors hover:bg-gray-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full border-2 border-gray-300 bg-white p-3 transition-colors hover:bg-gray-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </motion.button>
          </div>

          {/* Notebook paper card */}
          <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-lg">
            {/* Torn paper edge */}
            <div className="absolute left-0 right-0 top-0 h-4 overflow-hidden bg-white">
              <svg
                className="h-8 w-full"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 L2,5 L4,7 L6,3 L8,6 L10,4 L12,7 L14,2 L16,6 L18,3 L20,5 L22,2 L24,6 L26,3 L28,5 L30,2 L32,7 L34,3 L36,6 L38,2 L40,5 L42,7 L44,3 L46,5 L48,2 L50,6 L52,3 L54,7 L56,2 L58,5 L60,3 L62,6 L64,2 L66,5 L68,7 L70,3 L72,6 L74,2 L76,5 L78,3 L80,7 L82,2 L84,6 L86,3 L88,5 L90,2 L92,7 L94,3 L96,6 L98,3 L100,5 L100,0 L0,0 Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="p-8 pt-10 md:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonials[activeIndex].id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col"
                >
                  {/* Doodle icon */}
                  <motion.div
                    className={`mx-auto mb-6 h-16 w-16 ${getDoodleColor(testimonials[activeIndex].color)}`}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    {getDoodleIcon(testimonials[activeIndex].doodle)}
                  </motion.div>

                  {/* Content */}
                  <div className="mb-8">
                    <blockquote>
                      <p className="font-handwriting text-center text-xl leading-relaxed text-gray-700 md:text-2xl">
                        &quot;{testimonials[activeIndex].content}&quot;
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    <h3 className="font-handwriting text-xl font-bold text-gray-900">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="font-handwriting text-gray-600">
                      {testimonials[activeIndex].role},{" "}
                      {testimonials[activeIndex].company}
                    </p>

                    {/* Signature line */}
                    <motion.div
                      className="mt-4 h-px w-40 bg-gray-400"
                      initial={{ width: 0 }}
                      animate={{ width: 160 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
      </div>

      {/* Add custom font for handwriting */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap");

        .font-handwriting {
          font-family: "Caveat", cursive;
        }
      `}</style>
    </section>
  );
};

export default NotebookDoodleTestimonials;
