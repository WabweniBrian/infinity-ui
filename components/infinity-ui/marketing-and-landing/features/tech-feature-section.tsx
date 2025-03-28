"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Zap, Shield, Layers } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const TechFeatureSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Code,
      title: "Clean API",
      description:
        "Build with our intuitive API designed for developers, by developers. Simple, powerful, and flexible.",
      color: "group-hover:from-violet-600 group-hover:to-indigo-600",
      lightColor: "from-violet-200/40 to-indigo-200/40",
      darkColor: "from-violet-900/20 to-indigo-900/20",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with 99.9% uptime. Your applications will load in milliseconds, not seconds.",
      color: "group-hover:from-amber-500 group-hover:to-orange-600",
      lightColor: "from-amber-200/40 to-orange-200/40",
      darkColor: "from-amber-900/20 to-orange-900/20",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and security protocols keep your data safe and compliant with regulations.",
      color: "group-hover:from-emerald-500 group-hover:to-teal-600",
      lightColor: "from-emerald-200/40 to-teal-200/40",
      darkColor: "from-emerald-900/20 to-teal-900/20",
    },
    {
      icon: Layers,
      title: "Scalable Infrastructure",
      description:
        "From startup to enterprise, our platform grows with you. No limits, no compromises.",
      color: "group-hover:from-blue-500 group-hover:to-cyan-600",
      lightColor: "from-blue-200/40 to-cyan-200/40",
      darkColor: "from-blue-900/20 to-cyan-900/20",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[30%] h-[80%] w-[60%] rounded-full bg-gradient-to-br from-indigo-100/30 to-violet-100/30 blur-3xl dark:from-indigo-900/10 dark:to-violet-900/10"></div>
        <div className="absolute -bottom-[30%] -left-[10%] h-[80%] w-[60%] rounded-full bg-gradient-to-tr from-blue-100/30 to-cyan-100/30 blur-3xl dark:from-blue-900/10 dark:to-cyan-900/10"></div>

        <svg
          className="absolute left-0 top-0 h-full w-full opacity-30 dark:opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="url(#gridGradient)"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isInView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient
              id="gridGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-500/30 dark:bg-indigo-500/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 px-3 py-1 text-sm font-medium text-indigo-600 dark:from-indigo-500/20 dark:to-violet-500/20 dark:text-indigo-400">
              Powerful Features
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-5xl font-bold leading-tight text-transparent dark:from-indigo-400 dark:to-violet-400 md:text-6xl">
              Built for developers
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Our platform provides everything you need to build, deploy, and
              scale your applications.
            </p>
          </motion.div>
        </motion.div>

        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.lightColor} dark:${feature.darkColor} transform rounded-2xl opacity-80 transition-all duration-300 group-hover:scale-[1.03]`}
              ></div>

              <div className="absolute inset-0 rounded-2xl bg-white/80 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 dark:bg-gray-900/80"></div>

              <div className="${feature.color} absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-90"></div>

              <div className="relative flex h-full flex-col p-8">
                <div className="mb-4 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-300 group-hover:bg-white/10 dark:bg-gray-800">
                    <feature.icon className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-white dark:text-gray-200" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-white dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 transition-colors duration-300 group-hover:text-white/90 dark:text-gray-300">
                  {feature.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="text-sm font-medium text-indigo-600 transition-colors duration-300 group-hover:text-white dark:text-indigo-400">
                    Learn more
                  </span>
                  <svg
                    className="h-5 w-5 translate-x-0 transform text-indigo-600 transition-colors duration-300 group-hover:translate-x-1 group-hover:text-white dark:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>

                {/* Decorative Elements */}
                <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 dark:from-indigo-500/5 dark:to-violet-500/5"></div>
                <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 dark:from-indigo-500/5 dark:to-violet-500/5"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 rotate-1 scale-[1.03] transform rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 opacity-70 blur-sm"></div>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600">
            <div className="bg-grid-white/10 absolute inset-0 bg-[length:20px_20px]"></div>
            <div className="relative flex flex-col items-center p-8 md:flex-row md:p-12">
              <div className="mb-8 md:mb-0 md:w-1/2 md:pr-8">
                <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Ready to transform your development workflow?
                </h3>
                <p className="mb-8 text-indigo-100">
                  Join thousands of developers who are shipping faster and
                  building better with our platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="rounded-xl bg-white px-6 py-3 font-medium text-indigo-600 shadow-lg shadow-indigo-700/30 transition-colors duration-200 hover:bg-indigo-50">
                    Get started for free
                  </button>
                  <button className="rounded-xl border border-indigo-400/30 bg-indigo-700/50 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-indigo-700/70">
                    View documentation
                  </button>
                </div>
              </div>
              <div className="relative md:w-1/2">
                <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
                  <div className="overflow-hidden rounded-xl bg-gray-900">
                    <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-sm text-gray-400">Terminal</div>
                    </div>
                    <div className="p-4 font-mono text-sm text-green-400">
                      <div className="flex">
                        <span className="mr-2 text-gray-500">$</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          npm install @infinity/ui
                        </motion.span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        className="mt-2"
                      >
                        <span className="text-gray-400">
                          Installing packages...
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 1.6 }}
                        className="mt-2"
                      >
                        <span className="text-gray-400">
                          ✓ Packages installed successfully
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 2 }}
                        className="mt-2 flex"
                      >
                        <span className="mr-2 text-gray-500">$</span>
                        <span className="relative">
                          npx infinity init
                          <span className="animate-blink absolute right-0 top-0 h-full w-1 bg-white"></span>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-600 opacity-30 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-blue-600 opacity-30 blur-2xl"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechFeatureSection;
