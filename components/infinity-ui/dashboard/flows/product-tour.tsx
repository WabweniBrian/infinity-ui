"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Check,
  X,
  ArrowRight,
  Zap,
  Sparkles,
  Star,
  Download,
  Share2,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

// Types
interface FeatureStep {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl?: string;
  highlights?: string[];
  demoAction?: string;
}

// Sample feature steps
const features: FeatureStep[] = [
  {
    id: "dashboard",
    title: "Intuitive Dashboard",
    description:
      "Get a bird's-eye view of your entire workflow with our customizable dashboard. Drag and drop widgets to create the perfect layout for your team's needs.",
    image: "/placeholder.svg?height=600&width=800",
    videoUrl: "",
    highlights: [
      "Real-time data visualization",
      "Customizable widgets",
      "Team activity feed",
    ],
    demoAction: "Customize your dashboard by dragging widgets",
  },
  {
    id: "collaboration",
    title: "Seamless Collaboration",
    description:
      "Work together in real-time with your team members. Comment, share, and edit documents simultaneously without version conflicts.",
    image: "/placeholder.svg?height=600&width=800",
    videoUrl: "",
    highlights: ["Real-time co-editing", "Comment threads", "Version history"],
    demoAction: "Add a comment to the document",
  },
  {
    id: "automation",
    title: "Powerful Automation",
    description:
      "Save time with intelligent automation workflows. Set up triggers and actions to automate repetitive tasks and focus on what matters.",
    image: "/placeholder.svg?height=600&width=800",
    videoUrl: "",
    highlights: [
      "Visual workflow builder",
      "Conditional logic",
      "Integration with 100+ apps",
    ],
    demoAction: "Create a simple automation workflow",
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Make data-driven decisions with our comprehensive analytics suite. Track performance, identify trends, and generate insightful reports.",
    image: "/placeholder.svg?height=600&width=800",
    videoUrl: "",
    highlights: [
      "Custom report builder",
      "Predictive insights",
      "Exportable dashboards",
    ],
    demoAction: "Generate a sample report",
  },
  {
    id: "mobile",
    title: "Powerful Mobile Experience",
    description:
      "Stay productive on the go with our feature-rich mobile app. Access all your work and collaborate with your team from anywhere.",
    image: "/placeholder.svg?height=600&width=800",
    videoUrl: "",
    highlights: [
      "Offline mode",
      "Push notifications",
      "Touch-optimized interface",
    ],
    demoAction: "Try the mobile preview",
  },
];

const InteractiveProductTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Auto-advance steps when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < features.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 8000); // 8 seconds per step
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Show highlight animation after step change
  useEffect(() => {
    setShowHighlight(false);
    const timer = setTimeout(() => {
      setShowHighlight(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying]);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (tourRef.current?.requestFullscreen) {
        tourRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle next step
  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle demo completion
  const handleDemoComplete = () => {
    setDemoCompleted([...demoCompleted, features[currentStep].id]);
    setShowDemo(false);
  };

  // Check if demo is completed
  const isDemoCompleted = (featureId: string) => {
    return demoCompleted.includes(featureId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900">
      <div
        ref={tourRef}
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50 sm:flex-row">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
              Product Tour
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Discover the powerful features of our platform
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-3 sm:mt-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Tour
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Auto Play
                </>
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Fullscreen
                </>
              )}
            </button>

            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-100 p-2.5 text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            {features.map((feature, index) => (
              <div key={feature.id} className="flex flex-1 items-center">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    currentStep === index
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                      : isDemoCompleted(feature.id)
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "border border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {isDemoCompleted(feature.id) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                {index < features.length - 1 && (
                  <div
                    className={`flex-1 border-t-2 ${
                      index < currentStep
                        ? "border-indigo-600 dark:border-indigo-400"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 hidden justify-between px-1 md:flex">
            {features.map((feature, index) => (
              <div
                key={`label-${feature.id}`}
                className={`text-center text-xs font-medium ${
                  currentStep === index
                    ? "text-indigo-600 dark:text-indigo-400"
                    : isDemoCompleted(feature.id)
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-500 dark:text-gray-400"
                }`}
                style={{ width: `${100 / features.length}%` }}
              >
                {feature.title}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Feature Image/Video */}
          <div className="relative overflow-hidden border-b border-gray-100 dark:border-gray-700/50 lg:border-b-0 lg:border-r">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900"
              >
                {features[currentStep].videoUrl ? (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      src={features[currentStep].videoUrl}
                      className="h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                    />
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="absolute bottom-4 right-4 rounded-full bg-black/70 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/90"
                    >
                      {isVideoPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <Image
                    src={features[currentStep].image || "/default-image.jpg"}
                    alt={features[currentStep].title}
                    className="h-full w-full object-cover"
                    fill
                  />
                )}

                {/* Highlight Overlay */}
                {showHighlight && features[currentStep].highlights && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {features[currentStep].highlights?.map(
                        (highlight, index) => (
                          <motion.div
                            key={`highlight-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="absolute"
                            style={{
                              top: `${Math.random() * 200 - 100}px`,
                              left: `${Math.random() * 400 - 200}px`,
                            }}
                          >
                            <div className="flex items-center rounded-full bg-black/70 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
                              <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
                              {highlight}
                            </div>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Demo Button */}
            {features[currentStep].demoAction && (
              <div className="absolute bottom-4 left-4">
                <button
                  onClick={() => setShowDemo(true)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium shadow-md transition-all duration-200 hover:shadow-lg ${
                    isDemoCompleted(features[currentStep].id)
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                  }`}
                >
                  {isDemoCompleted(features[currentStep].id) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Demo Completed
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Try Interactive Demo
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Feature Description */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {features[currentStep].title}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {features[currentStep].description}
                </p>

                {/* Feature Highlights */}
                <div className="mt-6 space-y-3">
                  {features[currentStep].highlights?.map((highlight, index) => (
                    <div
                      key={`feature-${index}`}
                      className="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
                    >
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        {highlight}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resources
                  </button>
                  <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </button>
                  <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Learn More
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 p-6 dark:border-gray-700/50">
          <button
            onClick={handlePrevious}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${
              currentStep === 0
                ? "invisible"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </button>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {features.length}
          </div>

          <button
            onClick={handleNext}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${
              currentStep === features.length - 1
                ? "invisible"
                : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
            }`}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Interactive Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Interactive Demo: {features[currentStep].title}
                </h3>
                <button
                  onClick={() => setShowDemo(false)}
                  className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Try it yourself
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {features[currentStep].demoAction}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Demo Content - This would be customized for each feature */}
                <div className="mt-4 h-64 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      Interactive demo content would go here, specific to each
                      feature.
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleDemoComplete}
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Complete Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setShowDemo(false)}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Skip for now
                </button>
                <button
                  onClick={() => {
                    setShowDemo(false);
                    // This would open a chat or help window in a real implementation
                  }}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Get Help
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveProductTour;
