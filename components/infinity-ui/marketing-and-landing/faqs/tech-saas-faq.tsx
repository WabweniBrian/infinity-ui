"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDown,
  Code,
  Zap,
  Shield,
  Sparkles,
  Database,
  Cpu,
} from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How does your API integration work?",
    answer:
      "Our API uses REST principles and OAuth 2.0 for authentication. We provide comprehensive documentation and SDKs for major programming languages to make integration seamless. Most customers complete integration within 2-3 days.",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: 2,
    question: "What security measures do you have in place?",
    answer:
      "We implement bank-level security with SOC 2 Type II compliance, end-to-end encryption, and regular penetration testing. All data is encrypted at rest and in transit using AES-256 encryption.",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    id: 3,
    question: "How does your pricing scale with usage?",
    answer:
      "Our pricing scales linearly with usage. We offer volume discounts starting at 10,000 API calls per month. Custom enterprise plans are available for high-volume customers with dedicated support.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: 4,
    question: "What makes your solution different from competitors?",
    answer:
      "Our platform offers 99.99% uptime, 3x faster processing speeds, and a more intuitive developer experience. We&apos;re the only solution that combines real-time analytics, AI-powered insights, and seamless integration capabilities.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const TechSaasFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute -left-48 top-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=20&width=20')] bg-[length:40px_40px] opacity-[0.03]" />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[15%] top-20 text-indigo-500/20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          <Database size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-[20%] text-cyan-500/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <Cpu size={50} />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative mx-auto mb-6 h-20 w-20"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-400 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-400">
              <Code className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <motion.h2
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Everything you need to know about our platform and services
          </motion.p>
        </div>

        <motion.div
          className="grid gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
              <motion.div
                className={`relative overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/90 backdrop-blur-xl transition-all duration-300 ${
                  activeIndex === index ? "shadow-lg shadow-indigo-500/20" : ""
                }`}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                layout
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={activeIndex === index}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-600 p-3">
                      {faq.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="ml-4 flex-shrink-0 rounded-full bg-slate-800/50 p-2"
                  >
                    <ChevronDown className="h-5 w-5 text-indigo-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-700/50 p-6 pt-2 text-slate-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="mb-6 text-slate-400">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSaasFAQ;
