"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Activity, Brain, Heart, Shield } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const HealthcareSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Heart,
      title: "Patient Care & Monitoring",
      color: "bg-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
    },
    {
      icon: Brain,
      title: "AI Diagnostics & Analysis",
      color: "bg-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/30",
    },
    {
      icon: Activity,
      title: "Health Tracking & Wellness",
      color: "bg-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
    },
    {
      icon: Shield,
      title: "Medical Data Security",
      color: "bg-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
  ];

  const metrics = [
    { label: "Diagnostic Accuracy", value: 98.5 },
    { label: "Patient Satisfaction", value: 94 },
    { label: "Data Security", value: 99.9 },
  ];

  const stats = [
    {
      value: "5M+",
      label: "Patients served globally",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "98.5%",
      label: "Diagnostic accuracy rate",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "24/7",
      label: "Patient monitoring & support",
      color: "bg-white dark:bg-gray-800",
    },
    {
      value: "15min",
      label: "Average response time",
      color: "bg-white dark:bg-gray-800",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-b from-rose-100/50 to-transparent blur-3xl dark:from-rose-900/20 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-gradient-to-t from-teal-100/50 to-transparent blur-3xl dark:from-teal-900/20 dark:to-transparent"></div>
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
                HEALTHCARE TECHNOLOGY
              </span>
              <h2 className="mb-4 mt-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Revolutionize Patient Care
              </h2>
              <p className="max-w-lg text-lg text-gray-600 dark:text-gray-300">
                Our healthcare platform combines AI-powered diagnostics with
                secure patient monitoring to deliver personalized care and
                improve health outcomes for patients worldwide.
              </p>
            </div>

            <button className="inline-flex items-center rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700">
              LEARN MORE
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
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-rose-500/20 to-teal-500/20 blur-xl"></div>
              <div className="relative h-[300px] w-full">
                <Image
                  src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoRSzf21QKqOivkN1uM6C3empEstycaIU2hRAr"
                  alt="Healthcare Dashboard"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl shadow-xl"
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
              Clinical Excellence
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform is trusted by leading healthcare providers worldwide,
              delivering exceptional patient outcomes with cutting-edge
              technology.
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
                      className="h-full rounded-full bg-rose-600 dark:bg-rose-500"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${metric.value}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                    />
                  </div>
                </div>
              ))}

              <button className="inline-flex items-center rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700">
                VIEW CLINICAL RESULTS
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-gradient-to-br from-rose-500 to-teal-500"></div>
                <Image
                  src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  alt="Healthcare Professional"
                  width={600}
                  height={600}
                  className="relative z-10 h-auto w-full rounded-3xl object-cover"
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

export default HealthcareSection;
