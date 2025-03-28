"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Clock,
  Calendar,
  CheckCircle,
  Play,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const EducationPlatformSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCourse, setActiveCourse] = useState(0);

  const courses = [
    {
      title: "Web Development Bootcamp",
      description:
        "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp.",
      instructor: "Dr. Wabweni Brian",
      students: 12845,
      duration: "12 weeks",
      level: "Beginner to Advanced",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoJvInHDb1LpRdOliukBZ9PyAEtqcV2GD7hTCH",
      color: "from-blue-500 to-indigo-500",
      modules: [
        "HTML & CSS Fundamentals",
        "JavaScript Programming",
        "Frontend Frameworks",
        "Backend Development",
        "Database Integration",
        "Deployment & DevOps",
      ],
    },
    {
      title: "Data Science Essentials",
      description:
        "Learn to analyze and visualize data, build predictive models, and extract meaningful insights using Python and popular data science libraries.",
      instructor: "Prof. Michael Chen",
      students: 9876,
      duration: "10 weeks",
      level: "Intermediate",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo610N4HzvhV0osXNSKE3eCpjGD9ukzWbgBlRm",
      color: "from-emerald-500 to-teal-500",
      modules: [
        "Python for Data Analysis",
        "Data Visualization",
        "Statistical Analysis",
        "Machine Learning Basics",
        "Deep Learning Introduction",
        "Real-world Projects",
      ],
    },
    {
      title: "Digital Marketing Masterclass",
      description:
        "Develop comprehensive digital marketing skills including SEO, social media, content marketing, email campaigns, and analytics.",
      instructor: "Emma Rodriguez",
      students: 15432,
      duration: "8 weeks",
      level: "All Levels",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypotW3bFXHmBVS7qivUbhW9O3P4QGda5nsJNFrZ",
      color: "from-rose-500 to-pink-500",
      modules: [
        "Marketing Strategy",
        "SEO & Content Marketing",
        "Social Media Marketing",
        "Email Marketing",
        "Paid Advertising",
        "Analytics & Optimization",
      ],
    },
  ];

  const categories = [
    {
      name: "Programming",
      icon: "💻",
      count: 45,
    },
    {
      name: "Business",
      icon: "📊",
      count: 38,
    },
    {
      name: "Design",
      icon: "🎨",
      count: 32,
    },
    {
      name: "Marketing",
      icon: "📱",
      count: 29,
    },
  ];

  const features = [
    {
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of real-world experience.",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Flexible Learning",
      description:
        "Study at your own pace with lifetime access to course materials.",
      icon: Clock,
      color: "bg-emerald-500",
    },
    {
      title: "Verified Certificates",
      description: "Earn recognized certificates to showcase your new skills.",
      icon: Award,
      color: "bg-amber-500",
    },
    {
      title: "Interactive Projects",
      description:
        "Apply your knowledge with hands-on projects and assignments.",
      icon: BookOpen,
      color: "bg-rose-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white dark:from-indigo-950/30 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="education-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,20 L40,20 M20,0 L20,40"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#education-pattern)" />
          </svg>
        </div>

        {/* Floating Elements - Education Icons */}
        {["📚", "🎓", "✏️", "🔬", "🧮", "🌐"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-indigo-500"></span>
            <span className="mx-2 font-medium text-indigo-500">
              EXPAND YOUR KNOWLEDGE
            </span>
            <span className="h-1 w-12 rounded-full bg-indigo-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Unlock your potential with
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              online learning
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Discover thousands of courses taught by expert instructors to help
            you master new skills and advance your career.
          </p>
        </motion.div>

        {/* Course Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {categories.map((category, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative rounded-xl border border-gray-200/50 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-3 text-4xl">{category.icon}</div>
                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  {category.count} courses
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured Courses */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Courses
            </h3>
            <button className="inline-flex items-center font-medium text-indigo-600 dark:text-indigo-400">
              Browse All Courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative cursor-pointer overflow-hidden rounded-xl ${activeCourse === index ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900" : ""}`}
                onClick={() => setActiveCourse(index)}
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <Image
                    src={
                      course.image ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={course.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white">{course.title}</h4>
                    <div className="flex items-center text-sm text-white/90">
                      <Users className="mr-1 h-3 w-3" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200/50 bg-white p-4 dark:border-gray-700/50 dark:bg-gray-800">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {course.level}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {course.duration}
                    </div>
                  </div>
                  <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                    {course.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Course Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCourse}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${courses[activeCourse].color} rounded-3xl opacity-20 blur-xl`}
              ></div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-6 lg:p-8">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {courses[activeCourse].title}
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      {courses[activeCourse].description}
                    </p>

                    <div className="mb-6 flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                        <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {courses[activeCourse].instructor}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Lead Instructor
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                        <Calendar className="mr-3 h-5 w-5 text-indigo-500" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Duration
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {courses[activeCourse].duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                        <Award className="mr-3 h-5 w-5 text-indigo-500" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Certificate
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            Included
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Course Modules:
                      </div>
                      <div className="space-y-2">
                        {courses[activeCourse].modules.map(
                          (module, moduleIndex) => (
                            <div
                              key={moduleIndex}
                              className="flex items-center text-gray-600 dark:text-gray-300"
                            >
                              <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-indigo-500" />
                              <span>{module}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-indigo-600 hover:to-blue-600 hover:shadow-lg">
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                        <Play className="mr-2 h-4 w-4" />
                        Watch Preview
                      </button>
                    </div>
                  </div>

                  <div className="relative h-64 lg:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-500"></div>
                    <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=600')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>

                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                        <div className="mb-4 flex items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-bold text-white">
                              What You&apos;ll Learn
                            </h4>
                            <p className="text-sm text-white/80">
                              Key skills & outcomes
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center">
                              <div className="mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                              </div>
                              <span className="text-white/90">
                                {activeCourse === 0
                                  ? [
                                      "Build responsive websites",
                                      "Master JavaScript",
                                      "Create full-stack applications",
                                    ][item - 1]
                                  : activeCourse === 1
                                    ? [
                                        "Analyze complex datasets",
                                        "Build predictive models",
                                        "Visualize data insights",
                                      ][item - 1]
                                    : [
                                        "Create marketing strategies",
                                        "Optimize conversion rates",
                                        "Measure campaign success",
                                      ][item - 1]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative rounded-xl border border-gray-200/50 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800">
                <div
                  className={`h-12 w-12 rounded-xl ${feature.color} mb-4 flex items-center justify-center`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative text-center"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-xl"></div>
          <div className="relative rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800 md:p-12">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Ready to start learning?
            </h3>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Join over 100,000 students already learning with us. Get started
              today with a free 7-day trial.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-indigo-600 hover:to-blue-600 hover:shadow-xl hover:shadow-indigo-500/25">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-8 py-4 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                View All Courses
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationPlatformSection;
