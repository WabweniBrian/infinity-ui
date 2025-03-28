"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Apple,
  Award,
  BarChart,
  Brain,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  Moon,
  Plus,
  Smile,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";

type Goal = {
  current: string;
  target: string;
  timeline: string;
};

type Goals = {
  weight: Goal;
  activity: Goal;
  nutrition: Goal;
  sleep: Goal;
  mindfulness: Goal;
};

type Habit = {
  id: string;
  name: string;
  frequency: string;
  timeOfDay: string;
  reminder: boolean;
};

type Preferences = {
  dietType: string;
  activityLevel: string;
  sleepHours: string;
  stressLevel: string;
};

type FormData = {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  primaryGoal: string;
  goals: Goals;
  habits: Habit[];
  challenges: string[];
  preferences: Preferences;
  notes: string;
};

const WellnessGoalFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    primaryGoal: "weight",
    goals: {
      weight: {
        current: "",
        target: "",
        timeline: "12",
      },
      activity: {
        current: "",
        target: "",
        timeline: "4",
      },
      nutrition: {
        current: "",
        target: "",
        timeline: "4",
      },
      sleep: {
        current: "",
        target: "",
        timeline: "2",
      },
      mindfulness: {
        current: "",
        target: "",
        timeline: "4",
      },
    },
    habits: [
      {
        id: "1",
        name: "",
        frequency: "daily",
        timeOfDay: "morning",
        reminder: true,
      },
    ],
    challenges: [],
    preferences: {
      dietType: "balanced",
      activityLevel: "moderate",
      sleepHours: "7-8",
      stressLevel: "moderate",
    },
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeGoalType, setActiveGoalType] = useState("weight");

  const totalSteps = 4;

  // Goal types
  const goalTypes = [
    {
      id: "weight",
      name: "Weight Management",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      id: "activity",
      name: "Physical Activity",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    { id: "nutrition", name: "Nutrition", icon: <Apple className="h-5 w-5" /> },
    { id: "sleep", name: "Sleep", icon: <Moon className="h-5 w-5" /> },
    {
      id: "mindfulness",
      name: "Mindfulness",
      icon: <Brain className="h-5 w-5" />,
    },
  ];

  // Diet types
  const dietTypes = [
    { id: "balanced", name: "Balanced" },
    { id: "vegetarian", name: "Vegetarian" },
    { id: "vegan", name: "Vegan" },
    { id: "keto", name: "Keto" },
    { id: "paleo", name: "Paleo" },
    { id: "mediterranean", name: "Mediterranean" },
  ];

  // Activity levels
  const activityLevels = [
    { id: "sedentary", name: "Sedentary" },
    { id: "light", name: "Light" },
    { id: "moderate", name: "Moderate" },
    { id: "active", name: "Active" },
    { id: "very-active", name: "Very Active" },
  ];

  // Sleep hours
  const sleepHours = [
    { id: "less-6", name: "Less than 6 hours" },
    { id: "6-7", name: "6-7 hours" },
    { id: "7-8", name: "7-8 hours" },
    { id: "8-9", name: "8-9 hours" },
    { id: "more-9", name: "More than 9 hours" },
  ];

  // Stress levels
  const stressLevels = [
    { id: "low", name: "Low" },
    { id: "moderate", name: "Moderate" },
    { id: "high", name: "High" },
  ];

  // Common challenges
  const commonChallenges = [
    { id: "time", name: "Lack of time" },
    { id: "motivation", name: "Low motivation" },
    { id: "knowledge", name: "Lack of knowledge" },
    { id: "stress", name: "High stress" },
    { id: "sleep", name: "Poor sleep" },
    { id: "social", name: "Social pressure" },
    { id: "injury", name: "Injury or health condition" },
    { id: "consistency", name: "Maintaining consistency" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const parts = name.split(".");

      if (parts.length === 2) {
        const [parent, child] = parts;

        if (
          parent in prev &&
          typeof prev[parent as keyof typeof prev] === "object"
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
              [child]: value,
            },
          };
        }
      } else if (parts.length === 3) {
        const [parent, child, subChild] = parts;

        if (
          parent in prev &&
          typeof prev[parent as keyof typeof prev] === "object" &&
          child in
            (prev[parent as keyof typeof prev] as Record<string, unknown>)
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
              [child]: {
                ...((
                  prev[parent as keyof typeof prev] as Record<string, unknown>
                )[child] as Record<string, unknown>),
                [subChild]: value,
              },
            },
          };
        }
      }

      return { ...prev, [name]: value };
    });
  };

  const handlePrimaryGoalChange = (goalType: string) => {
    setFormData((prev) => ({ ...prev, primaryGoal: goalType }));
    setActiveGoalType(goalType);
  };

  const handleChallengeToggle = (challenge: string) => {
    setFormData((prev) => {
      const currentChallenges = prev.challenges;
      const newChallenges = currentChallenges.includes(challenge)
        ? currentChallenges.filter((c) => c !== challenge)
        : [...currentChallenges, challenge];

      return {
        ...prev,
        challenges: newChallenges,
      };
    });
  };

  const handleAddHabit = () => {
    const newHabit = {
      id: Date.now().toString(),
      name: "",
      frequency: "daily",
      timeOfDay: "morning",
      reminder: true,
    };

    setFormData((prev) => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  };

  const handleRemoveHabit = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      habits: prev.habits.filter((habit) => habit.id !== id),
    }));
  };

  const handleHabitChange = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === id ? { ...habit, [field]: value } : habit,
      ),
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form Data:", formData);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
    selected: {
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <Heart className="h-5 w-5" />;
      case 2:
        return <Activity className="h-5 w-5" />;
      case 3:
        return <Calendar className="h-5 w-5" />;
      case 4:
        return <BarChart className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Profile";
      case 2:
        return "Goals";
      case 3:
        return "Habits";
      case 4:
        return "Preferences";
      default:
        return "Step";
    }
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return null;

    const heightInMeters = parseFloat(formData.height) / 100;
    const weightInKg = parseFloat(formData.weight);

    if (
      isNaN(heightInMeters) ||
      isNaN(weightInKg) ||
      heightInMeters <= 0 ||
      weightInKg <= 0
    )
      return null;

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const bmi = calculateBMI();

  // Get BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl md:p-12"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <Award className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Your Wellness Plan is Ready!
              </h2>
              <p className="mx-auto max-w-md text-gray-600">
                We&apos;ve created your personalized wellness plan based on your
                goals. Track your progress, build healthy habits, and achieve
                your wellness goals!
              </p>
            </div>

            <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white">
              <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold">
                      Hello, {formData.name}!
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4" />
                      <span>
                        Your{" "}
                        {formData.primaryGoal.charAt(0).toUpperCase() +
                          formData.primaryGoal.slice(1)}{" "}
                        Journey
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/20 px-3 py-1 text-sm backdrop-blur-md">
                    {bmi && `BMI: ${bmi}`}
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Activity className="h-4 w-4" /> Primary Goal
                    </h4>
                    <p className="text-sm">
                      {
                        formData.goals[
                          formData.primaryGoal as keyof typeof formData.goals
                        ].current
                      }{" "}
                      →{" "}
                      {
                        formData.goals[
                          formData.primaryGoal as keyof typeof formData.goals
                        ].target
                      }
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" /> Timeline
                    </h4>
                    <p className="text-sm">
                      {
                        formData.goals[
                          formData.primaryGoal as keyof typeof formData.goals
                        ].timeline
                      }{" "}
                      weeks
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Zap className="h-4 w-4" /> Habits
                    </h4>
                    <p className="text-sm">
                      {formData.habits.length} daily habits
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
              >
                <Heart className="h-5 w-5" />
                Create Another Plan
              </button>
              <button
                onClick={() => alert("Opening dashboard!")}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <BarChart className="h-5 w-5" />
                View Wellness Dashboard
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header and progress */}
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Wellness Goal Planner
                </h2>
                <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600">
                  Step {step} of {totalSteps}
                </div>
              </div>

              {/* Progress steps */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200"></div>
                <div className="relative flex justify-between">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                          i + 1 < step
                            ? "bg-emerald-600 text-white"
                            : i + 1 === step
                              ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                              : "border-2 border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        {i + 1 < step ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          getStepIcon(i + 1)
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs ${i + 1 <= step ? "font-medium text-emerald-600" : "text-gray-500"}`}
                      >
                        {getStepTitle(i + 1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Personal Information
                    </motion.h3>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="age"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Age
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          min="1"
                          max="120"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          placeholder="Your age"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="gender"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="height"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          id="height"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          required
                          min="50"
                          max="250"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          placeholder="Height in centimeters"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="weight"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          required
                          min="1"
                          max="500"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          placeholder="Weight in kilograms"
                        />
                      </div>
                    </motion.div>

                    {bmi && bmiCategory && (
                      <motion.div
                        variants={itemVariants}
                        className="rounded-2xl bg-gray-50 p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                            <Activity className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="mb-2 font-medium text-gray-900">
                              Your BMI: {bmi}
                            </h4>
                            <p className="mb-2 text-sm text-gray-600">
                              Your BMI indicates that you are in the{" "}
                              <span className={bmiCategory.color}>
                                {bmiCategory.category}
                              </span>{" "}
                              range.
                            </p>
                            <p className="text-xs text-gray-500">
                              BMI is a screening tool, not a diagnostic tool.
                              Consult with a healthcare provider for a complete
                              health assessment.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Set Your Goals
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-medium text-gray-700">
                        Select your primary goal
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
                        {goalTypes.map((goal) => (
                          <motion.div
                            key={goal.id}
                            variants={cardVariants}
                            whileHover="hover"
                            animate={
                              formData.primaryGoal === goal.id
                                ? "selected"
                                : "visible"
                            }
                            onClick={() => handlePrimaryGoalChange(goal.id)}
                            className={`relative cursor-pointer rounded-xl border-2 bg-white p-4 transition-all ${
                              formData.primaryGoal === goal.id
                                ? "border-emerald-600"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div
                                className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                  formData.primaryGoal === goal.id
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {goal.icon}
                              </div>
                              <h4 className="text-sm font-medium">
                                {goal.name}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-gray-50 p-6"
                    >
                      <h4 className="mb-4 font-medium text-gray-900">
                        {goalTypes.find((g) => g.id === activeGoalType)?.name}{" "}
                        Details
                      </h4>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <label
                            htmlFor={`goals.${activeGoalType}.current`}
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Current Status
                          </label>
                          <input
                            type="text"
                            id={`goals.${activeGoalType}.current`}
                            name={`goals.${activeGoalType}.current`}
                            value={
                              formData.goals[
                                activeGoalType as keyof typeof formData.goals
                              ].current
                            }
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                            placeholder={
                              activeGoalType === "weight"
                                ? "e.g., 75 kg"
                                : activeGoalType === "activity"
                                  ? "e.g., 2 days/week"
                                  : activeGoalType === "nutrition"
                                    ? "e.g., 2 servings/day"
                                    : activeGoalType === "sleep"
                                      ? "e.g., 6 hours/night"
                                      : "e.g., 0 min/day"
                            }
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`goals.${activeGoalType}.target`}
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Target Goal
                          </label>
                          <input
                            type="text"
                            id={`goals.${activeGoalType}.target`}
                            name={`goals.${activeGoalType}.target`}
                            value={
                              formData.goals[
                                activeGoalType as keyof typeof formData.goals
                              ].target
                            }
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                            placeholder={
                              activeGoalType === "weight"
                                ? "e.g., 70 kg"
                                : activeGoalType === "activity"
                                  ? "e.g., 5 days/week"
                                  : activeGoalType === "nutrition"
                                    ? "e.g., 5 servings/day"
                                    : activeGoalType === "sleep"
                                      ? "e.g., 8 hours/night"
                                      : "e.g., 15 min/day"
                            }
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`goals.${activeGoalType}.timeline`}
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Timeline (weeks)
                          </label>
                          <select
                            id={`goals.${activeGoalType}.timeline`}
                            name={`goals.${activeGoalType}.timeline`}
                            value={
                              formData.goals[
                                activeGoalType as keyof typeof formData.goals
                              ].timeline
                            }
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                              backgroundPosition: "right 1rem center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "1.5em 1.5em",
                              paddingRight: "2.5rem",
                            }}
                          >
                            <option value="1">1 week</option>
                            <option value="2">2 weeks</option>
                            <option value="4">4 weeks</option>
                            <option value="8">8 weeks</option>
                            <option value="12">12 weeks</option>
                            <option value="16">16 weeks</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-medium text-gray-700">
                        What challenges do you face? (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                        {commonChallenges.map((challenge) => (
                          <div
                            key={challenge.id}
                            onClick={() => handleChallengeToggle(challenge.id)}
                            className={`cursor-pointer rounded-xl px-4 py-3 transition-all ${
                              formData.challenges.includes(challenge.id)
                                ? "border border-emerald-200 bg-emerald-100 text-emerald-700"
                                : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`mr-2 flex h-5 w-5 items-center justify-center rounded ${
                                  formData.challenges.includes(challenge.id)
                                    ? "bg-emerald-500 text-white"
                                    : "border border-gray-300 bg-white"
                                }`}
                              >
                                {formData.challenges.includes(challenge.id) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span className="text-sm">{challenge.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Build Your Habits
                    </motion.h3>

                    <motion.div
                      variants={itemVariants}
                      className="mb-6 rounded-2xl bg-emerald-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Habit Building
                          </h4>
                          <p className="text-sm text-gray-600">
                            Small, consistent habits lead to big results. Add
                            the habits you want to build to support your{" "}
                            {formData.primaryGoal} goal.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {formData.habits.map((habit, index) => (
                      <motion.div
                        key={habit.id}
                        variants={itemVariants}
                        className="relative rounded-2xl border border-gray-200 bg-white p-6"
                      >
                        {formData.habits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveHabit(habit.id)}
                            className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 transition-colors hover:bg-gray-200"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </button>
                        )}

                        <h4 className="mb-4 font-medium text-gray-900">
                          Habit {index + 1}
                        </h4>

                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`habit-name-${habit.id}`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Habit Name
                            </label>
                            <input
                              type="text"
                              id={`habit-name-${habit.id}`}
                              value={habit.name}
                              onChange={(e) =>
                                handleHabitChange(
                                  habit.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                              placeholder="e.g., Drink water, Take a walk, Meditate"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`habit-frequency-${habit.id}`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Frequency
                            </label>
                            <select
                              id={`habit-frequency-${habit.id}`}
                              value={habit.frequency}
                              onChange={(e) =>
                                handleHabitChange(
                                  habit.id,
                                  "frequency",
                                  e.target.value,
                                )
                              }
                              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                              style={{
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                                backgroundPosition: "right 1rem center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "1.5em 1.5em",
                                paddingRight: "2.5rem",
                              }}
                            >
                              <option value="daily">Daily</option>
                              <option value="weekdays">Weekdays</option>
                              <option value="weekends">Weekends</option>
                              <option value="weekly">Weekly</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`habit-time-${habit.id}`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Time of Day
                            </label>
                            <select
                              id={`habit-time-${habit.id}`}
                              value={habit.timeOfDay}
                              onChange={(e) =>
                                handleHabitChange(
                                  habit.id,
                                  "timeOfDay",
                                  e.target.value,
                                )
                              }
                              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                              style={{
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                                backgroundPosition: "right 1rem center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "1.5em 1.5em",
                                paddingRight: "2.5rem",
                              }}
                            >
                              <option value="morning">Morning</option>
                              <option value="afternoon">Afternoon</option>
                              <option value="evening">Evening</option>
                              <option value="anytime">Anytime</option>
                            </select>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`habit-reminder-${habit.id}`}
                              checked={habit.reminder}
                              onChange={(e) =>
                                handleHabitChange(
                                  habit.id,
                                  "reminder",
                                  e.target.checked,
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <label
                              htmlFor={`habit-reminder-${habit.id}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              Set reminder for this habit
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center"
                    >
                      <button
                        type="button"
                        onClick={handleAddHabit}
                        className="flex items-center gap-2 rounded-full bg-emerald-50 px-6 py-3 text-emerald-700 transition-colors hover:bg-emerald-100"
                      >
                        <Plus className="h-4 w-4" />
                        Add Another Habit
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Preferences & Finalize
                    </motion.h3>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="dietType"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Diet Preference
                        </label>
                        <select
                          id="dietType"
                          name="preferences.dietType"
                          value={formData.preferences.dietType}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: "right 1rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem",
                          }}
                        >
                          {dietTypes.map((diet) => (
                            <option key={diet.id} value={diet.id}>
                              {diet.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="activityLevel"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Current Activity Level
                        </label>
                        <select
                          id="activityLevel"
                          name="preferences.activityLevel"
                          value={formData.preferences.activityLevel}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: "right 1rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem",
                          }}
                        >
                          {activityLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                              {level.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="sleepHours"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Average Sleep
                        </label>
                        <select
                          id="sleepHours"
                          name="preferences.sleepHours"
                          value={formData.preferences.sleepHours}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: "right 1rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem",
                          }}
                        >
                          {sleepHours.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="stressLevel"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Stress Level
                        </label>
                        <select
                          id="stressLevel"
                          name="preferences.stressLevel"
                          value={formData.preferences.stressLevel}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: "right 1rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem",
                          }}
                        >
                          {stressLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                              {level.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="notes"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        placeholder="Any additional information you'd like to share about your wellness goals..."
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-emerald-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Smile className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Almost There!
                          </h4>
                          <p className="text-sm text-gray-600">
                            You&apos;re about to create your personalized
                            wellness plan. We&apos;ll use your information to
                            create a tailored plan to help you reach your{" "}
                            {formData.primaryGoal} goals.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 transition-colors ${
                    step === 1
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
                  >
                    Continue
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
                  >
                    Create Wellness Plan
                    <Check className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WellnessGoalFlow;
