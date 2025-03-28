"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TimelineFeature = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  status: "released" | "coming-soon" | "in-development";
  date: string;
  image: string;
  highlights: string[];
};

const features: TimelineFeature[] = [
  {
    id: "ai-insights",
    title: "AI-Powered Insights",
    description:
      "Our machine learning algorithms analyze your data to provide actionable insights and recommendations.",
    icon: Zap,
    color: "bg-purple-500",
    status: "released",
    date: "Released: March 2023",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=500",
    highlights: [
      "Predictive analytics for forecasting trends",
      "Anomaly detection to identify outliers",
      "Personalized recommendations based on user behavior",
      "Automated data categorization and tagging",
    ],
  },
  {
    id: "collaboration",
    title: "Advanced Collaboration Tools",
    description:
      "Work together seamlessly with your team through our suite of real-time collaboration features.",
    icon: Users,
    color: "bg-blue-500",
    status: "released",
    date: "Released: June 2023",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=500",
    highlights: [
      "Real-time document editing with multiple users",
      "Threaded comments and discussions",
      "Task assignment and tracking",
      "Integrated video conferencing",
    ],
  },
  {
    id: "analytics",
    title: "Enhanced Analytics Dashboard",
    description:
      "Gain deeper insights with our comprehensive analytics dashboard and customizable reports.",
    icon: BarChart3,
    color: "bg-emerald-500",
    status: "in-development",
    date: "Coming: Q3 2023",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=500",
    highlights: [
      "Customizable dashboard widgets",
      "Advanced filtering and segmentation",
      "Export capabilities in multiple formats",
      "Scheduled automated reports",
    ],
  },
  {
    id: "security",
    title: "Enterprise-Grade Security",
    description:
      "Rest easy with our comprehensive security features designed to protect your sensitive data.",
    icon: Shield,
    color: "bg-amber-500",
    status: "coming-soon",
    date: "Coming: Q4 2023",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=500",
    highlights: [
      "End-to-end encryption for all data",
      "Role-based access controls",
      "Compliance with GDPR, HIPAA, and SOC2",
      "Advanced threat detection and prevention",
    ],
  },
  {
    id: "global-cdn",
    title: "Global Content Delivery",
    description:
      "Lightning-fast performance with our distributed global CDN infrastructure.",
    icon: Globe,
    color: "bg-rose-500",
    status: "coming-soon",
    date: "Coming: Q1 2024",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=500",
    highlights: [
      "Content delivery from the nearest edge location",
      "Automatic optimization for different devices",
      "Smart caching for improved performance",
      "Real-time analytics on content delivery",
    ],
  },
];

const TimelineFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.gray.100),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.gray.800/30%),transparent_70%)]"></div>

        {/* Timeline track */}
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-200 dark:bg-gray-700 md:left-[160px] md:translate-x-0"></div>
      </div>

      <motion.div
        className="container relative mx-auto max-w-7xl px-6"
        style={{ opacity, scale }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Product Roadmap
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Our feature journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our past releases and upcoming features that are shaping
              the future of our platform.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-24 md:ml-[200px]"
            >
              {/* Timeline node */}
              <div className="absolute -left-[200px] top-0 hidden md:block">
                <div className="flex h-16 w-16 items-center justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.color} text-white shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-indigo-600 dark:border-gray-900"></div>
              </div>

              {/* Mobile timeline node */}
              <div className="absolute -left-6 top-0 flex h-12 w-12 items-center justify-center md:hidden">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.color} text-white shadow-lg`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-indigo-600 dark:border-gray-900"></div>
              </div>

              {/* Content card */}
              <div className="ml-16 rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800 md:ml-0">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {feature.status === "released" ? (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        <CheckCircle2 className="h-4 w-4" /> Released
                      </span>
                    ) : feature.status === "in-development" ? (
                      <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        <Clock className="h-4 w-4" /> In Development
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        <Clock className="h-4 w-4" /> Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {feature.date}
                </p>

                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[200px] overflow-hidden rounded-lg">
                    <Image
                      src={
                        feature.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay for coming soon features */}
                    {feature.status !== "released" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                        <div className="rounded-lg bg-white/90 px-4 py-2 text-center font-medium text-gray-900 dark:bg-gray-800/90 dark:text-white">
                          {feature.status === "in-development"
                            ? "In Development"
                            : "Coming Soon"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Key Highlights
                    </h4>
                    <ul className="space-y-3">
                      {feature.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2
                            className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                              feature.status === "released"
                                ? "text-green-500"
                                : feature.status === "in-development"
                                  ? "text-blue-500"
                                  : "text-amber-500"
                            }`}
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {highlight}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {feature.status === "released" && (
                      <motion.a
                        href="#"
                        className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        whileHover={{ x: 5 }}
                      >
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
            Want to influence our roadmap? We value your feedback!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 dark:shadow-indigo-900/20"
          >
            Submit Feature Request
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TimelineFeatures;
