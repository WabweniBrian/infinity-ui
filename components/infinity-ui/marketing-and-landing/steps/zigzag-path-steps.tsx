"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessagesSquare,
  FileSpreadsheet,
  Shuffle,
  Layout,
  CheckCheck,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We start with a thorough consultation to understand your goals, target audience, and business needs.",
    icon: <MessagesSquare className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 2,
    title: "Project Planning",
    description:
      "Our team creates a detailed roadmap with milestones, deliverables, and resource allocation.",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    color: "purple",
  },
  {
    id: 3,
    title: "Prototype & Iteration",
    description:
      "We develop initial prototypes and refine them based on your feedback for optimal results.",
    icon: <Shuffle className="h-6 w-6" />,
    color: "teal",
  },
  {
    id: 4,
    title: "Implementation",
    description:
      "Our developers bring the approved designs to life with clean, efficient code and thorough testing.",
    icon: <Layout className="h-6 w-6" />,
    color: "amber",
  },
  {
    id: 5,
    title: "Launch & Support",
    description:
      "We ensure a smooth deployment and provide ongoing maintenance and performance monitoring.",
    icon: <CheckCheck className="h-6 w-6" />,
    color: "pink",
  },
];

const ZigzagPathSteps = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-purple-50"
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
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            How We Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our proven step-by-step process delivers consistent results
          </p>
        </motion.div>

        <div className="relative">
          {/* ZigZag path for medium screens and up */}
          <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 md:block">
            <svg
              className="h-full"
              width="50"
              viewBox="0 0 50 2000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMax meet"
            >
              <path
                d="M25 0V400L45 500L25 600V1000L5 1100L25 1200V1600L45 1700L25 1800V2000"
                stroke="url(#gradient-path)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="path-drawing"
              />
              <defs>
                <linearGradient
                  id="gradient-path"
                  x1="25"
                  y1="0"
                  x2="25"
                  y2="2000"
                  gradientUnits="userSpaceOnUse"
                  className="h-full"
                >
                  <stop offset="0" stopColor="#3B82F6" />
                  <stop offset="0.2" stopColor="#8B5CF6" />
                  <stop offset="0.4" stopColor="#14B8A6" />
                  <stop offset="0.6" stopColor="#F59E0B" />
                  <stop offset="0.8" stopColor="#EC4899" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.2, duration: 0.5 },
                      }
                    : { opacity: 0, y: 30 }
                }
                className={`flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} mb-8 last:mb-0 md:mb-24`}
              >
                {/* Step card */}
                <div
                  className={`w-full md:w-5/12 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="group"
                  >
                    <div className="relative">
                      <div
                        className={`absolute -inset-1 rounded-xl bg-gradient-to-r opacity-70 blur-sm ${
                          step.color === "blue"
                            ? "from-blue-400 to-cyan-400"
                            : step.color === "purple"
                              ? "from-purple-400 to-violet-400"
                              : step.color === "teal"
                                ? "from-teal-400 to-emerald-400"
                                : step.color === "amber"
                                  ? "from-amber-400 to-yellow-400"
                                  : "from-pink-400 to-rose-400"
                        } opacity-0 transition duration-300 group-hover:opacity-100`}
                      />
                      <div className="relative rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                        <div
                          className={`mb-4 inline-flex items-center justify-center rounded-lg p-3 ${
                            step.color === "blue"
                              ? "bg-blue-100 text-blue-500"
                              : step.color === "purple"
                                ? "bg-purple-100 text-purple-500"
                                : step.color === "teal"
                                  ? "bg-teal-100 text-teal-500"
                                  : step.color === "amber"
                                    ? "bg-amber-100 text-amber-500"
                                    : "bg-pink-100 text-pink-500"
                          }`}
                        >
                          {step.icon}
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>

                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center step indicator */}
                <div className="z-10 hidden md:absolute md:left-1/2 md:block md:-translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                            transition: {
                              delay: index * 0.2 + 0.1,
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            },
                          }
                        : { scale: 0 }
                    }
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white shadow-xl ${
                      step.color === "blue"
                        ? "border-blue-400"
                        : step.color === "purple"
                          ? "border-purple-400"
                          : step.color === "teal"
                            ? "border-teal-400"
                            : step.color === "amber"
                              ? "border-amber-400"
                              : "border-pink-400"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold ${
                        step.color === "blue"
                          ? "text-blue-500"
                          : step.color === "purple"
                            ? "text-purple-500"
                            : step.color === "teal"
                              ? "text-teal-500"
                              : step.color === "amber"
                                ? "text-amber-500"
                                : "text-pink-500"
                      }`}
                    >
                      {step.id}
                    </span>
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden w-5/12 md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ZigzagPathSteps;
