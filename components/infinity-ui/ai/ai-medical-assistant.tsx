"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  Copy,
  FileText,
  Heart,
  HelpCircle,
  Info,
  List,
  MessageSquare,
  Moon,
  Pill,
  Plus,
  Search,
  Send,
  Settings,
  Sun,
  ThumbsDown,
  ThumbsUp,
  User,
  X,
  Zap,
} from "lucide-react";
import {
  ChatMessage,
  UserProfile,
  Medication,
  sampleChatMessages,
  sampleMedications,
  sampleUserProfile,
  Symptom,
  sampleSymptoms,
  medicationAdherenceData,
  glucoseData,
  bloodPressureData,
} from "@/data/ai-medical";
import useMediaQuery from "@/hooks/use-media-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AIMedicalAssistant = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(sampleChatMessages);
  const [userMessage, setUserMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [showMedicationDetails, setShowMedicationDetails] = useState(false);
  const [userProfile, setUserProfile] =
    useState<UserProfile>(sampleUserProfile);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedications, setFilteredMedications] =
    useState<Medication[]>(sampleMedications);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [showSymptomDetails, setShowSymptomDetails] = useState(false);
  const [copied, setCopied] = useState<string>("");
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

  // Handle copy
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);

    setTimeout(() => {
      setCopied((prev) => (prev === key ? "" : prev));
    }, 2000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = sampleMedications.filter(
        (medication) =>
          medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medication.genericName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          medication.purpose.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredMedications(filtered);
    } else {
      if (activeCategory === "All") {
        setFilteredMedications(sampleMedications);
      } else {
        setFilteredMedications(
          sampleMedications.filter(
            (medication) => medication.category === activeCategory,
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
        "Based on your symptoms, you might be experiencing tension headaches. These are often caused by stress, poor posture, or eye strain. Over-the-counter pain relievers like ibuprofen can help manage the pain. Make sure to stay hydrated and consider stress-reduction techniques.",
        "Your symptoms could be related to seasonal allergies. Antihistamines like loratadine can help relieve symptoms such as sneezing, runny nose, and itchy eyes. It's also helpful to avoid known allergens when possible.",
        "The joint pain you&apos;re describing could be related to inflammation. Anti-inflammatory medications like ibuprofen may help reduce pain and swelling. If symptoms persist, it would be advisable to consult with a healthcare provider.",
        "For your described symptoms, it's important to monitor your blood pressure regularly. If you&apos;re experiencing dizziness along with headaches, this could be related to blood pressure fluctuations. Medications like lisinopril are commonly prescribed for hypertension management.",
        "The combination of fatigue and joint pain could be related to several conditions. It's important to ensure you&apos;re getting adequate rest and proper nutrition. If symptoms persist, a healthcare provider might recommend blood tests to check for underlying conditions.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const randomMedication =
        sampleMedications[Math.floor(Math.random() * sampleMedications.length)];

      const newAiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString(),
        medicationSuggestions: [randomMedication],
      };

      setChatMessages((prev) => [...prev, newAiMessage]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleMedicationClick = (medication: Medication) => {
    setSelectedMedication(medication);
    setShowMedicationDetails(true);
  };

  const handleSymptomClick = (symptom: Symptom) => {
    setSelectedSymptom(symptom);
    setShowSymptomDetails(true);
  };

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredMedications(sampleMedications);
    } else {
      setFilteredMedications(
        sampleMedications.filter(
          (medication) => medication.category === category,
        ),
      );
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMessageFeedback = (
    messageId: string,
    feedback: "like" | "dislike",
  ) => {
    setChatMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              feedback: message.feedback === feedback ? null : feedback,
            }
          : message,
      ),
    );
  };

  const tealColor = "#0d9488";
  const blueColor = "#2563eb";

  // Chart rendering functions
  const renderBloodPressureChart = () => (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={bloodPressureData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="date"
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <YAxis
            domain={[60, 140]}
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            label={{
              value: "mmHg",
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
            formatter={(value, name) => [
              `${value} mmHg`,
              name === "systolic" ? "Systolic" : "Diastolic",
            ]}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            }
          />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke={tealColor}
            strokeWidth={2}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke={blueColor}
            strokeWidth={2}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderGlucoseChart = () => (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={glucoseData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={tealColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={tealColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="date"
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <YAxis
            domain={[90, 115]}
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            label={{
              value: "mg/dL",
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
            formatter={(value) => [`${value} mg/dL`, "Glucose Level"]}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            }
          />
          <Area
            type="monotone"
            dataKey="level"
            stroke={tealColor}
            fillOpacity={1}
            fill="url(#colorGlucose)"
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const renderMedicationAdherenceChart = () => (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={medicationAdherenceData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="day"
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            label={{
              value: "%",
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
            formatter={(value) => [`${value}%`, "Adherence"]}
          />
          <Bar
            dataKey="percentage"
            fill={blueColor}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // Render functions
  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white shadow-lg dark:from-teal-800 dark:to-blue-900"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {userProfile.name.split(" ")[0]}!
            </h2>
            <p className="mt-1 text-teal-100">
              Here&apos;s your health summary
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
          >
            <Activity size={24} />
          </motion.div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-teal-100">Blood Pressure</p>
            <p className="text-xl font-bold">120/75</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-teal-100">Heart Rate</p>
            <p className="text-xl font-bold">72 bpm</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-teal-100">Glucose</p>
            <p className="text-xl font-bold">95 mg/dL</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-teal-100">Medication</p>
            <p className="text-xl font-bold">2 due today</p>
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
              Your Health Profile
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
            >
              <Settings size={12} className="mr-1" />
              Update
            </motion.button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Age
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {userProfile.age} years
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Gender
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {userProfile.gender}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Weight
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {userProfile.weight} kg
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Height
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {userProfile.height} cm
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Blood Type
              </p>
              <p className="text-lg font-semibold dark:text-white">
                {userProfile.bloodType}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Allergies
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {userProfile.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Conditions
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {userProfile.conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Current Medications
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {userProfile.medications.map((medication, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-200"
                  >
                    {medication}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Today&apos;s Medication Schedule
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <h4 className="mb-2 font-medium text-gray-800 dark:text-white">
                Morning
              </h4>
              <div className="space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                      <Pill size={20} />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Lisinopril 10mg
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Take with water before breakfast
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Check size={16} />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <h4 className="mb-2 font-medium text-gray-800 dark:text-white">
                Evening
              </h4>
              <div className="space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Pill size={20} />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        Loratadine 10mg
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Take once daily for allergies
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

          <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-blue-600 dark:text-blue-400">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">
                  Upcoming Appointment
                </h4>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  Dr. Emily Rodriguez (Cardiology) - November 15, 10:30 AM
                </p>
                <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  View All Appointments
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Blood Pressure Trends
          </h3>
          {renderBloodPressureChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Your blood pressure has improved by 15 points over the last 6 months
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Glucose Levels
          </h3>
          {renderGlucoseChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Your glucose levels have decreased to a healthy range
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Medication Adherence
          </h3>
          {renderMedicationAdherenceChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            You&aposve maintained an 89% average adherence this week
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            Recent Health Insights
          </h3>
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-200">
            Updated today
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border border-gray-100 p-4 hover:border-teal-300 hover:bg-teal-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-700 dark:hover:bg-teal-900/20"
          >
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-teal-100 p-2 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <Activity size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Blood Pressure Improvement
                  </h4>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    Positive Trend
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Your blood pressure has improved from 135/85 to 120/75 over
                  the past 6 months. Keep up the good work!
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated 2 days ago
                  </span>
                  <button className="text-xs font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-lg border border-gray-100 p-4 hover:border-teal-300 hover:bg-teal-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-700 dark:hover:bg-teal-900/20"
          >
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <HelpCircle size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Medication Recommendation
                  </h4>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    Suggestion
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Based on your recent symptoms, consider discussing a different
                  antihistamine option with your doctor for better allergy
                  control.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Generated today
                  </span>
                  <button className="text-xs font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
                    View Alternatives
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-lg border border-gray-100 p-4 hover:border-teal-300 hover:bg-teal-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-700 dark:hover:bg-teal-900/20"
          >
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Info size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Preventive Care Reminder
                  </h4>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                    Important
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  It&apos;s time for your annual physical examination. Regular
                  check-ups are essential for preventive care.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Due in 2 weeks
                  </span>
                  <button className="text-xs font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
                    Schedule Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Recent Symptoms
          </h3>
          <div className="space-y-3">
            {sampleSymptoms.map((symptom) => (
              <motion.div
                key={symptom.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="cursor-pointer rounded-lg border border-gray-100 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/50 dark:border-gray-700 dark:hover:border-teal-700 dark:hover:bg-teal-900/20"
                onClick={() => handleSymptomClick(symptom)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-teal-100 p-2 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">
                        {symptom.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {symptom.severity} • {symptom.frequency}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      symptom.severity === "Mild"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : symptom.severity === "Moderate"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    }`}
                  >
                    {symptom.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="mt-3 flex w-full items-center justify-center rounded-md bg-teal-100 py-2 text-sm font-medium text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50">
            <Plus size={16} className="mr-1" />
            Track New Symptom
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Health Records
          </h3>
          <div className="space-y-3">
            {userProfile.healthRecords.map((record) => (
              <motion.div
                key={record.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg border border-gray-100 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/50 dark:border-gray-700 dark:hover:border-teal-700 dark:hover:bg-teal-900/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">
                        {record.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(record.date).toLocaleDateString()} •{" "}
                        {record.provider}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    {record.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="mt-3 flex w-full items-center justify-center rounded-md bg-blue-100 py-2 text-sm font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50">
            <Plus size={16} className="mr-1" />
            Upload Health Record
          </button>
        </motion.div>
      </div>
    </div>
  );

  const renderMedications = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold dark:text-white">
          Medication Library
        </h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <Plus size={16} className="mr-1" />
            Add Medication
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => filterByCategory("All")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            activeCategory === "All"
              ? "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {Array.from(
          new Set(sampleMedications.map((medication) => medication.category)),
        ).map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              activeCategory === category
                ? "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMedications.map((medication, index) => (
          <motion.div
            key={medication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
            onClick={() => handleMedicationClick(medication)}
          >
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-teal-500/20 to-blue-500/20">
              <div className="flex h-full items-center justify-center">
                <Pill size={64} className="text-teal-500 dark:text-teal-400" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {medication.category}
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {medication.form}
                  </span>
                </div>
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-teal-600 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:text-teal-400 dark:hover:bg-gray-700">
                <Heart size={16} />
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {medication.genericName}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    medication.requiresPrescription
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                  }`}
                >
                  {medication.requiresPrescription ? "Prescription" : "OTC"}
                </span>
              </div>
              <h3 className="text-lg font-semibold dark:text-white">
                {medication.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {medication.purpose}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {medication.sideEffects
                  .slice(0, 2)
                  .map((effect, effectIndex) => (
                    <span
                      key={effectIndex}
                      className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    >
                      {effect}
                    </span>
                  ))}
                {medication.sideEffects.length > 2 && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    +{medication.sideEffects.length - 2}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {medication.currency}
                  {medication.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800 transition-colors hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
                >
                  <Info size={14} className="mr-1" />
                  Details
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
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold dark:text-white sm:text-xl">
              Pharma AI
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Ask me about symptoms, medications, or general health information.
              I&apos;m here to help!
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
              className={`group relative flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "user" && (
                <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-teal-500 px-4 py-2 text-white shadow-sm">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="mt-1 text-right text-xs text-teal-200">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  {/* Message actions */}
                  <div className="absolute -left-16 top-2 hidden space-x-1 group-hover:flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(message.content, "message");
                      }}
                      className="rounded-full bg-white p-1.5 text-gray-500 shadow hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      {copied === "message" ? (
                        <CheckCheck size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {message.role === "assistant" && (
                <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                  <p className="whitespace-pre-wrap text-gray-800 dark:text-white">
                    {message.content}
                  </p>

                  {message.medicationSuggestions &&
                    message.medicationSuggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.medicationSuggestions.map((medication) => (
                          <div
                            key={medication.id}
                            className="overflow-hidden rounded-lg bg-gray-50 shadow dark:bg-gray-700"
                          >
                            <div className="flex">
                              <div className="flex h-20 w-20 items-center justify-center bg-teal-100 dark:bg-teal-900/30">
                                <Pill
                                  size={32}
                                  className="text-teal-600 dark:text-teal-400"
                                />
                              </div>
                              <div className="flex flex-1 flex-col justify-between p-2">
                                <div>
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {medication.genericName}
                                  </p>
                                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                                    {medication.name} {medication.dosage}
                                  </h4>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-gray-800 dark:text-white">
                                    {medication.currency}
                                    {medication.price.toFixed(2)}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMedicationClick(medication);
                                    }}
                                    className="text-xs font-medium text-teal-600 dark:text-teal-400"
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

                  {/* Message actions */}
                  <div className="absolute right-3 top-2 hidden space-x-1 group-hover:flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(message.content, "message2");
                      }}
                      className="rounded-full bg-white p-1.5 text-gray-500 shadow hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      {copied === "message2" ? (
                        <CheckCheck size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMessageFeedback(message.id, "like");
                      }}
                      className={`rounded-full p-1.5 shadow ${
                        message.feedback === "like"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                          : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                      }`}
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMessageFeedback(message.id, "dislike");
                      }}
                      className={`rounded-full p-1.5 shadow ${
                        message.feedback === "dislike"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                          : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                      }`}
                    >
                      <ThumbsDown size={14} />
                    </button>
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
          <input
            ref={messageInputRef}
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Describe your symptoms or ask about medications..."
            className="flex-1 rounded-full border border-gray-300 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!userMessage.trim() && isGenerating}
            className={`rounded-full p-2 ${
              !userMessage.trim() && isGenerating
                ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
            }`}
          >
            <Send size={20} />
          </motion.button>
        </form>

        <div className="mt-3 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <button
              onClick={() =>
                setUserMessage("What could be causing my headaches?")
              }
              className="rounded-full bg-teal-100 px-3 py-1 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
            >
              Headache causes
            </button>
            <button
              onClick={() =>
                setUserMessage("Is ibuprofen safe for long-term use?")
              }
              className="rounded-full bg-teal-100 px-3 py-1 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
            >
              Ibuprofen safety
            </button>
            <button
              onClick={() =>
                setUserMessage("What medications help with allergies?")
              }
              className="rounded-full bg-teal-100 px-3 py-1 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
            >
              Allergy medications
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderSymptoms = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Symptom Tracker</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
        >
          <Plus size={16} className="mr-1" />
          Log New Symptom
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleSymptoms.map((symptom) => (
          <motion.div
            key={symptom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="cursor-pointer rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm transition-all hover:shadow-lg dark:bg-gray-800/80"
            onClick={() => handleSymptomClick(symptom)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold dark:text-white">
                {symptom.name}
              </h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  symptom.severity === "Mild"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                    : symptom.severity === "Moderate"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                }`}
              >
                {symptom.severity}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} className="mr-1" />
                <span>Duration: {symptom.duration}</span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Activity size={14} className="mr-1" />
                <span>Frequency: {symptom.frequency}</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              {symptom.description}
            </p>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Possible conditions:
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {symptom.relatedConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Activity size={20} /> },
    { id: "medications", label: "Medications", icon: <Pill size={20} /> },
    { id: "ai-chat", label: "AI Chat", icon: <MessageSquare size={20} /> },
    { id: "symptoms", label: "Symptoms", icon: <AlertCircle size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 transition-colors dark:from-gray-900 dark:to-blue-950">
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
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-md">
                <Activity size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Pharma
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
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md"
            >
              <User size={20} />
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
                    <Activity size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    Pharma
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
                          ? "bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-700 dark:from-teal-500/30 dark:to-blue-500/30 dark:text-teal-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-teal-600 dark:text-teal-400" : ""}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 p-4 dark:from-teal-500/20 dark:to-blue-500/20">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                        <Zap size={16} />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          Health Tip
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Stay hydrated!
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Drinking enough water helps maintain energy levels and
                      supports overall health.
                    </p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 p-4 dark:from-teal-500/20 dark:to-blue-500/20">
                    <h3 className="font-medium dark:text-white">
                      Upcoming Appointment
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Dr. Emily Rodriguez - Cardiology
                      <br />
                      November 15, 10:30 AM
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 text-xs font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      View Details
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
                className="fixed inset-y-0 left-0 z-40 w-64 bg-white/80 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 lg:hidden"
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
                    <Activity size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    MediAssist
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
                          ? "bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-700 dark:from-teal-500/30 dark:to-blue-500/30 dark:text-teal-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-teal-600 dark:text-teal-400" : ""}`}
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
            {activeTab === "medications" && renderMedications()}
            {activeTab === "ai-chat" && renderAIChat()}
            {activeTab === "symptoms" && renderSymptoms()}
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
                ? "text-teal-600 dark:text-teal-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="mt-1 h-1 w-4 rounded-full bg-teal-600 dark:bg-teal-400"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Medication Details Modal */}
      <AnimatePresence>
        {showMedicationDetails && selectedMedication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[66] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowMedicationDetails(false)}
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
                onClick={() => setShowMedicationDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="relative mb-4 flex h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-teal-500/20 to-blue-500/20 md:mb-0 md:h-auto md:w-1/3">
                  <Pill
                    size={96}
                    className="text-teal-500 dark:text-teal-400"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-200">
                      {selectedMedication.category}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {selectedMedication.form}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        selectedMedication.requiresPrescription
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      }`}
                    >
                      {selectedMedication.requiresPrescription
                        ? "Prescription Required"
                        : "Over-the-Counter"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {selectedMedication.genericName}
                  </p>
                  <h2 className="text-2xl font-bold dark:text-white">
                    {selectedMedication.name}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {selectedMedication.purpose}
                  </p>

                  <div className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                    {selectedMedication.currency}{" "}
                    {selectedMedication.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Dosage Information
                  </h3>
                  <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                    <p className="text-teal-800 dark:text-teal-200">
                      <span className="font-medium">Recommended Dosage:</span>{" "}
                      {selectedMedication.dosage}
                    </p>
                    <p className="mt-2 text-teal-800 dark:text-teal-200">
                      <span className="font-medium">Frequency:</span>{" "}
                      {selectedMedication.frequency}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Side Effects
                  </h3>
                  <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                    <ul className="space-y-1 text-red-800 dark:text-red-200">
                      {selectedMedication.sideEffects.map((effect, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                <h3 className="mb-2 text-lg font-semibold text-amber-800 dark:text-amber-200">
                  Warnings
                </h3>
                <ul className="space-y-1 text-amber-800 dark:text-amber-200">
                  {selectedMedication.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle
                        size={16}
                        className="mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200">
                  Drug Interactions
                </h3>
                <p className="mb-2 text-blue-700 dark:text-blue-300">
                  This medication may interact with:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedMedication.interactions.map((interaction, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                    >
                      {interaction}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowMedicationDetails(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
                >
                  Add to My Medications
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Symptom Details Modal */}
      <AnimatePresence>
        {showSymptomDetails && selectedSymptom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowSymptomDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowSymptomDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold dark:text-white">
                  {selectedSymptom.name}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    selectedSymptom.severity === "Mild"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : selectedSymptom.severity === "Moderate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {selectedSymptom.severity}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Symptom Details
                  </h3>
                  <div className="mt-3 space-y-3">
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Duration
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedSymptom.duration}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Frequency
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedSymptom.frequency}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedSymptom.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Possible Conditions
                  </h3>
                  <div className="mt-3 space-y-2">
                    {selectedSymptom.relatedConditions.map(
                      (condition, index) => (
                        <div key={index} className="flex items-center">
                          <AlertCircle
                            size={16}
                            className="mr-2 text-blue-500"
                          />
                          <span className="dark:text-white">{condition}</span>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                    <div className="flex items-start">
                      <Info
                        size={20}
                        className="mr-2 text-blue-600 dark:text-blue-400"
                      />
                      <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-300">
                          Medical Advice
                        </h4>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                          If symptoms persist or worsen, please consult with a
                          healthcare provider. This information is not a
                          substitute for professional medical advice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold dark:text-white">
                  Recommended Medications
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sampleMedications.slice(0, 2).map((medication) => (
                    <div
                      key={medication.id}
                      className="overflow-hidden rounded-lg bg-gray-50 shadow dark:bg-gray-700"
                    >
                      <div className="flex">
                        <div className="flex h-20 w-20 items-center justify-center bg-teal-100 dark:bg-teal-900/30">
                          <Pill
                            size={32}
                            className="text-teal-600 dark:text-teal-400"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-2">
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {medication.genericName}
                            </p>
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                              {medication.name}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-800 dark:text-white">
                              {medication.currency}
                              {medication.price.toFixed(2)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMedicationClick(medication);
                              }}
                              className="text-xs font-medium text-teal-600 dark:text-teal-400"
                            >
                              Details
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
                  onClick={() => setShowSymptomDetails(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
                >
                  Update Symptom
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

export default AIMedicalAssistant;
