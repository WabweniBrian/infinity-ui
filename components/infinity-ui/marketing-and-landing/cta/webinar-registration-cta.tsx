"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const WebinarRegistrationCta = () => {
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

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
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                <Calendar className="h-3 w-3" />
                FREE WEBINAR
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                How to Scale Your Business Using AI in 2023
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Join our expert panel as they share actionable strategies to
                leverage AI for business growth, automation, and competitive
                advantage.
              </motion.p>

              {/* Webinar details */}
              <motion.div variants={itemVariants} className="mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Thursday, September 28, 2023
                    </div>
                    <div className="text-sm text-gray-500">
                      Save the date in your calendar
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      11:00 AM - 12:30 PM EST
                    </div>
                    <div className="text-sm text-gray-500">
                      90 minutes with Q&A session
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      1,500+ Registered
                    </div>
                    <div className="text-sm text-gray-500">
                      Limited spots available
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Registration form */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
                >
                  Reserve My Spot
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Speakers */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white md:p-10">
              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="mb-4 text-xl font-bold">Meet Our Speakers</h3>

                <div className="space-y-6">
                  {[
                    {
                      name: "Dr. Wabweni Brian",
                      role: "AI Research Director, TechCorp",
                      image:
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypomfLdI2Mcq2hSYiK0RjVdusB8bOIWnCQy9fpv",
                    },
                    {
                      name: "Dr. Sarah Johnson",
                      role: "Founder & CEO, AI Ventures",
                      image:
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxC0nRZtFC1a2S06AJNu9MsdPXG8D5oerTblR",
                    },
                    {
                      name: "Jessica Williams",
                      role: "Head of Innovation, Future Labs",
                      image:
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoPGeGY9LRmqDpgTYnlJ0VQxFuAyXbhka81jzw",
                    },
                  ].map((speaker, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white/30">
                        <Image
                          src={speaker.image || "/images/default-avatar.png"}
                          alt={speaker.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{speaker.name}</div>
                        <div className="text-sm text-blue-100">
                          {speaker.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
              >
                <h4 className="mb-2 font-medium">What You&apos;ll Learn:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-1 h-4 w-4 flex-shrink-0 text-blue-200"
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
                    <span className="text-blue-200">
                      Practical AI implementation strategies for businesses of
                      all sizes
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-200">
                    <svg
                      className="mt-1 h-4 w-4 flex-shrink-0 text-blue-200"
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
                    <span>
                      Cost-effective tools and resources to get started with AI
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-200">
                    <svg
                      className="mt-1 h-4 w-4 flex-shrink-0 text-blue-200"
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
                    <span>Real-world case studies and success stories</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebinarRegistrationCta;
