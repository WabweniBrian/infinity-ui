"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Scan, Database, Cpu, BarChart3, Power } from "lucide-react";

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
    title: "System Scan",
    description:
      "Our AI-powered analysis evaluates your current infrastructure and identifies optimization opportunities.",
    icon: <Scan className="h-6 w-6" />,
    color: "cyan",
  },
  {
    id: 2,
    title: "Data Integration",
    description:
      "We seamlessly connect your existing systems and data sources into a unified digital ecosystem.",
    icon: <Database className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 3,
    title: "Core Processing",
    description:
      "Our advanced algorithms transform raw data into actionable intelligence for your business.",
    icon: <Cpu className="h-6 w-6" />,
    color: "indigo",
  },
  {
    id: 4,
    title: "Performance Analysis",
    description:
      "Comprehensive testing ensures optimal system performance under various conditions and scenarios.",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "violet",
  },
  {
    id: 5,
    title: "System Activation",
    description:
      "We deploy your solution with minimal disruption and provide ongoing monitoring and support.",
    icon: <Power className="h-6 w-6" />,
    color: "purple",
  },
];

const HolographicSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const hologramRef = useRef<HTMLDivElement>(null);

  // Trigger glitch effect on step change
  useEffect(() => {
    setGlitchEffect(true);
    const timer = setTimeout(() => setGlitchEffect(false), 1000);
    return () => clearTimeout(timer);
  }, [activeStep]);

  // Hologram scan effect
  useEffect(() => {
    if (!hologramRef.current || !isInView) return;

    const hologram = hologramRef.current;
    let scanPosition = 0;
    let direction = 1;

    const animateScan = () => {
      if (!hologram) return;

      scanPosition += 0.5 * direction;

      if (scanPosition >= 100) {
        direction = -1;
      } else if (scanPosition <= 0) {
        direction = 1;
      }

      hologram.style.setProperty("--scan-position", `${scanPosition}%`);
      requestAnimationFrame(animateScan);
    };

    const animationId = requestAnimationFrame(animateScan);
    return () => cancelAnimationFrame(animationId);
  }, [isInView]);

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
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M0,30 L30,30 L30,70 L70,70 L70,30 L100,30"
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: 0.3 }}
            />
            <motion.path
              d="M0,50 L20,50 L20,20 L80,20 L80,50 L100,50"
              stroke="rgba(167, 139, 250, 0.3)"
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
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Quantum Process System
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Next-generation approach to digital transformation
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Holographic display */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              ref={hologramRef}
              className="hologram-container relative mx-auto aspect-square max-w-xl"
            >
              {/* Hologram base */}
              <div className="absolute bottom-0 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-cyan-500/30 blur-md" />

              {/* Hologram projection */}
              <div className="hologram-projection absolute inset-10 overflow-hidden rounded-lg">
                {/* Scan line effect */}
                <div className="hologram-scan-line absolute inset-0" />

                {/* Glitch effect */}
                <div
                  className={`hologram-glitch absolute inset-0 ${glitchEffect ? "active" : ""}`}
                />

                {/* Content */}
                <div className="relative flex h-full items-center justify-center">
                  <motion.div
                    className={`relative h-40 w-40 ${glitchEffect ? "animate-glitch" : ""}`}
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    {/* 3D holographic object */}
                    <div className="hologram-object absolute inset-0">
                      {activeStep === 1 && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="relative h-32 w-32 rounded-full border-4 border-cyan-500/50">
                            <div className="animate-spin-slow absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/70" />
                            <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                              <Scan className="h-12 w-12" />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="relative h-32 w-32">
                            <div className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-md bg-blue-500/30">
                              <Database className="h-8 w-8 text-blue-400" />
                            </div>
                            <div className="absolute bottom-0 left-0 flex h-12 w-12 items-center justify-center rounded-md bg-blue-600/30">
                              <Database className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-md bg-blue-700/30">
                              <Database className="h-6 w-6 text-blue-400" />
                            </div>
                            {/* Connection lines */}
                            <div className="absolute left-1/2 top-16 h-8 w-0.5 -translate-x-1/2 bg-blue-400/50" />
                            <div className="absolute bottom-12 left-6 h-0.5 w-20 bg-blue-400/50" />
                          </div>
                        </div>
                      )}

                      {activeStep === 3 && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="relative h-32 w-32">
                            <div className="absolute inset-0 rounded-lg border-2 border-indigo-500/50" />
                            <div className="absolute inset-4 rounded-md border border-indigo-400/30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Cpu className="h-16 w-16 text-indigo-400" />
                            </div>
                            {/* Animated particles */}
                            <div className="animate-ping-slow absolute left-0 top-0 h-2 w-2 rounded-full bg-indigo-400" />
                            <div className="animate-ping-slow animation-delay-300 absolute right-0 top-0 h-2 w-2 rounded-full bg-indigo-400" />
                            <div className="animate-ping-slow animation-delay-600 absolute bottom-0 left-0 h-2 w-2 rounded-full bg-indigo-400" />
                            <div className="animate-ping-slow animation-delay-900 absolute bottom-0 right-0 h-2 w-2 rounded-full bg-indigo-400" />
                          </div>
                        </div>
                      )}

                      {activeStep === 4 && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="relative h-32 w-32">
                            <div className="absolute inset-0 flex items-end justify-around">
                              <div className="animate-height-change h-8 w-4 rounded-t-md bg-violet-500/50" />
                              <div className="animate-height-change animation-delay-300 h-16 w-4 rounded-t-md bg-violet-500/50" />
                              <div className="animate-height-change animation-delay-600 h-24 w-4 rounded-t-md bg-violet-500/50" />
                              <div className="animate-height-change animation-delay-900 h-12 w-4 rounded-t-md bg-violet-500/50" />
                              <div className="animate-height-change animation-delay-1200 h-20 w-4 rounded-t-md bg-violet-500/50" />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-violet-400/70" />
                            <div className="absolute right-2 top-2">
                              <BarChart3 className="h-6 w-6 text-violet-400" />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 5 && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="relative h-32 w-32">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-purple-500/50">
                                <Power className="h-10 w-10 text-purple-400" />
                              </div>
                            </div>
                            {/* Energy rays */}
                            <div className="absolute inset-0">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute left-1/2 top-1/2 h-0.5 w-full bg-gradient-to-r from-purple-500/80 to-transparent"
                                  style={{
                                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                                    animation: `pulse 2s infinite ${i * 0.25}s`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="mt-8 flex justify-center gap-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`h-12 w-3 rounded-full transition-all ${
                    step.id === activeStep
                      ? step.color === "cyan"
                        ? "bg-cyan-500"
                        : step.color === "blue"
                          ? "bg-blue-500"
                          : step.color === "indigo"
                            ? "bg-indigo-500"
                            : step.color === "violet"
                              ? "bg-violet-500"
                              : "bg-purple-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to step ${step.id}`}
                />
              ))}
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
                            {/* Futuristic header */}
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
                                <div className="mb-1 flex items-center gap-2">
                                  <span
                                    className={`inline-block rounded-sm px-2 py-0.5 font-mono text-xs ${
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
                                    PHASE_{step.id}
                                  </span>
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      step.color === "cyan"
                                        ? "bg-cyan-400"
                                        : step.color === "blue"
                                          ? "bg-blue-400"
                                          : step.color === "indigo"
                                            ? "bg-indigo-400"
                                            : step.color === "violet"
                                              ? "bg-violet-400"
                                              : "bg-purple-400"
                                    } animate-pulse`}
                                  />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                  {step.title}
                                </h3>
                              </div>
                            </div>

                            {/* Content with tech styling */}
                            <div className="mb-6">
                              <div className="relative text-lg text-gray-300">
                                <div
                                  className={`absolute bottom-0 left-0 top-0 w-1 ${
                                    step.color === "cyan"
                                      ? "bg-cyan-500/30"
                                      : step.color === "blue"
                                        ? "bg-blue-500/30"
                                        : step.color === "indigo"
                                          ? "bg-indigo-500/30"
                                          : step.color === "violet"
                                            ? "bg-violet-500/30"
                                            : "bg-purple-500/30"
                                  }`}
                                />
                                <p className="pl-4 text-gray-300">
                                  {step.description}
                                </p>
                              </div>
                            </div>

                            {/* Tech-styled navigation */}
                            <div className="flex space-x-4 pt-2">
                              <button
                                onClick={() =>
                                  handleStepClick(
                                    step.id === 1 ? steps.length : step.id - 1,
                                  )
                                }
                                className="flex items-center gap-2 rounded-md border border-gray-700 px-5 py-2 text-gray-300 transition-colors hover:bg-gray-700/50"
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
                                <span className="font-mono text-sm">
                                  PREV_PHASE
                                </span>
                              </button>

                              <button
                                onClick={() =>
                                  handleStepClick(
                                    step.id === steps.length ? 1 : step.id + 1,
                                  )
                                }
                                className={`flex items-center gap-2 rounded-md px-5 py-2 text-white transition-colors ${
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
                                <span className="font-mono text-sm">
                                  NEXT_PHASE
                                </span>
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
      </div>

      {/* CSS for hologram effects */}
      <style jsx>{`
        .hologram-container {
          --scan-position: 0%;
        }

        .hologram-projection {
          background: rgba(8, 145, 178, 0.05);
          border: 1px solid rgba(8, 145, 178, 0.2);
          box-shadow: 0 0 20px rgba(8, 145, 178, 0.3);
          animation: hologram-flicker 5s infinite;
        }

        .hologram-scan-line {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(8, 145, 178, 0.2) 48%,
            rgba(8, 145, 178, 0.8) 50%,
            rgba(8, 145, 178, 0.2) 52%,
            transparent 100%
          );
          background-size: 100% 10px;
          background-position: 0 var(--scan-position);
          opacity: 0.7;
        }

        .hologram-glitch {
          background: rgba(8, 145, 178, 0.1);
          display: none;
        }

        .hologram-glitch.active {
          display: block;
          animation: hologram-glitch-effect 1s;
        }

        @keyframes hologram-flicker {
          0%,
          100% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          93% {
            opacity: 0.8;
          }
          94% {
            opacity: 1;
          }
          96% {
            opacity: 0.9;
          }
          98% {
            opacity: 1;
          }
        }

        @keyframes hologram-glitch-effect {
          0%,
          100% {
            transform: translate(0);
            opacity: 1;
          }
          10% {
            transform: translate(-5px, 2px);
            opacity: 0.8;
          }
          20% {
            transform: translate(5px, -2px);
            opacity: 1;
          }
          30% {
            transform: translate(-3px, 1px);
            opacity: 0.6;
          }
          40% {
            transform: translate(3px, -1px);
            opacity: 1;
          }
          50% {
            transform: translate(-1px, 2px);
            opacity: 0.9;
          }
          60% {
            transform: translate(1px, -2px);
            opacity: 1;
          }
          70% {
            transform: translate(-2px, 3px);
            opacity: 0.7;
          }
          80% {
            transform: translate(2px, -3px);
            opacity: 1;
          }
          90% {
            transform: translate(-1px, 1px);
            opacity: 0.9;
          }
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1200 {
          animation-delay: 1200ms;
        }

        .animate-height-change {
          animation: height-change 4s ease-in-out infinite;
        }

        @keyframes height-change {
          0%,
          100% {
            height: 40%;
          }
          50% {
            height: 90%;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
};

export default HolographicSteps;
