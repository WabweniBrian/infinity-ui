"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MessageSquare, Lightbulb, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We start with an in-depth discussion to understand your business goals, challenges, and vision for the project.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Ideation",
    description:
      "Our team brainstorms innovative solutions and develops a strategic roadmap tailored to your specific needs.",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Design",
    description:
      "We create visually stunning designs that align with your brand identity and provide an exceptional user experience.",
    icon: <Palette className="h-6 w-6" />,
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: 4,
    title: "Development",
    description:
      "Our engineers build your solution using cutting-edge technologies and following industry best practices.",
    icon: <Code className="h-6 w-6" />,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 5,
    title: "Launch",
    description:
      "We deploy your solution and provide ongoing support to ensure its success in the real world.",
    icon: <Rocket className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
  },
];

const CircularSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-cyan-50 to-white py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-600">
            Our Approach
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            A Circular Journey to Success
          </h2>
          <p className="text-xl text-gray-600">
            Our innovative process ensures your project moves seamlessly from
            concept to completion.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-6 md:gap-16 lg:flex-row">
          {/* Mobile step selector */}
          <div className="w-full lg:hidden">
            <div className="hide-scrollbar flex snap-x gap-2 overflow-x-auto pb-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex w-[100px] flex-shrink-0 snap-start flex-col items-center rounded-xl p-4 transition-all ${
                    activeStep === step.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                      : "border border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-full p-3 ${
                      activeStep === step.id ? "bg-white/20" : "bg-cyan-100"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="mt-2 text-sm font-medium">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Circular visualization */}
          <div className="relative hidden w-full justify-center md:flex lg:w-1/2">
            <motion.div
              className="relative h-[280px] w-[280px] flex-center-center md:h-[400px] md:w-[400px]"
              initial={{ opacity: 0, rotate: -20 }}
              animate={
                isInView
                  ? { opacity: 1, rotate: 0 }
                  : { opacity: 0, rotate: -20 }
              }
              transition={{ duration: 0.8 }}
            >
              {/* Center circle */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                <motion.div
                  className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white shadow-xl md:h-[140px] md:w-[140px]"
                  initial={{ scale: 0, transformOrigin: "50% 50%" }}
                  animate={{
                    scale: isInView ? 1 : 0,
                    transformOrigin: "50% 50%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                >
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                      {activeStep}
                    </div>
                    <div className="text-xs text-gray-500 md:text-sm">
                      of {steps.length}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Orbit */}
              <div className="animate-spin-slow absolute left-0 top-0 h-full w-full rounded-full border-2 border-dashed border-gray-200" />

              {/* Step nodes */}
              {steps.map((step, index) => {
                const angle =
                  (index * (360 / steps.length) - 90) * (Math.PI / 180);
                const radius = 140; // for mobile
                const radiusMd = 200; // for desktop
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const xMd = Math.cos(angle) * radiusMd;
                const yMd = Math.sin(angle) * radiusMd;

                return (
                  <motion.div
                    key={step.id}
                    className="absolute left-1/2 top-1/2 hidden md:flex"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            scale: 1,
                            x: xMd,
                            y: yMd,
                            transition: { delay: 0.1 * index, duration: 0.5 },
                          }
                        : { opacity: 0, scale: 0 }
                    }
                    style={{
                      x: x,
                      y: y,
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                  >
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`group relative flex h-16 w-16 items-center justify-center rounded-full transition-all ${
                        activeStep === step.id
                          ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                          : "border border-gray-200 bg-white text-gray-700 hover:border-cyan-300"
                      }`}
                    >
                      <div
                        className={`transition-all ${
                          activeStep === step.id
                            ? "scale-110"
                            : "group-hover:scale-110"
                        }`}
                      >
                        {step.icon}
                      </div>

                      {/* Label */}
                      <div
                        className={`absolute whitespace-nowrap ${
                          // Position labels based on their position in the circle
                          index === 0
                            ? "-bottom-8 left-1/2 -translate-x-1/2"
                            : index === 1
                              ? "-right-20 bottom-0"
                              : index === 2
                                ? "-top-8 left-1/2 -translate-x-1/2"
                                : index === 3
                                  ? "-left-20 bottom-0"
                                  : index === 4
                                    ? "-bottom-8 left-1/2 -translate-x-1/2"
                                    : ""
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            activeStep === step.id
                              ? "text-cyan-600"
                              : "text-gray-600"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Step details */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
              >
                <div className="mb-6 flex items-center">
                  <div
                    className={`rounded-xl bg-gradient-to-r p-4 ${steps[activeStep - 1].color} mr-4 text-white`}
                  >
                    {steps[activeStep - 1].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Step {activeStep}: {steps[activeStep - 1].title}
                  </h3>
                </div>
                <p className="mb-6 text-lg text-gray-600">
                  {steps[activeStep - 1].description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() =>
                      setActiveStep((prev) =>
                        prev === 1 ? steps.length : prev - 1,
                      )
                    }
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-cyan-600"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M15.8334 10H4.16675"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.0001 15.8333L4.16675 9.99996L10.0001 4.16663"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Previous</span>
                  </button>

                  <div className="flex gap-1">
                    {steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          activeStep === step.id
                            ? "w-6 bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to step ${step.id}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setActiveStep((prev) =>
                        prev === steps.length ? 1 : prev + 1,
                      )
                    }
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-cyan-600"
                  >
                    <span>Next</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4.16675 10H15.8334"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 4.16663L15.8333 9.99996L10 15.8333"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularSteps;
