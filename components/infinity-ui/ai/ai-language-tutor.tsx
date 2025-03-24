"use client";

import {
  ChatMessage,
  conversations,
  initialChatMessages,
  lessons,
  PracticeExercise,
  practiceExercises,
  skillProgress,
  vocabulary,
  weeklyProgress,
} from "@/data/ai-language";
import useMediaQuery from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BarChartIcon,
  Book,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Globe,
  List,
  MessageCircle,
  Mic,
  MicOff,
  Moon,
  MoreHorizontal,
  Play,
  Plus,
  Repeat,
  Search,
  Sparkles,
  Star,
  Sun,
  User,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AILanguageTutor() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentExercise, setCurrentExercise] =
    useState<PracticeExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [showAIChat, setShowAIChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("French");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(initialChatMessages);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const userQueryRef = useRef<HTMLInputElement>(null);

  const languages = [
    "French",
    "Spanish",
    "German",
    "Italian",
    "Japanese",
    "Mandarin",
    "Russian",
  ];

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
  }, [chatMessages]);

  useEffect(() => {
    // Set a random exercise when the practice tab is opened
    if (activeTab === "practice" && !currentExercise) {
      const randomIndex = Math.floor(Math.random() * practiceExercises.length);
      setCurrentExercise(practiceExercises[randomIndex]);
      setUserAnswer("");
      setShowAnswer(false);
      setIsCorrect(null);
    }
  }, [activeTab, currentExercise]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const checkAnswer = () => {
    if (!currentExercise || !userAnswer.trim()) return;

    const isAnswerCorrect =
      userAnswer.trim().toLowerCase() ===
      currentExercise.correctAnswer.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);
  };

  const nextExercise = () => {
    const currentIndex = practiceExercises.findIndex(
      (ex) => ex.id === currentExercise?.id,
    );
    const nextIndex = (currentIndex + 1) % practiceExercises.length;
    setCurrentExercise(practiceExercises[nextIndex]);
    setUserAnswer("");
    setShowAnswer(false);
    setIsCorrect(null);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);

    // Simulate recording for 3 seconds then stopping
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        // Simulate a response
        generateAIResponse();
      }, 3000);
    }
  };

  const generateAIResponse = async () => {
    if ((!userQuery.trim() && !isRecording) || isGenerating) return;

    const query = userQuery || 'Comment dit-on "hello" en français?';
    setUserQuery("");

    // Add user message to chat
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: query,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    setIsGenerating(true);

    // Simulate AI response generation with streaming effect
    const responses = [
      'La phrase "Je voudrais un café" se traduit par "I would like a coffee" en anglais. C\'est une façon polie de commander dans un café ou un restaurant. Vous pouvez aussi dire "Je prends un café" qui est un peu moins formel.',

      'Pour dire "Où est la bibliothèque?", vous devez prononcer: "oo eh la bee-blee-oh-tek?". Essayez de pratiquer cette phrase en accentuant légèrement la dernière syllabe, comme c\'est typique en français.',

      'Le verbe "aller" (to go) est irrégulier en français. Sa conjugaison au présent est: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont. Essayez de former quelques phrases simples avec ce verbe.',

      "Votre prononciation du mot \"restaurant\" s'améliore! Rappelez-vous que le 'r' français est légèrement roulé à l'arrière de la gorge, et que la dernière syllabe (-rant) a une nasalisation. Continuez à pratiquer!",
    ];

    const selectedResponse =
      responses[Math.floor(Math.random() * responses.length)];
    let displayedResponse = "";

    // Create AI message placeholder
    const aiMessageId = `ai-${Date.now()}`;
    const newAiMessage: ChatMessage = {
      id: aiMessageId,
      sender: "ai",
      content: "",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newAiMessage]);

    // Stream the response
    for (let i = 0; i < selectedResponse.length; i++) {
      displayedResponse += selectedResponse[i];

      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, content: displayedResponse } : msg,
        ),
      );

      // Add random delay between characters to simulate typing
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 10 + 10),
      );
    }

    setIsGenerating(false);
  };

  const renderProgressChart = () => {
    return (
      <div className="mt-4 overflow-hidden rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Weekly Progress
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyProgress}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="day"
                tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              />
              <YAxis
                tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                label={{
                  value: "Minutes",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                  color: darkMode ? "#e5e7eb" : "#4b5563",
                }}
              />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorMinutes)"
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Total learning time this week:{" "}
          {weeklyProgress.reduce((sum, day) => sum + day.minutes, 0)} minutes
        </div>
      </div>
    );
  };

  const renderSkillsChart = () => {
    return (
      <div className="mt-4 overflow-hidden rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Skill Progress
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={skillProgress}
            >
              <PolarGrid stroke={darkMode ? "#374151" : "#e5e7eb"} />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              />
              <Radar
                name="Skills"
                dataKey="progress"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
                animationDuration={1500}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                  color: darkMode ? "#e5e7eb" : "#4b5563",
                }}
                formatter={(value) => [`${value}%`, "Progress"]}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderStreakChart = () => {
    const streakData = [
      { day: "Mon", streak: 1, color: "#8b5cf6" },
      { day: "Tue", streak: 1, color: "#8b5cf6" },
      { day: "Wed", streak: 1, color: "#8b5cf6" },
      { day: "Thu", streak: 1, color: "#8b5cf6" },
      { day: "Fri", streak: 1, color: "#8b5cf6" },
      { day: "Sat", streak: 1, color: "#8b5cf6" },
      { day: "Sun", streak: 1, color: "#8b5cf6" },
    ];

    return (
      <div className="mt-4 overflow-hidden rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Daily Streak
        </h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={streakData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="day"
                tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              />
              <YAxis
                tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                domain={[0, 1]}
                ticks={[0, 1]}
                tickFormatter={(value) =>
                  value === 1 ? "Completed" : "Missed"
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                  color: darkMode ? "#e5e7eb" : "#4b5563",
                }}
                formatter={(value) => [
                  value === 1 ? "Completed" : "Missed",
                  "Status",
                ]}
              />
              <Bar
                dataKey="streak"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          You&apos;ve maintained your streak for 7 days in a row!
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg dark:from-purple-800 dark:to-indigo-900"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Bonjour, Alex!</h2>
            <p className="mt-1 text-purple-100">
              Your {selectedLanguage} learning journey
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center rounded-full bg-white/20 px-3 py-2 backdrop-blur-sm transition-all hover:bg-white/30"
            >
              <Globe size={18} className="mr-2" />
              {selectedLanguage}
              <ChevronDown size={16} className="ml-1" />
            </button>

            <AnimatePresence>
              {showLanguageSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg bg-white shadow-lg dark:bg-gray-800"
                >
                  {languages.map((language) => (
                    <button
                      key={language}
                      className={`flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        selectedLanguage === language
                          ? "bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-200"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setShowLanguageSelector(false);
                      }}
                    >
                      {selectedLanguage === language && (
                        <Check size={16} className="mr-2" />
                      )}
                      {language}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Current Streak</p>
            <p className="text-xl font-bold">7 days</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Words Learned</p>
            <p className="text-xl font-bold">128</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Lessons Completed</p>
            <p className="text-xl font-bold">12</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Current Level</p>
            <p className="text-xl font-bold">Beginner</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {renderProgressChart()}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {renderSkillsChart()}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {renderStreakChart()}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Continue Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Continue Learning
            </h3>
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
              60% Complete
            </span>
          </div>
          <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
            <h4 className="font-medium dark:text-white">
              Basic Grammar: Present Tense
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Learn how to conjugate regular verbs in the present tense
            </p>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  60%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full rounded-full bg-purple-600"
                ></motion.div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
            >
              Continue Lesson
            </motion.button>
          </div>
        </motion.div>

        {/* Daily Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-3 text-lg font-semibold dark:text-white">
            Daily Goals
          </h3>
          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">Practice Time</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    15 minutes daily
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Check size={16} />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Book size={18} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">New Vocabulary</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learn 5 new words
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700">
                <span className="text-xs font-medium">3/5</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">
                    Conversation Practice
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Complete 1 dialogue
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700">
                <span className="text-xs font-medium">0/1</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Recommended Lessons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-3 text-lg font-semibold dark:text-white">
          Recommended Lessons
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lessons
            .filter((lesson) => lesson.progress < 100)
            .slice(0, 3)
            .map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="overflow-hidden rounded-lg border border-gray-100 p-4 transition-all hover:shadow-md dark:border-gray-700"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      lesson.level === "beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : lesson.level === "intermediate"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    }`}
                  >
                    {lesson.level.charAt(0).toUpperCase() +
                      lesson.level.slice(1)}
                  </span>
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    {lesson.duration} min
                  </span>
                </div>
                <h4 className="font-medium dark:text-white">{lesson.title}</h4>
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {lesson.progress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {lesson.progress > 0 ? "Continue" : "Start"} Lesson
                </motion.button>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );

  //   Vocabulary Section
  const renderVocabulary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Vocabulary</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search words..."
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <Plus size={16} className="mr-1" />
            Add Word
          </motion.button>
        </div>
      </div>

      <div className="rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50">
            All
          </button>
          <button className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
            Greetings
          </button>
          <button className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
            Dining
          </button>
          <button className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
            Places
          </button>
          <button className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
            Travel
          </button>
        </div>

        <div className="space-y-4">
          {vocabulary.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{
                y: -2,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="rounded-lg border border-gray-100 p-4 transition-all hover:shadow-md dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-medium dark:text-white">
                      {word.word}
                    </h4>
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {word.category}
                    </span>
                    {word.mastered && (
                      <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                        Mastered
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {word.translation}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-purple-100 p-2 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
                  >
                    <Volume2 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <MoreHorizontal size={18} />
                  </motion.button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Pronunciation:</span>{" "}
                  {word.pronunciation}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Example:</span> {word.example}
                </p>
              </div>
              <div className="mt-3 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <Repeat size={14} className="mr-1" />
                  Practice
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-1 items-center justify-center rounded-lg bg-purple-100 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
                >
                  <Star size={14} className="mr-1" />
                  {word.mastered ? "Unmark as Mastered" : "Mark as Mastered"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  //    Vocabulary Practice Section
  const renderPractice = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">
          Practice Exercises
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextExercise}
          className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <Repeat size={16} className="mr-1" />
          New Exercise
        </motion.button>
      </div>

      {currentExercise && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-white/80 p-6 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                currentExercise.type === "translation"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  : currentExercise.type === "fill-in-blank"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                    : currentExercise.type === "multiple-choice"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
              }`}
            >
              {currentExercise.type
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
            <div className="flex items-center space-x-2">
              {currentExercise.type === "listening" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-purple-100 p-2 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
                >
                  <Volume2 size={18} />
                </motion.button>
              )}
            </div>
          </div>

          <h3 className="mb-6 text-xl font-medium dark:text-white">
            {currentExercise.question}
          </h3>

          {currentExercise.type === "multiple-choice" ? (
            <div className="space-y-3">
              {currentExercise.options?.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex w-full items-center rounded-lg border p-3 text-left transition-colors ${
                    userAnswer === option
                      ? "border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-900/20"
                      : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  } ${
                    showAnswer && option === currentExercise.correctAnswer
                      ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/20"
                      : showAnswer &&
                          userAnswer === option &&
                          option !== currentExercise.correctAnswer
                        ? "border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900/20"
                        : ""
                  }`}
                  onClick={() => !showAnswer && setUserAnswer(option)}
                  disabled={showAnswer}
                >
                  <span
                    className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full ${
                      userAnswer === option
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    } ${
                      showAnswer && option === currentExercise.correctAnswer
                        ? "bg-green-500 text-white"
                        : showAnswer &&
                            userAnswer === option &&
                            option !== currentExercise.correctAnswer
                          ? "bg-red-500 text-white"
                          : ""
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => !showAnswer && setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full rounded-lg border border-gray-300 bg-white/80 p-3 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                disabled={showAnswer}
              />
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            {!showAnswer ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check Answer
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextExercise}
                className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow transition-all hover:shadow-md"
              >
                Next Exercise
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`mt-6 rounded-lg p-4 ${
                  isCorrect
                    ? "bg-green-100 dark:bg-green-900/20"
                    : "bg-red-100 dark:bg-red-900/20"
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`mr-3 mt-0.5 rounded-full p-1 ${
                      isCorrect
                        ? "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300"
                        : "bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-300"
                    }`}
                  >
                    {isCorrect ? <Check size={16} /> : <X size={16} />}
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        isCorrect
                          ? "text-green-800 dark:text-green-300"
                          : "text-red-800 dark:text-red-300"
                      }`}
                    >
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </h4>
                    <p
                      className={`mt-1 text-sm ${
                        isCorrect
                          ? "text-green-700 dark:text-green-200"
                          : "text-red-700 dark:text-red-200"
                      }`}
                    >
                      {isCorrect
                        ? "Great job! You got it right."
                        : `The correct answer is: ${currentExercise.correctAnswer}`}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-3 text-lg font-semibold dark:text-white">
          Practice Conversations
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="overflow-hidden rounded-lg border border-gray-100 p-4 transition-all hover:shadow-md dark:border-gray-700"
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    conversation.level === "beginner"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : conversation.level === "intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {conversation.level.charAt(0).toUpperCase() +
                    conversation.level.slice(1)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-purple-100 p-1.5 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
                >
                  <Play size={14} />
                </motion.button>
              </div>
              <h4 className="font-medium dark:text-white">
                {conversation.title}
              </h4>
              <p className="mt-1 text-sm italic text-gray-500 dark:text-gray-400">
                &quot;{conversation.preview}&quot;
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {conversation.participants.map((participant, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {participant}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Start Conversation
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  //   AI tutor section
  const renderAITutor = () => (
    <div className="flex h-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="flex sm:items-center">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">Lingua AI</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Ask me anything about {selectedLanguage} grammar, vocabulary, or
              pronunciation.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        ref={chatContainerRef}
        className="max-h-[60vh] flex-1 overflow-y-auto rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm dark:bg-gray-700/80"
      >
        <div className="space-y-4">
          {chatMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 10,
                x: message.sender === "user" ? -10 : 10,
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start ${message.sender === "ai" ? "justify-end" : ""}`}
            >
              {message.sender === "user" && (
                <>
                  <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                    <User size={16} />
                  </div>
                  <div className="rounded-lg rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                    <p>{message.content}</p>
                  </div>
                </>
              )}

              {message.sender === "ai" && (
                <>
                  <div className="rounded-lg rounded-tr-none bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-white shadow-sm">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <BookOpen size={16} />
                  </div>
                </>
              )}
            </motion.div>
          ))}

          {isGenerating && (
            <div className="flex items-start justify-end">
              <div className="rounded-lg rounded-tr-none bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-white shadow-sm">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
              <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <BookOpen size={16} />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6 mt-4 md:mb-0"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateAIResponse();
          }}
          className="flex items-center space-x-2"
        >
          <input
            ref={userQueryRef}
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder={`Ask about ${selectedLanguage} grammar, vocabulary, or pronunciation...`}
            className="flex-1 rounded-lg border border-gray-300 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
            disabled={isRecording}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleRecording}
            className={`rounded-lg p-2 ${
              isRecording
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isGenerating || (!userQuery.trim() && !isRecording)}
            className="flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="hidden sm:block">Thinking...</span>
              </>
            ) : (
              "Ask"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChartIcon size={20} /> },
    { id: "vocabulary", label: "Vocabulary", icon: <Book size={20} /> },
    { id: "practice", label: "Practice", icon: <Repeat size={20} /> },
    { id: "ai-tutor", label: "AI Tutor", icon: <Sparkles size={20} /> },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 transition-colors dark:from-gray-900 dark:to-gray-800 ${isMobile ? "pb-16" : ""}`}
    >
      <div className="container mx-auto p-4">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-3 rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <List size={20} />
              </motion.button>
            )}
            <div className="flex items-center">
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
                <Globe size={20} />
              </div>
              <h1 className="hidden text-xl font-bold dark:text-white sm:block">
                LinguaAI
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
            >
              <Bookmark size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
            >
              <Award size={20} />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
            >
              <User size={16} />
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <AnimatePresence>
            {(!isMobile || showMobileMenu) && (
              <motion.div
                initial={isMobile ? { x: -240 } : { opacity: 0 }}
                animate={isMobile ? { x: 0 } : { opacity: 1 }}
                exit={isMobile ? { x: -240 } : { opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`${
                  isMobile
                    ? "fixed inset-y-0 left-0 z-40 w-64 bg-white/80 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-800/80"
                    : "rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
                }`}
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                    <Globe size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    LinguaAI
                  </h1>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (isMobile) setShowMobileMenu(false);
                      }}
                      className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 dark:from-purple-500/30 dark:to-indigo-500/30 dark:text-purple-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-purple-600 dark:text-purple-400" : ""}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 dark:from-purple-500/20 dark:to-indigo-500/20">
                  <h3 className="font-medium dark:text-white">
                    Premium Features
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Unlock advanced lessons, AI conversation practice, and more!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-3 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
                  >
                    Upgrade Now
                  </motion.button>
                </div>

                {isMobile && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80vh]"
          >
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "vocabulary" && renderVocabulary()}
            {activeTab === "practice" && renderPractice()}
            {activeTab === "ai-tutor" && renderAITutor()}
          </motion.main>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-gray-200/50 bg-white/80 py-2 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/80"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 ${
                activeTab === item.id
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="mt-1 h-1 w-4 rounded-full bg-purple-600 dark:bg-purple-400"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
}
