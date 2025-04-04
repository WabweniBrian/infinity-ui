"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Cpu, Database, Globe, Lock, Zap } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ProductFeaturesGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "AI-Powered Insights",
      description:
        "Leverage machine learning algorithms to extract actionable insights from your data.",
      icon: Cpu,
      color: "from-rose-500 to-pink-500",
      position: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      title: "Global CDN",
      description:
        "Lightning-fast content delivery across 200+ data centers worldwide.",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      position: "col-span-1 row-span-1",
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and advanced threat protection for your data.",
      icon: Lock,
      color: "from-emerald-500 to-teal-500",
      position: "col-span-1 row-span-1",
    },
    {
      title: "Scalable Infrastructure",
      description:
        "Automatically scales to handle millions of users without performance degradation.",
      icon: Database,
      color: "from-amber-500 to-orange-500",
      position: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      title: "Lightning Performance",
      description:
        "Optimized for speed with 99.9% uptime guarantee and sub-second response times.",
      icon: Zap,
      color: "from-violet-500 to-purple-500",
      position: "col-span-1 md:col-span-2 row-span-1",
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
            <defs>
              <pattern
                id="diagonalHatch"
                width="10"
                height="10"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-rose-300/20 to-pink-300/20 blur-3xl dark:from-rose-900/10 dark:to-pink-900/10"
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
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl dark:from-blue-900/10 dark:to-cyan-900/10"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-rose-500"></span>
            <span className="mx-2 font-medium text-rose-500">
              PRODUCT FEATURES
            </span>
            <span className="h-1 w-12 rounded-full bg-rose-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Powerful features for{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              modern
            </span>{" "}
            businesses
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Our platform combines cutting-edge technology with intuitive design
            to deliver a seamless experience that drives real business results.
          </p>
        </motion.div>

        {/* Asymmetrical Feature Grid */}
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-6 md:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`${feature.position} group relative`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                <div
                  className={`absolute right-0 top-0 h-40 w-40 bg-gradient-to-br ${feature.color} -translate-y-1/2 translate-x-1/2 transform rounded-full opacity-5 blur-3xl transition-opacity duration-300 group-hover:opacity-10`}
                ></div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex transform items-center justify-center transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mb-6 flex-grow text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-gray-500 transition-colors duration-300 group-hover:text-rose-500 dark:text-gray-400 dark:group-hover:text-rose-400">
                    <span className="font-medium">Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-16"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 blur-xl"></div>
          <div className="relative rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800 md:p-12">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to transform your business?
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Join thousands of companies that are already using our
                  platform to drive growth and innovation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-rose-600 hover:to-pink-600 hover:shadow-xl hover:shadow-rose-500/25">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    View Demo
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 blur-lg"></div>
                <div className="relative rounded-2xl bg-gradient-to-br from-rose-500/5 to-pink-500/5 p-6 dark:from-rose-500/10 dark:to-pink-500/10">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Active Users", value: "10M+" },
                      { label: "Data Processed", value: "500TB" },
                      { label: "Uptime", value: "99.9%" },
                      { label: "Response Time", value: "<100ms" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-700"
                      >
                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductFeaturesGrid;
