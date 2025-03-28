"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Frown,
  Meh,
  Play,
  Smile,
  Star,
  Target,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CustomProgressBar = ({ progress }: { progress: number }) => {
  const getProgressColor = () => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 25) return "bg-blue-500";
    return "bg-amber-500";
  };

  return (
    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
      <div
        className={`h-full ${getProgressColor()} rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default function EducationDashboard() {
  const [streakCount, setStreakCount] = useState(0);
  const [xpPoints, setXpPoints] = useState(0);

  // Simulate streak and XP animation on load
  useEffect(() => {
    const streakInterval = setInterval(() => {
      setStreakCount((prev) => {
        if (prev < 7) return prev + 1;
        clearInterval(streakInterval);
        return prev;
      });
    }, 200);

    const xpInterval = setInterval(() => {
      setXpPoints((prev) => {
        if (prev < 1250) return prev + 50;
        clearInterval(xpInterval);
        return prev;
      });
    }, 100);

    return () => {
      clearInterval(streakInterval);
      clearInterval(xpInterval);
    };
  }, []);

  // Sample data
  const courses = [
    {
      id: "course1",
      title: "Introduction to Machine Learning",
      progress: 65,
      instructor: "Dr. Sarah Johnson",
      category: "Data Science",
      duration: "8 weeks",
      nextLesson: "Neural Networks Basics",
      lastActivity: "Yesterday",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "course2",
      title: "Advanced JavaScript Patterns",
      progress: 42,
      instructor: "Michael Chen",
      category: "Web Development",
      duration: "6 weeks",
      nextLesson: "Functional Programming",
      lastActivity: "2 days ago",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "course3",
      title: "UX Design Fundamentals",
      progress: 89,
      instructor: "Emily Davis",
      category: "Design",
      duration: "4 weeks",
      nextLesson: "User Testing",
      lastActivity: "Today",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const upcomingDeadlines = [
    {
      id: "deadline1",
      title: "Machine Learning Project",
      course: "Introduction to Machine Learning",
      dueDate: "Jun 18, 2023",
      timeLeft: "3 days",
      status: "Not Started",
      priority: "High",
    },
    {
      id: "deadline2",
      title: "JavaScript Coding Challenge",
      course: "Advanced JavaScript Patterns",
      dueDate: "Jun 20, 2023",
      timeLeft: "5 days",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "deadline3",
      title: "UX Case Study Presentation",
      course: "UX Design Fundamentals",
      dueDate: "Jun 25, 2023",
      timeLeft: "10 days",
      status: "In Progress",
      priority: "Low",
    },
  ];

  const achievements = [
    {
      id: "ach1",
      name: "Fast Learner",
      description: "Complete 5 lessons in a day",
      icon: <Zap className="h-5 w-5" />,
      unlocked: true,
      color: "bg-yellow-500",
    },
    {
      id: "ach2",
      name: "Consistent",
      description: "Maintain a 7-day streak",
      icon: <Calendar className="h-5 w-5" />,
      unlocked: true,
      color: "bg-green-500",
    },
    {
      id: "ach3",
      name: "Quiz Master",
      description: "Score 100% on 3 quizzes",
      icon: <Award className="h-5 w-5" />,
      unlocked: true,
      color: "bg-purple-500",
    },
    {
      id: "ach4",
      name: "Bookworm",
      description: "Read 10 articles",
      icon: <BookOpen className="h-5 w-5" />,
      unlocked: false,
      color: "bg-gray-400",
    },
    {
      id: "ach5",
      name: "Video Enthusiast",
      description: "Watch 20 video lessons",
      icon: <Video className="h-5 w-5" />,
      unlocked: false,
      color: "bg-gray-400",
    },
  ];

  const learningStats = [
    {
      name: "Hours Studied",
      value: 42,
      icon: <Clock className="h-5 w-5" />,
      change: "+3.5 this week",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    },
    {
      name: "Completed Lessons",
      value: 28,
      icon: <CheckCircle className="h-5 w-5" />,
      change: "+5 this week",
      color:
        "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    },
    {
      name: "Quiz Score Avg",
      value: "87%",
      icon: <Target className="h-5 w-5" />,
      change: "+2% this week",
      color:
        "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400",
    },
    {
      name: "Courses Enrolled",
      value: 5,
      icon: <BookOpen className="h-5 w-5" />,
      change: "+1 this month",
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    },
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2.5, mood: "happy" },
    { day: "Tue", hours: 1.8, mood: "neutral" },
    { day: "Wed", hours: 3.2, mood: "happy" },
    { day: "Thu", hours: 0.5, mood: "sad" },
    { day: "Fri", hours: 2.0, mood: "neutral" },
    { day: "Sat", hours: 4.5, mood: "happy" },
    { day: "Sun", hours: 3.0, mood: "happy" },
  ];

  const recommendedCourses = [
    {
      id: "rec1",
      title: "Data Visualization with D3.js",
      category: "Data Science",
      level: "Intermediate",
      rating: 4.8,
      students: 1245,
    },
    {
      id: "rec2",
      title: "React Native for Beginners",
      category: "Mobile Development",
      level: "Beginner",
      rating: 4.6,
      students: 3421,
    },
    {
      id: "rec3",
      title: "Product Management Essentials",
      category: "Business",
      level: "Beginner",
      rating: 4.9,
      students: 2187,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Header with Gamification Elements */}
        <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Learning Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track your progress and achieve your learning goals
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-6 md:mt-0">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-1 flex items-center">
                <Zap className="mr-1 h-5 w-5 text-amber-500" />
                <span className="text-lg font-bold text-amber-500">
                  {xpPoints} XP
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Level 8
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-1 flex items-center">
                <Calendar className="mr-1 h-5 w-5 text-green-500" />
                <span className="text-lg font-bold text-green-500">
                  {streakCount}-Day Streak
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Keep it up!
              </div>
            </motion.div>

            <Avatar className="h-10 w-10 border-2 border-indigo-500">
              <AvatarImage
                src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Weekly Streak Calendar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Weekly Activity
                </h3>
                <Badge variant="outline" className="font-normal">
                  This Week
                </Badge>
              </div>
              <div className="flex items-end justify-between">
                {weeklyActivity.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${day.hours * 20}px` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={cn(
                        "mb-2 w-10 rounded-t-md",
                        day.hours > 3
                          ? "bg-green-500"
                          : day.hours > 1.5
                            ? "bg-blue-500"
                            : day.hours > 0
                              ? "bg-amber-500"
                              : "bg-gray-300 dark:bg-gray-700",
                      )}
                    />
                    <div className="mb-1">
                      {day.mood === "happy" ? (
                        <Smile className="h-5 w-5 text-green-500" />
                      ) : day.mood === "neutral" ? (
                        <Meh className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Frown className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {day.day}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {day.hours}h
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {learningStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className={cn("mr-4 rounded-full p-2", stat.color)}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Current Courses */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full border-none bg-white shadow-md dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Courses</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-600 dark:text-indigo-400"
                  >
                    View All
                  </Button>
                </div>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      className="overflow-hidden rounded-xl border border-gray-100 transition-shadow hover:shadow-lg dark:border-gray-700"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-[250px] md:w-1/3">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-90`}
                          ></div>
                          <Image
                            src={
                              course.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            fill
                            alt={course.title}
                            className="h-full w-full object-cover mix-blend-overlay"
                          />
                        </div>
                        <div className="p-4 md:w-2/3 md:p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                {course.title}
                              </h3>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                Instructor: {course.instructor}
                              </p>
                            </div>
                            <Badge variant="outline" className="font-normal">
                              {course.category}
                            </Badge>
                          </div>

                          <div className="mt-4">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                Progress
                              </span>
                              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                {course.progress}%
                              </span>
                            </div>
                            <CustomProgressBar progress={course.progress} />
                          </div>

                          <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">
                                Duration:
                              </span>
                              <span className="ml-1 text-gray-700 dark:text-gray-300">
                                {course.duration}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">
                                Last activity:
                              </span>
                              <span className="ml-1 text-gray-700 dark:text-gray-300">
                                {course.lastActivity}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium">Next:</span>{" "}
                              {course.nextLesson}
                            </div>
                            <Button
                              size="sm"
                              className="bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                              <Play className="mr-1 h-4 w-4" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements and Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Achievements */}
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Achievements</CardTitle>
                    <Badge className="bg-indigo-600 text-white">3/5</Badge>
                  </div>
                  <CardDescription>
                    Unlock badges by completing challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className={cn(
                          "flex flex-col items-center rounded-lg border p-3 text-center",
                          achievement.unlocked
                            ? "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20"
                            : "border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800/50",
                        )}
                        whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
                      >
                        <div
                          className={cn(
                            "mb-2 flex h-10 w-10 items-center justify-center rounded-full text-white",
                            achievement.color,
                          )}
                        >
                          {achievement.icon}
                        </div>
                        <h4 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <Badge variant="outline" className="font-normal">
                      This Week
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline) => (
                      <div
                        key={deadline.id}
                        className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {deadline.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {deadline.course}
                            </p>
                          </div>
                          <Badge
                            className={cn(
                              "font-normal",
                              deadline.priority === "High"
                                ? "bg-red-500 text-white"
                                : deadline.priority === "Medium"
                                  ? "bg-amber-500 text-white"
                                  : "bg-blue-500 text-white",
                            )}
                          >
                            {deadline.priority}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            Due: {deadline.dueDate}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {deadline.timeLeft} left
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className={cn(
                              "rounded-full px-2 py-1 text-xs",
                              deadline.status === "Not Started"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : deadline.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                            )}
                          >
                            {deadline.status}
                          </span>
                          <button className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                            Start Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Recommended Courses */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recommended For You</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  View All
                </Button>
              </div>
              <CardDescription>
                Based on your interests and learning history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {recommendedCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-700"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4">
                      <Badge className="mb-2 bg-indigo-100 font-normal text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {course.category}
                      </Badge>
                      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <div className="mb-3 flex items-center">
                        <div className="mr-3 flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {course.rating}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {course.students.toLocaleString()} students
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-normal">
                          {course.level}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                        >
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Learning Goals</CardTitle>
                <Button
                  size="sm"
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Add Goal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900/20">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Complete ML Course
                    </h3>
                    <Badge className="bg-green-500 text-white">On Track</Badge>
                  </div>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                    Finish Introduction to Machine Learning by July 15
                  </p>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      65%
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `65%` }}
                    ></div>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Build Portfolio
                    </h3>
                    <Badge className="bg-amber-500 text-white">
                      In Progress
                    </Badge>
                  </div>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                    Create 3 projects for web development portfolio
                  </p>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      33%
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `33%` }}
                    ></div>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Learn New Language
                    </h3>
                    <Badge className="bg-blue-500 text-white">
                      Just Started
                    </Badge>
                  </div>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                    Complete beginner Python course by August
                  </p>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      15%
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `15%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
