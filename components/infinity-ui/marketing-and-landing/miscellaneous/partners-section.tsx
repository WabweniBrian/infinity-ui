"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const PartnersSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedPartner, setExpandedPartner] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Partners" },
    { id: "technology", name: "Technology" },
    { id: "design", name: "Design Tools" },
    { id: "payment", name: "Payment Solutions" },
    { id: "analytics", name: "Analytics" },
  ];

  const partners = [
    {
      name: "TechStack",
      category: "technology",
      description:
        "Leading cloud infrastructure provider with global reach and enterprise-grade security.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Seamless API integration",
        "Dedicated support team",
        "Custom implementation options",
        "Enterprise SLAs available",
      ],
      link: "https://example.com/techstack",
    },
    {
      name: "DesignPro",
      category: "design",
      description:
        "Professional design tool suite with advanced prototyping and collaboration features.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-purple-500 to-violet-500",
      features: [
        "Design system import/export",
        "Component library integration",
        "Design token synchronization",
        "Collaborative editing",
      ],
      link: "https://example.com/designpro",
    },
    {
      name: "SecurePay",
      category: "payment",
      description:
        "Global payment processing platform supporting multiple currencies and payment methods.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-emerald-500 to-teal-500",
      features: [
        "PCI DSS compliant",
        "Fraud detection system",
        "Multi-currency support",
        "Subscription billing",
      ],
      link: "https://example.com/securepay",
    },
    {
      name: "DataInsight",
      category: "analytics",
      description:
        "Advanced analytics platform with real-time dashboards and custom reporting capabilities.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-amber-500 to-orange-500",
      features: [
        "User behavior tracking",
        "Conversion analytics",
        "Custom event tracking",
        "A/B testing framework",
      ],
      link: "https://example.com/datainsight",
    },
    {
      name: "CloudServe",
      category: "technology",
      description:
        "Scalable hosting and serverless computing platform for modern web applications.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-rose-500 to-pink-500",
      features: [
        "Global CDN",
        "Serverless functions",
        "Edge computing",
        "Automatic scaling",
      ],
      link: "https://example.com/cloudserve",
    },
    {
      name: "SketchMaster",
      category: "design",
      description:
        "Vector-based design tool with powerful features for UI/UX designers.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-cyan-500 to-blue-500",
      features: [
        "Component libraries",
        "Design system support",
        "Version control",
        "Collaboration tools",
      ],
      link: "https://example.com/sketchmaster",
    },
    {
      name: "PayFlow",
      category: "payment",
      description:
        "Streamlined payment processing with focus on developer experience and integration ease.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-green-500 to-emerald-500",
      features: [
        "Simple API",
        "Webhook notifications",
        "Developer dashboard",
        "Comprehensive documentation",
      ],
      link: "https://example.com/payflow",
    },
    {
      name: "MetricsPro",
      category: "analytics",
      description:
        "Enterprise-grade analytics platform with AI-powered insights and predictions.",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-yellow-500 to-amber-500",
      features: [
        "Machine learning insights",
        "Predictive analytics",
        "Custom dashboards",
        "Data visualization tools",
      ],
      link: "https://example.com/metricspro",
    },
  ];

  const filteredPartners =
    activeCategory === "all"
      ? partners
      : partners.filter((partner) => partner.category === activeCategory);

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
                id="partners-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#partners-pattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-3xl dark:from-emerald-900/10 dark:to-teal-900/10"
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
            <span className="h-1 w-12 rounded-full bg-emerald-500"></span>
            <span className="mx-2 font-medium text-emerald-500">
              OUR PARTNERS
            </span>
            <span className="h-1 w-12 rounded-full bg-emerald-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Powerful
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              integrations
            </span>{" "}
            and partnerships
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            We&apos;ve partnered with industry leaders to provide seamless
            integrations that enhance your workflow and productivity.
          </p>

          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-xl px-6 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${partner.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
                ></div>

                <div className="relative flex h-full flex-col rounded-3xl border border-gray-200/50 bg-white p-6 shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                  <div className="mb-6 flex h-16 items-center">
                    <div className="relative flex h-10 w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={
                          partner.logo ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={partner.name}
                        fill
                        className="mx-auto max-h-8 max-w-[80%] object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {partner.name}
                  </h3>

                  <p className="mb-4 flex-grow text-sm text-gray-600 dark:text-gray-300">
                    {partner.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          setExpandedPartner(
                            expandedPartner === index ? null : index,
                          )
                        }
                        className="flex items-center text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        {expandedPartner === index
                          ? "Hide details"
                          : "View features"}
                        {expandedPartner === index ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>

                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>

                    <AnimatePresence>
                      {expandedPartner === index && (
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
                              {partner.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
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
          </AnimatePresence>
        </div>

        {/* Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Why Partner With Us?
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Our partnership program offers numerous benefits and
                  opportunities for growth. Join our ecosystem and reach
                  thousands of developers and businesses.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Expanded Reach",
                      description:
                        "Access to our growing user base of developers and businesses.",
                    },
                    {
                      title: "Technical Support",
                      description:
                        "Dedicated integration support from our engineering team.",
                    },
                    {
                      title: "Co-Marketing",
                      description:
                        "Joint marketing opportunities and featured placement.",
                    },
                    {
                      title: "Early Access",
                      description: "Preview and influence our product roadmap.",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25">
                    Become a Partner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-lg"></div>
                <div className="relative rounded-2xl border border-gray-200/50 bg-gray-50 p-6 dark:border-gray-700/50 dark:bg-gray-900">
                  <h4 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                    Integration Process
                  </h4>

                  <div className="space-y-6">
                    {[
                      {
                        number: "01",
                        title: "Apply",
                        description:
                          "Fill out our partner application form with details about your integration.",
                      },
                      {
                        number: "02",
                        title: "Connect",
                        description:
                          "Our partnership team will reach out to discuss integration details.",
                      },
                      {
                        number: "03",
                        title: "Develop",
                        description:
                          "Work with our technical team to build and test the integration.",
                      },
                      {
                        number: "04",
                        title: "Launch",
                        description:
                          "Release your integration to our marketplace and start growing together.",
                      },
                    ].map((step, index) => (
                      <div key={index} className="flex">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white">
                          {step.number}
                        </div>
                        <div className="ml-4">
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {step.title}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
