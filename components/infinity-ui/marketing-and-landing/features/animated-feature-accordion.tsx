"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
  details: string[];
};

const features: FeatureItem[] = [
  {
    id: "ai",
    title: "AI-Powered Insights",
    description:
      "Leverage machine learning to uncover patterns and predict future trends.",
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    details: [
      "Predictive analytics for forecasting trends",
      "Anomaly detection to identify outliers",
      "Personalized recommendations based on user behavior",
      "Natural language processing for text analysis",
    ],
  },
  {
    id: "performance",
    title: "Lightning Performance",
    description:
      "Experience blazing fast load times and responsive interactions.",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    details: [
      "Global CDN distribution for fast content delivery",
      "Optimized asset loading and caching strategies",
      "Lazy loading components for improved initial load time",
      "Efficient database queries and indexing",
    ],
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Bank-grade security features to keep your data safe and protected.",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    details: [
      "End-to-end encryption for all sensitive data",
      "Role-based access control with fine-grained permissions",
      "Compliance with GDPR, HIPAA, and SOC2 standards",
      "Regular security audits and penetration testing",
    ],
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Comprehensive analytics and reporting tools for data-driven decisions.",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    details: [
      "Customizable dashboards with drag-and-drop widgets",
      "Real-time metrics and performance monitoring",
      "Export capabilities in multiple formats (CSV, PDF, Excel)",
      "Scheduled automated reports delivered via email",
    ],
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description: "Powerful tools for teams to work together seamlessly.",
    icon: Users,
    color: "from-rose-500 to-pink-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    details: [
      "Real-time document editing with multiple users",
      "Threaded comments and discussion capabilities",
      "Version history and change tracking",
      "Integrated video conferencing and screen sharing",
    ],
  },
];

const AnimatedFeatureAccordion = () => {
  const [activeFeature, setActiveFeature] = useState<string>(features[0].id);
  const accordionRef = useRef<HTMLDivElement>(null);

  const handleToggle = (id: string) => {
    setActiveFeature(id === activeFeature ? "" : id);
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-gray-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,theme(colors.indigo.100/30%),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top_right,theme(colors.indigo.900/20%),transparent_70%)]"></div>

        {/* Decorative shapes */}
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-100 opacity-30 blur-3xl dark:bg-indigo-900/20"></div>
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-purple-100 opacity-30 blur-3xl dark:bg-purple-900/20"></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Key Features
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Designed for modern teams
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our comprehensive suite of features built to enhance your
              workflow.
            </p>
          </motion.div>
        </div>

        <div ref={accordionRef} className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Left: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4">
              {features.map((feature) => {
                const FeatureIcon = feature.icon;
                const isActive = activeFeature === feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-900/20"
                        : "border-gray-200 bg-white hover:border-indigo-100 hover:bg-indigo-50/50 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-indigo-900/30 dark:hover:bg-indigo-900/10"
                    }`}
                    initial={{ borderRadius: 12 }}
                    animate={{ borderRadius: 12 }}
                  >
                    <button
                      className="flex w-full items-center justify-between p-6 text-left"
                      onClick={() => handleToggle(feature.id)}
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} p-3 text-white shadow-md`}
                        >
                          <FeatureIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 flex-shrink-0"
                      >
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t border-indigo-100 px-6 py-4 dark:border-indigo-900/30">
                            <ul className="space-y-3">
                              {feature.details.map((detail, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <svg
                                    className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500 dark:text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {detail}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>

                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`mt-4 rounded-lg bg-gradient-to-r ${feature.color} px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:opacity-90`}
                            >
                              Learn More
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[500px] w-full max-w-lg">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-1 shadow-2xl">
                <div className="h-full w-full rounded-xl bg-white dark:bg-gray-800">
                  <div className="h-10 rounded-t-xl bg-gray-100 dark:bg-gray-700">
                    <div className="flex h-full items-center gap-1.5 px-4">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="relative h-[calc(100%-2.5rem)] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      {features.map(
                        (feature) =>
                          feature.id === activeFeature && (
                            <motion.div
                              key={feature.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.4 }}
                              className="absolute inset-0 p-6"
                            >
                              <div className="relative h-full w-full overflow-hidden rounded-lg">
                                <Image
                                  src={
                                    feature.image ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                  }
                                  alt={feature.title}
                                  fill
                                  className="object-cover"
                                />

                                {/* Overlay with feature name */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm">
                                  <div className="text-center">
                                    <div
                                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.color} p-4 text-white shadow-lg`}
                                    >
                                      <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                      {feature.title}
                                    </h3>
                                  </div>
                                </div>

                                {/* Animated elements */}
                                <div className="absolute inset-0">
                                  {[...Array(10)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute h-2 w-2 rounded-full bg-white"
                                      style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        opacity: Math.random() * 0.5 + 0.3,
                                      }}
                                      animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.3, 0.8, 0.3],
                                      }}
                                      transition={{
                                        duration: Math.random() * 3 + 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: Math.random() * 2,
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ),
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -right-10 -top-10 h-24 w-24 rounded-lg bg-white p-2 shadow-xl dark:bg-gray-800"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                  transition: {
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                    },
                    rotate: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 4,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-indigo-100 dark:bg-indigo-900/30">
                  <Globe className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <div className="mt-1 text-xs font-medium text-indigo-800 dark:text-indigo-300">
                    Global
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 h-20 w-20 rounded-lg bg-white p-2 shadow-xl dark:bg-gray-800"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                  transition: {
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 4,
                      ease: "easeInOut",
                    },
                    rotate: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30">
                  <Zap className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  <div className="mt-1 text-xs font-medium text-purple-800 dark:text-purple-300">
                    Fast
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedFeatureAccordion;
