"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  ChevronRight,
  Code,
  Cpu,
  Database,
  Globe,
  Lock,
  Play,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SaasHero = () => {
  const controls = useAnimation();
  const [activeFeature, setActiveFeature] = useState(0);

  // Features data
  const features = [
    {
      title: "AI-Powered Analytics",
      description:
        "Gain insights automatically with our machine learning algorithms",
      icon: Sparkles,
      color: "bg-purple-500",
    },
    {
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team from anywhere",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-level encryption and compliance with industry standards",
      icon: Lock,
      color: "bg-green-500",
    },
  ];

  // Dashboard metrics
  const metrics = [
    { label: "Active Users", value: "2,834", trend: "+12%", up: true },
    { label: "Conversion Rate", value: "5.2%", trend: "+0.8%", up: true },
    { label: "Avg. Session", value: "4m 32s", trend: "-0.5%", up: false },
  ];

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, features.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Gradient accents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-purple-500 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-blue-500 blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-indigo-500/20 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
              Introducing Our Platform 2.0
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Streamline your{" "}
              <span className="relative text-indigo-400">
                workflow
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-indigo-500/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-slate-300"
            >
              Our all-in-one platform helps teams work smarter, not harder.
              Automate workflows, analyze data, and collaborate seamlessly.
            </motion.p>

            {/* Feature tabs */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-4 flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeFeature === index
                        ? "w-8 bg-indigo-500"
                        : "w-2 bg-slate-600"
                    }`}
                    aria-label={`View feature ${index + 1}`}
                  />
                ))}
              </div>

              <div className="relative h-[120px] rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur-sm">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: activeFeature === index ? 1 : 0,
                      x: activeFeature === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 p-4 ${activeFeature === index ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.color} text-white`}
                      >
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-medium text-white">
                          {feature.title}
                        </h3>
                        <p className="text-slate-300">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA and social proof */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-medium text-white transition-all hover:bg-slate-700"
              >
                <Play className="h-4 w-4 fill-white" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-slate-800"
                    >
                      <Image
                        src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        alt={`User ${i + 1}`}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-300">
                  <span className="font-semibold text-white">2,000+</span>{" "}
                  companies
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm font-medium text-white">
                  4.9/5
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Dashboard UI */}
              <div className="overflow-hidden rounded-xl bg-slate-800 shadow-2xl">
                {/* Header */}
                <div className="border-b border-slate-700 bg-slate-900 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div className="font-medium text-white">Dashboard</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-300">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-600">
                        <Image
                          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          alt="User"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-4">
                  {/* Metrics */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                        className="rounded-lg border border-slate-700 bg-slate-800 p-3"
                      >
                        <div className="mb-1 text-xs text-slate-400">
                          {metric.label}
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-xl font-bold text-white">
                            {metric.value}
                          </div>
                          <div
                            className={`flex items-center gap-1 text-xs ${
                              metric.up ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            <svg
                              className={`h-3 w-3 ${metric.up ? "" : "rotate-180 transform"}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            {metric.trend}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-sm font-medium text-white sm:text-base">
                        Performance Overview
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                          <span className="text-xs text-slate-400">
                            This Week
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                          <span className="text-xs text-slate-400">
                            Last Week
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-32">
                      <div className="flex h-full items-end justify-between">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="flex h-full w-full flex-1 flex-col items-center gap-1"
                          >
                            <div className="relative h-full w-4/5">
                              <motion.div
                                className="absolute bottom-0 left-0 w-2 rounded-t bg-slate-500"
                                initial={{ height: 0 }}
                                animate={{
                                  height: `${20 + Math.random() * 60}%`,
                                }}
                                transition={{
                                  delay: 1.6 + i * 0.1,
                                  duration: 0.8,
                                }}
                              />
                              <motion.div
                                className="absolute bottom-0 right-0 w-2 rounded-t bg-indigo-500"
                                initial={{ height: 0 }}
                                animate={{
                                  height: `${30 + Math.random() * 60}%`,
                                }}
                                transition={{
                                  delay: 1.8 + i * 0.1,
                                  duration: 0.8,
                                }}
                              />
                            </div>
                            <div className="text-xs text-slate-500">
                              {["M", "T", "W", "T", "F", "S", "S"][i]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="rounded-lg border border-slate-700 bg-slate-800 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="font-medium text-white">
                        Recent Activity
                      </div>
                      <div className="text-xs font-medium text-indigo-400">
                        View All
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          icon: Users,
                          text: "New team member added",
                          time: "2m ago",
                          color: "bg-blue-500",
                        },
                        {
                          icon: Database,
                          text: "Database backup completed",
                          time: "1h ago",
                          color: "bg-green-500",
                        },
                        {
                          icon: BarChart2,
                          text: "Monthly report generated",
                          time: "3h ago",
                          color: "bg-purple-500",
                        },
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 1.8 + index * 0.2,
                            duration: 0.5,
                          }}
                          className="flex items-center gap-3 rounded-lg border border-slate-700 p-3"
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${activity.color} text-white`}
                          >
                            <activity.icon className="h-4 w-4" />
                          </div>

                          <div className="flex-1">
                            <div className="text-sm text-white">
                              {activity.text}
                            </div>
                            <div className="text-xs text-slate-400">
                              {activity.time}
                            </div>
                          </div>

                          <button className="rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-white">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 top-10 rounded-lg bg-slate-800 p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/30 text-indigo-400">
                    <Code className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">API Integration</div>
                    <div className="text-slate-400">Connected successfully</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -bottom-8 -right-10 rounded-lg bg-slate-800 p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/30 text-green-400">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">System Status</div>
                    <div className="text-slate-400">
                      All services operational
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SaasHero;
