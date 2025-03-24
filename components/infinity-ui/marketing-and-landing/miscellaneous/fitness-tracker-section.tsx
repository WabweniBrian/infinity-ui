"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Flame,
  Heart,
  Trophy,
  Calendar,
  Clock,
  BarChart,
} from "lucide-react";
import { Users, Check } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FitnessTrackerSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Activity", icon: Activity },
    { name: "Nutrition", icon: Flame },
    { name: "Health", icon: Heart },
    { name: "Goals", icon: Trophy },
  ];

  const workouts = [
    {
      name: "Morning Run",
      type: "Cardio",
      duration: "45 min",
      calories: 420,
      distance: "5.2 km",
      date: "Today, 7:30 AM",
      completed: true,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Strength Training",
      type: "Weights",
      duration: "60 min",
      calories: 380,
      distance: null,
      date: "Yesterday, 6:00 PM",
      completed: true,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Yoga Session",
      type: "Flexibility",
      duration: "30 min",
      calories: 150,
      distance: null,
      date: "Tomorrow, 8:00 AM",
      completed: false,
      color: "from-purple-500 to-violet-500",
    },
  ];

  const nutritionData = [
    { name: "Protein", value: 120, goal: 150, unit: "g", color: "bg-blue-500" },
    { name: "Carbs", value: 210, goal: 250, unit: "g", color: "bg-green-500" },
    { name: "Fat", value: 65, goal: 80, unit: "g", color: "bg-amber-500" },
    {
      name: "Calories",
      value: 1850,
      goal: 2200,
      unit: "kcal",
      color: "bg-red-500",
    },
  ];

  const healthMetrics = [
    {
      name: "Heart Rate",
      value: "68",
      unit: "bpm",
      change: "-3",
      trend: "down",
      color: "text-red-500",
    },
    {
      name: "Sleep",
      value: "7.5",
      unit: "hours",
      change: "+0.5",
      trend: "up",
      color: "text-blue-500",
    },
    {
      name: "Steps",
      value: "8,742",
      unit: "steps",
      change: "+1,242",
      trend: "up",
      color: "text-green-500",
    },
    {
      name: "Water",
      value: "1.8",
      unit: "L",
      change: "+0.3",
      trend: "up",
      color: "text-cyan-500",
    },
  ];

  const goals = [
    {
      name: "Run 20km per week",
      progress: 65,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Workout 4 times per week",
      progress: 75,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Meditate daily",
      progress: 40,
      color: "from-purple-500 to-violet-500",
    },
    {
      name: "Drink 2.5L water daily",
      progress: 80,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const tabContent = [
    // Activity Tab
    <div key="activity" className="space-y-6">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            title: "Active Calories",
            value: "756",
            unit: "kcal",
            icon: Flame,
            color: "text-orange-500",
          },
          {
            title: "Active Time",
            value: "105",
            unit: "min",
            icon: Clock,
            color: "text-blue-500",
          },
          {
            title: "Distance",
            value: "5.2",
            unit: "km",
            icon: Activity,
            color: "text-green-500",
          },
        ].map((metric, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200/50 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.title}
              </span>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                {metric.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
        Recent Workouts
      </h3>
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={index} className="group relative">
            <div
              className={`absolute -inset-2 bg-gradient-to-r ${workout.color} rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
            ></div>
            <div className="relative rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-r ${workout.color} flex items-center justify-center`}
                  >
                    {workout.type === "Cardio" ? (
                      <Activity className="h-5 w-5 text-white" />
                    ) : workout.type === "Weights" ? (
                      <BarChart className="h-5 w-5 text-white" />
                    ) : (
                      <Heart className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {workout.name}
                    </h4>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {workout.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {workout.duration}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {workout.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Flame className="mr-1 h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {workout.calories} kcal
                    </span>
                  </div>
                  {workout.distance && (
                    <div className="flex items-center">
                      <Activity className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {workout.distance}
                      </span>
                    </div>
                  )}
                </div>

                {workout.completed ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Scheduled
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="inline-flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:from-green-600 hover:to-emerald-600 hover:shadow-lg">
        View All Activities
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>,

    // Nutrition Tab
    <div key="nutrition" className="space-y-6">
      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Today&apos;s Nutrition
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="mr-1 h-4 w-4" />
            Today
          </div>
        </div>

        <div className="space-y-4">
          {nutritionData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full ${item.color} mr-2`}
                  ></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.value} / {item.goal} {item.unit}
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <motion.div
                  className={`h-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={
                    isInView
                      ? { width: `${(item.value / item.goal) * 100}%` }
                      : { width: 0 }
                  }
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Meal Plan
          </h3>
          <div className="space-y-4">
            {[
              {
                time: "Breakfast",
                meal: "Oatmeal with berries and nuts",
                calories: 320,
              },
              {
                time: "Lunch",
                meal: "Grilled chicken salad with avocado",
                calories: 450,
              },
              {
                time: "Dinner",
                meal: "Salmon with quinoa and vegetables",
                calories: 580,
              },
            ].map((meal, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {meal.time}
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {meal.meal}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {meal.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Water Intake
          </h3>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={
                    isInView
                      ? { strokeDashoffset: 283 * (1 - 0.7) }
                      : { strokeDashoffset: 283 }
                  }
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-900 text-lg font-bold dark:fill-white"
                >
                  70%
                </text>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">
              1.8L / 2.5L
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Daily Goal
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Health Tab
    <div key="health" className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {healthMetrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200/50 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.name}
              </span>
              <div className={`flex items-center ${metric.color}`}>
                <span className="text-xs">{metric.change}</span>
                {metric.trend === "up" ? (
                  <svg
                    className="ml-0.5 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="ml-0.5 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                {metric.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Heart Rate
        </h3>
        <div className="relative h-48">
          <svg className="h-full w-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient
                id="heartRateGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,100 C25,80 50,120 75,100 C100,80 125,120 150,100 C175,80 200,120 225,100 C250,80 275,120 300,100 C325,80 350,120 375,100 C400,80 425,120 450,100"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M0,100 C25,80 50,120 75,100 C100,80 125,120 150,100 C175,80 200,120 225,100 C250,80 275,120 300,100 C325,80 350,120 375,100 C400,80 425,120 450,100 L450,200 L0,200 Z"
              fill="url(#heartRateGradient)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>Now</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Sleep Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 dark:text-gray-300">
                Sleep Score
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                85/100
              </div>
            </div>
            <div className="h-8 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="flex h-full">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "20%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "45%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "20%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Deep (1.5h)</span>
              <span>Light (3.4h)</span>
              <span>REM (1.6h)</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Stress Level
          </h3>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={
                    isInView
                      ? { strokeDashoffset: 283 * (1 - 0.35) }
                      : { strokeDashoffset: 283 }
                  }
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-900 text-lg font-bold dark:fill-white"
                >
                  Low
                </text>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">
              35/100
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Stress Score
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Goals Tab
    <div key="goals" className="space-y-6">
      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
          Weekly Goals
        </h3>
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {goal.name}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {goal.progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <motion.div
                  className={`h-full bg-gradient-to-r ${goal.color}`}
                  initial={{ width: 0 }}
                  animate={
                    isInView ? { width: `${goal.progress}%` } : { width: 0 }
                  }
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Achievements
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🏃", name: "5K Runner", unlocked: true },
              { icon: "💪", name: "Strength Master", unlocked: true },
              { icon: "🧘", name: "Zen Yogi", unlocked: false },
              { icon: "🚴", name: "Cycling Pro", unlocked: false },
              { icon: "🏊", name: "Swim Champ", unlocked: false },
              { icon: "🥗", name: "Nutrition Guru", unlocked: true },
            ].map((achievement, i) => (
              <div key={i} className="text-center">
                <div
                  className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full text-xl ${achievement.unlocked ? "bg-gradient-to-br from-amber-400 to-orange-500" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  {achievement.icon}
                </div>
                <div
                  className={`text-xs ${achievement.unlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {achievement.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Upcoming Challenges
          </h3>
          <div className="space-y-4">
            {[
              { name: "10K Spring Run", date: "May 15", participants: 1243 },
              {
                name: "30-Day Yoga Challenge",
                date: "Starts June 1",
                participants: 567,
              },
              { name: "Mountain Hike", date: "July 8-10", participants: 89 },
            ].map((challenge, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {challenge.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {challenge.date}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="mr-1 h-4 w-4" />
                  {challenge.participants}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="inline-flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:from-purple-600 hover:to-violet-600 hover:shadow-lg">
        Set New Goal
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/30 to-indigo-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Fitness Pattern */}
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]">
          <svg width="100%" height="100%">
            <pattern
              id="fitness-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20,0 C30,10 30,30 20,40 C10,30 10,10 20,0"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#fitness-pattern)" />
          </svg>
        </div>

        {/* Floating Fitness Icons */}
        {["🏃", "🏋️", "🧘", "🚴", "🥗", "💪", "🍎", "💧"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              rotate: [0, Math.random() * 40 - 20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex items-center justify-center">
              <span className="h-1 w-12 rounded-full bg-green-500"></span>
              <span className="mx-2 font-medium text-green-500">
                FITNESS TRACKER
              </span>
              <span className="h-1 w-12 rounded-full bg-green-500"></span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Track your fitness
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                journey
              </span>
            </h2>

            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Monitor your workouts, nutrition, and health metrics all in one
              place. Set goals, track progress, and achieve your fitness dreams.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-6">
              {[
                {
                  title: "Personalized Plans",
                  description:
                    "Tailored workouts and nutrition plans based on your goals",
                },
                {
                  title: "Real-time Tracking",
                  description:
                    "Monitor your progress with detailed metrics and insights",
                },
                {
                  title: "Smart Analytics",
                  description:
                    "AI-powered analysis to optimize your fitness journey",
                },
                {
                  title: "Community Support",
                  description:
                    "Connect with like-minded individuals for motivation",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                View Demo
              </button>
            </div>
          </motion.div>

          {/* App Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
              {/* App Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="mr-2 h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">FitTrack</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/80">
                      Today&apos;s Progress
                    </div>
                    <div className="text-2xl font-bold text-white">75%</div>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg className="h-12 w-12" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={
                          isInView
                            ? { strokeDashoffset: 251.2 * (1 - 0.75) }
                            : { strokeDashoffset: 251.2 }
                        }
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* App Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex flex-1 flex-col items-center justify-center px-2 py-4 text-sm font-medium transition-colors ${
                      activeTab === index
                        ? "border-b-2 border-green-500 text-green-500"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <tab.icon className="mb-1 h-5 w-5" />
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tabContent[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Missing imports for the Fitness Tracker section
const Bell = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

const User = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
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
  );
};

export default FitnessTrackerSection;
