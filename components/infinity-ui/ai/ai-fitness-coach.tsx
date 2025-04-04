"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Activity,
  Brain,
  Camera,
  CheckCheck,
  ChevronDown,
  Clock,
  Copy,
  Dumbbell,
  Fish,
  Heart,
  Menu,
  Moon,
  Play,
  Search,
  Sparkles,
  Sun,
  ThumbsDown,
  ThumbsUp,
  User,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Types
type WorkoutPlan = {
  id: number;
  name: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  focus: string;
  workoutsPerWeek: number;
  description: string;
  aiGenerated?: boolean;
};

type Exercise = {
  id: number;
  name: string;
  category: string;
  equipment: string;
  muscles: string[];
  difficulty: string;
  videoUrl?: string;
  aiRecommended?: boolean;
};

type ProgressData = {
  week: number;
  weight: number;
  strength: number;
  cardio: number;
};

type WorkoutSchedule = {
  day: string;
  workout: string;
  duration: string;
  completed: boolean;
};

type AiMessage = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  feedback?: "like" | "dislike";
  mealSuggestion?: MealSuggestion;
};

type Panel = "workout" | "nutrition" | "recovery" | "goals";

type MealSuggestion = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  image: string;
};

// Sample data
const workoutPlans: WorkoutPlan[] = [
  {
    id: 1,
    name: "Strength Builder",
    duration: "8 weeks",
    level: "Intermediate",
    focus: "Muscle gain",
    workoutsPerWeek: 4,
    description:
      "Build strength and muscle mass with this progressive overload program.",
    aiGenerated: false,
  },
  {
    id: 2,
    name: "HIIT Cardio Blast",
    duration: "4 weeks",
    level: "Advanced",
    focus: "Fat loss",
    workoutsPerWeek: 5,
    description:
      "Intense interval training to maximize calorie burn and improve cardiovascular health.",
    aiGenerated: false,
  },
  {
    id: 3,
    name: "AI Custom Program",
    duration: "6 weeks",
    level: "Beginner",
    focus: "Overall fitness",
    workoutsPerWeek: 3,
    description:
      "Personalized AI-generated program based on your fitness level, goals, and available equipment.",
    aiGenerated: true,
  },
  {
    id: 4,
    name: "Mobility & Recovery",
    duration: "Ongoing",
    level: "All levels",
    focus: "Flexibility",
    workoutsPerWeek: 3,
    description:
      "Improve range of motion, prevent injuries, and enhance recovery.",
    aiGenerated: false,
  },
];

const exerciseLibrary: Exercise[] = [
  {
    id: 1,
    name: "Squat",
    category: "Lower Body",
    equipment: "Bodyweight/Barbell",
    muscles: ["Quadriceps", "Glutes", "Hamstrings"],
    difficulty: "Beginner to Advanced",
    aiRecommended: true,
  },
  {
    id: 2,
    name: "Push-up",
    category: "Upper Body",
    equipment: "Bodyweight",
    muscles: ["Chest", "Shoulders", "Triceps"],
    difficulty: "Beginner to Intermediate",
    aiRecommended: false,
  },
  {
    id: 3,
    name: "Deadlift",
    category: "Full Body",
    equipment: "Barbell",
    muscles: ["Lower Back", "Glutes", "Hamstrings"],
    difficulty: "Intermediate to Advanced",
    aiRecommended: true,
  },
  {
    id: 4,
    name: "Plank",
    category: "Core",
    equipment: "Bodyweight",
    muscles: ["Abdominals", "Lower Back"],
    difficulty: "Beginner",
    aiRecommended: false,
  },
];

const progressData: ProgressData[] = [
  { week: 1, weight: 150, strength: 65, cardio: 70 },
  { week: 2, weight: 149, strength: 68, cardio: 72 },
  { week: 3, weight: 148, strength: 72, cardio: 75 },
  { week: 4, weight: 147, strength: 75, cardio: 78 },
  { week: 5, weight: 146, strength: 78, cardio: 80 },
  { week: 6, weight: 145, strength: 82, cardio: 83 },
  { week: 7, weight: 144, strength: 85, cardio: 85 },
  { week: 8, weight: 143, strength: 88, cardio: 87 },
];

const workoutSchedule: WorkoutSchedule[] = [
  {
    day: "Monday",
    workout: "Upper Body Strength",
    duration: "45 min",
    completed: true,
  },
  {
    day: "Tuesday",
    workout: "HIIT Cardio",
    duration: "30 min",
    completed: true,
  },
  {
    day: "Wednesday",
    workout: "Rest & Recovery",
    duration: "20 min",
    completed: false,
  },
  {
    day: "Thursday",
    workout: "Lower Body Strength",
    duration: "50 min",
    completed: false,
  },
  {
    day: "Friday",
    workout: "Core & Mobility",
    duration: "35 min",
    completed: false,
  },
  {
    day: "Saturday",
    workout: "Full Body Circuit",
    duration: "60 min",
    completed: false,
  },
  {
    day: "Sunday",
    workout: "Active Recovery",
    duration: "30 min",
    completed: false,
  },
];

// Blood pressure data for charts
const bloodPressureData = [
  { date: "2023-05-01", systolic: 135, diastolic: 85 },
  { date: "2023-06-01", systolic: 130, diastolic: 82 },
  { date: "2023-07-01", systolic: 128, diastolic: 80 },
  { date: "2023-08-01", systolic: 125, diastolic: 78 },
  { date: "2023-09-01", systolic: 122, diastolic: 76 },
  { date: "2023-10-01", systolic: 120, diastolic: 75 },
];

// Glucose data for charts
const glucoseData = [
  { date: "2023-05-01", level: 110 },
  { date: "2023-06-01", level: 105 },
  { date: "2023-07-01", level: 102 },
  { date: "2023-08-01", level: 100 },
  { date: "2023-09-01", level: 98 },
  { date: "2023-10-01", level: 95 },
];

// Medication adherence data for charts
const medicationAdherenceData = [
  { day: "Mon", percentage: 100 },
  { day: "Tue", percentage: 100 },
  { day: "Wed", percentage: 75 },
  { day: "Thu", percentage: 100 },
  { day: "Fri", percentage: 100 },
  { day: "Sat", percentage: 50 },
  { day: "Sun", percentage: 100 },
];

// Sample meal suggestions
const mealSuggestions: MealSuggestion[] = [
  {
    name: "High-Protein Breakfast Bowl",
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 15,
    ingredients: [
      "3 egg whites",
      "1 whole egg",
      "1/2 cup oatmeal",
      "1 tbsp almond butter",
      "1/4 cup blueberries",
      "1 scoop protein powder",
    ],
    instructions: [
      "Cook egg whites and whole egg in a non-stick pan",
      "Prepare oatmeal with water or almond milk",
      "Mix protein powder into oatmeal",
      "Top with almond butter and blueberries",
    ],
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    name: "Lean Muscle Lunch",
    calories: 550,
    protein: 40,
    carbs: 45,
    fat: 18,
    ingredients: [
      "6 oz grilled chicken breast",
      "1 cup brown rice",
      "1 cup steamed broccoli",
      "1 tbsp olive oil",
      "Lemon juice and herbs to taste",
    ],
    instructions: [
      "Season chicken breast with herbs and grill until cooked through",
      "Cook brown rice according to package instructions",
      "Steam broccoli until tender-crisp",
      "Drizzle with olive oil and lemon juice",
    ],
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    name: "Recovery Smoothie",
    calories: 320,
    protein: 25,
    carbs: 40,
    fat: 8,
    ingredients: [
      "1 banana",
      "1 cup spinach",
      "1 scoop protein powder",
      "1 tbsp chia seeds",
      "1 cup almond milk",
      "1/2 cup frozen berries",
    ],
    instructions: [
      "Add all ingredients to a blender",
      "Blend until smooth",
      "Add ice if desired for thickness",
      "Consume within 30 minutes after workout",
    ],
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

// Initial AI messages
const initialMessages: AiMessage[] = [
  {
    id: "1",
    content:
      "Hi Brian! I've analyzed your recent workouts and noticed your squat form has improved significantly. Would you like me to suggest some progressive overload techniques for your next leg day?",
    sender: "ai",
    timestamp: new Date(Date.now() - 86400000),
  },
];

// Custom hook for media queries
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const AIFitnessCoach = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(
    null,
  );
  const [showExerciseDetails, setShowExerciseDetails] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [messages, setMessages] = useState<AiMessage[]>(initialMessages);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>("workout");
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState(false);
  const [isGeneratingMeal, setIsGeneratingMeal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [showMealDetails, setShowMealDetails] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealSuggestion | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [copied, setCopied] = useState<string>("");

  const isMobile = useMediaQuery("(max-width: 768px)");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Regenerate chart key when tab or panel changes to prevent flickering
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [activeTab, activePanel]);

  useEffect(() => {
    // Check system preference for dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleWorkoutClick = (workout: WorkoutPlan) => {
    setSelectedWorkout(workout);
    setShowWorkoutDetails(true);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetails(true);
  };

  const handleMealClick = (meal: MealSuggestion) => {
    setSelectedMeal(meal);
    setShowMealDetails(true);
  };

  const handleMessageFeedback = (
    messageId: string,
    feedback: "like" | "dislike",
  ) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              feedback: message.feedback === feedback ? undefined : feedback,
            }
          : message,
      ),
    );
  };

  // Handle copy
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);

    setTimeout(() => {
      setCopied((prev) => (prev === key ? "" : prev));
    }, 2000);
  };

  const generateAIResponse = async () => {
    if (!userQuery.trim()) return;

    setIsGenerating(true);

    // Add user message
    const userMessage: AiMessage = {
      id: Date.now().toString(),
      content: userQuery,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response generation with streaming effect
    const responses = [
      "Based on your fitness goals and current level, I recommend focusing on a progressive strength training program combined with moderate cardio 3-4 times per week.",
      "Looking at your workout history, I notice you&apos;ve been consistent with upper body training but might need more focus on lower body exercises for balanced development.",
      "Your recent progress is impressive! I've analyzed your strength gains and recommend increasing weights by 5-10% for your next workout cycle.",
      "I've created a customized HIIT workout that aligns with your goal of improving cardiovascular endurance while maintaining muscle mass.",
    ];

    // Add meal suggestion if in nutrition panel
    let mealSuggestion: MealSuggestion | undefined;
    if (activePanel === "nutrition") {
      mealSuggestion =
        mealSuggestions[Math.floor(Math.random() * mealSuggestions.length)];
    }

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const selectedResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const aiMessage: AiMessage = {
      id: (Date.now() + 1).toString(),
      content: selectedResponse,
      sender: "ai",
      timestamp: new Date(),
      mealSuggestion: mealSuggestion,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsGenerating(false);
    setUserQuery("");
  };

  const generateWorkoutPlan = async () => {
    setIsGeneratingWorkout(true);

    // Simulate AI generating a workout plan
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newWorkout: WorkoutPlan = {
      id: workoutPlans.length + 1,
      name: "AI Personalized Plan",
      duration: "8 weeks",
      level: "Intermediate",
      focus: "Strength & Conditioning",
      workoutsPerWeek: 4,
      description:
        "Custom AI-generated program based on your fitness assessment, goals, and available equipment. Optimized for maximum results with your schedule.",
      aiGenerated: true,
    };

    setIsGeneratingWorkout(false);
    setSelectedWorkout(newWorkout);
    setShowWorkoutDetails(true);
  };

  // Generate meal plan
  const generateNewMeal = async () => {
    setIsGeneratingMeal(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create a new random meal suggestion
    const mealTypes = [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack",
      "Pre-Workout",
      "Post-Workout",
    ];
    const randomType = mealTypes[Math.floor(Math.random() * mealTypes.length)];

    const newMeal: MealSuggestion = {
      name: `AI Generated ${randomType}`,
      calories: Math.floor(Math.random() * 400) + 200,
      protein: Math.floor(Math.random() * 30) + 15,
      carbs: Math.floor(Math.random() * 50) + 20,
      fat: Math.floor(Math.random() * 15) + 5,
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: ["Step 1", "Step 2", "Step 3"],
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    };

    mealSuggestions.push(newMeal);
    setIsGeneratingMeal(false);
  };

  const simulateFormAnalysis = () => {
    setShowCamera(true);

    // Simulate AI analyzing form
    setTimeout(() => {
      setFormFeedback(
        "Your squat form looks good! Keep your chest up a bit more and ensure your knees track over your toes. I notice you&apos;re shifting weight to your toes - try to keep weight in mid-foot to heel.",
      );
    }, 3000);
  };

  // Logo Component
  const Logo = () => (
    <div className="flex items-center">
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
        <Dumbbell size={20} />
      </div>
      <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
        FitAI
      </span>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => {
    return (
      <AnimatePresence>
        <motion.div
          initial={isMobile ? { x: -280 } : undefined}
          animate={isMobile ? { x: 0 } : undefined}
          exit={isMobile ? { x: -280 } : undefined}
          className={`${
            isMobile
              ? "fixed inset-y-0 left-0 z-40 w-72 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-800/80"
              : "rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/90"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            {isMobile && (
              <motion.button
                className="rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            )}
          </div>

          <nav className="space-y-2">
            <NavItem
              id="dashboard"
              label="Dashboard"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              }
            />

            <NavItem
              id="workouts"
              label="Workout Programs"
              icon={<Dumbbell className="h-5 w-5" />}
            />

            <NavItem
              id="meals"
              label="Meal Plans"
              icon={<Fish className="h-5 w-5" />}
            />

            <NavItem
              id="exercises"
              label="Exercise Library"
              icon={<Activity className="h-5 w-5" />}
            />

            <NavItem
              id="ai-coach"
              label="AI Coach"
              icon={<Sparkles className="h-5 w-5" />}
            />
          </nav>

          <div className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Premium Features</h3>
            <p className="mt-1 text-sm text-violet-100">
              Unlock advanced AI coaching, personalized meal plans, and more!
            </p>
            <motion.button
              className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-violet-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Upgrade Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Nav Item Component
  const NavItem = ({
    id,
    label,
    icon,
  }: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }) => {
    return (
      <motion.button
        onClick={() => {
          setActiveTab(id);
          if (isMobile) setShowMobileMenu(false);
        }}
        className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
          activeTab === id
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            : "text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </motion.button>
    );
  };

  // Nav Button Component
  const NavButton = ({
    id,
    label,
    icon,
  }: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = activeTab === id;

    return (
      <motion.button
        onClick={() => setActiveTab(id)}
        className="flex flex-col items-center p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className={`${isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {icon}
        </div>
        <span
          className={`mt-1 text-xs ${isActive ? "font-medium text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  // Stats Card Component
  const StatsCard = ({ label, value }: { label: string; value: string }) => (
    <motion.div
      className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </motion.div>
  );

  // Insight Card Component
  const InsightCard = ({
    color,
    icon,
    title,
    content,
  }: {
    color: "violet" | "fuchsia" | "indigo";
    icon: React.ReactNode;
    title: string;
    content: string;
  }) => (
    <motion.div
      className={`rounded-lg bg-${color}-600/10 p-4 dark:bg-${color}-900/30`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start">
        <div
          className={`mr-3 mt-1 rounded-full bg-${color}-600/20 p-1.5 dark:bg-${color}-900/50`}
        >
          <span className={`text-${color}-600 dark:text-${color}-300`}>
            {icon}
          </span>
        </div>
        <div>
          <p className={`font-medium text-${color}-800 dark:text-${color}-200`}>
            {title}
          </p>
          <p
            className={`mt-1 text-sm text-${color}-700 dark:text-${color}-300`}
          >
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Metric Card Component
  const MetricCard = ({
    icon,
    label,
    value,
    unit,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit: string;
  }) => (
    <motion.div
      className="rounded-lg bg-gray-50/50 p-3 backdrop-blur-sm dark:bg-gray-700/50"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        {icon}
        <span className="ml-1">{label}</span>
      </div>
      <p className="mt-1 text-xl font-semibold">
        {value} <span className="text-sm font-normal">{unit}</span>
      </p>
    </motion.div>
  );

  // Progress Chart Component with Recharts
  const ProgressChart = () => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold">Your Progress</h3>
        <ResponsiveContainer width="100%" height={300} key={chartKey}>
          <LineChart
            data={progressData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="week"
              label={{
                value: "Week",
                position: "insideBottomRight",
                offset: -5,
              }}
              stroke={darkMode ? "#9ca3af" : "#6b7280"}
            />
            <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#ffffff" : "#000000",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="strength"
              stroke="#8b5cf6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Strength"
            />
            <Line
              type="monotone"
              dataKey="cardio"
              stroke="#06b6d4"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Cardio"
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#ef4444"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Weight (lbs)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Blood Pressure Chart Component with Recharts
  const BloodPressureChart = () => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold">Blood Pressure Trends</h3>
        <ResponsiveContainer width="100%" height={250} key={chartKey}>
          <LineChart
            data={bloodPressureData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                })
              }
              stroke={darkMode ? "#9ca3af" : "#6b7280"}
            />
            <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#ffffff" : "#000000",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#ef4444"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Systolic"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Diastolic"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Glucose Chart Component with Recharts
  const GlucoseChart = () => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="mb-4 text-lg font-semibold">Glucose Levels</h3>
        <ResponsiveContainer width="100%" height={250} key={chartKey}>
          <AreaChart
            data={glucoseData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                })
              }
              stroke={darkMode ? "#9ca3af" : "#6b7280"}
            />
            <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#ffffff" : "#000000",
              }}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
              name="Glucose (mg/dL)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Medication Adherence Chart Component with Recharts
  const MedicationAdherenceChart = () => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-semibold">Workout Adherence</h3>
        <ResponsiveContainer width="100%" height={250} key={chartKey}>
          <BarChart
            data={medicationAdherenceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
            />
            <XAxis dataKey="day" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
            <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#ffffff" : "#000000",
              }}
            />
            <Bar
              dataKey="percentage"
              fill="#8b5cf6"
              name="Adherence (%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Workout Card Component
  const WorkoutCard = ({ workout }: { workout: WorkoutPlan }) => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95 sm:cursor-pointer"
        whileHover={{ y: -5 }}
        onClick={() => handleWorkoutClick(workout)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{workout.name}</h3>
          {workout.aiGenerated && (
            <span className="flex items-center rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/50 dark:text-violet-300">
              <Sparkles size={12} className="mr-1" />
              AI Generated
            </span>
          )}
          {!workout.aiGenerated && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                workout.level === "Beginner"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                  : workout.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
              }`}
            >
              {workout.level}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-violet-100/50 px-2 py-1 text-xs font-medium text-violet-800 backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-200">
            {workout.duration}
          </span>
          <span className="rounded-full bg-violet-100/50 px-2 py-1 text-xs font-medium text-violet-800 backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-200">
            {workout.focus}
          </span>
          <span className="rounded-full bg-violet-100/50 px-2 py-1 text-xs font-medium text-violet-800 backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-200">
            {workout.workoutsPerWeek}x per week
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {workout.description}
        </p>
      </motion.div>
    );
  };

  // Exercise Card Component
  const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
        whileHover={{ y: -5 }}
        onClick={() => handleExerciseClick(exercise)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{exercise.name}</h3>
          {exercise.aiRecommended && (
            <span className="flex items-center rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/50 dark:text-violet-300">
              <Sparkles size={12} className="mr-1" />
              AI Recommended
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-fuchsia-100/50 px-2 py-1 text-xs font-medium text-fuchsia-800 backdrop-blur-sm dark:bg-fuchsia-900/30 dark:text-fuchsia-200">
            {exercise.category}
          </span>
          <span className="rounded-full bg-blue-100/50 px-2 py-1 text-xs font-medium text-blue-800 backdrop-blur-sm dark:bg-blue-900/30 dark:text-blue-200">
            {exercise.equipment}
          </span>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Muscles worked:
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {exercise.muscles.map((muscle, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100/50 px-2 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm dark:bg-gray-700/50 dark:text-gray-300"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Difficulty: {exercise.difficulty}
          </span>
          <motion.button
            className="rounded-full bg-violet-100/50 p-1 text-violet-600 backdrop-blur-sm hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-800/50"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Panel Button Component
  const PanelButton = ({ id, label }: { id: Panel; label: string }) => {
    const isActive = activePanel === id;

    return (
      <motion.button
        className={`relative rounded-xl px-3 py-1 text-sm font-medium ${
          isActive
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            : "bg-gray-100/70 text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/70 dark:text-gray-300 dark:hover:bg-gray-600/70"
        }`}
        onClick={() => setActivePanel(id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
      </motion.button>
    );
  };

  // User Message Component
  const UserMessage = ({ message }: { message: AiMessage }) => (
    <div className="flex items-start justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-white shadow-md">
        <p>{message.content}</p>
      </div>
      <div className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
        <User size={18} />
      </div>
    </div>
  );

  // AI Message Component
  const AIMessage = ({ message }: { message: AiMessage }) => (
    <div className="flex items-start">
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
        <Sparkles size={18} />
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white/90 px-4 py-3 shadow-md backdrop-blur-sm dark:bg-gray-800/90">
        <p className="dark:text-white">{message.content}</p>

        {message.mealSuggestion && (
          <div className="mt-4 overflow-hidden rounded-lg border border-violet-200 bg-violet-50/50 dark:border-violet-900/50 dark:bg-violet-900/20">
            <div className="sm:flex">
              <div className="relative h-24 w-full flex-shrink-0 sm:w-24">
                <Image
                  src={
                    message.mealSuggestion.image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={message.mealSuggestion.name}
                  className="h-full w-full object-cover"
                  width={96}
                  height={96}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <div className="flex items-center">
                    <Utensils
                      size={14}
                      className="mr-1 text-violet-600 dark:text-violet-400"
                    />
                    <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
                      AI Meal Suggestion
                    </p>
                  </div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {message.mealSuggestion.name}
                  </h4>
                  <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{message.mealSuggestion.calories} cal</span>
                    <span>•</span>
                    <span>{message.mealSuggestion.protein}g protein</span>
                  </div>
                </div>
                <button
                  className="self-end text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                  onClick={() => handleMealClick(message.mealSuggestion!)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-2 flex justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCopy(message.content, message.content)}
            className="rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            {copied === message.content ? (
              <CheckCheck className="text-green-500" size={14} />
            ) : (
              <Copy size={14} />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMessageFeedback(message.id, "like")}
            className={`rounded-full p-1 ${
              message.feedback === "like"
                ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            }`}
          >
            <ThumbsUp size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMessageFeedback(message.id, "dislike")}
            className={`rounded-full p-1 ${
              message.feedback === "dislike"
                ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            }`}
          >
            <ThumbsDown size={14} />
          </motion.button>
        </div>
      </div>
    </div>
  );

  // Typing Indicator Component
  const TypingIndicator = () => (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
        <Sparkles size={18} />
      </div>
      <div className="rounded-2xl rounded-tl-none bg-white/90 px-4 py-3 shadow-md backdrop-blur-sm dark:bg-gray-800/90">
        <div className="flex space-x-1">
          <motion.div
            className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 0.8,
              delay: 0,
            }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 0.8,
              delay: 0.2,
            }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 0.8,
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, Brian!</h2>
              <p className="mt-1 text-violet-100">
                Your AI fitness coach is ready to assist
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <Dumbbell size={24} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <StatsCard label="Streak" value="12 days" />
            <StatsCard label="Calories" value="1,240" />
            <StatsCard label="Workouts" value="32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today&apos;s Workout</h3>
            <motion.button
              className="flex items-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={14} className="mr-1" />
              Start
            </motion.button>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between border-b border-gray-200/20 pb-3 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-violet-600/20 p-2 backdrop-blur-sm dark:bg-violet-900/50">
                  <Dumbbell
                    size={16}
                    className="text-violet-600 dark:text-violet-300"
                  />
                </div>
                <div>
                  <p className="font-medium">Upper Body Strength</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    4 exercises · 45 minutes
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Clock size={18} className="text-gray-400" />
              </motion.div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-violet-600/20 p-2 backdrop-blur-sm dark:bg-violet-900/50">
                <Brain
                  size={16}
                  className="text-violet-600 dark:text-violet-300"
                />
              </div>
              <div>
                <p className="font-medium">AI Form Analysis</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get real-time feedback
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800 dark:bg-violet-900/70 dark:text-violet-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={simulateFormAnalysis}
            >
              <Camera size={14} className="mr-1 inline-block" />
              Analyze
            </motion.button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-3 text-lg font-semibold">Weekly Schedule</h3>
          <div className="space-y-3">
            {workoutSchedule.slice(0, 3).map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100/20 pb-2 last:border-0 dark:border-gray-700/50"
              >
                <div className="flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${day.completed ? "bg-green-600/20 text-green-600 dark:bg-green-900/50 dark:text-green-400" : "bg-gray-100/30 dark:bg-gray-700/50"}`}
                  >
                    {day.completed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">
                        {day.day.substring(0, 3)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{day.workout}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={12} className="mr-1" />
                      {day.duration}
                    </div>
                  </div>
                </div>
                <motion.button
                  className="rounded-full bg-gray-100/50 p-1 text-gray-500 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Clock size={16} />
                </motion.button>
              </div>
            ))}
          </div>
          <motion.button
            className="mt-3 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Schedule
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-3 text-lg font-semibold">AI Insights</h3>
          <div className="space-y-3">
            <InsightCard
              color="violet"
              icon={<Sparkles size={16} />}
              title="Workout Optimization"
              content="Based on your recent performance, I recommend increasing your bench press weight by 5lbs and adding an extra set to your bicep curls."
            />
            <InsightCard
              color="fuchsia"
              icon={<Zap size={16} />}
              title="Recovery Alert"
              content="Your sleep quality has decreased this week. Consider adding an extra rest day and focusing on mobility work to enhance recovery."
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-3 text-lg font-semibold">Health Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              icon={<Heart size={14} className="text-red-500" />}
              label="Resting Heart Rate"
              value="68"
              unit="bpm"
            />
            <MetricCard
              icon={<Activity size={14} className="text-green-500" />}
              label="Recovery Score"
              value="85"
              unit="/100"
            />
            <MetricCard
              icon={<Zap size={14} className="text-yellow-500" />}
              label="Energy Level"
              value="High"
              unit=""
            />
            <MetricCard
              icon={<Clock size={14} className="text-blue-500" />}
              label="Sleep Quality"
              value="7.5"
              unit="hrs"
            />
          </div>
        </div>
      </div>

      <ProgressChart />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <BloodPressureChart />
        <GlucoseChart />
      </div>

      <MedicationAdherenceChart />
    </div>
  );

  // Meals View
  const renderMeals = () => {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Meal Plans</h2>
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateNewMeal}
            disabled={isGeneratingMeal}
          >
            {isGeneratingMeal ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} className="mr-2" />
                Generate AI Meal
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mealSuggestions.map((meal, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
              whileHover={{ y: -5 }}
              onClick={() => handleMealClick(meal)}
            >
              <div className="flex items-center justify-between">
                <h3 className="flex-1 truncate text-lg font-semibold">
                  {meal.name}
                </h3>
                <span className="flex items-center rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/50 dark:text-violet-300">
                  <Utensils size={12} className="mr-1" />
                  AI Generated
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {meal.ingredients.slice(0, 3).join(", ")}...
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {meal.calories} calories
                </span>
                <motion.button
                  className="rounded-full bg-violet-100/50 p-1 text-violet-600 backdrop-blur-sm hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-800/50"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Workouts View
  const renderWorkouts = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Workout Programs</h2>
        <motion.button
          className="flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateWorkoutPlan}
          disabled={isGeneratingWorkout}
        >
          {isGeneratingWorkout ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" />
              Generate AI Workout
            </>
          )}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {workoutPlans.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );

  // Exercises View
  const renderExercises = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Exercise Library</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search exercises..."
            className="w-full rounded-xl border border-gray-300/50 bg-white/90 py-2 pl-3 pr-10 text-sm placeholder-gray-500 backdrop-blur-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600/50 dark:bg-gray-700/90 dark:text-white dark:placeholder-gray-400"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exerciseLibrary.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );

  // AI Coach View
  const renderAICoach = () => (
    <div className="flex h-full flex-col p-6">
      <div className="mb-4 overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <div className="items-center justify-between sm:flex">
          <div>
            <h2 className="text-xl font-bold">AI Fitness Coach</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Your personal AI coach is here to help with workouts, nutrition,
              and recovery.
            </p>
          </div>
          <div className="mt-3 flex space-x-2 sm:mt-0">
            <PanelButton id="workout" label="Workout" />
            <PanelButton id="nutrition" label="Nutrition" />
            <PanelButton id="recovery" label="Recovery" />
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto rounded-2xl bg-gray-50/70 p-4 shadow-inner backdrop-blur-sm dark:bg-gray-700/50"
        style={{ maxHeight: "400px" }}
      >
        <div className="space-y-4">
          {messages.map((message) =>
            message.sender === "user" ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AIMessage key={message.id} message={message} />
            ),
          )}
          {isGenerating && <TypingIndicator />}
        </div>
      </div>

      <div className="mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateAIResponse();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder={`Ask about your ${activePanel === "workout" ? "workout plan and exercises" : activePanel === "nutrition" ? "nutrition and diet" : "recovery and rest"}`}
            className="flex-1 rounded-xl border border-gray-300/50 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600/50 dark:bg-gray-700/90 dark:text-white"
          />
          <motion.button
            type="submit"
            disabled={isGenerating || !userQuery.trim()}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-medium text-white shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? "Thinking..." : "Send"}
          </motion.button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 transition-colors dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 dark:text-white">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <motion.button
                className="mr-3 rounded-xl bg-white/90 p-2 text-gray-700 shadow-md backdrop-blur-xl dark:bg-gray-800/90 dark:text-gray-200"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={20} />
              </motion.button>
            )}
            <Logo />
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleDarkMode}
              className="rounded-xl bg-white/90 p-2 text-gray-700 shadow-md backdrop-blur-xl dark:bg-gray-800/90 dark:text-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.div
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={18} />
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {(!isMobile || showMobileMenu) && <Sidebar />}

          <main className="mb-20 min-h-[80vh] overflow-hidden rounded-2xl bg-white/90 shadow-xl backdrop-blur-xl dark:bg-gray-800/90 md:mb-0">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "workouts" && renderWorkouts()}
            {activeTab === "exercises" && renderExercises()}
            {activeTab === "meals" && renderMeals()}
            {activeTab === "ai-coach" && renderAICoach()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/30 bg-white/80 py-2 backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-800/80">
          <div className="container mx-auto flex items-center justify-around">
            <NavButton
              id="dashboard"
              label="Home"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              }
            />
            <NavButton
              id="workouts"
              label="Workouts"
              icon={<Dumbbell className="h-6 w-6" />}
            />
            <NavButton
              id="exercises"
              label="Exercises"
              icon={<Activity className="h-6 w-6" />}
            />
            <NavButton
              id="meals"
              label="Meals"
              icon={<Fish className="h-6 w-6" />}
            />
            <NavButton
              id="ai-coach"
              label="AI Coach"
              icon={<Sparkles className="h-6 w-6" />}
            />
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------Modals------------------------------------------------------------------------------------------- */}
      {/* Workout details */}
      <AnimatePresence>
        {showWorkoutDetails && selectedWorkout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowWorkoutDetails(false)}
          >
            <motion.div
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowWorkoutDetails(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              <div className="flex items-center">
                {selectedWorkout.aiGenerated && (
                  <div className="mr-3 rounded-full bg-violet-600/20 p-2 dark:bg-violet-900/50">
                    <Sparkles
                      size={20}
                      className="text-violet-600 dark:text-violet-300"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-bold">{selectedWorkout.name}</h2>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {!selectedWorkout.aiGenerated && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      selectedWorkout.level === "Beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                        : selectedWorkout.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                    }`}
                  >
                    {selectedWorkout.level}
                  </span>
                )}
                <span className="rounded-full bg-violet-100/50 px-2 py-1 text-xs font-medium text-violet-800 backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-200">
                  {selectedWorkout.duration}
                </span>
                <span className="rounded-full bg-violet-100/50 px-2 py-1 text-xs font-medium text-violet-800 backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-200">
                  {selectedWorkout.focus}
                </span>
                <span className="rounded-full bg-violet-100/50 px-2 py-1 text-xs font-medium text-violet-800 backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-200">
                  {selectedWorkout.workoutsPerWeek}x per week
                </span>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {selectedWorkout.description}
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Weekly Schedule</h3>
                <div className="mt-2 space-y-3">
                  {Array.from({ length: selectedWorkout.workoutsPerWeek }).map(
                    (_, index) => (
                      <motion.div
                        key={index}
                        className="rounded-lg bg-gray-50/70 p-3 backdrop-blur-sm dark:bg-gray-700/70"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 rounded-full bg-violet-100/80 p-2 dark:bg-violet-900/50">
                              <Dumbbell
                                size={16}
                                className="text-violet-600 dark:text-violet-300"
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {selectedWorkout.focus === "Muscle gain"
                                  ? `Day ${index + 1}: ${["Push", "Pull", "Legs", "Upper Body"][index % 4]}`
                                  : selectedWorkout.focus === "Fat loss"
                                    ? `Day ${index + 1}: ${["HIIT", "Strength", "Cardio", "Circuit", "Active Recovery"][index % 5]}`
                                    : `Day ${index + 1}: ${["Full Body", "Cardio", "Mobility", "Strength"][index % 4]}`}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {Math.floor(Math.random() * 5) + 4} exercises ·{" "}
                                {Math.floor(Math.random() * 30) + 30} minutes
                              </p>
                            </div>
                          </div>
                          <motion.button
                            className="rounded-full bg-gray-200/80 p-1 text-gray-600 backdrop-blur-sm hover:bg-gray-300 dark:bg-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-500"
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowWorkoutDetails(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Program
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meals details */}
      <AnimatePresence>
        {showMealDetails && selectedMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowMealDetails(false)}
          >
            <motion.div
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowMealDetails(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              <h2 className="text-2xl font-bold">{selectedMeal.name}</h2>

              <div className="mt-4 grid grid-cols-4 gap-3">
                <div className="rounded-lg bg-violet-100/50 p-3 text-center dark:bg-violet-900/30">
                  <p className="text-sm text-violet-800 dark:text-violet-200">
                    Calories
                  </p>
                  <p className="text-lg font-bold text-violet-900 dark:text-violet-100">
                    {selectedMeal.calories}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-100/50 p-3 text-center dark:bg-blue-900/30">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Protein
                  </p>
                  <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {selectedMeal.protein}g
                  </p>
                </div>
                <div className="rounded-lg bg-green-100/50 p-3 text-center dark:bg-green-900/30">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Carbs
                  </p>
                  <p className="text-lg font-bold text-green-900 dark:text-green-100">
                    {selectedMeal.carbs}g
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-100/50 p-3 text-center dark:bg-yellow-900/30">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Fat
                  </p>
                  <p className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
                    {selectedMeal.fat}g
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold">Ingredients</h3>
                  <ul className="mt-2 space-y-2">
                    {selectedMeal.ingredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="mr-2 h-2 w-2 rounded-full bg-violet-600"></div>
                        <span>{ingredient}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100/70 p-4 backdrop-blur-sm dark:bg-gray-700/70">
                  <motion.div
                    className="relative h-48 w-48 overflow-hidden rounded-lg bg-white/90 shadow-md dark:bg-gray-600/90"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={
                        selectedMeal.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={selectedMeal.name}
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                    />
                  </motion.div>
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Perfect for{" "}
                      {selectedMeal.protein > 30
                        ? "muscle building"
                        : selectedMeal.carbs > 40
                          ? "energy"
                          : "recovery"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Instructions</h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
                  {selectedMeal.instructions.map((instruction, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {instruction}
                    </motion.li>
                  ))}
                </ol>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">AI Nutrition Insights</h3>
                <motion.div
                  className="mt-2 rounded-lg bg-violet-600/10 p-4 dark:bg-violet-900/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 rounded-full bg-violet-600/20 p-1.5 dark:bg-violet-900/50">
                      <Sparkles
                        size={16}
                        className="text-violet-600 dark:text-violet-300"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-violet-800 dark:text-violet-200">
                        Nutrition Tips
                      </p>
                      <p className="mt-1 text-sm text-violet-700 dark:text-violet-300">
                        This meal is optimized for your{" "}
                        {selectedMeal.protein > 30
                          ? "muscle building goals"
                          : selectedMeal.carbs > 40
                            ? "high-intensity workout"
                            : "recovery day"}
                        . The{" "}
                        {selectedMeal.protein > 30
                          ? "high protein content"
                          : selectedMeal.carbs > 40
                            ? "balanced carbohydrates"
                            : "nutrient profile"}{" "}
                        will help you
                        {selectedMeal.protein > 30
                          ? " build and repair muscle tissue"
                          : selectedMeal.carbs > 40
                            ? " maintain energy levels during your workout"
                            : " recover effectively"}
                        .
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowMealDetails(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
                <motion.button
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Meal Plan
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise details */}
      <AnimatePresence>
        {showExerciseDetails && selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowExerciseDetails(false)}
          >
            <motion.div
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowExerciseDetails(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              <h2 className="text-2xl font-bold">{selectedExercise.name}</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-fuchsia-100/50 px-2 py-1 text-xs font-medium text-fuchsia-800 backdrop-blur-sm dark:bg-fuchsia-900/30 dark:text-fuchsia-200">
                  {selectedExercise.category}
                </span>
                <span className="rounded-full bg-blue-100/50 px-2 py-1 text-xs font-medium text-blue-800 backdrop-blur-sm dark:bg-blue-900/30 dark:text-blue-200">
                  {selectedExercise.equipment}
                </span>
                <span className="rounded-full bg-yellow-100/50 px-2 py-1 text-xs font-medium text-yellow-800 backdrop-blur-sm dark:bg-yellow-900/30 dark:text-yellow-200">
                  {selectedExercise.difficulty}
                </span>
                {selectedExercise.aiRecommended && (
                  <span className="flex items-center rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/50 dark:text-violet-300">
                    <Sparkles size={12} className="mr-1" />
                    AI Recommended
                  </span>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold">Muscles Worked</h3>
                  <div className="mt-2 space-y-2">
                    {selectedExercise.muscles.map((muscle, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="mr-2 h-2 w-2 rounded-full bg-violet-600"></div>
                        <span>{muscle}</span>
                      </motion.div>
                    ))}
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">Instructions</h3>
                  <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Start in the proper position with good form
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Engage your core and maintain proper breathing
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Execute the movement with controlled tempo
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Focus on the target muscles throughout the exercise
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Complete the full range of motion for maximum benefit
                    </motion.li>
                  </ol>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100/70 p-4 backdrop-blur-sm dark:bg-gray-700/70">
                  <motion.div
                    className="relative h-48 w-48 overflow-hidden rounded-lg bg-white/90 shadow-md dark:bg-gray-600/90"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      alt={selectedExercise.name}
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                    />
                  </motion.div>
                  <motion.button
                    className="mt-4 flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={16} className="mr-2" />
                    Watch Tutorial
                  </motion.button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">AI Form Analysis</h3>
                <motion.div
                  className="mt-2 rounded-lg bg-violet-600/10 p-4 dark:bg-violet-900/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 rounded-full bg-violet-600/20 p-1.5 dark:bg-violet-900/50">
                      <Sparkles
                        size={16}
                        className="text-violet-600 dark:text-violet-300"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-violet-800 dark:text-violet-200">
                        Form Tips
                      </p>
                      <p className="mt-1 text-sm text-violet-700 dark:text-violet-300">
                        Based on your previous workouts, I&apos;ve noticed you
                        tend to round your back during {selectedExercise.name}.
                        Focus on maintaining a neutral spine and engaging your
                        core throughout the movement.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowExerciseDetails(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
                <motion.button
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Workout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Form analysis */}
      <AnimatePresence mode="wait">
        {showCamera && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 overflow-hidden bg-black/90 p-3 backdrop-blur-lg"
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-white">
                  AI Form Analysis
                </h3>
                <motion.button
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
                  onClick={() => setShowCamera(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <motion.div
                  className="relative h-64 w-full overflow-hidden rounded-lg bg-black"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      alt="Camera feed"
                      className="h-full w-full object-cover"
                      width={500}
                      height={300}
                    />
                    {!formFeedback && (
                      <div className="absolute flex flex-col items-center">
                        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
                        <p className="mt-4 text-white">
                          Analyzing your form...
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {formFeedback && (
                  <motion.div
                    className="mt-4 w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 rounded-full bg-white/20 p-1.5">
                        <Sparkles size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium">AI Form Analysis</p>
                        <p className="mt-1 text-sm text-indigo-100">
                          {formFeedback}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }

        .dark .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .dark .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AIFitnessCoach;
