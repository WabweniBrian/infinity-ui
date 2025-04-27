"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap, Code, Layers } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [activeComponent, setActiveComponent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Sample UI components to showcase
  const uiComponents = [
    {
      name: "Dashboard Cards",
      description: "Analytics dashboard cards with interactive charts",
      color: `from-[#11ACBB] to-[#11ACBB]/80`,
      icon: <Layers className="h-5 w-5" />,
    },
    {
      name: "Form Elements",
      description: "Beautiful form components with validation",
      color: `from-[#F6A71A] to-[#F6A71A]/80`,
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "Navigation",
      description: "Responsive navigation bars and menus",
      color: `from-[#DB3066] to-[#DB3066]/80`,
      icon: <Zap className="h-5 w-5" />,
    },
    {
      name: "Hero Sections",
      description: "Attention-grabbing hero sections",
      color: `from-[#11ACBB] to-[#F6A71A]`,
      icon: <Sparkles className="h-5 w-5" />,
    },
  ];

  // Auto-rotate through components
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveComponent((prev) => (prev + 1) % uiComponents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [uiComponents.length]);

  return (
    <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-white pt-20 dark:bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"></div>

        {/* Decorative background - circular pattern instead of grid */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute left-0 top-0 h-full w-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.03)`,
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-b from-[#11ACBB]/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-t from-[#DB3066]/10 to-transparent blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Text content */}
          <motion.div
            className="text-center lg:w-1/2 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Fixed badge component */}
            <div className="mb-4 inline-block">
              <motion.span
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gradient-to-r from-[#11ACBB]/10 to-[#F6A71A]/10 px-4 py-1.5 text-sm font-medium text-gray-900 dark:border-gray-800 dark:from-[#11ACBB]/20 dark:to-[#F6A71A]/20 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#11ACBB]" />
                <span>350+ Modern UI Components</span>
              </motion.span>
            </div>

            <motion.h1
              className="relative mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl xl:text-7xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              UI That{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#11ACBB] to-[#F6A71A] bg-clip-text text-transparent dark:from-[#11ACBB] dark:to-[#F6A71A]">
                  Converts More
                </span>
                <svg
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  viewBox="0 0 200 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 15 C50 5, 150 25, 198 10"
                    stroke="#F6A71A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto mb-8 max-w-xl text-lg text-gray-600 dark:text-gray-300 md:text-xl lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Infinity UI helps you craft high-converting, visually stunning
              interfaces with powerful React & Next.js components — built for
              speed and success.
            </motion.p>

            {/* Feature list */}
            <motion.div
              className="mx-auto mb-8 grid max-w-xl grid-cols-1 gap-3 text-left md:grid-cols-2 lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                "Modern Trends",
                "Responsive by default",
                "Dark mode (some components)",
                "Accessible components",
                "Tailwind CSS powered",
                "TypeScript ready",
                "Easy customization",
                "Regular updates",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#11ACBB] to-[#F6A71A] dark:from-[#11ACBB] dark:to-[#F6A71A]">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            <Link href="/components">
              <motion.div
                // className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#11ACBB] to-indigo-500 px-8 py-4 text-lg font-medium text-white transition-all hover:shadow-lg hover:shadow-[#11ACBB]/25 dark:from-[#11ACBB] dark:to-[#F6A71A] dark:hover:shadow-[#11ACBB]/20">
                  Explore Components
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </Link>

            {/* <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 sm:justify-start">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 text-xs font-medium dark:border-gray-950 dark:bg-gray-800"
                    >
                      {i === 1 && <span>🔥</span>}
                      {i === 2 && <span>⚡</span>}
                      {i === 3 && <span>✨</span>}
                    </div>
                  ))}
                </div>
                <span className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1,200+
                  </span>{" "}
                  developers using Infinity UI
                </span>
              </div> */}
          </motion.div>

          {/* Component Showcase */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            ref={showcaseRef}
          >
            <div className="relative mx-auto w-full max-w-xl">
              {/* Browser window frame */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                {/* Browser header */}
                <div className="flex items-center border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto flex items-center rounded-full bg-white px-8 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                    <span>infinityui.dev/components</span>
                  </div>
                </div>

                {/* Component display area */}
                <div className="relative h-[400px] overflow-hidden p-6">
                  {/* Component selector */}
                  <div className="absolute left-6 top-6 z-10 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    {uiComponents.map((component, index) => (
                      <motion.button
                        key={index}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          activeComponent === index
                            ? `bg-gradient-to-r ${component.color} text-white`
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setActiveComponent(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {component.icon}
                        {component.name}
                      </motion.button>
                    ))}
                  </div>

                  {/* Component preview */}
                  <div className="absolute bottom-0 right-0 h-full w-3/4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeComponent}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="flex h-full w-full items-center justify-center"
                      >
                        {/* Dashboard Cards */}
                        {activeComponent === 0 && (
                          <div className="grid w-full grid-cols-2 gap-4">
                            {[
                              {
                                title: "Total Revenue",
                                value: "$24,345",
                                change: "+12.3%",
                                color: "bg-purple-500",
                              },
                              {
                                title: "Active Users",
                                value: "1,293",
                                change: "+8.7%",
                                color: "bg-emerald-500",
                              },
                              {
                                title: "Conversion Rate",
                                value: "3.42%",
                                change: "+2.1%",
                                color: "bg-amber-500",
                              },
                              {
                                title: "Avg. Session",
                                value: "2m 45s",
                                change: "-0.5%",
                                color: "bg-rose-500",
                                negative: true,
                              },
                            ].map((card, i) => (
                              <motion.div
                                key={i}
                                className="rounded-lg border border-gray-100 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: { delay: i * 0.1 },
                                }}
                              >
                                <div className="mb-2 flex items-start justify-between">
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {card.title}
                                  </span>
                                  <div
                                    className={`h-2 w-2 rounded-full ${card.color}`}
                                  ></div>
                                </div>
                                <div className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                  {card.value}
                                </div>
                                <div
                                  className={`text-xs ${card.negative ? "text-rose-500" : "text-emerald-500"} flex items-center`}
                                >
                                  {card.change}
                                  <svg
                                    className="ml-1 h-3 w-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d={
                                        card.negative
                                          ? "M20 17l-8 -8l-8 8"
                                          : "M20 7l-8 8l-8 -8"
                                      }
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Form Elements */}
                        {activeComponent === 1 && (
                          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                              Contact Information
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-400"
                                  placeholder="John Doe"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-400"
                                  placeholder="john@example.com"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Message
                                </label>
                                <textarea
                                  className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-400"
                                  rows={3}
                                  placeholder="Your message here..."
                                ></textarea>
                              </div>
                              <button className="w-full rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 font-medium text-white transition-all hover:shadow-md">
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Navigation */}
                        {activeComponent === 2 && (
                          <div className="w-full">
                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-white">
                                    I
                                  </div>
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    Infinity UI
                                  </span>
                                </div>
                                <div className="hidden items-center gap-6 md:flex">
                                  {[
                                    "Components",
                                    "Templates",
                                    "Pricing",
                                    "Docs",
                                  ].map((item, i) => (
                                    <motion.button
                                      key={i}
                                      className="text-sm text-gray-700 transition-colors hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400"
                                      whileHover={{ y: -1 }}
                                    >
                                      {item}
                                    </motion.button>
                                  ))}
                                </div>
                                <div className="flex items-center gap-3">
                                  <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    Sign In
                                  </button>
                                  <button className="rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-md">
                                    Get Started
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="flex-1">
                                  <div className="mb-2 h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                  <div className="h-4 w-40 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                </div>
                                <div className="flex gap-2">
                                  {[1, 2, 3].map((i) => (
                                    <div
                                      key={i}
                                      className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30"
                                    >
                                      <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Hero Sections */}
                        {activeComponent === 3 && (
                          <div className="w-full rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-white shadow-xl">
                            <div className="max-w-md">
                              <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                                ✨ Introducing Infinity UI
                              </div>
                              <h2 className="mb-2 text-2xl font-bold">
                                Create stunning interfaces in minutes
                              </h2>
                              <p className="mb-4 text-sm text-white/80">
                                With our premium components, you can build
                                beautiful websites faster than ever before.
                              </p>
                              <div className="flex gap-3">
                                <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-rose-600">
                                  Get Started
                                </button>
                                <button className="rounded-md border border-white/30 bg-transparent px-4 py-2 text-sm font-medium">
                                  Learn More
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Floating code snippets */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-48 overflow-hidden rounded-md border border-gray-800 bg-gray-900 shadow-xl dark:bg-black"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <div className="text-xs text-purple-400">component.tsx</div>
                  </div>
                  <div className="font-mono text-[10px] text-gray-400">
                    <div>
                      <span className="text-pink-400">import</span>{" "}
                      <span className="text-blue-400">React</span>{" "}
                      <span className="text-pink-400">from</span>{" "}
                      <span className="text-green-400">&apos;react&apos;</span>;
                    </div>
                    <div>
                      <span className="text-pink-400">export</span>{" "}
                      <span className="text-pink-400">const</span>{" "}
                      <span className="text-yellow-400">Button</span> = () =&gt;{" "}
                      {"{"}
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-pink-400">return</span>{" "}
                      (
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                      <span className="text-blue-400">button</span>&gt;Click
                      me&lt;/
                      <span className="text-blue-400">button</span>&gt;
                    </div>
                    <div>&nbsp;&nbsp;);</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-6 -top-6 w-32 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="h-1.5 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="h-12 rounded-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
