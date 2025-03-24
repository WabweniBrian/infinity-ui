"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Lightbulb,
  Layers,
  Wand2,
  Monitor,
  BarChart,
  ArrowRight,
} from "lucide-react";

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
    title: "Discovery",
    description:
      "We begin by understanding your business objectives, target audience, and project requirements to establish the foundation for success.",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "bg-amber-500",
  },
  {
    id: 2,
    title: "Strategy",
    description:
      "Our team develops a comprehensive plan including technical architecture, content strategy, and timeline to ensure alignment with your goals.",
    icon: <Layers className="h-6 w-6" />,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Design",
    description:
      "We create visually stunning, user-centered interfaces that combine aesthetics with functionality and reflect your brand identity.",
    icon: <Wand2 className="h-6 w-6" />,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Development",
    description:
      "Our engineers transform designs into functional products using clean code practices, ensuring performance, accessibility, and security.",
    icon: <Monitor className="h-6 w-6" />,
    color: "bg-teal-500",
  },
  {
    id: 5,
    title: "Analytics",
    description:
      "After launch, we provide continuous monitoring, data analysis, and optimization to drive growth and ensure long-term success.",
    icon: <BarChart className="h-6 w-6" />,
    color: "bg-red-500",
  },
];

const RadialSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleStepClick = (id: number) => {
    setActiveStep(id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 text-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=80&width=80')] bg-repeat opacity-[0.03]" />

        {/* Gradient orbs */}
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-900/20 to-red-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Project Roadmap
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            A proven methodology designed to deliver exceptional results
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Radial steps navigator */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative z-10 mx-auto aspect-square max-w-xl">
              {/* Center circle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex h-32 w-32 origin-center transform items-center justify-center rounded-full border-4 border-gray-700 bg-gray-800 md:h-40 md:w-40 lg:h-48 lg:w-48"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 60,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <div className="text-center">
                    <p className="mb-1 text-sm text-gray-400">Step</p>
                    <p className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
                      {activeStep}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Step circles positioned around center */}
              {steps.map((step, index) => {
                // Calculate position on the circle
                const angle =
                  ((2 * Math.PI) / steps.length) * index - Math.PI / 2;
                const radius = 43; // % of container
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={step.id}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transform"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? {
                              scale: 1,
                              opacity: 1,
                            }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <button
                        onClick={() => handleStepClick(step.id)}
                        className="group relative"
                        aria-pressed={activeStep === step.id}
                      >
                        <span
                          className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ${
                            activeStep === step.id
                              ? `${step.color} scale-110 text-white shadow-lg`
                              : "border-2 border-gray-700 bg-gray-800 text-gray-300 group-hover:border-gray-600"
                          }`}
                        >
                          {step.icon}
                        </span>
                      </button>
                    </motion.div>
                  </div>
                );
              })}

              {/* Visual elements - circles and rings */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 animate-pulse rounded-full border border-gray-700" />
                <div className="absolute inset-[15%] rounded-full border border-gray-700/50" />
                <div className="absolute inset-[30%] rounded-full border border-gray-700/50" />
              </div>
            </div>
          </motion.div>

          {/* Step content */}
          <div className="w-full lg:w-1/2">
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
                      <div className="overflow-hidden rounded-xl">
                        <div className="relative rounded-xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                          <div
                            className={`absolute left-0 top-0 h-full w-1 ${step.color}`}
                          />

                          <div className="mb-6">
                            <span
                              className={`inline-block ${
                                step.color.includes("amber")
                                  ? "bg-amber-500/20 text-amber-300"
                                  : step.color.includes("blue")
                                    ? "bg-blue-500/20 text-blue-300"
                                    : step.color.includes("purple")
                                      ? "bg-purple-500/20 text-purple-300"
                                      : step.color.includes("teal")
                                        ? "bg-teal-500/20 text-teal-300"
                                        : "bg-red-500/20 text-red-300"
                              } rounded-full px-3 py-1 text-sm font-medium`}
                            >
                              Phase {step.id}
                            </span>
                          </div>

                          <h3 className="mb-4 text-3xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent">
                            {step.title}
                          </h3>

                          <p className="mb-6 text-lg text-gray-300">
                            {step.description}
                          </p>

                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() =>
                                handleStepClick(
                                  step.id === 1 ? steps.length : step.id - 1,
                                )
                              }
                              className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800"
                            >
                              <ArrowRight className="h-4 w-4 rotate-180" />
                              <span>Previous</span>
                            </button>

                            <button
                              onClick={() =>
                                handleStepClick(
                                  step.id === steps.length ? 1 : step.id + 1,
                                )
                              }
                              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors ${step.color
                                .replace("bg-", "bg-")
                                .replace("500", "600")}`}
                            >
                              <span>Next</span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
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
      </div>
    </section>
  );
};

export default RadialSteps;
