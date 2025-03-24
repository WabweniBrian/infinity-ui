"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle, Mail, Snowflake, Gift } from "lucide-react";

const SeasonalNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  // Snowflake animation
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    left: Math.random() * 100,
    animationDuration: Math.random() * 15 + 10,
    animationDelay: Math.random() * 5,
  }));

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 py-20">
      {/* Animated snowflakes */}
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="pointer-events-none absolute text-white opacity-70"
          style={{
            left: `${flake.left}%`,
            top: -20,
            fontSize: flake.size,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: ["-5px", "5px", "-5px"],
          }}
          transition={{
            y: {
              duration: flake.animationDuration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: flake.animationDelay,
            },
            x: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: flake.animationDelay,
            },
          }}
        >
          ❄
        </motion.div>
      ))}

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-700 bg-blue-800 bg-opacity-50 px-4 py-2 text-sm font-medium text-blue-200">
              <Snowflake className="mr-2 h-4 w-4" />
              <span>Winter Special</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
              Get our <span className="text-blue-300">winter</span> newsletter
              for exclusive holiday deals
            </h2>

            <p className="mb-8 max-w-xl text-lg text-blue-200">
              Subscribe to our seasonal newsletter and receive special holiday
              offers, winter tips, and festive content straight to your inbox.
            </p>

            <div className="mb-8 space-y-6">
              {[
                {
                  icon: <Gift className="h-5 w-5 text-blue-300" />,
                  title: "Exclusive Holiday Deals",
                  description:
                    "Get access to special offers and discounts only available to subscribers.",
                },
                {
                  icon: <Snowflake className="h-5 w-5 text-blue-300" />,
                  title: "Winter Preparation Tips",
                  description:
                    "Learn how to prepare for the winter season with our expert advice.",
                },
                {
                  icon: <Mail className="h-5 w-5 text-blue-300" />,
                  title: "Festive Content",
                  description:
                    "Enjoy our curated collection of winter-themed content and inspiration.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-blue-700 bg-blue-800 bg-opacity-50">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-blue-200">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Countdown */}
            <div className="inline-block rounded-xl border border-blue-700 bg-blue-800 bg-opacity-50 p-4">
              <div className="mb-2 text-sm text-blue-200">
                Limited time offer ends in:
              </div>
              <div className="flex gap-3">
                {[
                  { value: "07", label: "Days" },
                  { value: "18", label: "Hours" },
                  { value: "54", label: "Minutes" },
                ].map((unit, index) => (
                  <div key={index} className="text-center">
                    <div className="rounded-md bg-blue-900 px-3 py-2 text-xl font-bold text-white">
                      {unit.value}
                    </div>
                    <div className="mt-1 text-xs text-blue-300">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-10 -top-10 h-20 w-20 text-5xl text-white">
                ❄
              </div>
              <div className="absolute -bottom-10 -right-10 h-20 w-20 text-5xl text-white">
                ❄
              </div>

              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white border-opacity-20 bg-white bg-opacity-10 p-8 backdrop-blur-lg">
                {/* Frosted glass effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-200 opacity-10"></div>

                <div className="relative">
                  <div className="mb-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 bg-opacity-20"
                    >
                      <Mail className="h-8 w-8 text-blue-200" />
                    </motion.div>

                    <h3 className="mb-2 text-2xl font-bold text-white">
                      Winter Newsletter
                    </h3>
                    <p className="text-blue-200">
                      Subscribe now for seasonal updates
                    </p>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-blue-100"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-white border-opacity-20 bg-white bg-opacity-10 px-4 py-3 text-white outline-none transition-colors placeholder:text-blue-200 placeholder:opacity-60 focus:border-blue-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="winter-email"
                          className="block text-sm font-medium text-blue-100"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Mail className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="winter-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-xl border border-white border-opacity-20 bg-white bg-opacity-10 py-3 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-blue-200 placeholder:opacity-60 focus:border-blue-300"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex cursor-pointer items-start gap-2">
                          <div className="flex h-5 items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <span className="text-sm text-blue-200">
                            I&apos;d like to receive special offers and holiday
                            promotions
                          </span>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3 font-medium text-white transition-all hover:shadow-lg"
                      >
                        <span>Subscribe to Winter Updates</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-blue-700 bg-blue-900 bg-opacity-50 p-6"
                    >
                      <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-300" />
                      <div>
                        <h4 className="mb-1 font-medium text-blue-200">
                          You&apos;re all set for winter!
                        </h4>
                        <p className="text-blue-100">
                          We&apos;ve sent a confirmation email to{" "}
                          <span className="font-medium text-white">
                            {email}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-6 text-center text-sm">
                    <p className="text-blue-200">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalNewsletter;
