"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plus,
  Minus,
  Truck,
  RotateCcw,
  CreditCard,
  Package,
  ShoppingBag,
  Gift,
} from "lucide-react";

type FAQCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  questions: {
    id: number;
    question: string;
    answer: string;
  }[];
};

const faqCategories: FAQCategory[] = [
  {
    id: "shipping",
    name: "Shipping & Delivery",
    icon: <Truck className="h-5 w-5" />,
    questions: [
      {
        id: 1,
        question: "How long will it take to receive my order?",
        answer:
          "Standard shipping takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping typically takes 7-14 business days depending on the destination country.",
      },
      {
        id: 2,
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by location. You can view the estimated delivery time at checkout before completing your purchase.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    icon: <RotateCcw className="h-5 w-5" />,
    questions: [
      {
        id: 3,
        question: "What is your return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you&apos;re not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in their original packaging with all tags attached.",
      },
      {
        id: 4,
        question: "How do I initiate a return?",
        answer:
          "To initiate a return, log into your account, go to your order history, and select the 'Return Item' option next to the relevant product. You&apos;ll receive a prepaid shipping label via email. Alternatively, you can contact our customer service team for assistance.",
      },
    ],
  },
  {
    id: "payment",
    name: "Payment Options",
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        id: 5,
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For orders over $1,000, we also offer financing options through Affirm.",
      },
      {
        id: 6,
        question: "Is it safe to use my credit card on your website?",
        answer:
          "Absolutely. Our website uses industry-standard SSL encryption to protect your personal information. We are PCI DSS compliant and never store your full credit card details on our servers.",
      },
    ],
  },
  {
    id: "products",
    name: "Product Information",
    icon: <Package className="h-5 w-5" />,
    questions: [
      {
        id: 7,
        question: "Are your products true to size?",
        answer:
          "Yes, our products are designed to be true to standard US sizing. We provide detailed size guides for each product category. If you&apos;re between sizes, we generally recommend sizing up for a more comfortable fit.",
      },
      {
        id: 8,
        question: "How do I care for my products?",
        answer:
          "Care instructions vary by product material. Each item comes with specific care instructions on the product label and product page. Generally, we recommend gentle washing with similar colors and air drying to maintain product quality and longevity.",
      },
    ],
  },
];

const EcommerceFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("shipping");
  const [activeQuestions, setActiveQuestions] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleQuestion = (id: number) => {
    setActiveQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-rose-100 to-rose-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-rose-100 to-rose-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[10%] top-40 text-rose-300"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          <ShoppingBag size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[15%] text-rose-300"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <Gift size={50} />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500">
              <ShoppingBag className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about our products, shipping,
            returns, and more
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-12">
          <motion.div
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-2">
              {faqCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200"
                      : "text-gray-700 hover:bg-rose-50"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`rounded-lg p-3 ${activeCategory === category.id ? "bg-white/20" : "bg-rose-100"}`}
                  >
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 lg:col-span-9"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {faqCategories
                  .find((cat) => cat.id === activeCategory)
                  ?.questions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                        <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm">
                          <button
                            onClick={() => toggleQuestion(item.id)}
                            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-rose-50/50"
                            aria-expanded={activeQuestions.includes(item.id)}
                          >
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.question}
                            </h3>
                            <div className="ml-4 flex-shrink-0">
                              <div
                                className={`rounded-full p-2 transition-colors ${
                                  activeQuestions.includes(item.id)
                                    ? "bg-rose-500 text-white"
                                    : "bg-rose-100 text-rose-500"
                                }`}
                              >
                                {activeQuestions.includes(item.id) ? (
                                  <Minus className="h-4 w-4" />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {activeQuestions.includes(item.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="border-t border-rose-100 p-5 pt-2 text-gray-600">
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-100 to-pink-100 p-8 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <h4 className="mb-2 text-xl font-semibold text-gray-900">
                  Can&apos;t find what you&apos;re looking for?
                </h4>
                <p className="text-gray-600">
                  Our customer support team is here to help
                </p>
              </div>
              <motion.a
                href="#"
                className="whitespace-nowrap rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4 font-medium text-white shadow-lg shadow-rose-200/50 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(244, 63, 94, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Support
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EcommerceFAQ;
