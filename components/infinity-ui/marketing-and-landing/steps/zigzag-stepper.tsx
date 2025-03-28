"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Layers, PenTool, Monitor, Send } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Research & Discovery",
    description:
      "We dive deep into understanding your industry, competitors, and target audience to identify opportunities.",
    icon: <Search className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    title: "Strategy & Planning",
    description:
      "Based on our research, we develop a comprehensive strategy that aligns with your business objectives.",
    icon: <Layers className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    id: 3,
    title: "Design & Creation",
    description:
      "Our creative team crafts visually stunning designs that engage your audience and reflect your brand identity.",
    icon: <PenTool className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 4,
    title: "Development & Testing",
    description:
      "We build robust solutions with clean code and thoroughly test every aspect to ensure flawless performance.",
    icon: <Monitor className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 5,
    title: "Launch & Optimization",
    description:
      "After deployment, we continuously monitor performance and make data-driven optimizations to maximize results.",
    icon: <Send className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-rose-500 to-red-600",
  },
];

const ZigzagSteps = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-violet-50 to-white py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-600">
            Our Workflow
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            From Concept to Reality
          </h2>
          <p className="text-xl text-gray-600">
            Our creative process transforms your ideas into exceptional digital
            experiences.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute bottom-0 left-1/2 hidden h-24 w-0.5 -translate-x-1/2 translate-y-full transform bg-gradient-to-b from-violet-300 to-transparent md:block md:h-32" />
              )}

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="group relative">
                    <motion.div
                      className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-violet-300/40 to-fuchsia-300/40 opacity-75 blur-xl transition duration-300 group-hover:opacity-100"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={
                        isInView
                          ? { scale: 1, opacity: 0.75 }
                          : { scale: 0.8, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    />
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={
                          step.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={step.title}
                        width={800}
                        height={450}
                        className="aspect-video h-auto w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-tr from-black/60 via-black/30 to-transparent">
                        <div className="p-6 text-white">
                          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                            Step {step.id}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <motion.div
                      className="absolute -left-2 -top-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg md:-left-4 md:-top-4"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={
                        isInView
                          ? { scale: 1, rotate: 0 }
                          : { scale: 0, rotate: -20 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3 + index * 0.1,
                      }}
                    >
                      {step.icon}
                    </motion.div>

                    <div className="ml-4 rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                      <div className="mb-4 flex items-center">
                        <div
                          className={`h-10 w-10 rounded-full bg-gradient-to-r ${step.color} mr-4 flex items-center justify-center text-lg font-bold text-white`}
                        >
                          {step.id}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mb-6 text-gray-600">{step.description}</p>

                      <motion.div
                        className="h-1 w-full overflow-hidden rounded-full bg-gradient-to-r from-violet-200 to-fuchsia-200"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                      >
                        <div
                          className={`h-full bg-gradient-to-r ${step.color} w-full`}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Project</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.33337 8H12.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 3.33331L12.6667 7.99998L8 12.6666"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ZigzagSteps;
