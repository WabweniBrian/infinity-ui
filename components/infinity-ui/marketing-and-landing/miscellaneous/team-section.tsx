"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const timelineSteps = [
    {
      title: "Discovery",
      description:
        "We start by understanding your goals, audience, and requirements to create a solid foundation for your project.",
      icon: "🔍",
      color: "from-teal-500 to-emerald-500",
    },
    {
      title: "Strategy",
      description:
        "Our team develops a comprehensive strategy tailored to your specific needs and objectives.",
      icon: "🧠",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Design",
      description:
        "We create intuitive, beautiful interfaces that align with your brand and delight your users.",
      icon: "🎨",
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Development",
      description:
        "Our engineers build robust, scalable solutions using the latest technologies and best practices.",
      icon: "💻",
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "Testing",
      description:
        "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices.",
      icon: "🧪",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Launch",
      description:
        "We help you successfully launch your product and provide ongoing support to ensure its success.",
      icon: "🚀",
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="hexagons"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(0.5)"
              >
                <path
                  d="M25,0 L50,14.4 L50,43.4 L25,57.8 L0,43.4 L0,14.4 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-teal-300/20 to-emerald-300/20 blur-3xl dark:from-teal-900/10 dark:to-emerald-900/10"
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-300/20 to-violet-300/20 blur-3xl dark:from-purple-900/10 dark:to-violet-900/10"
          style={{ y: y2 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-teal-500"></span>
            <span className="mx-2 font-medium text-teal-500">OUR PROCESS</span>
            <span className="h-1 w-12 rounded-full bg-teal-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            How we bring your
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              vision to life
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Our proven six-step process ensures we deliver exceptional results
            that exceed your expectations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-b from-teal-500 to-rose-500"></div>

          {/* Timeline Steps */}
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`mb-16 flex items-center last:mb-0 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Timeline Content */}
                <div
                  className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                >
                  <div className="relative">
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r ${step.color} transform rounded-2xl opacity-20 blur-lg ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                    ></div>
                    <div className="relative rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
                      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Icon */}
                <div className="flex w-2/12 justify-center">
                  <div className="relative">
                    <div
                      className={`absolute -inset-3 bg-gradient-to-r ${step.color} rounded-full opacity-50 blur-lg`}
                    ></div>
                    <div
                      className={`relative h-16 w-16 rounded-full bg-gradient-to-r ${step.color} z-10 flex items-center justify-center text-2xl`}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Empty Space for Alternating Layout */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Ready to start your project? Let&apos;s create something amazing
            together.
          </p>
          <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-teal-600 hover:to-emerald-600 hover:shadow-xl hover:shadow-teal-500/25">
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
