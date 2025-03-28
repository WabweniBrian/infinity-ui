"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Flame, Droplets, Wind, Zap } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  particleColor: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Ignite",
    description:
      "We spark creativity through collaborative ideation sessions, uncovering innovative solutions to your business challenges.",
    icon: <Flame className="h-6 w-6" />,
    color: "orange",
    particleColor: "#F97316",
  },
  {
    id: 2,
    title: "Flow",
    description:
      "Our team transforms concepts into actionable strategies, creating a seamless roadmap for your project journey.",
    icon: <Droplets className="h-6 w-6" />,
    color: "blue",
    particleColor: "#3B82F6",
  },
  {
    id: 3,
    title: "Energize",
    description:
      "We power your vision with cutting-edge technology and development practices, bringing ideas to life.",
    icon: <Zap className="h-6 w-6" />,
    color: "yellow",
    particleColor: "#EAB308",
  },
  {
    id: 4,
    title: "Propel",
    description:
      "Our optimization process ensures your solution performs at its peak, ready to meet market demands.",
    icon: <Wind className="h-6 w-6" />,
    color: "teal",
    particleColor: "#14B8A6",
  },
  {
    id: 5,
    title: "Elevate",
    description:
      "We launch and continuously enhance your product, ensuring it evolves with your business and user needs.",
    icon: <Sparkles className="h-6 w-6" />,
    color: "purple",
    particleColor: "#A855F7",
  },
];

// Particle class for the simulation
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = color;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.005;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ParticleFlowSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const stepPositionsRef = useRef<{ [key: number]: { x: number; y: number } }>(
    {},
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight,
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set canvas dimensions
  useEffect(() => {
    if (canvasRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Calculate step positions
        const stepPositions: { [key: number]: { x: number; y: number } } = {};
        const stepElements = document.querySelectorAll("[data-step-id]");

        stepElements.forEach((el) => {
          const stepId = Number.parseInt(
            el.getAttribute("data-step-id") || "0",
          );
          if (stepId) {
            const rect = el.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            stepPositions[stepId] = {
              x: rect.left + rect.width / 2 - canvasRect.left,
              y: rect.top + rect.height / 2 - canvasRect.top,
            };
          }
        });

        stepPositionsRef.current = stepPositions;
      }
    }
  }, [dimensions, isInView]);

  // Particle animation
  useEffect(() => {
    if (!isInView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles at the active step position
      const activePos = stepPositionsRef.current[activeStep];
      if (activePos) {
        for (let i = 0; i < 2; i++) {
          const color =
            steps.find((s) => s.id === activeStep)?.particleColor || "#3B82F6";
          particlesRef.current.push(
            new Particle(
              activePos.x + (Math.random() * 40 - 20),
              activePos.y + (Math.random() * 40 - 20),
              color,
            ),
          );
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);

        // Remove particles with low alpha
        if (particle.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, activeStep]);

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
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-purple-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-orange-50 to-yellow-50"
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
            Dynamic Process Flow
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            An energetic approach that adapts to your evolving project needs
          </p>
        </motion.div>

        <div className="relative">
          {/* Canvas for particle animation */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-10"
          />

          {/* Step navigation */}
          <motion.div
            className="relative mb-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
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
                  data-step-id={step.id}
                >
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className="group relative z-10"
                    aria-pressed={activeStep === step.id}
                  >
                    {/* Energy field effect */}
                    <motion.div
                      className={`absolute -inset-4 rounded-full opacity-30 ${
                        step.color === "orange"
                          ? "bg-orange-400"
                          : step.color === "blue"
                            ? "bg-blue-400"
                            : step.color === "yellow"
                              ? "bg-yellow-400"
                              : step.color === "teal"
                                ? "bg-teal-400"
                                : "bg-purple-400"
                      } blur-xl`}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: activeStep === step.id ? [1, 1.2, 1] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat:
                          activeStep === step.id ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                    />

                    {/* Step circle */}
                    <motion.div
                      className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 md:h-24 md:w-24 ${
                        activeStep === step.id ? "scale-110" : "scale-100"
                      } ${
                        step.color === "orange"
                          ? "bg-gradient-to-br from-orange-400 to-orange-500"
                          : step.color === "blue"
                            ? "bg-gradient-to-br from-blue-400 to-blue-500"
                            : step.color === "yellow"
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                              : step.color === "teal"
                                ? "bg-gradient-to-br from-teal-400 to-teal-500"
                                : "bg-gradient-to-br from-purple-400 to-purple-500"
                      } shadow-lg ${
                        step.color === "orange"
                          ? "shadow-orange-200"
                          : step.color === "blue"
                            ? "shadow-blue-200"
                            : step.color === "yellow"
                              ? "shadow-yellow-200"
                              : step.color === "teal"
                                ? "shadow-teal-200"
                                : "shadow-purple-200"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col items-center justify-center text-white">
                        <div className="mb-1">{step.icon}</div>
                        <span className="text-center text-sm font-medium">
                          {step.title}
                        </span>
                      </div>
                    </motion.div>
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
                      <div className="absolute -inset-4 -z-10 rounded-[60%_40%_50%_50%/40%_50%_60%_50%] bg-gradient-to-r from-gray-100 to-white" />

                      <div className="relative overflow-hidden rounded-xl">
                        <div className="relative rounded-xl border border-gray-100 bg-white/90 p-8 shadow-md backdrop-blur-sm">
                          <div
                            className={`absolute left-0 top-0 h-1 w-full ${
                              step.color === "orange"
                                ? "bg-orange-500"
                                : step.color === "blue"
                                  ? "bg-blue-500"
                                  : step.color === "yellow"
                                    ? "bg-yellow-500"
                                    : step.color === "teal"
                                      ? "bg-teal-500"
                                      : "bg-purple-500"
                            }`}
                          />

                          <div className="mb-6 flex items-center">
                            <div
                              className={`mr-4 rounded-full p-3 ${
                                step.color === "orange"
                                  ? "bg-orange-100 text-orange-500"
                                  : step.color === "blue"
                                    ? "bg-blue-100 text-blue-500"
                                    : step.color === "yellow"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : step.color === "teal"
                                        ? "bg-teal-100 text-teal-500"
                                        : "bg-purple-100 text-purple-500"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <div>
                              <span
                                className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  step.color === "orange"
                                    ? "bg-orange-100 text-orange-700"
                                    : step.color === "blue"
                                      ? "bg-blue-100 text-blue-700"
                                      : step.color === "yellow"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : step.color === "teal"
                                          ? "bg-teal-100 text-teal-700"
                                          : "bg-purple-100 text-purple-700"
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
                                step.color === "orange"
                                  ? "bg-gradient-to-r from-orange-400 to-orange-500"
                                  : step.color === "blue"
                                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                                    : step.color === "yellow"
                                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                      : step.color === "teal"
                                        ? "bg-gradient-to-r from-teal-400 to-teal-500"
                                        : "bg-gradient-to-r from-purple-400 to-purple-500"
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

export default ParticleFlowSteps;
