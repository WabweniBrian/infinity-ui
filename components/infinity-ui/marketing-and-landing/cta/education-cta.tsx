"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Play,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EducationCta = () => {
  const controls = useAnimation();
  const [activeModule, setActiveModule] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Course modules
  const modules = [
    {
      title: "Introduction to Web Development",
      lessons: 8,
      duration: "2 hours",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript.",
    },
    {
      title: "Responsive Design Principles",
      lessons: 6,
      duration: "1.5 hours",
      description: "Master mobile-first design and media queries.",
    },
    {
      title: "JavaScript Frameworks",
      lessons: 10,
      duration: "3 hours",
      description: "Explore React, Vue, and Angular fundamentals.",
    },
    {
      title: "Backend Development",
      lessons: 9,
      duration: "2.5 hours",
      description: "Build APIs with Node.js and Express.",
    },
  ];

  // Course stats
  const stats = [
    { value: "4.9", label: "Course Rating" },
    { value: "12,500+", label: "Students" },
    { value: "42", label: "Video Lessons" },
    { value: "Lifetime", label: "Access" },
  ];

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

  // Count-up animation for stats
  const countUpAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Course Info */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-block w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800"
              >
                BESTSELLING COURSE
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-3xl font-bold text-gray-900"
              >
                Complete Web Development Bootcamp 2023
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Master full-stack web development from scratch. This
                comprehensive course covers everything you need to build modern,
                responsive websites and web applications.
              </motion.p>

              {/* Instructor info */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-center gap-4"
              >
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypomfLdI2Mcq2hSYiK0RjVdusB8bOIWnCQy9fpv"
                    alt="Instructor"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Dr. Wabweni Brian
                  </div>
                  <div className="text-sm text-gray-500">
                    Senior Developer & Educator
                  </div>
                </div>
              </motion.div>

              {/* Course stats */}
              <motion.div
                variants={itemVariants}
                className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.div
                      variants={countUpAnimation}
                      className="text-xl font-bold text-indigo-600"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Course highlights */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-3 text-sm font-medium text-gray-700">
                  What you&apos;ll learn:
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    "HTML5, CSS3 & JavaScript",
                    "Responsive Design",
                    "React & Redux",
                    "Node.js & Express",
                    "MongoDB & Databases",
                    "Authentication & Security",
                    "Deployment Strategies",
                    "API Development",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course modules */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="mb-3 text-sm font-medium text-gray-700">
                  Course Curriculum:
                </div>
                <div className="space-y-3">
                  {modules.map((module, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${
                        activeModule === index
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-gray-200 bg-white hover:border-indigo-100"
                      }`}
                      onClick={() => setActiveModule(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">
                          {module.title}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <BookOpen className="h-3 w-3 shrink-0" />
                            {module.lessons} lessons
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3 shrink-0" />
                            {module.duration}
                          </div>
                        </div>
                      </div>
                      {activeModule === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 text-sm text-gray-600"
                        >
                          {module.description}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
                >
                  Enroll Now - $49.99
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <Play className="h-3 w-3 fill-indigo-600" />

                    {/* Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-indigo-200"
                      animate={
                        isHovering
                          ? {
                              scale: [1, 1.5],
                              opacity: [1, 0],
                            }
                          : {}
                      }
                      transition={{
                        repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                        duration: 1.5,
                      }}
                    />
                  </div>
                  Watch Preview
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Course Preview */}
            <div className="relative bg-indigo-900 p-8 text-white md:p-12">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative">
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-2 text-lg font-bold">
                    Limited Time Offer
                  </div>
                  <div className="flex items-center gap-2 text-3xl font-bold">
                    <span className="text-indigo-300 line-through">
                      $199.99
                    </span>
                    <span>$49.99</span>
                    <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-indigo-900">
                      75% OFF
                    </span>
                  </div>
                </motion.div>

                {/* Course features */}
                <motion.div variants={itemVariants} className="mb-8 space-y-3">
                  {[
                    {
                      icon: Calendar,
                      text: "Start anytime - learn at your own pace",
                    },
                    {
                      icon: Users,
                      text: "Join a community of 12,500+ students",
                    },
                    { icon: Award, text: "Earn a certificate upon completion" },
                    {
                      icon: Clock,
                      text: "42 hours of video content + exercises",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-800 text-indigo-300">
                        <feature.icon className="h-4 w-4" />
                      </div>
                      <span className="text-indigo-100">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Testimonials */}
                <motion.div variants={itemVariants} className="mb-8 space-y-4">
                  <div className="text-lg font-bold">What Our Students Say</div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-indigo-800 p-4"
                  >
                    <div className="mb-3 text-sm italic text-indigo-100">
                      &quot;This course completely changed my career path. I
                      went from knowing nothing about web development to landing
                      a junior developer role in just 3 months!&quot;
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoBr65FLq9k2zJh4F5OKicHTlarv3YGQjpDZbw"
                          alt="Student"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Michael Johnson</div>
                        <div className="flex items-center gap-1 text-xs text-indigo-300">
                          {[1, 2, 3, 4, 5].map((_, i) => (
                            <svg
                              key={i}
                              className="h-3 w-3 fill-yellow-400"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-indigo-800 p-4"
                  >
                    <div className="mb-3 text-sm italic text-indigo-100">
                      &quot;The instructor explains complex concepts in a way
                      that&apos;s easy to understand. The projects are practical
                      and helped me build a strong portfolio.&quot;
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoHRKBF64LPQRizs519hDeHlYBAUcyNFxWk2M6"
                          alt="Student"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Sarah Williams</div>
                        <div className="flex items-center gap-1 text-xs text-indigo-300">
                          {[1, 2, 3, 4, 5].map((_, i) => (
                            <svg
                              key={i}
                              className="h-3 w-3 fill-yellow-400"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Money-back guarantee */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 rounded-lg border border-indigo-700 bg-indigo-800/50 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-700 text-white">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">
                      30-Day Money-Back Guarantee
                    </div>
                    <div className="text-sm text-indigo-300">
                      Not satisfied? Get a full refund within 30 days.
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationCta;
