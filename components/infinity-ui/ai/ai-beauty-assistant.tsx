"use client";

import type React from "react";

import {
  BeautyGoal,
  BeautyProduct,
  COLORS,
  ChatMessage,
  SkinConcern,
  SkinType,
  UserProfile,
  routineConsistencyData,
  sampleBeautyGoals,
  sampleChatMessages,
  sampleProducts,
  sampleSkinConcerns,
  sampleSkinTypes,
  sampleUserProfile,
  skinConcernsData,
  skinProgressData,
} from "@/data/ai-beauty";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Heart,
  ImageIcon,
  Info,
  Lightbulb,
  List,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AIBeautyAssistant = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(sampleChatMessages);
  const [userMessage, setUserMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BeautyProduct | null>(
    null,
  );
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<BeautyProduct[]>(sampleProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showBeautyQuiz, setShowBeautyQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(
    null,
  );
  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<BeautyGoal[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] =
    useState<UserProfile>(sampleUserProfile);
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);
  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // Effects
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
    if (searchQuery) {
      const filtered = sampleProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredProducts(filtered);
    } else {
      if (activeCategory === "All") {
        setFilteredProducts(sampleProducts);
      } else {
        setFilteredProducts(
          sampleProducts.filter(
            (product) => product.category === activeCategory,
          ),
        );
      }
    }
  }, [searchQuery, activeCategory]);

  // Handlers
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userMessage.trim() || isGenerating) return;

    // Add user message
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserMessage("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your skin concerns with dryness, I recommend incorporating a hyaluronic acid serum into your routine. Products like the Hydrating Serum from Glow Essentials would be perfect for your combination skin type.",
        "Looking at your beauty profile, I notice you&apos;re interested in anti-aging products. The Vitamin C Brightening Cream would be an excellent addition to your morning routine to help with fine lines and protect against environmental damage.",
        "For your concern about hyperpigmentation, I suggest using products with ingredients like niacinamide, vitamin C, and alpha arbutin. The Vitamin C Brightening Cream in our recommended products would be a great start.",
        "Based on the selfie you shared, I can see some dehydration around your cheek area. Try incorporating more hydrating products and perhaps a weekly hydrating mask like the Overnight Repair Mask from Glow Essentials.",
        "Your current routine is missing a good exfoliant, which could help with the texture concerns you mentioned. The Gentle Exfoliating Toner would be perfect to use 2-3 times per week.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const randomProduct =
        sampleProducts[Math.floor(Math.random() * sampleProducts.length)];

      const newAiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString(),
        productSuggestions: [randomProduct],
      };

      setChatMessages((prev) => [...prev, newAiMessage]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleProductClick = (product: BeautyProduct) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(sampleProducts);
    } else {
      setFilteredProducts(
        sampleProducts.filter((product) => product.category === activeCategory),
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setShowImageAnalysis(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkinTypeSelect = (type: SkinType) => {
    setSelectedSkinType(type);
  };

  const handleSkinConcernToggle = (concern: SkinConcern) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const handleBeautyGoalToggle = (goal: BeautyGoal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const nextQuizStep = () => {
    if (quizStep < 4) {
      setQuizStep(quizStep + 1);
    } else {
      // Complete quiz
      setShowBeautyQuiz(false);
      setQuizStep(1);

      // Update user profile with quiz results
      setUserProfile({
        ...userProfile,
        preferences: {
          ...userProfile.preferences,
          skinType: selectedSkinType || userProfile.preferences.skinType,
          skinConcerns:
            selectedConcerns.length > 0
              ? selectedConcerns
              : userProfile.preferences.skinConcerns,
          beautyGoals:
            selectedGoals.length > 0
              ? selectedGoals
              : userProfile.preferences.beautyGoals,
        },
      });

      // Reset selections
      setSelectedSkinType(null);
      setSelectedConcerns([]);
      setSelectedGoals([]);
      setUploadedImage(null);
    }
  };

  const prevQuizStep = () => {
    if (quizStep > 1) {
      setQuizStep(quizStep - 1);
    } else {
      setShowBeautyQuiz(false);
    }
  };

  const isNextDisabled = () => {
    if (quizStep === 1) return !selectedSkinType;
    if (quizStep === 2) return selectedConcerns.length === 0;
    if (quizStep === 3) return selectedGoals.length === 0;
    return false;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Chart rendering functions
  const renderSkinConcernsChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={skinConcernsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              animationDuration={1500}
            >
              {skinConcernsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Distribution"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSkinProgressChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={skinProgressData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHydration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorTexture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
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
              dataKey="hydration"
              stroke="#ec4899"
              fillOpacity={1}
              fill="url(#colorHydration)"
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="texture"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorTexture)"
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderRoutineConsistencyChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={routineConsistencyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorConsistency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="day"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Consistency"]}
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
            />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke="#ec4899"
              fillOpacity={1}
              fill="url(#colorConsistency)"
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // View rendering functions
  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {userProfile.name.split(" ")[0]}!
            </h2>
            <p className="mt-1 text-pink-100">
              Here&apos;s your beauty profile summary
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
          >
            <Sparkles size={24} />
          </motion.div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-pink-100">Skin Type</p>
            <p className="text-xl font-bold capitalize">
              {userProfile.preferences.skinType}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-pink-100">Routine Streak</p>
            <p className="text-xl font-bold">7 days</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-pink-100">Saved Products</p>
            <p className="text-xl font-bold">
              {userProfile.savedProducts.length}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-pink-100">Skin Journal</p>
            <p className="text-xl font-bold">
              {userProfile.skinJournal.length} entries
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Your Beauty Profile
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBeautyQuiz(true)}
              className="flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
            >
              <Edit size={12} className="mr-1" />
              Update
            </motion.button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Skin Type
              </p>
              <p className="text-lg font-semibold capitalize dark:text-white">
                {userProfile.preferences.skinType}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Skin Concerns
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {userProfile.preferences.skinConcerns.map((concern, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200"
                  >
                    {concern.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Beauty Goals
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {userProfile.preferences.beautyGoals.map((goal, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                  >
                    {goal.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Allergies
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {userProfile.preferences.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowRoutineBuilder(true)}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
            >
              <Sparkles size={16} className="mr-1" />
              Get Personalized Routine
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Today&apos;s Routine
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <h4 className="mb-2 font-medium text-gray-800 dark:text-white">
                Morning Routine
              </h4>
              <div className="space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Gentle Cleanser
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cleanse with lukewarm water
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
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Vitamin C Serum
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Apply 3-4 drops to face and neck
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
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Moisturizer with SPF
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Apply generously to face and neck
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                    <Clock size={16} />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <h4 className="mb-2 font-medium text-gray-800 dark:text-white">
                Evening Routine
              </h4>
              <div className="space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Oil Cleanser
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Remove makeup and sunscreen
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                    <Clock size={16} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Hydrating Serum
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Apply to damp skin
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                    <Clock size={16} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Night Cream</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Apply a pea-sized amount
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                    <Clock size={16} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Skin Concerns Distribution
          </h3>
          {renderSkinConcernsChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Dryness is your primary concern, followed by acne and aging
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Skin Progress Trends
          </h3>
          {renderSkinProgressChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Your skin hydration has improved by 35% over the last 5 months!
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            AI Beauty Insights
          </h3>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200">
            Updated today
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-lg border border-gray-100 p-4 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-pink-700 dark:hover:bg-pink-900/20"
          >
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                <Sparkles size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Hydration Improvement
                  </h4>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    Positive Trend
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Your consistent use of hyaluronic acid serums has improved
                  your skin&apos;s hydration levels by 35% in the past 3 months.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Detected 2 days ago
                  </span>
                  <button className="text-xs font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-lg border border-gray-100 p-4 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-pink-700 dark:hover:bg-pink-900/20"
          >
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Lightbulb size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Product Recommendation
                  </h4>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    Suggestion
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Based on your skin concerns, adding a gentle exfoliant 2-3
                  times per week could help with texture and hyperpigmentation
                  issues.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Generated today
                  </span>
                  <button className="text-xs font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300">
                    View Products
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-lg border border-gray-100 p-4 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-pink-700 dark:hover:bg-pink-900/20"
          >
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Info size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Seasonal Adjustment
                  </h4>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                    Important
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  As we enter the drier season, consider switching to a richer
                  moisturizer to maintain your skin&apos;s hydration levels.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    1 week until seasonal change
                  </span>
                  <button className="text-xs font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300">
                    View Suggestions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Routine Consistency
        </h3>
        {renderRoutineConsistencyChart()}
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          You&apos;ve maintained an 80% average consistency with your skincare
          routine this week
        </div>
      </motion.div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold dark:text-white">
          Recommended Products
        </h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <Plus size={16} className="mr-1" />
            Browse All Products
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => filterByCategory("All")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            activeCategory === "All"
              ? "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {Array.from(
          new Set(sampleProducts.map((product) => product.category)),
        ).map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              activeCategory === category
                ? "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={
                  product.imageUrl ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={product.name}
                fill
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {product.category}
                  </span>
                  <span className="flex items-center rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Star size={12} className="mr-1" />
                    {product.rating}
                  </span>
                </div>
              </div>
              <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {product.brand}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.size}
                </span>
              </div>
              <h3 className="text-lg font-semibold dark:text-white">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {product.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200"
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 3 && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    +{product.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {product.currency}
                  {product.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800 transition-colors hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
                >
                  <ShoppingBag size={14} className="mr-1" />
                  Add to Bag
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAIChat = () => (
    <div className="flex h-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="flex sm:items-center">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold dark:text-white sm:text-xl">
              Radia AI
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Ask me anything about skincare, makeup, or get personalized
              product recommendations.
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
                x: message.role === "user" ? 10 : -10,
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "user" && (
                <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-pink-500 px-4 py-2 text-white shadow-sm">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="mt-1 text-right text-xs text-pink-200">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              )}

              {message.role === "assistant" && (
                <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                  <p className="whitespace-pre-wrap text-gray-800 dark:text-white">
                    {message.content}
                  </p>

                  {message.productSuggestions &&
                    message.productSuggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.productSuggestions.map((product) => (
                          <div
                            key={product.id}
                            className="overflow-hidden rounded-lg bg-gray-50 shadow dark:bg-gray-700"
                          >
                            <div className="flex">
                              <Image
                                src={
                                  product.imageUrl ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                alt={product.name}
                                width={80}
                                height={80}
                                className="h-20 w-20 object-cover"
                              />
                              <div className="flex flex-1 flex-col justify-between p-2">
                                <div>
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {product.brand}
                                  </p>
                                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                                    {product.name}
                                  </h4>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-gray-800 dark:text-white">
                                    {product.currency}
                                    {product.price}
                                  </span>
                                  <button
                                    onClick={() => handleProductClick(product)}
                                    className="text-xs font-medium text-pink-600 dark:text-pink-400"
                                  >
                                    Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  <div className="mt-1 text-right text-xs text-gray-400 dark:text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4"
      >
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          <label className="flex-shrink-0 cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
            <ImageIcon size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <input
            ref={messageInputRef}
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ask about skincare, makeup, or upload a photo..."
            className="flex-1 rounded-full border border-gray-300 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!userMessage.trim() && isGenerating}
            className={`rounded-full p-2 ${
              !userMessage.trim() && isGenerating
                ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            }`}
          >
            <Send size={20} />
          </motion.button>
        </form>

        <div className="mt-3 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <button
              onClick={() =>
                setUserMessage("What products are best for dry skin?")
              }
              className="rounded-full bg-pink-100 px-3 py-1 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
            >
              Products for dry skin
            </button>
            <button
              onClick={() => setUserMessage("How do I reduce dark circles?")}
              className="rounded-full bg-pink-100 px-3 py-1 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
            >
              Reduce dark circles
            </button>
            <button
              onClick={() => setUserMessage("Create a routine for anti-aging")}
              className="rounded-full bg-pink-100 px-3 py-1 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50"
            >
              Anti-aging routine
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderJournal = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Skin Journal</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
        >
          <Plus size={16} className="mr-1" />
          New Entry
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {userProfile.skinJournal.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={
                  entry.image ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt="Skin journal entry"
                fill
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm ${
                      entry.mood === "great"
                        ? "bg-green-500/20 text-white"
                        : entry.mood === "good"
                          ? "bg-blue-500/20 text-white"
                          : entry.mood === "okay"
                            ? "bg-yellow-500/20 text-white"
                            : "bg-red-500/20 text-white"
                    }`}
                  >
                    Mood:{" "}
                    {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold dark:text-white">
                  Journal Entry
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {entry.notes}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Concerns
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {entry.concerns.map((concern, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200"
                    >
                      {concern.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Products Used
                </p>
                <div className="mt-1 space-y-2">
                  {entry.productsUsed.map((productId) => {
                    const product = sampleProducts.find(
                      (p) => p.id === productId,
                    );
                    return product ? (
                      <div
                        key={productId}
                        className="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-700/50"
                      >
                        <div className="relative mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={
                              product.imageUrl ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={product.name}
                            fill
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5 text-purple-600 dark:text-purple-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                      AI Analysis
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-200">
                      Your skin shows improvement in hydration. Continue with
                      your current routine and consider adding a vitamin C serum
                      to address the hyperpigmentation concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-20 flex h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 dark:border-gray-700 md:h-full"
        >
          <div className="mb-4 rounded-full bg-pink-100 p-4 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
            <Plus size={24} />
          </div>
          <h3 className="text-lg font-semibold dark:text-white">
            Add New Entry
          </h3>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Track your skin&apos;s progress by adding regular journal entries
            with photos
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <Camera size={16} className="mr-1" />
            Take Photo
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Sparkles size={20} /> },
    { id: "products", label: "Products", icon: <ShoppingBag size={20} /> },
    { id: "ai-chat", label: "AI Chat", icon: <MessageSquare size={20} /> },
    { id: "journal", label: "Skin Journal", icon: <Camera size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 transition-colors dark:from-gray-900 dark:to-purple-950">
      <div className="container mx-auto p-4">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-3 block rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <List size={20} />
            </motion.button>

            <div className="flex items-center">
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md">
                <Sparkles size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Radia
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

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
            >
              {userProfile.avatar ? (
                <Image
                  src={
                    userProfile.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                  }
                  alt={userProfile.name}
                  fill
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <AnimatePresence>
            {(!showMobileMenu || !showMobileMenu) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="hidden rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80 lg:block"
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md">
                    <Sparkles size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    Radia
                  </h1>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-700 dark:from-pink-500/30 dark:to-purple-500/30 dark:text-pink-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-pink-600 dark:text-pink-400" : ""}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 dark:from-pink-500/20 dark:to-purple-500/20">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                        <Zap size={16} />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          7-Day Streak!
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Keep it going!
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-medium text-white"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 dark:from-pink-500/20 dark:to-purple-500/20">
                    <h3 className="font-medium dark:text-white">
                      Today&apos;s Tip
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Apply sunscreen even on cloudy days to protect your skin
                      from UV damage.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 text-xs font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                    >
                      Get More Tips
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-40 w-64 bg-white/90 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 lg:hidden"
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md">
                    <Sparkles size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    Radia
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
                        setShowMobileMenu(false);
                      }}
                      className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-700 dark:from-pink-500/30 dark:to-purple-500/30 dark:text-pink-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-pink-600 dark:text-pink-400" : ""}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X size={20} />
                </motion.button>
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
            {activeTab === "products" && renderProducts()}
            {activeTab === "ai-chat" && renderAIChat()}
            {activeTab === "journal" && renderJournal()}
          </motion.main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-gray-200 bg-white/80 py-2 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/80 lg:hidden">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 ${
              activeTab === item.id
                ? "text-pink-600 dark:text-pink-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="mt-1 h-1 w-4 rounded-full bg-pink-600 dark:bg-pink-400"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ---------------------------------------------------------------------Modals----------------------------------------------------------------------------------------- */}

      {/* Product Details */}
      <AnimatePresence>
        {showProductDetails && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[66] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowProductDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowProductDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl md:mb-0 md:h-auto md:w-1/3">
                  <Image
                    src={
                      selectedProduct.imageUrl ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    fill
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200">
                      {selectedProduct.category}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {selectedProduct.size}
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                      <Star size={12} className="mr-1" />
                      {selectedProduct.rating} ({selectedProduct.reviewCount}{" "}
                      reviews)
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {selectedProduct.brand}
                  </p>
                  <h2 className="text-2xl font-bold dark:text-white">
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {selectedProduct.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                    {selectedProduct.currency}{" "}
                    {selectedProduct.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Key Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <Check size={16} className="mr-2 text-pink-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-pink-50 p-4 dark:bg-pink-900/20">
                <h3 className="mb-2 text-lg font-semibold text-pink-800 dark:text-pink-200">
                  How to Use
                </h3>
                <p className="text-pink-700 dark:text-pink-300">
                  {selectedProduct.howToUse}
                </p>
              </div>

              <div className="mt-6 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5 text-purple-600 dark:text-purple-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-purple-800 dark:text-purple-300">
                      AI Personalized Insight
                    </p>
                    <p className="mt-1 text-sm text-purple-700 dark:text-purple-200">
                      This product is a 92% match for your skin profile! The
                      hyaluronic acid will help with your dryness concerns,
                      while the niacinamide addresses your hyperpigmentation
                      issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowProductDetails(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Add to Bag
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beauty Quiz Modal */}
      <AnimatePresence>
        {showBeautyQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowBeautyQuiz(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowBeautyQuiz(false)}
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Beauty Profile Quiz
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Help us understand your unique beauty needs for personalized
                  recommendations.
                </p>
              </div>

              <div className="mb-6 flex justify-between">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 ${
                      index + 1 <= quizStep
                        ? "bg-pink-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    } ${index > 0 ? "ml-1" : ""}`}
                  ></div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={quizStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {quizStep === 1 && (
                    <div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        What&apos;s your skin type?
                      </h3>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {sampleSkinTypes.map((type) => (
                          <motion.button
                            key={type}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSkinTypeSelect(type)}
                            className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                              selectedSkinType === type
                                ? "border-pink-500 bg-pink-50 dark:border-pink-400 dark:bg-pink-900/20"
                                : "border-gray-200 hover:border-pink-200 dark:border-gray-700 dark:hover:border-pink-800"
                            }`}
                          >
                            <div
                              className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                selectedSkinType === type
                                  ? "bg-pink-500 text-white"
                                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {selectedSkinType === type && <Check size={20} />}
                            </div>
                            <span className="text-center font-medium capitalize text-gray-800 dark:text-white">
                              {type}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        What skin concerns do you have? (Select all that apply)
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {sampleSkinConcerns.map((concern) => (
                          <motion.button
                            key={concern}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSkinConcernToggle(concern)}
                            className={`flex items-center rounded-lg border-2 p-3 transition-all ${
                              selectedConcerns.includes(concern)
                                ? "border-pink-500 bg-pink-50 dark:border-pink-400 dark:bg-pink-900/20"
                                : "border-gray-200 hover:border-pink-200 dark:border-gray-700 dark:hover:border-pink-800"
                            }`}
                          >
                            <div
                              className={`mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                                selectedConcerns.includes(concern)
                                  ? "bg-pink-500 text-white"
                                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {selectedConcerns.includes(concern) && (
                                <Check size={12} />
                              )}
                            </div>
                            <span className="text-sm font-medium capitalize text-gray-800 dark:text-white">
                              {concern.replace(/-/g, " ")}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 3 && (
                    <div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        What are your beauty goals? (Select all that apply)
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {sampleBeautyGoals.map((goal) => (
                          <motion.button
                            key={goal}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBeautyGoalToggle(goal)}
                            className={`flex items-center rounded-lg border-2 p-3 transition-all ${
                              selectedGoals.includes(goal)
                                ? "border-pink-500 bg-pink-50 dark:border-pink-400 dark:bg-pink-900/20"
                                : "border-gray-200 hover:border-pink-200 dark:border-gray-700 dark:hover:border-pink-800"
                            }`}
                          >
                            <div
                              className={`mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                                selectedGoals.includes(goal)
                                  ? "bg-pink-500 text-white"
                                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {selectedGoals.includes(goal) && (
                                <Check size={12} />
                              )}
                            </div>
                            <span className="text-sm font-medium capitalize text-gray-800 dark:text-white">
                              {goal.replace(/-/g, " ")}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 4 && (
                    <div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Upload a selfie for better recommendations (optional)
                      </h3>
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative mb-6 h-64 w-64 overflow-hidden rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                          {uploadedImage ? (
                            <Image
                              src={
                                uploadedImage ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt="Uploaded selfie"
                              fill
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/50">
                              <Camera
                                size={40}
                                className="mb-2 text-gray-400"
                              />
                              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Upload a well-lit selfie
                                <br />
                                without makeup for best results
                              </p>
                            </div>
                          )}
                        </div>

                        <label className="flex cursor-pointer items-center rounded-full bg-pink-100 px-6 py-3 text-base font-medium text-pink-800 shadow-sm transition-all hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:hover:bg-pink-900/50">
                          <Upload size={18} className="mr-2" />
                          {uploadedImage ? "Change Photo" : "Upload Photo"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevQuizStep}
                  className="flex items-center rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  {quizStep === 1 ? "Cancel" : "Back"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuizStep}
                  disabled={isNextDisabled()}
                  className={`flex items-center rounded-full px-6 py-2 text-sm font-medium text-white transition-colors ${
                    isNextDisabled()
                      ? "bg-gray-300 dark:bg-gray-600"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  }`}
                >
                  {quizStep === 4 ? "Get Recommendations" : "Next"}
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Analysis Modal */}
      <AnimatePresence>
        {showImageAnalysis && uploadedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowImageAnalysis(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowImageAnalysis(false)}
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  AI Skin Analysis
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI has analyzed your skin to provide personalized
                  recommendations.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl md:mb-0 md:h-auto md:w-1/2">
                  <Image
                    src={
                      uploadedImage ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                    }
                    alt="Uploaded selfie"
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-pink-50 p-4 dark:bg-pink-900/20">
                      <h3 className="mb-2 font-semibold text-pink-800 dark:text-pink-200">
                        Detected Skin Type
                      </h3>
                      <p className="text-pink-700 dark:text-pink-300">
                        Your skin appears to be <strong>combination</strong>{" "}
                        with some oiliness in the T-zone and dryness on the
                        cheeks.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold text-gray-800 dark:text-white">
                        Detected Concerns
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200">
                          Mild dryness
                        </span>
                        <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200">
                          Some hyperpigmentation
                        </span>
                        <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-200">
                          Fine lines
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                      <h3 className="mb-2 font-semibold text-purple-800 dark:text-purple-200">
                        AI Recommendations
                      </h3>
                      <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                        <li className="flex items-start">
                          <Check
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>
                            Focus on hydrating products with hyaluronic acid for
                            the dry areas
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>
                            Use vitamin C products to address hyperpigmentation
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>
                            Consider adding retinol to your evening routine for
                            fine lines
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                  Recommended Products
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sampleProducts.slice(0, 2).map((product) => (
                    <div
                      key={product.id}
                      className="overflow-hidden rounded-lg bg-gray-50 shadow dark:bg-gray-700"
                    >
                      <div className="flex">
                        <Image
                          src={
                            product.imageUrl ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          }
                          alt={product.name}
                          width={80}
                          height={80}
                          className="h-20 w-20 object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between p-2">
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {product.brand}
                            </p>
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                              {product.name}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-800 dark:text-white">
                              {product.currency}
                              {product.price}
                            </span>
                            <button
                              onClick={() => handleProductClick(product)}
                              className="text-xs font-medium text-pink-600 dark:text-pink-400"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowImageAnalysis(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
                >
                  Get Full Analysis
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Routine Builder Modal */}
      <AnimatePresence>
        {showRoutineBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowRoutineBuilder(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowRoutineBuilder(false)}
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  AI Personalized Routine
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Based on your skin type, concerns, and goals, we&apos;ve
                  created a customized skincare routine.
                </p>
              </div>

              <div className="mb-6 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 p-4 dark:from-pink-900/30 dark:to-purple-900/30">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5 text-pink-600 dark:text-pink-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-pink-800 dark:text-pink-300">
                      AI Insight
                    </p>
                    <p className="mt-1 text-sm text-pink-700 dark:text-pink-200">
                      For your combination skin with concerns about dryness and
                      hyperpigmentation, we&apos;ve created a balanced routine
                      that focuses on hydration while addressing uneven skin
                      tone. The morning routine emphasizes protection, while the
                      evening routine focuses on repair and renewal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Morning Routine
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        step: 1,
                        name: "Gentle Cleanser",
                        instruction: "Cleanse with lukewarm water",
                        product: sampleProducts[0],
                      },
                      {
                        step: 2,
                        name: "Vitamin C Serum",
                        instruction: "Apply 3-4 drops to face and neck",
                        product: sampleProducts[1],
                      },
                      {
                        step: 3,
                        name: "Moisturizer with SPF",
                        instruction: "Apply generously to face and neck",
                        product: sampleProducts[3],
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex items-start rounded-lg border border-gray-100 p-4 dark:border-gray-700"
                      >
                        <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                          <span className="text-sm font-bold">{item.step}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-white">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.instruction}
                              </p>
                            </div>
                            <button
                              onClick={() => handleProductClick(item.product)}
                              className="mt-2 text-sm font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 sm:mt-0"
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Evening Routine
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        step: 1,
                        name: "Oil Cleanser",
                        instruction: "Remove makeup and sunscreen",
                        product: sampleProducts[2],
                      },
                      {
                        step: 2,
                        name: "Hydrating Serum",
                        instruction: "Apply to damp skin",
                        product: sampleProducts[0],
                      },
                      {
                        step: 3,
                        name: "Night Cream",
                        instruction: "Apply a pea-sized amount",
                        product: sampleProducts[4],
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex items-start rounded-lg border border-gray-100 p-4 dark:border-gray-700"
                      >
                        <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          <span className="text-sm font-bold">{item.step}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-white">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.instruction}
                              </p>
                            </div>
                            <button
                              onClick={() => handleProductClick(item.product)}
                              className="mt-2 text-sm font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 sm:mt-0"
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Weekly Treatments
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Exfoliating Treatment",
                        instruction:
                          "Use 1-2 times per week, in the evening after cleansing",
                        product: sampleProducts[2],
                      },
                      {
                        name: "Hydrating Mask",
                        instruction:
                          "Use once per week when skin feels extra dry",
                        product: sampleProducts[4],
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start rounded-lg border border-gray-100 p-4 dark:border-gray-700"
                      >
                        <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-white">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.instruction}
                              </p>
                            </div>
                            <button
                              onClick={() => handleProductClick(item.product)}
                              className="mt-2 text-sm font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 sm:mt-0"
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowRoutineBuilder(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
                >
                  Save Routine
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
};

export default AIBeautyAssistant;
