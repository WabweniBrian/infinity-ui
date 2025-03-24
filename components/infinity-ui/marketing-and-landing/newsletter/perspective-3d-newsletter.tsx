"use client";

import type React from "react";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Star,
  Users,
  Sparkles,
} from "lucide-react";

const Perspective3DNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

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
    <section className="w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* 3D perspective container */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="perspective-[1000px] h-[500px] w-full max-w-4xl">
              {/* 3D grid background */}
              <motion.div
                initial={{ rotateX: 45, rotateZ: 0 }}
                animate={{ rotateX: 45, rotateZ: 5 }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="transform-style-3d h-full w-full origin-center"
                style={{
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotateX(45deg)",
                }}
              >
                <div className="absolute inset-0 left-[-50%] top-[-50%] h-[200%] w-[200%]">
                  {/* Grid lines */}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                      style={{ top: `${i * 5}%` }}
                    />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                      style={{ left: `${i * 5}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center rounded-full border border-blue-800/50 bg-blue-900/50 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Future-ready Newsletter</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mb-6 max-w-3xl bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
            >
              Step into the future with our weekly insights
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-2xl text-lg text-slate-300"
            >
              Join our forward-thinking community and receive cutting-edge
              insights, trends, and exclusive content delivered straight to your
              inbox.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full max-w-md">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="absolute inset-0 -rotate-1 transform rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-70 blur"></div>
                  <div className="relative rounded-xl border border-slate-700 bg-slate-800/80 p-1 backdrop-blur-sm">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-4 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-blue-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-6 py-4 font-medium text-white transition-all hover:shadow-lg sm:whitespace-nowrap"
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
                  className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/80 p-6 backdrop-blur-sm"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-teal-400" />
                  <div>
                    <h4 className="mb-1 font-medium text-teal-300">
                      You&apos;re all set!
                    </h4>
                    <p className="text-slate-300">
                      We&apos;ve sent a confirmation email to{" "}
                      <span className="font-medium text-white">{email}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16"
            >
              {[
                {
                  icon: <Users className="h-5 w-5 text-blue-400" />,
                  value: "50,000+",
                  label: "Subscribers",
                },
                {
                  icon: <Star className="h-5 w-5 text-cyan-400" />,
                  value: "4.9/5",
                  label: "Average Rating",
                },
                {
                  icon: <Sparkles className="h-5 w-5 text-teal-400" />,
                  value: "Weekly",
                  label: "Updates",
                },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-1 flex items-center gap-2">
                    {stat.icon}
                    <span className="text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-sm text-slate-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              variants={itemVariants}
              className="mt-12 max-w-lg rotate-1 transform rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500 font-medium text-white">
                  TJ
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">Thomas Jensen</div>
                  <div className="text-sm text-slate-400">CTO, FutureTech</div>
                </div>
              </div>
              <p className="italic text-slate-300">
                &quot;This newsletter consistently delivers the most
                forward-thinking insights in the industry. It&apos;s become an
                essential part of my weekly reading.&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Perspective3DNewsletter;
