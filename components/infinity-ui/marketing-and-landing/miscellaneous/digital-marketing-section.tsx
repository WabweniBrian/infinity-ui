"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Search,
  BarChart3,
  Zap,
  Users,
  Play,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const DigitalMarketingSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState(0);

  const services = [
    {
      icon: Search,
      title: "Discover & Explore",
      description: "AI-powered market research and competitor analysis",
      color: "from-orange-400 to-pink-400",
      accent: "group-hover:border-orange-400/50",
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
    },
    {
      icon: BarChart3,
      title: "Brand Strategy",
      description: "Data-driven brand positioning and growth",
      color: "from-blue-400 to-indigo-400",
      accent: "group-hover:border-blue-400/50",
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)",
    },
    {
      icon: Zap,
      title: "UX Design",
      description: "Intuitive interfaces that convert and engage",
      color: "from-green-400 to-emerald-400",
      accent: "group-hover:border-green-400/50",
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 50%)",
    },
    {
      icon: Users,
      title: "SEO & Marketing",
      description: "Organic growth and audience engagement",
      color: "from-purple-400 to-violet-400",
      accent: "group-hover:border-purple-400/50",
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)",
    },
  ];

  const metrics = [
    {
      label: "SEO Performance",
      value: 92,
      color: "from-orange-400 to-pink-400",
    },
    {
      label: "User Engagement",
      value: 88,
      color: "from-blue-400 to-indigo-400",
    },
    {
      label: "Conversion Rate",
      value: 95,
      color: "from-green-400 to-emerald-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Creative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-orange-400/30 to-purple-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/30 to-emerald-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.05]"
          viewBox="0 0 100 100"
        >
          <pattern
            id="grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M.5 20V.5H20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-orange-400/10 to-purple-400/10"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-orange-400/20 to-purple-400/20 blur-3xl"
            />

            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "auto" } : { width: 0 }}
                transition={{ duration: 1 }}
                className="mb-4 inline-block overflow-hidden"
              >
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-400/10 to-pink-400/10 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-400"
                  />
                  BOOST YOUR TRAFFIC
                </span>
              </motion.div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl">
                Transform your
                <br />
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    digital presence
                  </span>
                  <motion.svg
                    viewBox="0 0 338 12"
                    fill="none"
                    className="absolute -bottom-2 left-0 h-3 w-full text-orange-400/40"
                    preserveAspectRatio="none"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.path
                      d="M1 5.36C32.0885 5.36 31.5 5.36 62.5885 5.36C93.677 5.36 93.0885 5.36 124.177 5.36C155.265 5.36 154.677 5.36 185.765 5.36C216.854 5.36 216.265 5.36 247.354 5.36C278.442 5.36 277.854 5.36 308.942 5.36C340.031 5.36 339.442 5.36 370.531 5.36"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1 },
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.svg>
                </span>
              </h2>

              <p className="mb-8 max-w-lg text-xl text-gray-600 dark:text-gray-300">
                Our AI-powered platform combines cutting-edge analytics with
                creative strategy to elevate your brand and drive measurable
                results.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="inline-flex transform items-center rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-orange-500 hover:to-pink-500 hover:shadow-xl hover:shadow-orange-400/25">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex transform items-center rounded-2xl bg-gray-100 px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl"></div>

              {/* Main Content */}
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800">
                <div className="bg-grid-slate-100/[0.03] absolute inset-0 bg-[length:20px_20px]"></div>

                {/* Dashboard Preview */}
                <div className="p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-pink-400">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Dashboard
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cards */}
                  <div className="mb-8 grid grid-cols-2 gap-6">
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Traffic
                        </div>
                        <div className="text-xs text-green-500">+24%</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        127.4K
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-400"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "75%" } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Conversion
                        </div>
                        <div className="text-xs text-green-500">+12%</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        3.2%
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "65%" } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Graph */}
                  <div className="relative mb-6 h-48">
                    <svg className="h-full w-full" viewBox="0 0 400 200">
                      <motion.path
                        d="M0,150 C50,120 100,180 150,120 C200,60 250,80 300,40 C350,0 400,20 400,50"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={
                          isInView ? { pathLength: 1 } : { pathLength: 0 }
                        }
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#fb923c" />
                          <stop offset="100%" stopColor="#f472b6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-800"></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      View Report
                    </button>
                    <button className="rounded-lg bg-gradient-to-r from-orange-400 to-pink-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-orange-500 hover:to-pink-500">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className="absolute inset-0 transform rounded-2xl bg-gradient-to-r from-gray-50 to-white transition-transform duration-300 group-hover:scale-105 dark:from-gray-900 dark:to-gray-800"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/10 to-pink-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div
                className="relative rounded-2xl border border-gray-200/50 bg-white p-6 transition-all duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800"
                style={{ backgroundImage: service.pattern }}
              >
                <div
                  className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-r ${service.color} flex transform items-center justify-center transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center font-medium text-orange-500 dark:text-orange-400">
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Measurable Results
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Our data-driven approach delivers consistent growth and ROI for
              your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="relative">
                  <div className="mb-2 flex justify-between">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {metric.label}
                    </span>
                    <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-lg font-bold text-transparent">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${metric.value}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                    >
                      <div className="animate-shimmer h-full w-full bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.2)_50%,_transparent_75%,_transparent_100%)] bg-[length:250%_250%] opacity-50"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl"></div>
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 opacity-90"></div>
                  <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.2)_50%,_transparent_75%,_transparent_100%)] bg-[length:250%_250%]"></div>
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    alt="Marketing Expert"
                    width={800}
                    height={600}
                    className="relative z-10 h-auto w-full mix-blend-overlay"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "320m+", label: "Global Reach" },
            { value: "89%", label: "Growth Rate" },
            { value: "1,350+", label: "Projects" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 transform rounded-2xl bg-gradient-to-r from-orange-400/10 to-pink-400/10 blur-lg transition-transform duration-300 group-hover:scale-110"></div>
              <div className="relative rounded-2xl border border-gray-200/50 bg-white p-6 dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-2 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default DigitalMarketingSection;
