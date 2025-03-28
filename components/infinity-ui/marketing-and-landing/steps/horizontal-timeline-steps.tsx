"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Research & Discovery",
    description:
      "We analyze your business needs, target audience, and competitive landscape to establish project goals and strategy.",
  },
  {
    id: 2,
    title: "Planning & Strategy",
    description:
      "Our team creates a detailed roadmap including timelines, deliverables, and technical specifications aligned with your vision.",
  },
  {
    id: 3,
    title: "Design & Prototyping",
    description:
      "We develop visual concepts and interactive prototypes that bring your ideas to life with user-centered design principles.",
  },
  {
    id: 4,
    title: "Development & Testing",
    description:
      "Our developers build your solution with clean code while ensuring functionality, performance, and compatibility.",
  },
  {
    id: 5,
    title: "Launch & Support",
    description:
      "We deploy your project and provide ongoing maintenance, updates, and technical support to ensure continued success.",
  },
];

const HorizontalTimelineSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Auto-progress through steps
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length) {
            return 1;
          }
          return prev + 1;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Update progress bar when active step changes
  useEffect(() => {
    setProgress(((activeStep - 1) / (steps.length - 1)) * 100);
  }, [activeStep]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-4 py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-sky-50 to-indigo-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-50 to-red-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Our Process
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We follow a proven step-by-step methodology to deliver exceptional
            results
          </p>
        </motion.div>

        {/* Timeline steps on larger screens */}
        <motion.div
          className="relative mb-12 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Progress bar background */}
          <div className="absolute left-0 right-0 top-12 h-1 rounded-full bg-gray-200" />

          {/* Animated progress overlay */}
          <motion.div
            className="absolute left-0 top-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Step markers */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + step.id * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <button
                  onClick={() => handleStepClick(step.id)}
                  className="relative flex flex-col items-center"
                  aria-current={activeStep === step.id ? "step" : undefined}
                >
                  <div
                    className={`relative z-10 mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      step.id <= activeStep
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                        : "border-2 border-gray-300 bg-white text-gray-400"
                    } transition-colors duration-300`}
                  >
                    {step.id < activeStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>

                  {/* Step title */}
                  <span
                    className={`absolute top-14 -ml-16 w-32 text-center text-sm font-medium ${
                      step.id === activeStep ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active step details */}
        <div className="relative mt-24">
          <AnimatePresence mode="wait">
            {steps.map((step) => {
              if (step.id !== activeStep) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-8 py-8 md:flex-row md:gap-16"
                >
                  <motion.div
                    className="relative w-full md:w-1/3"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 opacity-20 blur-2xl" />
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90" />
                        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay" />

                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="p-8 text-center">
                            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                              <span className="text-5xl font-bold">
                                {step.id}
                              </span>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="w-full md:w-2/3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 md:hidden md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mb-6 text-lg text-gray-600">
                      {step.description}
                    </p>

                    <div className="flex space-x-4">
                      <button
                        onClick={() =>
                          handleStepClick(
                            step.id - 1 > 0 ? step.id - 1 : steps.length,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={step.id === 1}
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        <span>Previous</span>
                      </button>

                      <button
                        onClick={() =>
                          handleStepClick(
                            step.id + 1 <= steps.length ? step.id + 1 : 1,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-white transition-colors hover:from-blue-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={step.id === steps.length}
                      >
                        <span>Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Mobile stepper */}
          <div className="mt-8 flex justify-center md:hidden">
            <div className="flex space-x-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`h-3 w-3 rounded-full ${
                    step.id === activeStep
                      ? "bg-blue-500"
                      : step.id < activeStep
                        ? "bg-blue-300"
                        : "bg-gray-300"
                  }`}
                  aria-label={`Go to step ${step.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalTimelineSteps;
