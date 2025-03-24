"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const FintechSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: CreditCard,
      title: "Payment Processing & Solutions",
      color: "bg-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: LineChart,
      title: "Investment & Portfolio Analysis",
      color: "bg-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: TrendingUp,
      title: "Financial Growth & Planning",
      color: "bg-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: PieChart,
      title: "Wealth Management & Advisory",
      color: "bg-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  const metrics = [
    { label: "Transaction Success Rate", value: 99.8 },
    { label: "Fraud Prevention", value: 97.5 },
    { label: "Customer Satisfaction", value: 92 },
  ];

  const stats = [
    {
      value: "$2.8B",
      label: "Transaction volume processed",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "0.01%",
      label: "Industry-leading fraud rate",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "3.2M",
      label: "Active users on platform",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "28%",
      label: "Average portfolio growth",
      color: "bg-white dark:bg-gray-800",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-b from-emerald-100/50 to-transparent blur-3xl dark:from-emerald-900/20 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-gradient-to-t from-blue-100/50 to-transparent blur-3xl dark:from-blue-900/20 dark:to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="mb-6">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                FINTECH SOLUTIONS
              </span>
              <h2 className="mb-4 mt-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Accelerate Your Financial Growth
              </h2>
              <p className="max-w-lg text-lg text-gray-600 dark:text-gray-300">
                Our cutting-edge fintech platform combines AI-powered insights
                with secure payment processing to help businesses and
                individuals optimize their financial operations and maximize
                returns.
              </p>
            </div>

            <button className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700">
              GET STARTED
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-xl"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Financial Dashboard"
                  width={600}
                  height={600}
                  className="h-auto w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div
                className={`${service.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
              >
                <div
                  className={`h-12 w-12 ${service.color} mb-4 flex items-center justify-center rounded-full`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Industry-Leading Performance
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform delivers exceptional results with bank-grade security
              and lightning-fast transaction processing, trusted by businesses
              worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {metric.label}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${metric.value}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                    />
                  </div>
                </div>
              ))}

              <button className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700">
                VIEW PERFORMANCE METRICS
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500"></div>
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Financial Expert"
                  width={600}
                  height={600}
                  className="relative z-10 h-auto w-full rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`${stat.color} rounded-xl p-6 shadow-sm`}
            >
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FintechSection;
