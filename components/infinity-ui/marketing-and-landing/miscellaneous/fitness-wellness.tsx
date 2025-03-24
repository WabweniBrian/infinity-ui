"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Heart,
  Clock,
  Calendar,
  Dumbbell,
  Flame,
  Utensils,
  Star,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FitnessWellnessSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Fitness Programs", icon: Dumbbell },
    { name: "Nutrition Plans", icon: Utensils },
    { name: "Wellness Coaching", icon: Heart },
  ];

  const fitnessPrograms = [
    {
      title: "High-Intensity Interval Training",
      description:
        "Burn maximum calories in minimum time with our expert-led HIIT workouts designed for all fitness levels.",
      duration: "30 min",
      difficulty: "Intermediate",
      calories: "400-500",
      image: "/placeholder.svg?height=300&width=300",
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "Strength & Conditioning",
      description:
        "Build lean muscle and improve overall strength with our comprehensive weight training program.",
      duration: "45 min",
      difficulty: "All Levels",
      calories: "300-400",
      image: "/placeholder.svg?height=300&width=300",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Yoga Flow",
      description:
        "Improve flexibility, balance, and mental clarity with our mindful yoga sessions led by certified instructors.",
      duration: "60 min",
      difficulty: "Beginner",
      calories: "200-300",
      image: "/placeholder.svg?height=300&width=300",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const nutritionPlans = [
    {
      title: "Clean Eating Essentials",
      description:
        "A balanced nutrition plan focused on whole foods, lean proteins, and complex carbohydrates to fuel your body optimally.",
      features: ["Personalized Macros", "Grocery Lists", "Meal Prep Guides"],
      image: "/placeholder.svg?height=300&width=300",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Plant-Based Power",
      description:
        "A complete plant-based nutrition plan designed to provide all essential nutrients while supporting your fitness goals.",
      features: [
        "Vegan Protein Sources",
        "Nutrient Timing",
        "Supplement Guidance",
      ],
      image: "/placeholder.svg?height=300&width=300",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Performance Nutrition",
      description:
        "Advanced nutrition strategies for athletes and fitness enthusiasts looking to optimize performance and recovery.",
      features: [
        "Pre/Post Workout Nutrition",
        "Hydration Protocols",
        "Competition Prep",
      ],
      image: "/placeholder.svg?height=300&width=300",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const wellnessCoaching = [
    {
      title: "Stress Management",
      description:
        "Learn effective techniques to manage stress, improve sleep quality, and enhance overall wellbeing.",
      benefits: ["Reduced Anxiety", "Better Sleep", "Improved Focus"],
      image: "/placeholder.svg?height=300&width=300",
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Mindfulness Practice",
      description:
        "Develop a consistent mindfulness practice to increase self-awareness and emotional regulation.",
      benefits: [
        "Present Moment Awareness",
        "Emotional Balance",
        "Reduced Reactivity",
      ],
      image: "/placeholder.svg?height=300&width=300",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Holistic Wellness",
      description:
        "A comprehensive approach to wellness addressing physical, mental, and emotional aspects of health.",
      benefits: ["Work-Life Balance", "Sustainable Habits", "Personal Growth"],
      image: "/placeholder.svg?height=300&width=300",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const tabContent = [fitnessPrograms, nutritionPlans, wellnessCoaching];

  const stats = [
    { value: "500+", label: "Weekly Classes" },
    { value: "50+", label: "Expert Trainers" },
    { value: "10k+", label: "Active Members" },
    { value: "95%", label: "Success Rate" },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-50 via-white to-white dark:from-rose-950/30 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="fitness-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20,0 C8.954,0 0,8.954 0,20 C0,31.046 8.954,40 20,40 C31.046,40 40,31.046 40,20 C40,8.954 31.046,0 20,0 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fitness-pattern)" />
          </svg>
        </div>

        {/* Floating Elements - Fitness Icons */}
        {["💪", "🧘‍♀️", "🏃‍♂️", "🥗", "🧠", "❤️"].map((icon, i) => (
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
            <span className="h-1 w-12 rounded-full bg-rose-500"></span>
            <span className="mx-2 font-medium text-rose-500">
              TRANSFORM YOUR LIFE
            </span>
            <span className="h-1 w-12 rounded-full bg-rose-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Your journey to a
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              {" "}
              healthier you
            </span>
            <span> starts here</span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Comprehensive fitness and wellness solutions tailored to your unique
            goals and lifestyle. Expert guidance every step of the way.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative rounded-xl border border-gray-200/50 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-2 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`flex items-center rounded-lg px-6 py-3 ${
                    activeTab === index
                      ? "bg-white text-rose-600 shadow-md dark:bg-gray-700 dark:text-rose-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  <span className="text-sm sm:text-base">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {tabContent[activeTab].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="group relative"
                  >
                    <div
                      className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-2xl opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
                    ></div>
                    <div className="relative overflow-hidden rounded-xl border border-gray-200/50 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800">
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image || "/default-image.jpg"}
                          alt={item.title}
                          fill
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-xl font-bold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>

                        {activeTab === 0 && (
                          <div className="mb-4 grid grid-cols-3 gap-2">
                            <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700/50">
                              <Clock className="mx-auto mb-1 h-5 w-5 text-rose-500" />
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Duration
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {"duration" in item ? item.duration : "N/A"}
                              </div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700/50">
                              <Activity className="mx-auto mb-1 h-5 w-5 text-rose-500" />
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Difficulty
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {"difficulty" in item ? item.difficulty : "N/A"}
                              </div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700/50">
                              <Flame className="mx-auto mb-1 h-5 w-5 text-rose-500" />
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Calories
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {"calories" in item ? item.calories : "N/A"}
                              </div>
                            </div>
                          </div>
                        )}

                        {(activeTab === 1 || activeTab === 2) && (
                          <div className="mb-4">
                            <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              {activeTab === 1 ? "Key Features:" : "Benefits:"}
                            </div>
                            <ul className="space-y-1">
                              {(activeTab === 1
                                ? (item as { features: string[] }).features
                                : (item as { benefits: string[] }).benefits
                              )?.map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                                >
                                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-rose-500"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          className={`w-full bg-gradient-to-r px-4 py-2 ${item.color} inline-flex transform items-center justify-center rounded-lg font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
                        >
                          {activeTab === 0
                            ? "Join This Class"
                            : activeTab === 1
                              ? "Get This Plan"
                              : "Book a Session"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 blur-xl"></div>
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                  Start your wellness journey today
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Take the first step toward a healthier, more balanced life.
                  Our expert coaches are ready to guide you every step of the
                  way.
                </p>

                <div className="mb-6 space-y-4">
                  {[
                    "Personalized fitness assessment",
                    "Custom nutrition and workout plans",
                    "One-on-one coaching sessions",
                    "Access to all group classes",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500"></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Class Schedule
                  </button>
                </div>
              </div>

              <div className="relative h-96 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500"></div>

                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                    <div className="mb-4 flex items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-white">Success Story</h4>
                        <p className="text-sm text-white/80">
                          Sarah&apos;s Transformation
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 italic text-white/90">
                      &quot;I&apos;ve lost 30 pounds and gained so much
                      confidence. The coaches here truly care about your success
                      and provide the support you need to reach your
                      goals.&quot;
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/80">
                        Member for 6 months
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
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

export default FitnessWellnessSection;
