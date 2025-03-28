"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// partner comparison data
const partnerComparisons = [
  {
    id: 1,
    category: "Technology",
    partners: [
      {
        id: 101,
        name: "Acme Corporation",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Enterprise-grade solutions with advanced security features.",
        strengths: [
          "Advanced AI capabilities",
          "Enterprise-grade security",
          "Global support network",
          "99.99% uptime guarantee",
        ],
        website: "https://example.com",
        color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
      },
      {
        id: 102,
        name: "TechGiant",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Innovative solutions focused on user experience and design.",
        strengths: [
          "Intuitive user interfaces",
          "Rapid deployment options",
          "Flexible pricing models",
          "Award-winning design",
        ],
        website: "https://example.com",
        color:
          "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
      },
    ],
  },
  {
    id: 2,
    category: "Finance",
    partners: [
      {
        id: 201,
        name: "Globex",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Comprehensive financial solutions for enterprise clients.",
        strengths: [
          "Advanced fraud detection",
          "Real-time transaction processing",
          "Regulatory compliance expertise",
          "Multi-currency support",
        ],
        website: "https://example.com",
        color:
          "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
      },
      {
        id: 202,
        name: "Wayne Enterprises",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Specialized financial services with a focus on security.",
        strengths: [
          "Military-grade encryption",
          "Dedicated account managers",
          "Custom reporting tools",
          "Philanthropic initiatives",
        ],
        website: "https://example.com",
        color:
          "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
      },
    ],
  },
  {
    id: 3,
    category: "Healthcare",
    partners: [
      {
        id: 301,
        name: "Umbrella Corp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Innovative healthcare solutions with global reach.",
        strengths: [
          "HIPAA compliant systems",
          "Telemedicine capabilities",
          "Patient data analytics",
          "Research partnerships",
        ],
        website: "https://example.com",
        color: "from-rose-500 to-pink-500 dark:from-rose-400 dark:to-pink-400",
      },
      {
        id: 302,
        name: "Oscorp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Cutting-edge biotechnology research and applications.",
        strengths: [
          "Advanced research facilities",
          "Genetic sequencing tools",
          "Clinical trial management",
          "Pharmaceutical development",
        ],
        website: "https://example.com",
        color: "from-red-500 to-rose-500 dark:from-red-400 dark:to-rose-400",
      },
    ],
  },
];

const VersusPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState(
    partnerComparisons[0].id,
  );

  // Get current category data
  const currentCategory =
    partnerComparisons.find((category) => category.id === activeCategory) ||
    partnerComparisons[0];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-900/20" />
      </div>

      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Partner{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Comparison
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Compare our strategic partners across different industries
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {partnerComparisons.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Comparison Cards */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {currentCategory.partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
                >
                  {/* Partner logo */}
                  <div className="flex h-20 items-center justify-center">
                    <div className="relative h-16 w-[160px]">
                      <Image
                        src={
                          partner.logo ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Colored divider */}
                  <div
                    className="my-4 h-1 w-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${partner.color.split(" ").slice(1).join(" ")})`,
                    }}
                  />

                  {/* Partner details */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {partner.name}
                  </h3>

                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {partner.description}
                  </p>

                  {/* Strengths list */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-300">
                      Key Strengths
                    </h4>

                    <ul className="mt-3 space-y-2">
                      {partner.strengths.map((strength, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {strength}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Website link */}
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${partner.color.split(" ").slice(1).join(" ")})`,
                    }}
                  >
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>

                  {/* Decorative corner */}
                  <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-gray-100 dark:bg-slate-700" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:block">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg dark:from-blue-500 dark:to-indigo-500"
          >
            VS
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VersusPartners;
