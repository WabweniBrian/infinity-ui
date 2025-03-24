"use client";

import { motion, useAnimation } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const FitnessHero = () => {
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Membership plans
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "monthly",
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Fitness assessment",
      ],
    },
    {
      name: "Premium",
      price: "$59",
      period: "monthly",
      features: [
        "All Basic features",
        "Group classes",
        "Personal trainer (2x/month)",
        "Nutrition plan",
      ],
    },
    {
      name: "Elite",
      price: "$99",
      period: "monthly",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Recovery services",
        "Meal prep delivery",
      ],
    },
  ];

  // Workout stats
  const workoutStats = [
    { label: "Workouts", value: "12", period: "this month" },
    { label: "Calories", value: "8,540", period: "burned" },
    { label: "Hours", value: "18.5", period: "active" },
  ];

  // Start animations when component mounts
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
    <div className="relative w-full overflow-hidden bg-black py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80" />

        {/* Background image */}
        <Image
          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo1XHkHxZzfEpmIkG3Q9nNcdoiOUZFRY8MTybl"
          alt="Fitness background"
          fill
          className="object-cover opacity-20"
        />

        {/* Accent colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-red-500/20 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-yellow-500/20 blur-[100px]"
        />
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
              className="mb-4 inline-block rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-medium text-red-400 backdrop-blur-sm"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500"></span>
              Transform Your Body, Transform Your Life
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Unleash your{" "}
              <span className="relative text-red-500">
                potential
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-red-500/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-300"
            >
              Join our state-of-the-art fitness center with expert trainers,
              premium equipment, and a supportive community to help you achieve
              your fitness goals.
            </motion.p>

            {/* Membership Tabs */}
            <motion.div
              variants={itemVariants}
              className="mb-8 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {[
                  "Membership Plans",
                  "Class Schedule",
                  "Personal Training",
                ].map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === index
                        ? "text-red-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-red-500"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Membership plans */}
              <div className="p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, scale: 1.03 }}
                      className={`rounded-lg border p-4 transition-all ${
                        index === 1
                          ? "border-red-500/30 bg-red-500/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="mb-2 text-sm font-medium text-white">
                        {plan.name}
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-white">
                          {plan.price}
                        </span>
                        <span className="text-sm text-gray-400">
                          /{plan.period}
                        </span>
                      </div>

                      <ul className="mb-4 space-y-2 text-xs">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <ChevronRight className="mt-0.5 h-3 w-3 text-red-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <button
                        className={`w-full rounded-lg py-2 text-xs font-medium transition-all ${
                          index === 1
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        Choose Plan
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-medium text-white transition-all hover:bg-red-600"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                  <Play className="h-3 w-3 fill-white text-white" />

                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-red-400"
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
                Tour Our Gym
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-3 gap-4 sm:gap-6"
            >
              {workoutStats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>{stat.label}</span>
                    <span className="text-gray-500">{stat.period}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Fitness App */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Phone frame */}
              <div className="relative rounded-[40px] border-[10px] border-gray-900 bg-black shadow-2xl">
                {/* Phone notch */}
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-gray-900"></div>

                {/* App content */}
                <div className="overflow-hidden rounded-[30px] bg-gray-900">
                  {/* App header */}
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium opacity-80">
                          Welcome back
                        </div>
                        <div className="text-lg font-bold">Wabweni Brian</div>
                      </div>
                      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/30 bg-white/20">
                        <Image
                          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoBr65FLq9k2zJh4F5OKicHTlarv3YGQjpDZbw"
                          alt="User"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                      <div>
                        <div className="text-sm font-medium">
                          Today&apos;s Goal
                        </div>
                        <div className="text-xs opacity-80">
                          Upper Body + 10,000 steps
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Workout progress */}
                  <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-sm font-medium text-white">
                        Weekly Progress
                      </div>
                      <div className="text-xs font-medium text-red-400">
                        View Details
                      </div>
                    </div>

                    {/* Progress chart */}
                    {/* Progress chart */}
                    <div className="mb-6 h-32 rounded-lg bg-white/5 p-4">
                      <div className="flex h-full items-end justify-between gap-2">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                          <div
                            key={i}
                            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                          >
                            <motion.div
                              className={`w-full rounded-t-sm ${i === 3 ? "bg-gradient-to-t from-red-500 to-yellow-500" : "bg-white/20"}`}
                              initial={{ height: 0 }}
                              animate={{
                                height: `${i === 3 ? 100 : Math.random() * 60 + 20}%`,
                              }}
                              transition={{
                                delay: 0.8 + i * 0.1,
                                duration: 0.8,
                              }}
                            ></motion.div>
                            <div className="text-xs text-gray-400">{day}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Today's workout */}
                    <div className="mb-4 text-sm font-medium text-white">
                      Today&apos;s Workout
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="mb-3 rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium text-white">
                          Upper Body Strength
                        </div>
                        <div className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                          45 min
                        </div>
                      </div>

                      <div className="mb-3 text-xs text-gray-400">
                        4 exercises • 3 sets each • 60 sec rest
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Clock className="h-3 w-3" />
                          Starts at 6:00 PM
                        </div>
                        <button className="rounded-full bg-red-500 p-2 text-white">
                          <Play className="h-3 w-3 fill-white" />
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      className="rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium text-white">
                          Daily Step Goal
                        </div>
                        <div className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                          In Progress
                        </div>
                      </div>

                      <div className="mb-3 flex items-center justify-between text-xs">
                        <div className="text-gray-300">
                          <span className="text-lg font-bold text-white">
                            7,248
                          </span>{" "}
                          / 10,000 steps
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                          <Flame className="h-3 w-3" />
                          352 kcal
                        </div>
                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                          initial={{ width: 0 }}
                          animate={{ width: "72.5%" }}
                          transition={{ delay: 1.6, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 top-10 rounded-lg bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/30 text-red-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">Next Class</div>
                    <div className="text-gray-400">HIIT • Tomorrow 8AM</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -bottom-8 -right-10 rounded-lg bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/30 text-green-400">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">New Record!</div>
                    <div className="text-gray-400">Bench Press: 185 lbs</div>
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

export default FitnessHero;
