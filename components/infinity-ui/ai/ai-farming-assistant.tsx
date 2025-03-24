"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Cloud,
  CloudRain,
  Droplets,
  FileText,
  HelpCircle,
  ImagePlus,
  Leaf,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  SproutIcon as Seedling,
  Settings,
  Shovel,
  Sparkles,
  Sun,
  Tractor,
  Trash,
  Upload,
  Wind,
  X,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import ChatModal from "./chat-modal";
import useMediaQuery from "@/hooks/use-media-query";

// Types
type User = {
  name: string;
  email: string;
  avatar: string;
  farmName: string;
  plan: "free" | "premium";
};

type Crop = {
  id: string;
  name: string;
  variety: string;
  fieldId: string;
  plantedDate: Date;
  harvestDate: Date | null;
  status: "growing" | "harvested" | "planned";
  healthScore: number;
  yieldEstimate: number;
  area: number; // in acres
  color: string;
};

type Field = {
  id: string;
  name: string;
  area: number; // in acres
  soilType: string;
  lastTested: Date;
  soilHealth: number;
  color: string;
};

type Weather = {
  date: Date;
  condition: "sunny" | "cloudy" | "rainy" | "stormy";
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category:
    | "planting"
    | "irrigation"
    | "fertilizing"
    | "harvesting"
    | "maintenance";
};

type CropIssue = {
  id: string;
  cropId: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  detectedDate: Date;
  status: "active" | "resolved";
  images: string[];
};

type AIRecommendation = {
  id: string;
  title: string;
  description: string;
  type: "crop" | "soil" | "pest" | "water" | "weather";
  impact: "high" | "medium" | "low";
  actionable: boolean;
  implemented: boolean;
};

type InsightCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

type SoilData = {
  nutrient: string;
  value: number;
  optimal: number;
  unit: string;
  status: "low" | "optimal" | "high";
};

type View =
  | "dashboard"
  | "crops"
  | "weather"
  | "tasks"
  | "analysis"
  | "advisor"
  | "settings";

// Sample data
const user: User = {
  name: "Wabweni Farmer",
  email: "wabweni@greenfarms.com",
  avatar: "/images/default-avatar.png",
  farmName: "Green Valley Farms",
  plan: "premium",
};

const fields: Field[] = [
  {
    id: "1",
    name: "North Field",
    area: 25.5,
    soilType: "Clay Loam",
    lastTested: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    soilHealth: 82,
    color: "#4ade80",
  },
  {
    id: "2",
    name: "South Field",
    area: 18.2,
    soilType: "Sandy Loam",
    lastTested: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    soilHealth: 76,
    color: "#facc15",
  },
  {
    id: "3",
    name: "East Meadow",
    area: 12.8,
    soilType: "Silt Loam",
    lastTested: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    soilHealth: 88,
    color: "#60a5fa",
  },
  {
    id: "4",
    name: "West Orchard",
    area: 8.5,
    soilType: "Loamy Sand",
    lastTested: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    soilHealth: 71,
    color: "#f97316",
  },
];

const crops: Crop[] = [
  {
    id: "1",
    name: "Corn",
    variety: "Sweet Corn",
    fieldId: "1",
    plantedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    harvestDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    status: "growing",
    healthScore: 87,
    yieldEstimate: 180, // bushels per acre
    area: 15.2,
    color: "#facc15",
  },
  {
    id: "2",
    name: "Soybeans",
    variety: "Round-Up Ready",
    fieldId: "2",
    plantedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    harvestDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    status: "growing",
    healthScore: 92,
    yieldEstimate: 55, // bushels per acre
    area: 18.2,
    color: "#4ade80",
  },
  {
    id: "3",
    name: "Wheat",
    variety: "Hard Red Winter",
    fieldId: "3",
    plantedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
    harvestDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    status: "harvested",
    healthScore: 95,
    yieldEstimate: 65, // bushels per acre
    area: 12.8,
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "Apples",
    variety: "Honeycrisp",
    fieldId: "4",
    plantedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 3),
    harvestDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
    status: "growing",
    healthScore: 78,
    yieldEstimate: 800, // bushels per acre
    area: 8.5,
    color: "#ef4444",
  },
];

const weatherForecast: Weather[] = [
  {
    date: new Date(Date.now()),
    condition: "sunny",
    temperature: 78,
    humidity: 45,
    precipitation: 0,
    windSpeed: 5,
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    condition: "cloudy",
    temperature: 72,
    humidity: 65,
    precipitation: 0,
    windSpeed: 8,
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    condition: "rainy",
    temperature: 68,
    humidity: 85,
    precipitation: 0.5,
    windSpeed: 12,
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    condition: "cloudy",
    temperature: 70,
    humidity: 75,
    precipitation: 0.1,
    windSpeed: 10,
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
    condition: "sunny",
    temperature: 75,
    humidity: 50,
    precipitation: 0,
    windSpeed: 7,
  },
];

const tasks: Task[] = [
  {
    id: "1",
    title: "Apply Fertilizer",
    description: "Apply nitrogen fertilizer to corn fields",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    completed: false,
    priority: "high",
    category: "fertilizing",
  },
  {
    id: "2",
    title: "Irrigation Check",
    description: "Check irrigation system in South Field",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    completed: false,
    priority: "medium",
    category: "irrigation",
  },
  {
    id: "3",
    title: "Tractor Maintenance",
    description: "Schedule regular maintenance for the Wabweni Deere",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    completed: false,
    priority: "low",
    category: "maintenance",
  },
  {
    id: "4",
    title: "Harvest Planning",
    description: "Finalize harvest schedule for wheat fields",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    completed: false,
    priority: "high",
    category: "harvesting",
  },
];

const cropIssues: CropIssue[] = [
  {
    id: "1",
    cropId: "1",
    title: "Corn Leaf Blight",
    description:
      "Early signs of Northern Corn Leaf Blight detected in sections of North Field",
    severity: "medium",
    detectedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: "active",
    images: ["/default-image.jpg"],
  },
  {
    id: "2",
    cropId: "4",
    title: "Apple Scab",
    description: "Apple scab detected on several trees in the West Orchard",
    severity: "high",
    detectedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: "active",
    images: ["/default-image.jpg"],
  },
];

const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    title: "Adjust Irrigation Schedule",
    description:
      "Based on soil moisture readings and weather forecast, reduce irrigation in North Field by 15% to prevent overwatering.",
    type: "water",
    impact: "medium",
    actionable: true,
    implemented: false,
  },
  {
    id: "2",
    title: "Corn Leaf Blight Treatment",
    description:
      "Apply fungicide treatment to affected areas in North Field to prevent spread of Northern Corn Leaf Blight.",
    type: "pest",
    impact: "high",
    actionable: true,
    implemented: false,
  },
  {
    id: "3",
    title: "Soil Amendment for South Field",
    description:
      "Add organic matter to improve soil structure and water retention in the sandy loam of South Field.",
    type: "soil",
    impact: "medium",
    actionable: true,
    implemented: false,
  },
  {
    id: "4",
    title: "Weather Alert: Heavy Rain",
    description:
      "Prepare for heavy rainfall in 3 days. Consider delaying fertilizer application to prevent runoff.",
    type: "weather",
    impact: "high",
    actionable: true,
    implemented: false,
  },
];

const insightCards: InsightCard[] = [
  {
    id: "1",
    title: "Crop Health",
    description: "Overall crop health is 8% better than last season",
    icon: <Leaf size={20} />,
    color: "#4ade80",
  },
  {
    id: "2",
    title: "Water Usage",
    description: "Water efficiency improved by 12% this month",
    icon: <Droplets size={20} />,
    color: "#60a5fa",
  },
  {
    id: "3",
    title: "Yield Forecast",
    description: "Projected yields are 5% above county average",
    icon: <BarChart3 size={20} />,
    color: "#f59e0b",
  },
];

const soilData: SoilData[] = [
  {
    nutrient: "Nitrogen (N)",
    value: 45,
    optimal: 50,
    unit: "ppm",
    status: "low",
  },
  {
    nutrient: "Phosphorus (P)",
    value: 35,
    optimal: 30,
    unit: "ppm",
    status: "optimal",
  },
  {
    nutrient: "Potassium (K)",
    value: 180,
    optimal: 150,
    unit: "ppm",
    status: "high",
  },
  {
    nutrient: "pH",
    value: 6.5,
    optimal: 6.5,
    unit: "pH",
    status: "optimal",
  },
  {
    nutrient: "Organic Matter",
    value: 3.2,
    optimal: 4.0,
    unit: "%",
    status: "low",
  },
];

// Chart data
const cropYieldData = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 0 },
  { month: "Mar", amount: 0 },
  { month: "Apr", amount: 0 },
  { month: "May", amount: 0 },
  { month: "Jun", amount: 0 },
  { month: "Jul", amount: 0 },
  { month: "Aug", amount: 1200 },
  { month: "Sep", amount: 3500 },
  { month: "Oct", amount: 5800 },
  { month: "Nov", amount: 6200 },
  { month: "Dec", amount: 6200 },
];

const rainfallData = [
  { month: "Jan", current: 2.1, average: 2.3 },
  { month: "Feb", current: 2.5, average: 2.2 },
  { month: "Mar", current: 3.2, average: 3.0 },
  { month: "Apr", current: 3.8, average: 3.5 },
  { month: "May", current: 4.5, average: 4.0 },
  { month: "Jun", current: 3.2, average: 3.8 },
  { month: "Jul", current: 2.8, average: 3.2 },
  { month: "Aug", current: 2.1, average: 2.5 },
  { month: "Sep", current: 3.0, average: 2.8 },
  { month: "Oct", current: 2.5, average: 2.7 },
  { month: "Nov", current: 2.2, average: 2.4 },
  { month: "Dec", current: 2.4, average: 2.3 },
];

const cropDistributionData = [
  { name: "Corn", value: 15.2 },
  { name: "Soybeans", value: 18.2 },
  { name: "Wheat", value: 12.8 },
  { name: "Apples", value: 8.5 },
];

const soilHealthRadarData = [
  {
    attribute: "Nitrogen",
    value: 65,
    fullMark: 100,
  },
  {
    attribute: "Phosphorus",
    value: 80,
    fullMark: 100,
  },
  {
    attribute: "Potassium",
    value: 90,
    fullMark: 100,
  },
  {
    attribute: "pH Balance",
    value: 85,
    fullMark: 100,
  },
  {
    attribute: "Organic Matter",
    value: 70,
    fullMark: 100,
  },
  {
    attribute: "Microbial Activity",
    value: 75,
    fullMark: 100,
  },
];

const AIFarmingAssistant = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hideData, setHideData] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAIAdviceModal, setShowAIAdviceModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<AIRecommendation | null>(null);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chartKey, setChartKey] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Regenerate chart key when view changes to prevent flickering
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [activeView]);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleHideData = () => {
    setHideData(!hideData);
  };

  const formatArea = (area: number) => {
    return `${area.toFixed(1)} acres`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getWeatherIcon = (condition: Weather["condition"]) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "stormy":
        return <Wind className="h-8 w-8 text-purple-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  // Logo Component
  const Logo = () => (
    <div className="flex items-center">
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md">
        <Seedling size={20} />
      </div>
      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent dark:from-green-400 dark:to-emerald-400">
        AgroMind
      </span>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => {
    return (
      <AnimatePresence>
        {(!isMobile || showMobileMenu) && (
          <motion.div
            initial={isMobile ? { x: -280 } : undefined}
            animate={isMobile ? { x: 0 } : undefined}
            exit={isMobile ? { x: -280 } : undefined}
            className={`${
              isMobile
                ? "fixed inset-y-0 left-0 z-40 h-screen w-72 overflow-y-auto bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-800/80"
                : "scrollbar-hover fixed left-0 top-0 h-screen w-72 overflow-y-auto border-r border-gray-100 bg-white/90 p-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-800/90"
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

            <div className="mb-6 flex items-center">
              <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-green-600 to-emerald-600">
                <Image
                  src={user.avatar || "/images/default-avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.farmName}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavItem
                id="dashboard"
                label="Dashboard"
                icon={<BarChart3 className="h-5 w-5" />}
              />
              <NavItem
                id="crops"
                label="Crops & Fields"
                icon={<Leaf className="h-5 w-5" />}
              />
              <NavItem
                id="weather"
                label="Weather"
                icon={<CloudRain className="h-5 w-5" />}
              />
              <NavItem
                id="tasks"
                label="Tasks"
                icon={<Calendar className="h-5 w-5" />}
              />
              <NavItem
                id="analysis"
                label="Soil Analysis"
                icon={<Shovel className="h-5 w-5" />}
              />
              <NavItem
                id="advisor"
                label="AI Advisor"
                icon={<Sparkles className="h-5 w-5" />}
              />
              <NavItem
                id="settings"
                label="Settings"
                icon={<Settings className="h-5 w-5" />}
              />
            </nav>

            <div className="mt-6 space-y-2">
              <motion.button
                className="flex w-full items-center rounded-xl bg-green-100 px-4 py-3 text-left text-sm font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowImageUploadModal(true)}
              >
                <ImagePlus className="mr-3 h-5 w-5" />
                Analyze Crop Image
              </motion.button>

              <motion.button
                className="flex w-full items-center rounded-xl bg-blue-100 px-4 py-3 text-left text-sm font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowChatModal(true)}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                AI Assistant Chat
              </motion.button>
            </div>

            <div className="mt-auto pt-6">
              <motion.button
                className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
              </motion.button>
              <motion.button
                className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Nav Item Component
  const NavItem = ({
    id,
    label,
    icon,
  }: {
    id: View;
    label: string;
    icon: React.ReactNode;
  }) => {
    return (
      <motion.button
        onClick={() => {
          setActiveView(id);
          if (isMobile) setShowMobileMenu(false);
        }}
        className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
          activeView === id
            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
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

  // Mobile Header Component
  const MobileHeader = () => {
    return (
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200/30 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-800/95">
        <div className="flex items-center">
          <motion.button
            className="mr-3 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowMobileMenu(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={18} />
          </motion.button>
          <Logo />
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="relative rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={18} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </motion.button>
          <motion.button
            className="rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    );
  };

  // Mobile Navigation Component
  const MobileNavigation = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/30 bg-white/80 py-2 backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-800/80">
        <div className="container mx-auto flex items-center justify-around">
          <NavButton
            id="dashboard"
            label="Home"
            icon={<BarChart3 className="h-6 w-6" />}
          />
          <NavButton
            id="crops"
            label="Crops"
            icon={<Leaf className="h-6 w-6" />}
          />
          <NavButton
            id="weather"
            label="Weather"
            icon={<CloudRain className="h-6 w-6" />}
          />
          <NavButton
            id="advisor"
            label="Advisor"
            icon={<Sparkles className="h-6 w-6" />}
          />
        </div>
      </div>
    );
  };

  // Nav Button Component
  const NavButton = ({
    id,
    label,
    icon,
  }: {
    id: View;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = activeView === id;

    return (
      <motion.button
        onClick={() => setActiveView(id)}
        className="flex flex-col items-center p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className={`${isActive ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {icon}
        </div>
        <span
          className={`mt-1 text-xs ${isActive ? "font-medium text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  // Field Card Component
  const FieldCard = ({ field }: { field: Field }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${field.color}20` }}
          >
            <Shovel size={20} style={{ color: field.color }} />
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{field.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {field.soilType}
            </p>
          </div>
        </div>
        <motion.button
          className="rounded-full bg-gray-100/80 p-1.5 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.button>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
          <p className="font-medium dark:text-white">
            {formatArea(field.area)}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Soil Health
          </p>
          <div className="flex items-center">
            <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${field.soilHealth}%`,
                  backgroundColor:
                    field.soilHealth > 80
                      ? "#4ade80"
                      : field.soilHealth > 60
                        ? "#facc15"
                        : "#ef4444",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${field.soilHealth}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-medium dark:text-white">
              {field.soilHealth}%
            </span>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Last tested: {formatDate(field.lastTested)}
        </p>
      </div>
    </motion.div>
  );

  // Crop Card Component
  const CropCard = ({ crop }: { crop: Crop }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${crop.color}20` }}
          >
            <Leaf size={20} style={{ color: crop.color }} />
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{crop.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {crop.variety}
            </p>
          </div>
        </div>
        <div
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            crop.status === "growing"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : crop.status === "harvested"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}
        >
          {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Field</p>
          <p className="font-medium dark:text-white">
            {fields.find((f) => f.id === crop.fieldId)?.name || "Unknown"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
          <p className="font-medium dark:text-white">{formatArea(crop.area)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Planted</p>
          <p className="font-medium dark:text-white">
            {formatDate(crop.plantedDate)}
          </p>
        </div>
        {crop.harvestDate && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {crop.status === "harvested" ? "Harvested" : "Expected Harvest"}
            </p>
            <p className="font-medium dark:text-white">
              {formatDate(crop.harvestDate)}
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Health</p>
          <div className="flex items-center">
            <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${crop.healthScore}%`,
                  backgroundColor:
                    crop.healthScore > 80
                      ? "#4ade80"
                      : crop.healthScore > 60
                        ? "#facc15"
                        : "#ef4444",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${crop.healthScore}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-medium dark:text-white">
              {crop.healthScore}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Weather Card Component
  const WeatherCard = ({
    weather,
    index,
  }: {
    weather: Weather;
    index: number;
  }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {index === 0
              ? "Today"
              : index === 1
                ? "Tomorrow"
                : formatDate(weather.date)}
          </p>
          <h3 className="mt-1 text-xl font-bold dark:text-white">
            {weather.temperature}°F
          </h3>
        </div>
        <div className="flex h-16 w-16 items-center justify-center">
          {getWeatherIcon(weather.condition)}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
          <p className="font-medium dark:text-white">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
          <p className="font-medium dark:text-white">{weather.windSpeed} mph</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Precipitation
          </p>
          <p className="font-medium dark:text-white">
            {weather.precipitation}&quot;{" "}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Condition</p>
          <p className="font-medium capitalize dark:text-white">
            {weather.condition}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Task Item Component
  const TaskItem = ({ task }: { task: Task }) => {
    const daysLeft = Math.ceil(
      (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );

    return (
      <motion.div
        className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0 dark:border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <div
            className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
              task.category === "planting"
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : task.category === "irrigation"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : task.category === "fertilizing"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : task.category === "harvesting"
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            }`}
          >
            {task.category === "planting" && <Seedling size={18} />}
            {task.category === "irrigation" && <Droplets size={18} />}
            {task.category === "fertilizing" && <Shovel size={18} />}
            {task.category === "harvesting" && <Tractor size={18} />}
            {task.category === "maintenance" && <Settings size={18} />}
          </div>
          <div>
            <p className="font-medium dark:text-white">{task.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {task.description}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {daysLeft === 0
              ? "Due today"
              : daysLeft < 0
                ? `Overdue by ${Math.abs(daysLeft)} days`
                : `Due in ${daysLeft} days`}
          </p>
        </div>
      </motion.div>
    );
  };

  // Crop Issue Card Component
  const CropIssueCard = ({ issue }: { issue: CropIssue }) => {
    const crop = crops.find((c) => c.id === issue.cropId);

    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
                issue.severity === "high"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : issue.severity === "medium"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
            >
              <Leaf size={20} />
            </div>
            <div>
              <h3 className="font-medium dark:text-white">{issue.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {crop?.name} - {formatDate(issue.detectedDate)}
              </p>
            </div>
          </div>
          <div
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              issue.severity === "high"
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                : issue.severity === "medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {issue.description}
        </p>
        {issue.images.length > 0 && (
          <div className="mt-3 overflow-hidden rounded-lg">
            <Image
              src={issue.images[0] || "/default-image.jpg"}
              alt={issue.title}
              width={400}
              height={300}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <motion.button
            className="flex items-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight size={12} className="mr-1" />
            View Treatment
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // AI Recommendation Card Component
  const AIRecommendationCard = ({
    recommendation,
  }: {
    recommendation: AIRecommendation;
  }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
      onClick={() => {
        setSelectedRecommendation(recommendation);
        setShowAIAdviceModal(true);
      }}
    >
      <div className="flex items-center">
        <div
          className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            recommendation.type === "crop"
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : recommendation.type === "soil"
                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                : recommendation.type === "pest"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : recommendation.type === "water"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          }`}
        >
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="font-medium dark:text-white">
            {recommendation.title}
          </h3>
          <div className="flex items-center">
            <span
              className={`mr-2 inline-block h-2 w-2 rounded-full ${
                recommendation.impact === "high"
                  ? "bg-red-500"
                  : recommendation.impact === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {recommendation.impact.charAt(0).toUpperCase() +
                recommendation.impact.slice(1)}{" "}
              impact
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {recommendation.description}
      </p>
      <div className="mt-4 flex justify-end">
        <motion.button
          className="flex items-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight size={12} className="mr-1" />
          Take Action
        </motion.button>
      </div>
    </motion.div>
  );

  // Insight Card Component
  const InsightCardComponent = ({ insight }: { insight: InsightCard }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center">
        <div
          className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${insight.color}20` }}
        >
          <span style={{ color: insight.color }}>{insight.icon}</span>
        </div>
        <div>
          <h3 className="font-medium dark:text-white">{insight.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {insight.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Soil Nutrient Item Component
  const SoilNutrientItem = ({ nutrient }: { nutrient: SoilData }) => {
    const percentage = (nutrient.value / nutrient.optimal) * 100;

    return (
      <div className="border-b border-gray-100 py-3 last:border-0 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="font-medium dark:text-white">{nutrient.nutrient}</p>
          <div className="flex items-center">
            <p className="mr-2 font-medium dark:text-white">
              {nutrient.value} {nutrient.unit}
            </p>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                nutrient.status === "low"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : nutrient.status === "optimal"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
            >
              {nutrient.status.charAt(0).toUpperCase() +
                nutrient.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mr-2">
            Optimal: {nutrient.optimal} {nutrient.unit}
          </p>
          <div className="flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className={`h-full rounded-full ${
                  nutrient.status === "low"
                    ? "bg-yellow-500"
                    : nutrient.status === "optimal"
                      ? "bg-green-500"
                      : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Crop Yield Chart Component
  const CropYieldChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Crop Yield Trend
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <AreaChart
          data={cropYieldData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="cropYieldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            tickFormatter={(value) => `${value.toLocaleString()} bu`}
          />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} bushels`,
              "Yield",
            ]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: "#4ade80",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#4ade80"
            fillOpacity={1}
            fill="url(#cropYieldGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Rainfall Chart Component
  const RainfallChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Rainfall Comparison
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <RechartsBarChart
          data={rainfallData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            tickFormatter={(value) => `${value}"`}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(1)}"`, ""]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Legend />
          <Bar
            dataKey="current"
            name="Current Year"
            fill="#60a5fa"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="average"
            name="Historical Average"
            fill="#93c5fd"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Crop Distribution Chart Component
  const CropDistributionChart = () => {
    const COLORS = ["#4ade80", "#facc15", "#f59e0b", "#ef4444"];

    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Crop Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300} key={chartKey}>
          <RechartsPieChart>
            <Pie
              data={cropDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {cropDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(1)} acres`, ""]}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Soil Health Radar Chart Component
  const SoilHealthRadarChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Soil Health Analysis
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={soilHealthRadarData}
        >
          <PolarGrid stroke={darkMode ? "#4b5563" : "#d1d5db"} />
          <PolarAngleAxis
            dataKey="attribute"
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
          />
          <Radar
            name="Soil Health"
            dataKey="value"
            stroke="#4ade80"
            fill="#4ade80"
            fillOpacity={0.5}
          />
          <Legend />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Add Task Modal Component
  const AddTaskModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowAddTaskModal(false)}
    >
      <motion.div
        className="relative max-h-[80vh] w-full max-w-md overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => setShowAddTaskModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">Add New Task</h2>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Title
            </label>
            <input
              type="text"
              id="task-title"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="e.g., Apply Fertilizer"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Describe the task details..."
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Due Date
            </label>
            <input
              type="date"
              id="task-due-date"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-priority"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Priority
              </label>
              <select
                id="task-priority"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="task-category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <select
                id="task-category"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              >
                <option value="planting">Planting</option>
                <option value="irrigation">Irrigation</option>
                <option value="fertilizing">Fertilizing</option>
                <option value="harvesting">Harvesting</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              type="button"
              className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowAddTaskModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Task
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // AI Advice Modal Component
  const AIAdviceModal = () => {
    if (!selectedRecommendation) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={() => setShowAIAdviceModal(false)}
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
            onClick={() => setShowAIAdviceModal(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          <div className="flex items-center">
            <div
              className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
                selectedRecommendation.type === "crop"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : selectedRecommendation.type === "soil"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : selectedRecommendation.type === "pest"
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : selectedRecommendation.type === "water"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
              }`}
            >
              <Sparkles size={24} />
            </div>
            <h2 className="text-base font-bold dark:text-white sm:text-2xl">
              {selectedRecommendation.title}
            </h2>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <span
                className={`mr-2 inline-block h-3 w-3 rounded-full ${
                  selectedRecommendation.impact === "high"
                    ? "bg-red-500"
                    : selectedRecommendation.impact === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedRecommendation.impact.charAt(0).toUpperCase() +
                  selectedRecommendation.impact.slice(1)}{" "}
                Impact
              </p>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {selectedRecommendation.description}
            </p>

            <div className="mt-6 rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
              <h3 className="font-medium text-green-800 dark:text-green-200">
                AI Analysis
              </h3>
              <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                {selectedRecommendation.type === "crop" &&
                  "Based on growth patterns and soil conditions, this adjustment will optimize your crop's development during this critical growth stage. Historical data from similar farms in your region shows a potential 8-12% yield improvement with this approach."}
                {selectedRecommendation.type === "soil" &&
                  "Soil analysis indicates that adding organic matter will improve water retention by approximately 15% and increase microbial activity. This amendment aligns with sustainable farming practices and will benefit long-term soil health."}
                {selectedRecommendation.type === "pest" &&
                  "Early intervention is critical. Our image analysis shows this fungal infection is in its early stages. Targeted treatment now has a 90% success rate versus 40% if delayed by one week. The recommended fungicide has minimal environmental impact."}
                {selectedRecommendation.type === "water" &&
                  "Soil moisture sensors indicate current levels are 15% above optimal range. Reducing irrigation will prevent potential root diseases and nutrient leaching while saving approximately 2,500 gallons of water per acre this week."}
                {selectedRecommendation.type === "weather" &&
                  "Weather models predict 1.5-2.0 inches of rainfall within a 36-hour period. Delaying fertilizer application will prevent an estimated 30% runoff loss and potential watershed contamination, while ensuring optimal nutrient absorption."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium dark:text-white">
                Implementation Steps
              </h3>
              <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
                {selectedRecommendation.type === "crop" && (
                  <>
                    <li>
                      Inspect current crop conditions in the affected field
                    </li>
                    <li>Prepare necessary equipment and materials</li>
                    <li>
                      Apply recommended treatments during optimal time (early
                      morning)
                    </li>
                    <li>Document application details for future reference</li>
                    <li>Schedule follow-up inspection in 7 days</li>
                  </>
                )}
                {selectedRecommendation.type === "soil" && (
                  <>
                    <li>Source high-quality organic compost or manure</li>
                    <li>Apply 2-3 tons per acre to South Field</li>
                    <li>Incorporate into top 6 inches of soil</li>
                    <li>Consider cover cropping after harvest</li>
                    <li>Retest soil in 60 days to measure improvement</li>
                  </>
                )}
                {selectedRecommendation.type === "pest" && (
                  <>
                    <li>Purchase recommended fungicide (propiconazole)</li>
                    <li>Apply at rate of 4 oz per acre to affected areas</li>
                    <li>
                      Ensure proper protective equipment during application
                    </li>
                    <li>
                      Avoid application if rain is forecast within 24 hours
                    </li>
                    <li>Monitor treated areas every 3 days for 2 weeks</li>
                  </>
                )}
                {selectedRecommendation.type === "water" && (
                  <>
                    <li>Adjust irrigation controller settings</li>
                    <li>Reduce watering time by 15% for North Field</li>
                    <li>Monitor soil moisture levels daily</li>
                    <li>Check weather forecast for rainfall predictions</li>
                    <li>Readjust in 7 days based on soil moisture readings</li>
                  </>
                )}
                {selectedRecommendation.type === "weather" && (
                  <>
                    <li>Postpone scheduled fertilizer application</li>
                    <li>Secure any vulnerable equipment or materials</li>
                    <li>Check drainage systems for potential blockages</li>
                    <li>Prepare for post-rain field assessment</li>
                    <li>
                      Reschedule fertilizer application for 2-3 days after
                      rainfall
                    </li>
                  </>
                )}
              </ol>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowAIAdviceModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dismiss
            </motion.button>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Implement Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Image Upload Modal Component
  const ImageUploadModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowImageUploadModal(false)}
    >
      <motion.div
        className="relative max-h-[80vh] w-full max-w-md overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => setShowImageUploadModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">
          Analyze Crop Image
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Upload an image of your crop to detect diseases, pests, or nutrient
          deficiencies
        </p>

        <div className="mt-6">
          <div className="flex justify-center">
            <motion.div
              className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="mb-2 h-10 w-10 text-gray-400 dark:text-gray-500" />
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag and drop your image here
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or HEIC up to 10MB
              </p>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                accept="image/*"
              />
            </motion.div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="crop-type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Crop Type
            </label>
            <select
              id="crop-type"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            >
              <option value="">Select crop type</option>
              <option value="corn">Corn</option>
              <option value="soybeans">Soybeans</option>
              <option value="wheat">Wheat</option>
              <option value="apples">Apples</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="image-notes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Additional Notes (Optional)
            </label>
            <textarea
              id="image-notes"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Describe any symptoms or concerns..."
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <motion.button
            type="button"
            className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setShowImageUploadModal(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Image
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
              <p className="mt-1 text-green-100">
                Here&apos;s your farm overview
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <Tractor size={24} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Total Area</p>
              <p className="text-xl font-bold">
                {hideData
                  ? "••••••"
                  : formatArea(
                      fields.reduce((total, field) => total + field.area, 0),
                    )}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Active Crops</p>
              <p className="text-xl font-bold">
                {hideData
                  ? "••••••"
                  : crops.filter((c) => c.status === "growing").length}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Pending Tasks</p>
              <p className="text-xl font-bold">
                {hideData ? "••••••" : tasks.filter((t) => !t.completed).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {insightCards.map((insight) => (
          <InsightCardComponent key={insight.id} insight={insight} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Active Crops
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView("crops")}
            >
              View All
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {crops
              .filter((crop) => crop.status === "growing")
              .slice(0, 3)
              .map((crop) => (
                <div
                  key={crop.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div
                      className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${crop.color}20` }}
                    >
                      <Leaf size={20} style={{ color: crop.color }} />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        {crop.name} - {crop.variety}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {fields.find((f) => f.id === crop.fieldId)?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: `${crop.healthScore}%`,
                          backgroundColor:
                            crop.healthScore > 80
                              ? "#4ade80"
                              : crop.healthScore > 60
                                ? "#facc15"
                                : "#ef4444",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${crop.healthScore}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm font-medium dark:text-white">
                      {crop.healthScore}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Upcoming Tasks
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddTaskModal(true)}
            >
              <Plus size={14} className="mr-1" />
              Add Task
            </motion.button>
          </div>
          <div className="mt-4 space-y-1">
            {tasks
              .filter((task) => !task.completed)
              .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
              .slice(0, 3)
              .map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
          </div>
          <motion.button
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView("tasks")}
          >
            View All Tasks
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Weather Forecast
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gray-100/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView("weather")}
            >
              View Details
            </motion.button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {weatherForecast.slice(0, 3).map((weather, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-50 p-3 text-center dark:bg-gray-700/50"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {index === 0
                    ? "Today"
                    : index === 1
                      ? "Tomorrow"
                      : formatDate(weather.date)}
                </p>
                <div className="my-2 flex justify-center">
                  {getWeatherIcon(weather.condition)}
                </div>
                <p className="text-lg font-bold dark:text-white">
                  {weather.temperature}°F
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {weather.precipitation}&quot; rain
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Crop Issues
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gray-100/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowImageUploadModal(true)}
            >
              <ImagePlus size={14} className="mr-1" />
              Analyze Image
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {cropIssues.length > 0 ? (
              cropIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div
                      className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
                        issue.severity === "high"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : issue.severity === "medium"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      <Leaf size={18} />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        {issue.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {crops.find((c) => c.id === issue.cropId)?.name}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      issue.severity === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : issue.severity === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {issue.severity.charAt(0).toUpperCase() +
                      issue.severity.slice(1)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No active crop issues detected
              </p>
            )}
          </div>
        </div>
      </div>

      <CropYieldChart />

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            AI Recommendations
          </h3>
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView("advisor")}
          >
            <Sparkles size={14} className="mr-1" />
            View All
          </motion.button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {aiRecommendations.slice(0, 2).map((recommendation) => (
            <AIRecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Crops View
  const renderCrops = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Crops & Fields</h2>
        <div className="flex items-center space-x-2">
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={14} className="mr-1" />
            Add Crop
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Fields</h2>
        <motion.button
          className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={14} className="mr-1" />
          Add Field
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
      </div>

      <CropDistributionChart />

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Crop Issues
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cropIssues.map((issue) => (
            <CropIssueCard key={issue.id} issue={issue} />
          ))}
          {cropIssues.length === 0 && (
            <p className="col-span-2 text-center text-gray-500 dark:text-gray-400">
              No active crop issues detected
            </p>
          )}
        </div>
        <motion.button
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowImageUploadModal(true)}
        >
          <ImagePlus size={16} className="mr-1" />
          Analyze Crop Image
        </motion.button>
      </div>
    </div>
  );

  // Weather View
  const renderWeather = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold dark:text-white">Weather Forecast</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {weatherForecast.map((weather, index) => (
          <WeatherCard key={index} weather={weather} index={index} />
        ))}
      </div>

      <RainfallChart />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Weather Impact Analysis
          </h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                  <CloudRain
                    size={16}
                    className="text-blue-600 dark:text-blue-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Rainfall Alert
                  </p>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    Expected rainfall of 0.5&quot; in 2 days may affect
                    scheduled fertilizer application. Consider adjusting your
                    schedule.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-yellow-50/50 p-4 dark:bg-yellow-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/50">
                  <Sun
                    size={16}
                    className="text-yellow-600 dark:text-yellow-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Heat Stress Risk
                  </p>
                  <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                    Temperatures will reach 78°F today. Monitor corn fields for
                    signs of heat stress, especially during midday.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                  <Wind
                    size={16}
                    className="text-green-600 dark:text-green-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Ideal Spraying Conditions
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Tomorrow morning will have optimal conditions for pesticide
                    application with low wind speeds and no precipitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Irrigation Planning
          </h3>
          <div className="space-y-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="mr-3 h-3 w-3 rounded-full"
                      style={{ backgroundColor: field.color }}
                    />
                    <p className="font-medium dark:text-white">{field.name}</p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      field.id === "1"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : field.id === "2"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {field.id === "1"
                      ? "Optimal"
                      : field.id === "2"
                        ? "Needs Water"
                        : "Sufficient"}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Soil Moisture
                  </p>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: `${field.id === "1" ? 85 : field.id === "2" ? 45 : 70}%`,
                          backgroundColor:
                            field.id === "1"
                              ? "#4ade80"
                              : field.id === "2"
                                ? "#facc15"
                                : "#60a5fa",
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${field.id === "1" ? 85 : field.id === "2" ? 45 : 70}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm font-medium dark:text-white">
                      {field.id === "1" ? 85 : field.id === "2" ? 45 : 70}%
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {field.id === "1"
                    ? "No irrigation needed"
                    : field.id === "2"
                      ? "Schedule irrigation in 1 day"
                      : "Check again in 3 days"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Tasks View
  const renderTasks = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Tasks</h2>
        <motion.button
          className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddTaskModal(true)}
        >
          <Plus size={14} className="mr-1" />
          Add Task
        </motion.button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          High Priority
        </h3>
        <div className="space-y-1">
          {tasks
            .filter((task) => task.priority === "high" && !task.completed)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          {tasks.filter((task) => task.priority === "high" && !task.completed)
            .length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No high priority tasks
            </p>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Medium Priority
        </h3>
        <div className="space-y-1">
          {tasks
            .filter((task) => task.priority === "medium" && !task.completed)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          {tasks.filter((task) => task.priority === "medium" && !task.completed)
            .length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No medium priority tasks
            </p>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Low Priority
        </h3>
        <div className="space-y-1">
          {tasks
            .filter((task) => task.priority === "low" && !task.completed)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          {tasks.filter((task) => task.priority === "low" && !task.completed)
            .length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No low priority tasks
            </p>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Completed Tasks
        </h3>
        <div className="space-y-1">
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          {tasks.filter((task) => task.completed).length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No completed tasks
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Soil Analysis View
  const renderSoilAnalysis = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold dark:text-white">Soil Analysis</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SoilHealthRadarChart />

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Soil Nutrient Levels
          </h3>
          <div className="space-y-1">
            {soilData.map((nutrient, index) => (
              <SoilNutrientItem key={index} nutrient={nutrient} />
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Field Soil Health
        </h3>
        <div className="space-y-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="mr-3 h-3 w-3 rounded-full"
                    style={{ backgroundColor: field.color }}
                  />
                  <p className="font-medium dark:text-white">{field.name}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {field.soilType}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Soil Health Score
                </p>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${field.soilHealth}%`,
                        backgroundColor:
                          field.soilHealth > 80
                            ? "#4ade80"
                            : field.soilHealth > 60
                              ? "#facc15"
                              : "#ef4444",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${field.soilHealth}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-sm font-medium dark:text-white">
                    {field.soilHealth}%
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Last tested: {formatDate(field.lastTested)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Soil Improvement Recommendations
          </h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                  <Shovel
                    size={16}
                    className="text-green-600 dark:text-green-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Organic Matter Addition
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Add 2-3 tons of compost per acre to South Field to improve
                    organic matter content and soil structure.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-yellow-50/50 p-4 dark:bg-yellow-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/50">
                  <Leaf
                    size={16}
                    className="text-yellow-600 dark:text-yellow-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Nitrogen Supplementation
                  </p>
                  <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                    Apply 40-50 lbs/acre of nitrogen to North Field to address
                    deficiency and support corn growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                  <Seedling
                    size={16}
                    className="text-blue-600 dark:text-blue-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Cover Crop Planting
                  </p>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    Consider planting clover as a cover crop in West Orchard
                    during the off-season to improve soil health and reduce
                    erosion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Soil Testing Schedule
          </h3>
          <div className="space-y-4">
            {fields.map((field) => {
              const daysSinceTest = Math.ceil(
                (new Date().getTime() - field.lastTested.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const nextTestDue = daysSinceTest > 90;

              return (
                <div
                  key={field.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div
                      className="mr-3 h-3 w-3 rounded-full"
                      style={{ backgroundColor: field.color }}
                    />
                    <div>
                      <p className="font-medium dark:text-white">
                        {field.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last tested: {daysSinceTest} days ago
                      </p>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      nextTestDue
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {nextTestDue ? "Test Due" : "Up to Date"}
                  </div>
                </div>
              );
            })}
          </div>
          <motion.button
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Soil Test
          </motion.button>
        </div>
      </div>
    </div>
  );

  // AI Advisor View
  const renderAIAdvisor = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI Farming Advisor</h2>
              <p className="mt-1 text-green-100">
                Personalized insights and recommendations for your farm
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {aiRecommendations.map((recommendation) => (
          <AIRecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Farm Health Score
        </h3>
        <div className="flex justify-between sm:items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-green-600 to-emerald-600 p-1 sm:h-16 sm:w-16">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-base font-bold text-green-600 dark:bg-gray-800 dark:text-green-400 sm:text-xl">
                  82
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold dark:text-white">Good</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your farm is performing well overall
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-600"
                style={{ width: "82%" }}
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="ml-6 flex flex-col items-end">
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Poor (0-50)
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fair (51-70)
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Good (71-90)
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Excellent (91-100)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Strengths
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <Leaf
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">Crop Diversity</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Your farm has a good mix of crop types, which helps with pest
                  resistance and soil health.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <Droplets
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">Water Management</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Your irrigation efficiency is 12% better than regional
                  averages, saving water and reducing costs.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <BarChart3
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">Yield Performance</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Your corn and soybean yields are consistently above county
                  averages by 5-8%.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Areas to Improve
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <Shovel size={16} className="text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="font-medium dark:text-white">Soil Health</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  South Field has low organic matter content that could be
                  improved with amendments and cover cropping.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <Leaf size={16} className="text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="font-medium dark:text-white">Pest Management</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Early signs of fungal diseases in corn and apple crops need
                  prompt attention to prevent spread.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <Calendar
                  size={16}
                  className="text-red-600 dark:text-red-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">
                  Soil Testing Schedule
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  West Orchard is overdue for soil testing, which should be
                  conducted at least every 90 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Long-Term Projections
        </h3>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Based on your current farming practices, crop selection, and soil
            management, here&apos;s how your farm&apos;s performance looks for
            the future:
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
            <h4 className="font-medium text-green-800 dark:text-green-200">
              Yield Forecast
            </h4>
            <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              +8%
            </p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              Projected increase next season
            </p>
            <p className="mt-3 text-sm text-green-700 dark:text-green-300">
              Implementing all recommendations could increase this to +12%.
            </p>
          </div>

          <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">
              Soil Health
            </h4>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              +15%
            </p>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              Projected improvement in 1 year
            </p>
            <p className="mt-3 text-sm text-blue-700 dark:text-blue-300">
              Cover cropping and organic amendments will significantly improve
              soil structure.
            </p>
          </div>

          <div className="rounded-xl bg-yellow-50/50 p-4 dark:bg-yellow-900/20">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
              Resource Efficiency
            </h4>
            <p className="mt-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              -10%
            </p>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              Projected reduction in water usage
            </p>
            <p className="mt-3 text-sm text-yellow-700 dark:text-yellow-300">
              Optimized irrigation scheduling will reduce water usage while
              maintaining crop health.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          className="flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-base font-medium text-white shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChatModal(true)}
        >
          <MessageSquare size={18} className="mr-2" />
          Chat with AI Assistant
        </motion.button>
      </div>
    </div>
  );

  // Settings View
  const renderSettings = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold dark:text-white">Settings</h2>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Account Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-green-600 to-emerald-600">
                <Image
                  src={user.avatar || "/images/default-avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Farm Information</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.farmName}
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Farm
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Subscription Plan</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.plan === "premium"
                  ? "Premium Plan - $19.99/month"
                  : "Free Plan"}
              </p>
            </div>
            <motion.button
              className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                user.plan === "premium"
                  ? "border border-gray-300/80 text-gray-700 hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user.plan === "premium"
                ? "Manage Subscription"
                : "Upgrade to Premium"}
            </motion.button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">Password</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last changed 2 months ago
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Password
            </motion.button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={darkMode}
                onChange={toggleDarkMode}
                id="dark-mode"
              />
              <label
                htmlFor="dark-mode"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-600 dark:peer-focus:ring-green-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Hide Data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hide sensitive farm information
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={hideData}
                onChange={toggleHideData}
                id="hide-data"
              />
              <label
                htmlFor="hide-data"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-600 dark:peer-focus:ring-green-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your notification preferences
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Configure
            </motion.button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Integrations
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Weather Services</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect to weather forecast providers
              </p>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Soil Testing Labs</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect to soil testing laboratories
              </p>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">IoT Farm Equipment</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect to sensors and smart equipment
              </p>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Data & Privacy
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Data Export</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download all your financial data
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={14} className="mr-1 inline-block" />
              Export
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Privacy Settings</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage how your data is used
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lock size={14} className="mr-1 inline-block" />
              Manage
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Data Sharing</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Share anonymized data for agricultural research
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                defaultChecked={true}
                id="data-sharing"
              />
              <label
                htmlFor="data-sharing"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-600 dark:peer-focus:ring-green-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-red-600 dark:text-red-400">
                Delete Account
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and data
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-red-300/80 px-3 py-1.5 text-sm font-medium text-red-600 backdrop-blur-sm hover:bg-red-50 dark:border-red-900/80 dark:text-red-400 dark:hover:bg-red-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash size={14} className="mr-1 inline-block" />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}
    >
      {isMobile && <MobileHeader />}
      <div className="flex">
        {(!isMobile || showMobileMenu) && <Sidebar />}

        <main className={`flex-1 md:ml-72 ${isMobile ? "pb-20" : ""}`}>
          <div className="mx-auto max-w-7xl">
            {activeView === "dashboard" && renderDashboard()}
            {activeView === "crops" && renderCrops()}
            {activeView === "weather" && renderWeather()}
            {activeView === "tasks" && renderTasks()}
            {activeView === "analysis" && renderSoilAnalysis()}
            {activeView === "advisor" && renderAIAdvisor()}
            {activeView === "settings" && renderSettings()}
          </div>
        </main>
      </div>

      {isMobile && <MobileNavigation />}
      {/* ------------------------------------------------------ Modal --------------------------------------------------------------------- */}
      {/* Add task modal */}
      <AnimatePresence>{showAddTaskModal && <AddTaskModal />}</AnimatePresence>

      {/* Image upload modal */}
      <AnimatePresence>
        {showImageUploadModal && <ImageUploadModal />}
      </AnimatePresence>
      {/* Chat modal */}
      {showChatModal && (
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
        />
      )}

      {/* AI advise modal */}
      <AnimatePresence>
        {showAIAdviceModal && selectedRecommendation && <AIAdviceModal />}
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
        .scrollbar-hover::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
        .scrollbar-hover:hover::-webkit-scrollbar-thumb {
          background-color: #c7c7c7;
        }
      `}</style>
    </div>
  );
};

export default AIFarmingAssistant;
