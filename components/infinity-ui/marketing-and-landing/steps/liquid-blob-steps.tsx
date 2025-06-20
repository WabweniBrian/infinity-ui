"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Zap, Palette, Cpu, Rocket } from "lucide-react";

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
    title: "Spark",
    description:
      "We ignite creativity through collaborative brainstorming sessions to generate innovative ideas tailored to your business needs.",
    icon: <Sparkles className="h-6 w-6" />,
    color: "amber",
  },
  {
    id: 2,
    title: "Energize",
    description:
      "Our team transforms concepts into actionable plans with clear objectives, timelines, and resource allocation.",
    icon: <Zap className="h-6 w-6" />,
    color: "purple",
  },
  {
    id: 3,
    title: "Create",
    description:
      "We design intuitive interfaces and experiences that balance aesthetic appeal with functional excellence.",
    icon: <Palette className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 4,
    title: "Build",
    description:
      "Our developers bring designs to life using cutting-edge technologies and best coding practices.",
    icon: <Cpu className="h-6 w-6" />,
    color: "teal",
  },
  {
    id: 5,
    title: "Launch",
    description:
      "We deploy your solution and implement strategies to drive adoption, growth, and continuous improvement.",
    icon: <Rocket className="h-6 w-6" />,
    color: "pink",
  },
];

const LiquidBlobSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleStepClick = (id: number) => {
    setActiveStep(id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-purple-50 to-blue-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-50 to-pink-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Our Creative Flow
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A fluid process that adapts to your unique project needs
          </p>
        </motion.div>

        {/* Blob steps navigation */}
        <motion.div
          className="relative mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        transition: {
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        },
                      }
                    : { scale: 0 }
                }
                className="relative"
              >
                <button
                  onClick={() => handleStepClick(step.id)}
                  className="relative z-10"
                  aria-pressed={activeStep === step.id}
                >
                  {/* Blob shape with gradient */}
                  <div className="relative">
                    {/* Animated blob background */}
                    <motion.div
                      className={`absolute inset-0 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] ${
                        step.color === "amber"
                          ? "bg-amber-400"
                          : step.color === "purple"
                            ? "bg-purple-400"
                            : step.color === "blue"
                              ? "bg-blue-400"
                              : step.color === "teal"
                                ? "bg-teal-400"
                                : "bg-pink-400"
                      } opacity-20 blur-xl`}
                      animate={{
                        borderRadius: [
                          "30% 70% 70% 30% / 30% 30% 70% 70%",
                          "60% 40% 30% 70% / 60% 30% 70% 40%",
                          "30% 60% 70% 40% / 50% 60% 30% 60%",
                          "30% 70% 70% 30% / 30% 30% 70% 70%",
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                      }}
                    />

                    {/* Main blob */}
                    <motion.div
                      className={`relative flex h-24 w-24 items-center justify-center md:h-32 md:w-32 ${
                        activeStep === step.id ? "scale-110" : "scale-100"
                      } transition-transform duration-300`}
                      animate={{
                        borderRadius: [
                          "60% 40% 30% 70% / 60% 30% 70% 40%",
                          "30% 60% 70% 40% / 50% 60% 30% 60%",
                          "60% 40% 30% 70% / 60% 30% 70% 40%",
                          "30% 70% 70% 30% / 30% 30% 70% 70%",
                        ],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        delay: index * 0.5,
                      }}
                      style={{
                        background: `linear-gradient(135deg, ${
                          step.color === "amber"
                            ? "rgb(251, 191, 36), rgb(245, 158, 11)"
                            : step.color === "purple"
                              ? "rgb(168, 85, 247), rgb(139, 92, 246)"
                              : step.color === "blue"
                                ? "rgb(59, 130, 246), rgb(37, 99, 235)"
                                : step.color === "teal"
                                  ? "rgb(45, 212, 191), rgb(20, 184, 166)"
                                  : "rgb(236, 72, 153), rgb(219, 39, 119)"
                        })`,
                      }}
                    >
                      <div
                        className={`flex flex-col items-center justify-center text-white ${
                          activeStep === step.id ? "scale-100" : "scale-90"
                        } transition-transform duration-300`}
                      >
                        <div className="mb-1">{step.icon}</div>
                        <span className="text-center text-sm font-medium md:text-base">
                          {step.title}
                        </span>
                        <span className="text-xs font-medium md:text-sm">
                          Step {step.id}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </button>

                {/* Connecting liquid line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 hidden h-1 w-8 -translate-y-1/2 bg-gradient-to-r from-gray-200 to-transparent md:block" />
                )}
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
                    <div className="absolute -inset-4 -z-10 rounded-[60%_40%_40%_60%/40%_50%_50%_60%] bg-gradient-to-r from-gray-100 to-white" />

                    <div className="relative overflow-hidden rounded-xl">
                      <div className="relative rounded-xl border border-gray-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
                        <div className="mb-6 flex items-center">
                          <div
                            className={`mr-4 rounded-full p-3 ${
                              step.color === "amber"
                                ? "bg-amber-100 text-amber-500"
                                : step.color === "purple"
                                  ? "bg-purple-100 text-purple-500"
                                  : step.color === "blue"
                                    ? "bg-blue-100 text-blue-500"
                                    : step.color === "teal"
                                      ? "bg-teal-100 text-teal-500"
                                      : "bg-pink-100 text-pink-500"
                            }`}
                          >
                            {step.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            {step.title}
                          </h3>
                        </div>

                        <p className="mb-6 text-lg text-gray-600">
                          {step.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() =>
                              handleStepClick(
                                step.id === 1 ? steps.length : step.id - 1,
                              )
                            }
                            className="flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-gray-700 transition-colors hover:bg-gray-50"
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
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-white transition-colors ${
                              step.color === "amber"
                                ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                : step.color === "purple"
                                  ? "bg-gradient-to-r from-purple-400 to-purple-500"
                                  : step.color === "blue"
                                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                                    : step.color === "teal"
                                      ? "bg-gradient-to-r from-teal-400 to-teal-500"
                                      : "bg-gradient-to-r from-pink-400 to-pink-500"
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LiquidBlobSteps;
