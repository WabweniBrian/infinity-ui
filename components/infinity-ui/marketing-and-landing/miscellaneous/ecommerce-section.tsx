"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  CreditCard,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const EcommerceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: ShoppingBag,
      title: "Product Discovery & Recommendations",
      color: "bg-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      icon: Truck,
      title: "Logistics & Fulfillment Solutions",
      color: "bg-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: CreditCard,
      title: "Secure Payment Processing & Fraud Prevention",
      color: "bg-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: BarChart3,
      title: "Sales Analytics, Insights & Reporting",
      color: "bg-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  const metrics = [
    { label: "Conversion Rate", value: 8.5 },
    { label: "Customer Retention", value: 92 },
    { label: "Order Fulfillment", value: 99.7 },
  ];

  const stats = [
    {
      value: "$12M+",
      label: "Monthly sales volume",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "98.7%",
      label: "On-time delivery rate",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "2.5M+",
      label: "Active customers",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "15min",
      label: "Average support response",
      color: "bg-white dark:bg-gray-800",
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
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-b from-amber-100/50 to-transparent blur-3xl dark:from-amber-900/20 dark:to-transparent"></div>
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
                E-COMMERCE PLATFORM
              </span>
              <h2 className="mb-4 mt-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Supercharge Your Online Store
              </h2>
              <p className="max-w-lg text-lg text-gray-600 dark:text-gray-300">
                Our comprehensive e-commerce platform provides everything you
                need to sell online, from product management and secure payments
                to logistics and customer insights.
              </p>
            </div>

            <button className="inline-flex items-center rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700">
              START SELLING
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
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-amber-500/20 to-blue-500/20 blur-xl"></div>
              <div className="relative">
                <Image
                  src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoV4pYztJprS62IlXgenFT9i4m3NRbk5yCzYVK"
                  alt="E-commerce Dashboard"
                  width={800}
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
              Optimized for Conversion
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform is designed to maximize sales and customer
              satisfaction with industry-leading tools and insights.
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
                      className="h-full rounded-full bg-amber-600 dark:bg-amber-500"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${metric.value}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                    />
                  </div>
                </div>
              ))}

              <button className="inline-flex items-center rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700">
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
                <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500 to-blue-500"></div>
                <Image
                  src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  alt="E-commerce Expert"
                  className="relative z-10 h-auto w-full rounded-3xl"
                  width={800}
                  height={600}
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

export default EcommerceSection;
