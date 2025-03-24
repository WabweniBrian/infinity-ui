"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Lightbulb, Palette, Code, BarChart, Rocket } from "lucide-react";

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
    title: "Ideation",
    description:
      "We brainstorm innovative concepts aligned with your business goals and target audience needs.",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    title: "Design",
    description:
      "Our designers create visually stunning interfaces that balance aesthetics with usability.",
    icon: <Palette className="h-6 w-6" />,
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 3,
    title: "Development",
    description:
      "We build your solution using cutting-edge technologies and best coding practices.",
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 4,
    title: "Testing & Optimization",
    description:
      "Rigorous testing ensures your product performs flawlessly across all devices and scenarios.",
    icon: <BarChart className="h-6 w-6" />,
    color: "from-teal-400 to-emerald-500",
  },
  {
    id: 5,
    title: "Launch & Growth",
    description:
      "We deploy your product and implement strategies to drive adoption and continuous improvement.",
    icon: <Rocket className="h-6 w-6" />,
    color: "from-rose-400 to-pink-500",
  },
];

const CarouselWheelSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const wheelRef = useRef<HTMLDivElement>(null);

  // Auto-rotate the wheel
  useEffect(() => {
    if (isInView && autoRotate) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev === steps.length ? 1 : prev + 1));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isInView, autoRotate]);

  // Calculate positions for each step in the wheel
  const getStepPosition = (stepId: number, totalSteps: number) => {
    // Calculate the angle for this step (in radians)
    const angleStep = (2 * Math.PI) / totalSteps;
    const angle = (stepId - 1) * angleStep - Math.PI / 2; // Start from top

    // Calculate the rotation for this step
    const rotation = (stepId - 1) * (360 / totalSteps);

    // Calculate the distance from center (radius)
    const radius = 180; // pixels

    // Calculate x and y coordinates
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { x, y, rotation };
  };

  // Calculate wheel rotation based on active step
  const getWheelRotation = () => {
    const stepAngle = 360 / steps.length;
    return -1 * (activeStep - 1) * stepAngle;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24 text-white"
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
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Development Cycle
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            A continuous process of innovation and improvement
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* 3D Wheel */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="perspective-1000 relative mx-auto aspect-square max-w-xl">
              {/* Wheel container with 3D rotation */}
              <motion.div
                ref={wheelRef}
                className="transform-style-3d relative h-full w-full"
                animate={{
                  rotateY: getWheelRotation(),
                }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              >
                {/* Center hub */}
                <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-gray-700 bg-gray-800">
                  <div className="text-center">
                    <p className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                      {activeStep}
                    </p>
                  </div>
                </div>

                {/* Step cards positioned around the wheel */}
                {steps.map((step) => {
                  const { x, y, rotation } = getStepPosition(
                    step.id,
                    steps.length,
                  );
                  const isActive = step.id === activeStep;

                  return (
                    <motion.div
                      key={step.id}
                      className="transform-style-3d absolute left-1/2 top-1/2"
                      style={{
                        x,
                        y,
                        translateX: "-50%",
                        translateY: "-50%",
                        zIndex: isActive ? 5 : 0,
                      }}
                      whileHover={{ scale: 1.05 }}
                      animate={{
                        rotateZ: -getWheelRotation(),
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 20,
                      }}
                    >
                      <button
                        onClick={() => {
                          setActiveStep(step.id);
                          setAutoRotate(false);
                        }}
                        className={`transform-style-3d h-24 w-24 rounded-xl transition-all duration-300 md:h-32 md:w-32 ${
                          isActive
                            ? "shadow-lg shadow-gray-900/50"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        style={{
                          transform: `rotateY(${isActive ? 0 : 15}deg) rotateX(${isActive ? 0 : 5}deg)`,
                        }}
                      >
                        <div
                          className={`h-full w-full rounded-xl bg-gradient-to-br ${step.color} flex flex-col items-center justify-center p-3 text-white`}
                        >
                          <div className="mb-2">{step.icon}</div>
                          <p className="text-center text-sm font-medium text-gray-200">
                            {step.title}
                          </p>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}

                {/* Visual elements - connecting lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {steps.map((step) => {
                    const { x, y } = getStepPosition(step.id, steps.length);
                    const isActive = step.id === activeStep;

                    // Calculate angle for the line
                    const angle = Math.atan2(y, x) * (180 / Math.PI);

                    return (
                      <motion.div
                        key={`line-${step.id}`}
                        className={`absolute h-0.5 origin-left ${
                          isActive
                            ? "bg-gradient-to-r from-gray-700 via-gray-600 to-transparent"
                            : "bg-gray-800"
                        }`}
                        style={{
                          width: 180, // radius length
                          rotate: angle,
                          opacity: isActive ? 1 : 0.5,
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>
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
                            className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${step.color}`}
                          />

                          <div className="mb-6">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                step.color.includes("amber")
                                  ? "bg-amber-500/20 text-amber-300"
                                  : step.color.includes("purple")
                                    ? "bg-purple-500/20 text-purple-300"
                                    : step.color.includes("blue")
                                      ? "bg-blue-500/20 text-blue-300"
                                      : step.color.includes("teal")
                                        ? "bg-teal-500/20 text-teal-300"
                                        : "bg-rose-500/20 text-rose-300"
                              }`}
                            >
                              Phase {step.id}
                            </span>
                          </div>

                          <h3 className="mb-4 text-3xl font-bold text-white">
                            {step.title}
                          </h3>

                          <p className="mb-6 text-lg text-gray-300">
                            {step.description}
                          </p>

                          <div className="flex space-x-4 pt-2">
                            <button
                              onClick={() => {
                                setActiveStep(
                                  step.id === 1 ? steps.length : step.id - 1,
                                );
                                setAutoRotate(false);
                              }}
                              className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800"
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
                              onClick={() => {
                                setActiveStep(
                                  step.id === steps.length ? 1 : step.id + 1,
                                );
                                setAutoRotate(false);
                              }}
                              className={`flex items-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2 text-white transition-colors ${step.color}`}
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

export default CarouselWheelSteps;
