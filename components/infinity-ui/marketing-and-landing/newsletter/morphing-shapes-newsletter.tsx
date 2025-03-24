"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Mail, Zap } from "lucide-react";

const MorphingShapesNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentShape, setCurrentShape] = useState(0);

  // Array of SVG paths for morphing shapes
  const shapes = [
    "M100,60 C120,80 160,80 180,60 C200,40 200,0 180,-20 C160,-40 120,-40 100,-20 C80,0 80,40 100,60 Z",
    "M100,60 C150,80 170,50 180,20 C190,-10 160,-40 120,-40 C80,-40 50,-10 60,20 C70,50 50,40 100,60 Z",
    "M100,60 C140,90 180,60 180,20 C180,-20 140,-50 100,-50 C60,-50 20,-20 20,20 C20,60 60,30 100,60 Z",
    "M100,40 C140,40 160,0 160,-40 C160,-80 140,-120 100,-120 C60,-120 40,-80 40,-40 C40,0 60,40 100,40 Z",
  ];

  // Change shape every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shapes.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-orange-50 to-amber-50 py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background morphing shapes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FED7AA" />
                  <stop offset="100%" stopColor="#FCA5A5" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FED7AA" />
                  <stop offset="100%" stopColor="#FECACA" />
                </linearGradient>
              </defs>

              <motion.path
                fill="url(#gradient1)"
                initial={{ opacity: 0.3 }}
                animate={{
                  d: shapes[currentShape],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{ filter: "blur(40px)" }}
                transform="translate(0, 200) scale(2)"
              />

              <motion.path
                fill="url(#gradient2)"
                initial={{ opacity: 0.3 }}
                animate={{
                  d: shapes[(currentShape + 2) % shapes.length],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{ filter: "blur(40px)" }}
                transform="translate(400, 100) scale(1.5)"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 text-sm font-medium text-orange-600"
            >
              <Zap className="mr-2 h-4 w-4" />
              <span>Dynamic Newsletter</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-6 max-w-3xl text-4xl font-bold sm:text-5xl"
            >
              Stay updated with our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                ever-evolving
              </span>{" "}
              newsletter
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 max-w-2xl text-lg text-gray-600"
            >
              Subscribe to our newsletter and receive the latest updates,
              trends, and insights. Our content adapts and evolves just like our
              design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-full max-w-md"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative rounded-xl bg-white p-1 shadow-lg">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full rounded-lg bg-white py-4 pl-12 pr-4 text-gray-800 outline-none transition-all focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 font-medium text-white transition-all hover:shadow-lg sm:whitespace-nowrap"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 opacity-70 blur-sm"></div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl bg-white p-6 shadow-lg"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">
                      Thank you for subscribing!
                    </h4>
                    <p className="text-gray-600">
                      We&apos;ve sent a confirmation email to{" "}
                      <span className="font-medium text-gray-900">{email}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
            >
              {[
                {
                  icon: "🔄",
                  title: "Always Evolving",
                  description:
                    "Our content adapts to the latest trends and technologies in the industry.",
                },
                {
                  icon: "🎯",
                  title: "Targeted Insights",
                  description:
                    "Receive personalized content based on your interests and preferences.",
                },
                {
                  icon: "💡",
                  title: "Actionable Ideas",
                  description:
                    "Get practical tips and strategies you can implement immediately.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-orange-100 bg-white p-6 shadow-md"
                >
                  <div className="mb-4 text-3xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 max-w-2xl rounded-xl border border-orange-100 bg-white p-8 shadow-lg"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-amber-400 font-medium text-white">
                  JD
                </div>
                <div>
                  <div className="font-medium text-gray-900">Jane Doe</div>
                  <div className="text-sm text-gray-500">
                    Marketing Director
                  </div>
                </div>
                <div className="ml-auto text-amber-500">★★★★★</div>
              </div>
              <p className="italic text-gray-600">
                &quot;This newsletter has consistently delivered valuable
                insights that have directly impacted our marketing strategy. The
                content is always fresh and relevant.&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MorphingShapesNewsletter;
