"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Bell,
  BookOpen,
  FileText,
  Globe,
  HelpCircle,
  Languages,
  LogOut,
  Menu,
  Mic,
  PenTool,
  Play,
  Plus,
  Settings,
  Upload,
  Users,
  Video,
  X,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

// Types
type AppUser = {
  name: string;
  email: string;
  avatar: string;
  organization: string;
  role: "knowledge_broker" | "policymaker";
};

type PolicyBrief = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "review" | "approved" | "published";
  author: string;
  reviewers: string[];
  language: string;
  hasAudio: boolean;
  hasAnimation: boolean;
  tags: string[];
  color: string;
};

type View = "dashboard" | "create" | "briefs" | "viewer" | "settings";

// Sample data
const user: AppUser = {
  name: "Wabweni Brian",
  email: "brian@policyorg.com",
  avatar: "/images/default-avatar.png",
  organization: "Global Policy Institute",
  role: "knowledge_broker",
};

const policyBriefs: PolicyBrief[] = [
  {
    id: "1",
    title: "Climate Change Mitigation Strategies",
    description:
      "Analysis of effective climate change mitigation strategies for urban environments",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: "published",
    author: "Jane Smith",
    reviewers: ["John Doe", "Alice Johnson"],
    language: "English",
    hasAudio: true,
    hasAnimation: true,
    tags: ["climate", "urban planning", "sustainability"],
    color: "#4ade80",
  },
  {
    id: "2",
    title: "Public Health Response Framework",
    description:
      "Framework for coordinated public health responses to infectious disease outbreaks",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: "approved",
    author: "Jane Smith",
    reviewers: ["Robert Chen", "Maria Garcia"],
    language: "English",
    hasAudio: true,
    hasAnimation: false,
    tags: ["public health", "infectious disease", "emergency response"],
    color: "#60a5fa",
  },
  {
    id: "3",
    title: "Education Technology Integration",
    description:
      "Best practices for integrating technology in educational environments",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    status: "review",
    author: "Jane Smith",
    reviewers: ["David Wilson"],
    language: "English",
    hasAudio: false,
    hasAnimation: false,
    tags: ["education", "technology", "digital literacy"],
    color: "#f59e0b",
  },
  {
    id: "4",
    title: "Sustainable Agriculture Policies",
    description:
      "Policy recommendations for promoting sustainable agricultural practices",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    status: "draft",
    author: "Jane Smith",
    reviewers: [],
    language: "English",
    hasAudio: false,
    hasAnimation: false,
    tags: ["agriculture", "sustainability", "food security"],
    color: "#ef4444",
  },
];

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "sw", name: "Swahili" },
  { code: "hi", name: "Hindi" },
];

const AIPolicyBriefSystem = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showAnimationModal, setShowAnimationModal] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState<PolicyBrief | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleBriefSelect = (brief: PolicyBrief) => {
    setSelectedBrief(brief);
    setActiveView("viewer");
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Logo Component
  const Logo = () => (
    <div className="flex items-center">
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
        <FileText size={20} />
      </div>
      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
        PolicyAI
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
              <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-indigo-600">
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
                  {user.organization}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavItem
                id="dashboard"
                label="Dashboard"
                icon={<BookOpen className="h-5 w-5" />}
              />
              {user.role === "knowledge_broker" && (
                <NavItem
                  id="create"
                  label="Create Brief"
                  icon={<PenTool className="h-5 w-5" />}
                />
              )}
              <NavItem
                id="briefs"
                label="Policy Briefs"
                icon={<FileText className="h-5 w-5" />}
              />
              <NavItem
                id="settings"
                label="Settings"
                icon={<Settings className="h-5 w-5" />}
              />
            </nav>

            <div className="mt-6 space-y-2">
              <motion.button
                className="flex w-full items-center rounded-xl bg-blue-100 px-4 py-3 text-left text-sm font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUploadModal(true)}
              >
                <Upload className="mr-3 h-5 w-5" />
                Upload Policy Brief
              </motion.button>

              {user.role === "knowledge_broker" && (
                <motion.button
                  className="flex w-full items-center rounded-xl bg-indigo-100 px-4 py-3 text-left text-sm font-medium text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView("create")}
                >
                  <PenTool className="mr-3 h-5 w-5" />
                  Draft New Brief
                </motion.button>
              )}
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
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
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
            icon={<BookOpen className="h-6 w-6" />}
          />
          <NavButton
            id="briefs"
            label="Briefs"
            icon={<FileText className="h-6 w-6" />}
          />
          {user.role === "knowledge_broker" && (
            <NavButton
              id="create"
              label="Create"
              icon={<PenTool className="h-6 w-6" />}
            />
          )}
          <NavButton
            id="settings"
            label="Settings"
            icon={<Settings className="h-6 w-6" />}
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
          className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {icon}
        </div>
        <span
          className={`mt-1 text-xs ${isActive ? "font-medium text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  // Brief Card Component
  const BriefCard = ({ brief }: { brief: PolicyBrief }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
      onClick={() => handleBriefSelect(brief)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${brief.color}20` }}
          >
            <FileText size={20} style={{ color: brief.color }} />
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{brief.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {brief.author}
            </p>
          </div>
        </div>
        <div
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            brief.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : brief.status === "approved"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : brief.status === "review"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
          }`}
        >
          {brief.status.charAt(0).toUpperCase() + brief.status.slice(1)}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {brief.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {brief.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <p>Updated: {formatDate(brief.updatedAt)}</p>
        <div className="flex items-center space-x-2">
          {brief.hasAudio && (
            <Mic size={16} className="text-blue-500 dark:text-blue-400" />
          )}
          {brief.hasAnimation && (
            <Video size={16} className="text-indigo-500 dark:text-indigo-400" />
          )}
        </div>
      </div>
    </motion.div>
  );

  // Upload Modal Component
  const UploadModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowUploadModal(false)}
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
          onClick={() => setShowUploadModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">
          Upload Policy Brief
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Upload a PDF file of your policy brief to process it for audio
          transcription, translation, and animation
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
                Drag and drop your PDF here
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF files up to 10MB
              </p>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                accept="application/pdf"
              />
            </motion.div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="brief-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Brief Title
            </label>
            <input
              type="text"
              id="brief-title"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Enter brief title"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="brief-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Brief Description
            </label>
            <textarea
              id="brief-description"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Enter a short description"
            ></textarea>
          </div>

          <div className="mt-4">
            <label
              htmlFor="brief-tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="brief-tags"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="e.g., climate, policy, education"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <motion.button
            type="button"
            className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setShowUploadModal(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload & Process
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Translation Modal Component
  const TranslationModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowTranslationModal(false)}
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
          onClick={() => setShowTranslationModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">Translate Brief</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Select a language to translate this policy brief
        </p>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {languages.map((language) => (
              <motion.button
                key={language.code}
                className={`flex items-center rounded-xl border p-3 ${
                  currentLanguage === language.code
                    ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentLanguage(language.code)}
              >
                <Globe
                  className={`mr-2 h-5 w-5 ${
                    currentLanguage === language.code
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    currentLanguage === language.code
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {language.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <motion.button
            type="button"
            className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setShowTranslationModal(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTranslationModal(false)}
          >
            Translate
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Animation Modal Component
  const AnimationModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowAnimationModal(false)}
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
          onClick={() => setShowAnimationModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">
          Generate Animation
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create an animation to visualize key points from this policy brief
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="animation-section"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Section to Animate
            </label>
            <select
              id="animation-section"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            >
              <option value="introduction">Introduction</option>
              <option value="key-findings">Key Findings</option>
              <option value="recommendations">Policy Recommendations</option>
              <option value="conclusion">Conclusion</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="animation-style"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Animation Style
            </label>
            <select
              id="animation-style"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            >
              <option value="2d-flat">2D Flat Design</option>
              <option value="infographic">Infographic Style</option>
              <option value="isometric">Isometric</option>
              <option value="whiteboard">Whiteboard Animation</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="animation-duration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Duration (seconds)
            </label>
            <input
              type="range"
              id="animation-duration"
              min="15"
              max="120"
              step="15"
              defaultValue="30"
              className="mt-1 block w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>15s</span>
              <span>30s</span>
              <span>60s</span>
              <span>90s</span>
              <span>120s</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="animation-notes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Additional Notes (Optional)
            </label>
            <textarea
              id="animation-notes"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Any specific elements you'd like to emphasize..."
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <motion.button
            type="button"
            className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setShowAnimationModal(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Animation
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
              <p className="mt-1 text-blue-100">
                {user.role === "knowledge_broker"
                  ? "Create and manage policy briefs with AI assistance"
                  : "Explore and interact with policy briefs"}
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <FileText size={24} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Total Briefs</p>
              <p className="text-xl font-bold">{policyBriefs.length}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Published</p>
              <p className="text-xl font-bold">
                {policyBriefs.filter((b) => b.status === "published").length}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">In Review</p>
              <p className="text-xl font-bold">
                {policyBriefs.filter((b) => b.status === "review").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Recent Policy Briefs
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView("briefs")}
            >
              View All
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {policyBriefs.slice(0, 3).map((brief) => (
              <div
                key={brief.id}
                className="flex cursor-pointer items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                onClick={() => handleBriefSelect(brief)}
              >
                <div className="flex items-center">
                  <div
                    className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${brief.color}20` }}
                  >
                    <FileText size={20} style={{ color: brief.color }} />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{brief.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated: {formatDate(brief.updatedAt)}
                    </p>
                  </div>
                </div>
                <div
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    brief.status === "published"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : brief.status === "approved"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : brief.status === "review"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }`}
                >
                  {brief.status.charAt(0).toUpperCase() + brief.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Quick Actions
            </h3>
            {user.role === "knowledge_broker" && (
              <motion.button
                className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("create")}
              >
                <Plus size={14} className="mr-1" />
                New Brief
              </motion.button>
            )}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <motion.button
              className="flex items-center rounded-xl bg-blue-100 p-4 text-left text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="mr-3 h-6 w-6" />
              <div>
                <p className="font-medium">Upload Brief</p>
                <p className="text-xs">Import PDF document</p>
              </div>
            </motion.button>

            <motion.button
              className="flex items-center rounded-xl bg-indigo-100 p-4 text-left text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTranslationModal(true)}
            >
              <Globe className="mr-3 h-6 w-6" />
              <div>
                <p className="font-medium">Translate</p>
                <p className="text-xs">Convert to other languages</p>
              </div>
            </motion.button>

            <motion.button
              className="flex items-center rounded-xl bg-purple-100 p-4 text-left text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAnimationModal(true)}
            >
              <Video className="mr-3 h-6 w-6" />
              <div>
                <p className="font-medium">Animate</p>
                <p className="text-xs">Create visual animations</p>
              </div>
            </motion.button>

            <motion.button
              className="flex items-center rounded-xl bg-green-100 p-4 text-left text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlayAudio}
            >
              <Play className="mr-3 h-6 w-6" />
              <div>
                <p className="font-medium">Listen</p>
                <p className="text-xs">Audio playback of briefs</p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {user.role === "knowledge_broker" && (
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Briefs Pending Review
          </h3>
          <div className="space-y-4">
            {policyBriefs
              .filter((b) => b.status === "review")
              .map((brief) => (
                <div
                  key={brief.id}
                  className="flex cursor-pointer items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                  onClick={() => handleBriefSelect(brief)}
                >
                  <div className="flex items-center">
                    <div
                      className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${brief.color}20` }}
                    >
                      <FileText size={20} style={{ color: brief.color }} />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        {brief.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Reviewers: {brief.reviewers.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Review
                    </motion.button>
                  </div>
                </div>
              ))}
            {policyBriefs.filter((b) => b.status === "review").length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No briefs pending review
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Create Brief View
  const renderCreateBrief = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">
          Create New Policy Brief
        </h2>
        <div className="flex space-x-2">
          <motion.button
            className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Draft
          </motion.button>
          <motion.button
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit for Review
          </motion.button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="brief-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Brief Title
            </label>
            <input
              type="text"
              id="brief-title"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Enter brief title"
            />
          </div>

          <div>
            <label
              htmlFor="brief-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Brief Description
            </label>
            <textarea
              id="brief-description"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Enter a short description"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="brief-tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="brief-tags"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="e.g., climate, policy, education"
            />
          </div>

          <div>
            <label
              htmlFor="brief-reviewers"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Reviewers
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="text"
                id="brief-reviewers"
                className="block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
                placeholder="Search for reviewers"
              />
              <motion.button
                className="rounded-xl bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Users size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Brief Content
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="brief-section-1"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Executive Summary
            </label>
            <textarea
              id="brief-section-1"
              rows={4}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Provide a concise summary of the brief"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="brief-section-2"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Introduction
            </label>
            <textarea
              id="brief-section-2"
              rows={4}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Introduce the policy issue and context"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="brief-section-3"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Key Findings
            </label>
            <textarea
              id="brief-section-3"
              rows={6}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Present the evidence and analysis findings"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="brief-section-4"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Policy Recommendations
            </label>
            <textarea
              id="brief-section-4"
              rows={6}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Outline specific policy recommendations based on the findings"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="brief-section-5"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Conclusion
            </label>
            <textarea
              id="brief-section-5"
              rows={4}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Summarize the key points and recommendations"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Media Options
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <motion.button
            className="flex flex-col items-center rounded-xl bg-blue-100 p-4 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mic className="mb-2 h-8 w-8" />
            <p className="font-medium">Generate Audio</p>
            <p className="text-center text-xs">Create audio version of brief</p>
          </motion.button>

          <motion.button
            className="flex flex-col items-center rounded-xl bg-indigo-100 p-4 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Languages className="mb-2 h-8 w-8" />
            <p className="font-medium">Translate</p>
            <p className="text-center text-xs">Create multilingual versions</p>
          </motion.button>

          <motion.button
            className="flex flex-col items-center rounded-xl bg-purple-100 p-4 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Video className="mb-2 h-8 w-8" />
            <p className="font-medium">Create Animation</p>
            <p className="text-center text-xs">Visualize key concepts</p>
          </motion.button>
        </div>
      </div>
    </div>
  );

  // Briefs View
  const renderBriefs = () => (
    <div className="space-y-6 p-6">
      <div className="items-center justify-between sm:flex">
        <h2 className="text-xl font-bold dark:text-white">Policy Briefs</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search briefs..."
              className="rounded-xl border border-gray-300 bg-white/90 px-3 py-1.5 pr-8 text-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-2.5 top-2 h-4 w-4 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {user.role === "knowledge_broker" && (
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView("create")}
            >
              <Plus size={14} className="mr-1" />
              New Brief
            </motion.button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {policyBriefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );

  // Brief Viewer
  const renderBriefViewer = () => {
    if (!selectedBrief) return null;

    return (
      <div className="space-y-6 p-6">
        <div className="items-center justify-between sm:flex">
          <div className="flex items-center">
            <motion.button
              className="mr-3 shrink-0 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveView("briefs")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <h2 className="text-base font-bold dark:text-white sm:text-xl">
              {selectedBrief.title}
            </h2>
          </div>
          <div className="mt-2 flex space-x-2 sm:mt-0">
            {user.role === "knowledge_broker" && (
              <motion.button
                className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit
              </motion.button>
            )}
            <motion.button
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download PDF
            </motion.button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center">
                <div
                  className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${selectedBrief.color}20` }}
                >
                  <FileText size={20} style={{ color: selectedBrief.color }} />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">
                    {selectedBrief.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By {selectedBrief.author} •{" "}
                    {formatDate(selectedBrief.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                selectedBrief.status === "published"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : selectedBrief.status === "approved"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : selectedBrief.status === "review"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
              }`}
            >
              {selectedBrief.status.charAt(0).toUpperCase() +
                selectedBrief.status.slice(1)}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-300">
              {selectedBrief.description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedBrief.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Brief Content
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <h4>Executive Summary</h4>
            <p>
              This policy brief examines the current state of{" "}
              {selectedBrief.tags[0]} policies and provides evidence-based
              recommendations for policymakers. Our analysis shows that
              integrated approaches yield the most sustainable outcomes.
            </p>

            <h4>Introduction</h4>
            <p>
              {selectedBrief.title} has become an increasingly important issue
              for policymakers worldwide. This brief synthesizes the latest
              research and provides actionable recommendations based on
              empirical evidence.
            </p>

            <h4>Key Findings</h4>
            <ul>
              <li>
                Finding 1: Integrated policy approaches show 30% better outcomes
                than siloed strategies.
              </li>
              <li>
                Finding 2: Community engagement significantly increases policy
                adoption and effectiveness.
              </li>
              <li>
                Finding 3: Data-driven decision making improves resource
                allocation by up to 25%.
              </li>
              <li>
                Finding 4: Long-term planning with 5+ year horizons yields more
                sustainable results.
              </li>
            </ul>

            <h4>Policy Recommendations</h4>
            <ol>
              <li>Implement integrated cross-sector coordination mechanisms</li>
              <li>
                Establish community feedback channels and participatory
                processes
              </li>
              <li>Develop robust data collection and analysis frameworks</li>
              <li>
                Create long-term strategic plans with clear milestones and
                evaluation metrics
              </li>
            </ol>

            <h4>Conclusion</h4>
            <p>
              The evidence presented in this brief demonstrates that effective{" "}
              {selectedBrief.tags[0]} policies require integrated approaches,
              community engagement, data-driven decision making, and long-term
              planning. By implementing these recommendations, policymakers can
              achieve more sustainable and equitable outcomes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              <Mic className="mb-3 h-10 w-10 shrink-0 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold dark:text-white">
                Audio Version
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Listen to this policy brief read aloud with natural voice
              </p>
              <div className="mt-4 flex w-full items-center justify-center">
                <audio
                  ref={audioRef}
                  className="hidden"
                  src="/sample-audio.mp3"
                />
                <motion.button
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayAudio}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </motion.button>
              </div>
              <motion.button
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-100 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Audio
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              <Globe className="mb-3 h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold dark:text-white">
                Translations
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Access this brief in multiple languages
              </p>
              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                {languages.slice(0, 4).map((language) => (
                  <motion.button
                    key={language.code}
                    className={`flex items-center justify-center rounded-lg border px-2 py-1 text-xs ${
                      currentLanguage === language.code
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/20 dark:text-indigo-300"
                        : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentLanguage(language.code)}
                  >
                    {language.name}
                  </motion.button>
                ))}
              </div>
              <motion.button
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-indigo-100 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTranslationModal(true)}
              >
                More Languages
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              <Video className="mb-3 h-10 w-10 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold dark:text-white">
                Animations
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Visual animations of key concepts and data
              </p>
              <div className="mt-4 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="relative flex aspect-video items-center justify-center">
                  <Image
                    src="/default-image.jpg"
                    alt="Animation preview"
                    width={320}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-purple-600 shadow-md backdrop-blur-sm dark:bg-gray-800/80 dark:text-purple-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.button
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-purple-100 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAnimationModal(true)}
              >
                Generate Animation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

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
              <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-indigo-600">
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
              <p className="font-medium dark:text-white">Organization</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.organization}
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change
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
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-600 dark:peer-focus:ring-blue-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Default Language</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set your preferred language
              </p>
            </div>
            <select
              className="rounded-lg border border-gray-300 bg-white/90 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive updates about briefs
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                defaultChecked={true}
                id="notifications"
              />
              <label
                htmlFor="notifications"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-600 dark:peer-focus:ring-blue-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">Audio Preferences</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set default voice and speed
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
          AI Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Voice Type</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select preferred voice for audio generation
              </p>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white/90 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white">
              <option value="female-1">Female Voice 1</option>
              <option value="female-2">Female Voice 2</option>
              <option value="male-1">Male Voice 1</option>
              <option value="male-2">Male Voice 2</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Animation Style</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Default style for generated animations
              </p>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white/90 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white">
              <option value="2d-flat">2D Flat Design</option>
              <option value="infographic">Infographic Style</option>
              <option value="isometric">Isometric</option>
              <option value="whiteboard">Whiteboard Animation</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">Translation Quality</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Balance between speed and accuracy
              </p>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white/90 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white">
              <option value="standard">Standard</option>
              <option value="enhanced">Enhanced</option>
              <option value="premium">Premium</option>
            </select>
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
            {activeView === "create" && renderCreateBrief()}
            {activeView === "briefs" && renderBriefs()}
            {activeView === "viewer" && renderBriefViewer()}
            {activeView === "settings" && renderSettings()}
          </div>
        </main>
      </div>

      {isMobile && <MobileNavigation />}

      {/* Modals */}
      <AnimatePresence>{showUploadModal && <UploadModal />}</AnimatePresence>
      <AnimatePresence>
        {showTranslationModal && <TranslationModal />}
      </AnimatePresence>
      <AnimatePresence>
        {showAnimationModal && <AnimationModal />}
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

export default AIPolicyBriefSystem;
