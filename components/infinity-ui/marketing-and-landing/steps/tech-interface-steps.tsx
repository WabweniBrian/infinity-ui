"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Scan, Cpu, Layers, BarChart3, Power } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "System Analysis",
    description:
      "We perform a comprehensive analysis of your current systems, business processes, and technical requirements.",
    icon: <Scan className="h-6 w-6" />,
    color: "cyan",
  },
  {
    id: 2,
    title: "Architecture Design",
    description:
      "Our engineers design a scalable, secure architecture tailored to your specific business needs.",
    icon: <Cpu className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 3,
    title: "Development",
    description:
      "We build your solution using cutting-edge technologies and agile methodologies for optimal results.",
    icon: <Layers className="h-6 w-6" />,
    color: "indigo",
  },
  {
    id: 4,
    title: "Performance Testing",
    description:
      "Rigorous testing ensures your system performs flawlessly under various conditions and load scenarios.",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "violet",
  },
  {
    id: 5,
    title: "Deployment",
    description:
      "We deploy your solution with minimal disruption and provide comprehensive training and documentation.",
    icon: <Power className="h-6 w-6" />,
    color: "purple",
  },
];

const TechInterfaceSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleStepClick = (id: number) => {
    setActiveStep(id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black py-24 text-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat opacity-[0.05]" />

        {/* Tech circuit lines */}
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,20 L40,20 L40,40 L60,40 L60,60 L40,60 L40,80 L100,80"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M0,30 L30,30 L30,70 L70,70 L70,30 L100,30"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: 0.3 }}
            />
            <motion.path
              d="M0,50 L20,50 L20,20 L80,20 L80,50 L100,50"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: 0.6 }}
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            System Implementation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            A systematic approach to delivering high-performance solutions
          </p>
        </motion.div>

        {/* Tech interface steps */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex items-center justify-between">
            {/* Progress bar */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-800" />

            <motion.div
              className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
              style={{
                width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Step indicators */}
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        transition: {
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        },
                      }
                    : { scale: 0 }
                }
                className="relative z-10"
              >
                <button
                  onClick={() => handleStepClick(step.id)}
                  className="group relative"
                  aria-pressed={activeStep === step.id}
                >
                  {/* Hexagon shape */}
                  <div className="relative">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      className={`transition-all duration-300 ${step.id <= activeStep ? "opacity-100" : "opacity-50"}`}
                    >
                      <motion.path
                        d="M30 0L55.98 15V45L30 60L4.02 45V15L30 0Z"
                        fill={
                          step.id <= activeStep
                            ? step.color === "cyan"
                              ? "#06B6D4"
                              : step.color === "blue"
                                ? "#3B82F6"
                                : step.color === "indigo"
                                  ? "#6366F1"
                                  : step.color === "violet"
                                    ? "#8B5CF6"
                                    : "#A855F7"
                            : "#1F2937"
                        }
                        strokeWidth="2"
                        stroke={
                          step.color === "cyan"
                            ? "#06B6D4"
                            : step.color === "blue"
                              ? "#3B82F6"
                              : step.color === "indigo"
                                ? "#6366F1"
                                : step.color === "violet"
                                  ? "#8B5CF6"
                                  : "#A855F7"
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>

                  {/* Step number */}
                  <div
                    className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      step.id <= activeStep
                        ? "bg-white text-gray-900"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Step title */}
                  <div
                    className={`absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-sm font-medium sm:block ${
                      step.id === activeStep ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step content */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {steps.map((step) => {
              if (step.id !== activeStep) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="overflow-hidden rounded-lg">
                      <div className="relative rounded-lg border border-gray-700 bg-gray-800/80 p-8 backdrop-blur-sm">
                        {/* Glowing border effect */}
                        <div
                          className={`absolute inset-0 rounded-lg opacity-20 ${
                            step.color === "cyan"
                              ? "bg-cyan-500"
                              : step.color === "blue"
                                ? "bg-blue-500"
                                : step.color === "indigo"
                                  ? "bg-indigo-500"
                                  : step.color === "violet"
                                    ? "bg-violet-500"
                                    : "bg-purple-500"
                          } blur-sm`}
                        />

                        <div className="relative">
                          <div className="mb-6 flex items-center">
                            <div
                              className={`mr-4 rounded-lg p-3 ${
                                step.color === "cyan"
                                  ? "bg-cyan-900/50 text-cyan-400"
                                  : step.color === "blue"
                                    ? "bg-blue-900/50 text-blue-400"
                                    : step.color === "indigo"
                                      ? "bg-indigo-900/50 text-indigo-400"
                                      : step.color === "violet"
                                        ? "bg-violet-900/50 text-violet-400"
                                        : "bg-purple-900/50 text-purple-400"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <div>
                              <span
                                className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  step.color === "cyan"
                                    ? "bg-cyan-900/50 text-cyan-400"
                                    : step.color === "blue"
                                      ? "bg-blue-900/50 text-blue-400"
                                      : step.color === "indigo"
                                        ? "bg-indigo-900/50 text-indigo-400"
                                        : step.color === "violet"
                                          ? "bg-violet-900/50 text-violet-400"
                                          : "bg-purple-900/50 text-purple-400"
                                }`}
                              >
                                Phase {step.id}
                              </span>
                              <h3 className="text-2xl font-bold text-white">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <p className="mb-6 text-lg text-gray-300">
                            {step.description}
                          </p>

                          <div className="flex space-x-4">
                            <button
                              onClick={() =>
                                handleStepClick(
                                  step.id === 1 ? steps.length : step.id - 1,
                                )
                              }
                              className="flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-2 text-gray-300 transition-colors hover:bg-gray-700/50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="rotate-180"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              <span>Previous</span>
                            </button>

                            <button
                              onClick={() =>
                                handleStepClick(
                                  step.id === steps.length ? 1 : step.id + 1,
                                )
                              }
                              className={`flex items-center gap-2 rounded-lg px-5 py-2 text-white transition-colors ${
                                step.color === "cyan"
                                  ? "bg-cyan-600 hover:bg-cyan-700"
                                  : step.color === "blue"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : step.color === "indigo"
                                      ? "bg-indigo-600 hover:bg-indigo-700"
                                      : step.color === "violet"
                                        ? "bg-violet-600 hover:bg-violet-700"
                                        : "bg-purple-600 hover:bg-purple-700"
                              }`}
                            >
                              <span>Next</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechInterfaceSteps;
