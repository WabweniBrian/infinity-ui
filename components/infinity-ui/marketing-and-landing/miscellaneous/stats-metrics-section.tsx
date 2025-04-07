"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Clock,
  Award,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const StatsMetricsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const metrics = [
    {
      title: "Active Users",
      value: "2.4M+",
      change: "+24%",
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      description: "Monthly active users across all platforms",
    },
    {
      title: "Global Reach",
      value: "120+",
      change: "+12",
      icon: Globe,
      color: "from-emerald-500 to-teal-500",
      description: "Countries with active user base",
    },
    {
      title: "Response Time",
      value: "45ms",
      change: "-15ms",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      description: "Average server response time",
    },
    {
      title: "Customer Rating",
      value: "4.9/5",
      change: "+0.3",
      icon: Award,
      color: "from-rose-500 to-pink-500",
      description: "Average customer satisfaction score",
    },
  ];

  const growthData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 30 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 40 },
    { month: "May", value: 35 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 60 },
    { month: "Aug", value: 75 },
    { month: "Sep", value: 80 },
    { month: "Oct", value: 95 },
    { month: "Nov", value: 85 },
    { month: "Dec", value: 100 },
  ];

  const chartHeight = 200;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-emerald-400/30 to-teal-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="stats-grid"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
            <span className="mx-2 font-medium text-blue-500">METRICS</span>
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Driving growth with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              data-driven insights
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Our platform delivers exceptional results through continuous
            monitoring and optimization of key performance indicators.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-1 transform rounded-3xl bg-gradient-to-br from-white to-white shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:from-gray-800 dark:to-gray-800"></div>
              <div
                className={`absolute -inset-1 bg-gradient-to-br ${metric.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 hover:opacity-100`}
              ></div>

              <div className="relative h-full rounded-3xl border border-gray-200/50 bg-white p-6 dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}
                  >
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <div
                    className={`rounded-lg px-2 py-1 text-sm font-medium ${
                      metric.change.startsWith("+")
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                    }`}
                  >
                    {metric.change}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    {metric.title}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mb-16"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Annual Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Year-over-year performance metrics
                </p>
              </div>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                <span className="font-medium text-green-500">
                  +42% from last year
                </span>
              </div>
            </div>

            <div className="relative h-[300px]">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0">
                {[0, 25, 50, 75, 100].map((tick, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                    style={{ top: `${100 - tick}%` }}
                  >
                    <span className="absolute -left-8 -top-3 text-xs text-gray-500 dark:text-gray-400">
                      {tick}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Bars */}
              <div className="absolute inset-0 flex items-end justify-between pt-6">
                {growthData.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center"
                  >
                    <motion.div
                      className="w-8 rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-500"
                      initial={{ height: 0 }}
                      animate={
                        isInView
                          ? { height: `${(item.value / 100) * chartHeight}px` }
                          : { height: 0 }
                      }
                      transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <div className="rounded bg-gray-900 px-2 py-1 text-xs text-white dark:bg-gray-700">
                          {item.value}%
                        </div>
                      </div>
                    </motion.div>
                    <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Stats */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Industry Average",
              value: "3.2%",
              description: "Conversion rate across the industry",
              color: "bg-gray-100 dark:bg-gray-800",
              textColor: "text-gray-900 dark:text-white",
            },
            {
              title: "Our Platform",
              value: "8.7%",
              description: "Our average conversion rate",
              color: "bg-gradient-to-r from-blue-500 to-indigo-500",
              textColor: "text-white",
            },
            {
              title: "Improvement",
              value: "+171%",
              description: "Performance increase with our solution",
              color: "bg-gray-100 dark:bg-gray-800",
              textColor: "text-gray-900 dark:text-white",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`${stat.color} rounded-3xl p-6 shadow-lg`}
            >
              <h3
                className={`text-lg font-medium ${index === 1 ? "text-blue-100" : "text-gray-500 dark:text-gray-400"} mb-2`}
              >
                {stat.title}
              </h3>
              <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>
                {stat.value}
              </div>
              <p
                className={`text-sm ${index === 1 ? "text-blue-100" : "text-gray-600 dark:text-gray-300"}`}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Ready to see how our platform can transform your business metrics?
          </p>
          <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/25">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsMetricsSection;
