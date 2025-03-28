"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  Apple,
  Beef,
  Calendar,
  Carrot,
  ChevronsUpIcon as Cheese,
  Clock,
  Coffee,
  Droplet,
  Dumbbell,
  Flame,
  Moon,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Repeat,
  RotateCw,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function FitnessDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [stepsCount, setStepsCount] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Simulate counts animation on load
  useEffect(() => {
    const caloriesInterval = setInterval(() => {
      setCaloriesBurned((prev) => {
        if (prev < 1850) return prev + 50;
        clearInterval(caloriesInterval);
        return prev;
      });
    }, 30);

    const stepsInterval = setInterval(() => {
      setStepsCount((prev) => {
        if (prev < 8450) return prev + 250;
        clearInterval(stepsInterval);
        return prev;
      });
    }, 20);

    const waterInterval = setInterval(() => {
      setWaterIntake((prev) => {
        if (prev < 5) return prev + 0.5;
        clearInterval(waterInterval);
        return prev;
      });
    }, 300);

    return () => {
      clearInterval(caloriesInterval);
      clearInterval(stepsInterval);
      clearInterval(waterInterval);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Sample data
  const workouts = [
    {
      id: "workout1",
      name: "Morning Run",
      type: "Cardio",
      duration: "45 min",
      caloriesBurned: 420,
      distance: "5.2 km",
      date: "Today",
      time: "06:30 AM",
      completed: true,
    },
    {
      id: "workout2",
      name: "Upper Body Strength",
      type: "Strength",
      duration: "50 min",
      caloriesBurned: 380,
      sets: 15,
      date: "Today",
      time: "05:30 PM",
      completed: false,
    },
    {
      id: "workout3",
      name: "Yoga Session",
      type: "Flexibility",
      duration: "30 min",
      caloriesBurned: 150,
      date: "Yesterday",
      time: "07:00 PM",
      completed: true,
    },
    {
      id: "workout4",
      name: "HIIT Workout",
      type: "Cardio",
      duration: "25 min",
      caloriesBurned: 320,
      date: "Yesterday",
      time: "06:00 AM",
      completed: true,
    },
  ];

  const upcomingWorkouts = [
    {
      id: "upcoming1",
      name: "Lower Body Strength",
      type: "Strength",
      duration: "45 min",
      day: "Tomorrow",
      time: "06:00 PM",
      coach: "Alex",
    },
    {
      id: "upcoming2",
      name: "Swimming",
      type: "Cardio",
      duration: "40 min",
      day: "Wednesday",
      time: "07:30 AM",
      coach: "Sarah",
    },
    {
      id: "upcoming3",
      name: "Pilates",
      type: "Flexibility",
      duration: "50 min",
      day: "Thursday",
      time: "06:30 PM",
      coach: "Michael",
    },
  ];

  const nutritionLog = [
    {
      id: "meal1",
      name: "Breakfast",
      time: "07:30 AM",
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 15,
      items: [
        {
          name: "Oatmeal with Berries",
          calories: 280,
          icon: <Apple className="h-4 w-4" />,
        },
        {
          name: "Greek Yogurt",
          calories: 120,
          icon: <Cheese className="h-4 w-4" />,
        },
        {
          name: "Black Coffee",
          calories: 5,
          icon: <Coffee className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "meal2",
      name: "Lunch",
      time: "12:30 PM",
      calories: 680,
      protein: 40,
      carbs: 65,
      fat: 22,
      items: [
        {
          name: "Grilled Chicken Salad",
          calories: 450,
          icon: <Beef className="h-4 w-4" />,
        },
        {
          name: "Whole Grain Bread",
          calories: 180,
          icon: <Apple className="h-4 w-4" />,
        },
        { name: "Apple", calories: 95, icon: <Apple className="h-4 w-4" /> },
      ],
    },
    {
      id: "meal3",
      name: "Snack",
      time: "03:30 PM",
      calories: 220,
      protein: 10,
      carbs: 25,
      fat: 8,
      items: [
        {
          name: "Protein Bar",
          calories: 220,
          icon: <Apple className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "meal4",
      name: "Dinner",
      time: "07:00 PM",
      calories: 550,
      protein: 35,
      carbs: 40,
      fat: 20,
      items: [
        { name: "Salmon", calories: 300, icon: <Beef className="h-4 w-4" /> },
        { name: "Quinoa", calories: 120, icon: <Apple className="h-4 w-4" /> },
        {
          name: "Roasted Vegetables",
          calories: 130,
          icon: <Carrot className="h-4 w-4" />,
        },
      ],
    },
  ];

  const weeklyActivity = [
    { day: "Mon", calories: 1950, steps: 9200, sleep: 7.2 },
    { day: "Tue", calories: 1750, steps: 8100, sleep: 6.8 },
    { day: "Wed", calories: 2100, steps: 10500, sleep: 7.5 },
    { day: "Thu", calories: 1850, steps: 8450, sleep: 7.0 },
    { day: "Fri", calories: 1600, steps: 7200, sleep: 6.5 },
    { day: "Sat", calories: 2200, steps: 12000, sleep: 8.0 },
    { day: "Sun", calories: 1400, steps: 6500, sleep: 7.8 },
  ];

  const healthMetrics = [
    {
      name: "Calories Burned",
      value: caloriesBurned,
      target: 2000,
      icon: <Flame className="h-5 w-5" />,
      change: "+150 kcal",
      color:
        "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
    },
    {
      name: "Steps",
      value: stepsCount,
      target: 10000,
      icon: <Activity className="h-5 w-5" />,
      change: "+1,200 steps",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    },
    {
      name: "Water",
      value: waterIntake,
      target: 8,
      unit: "glasses",
      icon: <Droplet className="h-5 w-5" />,
      change: "+2 glasses",
      color: "bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400",
    },
    {
      name: "Sleep",
      value: "7.0",
      target: 8,
      unit: "hours",
      icon: <Moon className="h-5 w-5" />,
      change: "+0.5 hours",
      color:
        "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
    },
  ];

  const achievements = [
    {
      id: "ach1",
      name: "Early Bird",
      description: "Complete 5 morning workouts",
      progress: 100,
      icon: <Zap className="h-5 w-5" />,
      color: "bg-yellow-500",
    },
    {
      id: "ach2",
      name: "Step Master",
      description: "Reach 10,000 steps for 7 days",
      progress: 70,
      icon: <Activity className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: "ach3",
      name: "Hydration Hero",
      description: "Drink 8 glasses of water for 5 days",
      progress: 60,
      icon: <Droplet className="h-5 w-5" />,
      color: "bg-cyan-500",
    },
    {
      id: "ach4",
      name: "Strength Champion",
      description: "Complete 10 strength workouts",
      progress: 40,
      icon: <Dumbbell className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-6 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Fitness Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track your workouts, nutrition, and health metrics
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workouts">Workouts</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>
            </Tabs>
            <Avatar className="h-10 w-10 border-2 border-teal-500">
              <AvatarImage
                src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {metric.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className={cn("mr-4 rounded-full p-2", metric.color)}>
                      {metric.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {typeof metric.value === "number"
                          ? metric.value.toLocaleString()
                          : metric.value}
                        {metric.unit && (
                          <span className="ml-1 text-sm font-normal">
                            {metric.unit}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        <span>{metric.change} today</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {typeof metric.value === "number"
                          ? metric.value
                          : Number.parseFloat(metric.value)}
                        /{metric.target} {metric.unit}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                      <div
                        className={`h-full rounded-full ${
                          (typeof metric.value === "number"
                            ? metric.value
                            : Number.parseFloat(metric.value)) /
                            metric.target >=
                          1
                            ? "bg-green-500"
                            : (typeof metric.value === "number"
                                  ? metric.value
                                  : Number.parseFloat(metric.value)) /
                                  metric.target >=
                                0.6
                              ? "bg-teal-500"
                              : "bg-amber-500"
                        }`}
                        style={{
                          width: `${((typeof metric.value === "number" ? metric.value : Number.parseFloat(metric.value)) / metric.target) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Workout Timer */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-none bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="mb-2 text-xl font-semibold">Workout Timer</h3>
                  <p className="opacity-90">
                    Track your current workout session
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-4xl font-bold tabular-nums">
                    {formatTime(timerSeconds)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      className="bg-white text-teal-600 hover:bg-gray-100"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                    >
                      {isTimerRunning ? (
                        <Pause className="mr-2 h-4 w-4" />
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      {isTimerRunning ? "Pause" : "Start"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/20"
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(0);
                      }}
                    >
                      <RotateCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Workouts */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="h-full border-none bg-white shadow-md dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Workouts</CardTitle>
                  <Button className="bg-teal-600 text-white hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Workout
                  </Button>
                </div>
                <CardDescription>
                  Track your recent workout activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workouts.map((workout) => (
                    <motion.div
                      key={workout.id}
                      className={cn(
                        "overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-700",
                        workout.completed
                          ? "border-green-200 dark:border-green-800"
                          : "",
                      )}
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="mb-2 flex items-center">
                              <div
                                className={cn(
                                  "mr-3 rounded-lg p-2",
                                  workout.type === "Cardio"
                                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                    : workout.type === "Strength"
                                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                                )}
                              >
                                {workout.type === "Cardio" ? (
                                  <Activity className="h-5 w-5" />
                                ) : workout.type === "Strength" ? (
                                  <Dumbbell className="h-5 w-5" />
                                ) : (
                                  <Zap className="h-5 w-5" />
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {workout.name}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <Clock className="mr-1 h-4 w-4" />
                                {workout.duration}
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <Flame className="mr-1 h-4 w-4" />
                                {workout.caloriesBurned} kcal
                              </div>
                              {workout.distance && (
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <Activity className="mr-1 h-4 w-4" />
                                  {workout.distance}
                                </div>
                              )}
                              {workout.sets && (
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <Repeat className="mr-1 h-4 w-4" />
                                  {workout.sets} sets
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge
                            className={cn(
                              workout.completed
                                ? "bg-green-500"
                                : "bg-amber-500",
                            )}
                          >
                            {workout.completed ? "Completed" : "Scheduled"}
                          </Badge>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="mr-1 h-4 w-4" />
                            {workout.date}, {workout.time}
                          </div>
                          <div>
                            {workout.completed ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
                              >
                                View Details
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-teal-600 text-white hover:bg-teal-700"
                              >
                                Start Workout
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  className="text-teal-600 dark:text-teal-400"
                >
                  View Workout History
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Upcoming Workouts and Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Upcoming Workouts */}
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Upcoming Workouts</CardTitle>
                  <CardDescription>
                    Your scheduled workout sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {workout.name}
                            </h3>
                            <div className="mt-1 flex items-center">
                              <Badge
                                variant="outline"
                                className="mr-2 font-normal"
                              >
                                {workout.type}
                              </Badge>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {workout.duration}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Edit Workout</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            {workout.day}, {workout.time}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <User className="mr-1 h-3.5 w-3.5" />
                            Coach: {workout.coach}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Your fitness milestones and badges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-3 flex items-center">
                          <div
                            className={cn(
                              "mr-3 rounded-full p-2 text-white",
                              achievement.color,
                            )}
                          >
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {achievement.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {achievement.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className={`h-full rounded-full ${achievement.color}`}
                            style={{
                              width: `${achievement.progress}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Nutrition Log */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Nutrition Log</CardTitle>
                <Button className="bg-teal-600 text-white hover:bg-teal-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Log Meal
                </Button>
              </div>
              <CardDescription>
                Track your daily food intake and macronutrients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {nutritionLog.map((meal) => (
                  <div
                    key={meal.id}
                    className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4 md:p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {meal.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {meal.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {meal.calories} kcal
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            P: {meal.protein}g | C: {meal.carbs}g | F:{" "}
                            {meal.fat}g
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {meal.items.map((item, index) => (
                          <div
                            key={`${meal.id}-${index}`}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-800/50"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 rounded-full bg-teal-100 p-1.5 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                                {item.icon}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.calories} kcal
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-600 dark:text-teal-400"
                        >
                          Edit Meal
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>
                Your activity trends for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-center font-medium text-gray-900 dark:text-white">
                    Calories Burned
                  </h3>
                  <div className="flex h-40 items-end justify-between">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height: `${(day.calories / 2500) * 100}%`,
                          }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            "mb-2 w-8 rounded-t-md",
                            day.calories > 2000
                              ? "bg-green-500"
                              : day.calories > 1500
                                ? "bg-teal-500"
                                : "bg-amber-500",
                          )}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {day.day}
                        </span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {day.calories}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-center font-medium text-gray-900 dark:text-white">
                    Steps
                  </h3>
                  <div className="flex h-40 items-end justify-between">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.steps / 15000) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            "mb-2 w-8 rounded-t-md",
                            day.steps > 10000
                              ? "bg-blue-500"
                              : day.steps > 7500
                                ? "bg-cyan-500"
                                : "bg-amber-500",
                          )}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {day.day}
                        </span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {(day.steps / 1000).toFixed(1)}k
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-center font-medium text-gray-900 dark:text-white">
                    Sleep
                  </h3>
                  <div className="flex h-40 items-end justify-between">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.sleep / 10) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            "mb-2 w-8 rounded-t-md",
                            day.sleep > 7.5
                              ? "bg-indigo-500"
                              : day.sleep > 6.5
                                ? "bg-purple-500"
                                : "bg-pink-500",
                          )}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {day.day}
                        </span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {day.sleep}h
                        </span>
                      </div>
                    ))}
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
