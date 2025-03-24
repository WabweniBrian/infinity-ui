"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HorizontalScrollNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const cards = [
    {
      title: "Industry Insights",
      description: "Get the latest trends and analysis from industry experts.",
      color: "from-blue-500 to-cyan-500",
      icon: "📊",
    },
    {
      title: "Case Studies",
      description: "Learn from real-world examples and success stories.",
      color: "from-purple-500 to-pink-500",
      icon: "🔍",
    },
    {
      title: "Expert Interviews",
      description: "Exclusive interviews with thought leaders and innovators.",
      color: "from-amber-500 to-orange-500",
      icon: "🎙️",
    },
    {
      title: "Tool Reviews",
      description: "Honest reviews of the latest tools and software.",
      color: "from-emerald-500 to-teal-500",
      icon: "🛠️",
    },
  ];

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const scrollToCard = (index: number) => {
    setActiveCard(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / cards.length;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextCard = () => {
    const newIndex = (activeCard + 1) % cards.length;
    scrollToCard(newIndex);
  };

  const prevCard = () => {
    const newIndex = (activeCard - 1 + cards.length) % cards.length;
    scrollToCard(newIndex);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-3xl font-bold sm:text-4xl"
          >
            Subscribe to our <span className="text-blue-600">newsletter</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mx-auto mb-6 h-1 w-20 rounded-full bg-blue-600"
          ></motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-gray-600"
          >
            Join our newsletter and get access to exclusive content delivered
            directly to your inbox. Scroll through the topics below to see what
            you&apos;ll receive.
          </motion.p>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <motion.div variants={itemVariants} className="relative mb-12">
          <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2">
            <button
              onClick={prevCard}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-100"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2">
            <button
              onClick={nextCard}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-100"
              aria-label="Next card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="min-w-full snap-center px-4 sm:min-w-[50%] lg:min-w-[25%]"
              >
                <div
                  className={`flex h-64 flex-col justify-between rounded-2xl bg-gradient-to-br p-6 ${card.color} transform text-white shadow-lg transition-transform ${
                    activeCard === index ? "scale-100" : "scale-95 opacity-70"
                  }`}
                >
                  <div className="text-4xl">{card.icon}</div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
                    <p className="text-white/80">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="mt-6 flex justify-center gap-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  activeCard === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Newsletter form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-xl"
        >
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <motion.div
                variants={itemVariants}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
              >
                <Mail className="h-8 w-8 text-blue-600" />
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="mb-2 text-2xl font-bold"
              >
                Get Started
              </motion.h3>

              <motion.p variants={itemVariants} className="text-gray-600">
                Subscribe to receive our weekly newsletter
              </motion.p>
            </div>

            {!isSubmitted ? (
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="John"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="horizontal-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="horizontal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Interests
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {cards.map((card, index) => (
                      <label
                        key={index}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {card.title}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-6"
              >
                <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="mb-1 font-medium text-green-800">
                    Thank you for subscribing!
                  </h4>
                  <p className="text-green-700">
                    We&apos;ve sent a confirmation email to{" "}
                    <span className="font-medium">{email}</span>. Please check
                    your inbox to complete your subscription.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center text-sm text-gray-500"
            >
              <p>
                By subscribing, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
                .
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollNewsletter;
