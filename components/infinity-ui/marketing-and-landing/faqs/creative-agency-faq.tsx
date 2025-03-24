"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Lightbulb,
  Clock,
  Palette,
  Zap,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Wand2,
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
    question: "What services does your agency offer?",
    answer:
      "We offer a comprehensive suite of creative services including brand strategy and identity design, website design and development, UI/UX design, digital marketing campaigns, content creation, social media management, video production, and print design. Our interdisciplinary team can handle projects of any scale, from startup branding to enterprise-level marketing campaigns.",
    icon: <Palette className="h-6 w-6" />,
  },
  {
    id: 2,
    question: "What is your creative process like?",
    answer:
      "Our creative process follows a proven methodology: 1) Discovery - We learn about your business, goals, audience, and competitors. 2) Strategy - We develop a tailored approach based on research and insights. 3) Concept - We create initial design concepts and creative directions. 4) Development - We refine and build out the approved concept. 5) Implementation - We launch and monitor performance. 6) Optimization - We continuously improve based on data and feedback.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    id: 3,
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A brand identity project typically takes 4-8 weeks, website design and development 8-12 weeks, and marketing campaigns 4-6 weeks for initial launch. During our initial consultation, we'll provide a detailed timeline specific to your project needs. We pride ourselves on meeting deadlines while maintaining the highest quality standards.",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    id: 4,
    question: "How do you price your services?",
    answer:
      "We offer both project-based and retainer pricing models. Project-based pricing is determined by scope, complexity, and timeline. Retainer arrangements are ideal for ongoing services like marketing and maintenance. We provide detailed proposals with transparent pricing before any project begins. While we're not the cheapest option, our clients find exceptional value in our strategic approach and quality of execution.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    id: 5,
    question: "Do you work with clients remotely?",
    answer:
      "Yes, we work with clients globally! Our collaborative process is designed to be effective regardless of location. We use digital tools like Figma, Slack, and Zoom to maintain clear communication and seamless collaboration. While we love face-to-face meetings when possible, our remote process delivers the same exceptional results with regular check-ins and presentations throughout the project lifecycle.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    id: 6,
    question: "What makes your agency different?",
    answer:
      "What sets us apart is our strategic approach to creativity. We don't just create beautiful designs; we develop solutions that drive business results. Our team combines deep expertise across disciplines with a collaborative process that ensures all work is purposeful and impactful. We pride ourselves on building long-term partnerships with clients, becoming an extension of their team rather than just a vendor.",
    icon: <Wand2 className="h-6 w-6" />,
  },
];

const CreativeAgencyFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="relative overflow-hidden bg-black py-24 text-white"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-purple-600/10 to-pink-600/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-blue-600/10 to-teal-600/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="relative z-10 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={
              isInView ? { scale: 1, rotate: 12 } : { scale: 0, rotate: -10 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="relative mx-auto mb-8 h-24 w-24"
          >
            <div className="absolute inset-0 rotate-12 transform rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex rotate-12 transform items-center justify-center rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600">
              <Lightbulb className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Everything you need to know about working with our creative team
          </p>
        </motion.div>

        <div className="relative z-10 grid gap-8">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur-md transition duration-300 group-hover:opacity-100" />
                <motion.div
                  className={`relative overflow-hidden rounded-2xl border border-gray-800 transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-gray-900 to-gray-800"
                      : "bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900"
                  }`}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.5)",
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
                      <motion.div
                        className={`rounded-xl p-4 ${
                          activeIndex === index
                            ? "bg-gradient-to-r from-purple-600 to-pink-600"
                            : "bg-gray-800"
                        }`}
                        animate={{
                          rotate: activeIndex === index ? 360 : 0,
                          scale: activeIndex === index ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {faq.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {activeIndex === index ? (
                        <Minus className="h-6 w-6 text-pink-500" />
                      ) : (
                        <Plus className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-2 border-t border-gray-800 px-6 pb-6 pt-4 text-gray-300">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative z-10 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="mb-6 text-gray-400">
            Have more questions? We&apos;d love to hear from you.
          </p>
          <motion.a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 font-medium text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -20px rgba(168, 85, 247, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Let&apos;s Talk About Your Project
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeAgencyFAQ;
