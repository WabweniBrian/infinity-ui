"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Trophy,
  Brain,
  Play,
  ChevronRight,
  Sparkles,
  User2,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const EducationSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState(0);

  const courses = [
    {
      title: "AI & Machine Learning",
      students: "12,405",
      rating: 4.9,
      duration: "12 weeks",
      level: "Advanced",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypotEVPCvHmBVS7qivUbhW9O3P4QGda5nsJNFrZ",
      color: "from-violet-500 to-purple-500",
      progress: 85,
    },
    {
      title: "UX/UI Design",
      students: "8,230",
      rating: 4.8,
      duration: "8 weeks",
      level: "Intermediate",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoq5E2pR2KbZDS71U3cxl4WTLHkgpy8moCKNhM",
      color: "from-blue-500 to-cyan-500",
      progress: 92,
    },
    {
      title: "Web Development",
      students: "15,750",
      rating: 4.7,
      duration: "16 weeks",
      level: "Beginner",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAv3jsHxm4zc2AfJ7r0YvHaCFP5ERWkxZIX1g",
      color: "from-emerald-500 to-teal-500",
      progress: 78,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic content and real-time exercises",
      color: "bg-violet-500",
    },
    {
      icon: Users,
      title: "Peer Learning",
      description: "Collaborate with students worldwide",
      color: "bg-blue-500",
    },
    {
      icon: Trophy,
      title: "Certification",
      description: "Earn industry-recognized certificates",
      color: "bg-emerald-500",
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Personalized learning paths",
      color: "bg-amber-500",
    },
  ];

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % courses.length);
    }, 5000); // Change course every 5 seconds

    return () => clearInterval(interval);
  }, [courses.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute h-full w-full">
          {/* Floating shapes */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-purple-200/20 bg-[length:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] dark:bg-slate-800/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl"
              />
              <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                Future of Learning
              </span>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
                Learn from the best.
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Anywhere, anytime.
                </span>
              </h2>
              <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
                Transform your skills with our cutting-edge e-learning platform.
                Interactive courses, expert instructors, and AI-powered
                personalization.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-500/25 hover:from-violet-700 hover:to-purple-700">
                  Start Learning
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                {[
                  { number: "1M+", label: "Active Students" },
                  { number: "500+", label: "Expert Instructors" },
                  { number: "1000+", label: "Online Courses" },
                  { number: "4.9/5", label: "Student Rating" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Popular Courses
                  </h3>
                  <div className="flex gap-2">
                    {courses.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCard(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          activeCard === index
                            ? "bg-violet-600 dark:bg-violet-400"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative mb-6 overflow-hidden rounded-xl">
                      {/* Course Image */}
                      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                        <Image
                          src={courses[activeCard].image}
                          alt={courses[activeCard].title}
                          fill
                          priority
                          className="h-full w-full object-cover object-center"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40`}
                        />
                        <div
                          className={`absolute bottom-3 right-3 rounded-full bg-gradient-to-r ${courses[activeCard].color} px-3 py-1 text-sm font-medium text-white`}
                        >
                          {courses[activeCard].level}
                        </div>
                      </div>

                      <div
                        className={`bg-gradient-to-r ${courses[activeCard].color} opacity-10`}
                      ></div>
                      <div className="relative p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h4 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                              {courses[activeCard].title}
                            </h4>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Users className="mr-1 h-4 w-4" />
                              {courses[activeCard].students} students enrolled
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 grid grid-cols-3 gap-4">
                          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Duration
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {courses[activeCard].duration}
                            </div>
                          </div>
                          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Rating
                            </div>
                            <div className="flex items-center font-medium text-gray-900 dark:text-white">
                              {courses[activeCard].rating}
                              <Sparkles className="ml-1 h-4 w-4 text-amber-400" />
                            </div>
                          </div>
                          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Progress
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {courses[activeCard].progress}%
                            </div>
                          </div>
                        </div>

                        <div className="relative h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                          <motion.div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${courses[activeCard].color}`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${courses[activeCard].progress}%`,
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>

                    <button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 font-medium text-white shadow-lg shadow-violet-500/25 hover:from-violet-700 hover:to-purple-700">
                      Enroll Now
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="p-6"
                    >
                      <div
                        className={`h-12 w-12 ${feature.color} mb-4 flex items-center justify-center rounded-xl`}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                  Student Success Story
                </span>
                <blockquote className="mb-6 text-2xl font-medium text-gray-900 dark:text-white">
                  &quot;This platform transformed my career. I went from a
                  complete beginner to landing my dream job in tech within 6
                  months.&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-500">
                    <User2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Wabweni Brian
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Software Engineer at Google
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAv3jsHxm4zc2AfJ7r0YvHaCFP5ERWkxZIX1g",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="relative flex h-full items-center p-8">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-white">
                        <div className="mb-1 text-3xl font-bold">180%</div>
                        <div className="text-sm opacity-80">
                          Salary Increase
                        </div>
                      </div>
                      <div className="text-white">
                        <div className="mb-1 text-3xl font-bold">6</div>
                        <div className="text-sm opacity-80">Months to Job</div>
                      </div>
                      <div className="text-white">
                        <div className="mb-1 text-3xl font-bold">12</div>
                        <div className="text-sm opacity-80">
                          Courses Completed
                        </div>
                      </div>
                      <div className="text-white">
                        <div className="mb-1 text-3xl font-bold">4.9</div>
                        <div className="text-sm opacity-80">Course Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
