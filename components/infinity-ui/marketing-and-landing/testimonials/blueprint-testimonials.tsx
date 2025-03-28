"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Compass,
  Ruler,
  Zap,
  BarChart,
  PieChart,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  stats?: {
    label: string;
    value: string;
    icon: "zap" | "chart" | "pie";
  }[];
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CTO",
    company: "TechVision Inc.",
    content:
      "The development team's technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that's positioned us for future growth.",
    rating: 5,
    stats: [
      { label: "Performance", value: "+240%", icon: "zap" },
      { label: "Scalability", value: "10x", icon: "chart" },
      { label: "Cost Reduction", value: "-35%", icon: "pie" },
    ],
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Marketing Director",
    company: "Global Brands",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    rating: 5,
    stats: [
      { label: "Conversion Rate", value: "+150%", icon: "chart" },
      { label: "CAC Reduction", value: "-40%", icon: "pie" },
      { label: "ROI", value: "320%", icon: "zap" },
    ],
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "NextGen Solutions",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    rating: 5,
    stats: [
      { label: "User Engagement", value: "+70%", icon: "chart" },
      { label: "Satisfaction", value: "9.2/10", icon: "pie" },
      { label: "Retention", value: "+45%", icon: "zap" },
    ],
  },
  {
    id: 4,
    name: "Olivia Martinez",
    role: "Operations Director",
    company: "Logistics Plus",
    content:
      "The supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%. The ROI has been exceptional.",
    rating: 4,
    stats: [
      { label: "Delivery Time", value: "-35%", icon: "zap" },
      { label: "Inventory Accuracy", value: "99.8%", icon: "pie" },
      { label: "Cost Savings", value: "$1.2M", icon: "chart" },
    ],
  },
];

const BlueprintTestimonials = () => {
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

  const getStatIcon = (icon: string) => {
    switch (icon) {
      case "zap":
        return <Zap className="h-5 w-5" />;
      case "chart":
        return <BarChart className="h-5 w-5" />;
      case "pie":
        return <PieChart className="h-5 w-5" />;
      default:
        return <BarChart className="h-5 w-5" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-blue-900 py-24 text-white"
    >
      {/* Blueprint background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Circular elements */}
        <svg
          className="absolute right-20 top-20 h-40 w-40 text-blue-700 opacity-20"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>

        <svg
          className="absolute bottom-20 left-20 h-40 w-40 text-blue-700 opacity-20"
          viewBox="0 0 100 100"
        >
          <motion.rect
            x="10"
            y="10"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.rect
            x="25"
            y="25"
            width="50"
            height="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.rect
            x="40"
            y="40"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>

        {/* Technical drawing lines */}
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full w-full text-blue-700 opacity-10"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 3 }}
          />
          <motion.line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
        </svg>
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
              <Compass className="h-12 w-12 text-blue-400" />
            </div>
          </motion.div>

          <h2 className="mb-4 font-mono text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-blue-300">Technical Performance</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-200">
            Measurable results from our technical implementations
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full border border-blue-600 bg-blue-800 p-3 transition-colors hover:bg-blue-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-blue-300" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full border border-blue-600 bg-blue-800 p-3 transition-colors hover:bg-blue-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-blue-300" />
            </motion.button>
          </div>

          {/* Blueprint card */}
          <div className="relative overflow-hidden rounded-lg border border-blue-600 bg-blue-800">
            {/* Technical drawing decorations */}
            <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 border-l border-t border-blue-500" />
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 border-r border-t border-blue-500" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 border-b border-l border-blue-500" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b border-r border-blue-500" />

            {/* Measurement lines */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 flex h-4 items-center justify-center">
              <div className="h-full border-l border-blue-500" />
              <div
                className="absolute top-0 h-2 border-l border-blue-500"
                style={{ left: "25%" }}
              />
              <div
                className="absolute top-0 h-2 border-l border-blue-500"
                style={{ left: "50%" }}
              />
              <div
                className="absolute top-0 h-2 border-l border-blue-500"
                style={{ left: "75%" }}
              />
              <div className="h-full border-r border-blue-500" />
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
                  className="flex flex-col"
                >
                  {/* Content */}
                  <div className="mb-8">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-blue-700"}`}
                        />
                      ))}
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-blue-700">
                        <Quote className="h-10 w-10" />
                      </div>
                      <blockquote className="relative z-10">
                        <p className="font-mono text-lg leading-relaxed text-blue-100 md:text-xl">
                          &quot;{testimonials[activeIndex].content}&quot;
                        </p>
                      </blockquote>
                    </div>

                    <div className="font-mono">
                      <h3 className="text-xl font-bold text-blue-300">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-blue-200">
                        {testimonials[activeIndex].role},{" "}
                        {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>

                  {/* Technical stats */}
                  {testimonials[activeIndex].stats && (
                    <div className="rounded-lg border border-blue-700 bg-blue-900/50 p-6">
                      <h4 className="mb-4 font-mono text-sm uppercase tracking-wider text-blue-300">
                        Performance Metrics
                      </h4>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {testimonials[activeIndex].stats.map((stat, i) => (
                          <motion.div
                            key={i}
                            className="flex flex-col items-center rounded-lg border border-blue-700 bg-blue-800/50 p-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                          >
                            <div className="mb-2 text-blue-400">
                              {getStatIcon(stat.icon)}
                            </div>
                            <p className="mb-1 font-mono text-2xl font-bold text-blue-300">
                              {stat.value}
                            </p>
                            <p className="font-mono text-sm text-blue-400">
                              {stat.label}
                            </p>

                            {/* Technical drawing decoration */}
                            <svg
                              className="pointer-events-none absolute left-0 top-0 h-full w-full text-blue-600 opacity-20"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                            >
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="4 2"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 60,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                              />
                            </svg>
                          </motion.div>
                        ))}
                      </div>

                      {/* Ruler decoration */}
                      <div className="mt-6 flex items-center justify-center">
                        <Ruler className="mr-2 h-5 w-5 text-blue-500" />
                        <div className="flex h-px flex-grow items-center justify-between bg-blue-700">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-px bg-blue-500 ${i % 5 === 0 ? "h-3" : ""}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
                    ? "scale-125 bg-blue-400"
                    : "bg-blue-700 hover:bg-blue-600"
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

export default BlueprintTestimonials;
