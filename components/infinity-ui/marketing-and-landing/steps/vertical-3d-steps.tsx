"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Search,
  Users,
  PenTool,
  Code,
  Rocket,
  Check,
  ArrowRight,
} from "lucide-react";

const stepsData = [
  {
    id: 1,
    title: "Research",
    description:
      "We deeply analyze your industry, competitors, and target audience to identify opportunities.",
    icon: <Search className="h-6 w-6" />,
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-purple-200",
  },
  {
    id: 2,
    title: "User Experience",
    description:
      "Our UX team designs intuitive user flows and information architecture based on research insights.",
    icon: <Users className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-200",
  },
  {
    id: 3,
    title: "Visual Design",
    description:
      "We craft a visually stunning interface that embodies your brand while enhancing usability.",
    icon: <PenTool className="h-6 w-6" />,
    color: "from-teal-500 to-emerald-600",
    shadowColor: "shadow-teal-200",
  },
  {
    id: 4,
    title: "Development",
    description:
      "Our engineers bring designs to life with clean, maintainable code and performance optimization.",
    icon: <Code className="h-6 w-6" />,
    color: "from-orange-500 to-amber-600",
    shadowColor: "shadow-orange-200",
  },
  {
    id: 5,
    title: "Launch & Support",
    description:
      "We ensure a smooth deployment and provide ongoing maintenance and performance monitoring.",
    icon: <Rocket className="h-6 w-6" />,
    color: "from-red-500 to-rose-600",
    shadowColor: "shadow-red-200",
  },
];

const Vertical3DSteps = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.02]" />

        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 opacity-60" />

        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-50 to-emerald-50 opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Our Design Process
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            From concept to completion, we follow a proven methodology to
            deliver exceptional products
          </p>
        </motion.div>

        <motion.div ref={containerRef} className="relative" style={{ opacity }}>
          {/* Center line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 md:block" />

          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.2, duration: 0.6 },
                    }
                  : { opacity: 0, y: 50 }
              }
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } mb-20 items-center gap-8 last:mb-0 md:gap-0`}
            >
              {/* Step icon (center for desktop) */}
              <div className="z-10 order-1 md:absolute md:left-1/2 md:order-none md:-translate-x-1/2">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white ${step.shadowColor} shadow-lg`}
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  rotateY: index % 2 === 0 ? -5 : 5,
                  z: 20,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`group w-full md:w-5/12 ${
                  index % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:pl-16 md:text-left"
                }`}
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-px bg-gradient-to-r ${step.color} rounded-xl opacity-0 blur-sm transition duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}
                    />

                    <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                      Step {step.id}
                    </span>

                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="text-gray-600">{step.description}</p>

                    <div
                      className={`mt-6 flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                    >
                      <motion.button
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center gap-2 text-sm font-medium ${
                          step.color.includes("violet")
                            ? "text-violet-600"
                            : step.color.includes("blue")
                              ? "text-blue-600"
                              : step.color.includes("teal")
                                ? "text-teal-600"
                                : step.color.includes("orange")
                                  ? "text-orange-600"
                                  : "text-red-600"
                        }`}
                      >
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Empty space for alternate layout */}
              <div className="hidden w-5/12 md:block" />
            </motion.div>
          ))}

          {/* Final step marker */}
          <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 md:flex">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                delay: stepsData.length * 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white shadow-lg shadow-indigo-200">
                <Check className="h-8 w-8" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vertical3DSteps;
