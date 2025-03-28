"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FaqAccordionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I get started with Infinity UI?",
      answer:
        "Getting started with Infinity UI is simple. First, install the package via npm or yarn. Then, import the components you need and start building your interface. Our comprehensive documentation provides step-by-step guides and examples to help you get up and running quickly.",
    },
    {
      question: "Is Infinity UI compatible with my tech stack?",
      answer:
        "Infinity UI is designed to be framework-agnostic and compatible with most modern web development stacks. It works seamlessly with React, Vue, Angular, and other popular frameworks. The components are built with accessibility and performance in mind, ensuring they integrate well with your existing projects.",
    },
    {
      question: "Can I customize the components to match my brand?",
      answer:
        "All Infinity UI components are highly customizable. You can easily modify colors, typography, spacing, and other design elements to match your brand guidelines. We provide a theming system that makes it simple to apply consistent styling across all components.",
    },
    {
      question: "Does Infinity UI support dark mode?",
      answer:
        "Yes, Infinity UI fully supports dark mode out of the box. All components are designed to work seamlessly in both light and dark themes. You can easily toggle between modes or let the system automatically adjust based on user preferences.",
    },
    {
      question: "Is Infinity UI accessible?",
      answer:
        "Accessibility is a core principle of Infinity UI. All components are built following WCAG guidelines and are thoroughly tested for keyboard navigation, screen reader compatibility, and proper focus management. We&apos;re committed to ensuring that interfaces built with Infinity UI are usable by everyone.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We offer comprehensive support for Infinity UI through multiple channels. Our detailed documentation covers all aspects of the library. For specific questions, our community forum is a great resource. Premium support plans are also available for enterprise customers who need dedicated assistance.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-cyan-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/30 to-indigo-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="wave-pattern"
                x="0"
                y="0"
                width="100"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10 Q 12.5 0, 25 10 Q 37.5 20, 50 10 Q 62.5 0, 75 10 Q 87.5 20, 100 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <div className="mb-4 inline-flex items-center justify-center">
                <span className="h-1 w-12 rounded-full bg-cyan-500"></span>
                <span className="mx-2 font-medium text-cyan-500">FAQ</span>
                <span className="h-1 w-12 rounded-full bg-cyan-500"></span>
              </div>

              <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Frequently Asked
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {" "}
                  Questions
                </span>
              </h2>

              <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
                Find answers to common questions about Infinity UI. If you
                can&lsquo;t find what you&lsquo;re looking for, feel free to
                reach out to our support team.
              </p>

              <div className="mb-8 rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-4 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">
                    Still have questions?
                  </h3>
                </div>

                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Our support team is here to help. Contact us anytime and
                  we&lsquo;ll get back to you as soon as possible.
                </p>

                <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800"
                >
                  <button
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-300 dark:text-gray-400 ${activeIndex === index ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordionSection;
