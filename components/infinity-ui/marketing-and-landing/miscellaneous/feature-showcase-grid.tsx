"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap, Shield, Layers } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FeatureShowcaseGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Lightning Fast Performance",
      description:
        "Optimized for speed with 99.9% uptime. Your applications will load in milliseconds, not seconds.",
      icon: Zap,
      color: "from-amber-400 to-orange-500",
      stats: [
        { label: "Faster Loading", value: "80%" },
        { label: "Lower Bounce Rate", value: "45%" },
      ],
      benefits: [
        "Improved user experience",
        "Higher conversion rates",
        "Better SEO rankings",
      ],
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "Bank-grade encryption and security protocols keep your data safe and compliant with regulations.",
      icon: Shield,
      color: "from-emerald-400 to-teal-500",
      stats: [
        { label: "Data Protection", value: "100%" },
        { label: "Threat Detection", value: "99.9%" },
      ],
      benefits: [
        "GDPR compliance built-in",
        "Regular security audits",
        "Advanced encryption",
      ],
    },
    {
      title: "Scalable Architecture",
      description:
        "From startup to enterprise, our platform grows with you. No limits, no compromises.",
      icon: Layers,
      color: "from-blue-400 to-indigo-500",
      stats: [
        { label: "Concurrent Users", value: "100K+" },
        { label: "Uptime", value: "99.99%" },
      ],
      benefits: [
        "Elastic infrastructure",
        "Auto-scaling capabilities",
        "Global CDN distribution",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="10"
                cy="10"
                r="1.6257413380501518"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              ></circle>
            </pattern>
            <rect
              id="rect"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-amber-300/20 to-orange-300/20 blur-3xl dark:from-amber-900/10 dark:to-orange-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-indigo-300/20 blur-3xl dark:from-blue-900/10 dark:to-indigo-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* 3D Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-emerald-500/20 blur-xl"></div>

              {/* 3D Device Mockup */}
              <div className="perspective-[1000px] relative">
                <motion.div
                  initial={{ rotateY: 25, rotateX: 15 }}
                  animate={
                    isInView
                      ? {
                          rotateY: [25, 15, 25],
                          rotateX: [15, 5, 15],
                        }
                      : { rotateY: 25, rotateX: 15 }
                  }
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="transform-style-3d relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-2 shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute left-0 right-0 top-0 flex justify-center p-2">
                    <div className="h-2 w-24 rounded-full bg-gray-800"></div>
                  </div>

                  <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700">
                    {/* Screen Content */}
                    <div className="relative aspect-[9/16] w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-600"></div>

                      {/* App Interface */}
                      <div className="relative flex h-full flex-col p-4">
                        {/* App Header */}
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="ml-2 font-medium text-white">
                              InfinityUI
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                          </div>
                        </div>

                        {/* App Content */}
                        <div className="flex flex-1 flex-col space-y-3">
                          <div className="rounded-lg bg-gray-800/50 p-3">
                            <div className="mb-2 h-2 w-full rounded-full bg-white/10"></div>
                            <div className="h-2 w-2/3 rounded-full bg-white/10"></div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800/50 p-3">
                              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                                <Zap className="h-4 w-4 text-white" />
                              </div>
                              <div className="h-2 w-full rounded-full bg-white/10"></div>
                              <div className="h-2 w-full rounded-full bg-white/10"></div>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800/50 p-3">
                              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-500">
                                <Shield className="h-4 w-4 text-white" />
                              </div>
                              <div className="h-2 w-full rounded-full bg-white/10"></div>
                              <div className="h-2 w-full rounded-full bg-white/10"></div>
                            </div>
                          </div>

                          <div className="rounded-lg bg-gray-800/50 p-3">
                            <div className="mb-2 h-2 w-full rounded-full bg-white/10"></div>
                            <div className="h-2 w-3/4 rounded-full bg-white/10"></div>
                          </div>

                          <div className="mt-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 p-3">
                            <span className="text-xs font-medium text-white">
                              Get Started
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Animated Glow */}
                      <div className="animate-glow absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                    </div>
                  </div>

                  {/* Reflections */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>
                </motion.div>

                {/* Shadow */}
                <div className="absolute bottom-0 left-1/2 h-8 w-4/5 -translate-x-1/2 transform rounded-full bg-black/20 blur-xl dark:bg-black/40"></div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -right-8 -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Shield className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center">
                <span className="h-1 w-12 rounded-full bg-amber-500"></span>
                <span className="mx-2 font-medium text-amber-500">
                  FEATURE SPOTLIGHT
                </span>
                <span className="h-1 w-12 rounded-full bg-amber-500"></span>
              </div>

              <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Powerful features for{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  exceptional
                </span>{" "}
                results
              </h2>

              <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
                Our platform combines cutting-edge technology with intuitive
                design to deliver a seamless experience that drives real
                business results.
              </p>

              {/* Feature Tabs */}
              <div className="mb-8">
                <div className="mb-6 flex space-x-4 overflow-x-auto pb-2">
                  {features.map((feature, index) => (
                    <button
                      key={index}
                      className={`flex items-center whitespace-nowrap rounded-xl px-4 py-2 transition-all ${
                        activeFeature === index
                          ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                          : "shrink-0 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <feature.icon
                        className={`h-5 w-5 shrink-0 ${activeFeature === index ? "text-white" : "text-gray-500 dark:text-gray-400"} mr-2`}
                      />
                      {feature.title}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-700/50 dark:bg-gray-800"
                  >
                    <div className="mb-4 flex items-center">
                      <div
                        className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center`}
                      >
                        {(() => {
                          const IconComponent = features[activeFeature].icon;
                          return (
                            <IconComponent className="h-6 w-6 text-white" />
                          );
                        })()}
                      </div>
                      <h3 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                        {features[activeFeature].title}
                      </h3>
                    </div>

                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      {features[activeFeature].description}
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      {features[activeFeature].stats.map((stat, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50"
                        >
                          <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                          </div>
                          <div
                            className={`bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent ${features[activeFeature].color}`}
                          >
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {features[activeFeature].benefits.map(
                        (benefit, index) => (
                          <div key={index} className="flex items-start">
                            <div
                              className={`h-5 w-5 rounded-full bg-gradient-to-r ${features[activeFeature].color} mt-0.5 flex flex-shrink-0 items-center justify-center`}
                            >
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                              {benefit}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                className={`bg-gradient-to-r px-6 py-3 ${features[activeFeature].color} inline-flex transform items-center rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                Explore this feature
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-glow {
          animation: glow 3s infinite;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </section>
  );
};

export default FeatureShowcaseGrid;
