"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileSearch,
  FileCheck,
  FileCode,
  FileText,
  FileUp,
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
    title: "Requirements Analysis",
    description:
      "We gather and analyze your business requirements to define project scope, objectives, and success criteria.",
    icon: <FileSearch className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 2,
    title: "Planning & Design",
    description:
      "Our team creates detailed specifications, wireframes, and technical architecture aligned with your goals.",
    icon: <FileCheck className="h-6 w-6" />,
    color: "indigo",
  },
  {
    id: 3,
    title: "Development",
    description:
      "We build your solution using modern technologies and agile methodologies for optimal results.",
    icon: <FileCode className="h-6 w-6" />,
    color: "violet",
  },
  {
    id: 4,
    title: "Testing & QA",
    description:
      "Rigorous testing ensures your product performs flawlessly across all devices and scenarios.",
    icon: <FileText className="h-6 w-6" />,
    color: "purple",
  },
  {
    id: 5,
    title: "Deployment",
    description:
      "We launch your solution and provide comprehensive training, documentation, and ongoing support.",
    icon: <FileUp className="h-6 w-6" />,
    color: "fuchsia",
  },
];

const FlowchartSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleStepClick = (id: number) => {
    setActiveStep(id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-purple-50 to-fuchsia-50"
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
            Project Workflow
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A structured approach to delivering exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Flowchart visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Flowchart connections */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Vertical line */}
                <motion.path
                  d="M200 0 L200 500"
                  stroke="url(#gradient-line)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.5 }}
                />

                {/* Horizontal connectors */}
                {[1, 2, 3, 4, 5].map((stepId) => (
                  <motion.path
                    key={`connector-${stepId}`}
                    d={`M200 ${100 * stepId - 50} L${stepId % 2 === 1 ? 300 : 100} ${100 * stepId - 50}`}
                    stroke={
                      stepId <= activeStep
                        ? `url(#gradient-connector-${stepId})`
                        : "#E2E8F0"
                    }
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={
                      isInView
                        ? {
                            pathLength: stepId <= activeStep ? 1 : 0.5,
                            opacity: stepId <= activeStep ? 1 : 0.5,
                          }
                        : { pathLength: 0 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + stepId * 0.2,
                    }}
                  />
                ))}

                {/* Gradient definitions */}
                <defs>
                  <linearGradient
                    id="gradient-line"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="25%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="75%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#D946EF" />
                  </linearGradient>

                  <linearGradient
                    id="gradient-connector-1"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>

                  <linearGradient
                    id="gradient-connector-2"
                    x1="1"
                    y1="0"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>

                  <linearGradient
                    id="gradient-connector-3"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>

                  <linearGradient
                    id="gradient-connector-4"
                    x1="1"
                    y1="0"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>

                  <linearGradient
                    id="gradient-connector-5"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#D946EF" />
                    <stop offset="100%" stopColor="#E879F9" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Step nodes */}
              <div className="relative py-10">
                {steps.map((step, index) => {
                  const isOdd = index % 2 === 0;

                  return (
                    <motion.div
                      key={step.id}
                      className={`mb-20 flex items-center last:mb-0 ${isOdd ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              x: 0,
                              transition: {
                                delay: 0.5 + index * 0.2,
                                duration: 0.5,
                              },
                            }
                          : { opacity: 0, x: isOdd ? 50 : -50 }
                      }
                    >
                      <button
                        onClick={() => handleStepClick(step.id)}
                        className={`group relative ${isOdd ? "mr-28" : "ml-28"}`}
                        aria-pressed={activeStep === step.id}
                      >
                        <div className="relative">
                          <div
                            className={`absolute -inset-1 rounded-xl opacity-70 blur-sm ${
                              step.id <= activeStep
                                ? step.color === "blue"
                                  ? "bg-blue-400"
                                  : step.color === "indigo"
                                    ? "bg-indigo-400"
                                    : step.color === "violet"
                                      ? "bg-violet-400"
                                      : step.color === "purple"
                                        ? "bg-purple-400"
                                        : "bg-fuchsia-400"
                                : "bg-gray-200"
                            } opacity-0 transition duration-300 group-hover:opacity-100`}
                          />

                          <div
                            className={`relative flex items-center rounded-xl border p-4 ${
                              step.id <= activeStep
                                ? step.color === "blue"
                                  ? "border-blue-200 bg-blue-50"
                                  : step.color === "indigo"
                                    ? "border-indigo-200 bg-indigo-50"
                                    : step.color === "violet"
                                      ? "border-violet-200 bg-violet-50"
                                      : step.color === "purple"
                                        ? "border-purple-200 bg-purple-50"
                                        : "border-fuchsia-200 bg-fuchsia-50"
                                : "border-gray-200 bg-white"
                            } transition-colors duration-300 ${activeStep === step.id ? "shadow-md" : ""}`}
                          >
                            <div
                              className={`mr-3 rounded-lg p-3 ${
                                step.id <= activeStep
                                  ? step.color === "blue"
                                    ? "bg-blue-100 text-blue-600"
                                    : step.color === "indigo"
                                      ? "bg-indigo-100 text-indigo-600"
                                      : step.color === "violet"
                                        ? "bg-violet-100 text-violet-600"
                                        : step.color === "purple"
                                          ? "bg-purple-100 text-purple-600"
                                          : "bg-fuchsia-100 text-fuchsia-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <div>
                              <span
                                className={`text-sm font-medium ${
                                  step.id <= activeStep
                                    ? step.color === "blue"
                                      ? "text-blue-600"
                                      : step.color === "indigo"
                                        ? "text-indigo-600"
                                        : step.color === "violet"
                                          ? "text-violet-600"
                                          : step.color === "purple"
                                            ? "text-purple-600"
                                            : "text-fuchsia-600"
                                    : "text-gray-400"
                                }`}
                              >
                                Step {step.id}
                              </span>
                              <h3
                                className={`text-lg font-semibold ${
                                  step.id <= activeStep
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {step.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Step content */}
          <div>
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
                        <div className="relative rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                          <div
                            className={`absolute left-0 top-0 h-1 w-full ${
                              step.color === "blue"
                                ? "bg-blue-500"
                                : step.color === "indigo"
                                  ? "bg-indigo-500"
                                  : step.color === "violet"
                                    ? "bg-violet-500"
                                    : step.color === "purple"
                                      ? "bg-purple-500"
                                      : "bg-fuchsia-500"
                            }`}
                          />

                          <div className="mb-6 flex items-center">
                            <div
                              className={`mr-4 rounded-lg p-4 ${
                                step.color === "blue"
                                  ? "bg-blue-100 text-blue-600"
                                  : step.color === "indigo"
                                    ? "bg-indigo-100 text-indigo-600"
                                    : step.color === "violet"
                                      ? "bg-violet-100 text-violet-600"
                                      : step.color === "purple"
                                        ? "bg-purple-100 text-purple-600"
                                        : "bg-fuchsia-100 text-fuchsia-600"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <div>
                              <span
                                className={`mb-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                  step.color === "blue"
                                    ? "bg-blue-100 text-blue-700"
                                    : step.color === "indigo"
                                      ? "bg-indigo-100 text-indigo-700"
                                      : step.color === "violet"
                                        ? "bg-violet-100 text-violet-700"
                                        : step.color === "purple"
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-fuchsia-100 text-fuchsia-700"
                                }`}
                              >
                                Phase {step.id}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900">
                                {step.title}
                              </h3>
                            </div>
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
                              className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2 text-gray-700 transition-colors hover:bg-gray-50"
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
                                step.color === "blue"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : step.color === "indigo"
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : step.color === "violet"
                                      ? "bg-violet-500 hover:bg-violet-600"
                                      : step.color === "purple"
                                        ? "bg-purple-500 hover:bg-purple-600"
                                        : "bg-fuchsia-500 hover:bg-fuchsia-600"
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
      </div>
    </section>
  );
};

export default FlowchartSteps;
