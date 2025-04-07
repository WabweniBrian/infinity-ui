"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code,
  Palette,
  Lightbulb,
  Zap,
  Sparkles,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ServicesGridSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      title: "UI/UX Design",
      description:
        "Create intuitive and beautiful user experiences that delight your customers and drive engagement.",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
      ],
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.05) 0%, transparent 60%)",
    },
    {
      title: "Web Development",
      description:
        "Build modern, responsive websites and web applications using the latest technologies and frameworks.",
      icon: Code,
      color: "from-blue-500 to-indigo-500",
      features: [
        "Frontend Development",
        "Backend Integration",
        "API Development",
        "Performance Optimization",
      ],
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.05) 0%, transparent 60%)",
    },
    {
      title: "Digital Strategy",
      description:
        "Develop comprehensive digital strategies that align with your business goals and drive measurable results.",
      icon: Lightbulb,
      color: "from-amber-500 to-orange-500",
      features: [
        "Market Analysis",
        "Competitive Research",
        "Growth Planning",
        "KPI Development",
      ],
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.05) 0%, transparent 60%)",
    },
    {
      title: "Performance Optimization",
      description:
        "Optimize your digital products for speed, efficiency, and scalability to provide the best user experience.",
      icon: Zap,
      color: "from-emerald-500 to-teal-500",
      features: [
        "Speed Optimization",
        "SEO Enhancement",
        "Conversion Rate Optimization",
        "Analytics Setup",
      ],
      pattern:
        "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.05) 0%, transparent 60%)",
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
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="dotPattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-pink-300/20 to-rose-300/20 blur-3xl dark:from-pink-900/10 dark:to-rose-900/10"
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
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-indigo-300/20 blur-3xl dark:from-blue-900/10 dark:to-indigo-900/10"
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
            <span className="h-1 w-12 rounded-full bg-pink-500"></span>
            <span className="mx-2 font-medium text-pink-500">OUR SERVICES</span>
            <span className="h-1 w-12 rounded-full bg-pink-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Transforming ideas into
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {" "}
              digital reality
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Our comprehensive suite of services is designed to help you build,
            optimize, and grow your digital presence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="absolute inset-0 transform rounded-3xl bg-white shadow-lg transition-transform duration-300 group-hover:scale-[1.02] dark:bg-gray-800"></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              <div
                className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 dark:border-gray-700/50 dark:bg-gray-800"
                style={{ backgroundImage: service.pattern }}
              >
                <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-gradient-to-br from-gray-100/80 to-gray-50/80 blur-3xl dark:from-gray-800/80 dark:to-gray-700/80"></div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${service.color} flex transform items-center justify-center transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110`}
                    >
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>

                  <AnimatePresence>
                    {hoveredService === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50">
                          <div className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            Key Features:
                          </div>
                          <ul className="space-y-2">
                            {service.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <Sparkles className="mr-2 h-4 w-4 text-pink-500 dark:text-pink-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto">
                    <button
                      className={`bg-gradient-to-r px-6 py-3 ${service.color} inline-flex transform items-center rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Not sure which service is right for you? Let&apos;s discuss your
            project.
          </p>
          <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl hover:shadow-pink-500/25">
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
