"use client";

import type React from "react";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

const InteractiveBackgroundNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
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
    <section className="w-full overflow-hidden bg-gray-900 py-20 text-white">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        {/* Interactive background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent 40%)`,
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative z-10 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center rounded-full border border-indigo-800 bg-indigo-900 bg-opacity-50 px-4 py-2 text-sm font-medium text-indigo-300"
          >
            <Star className="mr-2 h-4 w-4" />
            <span>Join 50,000+ subscribers</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            The newsletter for tech innovators
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-lg text-gray-300"
          >
            Get the latest tech news, in-depth analyses, and exclusive insights
            delivered to your inbox every week.
          </motion.p>

          <motion.div variants={itemVariants}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur"></div>
                  <div className="relative flex flex-col gap-3 rounded-xl bg-gray-900 p-1 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-5 py-3 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-indigo-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg sm:whitespace-nowrap"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto flex max-w-md items-start gap-3 rounded-xl border border-gray-700 bg-gray-800 p-6"
              >
                <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <div>
                  <h4 className="mb-1 font-medium text-green-300">
                    You&apos;re in!
                  </h4>
                  <p className="text-gray-300">
                    We&apos;ve sent a confirmation email to{" "}
                    <span className="font-medium text-white">{email}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {[
              {
                icon: "💡",
                title: "Tech Insights",
                description: "Latest trends and innovations",
              },
              {
                icon: "🔍",
                title: "Deep Dives",
                description: "Detailed analysis of new tech",
              },
              {
                icon: "🚀",
                title: "Startup News",
                description: "Emerging companies to watch",
              },
              {
                icon: "🔮",
                title: "Future Tech",
                description: "What's coming next in tech",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="rounded-xl border border-gray-700 bg-gray-800 bg-opacity-50 p-6 backdrop-blur-sm transition-colors hover:border-indigo-500"
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <h3 className="mb-1 font-medium text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-400" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-400" />
              <span>Unsubscribe with one click</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-pink-400" />
              <span>Data privacy guaranteed</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-indigo-500 opacity-20"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                x: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                ],
                y: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                ],
                opacity: [
                  Math.random() * 0.5 + 0.1,
                  Math.random() * 0.5 + 0.3,
                  Math.random() * 0.5 + 0.1,
                ],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveBackgroundNewsletter;
