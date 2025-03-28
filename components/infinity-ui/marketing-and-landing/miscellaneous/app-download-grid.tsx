"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Apple, Download, QrCode, Smartphone } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const AppDownloadGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const appFeatures = [
    {
      title: "Real-time Tracking",
      description:
        "Monitor your progress and results in real-time with our intuitive dashboard.",
      icon: "📊",
    },
    {
      title: "Personalized Experience",
      description:
        "AI-powered recommendations tailored to your unique preferences and goals.",
      icon: "🧠",
    },
    {
      title: "Seamless Sync",
      description:
        "Your data syncs across all devices, so you&apos;re always up to date.",
      icon: "🔄",
    },
    {
      title: "Offline Mode",
      description:
        "Continue using the app even without an internet connection.",
      icon: "📱",
    },
  ];

  const platforms = [
    { name: "iOS", icon: Apple },
    { name: "Android", icon: Smartphone },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-indigo-50 py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-400/30 to-blue-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="20"
                cy="20"
                r="1"
                fill="currentColor"
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
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-400/10 to-indigo-400/10"
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
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center">
                <span className="h-1 w-12 rounded-full bg-purple-500"></span>
                <span className="mx-2 font-medium text-purple-500">
                  MOBILE APP
                </span>
                <span className="h-1 w-12 rounded-full bg-purple-500"></span>
              </div>

              <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Take the power of{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  InfinityUI
                </span>{" "}
                with you
              </h2>

              <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
                Our mobile app brings all the powerful features of our platform
                to your fingertips, allowing you to stay productive on the go.
              </p>

              {/* Feature List */}
              <div className="mb-8 space-y-6">
                {appFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-lg dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Platform Tabs */}
              <div className="mb-8">
                <div className="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                  {platforms.map((platform, index) => (
                    <button
                      key={index}
                      className={`flex items-center rounded-lg px-6 py-2 ${
                        activeTab === index
                          ? "bg-white text-purple-600 shadow-md dark:bg-gray-700 dark:text-purple-400"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      <platform.icon className="mr-2 h-5 w-5" />
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <button className="inline-flex transform items-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-purple-500/25">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </button>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Available on App Store and Google Play. Free download.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* App Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {/* Main Phone Mockup */}
              <div className="relative md:col-span-7">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl"></div>

                  {/* Phone Mockup */}
                  <motion.div
                    initial={{ y: 20 }}
                    animate={isInView ? { y: [20, 0, 20] } : { y: 20 }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div className="relative rounded-[3rem] bg-gray-900 p-4 shadow-2xl">
                      <div className="absolute left-1/2 top-0 h-6 w-1/3 -translate-x-1/2 transform rounded-b-xl bg-gray-900"></div>

                      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-indigo-500">
                        {/* App Screen */}
                        <div className="relative aspect-[9/19] w-full overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeTab}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 bg-white"
                            >
                              {/* App Interface */}
                              <div className="relative flex h-full flex-col">
                                {/* App Header */}
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                        <Download className="h-4 w-4 text-white" />
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
                                  <div className="mb-2 mt-6">
                                    <h3 className="text-xl font-bold text-white">
                                      Welcome back!
                                    </h3>
                                    <p className="text-sm text-white/80">
                                      Your dashboard is ready
                                    </p>
                                  </div>
                                </div>

                                {/* App Content */}
                                <div className="flex-1 bg-gray-50 p-4">
                                  <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
                                    <div className="mb-2 flex items-center justify-between">
                                      <div className="text-sm font-medium text-gray-900">
                                        Today&apos;s Progress
                                      </div>
                                      <div className="text-xs text-purple-600">
                                        View All
                                      </div>
                                    </div>
                                    <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      75% completed
                                    </div>
                                  </div>

                                  <div className="mb-4 grid grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-white p-4 shadow-sm">
                                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                                        <span className="text-sm text-purple-600">
                                          📊
                                        </span>
                                      </div>
                                      <div className="text-sm font-medium text-gray-900">
                                        Analytics
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        View stats
                                      </div>
                                    </div>
                                    <div className="rounded-xl bg-white p-4 shadow-sm">
                                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                                        <span className="text-sm text-indigo-600">
                                          🔄
                                        </span>
                                      </div>
                                      <div className="text-sm font-medium text-gray-900">
                                        Sync
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Last: 5m ago
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-xl bg-white p-4 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                      <div className="text-sm font-medium text-gray-900">
                                        Recent Activity
                                      </div>
                                      <div className="text-xs text-purple-600">
                                        View All
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      {[1, 2, 3].map((item) => (
                                        <div
                                          key={item}
                                          className="flex items-center"
                                        >
                                          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100"></div>
                                          <div className="ml-3">
                                            <div className="text-xs font-medium text-gray-900">
                                              Activity {item}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                              5m ago
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* App Navigation */}
                                <div className="flex items-center justify-around border-t border-gray-200 bg-white p-4">
                                  {["🏠", "📊", "🔍", "👤"].map((icon, i) => (
                                    <div
                                      key={i}
                                      className={`flex h-10 w-10 items-center justify-center rounded-full ${i === 0 ? "bg-purple-100 text-purple-600" : "text-gray-400"}`}
                                    >
                                      {icon}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Shadow */}
                    <div className="absolute bottom-0 left-1/2 h-8 w-4/5 -translate-x-1/2 transform rounded-full bg-black/20 blur-xl"></div>
                  </motion.div>
                </div>
              </div>

              {/* QR Code and Secondary Elements */}
              <div className="flex flex-col gap-8 md:col-span-5">
                {/* QR Code */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-lg"></div>
                  <div className="relative rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
                    <div className="mb-4 flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500">
                        <QrCode className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="ml-3 text-lg font-bold text-gray-900 dark:text-white">
                        Scan to Download
                      </h3>
                    </div>

                    <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-xl bg-white p-2">
                      <div className="aspect-square w-full bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoZzvtd5h2BRxjvs0lePWdUT3JIKoAfbgqLw8z')] bg-contain bg-center bg-no-repeat"></div>
                    </div>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                      Scan this QR code with your phone camera to download the
                      app
                    </div>
                  </div>
                </motion.div>

                {/* App Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-lg"></div>
                  <div className="relative rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                          4.9
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          App Store Rating
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                          1M+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Downloads
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadGrid;
