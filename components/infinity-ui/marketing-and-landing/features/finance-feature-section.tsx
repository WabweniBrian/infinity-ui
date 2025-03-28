"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  LineChart,
  PieChart,
  BarChart3,
  TrendingUp,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FinanceFeatureSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: LineChart,
      title: "Intelligent Investing",
      description:
        "AI-powered portfolio recommendations based on your goals and risk tolerance.",
      color: "bg-blue-500",
    },
    {
      icon: PieChart,
      title: "Budget Analytics",
      description:
        "Visualize spending patterns and optimize your budget with smart categorization.",
      color: "bg-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Wealth Growth",
      description:
        "Long-term planning tools to help you achieve your financial milestones.",
      color: "bg-purple-500",
    },
    {
      icon: BarChart3,
      title: "Market Insights",
      description:
        "Real-time data and expert analysis to inform your investment decisions.",
      color: "bg-amber-500",
    },
  ];

  const tabs = [
    { name: "Overview", content: "overview" },
    { name: "Investments", content: "investments" },
    { name: "Budgeting", content: "budgeting" },
  ];

  const chartVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-slate-50 py-24 dark:bg-gray-950"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-full">
          <svg
            className="absolute right-0 top-0 h-full w-full text-blue-500/5"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient
                id="fadeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#fadeGradient)" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-300/20 blur-3xl dark:from-blue-900/10 dark:to-purple-900/10"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-300/20 to-amber-300/20 blur-3xl dark:from-emerald-900/10 dark:to-amber-900/10"
        ></motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-blue-400">
              Financial Freedom
            </span>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
              Smart banking for a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                smarter future
              </span>
            </h2>
            <p className="mb-10 text-xl text-gray-600 dark:text-gray-300">
              Take control of your finances with powerful tools designed to help
              you save, invest, and grow your wealth.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 transform rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl dark:bg-gray-800"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/10 dark:to-purple-500/10"></div>

                  <div className="relative p-6">
                    <div
                      className={`${feature.color} mb-4 flex h-12 w-12 transform items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                      <span>Learn more</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:from-blue-700 hover:to-purple-700">
                Get started
              </button>
              <button className="ml-4 font-medium text-blue-600 hover:underline dark:text-blue-400">
                Learn more →
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Financial Dashboard
                  </h3>
                  <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                          activeTab === index
                            ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400"
                            : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        }`}
                        onClick={() => setActiveTab(index)}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 0 && (
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-500 dark:text-gray-400">
                              Total Balance
                            </h4>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              $24,568.80
                            </div>
                            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                              <svg
                                className="mr-1 h-3 w-3"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              12.5% from last month
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="rounded-lg bg-blue-600 p-2 text-white">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 4V20M12 4L6 10M12 4L18 10"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 20V4M12 20L6 14M12 20L18 14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="relative h-64">
                          <svg className="h-full w-full" viewBox="0 0 400 200">
                            <motion.path
                              d="M0,150 C50,120 100,180 150,120 C200,60 250,80 300,40 C350,0 400,20 400,50"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="3"
                              variants={chartVariants}
                              initial="hidden"
                              animate={isInView ? "visible" : "hidden"}
                            />
                            <motion.path
                              d="M0,150 C50,120 100,180 150,120 C200,60 250,80 300,40 C350,0 400,20 400,50"
                              fill="url(#gradient)"
                              fillOpacity="0.2"
                              stroke="none"
                              variants={chartVariants}
                              initial="hidden"
                              animate={isInView ? "visible" : "hidden"}
                            />
                            <defs>
                              <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#3b82f6"
                                  stopOpacity="0.5"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#3b82f6"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                          </svg>

                          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-500 dark:text-gray-400">
                              Portfolio Value
                            </h4>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              $18,245.30
                            </div>
                            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                              <svg
                                className="mr-1 h-3 w-3"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              8.2% from last month
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                    S
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  Stocks
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                60%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "60%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.5 }}
                              ></motion.div>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                                    B
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  Bonds
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                25%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-purple-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "25%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.6 }}
                              ></motion.div>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                    R
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  Real Estate
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                10%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-emerald-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "10%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.7 }}
                              ></motion.div>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                    C
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  Cash
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                5%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-amber-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "5%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.8 }}
                              ></motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-500 dark:text-gray-400">
                              Monthly Budget
                            </h4>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              $4,250.00
                            </div>
                            <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                              <svg
                                className="mr-1 h-3 w-3"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9.5V2.5M6 9.5L3 6.5M6 9.5L9 6.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              $320 remaining
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                                  <svg
                                    className="h-4 w-4 text-blue-600 dark:text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Housing
                                  </span>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    $1,500 / $1,500
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                100%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "100%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.5 }}
                              ></motion.div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                  <svg
                                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 11a4 4 0 11-8 0 4 4 0 018 0zm-4-8a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Food & Dining
                                  </span>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    $680 / $800
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                85%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-emerald-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "85%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.6 }}
                              ></motion.div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                                  <svg
                                    className="h-4 w-4 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Entertainment
                                  </span>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    $250 / $300
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                83%
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                              <motion.div
                                className="h-full rounded-full bg-purple-500"
                                initial={{ width: 0 }}
                                animate={
                                  isInView ? { width: "83%" } : { width: 0 }
                                }
                                transition={{ duration: 1, delay: 0.7 }}
                              ></motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <svg
                          className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Financial Advisor
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Available now
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      <span>Chat now</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-20"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="p-8 md:p-12 lg:col-span-8">
                <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-blue-400">
                  Personalized Insights
                </span>
                <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                  Your financial future, reimagined
                </h3>
                <p className="mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
                  Our AI-powered platform analyzes your spending habits, income,
                  and financial goals to create a personalized roadmap to
                  financial freedom. Get started today and see the difference.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                      94%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      of users save more money within 3 months
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                      $1.2B
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      in total customer investments managed
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                      4.9/5
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      average rating from over 10,000 reviews
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:from-blue-700 hover:to-purple-700">
                    Create free account
                  </button>
                  <button className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    Watch demo
                  </button>
                </div>
              </div>

              <div className="relative lg:col-span-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=400')",
                  }}
                ></div>

                <div className="relative flex h-full items-center justify-center p-8">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                          <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-bold text-white">
                            Investment Growth
                          </h4>
                          <p className="text-xs text-white/80">
                            Last 12 months
                          </p>
                        </div>
                      </div>
                      <div className="font-bold text-white">+24.8%</div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg bg-white/10 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-sm font-medium text-white">
                            Tech Stocks
                          </div>
                          <div className="text-sm text-emerald-300">+32.4%</div>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                          <motion.div
                            className="h-full rounded-full bg-emerald-400"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "80%" } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                          ></motion.div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white/10 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-sm font-medium text-white">
                            Index Funds
                          </div>
                          <div className="text-sm text-emerald-300">+18.2%</div>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                          <motion.div
                            className="h-full rounded-full bg-emerald-400"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "65%" } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.9 }}
                          ></motion.div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white/10 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-sm font-medium text-white">
                            Crypto
                          </div>
                          <div className="text-sm text-rose-300">-5.7%</div>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                          <motion.div
                            className="h-full rounded-full bg-rose-400"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "30%" } : { width: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
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

export default FinanceFeatureSection;
