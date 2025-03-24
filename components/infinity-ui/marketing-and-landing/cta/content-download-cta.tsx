"use client";

import type React from "react";

import { motion, useAnimation } from "framer-motion";
import { Download, FileText, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ContentDownloadCta = () => {
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
    }
  };

  // Animation variants
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
    <div className="w-full bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Ebook Preview */}
            <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white md:p-10">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="dots"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="10" cy="10" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              <div className="relative">
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <FileText className="h-3 w-3" />
                    FREE EBOOK
                  </div>

                  <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
                    The Ultimate Guide to Sustainable Business Growth
                  </h2>

                  <p className="text-emerald-50">
                    Learn proven strategies to grow your business while
                    minimizing environmental impact and maximizing social
                    responsibility.
                  </p>
                </motion.div>

                {/* Ebook mockup */}
                <motion.div
                  variants={itemVariants}
                  className="relative mx-auto mb-6 h-[200px] w-[150px] md:h-[250px] md:w-[180px]"
                >
                  <div className="absolute inset-0 rotate-3 transform rounded-lg bg-gradient-to-br from-emerald-800 to-teal-900 shadow-lg"></div>
                  <div className="absolute inset-0 -rotate-3 transform rounded-lg bg-white shadow-lg">
                    <div className="absolute inset-1 overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=400&width=300&text=Ebook+Cover"
                        alt="Ebook cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* What you'll learn */}
                <motion.div
                  variants={itemVariants}
                  className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                >
                  <h3 className="mb-3 font-medium">What you&apos;ll learn:</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Sustainable business models that drive profit",
                      "Reducing operational costs while going green",
                      "Building an eco-conscious brand identity",
                      "Attracting environmentally aware customers",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Right Content - Download Form */}
            <div className="p-8 md:p-10">
              {!submitted ? (
                <>
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      Download Your Free Copy
                    </h3>
                    <p className="text-gray-600">
                      Fill out the form below to get instant access to our
                      comprehensive guide on sustainable business growth.
                    </p>
                  </motion.div>

                  <motion.form
                    variants={itemVariants}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Company Size
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none">
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                      </select>
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="consent"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        required
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm text-gray-600"
                      >
                        I agree to receive marketing communications. You can
                        unsubscribe at any time. View our{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                    >
                      <Download className="h-5 w-5" />
                      Download Now
                    </motion.button>
                  </motion.form>

                  <motion.div
                    variants={itemVariants}
                    className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
                  >
                    <Lock className="h-4 w-4" />
                    <span>
                      Your information is secure and will not be shared
                    </span>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <Download className="h-10 w-10 text-emerald-600" />
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Thank You!
                  </h3>
                  <p className="mb-6 max-w-md text-gray-600">
                    Your download is ready. We&apos;ve also sent a copy to your
                    email for future reference.
                  </p>

                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                  >
                    <Download className="h-5 w-5" />
                    Download Ebook
                  </motion.a>

                  <p className="mt-4 text-sm text-gray-500">
                    Having trouble?{" "}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Contact support
                    </a>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentDownloadCta;
