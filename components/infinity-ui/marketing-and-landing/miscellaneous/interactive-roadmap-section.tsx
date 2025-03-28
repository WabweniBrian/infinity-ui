"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const InteractiveRoadmapSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(0);
  const [activeQuarter, setActiveQuarter] = useState(0);

  const quarters = [
    { id: 0, label: "Q1 2024" },
    { id: 1, label: "Q2 2024" },
    { id: 2, label: "Q3 2024" },
    { id: 3, label: "Q4 2024" },
  ];

  const milestones = [
    [
      {
        title: "Component Library Launch",
        description:
          "Initial release of our core UI component library with 50+ components.",
        date: "January 15, 2024",
        status: "completed",
        features: [
          "Button system with variants",
          "Form components",
          "Navigation elements",
          "Card layouts",
          "Modal and dialog system",
        ],
        color: "from-emerald-500 to-teal-500",
      },
      {
        title: "Documentation Portal",
        description:
          "Comprehensive documentation site with examples, API references, and guides.",
        date: "February 10, 2024",
        status: "completed",
        features: [
          "Interactive component playground",
          "Copy-paste code examples",
          "Theme customization guide",
          "Accessibility documentation",
          "Getting started tutorials",
        ],
        color: "from-blue-500 to-indigo-500",
      },
      {
        title: "Template Collection",
        description:
          "First set of page templates and layout patterns for common use cases.",
        date: "March 20, 2024",
        status: "in-progress",
        features: [
          "Dashboard layouts",
          "Landing page templates",
          "Authentication flows",
          "Pricing page designs",
          "Blog and content layouts",
        ],
        color: "from-violet-500 to-purple-500",
      },
    ],
    [
      {
        title: "Advanced Animation System",
        description:
          "Integrated animation library with pre-built transitions and effects.",
        date: "April 15, 2024",
        status: "planned",
        features: [
          "Page transitions",
          "Scroll animations",
          "Micro-interactions",
          "Loading states",
          "Animation composition system",
        ],
        color: "from-rose-500 to-pink-500",
      },
      {
        title: "Data Visualization Components",
        description:
          "Comprehensive set of charts, graphs, and data display components.",
        date: "May 25, 2024",
        status: "planned",
        features: [
          "Bar and line charts",
          "Pie and donut charts",
          "Heat maps",
          "Data tables with sorting and filtering",
          "Interactive dashboards",
        ],
        color: "from-amber-500 to-orange-500",
      },
      {
        title: "Mobile Component Extensions",
        description: "Specialized components optimized for mobile experiences.",
        date: "June 30, 2024",
        status: "planned",
        features: [
          "Touch-optimized controls",
          "Mobile navigation patterns",
          "Responsive layout utilities",
          "Native-like animations",
          "Offline support utilities",
        ],
        color: "from-cyan-500 to-blue-500",
      },
    ],
    [
      {
        title: "Enterprise Feature Set",
        description: "Advanced components for complex enterprise applications.",
        date: "July 20, 2024",
        status: "planned",
        features: [
          "Data grid with advanced features",
          "Multi-step workflows",
          "Advanced form validation",
          "Role-based UI components",
          "Audit logging visualizations",
        ],
        color: "from-indigo-500 to-purple-500",
      },
      {
        title: "Accessibility Enhancements",
        description:
          "Comprehensive accessibility improvements across all components.",
        date: "August 15, 2024",
        status: "planned",
        features: [
          "WCAG 2.1 AA compliance",
          "Screen reader optimizations",
          "Keyboard navigation improvements",
          "Focus management utilities",
          "High contrast theme",
        ],
        color: "from-green-500 to-emerald-500",
      },
      {
        title: "Internationalization Support",
        description:
          "Built-in support for multiple languages and localization.",
        date: "September 30, 2024",
        status: "planned",
        features: [
          "RTL layout support",
          "Date and number formatting",
          "Translation management",
          "Language switching utilities",
          "Cultural adaptation components",
        ],
        color: "from-red-500 to-rose-500",
      },
    ],
    [
      {
        title: "AI-Powered Components",
        description: "Integration of AI capabilities into UI components.",
        date: "October 15, 2024",
        status: "planned",
        features: [
          "Smart search components",
          "Content recommendation widgets",
          "Predictive text inputs",
          "Data analysis visualizations",
          "Personalization engines",
        ],
        color: "from-fuchsia-500 to-pink-500",
      },
      {
        title: "3D and WebGL Components",
        description: "Advanced 3D visualization components and effects.",
        date: "November 20, 2024",
        status: "planned",
        features: [
          "3D model viewers",
          "Interactive product showcases",
          "Data visualization in 3D",
          "Immersive backgrounds",
          "Performance-optimized rendering",
        ],
        color: "from-sky-500 to-blue-500",
      },
      {
        title: "Design System 2.0",
        description:
          "Major update to the design system with new aesthetic and capabilities.",
        date: "December 15, 2024",
        status: "planned",
        features: [
          "Refreshed visual language",
          "Expanded color system",
          "New typography scale",
          "Enhanced component variants",
          "Improved customization options",
        ],
        color: "from-amber-500 to-yellow-500",
      },
    ],
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return (
          <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Planned";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "in-progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

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
                id="roadmap-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#roadmap-pattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-indigo-300/20 blur-3xl dark:from-blue-900/10 dark:to-indigo-900/10"
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
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl dark:from-purple-900/10 dark:to-pink-900/10"
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
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
            <span className="mx-2 font-medium text-blue-500">
              PRODUCT ROADMAP
            </span>
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Our journey to
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              the future
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Explore our product roadmap to see what we&apos;ve accomplished and
            what exciting features are coming next.
          </p>
        </motion.div>

        {/* Quarter Selector */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
            {quarters.map((quarter) => (
              <button
                key={quarter.id}
                onClick={() => setActiveQuarter(quarter.id)}
                className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                  activeQuarter === quarter.id
                    ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {quarter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative mb-16">
          <div className="absolute bottom-10 left-8 top-10 hidden w-1 rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 md:block"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuarter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-8">
                {milestones[activeQuarter].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="md:pl-16">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-6 hidden -translate-y-1/2 transform md:block">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500 bg-white dark:border-blue-400 dark:bg-gray-800">
                          {getStatusIcon(milestone.status)}
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${milestone.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 hover:opacity-100`}
                      ></div>

                      <div className="relative rounded-3xl border border-gray-200/50 bg-white p-6 shadow-lg transition-colors duration-300 hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                        <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
                          <div className="mb-4 flex items-center md:mb-0">
                            <div className="mr-4 md:hidden">
                              {getStatusIcon(milestone.status)}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {milestone.title}
                            </h3>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {milestone.date}
                            </span>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(milestone.status)}`}
                            >
                              {getStatusText(milestone.status)}
                            </span>
                          </div>
                        </div>

                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() =>
                              setExpandedMilestone(
                                expandedMilestone === index ? null : index,
                              )
                            }
                            className="flex items-center font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {expandedMilestone === index
                              ? "Hide details"
                              : "View details"}
                            {expandedMilestone === index ? (
                              <ChevronUp className="ml-1 h-5 w-5" />
                            ) : (
                              <ChevronDown className="ml-1 h-5 w-5" />
                            )}
                          </button>
                        </div>

                        <AnimatePresence>
                          {expandedMilestone === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
                                  Key Features:
                                </h4>
                                <ul className="space-y-2">
                                  {milestone.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                                      </div>
                                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                                        {feature}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="col-span-1 md:col-span-2">
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  2024 Progress
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  We&apos;re committed to delivering on our roadmap and
                  continuously improving our product based on user feedback.
                </p>
                <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/25">
                  Subscribe to Updates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              <div className="col-span-1 grid grid-cols-2 gap-4 md:col-span-2">
                {[
                  {
                    label: "Completed",
                    value: "8",
                    color:
                      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400",
                  },
                  {
                    label: "In Progress",
                    value: "4",
                    color:
                      "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400",
                  },
                  {
                    label: "Planned",
                    value: "16",
                    color:
                      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400",
                  },
                  {
                    label: "Completion",
                    value: "25%",
                    color:
                      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.color} flex flex-col items-center justify-center rounded-xl p-4 text-center`}
                  >
                    <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveRoadmapSection;
