"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  X,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
  details: string[];
};

const features: FeatureCard[] = [
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

const FeatureCardDeck = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [deckIndex, setDeckIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleNextCard = () => {
    setExpandedCard(null);
    setDeckIndex((prev) => (prev + 1) % features.length);
  };

  const handlePrevCard = () => {
    setExpandedCard(null);
    setDeckIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  // Reorder cards based on current deck index
  const orderedFeatures = [
    ...features.slice(deckIndex),
    ...features.slice(0, deckIndex),
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-800">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,theme(colors.indigo.100/30%),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,theme(colors.indigo.900/20%),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 opacity-30 blur-3xl dark:from-indigo-900/30 dark:to-purple-900/30"></div>
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-30 blur-3xl dark:from-blue-900/30 dark:to-cyan-900/30"></div>
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
              Feature Showcase
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Discover our powerful features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our comprehensive suite of tools designed to elevate your
              workflow.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative mt-20 h-[600px]">
          {/* Card deck */}
          <div className="perspective-1000 relative mx-auto h-full max-w-4xl">
            {expandedCard ? (
              <AnimatePresence>
                {/* Expanded card view */}
                <motion.div
                  key={`expanded-${expandedCard}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 z-20 overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800"
                >
                  {(() => {
                    const feature = features.find((f) => f.id === expandedCard);
                    if (!feature) return null;

                    const FeatureIcon = feature.icon;

                    return (
                      <div className="grid h-full grid-cols-1 overflow-hidden lg:grid-cols-2">
                        {/* Left: Image */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                            <Image
                              src={
                                feature.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={feature.title}
                              fill
                              className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                          </div>

                          <div className="absolute inset-0 flex flex-col justify-between p-8">
                            <div className="flex justify-between">
                              <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} p-3 text-white shadow-lg`}
                              >
                                <FeatureIcon className="h-7 w-7" />
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setExpandedCard(null)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                              >
                                <X className="h-5 w-5" />
                              </motion.button>
                            </div>

                            <div>
                              <h3 className="text-3xl font-bold text-white">
                                {feature.title}
                              </h3>
                              <p className="mt-2 text-lg text-white/80">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex flex-col justify-between overflow-y-auto p-8">
                          <div>
                            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                              Key Benefits
                            </h3>

                            <div className="space-y-4">
                              {feature.details.map((detail, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div
                                    className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${feature.color}`}
                                  >
                                    <svg
                                      className="h-3.5 w-3.5 text-white"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                    >
                                      <path
                                        d="M3.5 6L5.5 8L8.5 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <span className="text-lg text-gray-700 dark:text-gray-300">
                                    {detail}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`mt-8 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${feature.color} px-6 py-3 text-base font-medium text-white shadow-lg transition-colors hover:opacity-90`}
                          >
                            Learn More <ArrowRight className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            ) : (
              <>
                {/* Card deck view */}
                {orderedFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  const offset = index * 4;
                  const isTopCard = index === 0;

                  return (
                    <motion.div
                      key={feature.id}
                      className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{
                        zIndex: features.length - index,
                        y: offset,
                        rotateZ:
                          index % 2 === 0 ? -2 + index * 0.5 : 2 - index * 0.5,
                      }}
                      whileHover={isTopCard ? { scale: 1.02, rotateZ: 0 } : {}}
                      onClick={
                        isTopCard
                          ? () => handleCardClick(feature.id)
                          : undefined
                      }
                    >
                      <div
                        className={`overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 dark:bg-gray-800 ${isTopCard ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900" : "opacity-90 dark:opacity-70"}`}
                      >
                        <div className="relative h-48">
                          <Image
                            src={
                              feature.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={feature.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} p-3 text-white shadow-lg`}
                              >
                                <FeatureIcon className="h-6 w-6" />
                              </div>
                              <h3 className="text-2xl font-bold text-white">
                                {feature.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <p className="text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>

                          {isTopCard && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mt-4 flex items-center justify-between"
                            >
                              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                Click to expand
                              </span>
                              <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Navigation controls */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevCard}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    aria-label="Previous feature"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextCard}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    aria-label="Next feature"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCardDeck;
