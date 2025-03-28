"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Code,
  Lightbulb,
  Rocket,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ElearningHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState(0);

  // Categories data
  const categories = [
    { name: "Development", icon: Code, color: "bg-purple-500" },
    { name: "Business", icon: Rocket, color: "bg-blue-500" },
    { name: "Design", icon: Lightbulb, color: "bg-pink-500" },
    { name: "Marketing", icon: Users, color: "bg-orange-500" },
  ];

  // Featured courses data
  const courses = [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Wabweni Brian",
      level: "Beginner to Advanced",
      duration: "48 hours",
      rating: 4.9,
      students: "12,435",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoSkCWcMIpWuHbOGwMP7IRgdXDqlLtyn3cYBz6",
    },
    {
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      level: "Intermediate",
      duration: "36 hours",
      rating: 4.8,
      students: "8,721",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypowjzSEwUuGsmZFnW0VycwkvQUeR4Mg7aL5o1x",
    },
  ];

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Auto-rotate categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [categories.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-20"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-indigo-100 opacity-50 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-40 right-0 h-[300px] w-[300px] rounded-full bg-purple-100 opacity-50 blur-3xl"
        />

        {/* Floating shapes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-[15%] top-[20%]"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "easeInOut",
            }}
            className="h-12 w-12 rounded-lg bg-indigo-200 opacity-60"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute right-[20%] top-[15%]"
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 7,
              ease: "easeInOut",
              delay: 1,
            }}
            className="h-8 w-8 rounded-full bg-purple-200 opacity-60"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-[25%] left-[25%]"
        >
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
              delay: 2,
            }}
            className="h-10 w-10 rounded-md bg-blue-200 opacity-60"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
              Transform Your Skills Today
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Learn without{" "}
              <span className="relative text-indigo-600">
                limits
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-indigo-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Unlock your potential with expert-led courses in development,
              business, design, and more. Join millions of learners already
              achieving their goals.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={itemVariants}
              className="mb-8 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex items-center">
                <div className="flex flex-1 items-center px-4 py-3">
                  <input
                    type="text"
                    placeholder="What do you want to learn today?"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="px-1">
                  <button className="rounded-full bg-indigo-600 px-6 py-2 font-medium text-white transition-all hover:bg-indigo-700">
                    Search
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Popular Categories
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === index
                        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-indigo-100 hover:bg-indigo-50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <category.icon
                      className={`h-4 w-4 ${activeCategory === index ? "text-indigo-600" : "text-gray-500"}`}
                    />
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <BookOpen className="h-4 w-4" />
                Browse Courses
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                <span>
                  <strong className="font-bold text-gray-900">5M+</strong>{" "}
                  Learners
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                <span>
                  <strong className="font-bold text-gray-900">10K+</strong>{" "}
                  Courses
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-indigo-500" />
                <span>
                  <strong className="font-bold text-gray-900">4.8</strong>{" "}
                  Average Rating
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Course Cards */}
          <div className="relative">
            {/* Animated notebook/device frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Device frame */}
              <div className="rounded-2xl bg-gray-800 p-4 shadow-xl">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-2 w-24 rounded-full bg-gray-700"></div>
                </div>

                {/* Screen content */}
                <div className="overflow-hidden rounded-lg bg-white p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                      My Learning
                    </div>
                    <div className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                      2 In Progress
                    </div>
                  </div>

                  {/* Course cards */}
                  <div className="space-y-4">
                    {courses.map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                        className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                      >
                        <div className="relative h-32 w-full overflow-hidden">
                          <Image
                            src={
                              course.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-900">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </div>
                          </div>
                        </div>

                        <div className="p-3">
                          <h3 className="mb-1 text-sm font-bold text-gray-900">
                            {course.title}
                          </h3>
                          <p className="mb-2 text-xs text-gray-600">
                            by {course.instructor}
                          </p>

                          <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
                            <motion.div
                              className="h-full rounded-full bg-indigo-600"
                              initial={{ width: 0 }}
                              animate={{ width: index === 0 ? "65%" : "40%" }}
                              transition={{
                                delay: 1.2 + index * 0.2,
                                duration: 0.8,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-3 w-3 fill-amber-500" />
                              {course.rating}
                            </div>
                            <div className="text-gray-600">
                              {index === 0 ? "65%" : "40%"} complete
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Continue button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700"
                  >
                    Continue Learning
                  </motion.button>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 -top-10 rounded-lg bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Rocket className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      New Achievement!
                    </div>
                    <div className="text-gray-600">7-day streak</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -bottom-8 -right-10 rounded-lg bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      Learning Community
                    </div>
                    <div className="text-gray-600">Join discussion</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElearningHero;
