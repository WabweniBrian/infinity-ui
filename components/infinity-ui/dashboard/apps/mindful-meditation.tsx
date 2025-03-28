"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Clock,
  ChevronDown,
  Heart,
  Plus,
  Smile,
  Frown,
  Meh,
  Wind,
  Droplets,
  Music,
  CloudRain,
  Waves,
  Bird,
  Feather,
  Settings,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  audioSrc: string;
  imageSrc: string;
  isFavorite: boolean;
}

interface MoodEntry {
  id: string;
  date: string;
  mood: "great" | "good" | "neutral" | "bad" | "awful";
  notes: string;
}

interface SoundscapeSound {
  id: string;
  name: string;
  icon: string;
  audioSrc: string;
  volume: number;
  isActive: boolean;
}

interface MeditationSession {
  id: string;
  date: string;
  duration: number; // in minutes
  meditationId: string;
  meditationTitle: string;
}

interface MoodData {
  date: string;
  value: number;
}

const MindfulnessMeditationApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(
    "meditations",
  );
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [currentMeditation, setCurrentMeditation] = useState<Meditation | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [soundscapeSounds, setSoundscapeSounds] = useState<SoundscapeSound[]>(
    [],
  );
  const [meditationSessions, setMeditationSessions] = useState<
    MeditationSession[]
  >([]);
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMoodEntry, setNewMoodEntry] = useState<Partial<MoodEntry>>({
    date: new Date().toISOString().split("T")[0],
    mood: "neutral",
    notes: "",
  });
  const [isAddingMoodEntry, setIsAddingMoodEntry] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "guided" | "soundscape" | "timer"
  >("guided");
  const [timerDuration, setTimerDuration] = useState(10); // in minutes
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [totalMeditationMinutes, setTotalMeditationMinutes] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Initialize sample data
  useEffect(() => {
    // Sample meditations
    const sampleMeditations: Meditation[] = [
      {
        id: "med-1",
        title: "Mindful Breathing",
        description:
          "A gentle meditation focusing on the breath to calm the mind and reduce stress.",
        duration: 10,
        category: "Beginner",
        audioSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU",
        imageSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400",
        isFavorite: true,
      },
      {
        id: "med-2",
        title: "Body Scan Relaxation",
        description:
          "A progressive relaxation technique to release tension throughout the body.",
        duration: 15,
        category: "Relaxation",
        audioSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU",
        imageSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400",
        isFavorite: false,
      },
      {
        id: "med-3",
        title: "Loving-Kindness Meditation",
        description:
          "Cultivate feelings of compassion and love for yourself and others.",
        duration: 20,
        category: "Compassion",
        audioSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU",
        imageSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400",
        isFavorite: true,
      },
      {
        id: "med-4",
        title: "Morning Energizer",
        description: "Start your day with clarity and positive energy.",
        duration: 8,
        category: "Energy",
        audioSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU",
        imageSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400",
        isFavorite: false,
      },
      {
        id: "med-5",
        title: "Sleep Preparation",
        description: "Calm your mind and prepare for restful sleep.",
        duration: 25,
        category: "Sleep",
        audioSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU",
        imageSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400",
        isFavorite: false,
      },
      {
        id: "med-6",
        title: "Anxiety Relief",
        description: "Techniques to reduce anxiety and find inner peace.",
        duration: 12,
        category: "Stress Relief",
        audioSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU",
        imageSrc:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=400",
        isFavorite: true,
      },
    ];
    setMeditations(sampleMeditations);
    setCurrentMeditation(sampleMeditations[0]);

    // Sample mood entries
    const sampleMoodEntries: MoodEntry[] = [
      {
        id: "mood-1",
        date: "2023-06-15",
        mood: "great",
        notes: "Felt energized and focused all day. Meditation helped a lot.",
      },
      {
        id: "mood-2",
        date: "2023-06-14",
        mood: "good",
        notes: "Productive day, but felt a bit stressed in the afternoon.",
      },
      {
        id: "mood-3",
        date: "2023-06-13",
        mood: "neutral",
        notes: "Average day, nothing special.",
      },
      {
        id: "mood-4",
        date: "2023-06-12",
        mood: "bad",
        notes: "Difficult day, had trouble focusing.",
      },
      {
        id: "mood-5",
        date: "2023-06-11",
        mood: "good",
        notes: "Felt better after morning meditation.",
      },
    ];
    setMoodEntries(sampleMoodEntries);

    // Sample soundscape sounds
    const sampleSoundscapeSounds: SoundscapeSound[] = [
      {
        id: "sound-1",
        name: "Rain",
        icon: "CloudRain",
        audioSrc: "/placeholder.mp3",
        volume: 0.5,
        isActive: false,
      },
      {
        id: "sound-2",
        name: "Ocean Waves",
        icon: "Waves",
        audioSrc: "/placeholder.mp3",
        volume: 0.7,
        isActive: true,
      },
      {
        id: "sound-3",
        name: "Forest Birds",
        icon: "Bird",
        audioSrc: "/placeholder.mp3",
        volume: 0.4,
        isActive: false,
      },
      {
        id: "sound-4",
        name: "Wind Chimes",
        icon: "Wind",
        audioSrc: "/placeholder.mp3",
        volume: 0.3,
        isActive: false,
      },
      {
        id: "sound-5",
        name: "Gentle Stream",
        icon: "Droplets",
        audioSrc: "/placeholder.mp3",
        volume: 0.6,
        isActive: false,
      },
    ];
    setSoundscapeSounds(sampleSoundscapeSounds);

    // Sample meditation sessions
    const sampleMeditationSessions: MeditationSession[] = [
      {
        id: "session-1",
        date: "2023-06-15",
        duration: 10,
        meditationId: "med-1",
        meditationTitle: "Mindful Breathing",
      },
      {
        id: "session-2",
        date: "2023-06-14",
        duration: 15,
        meditationId: "med-2",
        meditationTitle: "Body Scan Relaxation",
      },
      {
        id: "session-3",
        date: "2023-06-13",
        duration: 20,
        meditationId: "med-3",
        meditationTitle: "Loving-Kindness Meditation",
      },
      {
        id: "session-4",
        date: "2023-06-11",
        duration: 8,
        meditationId: "med-4",
        meditationTitle: "Morning Energizer",
      },
      {
        id: "session-5",
        date: "2023-06-10",
        duration: 12,
        meditationId: "med-6",
        meditationTitle: "Anxiety Relief",
      },
    ];
    setMeditationSessions(sampleMeditationSessions);

    // Calculate stats
    const totalMinutes = sampleMeditationSessions.reduce(
      (sum, session) => sum + session.duration,
      0,
    );
    setTotalMeditationMinutes(totalMinutes);
    setTotalSessions(sampleMeditationSessions.length);
    setCurrentStreak(5);
    setLongestStreak(7);

    // Sample mood data for charts
    const sampleMoodData: MoodData[] = [
      { date: "Jun 10", value: 2 },
      { date: "Jun 11", value: 4 },
      { date: "Jun 12", value: 1 },
      { date: "Jun 13", value: 3 },
      { date: "Jun 14", value: 4 },
      { date: "Jun 15", value: 5 },
    ];
    setMoodData(sampleMoodData);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle panel expansion
  const togglePanel = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  // Format time (seconds to mm:ss)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Play/pause audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle audio time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle audio loaded metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  // Seek to position
  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number.parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setMeditations(
      meditations.map((meditation) => {
        if (meditation.id === id) {
          return { ...meditation, isFavorite: !meditation.isFavorite };
        }
        return meditation;
      }),
    );

    if (currentMeditation && currentMeditation.id === id) {
      setCurrentMeditation({
        ...currentMeditation,
        isFavorite: !currentMeditation.isFavorite,
      });
    }
  };

  // Add mood entry
  const addMoodEntry = () => {
    if (!newMoodEntry.mood) return;

    const moodEntry: MoodEntry = {
      id: `mood-${Date.now()}`,
      date: newMoodEntry.date || new Date().toISOString().split("T")[0],
      mood: newMoodEntry.mood as "great" | "good" | "neutral" | "bad" | "awful",
      notes: newMoodEntry.notes || "",
    };

    setMoodEntries([moodEntry, ...moodEntries]);

    // Reset form
    setNewMoodEntry({
      date: new Date().toISOString().split("T")[0],
      mood: "neutral",
      notes: "",
    });
    setIsAddingMoodEntry(false);

    // Update mood data for chart
    const moodValue =
      moodEntry.mood === "great"
        ? 5
        : moodEntry.mood === "good"
          ? 4
          : moodEntry.mood === "neutral"
            ? 3
            : moodEntry.mood === "bad"
              ? 2
              : 1;

    const date = new Date(moodEntry.date);
    const formattedDate = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;

    setMoodData([...moodData, { date: formattedDate, value: moodValue }]);
  };

  // Toggle soundscape sound
  const toggleSound = (id: string) => {
    setSoundscapeSounds(
      soundscapeSounds.map((sound) => {
        if (sound.id === id) {
          return { ...sound, isActive: !sound.isActive };
        }
        return sound;
      }),
    );
  };

  // Adjust sound volume
  const adjustSoundVolume = (id: string, newVolume: number) => {
    setSoundscapeSounds(
      soundscapeSounds.map((sound) => {
        if (sound.id === id) {
          return { ...sound, volume: newVolume };
        }
        return sound;
      }),
    );
  };

  // Start timer
  const startTimer = () => {
    setTimerRemaining(timerDuration * 60);
    setIsTimerActive(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimerRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop timer
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsTimerActive(false);
  };

  // Reset timer
  const resetTimer = () => {
    stopTimer();
    setTimerRemaining(timerDuration * 60);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Get mood icon
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "great":
        return <Smile className="h-5 w-5 text-emerald-500" />;
      case "good":
        return <Smile className="h-5 w-5 text-green-500" />;
      case "neutral":
        return <Meh className="h-5 w-5 text-amber-500" />;
      case "bad":
        return <Frown className="h-5 w-5 text-orange-500" />;
      case "awful":
        return <Frown className="h-5 w-5 text-red-500" />;
      default:
        return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get sound icon
  const getSoundIcon = (icon: string) => {
    switch (icon) {
      case "CloudRain":
        return <CloudRain className="h-5 w-5" />;
      case "Waves":
        return <Waves className="h-5 w-5" />;
      case "Bird":
        return <Bird className="h-5 w-5" />;
      case "Wind":
        return <Wind className="h-5 w-5" />;
      case "Droplets":
        return <Droplets className="h-5 w-5" />;
      default:
        return <Music className="h-5 w-5" />;
    }
  };

  // Filter meditations based on search query and selected category
  const filteredMeditations = meditations.filter((meditation) => {
    const matchesSearch =
      meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || meditation.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-full w-full rounded-none border-0" : "max-w-4xl"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
              <Feather className="h-5 w-5" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-indigo-400">
                Mindfulness Meditation
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Find peace and clarity in your daily practice
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {/* Player Panel */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("player")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Meditation Player
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    expandedPanel === "player" ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedPanel === "player" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Tabs */}
                      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setSelectedTab("guided")}
                            className={`border-b-2 px-4 py-2 text-sm font-medium ${
                              selectedTab === "guided"
                                ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                            }`}
                          >
                            Guided Meditation
                          </button>
                          <button
                            onClick={() => setSelectedTab("soundscape")}
                            className={`border-b-2 px-4 py-2 text-sm font-medium ${
                              selectedTab === "soundscape"
                                ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                            }`}
                          >
                            Soundscape
                          </button>
                          <button
                            onClick={() => setSelectedTab("timer")}
                            className={`border-b-2 px-4 py-2 text-sm font-medium ${
                              selectedTab === "timer"
                                ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                            }`}
                          >
                            Timer
                          </button>
                        </div>
                      </div>

                      {/* Guided Meditation Tab */}
                      {selectedTab === "guided" && currentMeditation && (
                        <div>
                          <div className="mb-6 flex flex-col items-center">
                            <div className="realtive mb-4 h-48 w-full overflow-hidden rounded-lg sm:h-64 sm:w-64">
                              <Image
                                src={
                                  currentMeditation.imageSrc ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                fill
                                alt={currentMeditation.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <h3 className="mb-1 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                              {currentMeditation.title}
                            </h3>
                            <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-400">
                              {currentMeditation.description}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              <span>{currentMeditation.duration} minutes</span>
                              <span>•</span>
                              <span>{currentMeditation.category}</span>
                            </div>
                          </div>

                          {/* Audio Player */}
                          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                            <audio
                              ref={audioRef}
                              src={currentMeditation.audioSrc}
                              onTimeUpdate={handleTimeUpdate}
                              onLoadedMetadata={handleLoadedMetadata}
                              onEnded={() => setIsPlaying(false)}
                            />

                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatTime(currentTime)}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatTime(duration)}
                              </span>
                            </div>

                            <div className="mb-4">
                              <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={seekTo}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-600"
                                style={{
                                  background: `linear-gradient(to right, #8b5cf6 ${(currentTime / (duration || 1)) * 100}%, #d1d5db ${(currentTime / (duration || 1)) * 100}%)`,
                                }}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={toggleMute}
                                  className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  {isMuted || volume === 0 ? (
                                    <VolumeX className="h-5 w-5" />
                                  ) : volume < 0.5 ? (
                                    <Volume1 className="h-5 w-5" />
                                  ) : (
                                    <Volume2 className="h-5 w-5" />
                                  )}
                                </button>
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={isMuted ? 0 : volume}
                                  onChange={(e) =>
                                    handleVolumeChange(
                                      Number.parseFloat(e.target.value),
                                    )
                                  }
                                  className="h-2 w-20 cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-600"
                                  style={{
                                    background: `linear-gradient(to right, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, #d1d5db ${(isMuted ? 0 : volume) * 100}%)`,
                                  }}
                                />
                              </div>

                              <div className="flex items-center space-x-4">
                                <button className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
                                  <SkipBack className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={togglePlayPause}
                                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-700 hover:to-indigo-700 dark:from-purple-500 dark:to-indigo-500 dark:hover:from-purple-600 dark:hover:to-indigo-600"
                                >
                                  {isPlaying ? (
                                    <Pause className="h-6 w-6" />
                                  ) : (
                                    <Play className="h-6 w-6 pl-1" />
                                  )}
                                </button>
                                <button className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
                                  <SkipForward className="h-5 w-5" />
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  toggleFavorite(currentMeditation.id)
                                }
                                className={`rounded-full p-2 ${
                                  currentMeditation.isFavorite
                                    ? "text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
                                    : "text-gray-400 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-gray-700"
                                }`}
                              >
                                <Heart
                                  className={`h-5 w-5 ${currentMeditation.isFavorite ? "fill-current" : ""}`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Soundscape Tab */}
                      {selectedTab === "soundscape" && (
                        <div>
                          <div className="mb-6 flex flex-col items-center">
                            <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 sm:h-64 sm:w-64">
                              <div className="flex h-full w-full items-center justify-center">
                                <Music className="h-16 w-16 text-white opacity-75" />
                              </div>
                            </div>
                            <h3 className="mb-1 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                              Custom Soundscape
                            </h3>
                            <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-400">
                              Create your perfect ambient environment by mixing
                              sounds
                            </p>
                          </div>

                          {/* Soundscape Mixer */}
                          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                            <h4 className="mb-4 text-base font-medium text-gray-800 dark:text-gray-200">
                              Sound Mixer
                            </h4>

                            <div className="space-y-4">
                              {soundscapeSounds.map((sound) => (
                                <div
                                  key={sound.id}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => toggleSound(sound.id)}
                                      className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
                                        sound.isActive
                                          ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                                      }`}
                                    >
                                      {getSoundIcon(sound.icon)}
                                    </button>
                                    <span
                                      className={`text-sm font-medium ${
                                        sound.isActive
                                          ? "text-gray-800 dark:text-gray-200"
                                          : "text-gray-500 dark:text-gray-400"
                                      }`}
                                    >
                                      {sound.name}
                                    </span>
                                  </div>

                                  <div className="flex w-32 items-center">
                                    <input
                                      type="range"
                                      min="0"
                                      max="1"
                                      step="0.01"
                                      value={sound.volume}
                                      onChange={(e) =>
                                        adjustSoundVolume(
                                          sound.id,
                                          Number.parseFloat(e.target.value),
                                        )
                                      }
                                      disabled={!sound.isActive}
                                      className={`h-2 w-full cursor-pointer appearance-none rounded-lg ${
                                        sound.isActive
                                          ? "bg-gray-300 dark:bg-gray-600"
                                          : "bg-gray-200 dark:bg-gray-700"
                                      }`}
                                      style={{
                                        background: sound.isActive
                                          ? `linear-gradient(to right, #8b5cf6 ${sound.volume * 100}%, #d1d5db ${sound.volume * 100}%)`
                                          : undefined,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 flex justify-center">
                              <button className="flex items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-white shadow-md hover:from-purple-700 hover:to-indigo-700 dark:from-purple-500 dark:to-indigo-500 dark:hover:from-purple-600 dark:hover:to-indigo-600">
                                <Play className="mr-2 h-5 w-5" />
                                Play Soundscape
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Timer Tab */}
                      {selectedTab === "timer" && (
                        <div>
                          <div className="mb-6 flex flex-col items-center">
                            <div className="mb-4 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg sm:h-64 sm:w-64">
                              <div className="text-center">
                                <div className="text-4xl font-bold sm:text-6xl">
                                  {isTimerActive
                                    ? formatTime(timerRemaining)
                                    : `${timerDuration}:00`}
                                </div>
                                <div className="mt-2 text-sm text-indigo-100 sm:text-base">
                                  {isTimerActive ? "Remaining" : "Minutes"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Timer Controls */}
                          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                            {!isTimerActive && (
                              <div className="mb-6">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Set Meditation Duration
                                </label>
                                <div className="flex items-center justify-between">
                                  <button
                                    onClick={() =>
                                      setTimerDuration(
                                        Math.max(1, timerDuration - 1),
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                  >
                                    -
                                  </button>
                                  <div className="relative w-full px-4">
                                    <input
                                      type="range"
                                      min="1"
                                      max="60"
                                      value={timerDuration}
                                      onChange={(e) =>
                                        setTimerDuration(
                                          Number.parseInt(e.target.value),
                                        )
                                      }
                                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-600"
                                      style={{
                                        background: `linear-gradient(to right, #8b5cf6 ${(timerDuration / 60) * 100}%, #d1d5db ${(timerDuration / 60) * 100}%)`,
                                      }}
                                    />
                                    <div className="absolute left-0 right-0 mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                      <span>1 min</span>
                                      <span>30 min</span>
                                      <span>60 min</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      setTimerDuration(
                                        Math.min(60, timerDuration + 1),
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-center space-x-4">
                              {isTimerActive ? (
                                <>
                                  <button
                                    onClick={stopTimer}
                                    className="flex items-center rounded-full bg-red-500 px-6 py-2 text-white shadow-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                  >
                                    <Pause className="mr-2 h-5 w-5" />
                                    Stop
                                  </button>
                                  <button
                                    onClick={resetTimer}
                                    className="flex items-center rounded-full bg-gray-200 px-6 py-2 text-gray-700 shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                  >
                                    <RefreshCw className="mr-2 h-5 w-5" />
                                    Reset
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={startTimer}
                                  className="flex items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-white shadow-md hover:from-purple-700 hover:to-indigo-700 dark:from-purple-500 dark:to-indigo-500 dark:hover:from-purple-600 dark:hover:to-indigo-600"
                                >
                                  <Play className="mr-2 h-5 w-5" />
                                  Start Meditation
                                </button>
                              )}
                            </div>

                            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                              Find a comfortable position, close your eyes, and
                              focus on your breath.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("stats")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Your Progress
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    expandedPanel === "stats" ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedPanel === "stats" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Stats Cards */}
                      <div className="mb-6 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
                          <div className="mb-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                            Total Time
                          </div>
                          <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                            {totalMeditationMinutes} min
                          </div>
                        </div>
                        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                          <div className="mb-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                            Sessions
                          </div>
                          <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                            {totalSessions}
                          </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                          <div className="mb-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                            Current Streak
                          </div>
                          <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                            {currentStreak} days
                          </div>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                          <div className="mb-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            Longest Streak
                          </div>
                          <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                            {longestStreak} days
                          </div>
                        </div>
                      </div>

                      {/* Mood Tracker */}
                      <div className="mb-6">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
                            Mood Tracker
                          </h3>
                          <button
                            onClick={() =>
                              setIsAddingMoodEntry(!isAddingMoodEntry)
                            }
                            className="flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Add Mood
                          </button>
                        </div>

                        {/* Add Mood Form */}
                        <AnimatePresence>
                          {isAddingMoodEntry && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                              <h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                How are you feeling today?
                              </h4>

                              <div className="mb-3 flex justify-between">
                                <button
                                  onClick={() =>
                                    setNewMoodEntry({
                                      ...newMoodEntry,
                                      mood: "awful",
                                    })
                                  }
                                  className={`flex flex-col items-center rounded-lg p-2 ${
                                    newMoodEntry.mood === "awful"
                                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <Frown className="h-6 w-6" />
                                  <span className="mt-1 text-xs">Awful</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setNewMoodEntry({
                                      ...newMoodEntry,
                                      mood: "bad",
                                    })
                                  }
                                  className={`flex flex-col items-center rounded-lg p-2 ${
                                    newMoodEntry.mood === "bad"
                                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <Frown className="h-6 w-6" />
                                  <span className="mt-1 text-xs">Bad</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setNewMoodEntry({
                                      ...newMoodEntry,
                                      mood: "neutral",
                                    })
                                  }
                                  className={`flex flex-col items-center rounded-lg p-2 ${
                                    newMoodEntry.mood === "neutral"
                                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <Meh className="h-6 w-6" />
                                  <span className="mt-1 text-xs">Neutral</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setNewMoodEntry({
                                      ...newMoodEntry,
                                      mood: "good",
                                    })
                                  }
                                  className={`flex flex-col items-center rounded-lg p-2 ${
                                    newMoodEntry.mood === "good"
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <Smile className="h-6 w-6" />
                                  <span className="mt-1 text-xs">Good</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setNewMoodEntry({
                                      ...newMoodEntry,
                                      mood: "great",
                                    })
                                  }
                                  className={`flex flex-col items-center rounded-lg p-2 ${
                                    newMoodEntry.mood === "great"
                                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <Smile className="h-6 w-6" />
                                  <span className="mt-1 text-xs">Great</span>
                                </button>
                              </div>

                              <div className="mb-3">
                                <textarea
                                  value={newMoodEntry.notes || ""}
                                  onChange={(e) =>
                                    setNewMoodEntry({
                                      ...newMoodEntry,
                                      notes: e.target.value,
                                    })
                                  }
                                  placeholder="Add notes about how you're feeling..."
                                  className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                                  rows={2}
                                />
                              </div>

                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setIsAddingMoodEntry(false)}
                                  className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={addMoodEntry}
                                  className="rounded-lg bg-purple-600 px-3 py-1 text-xs font-medium text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                >
                                  Save
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Mood Chart */}
                        <div className="h-32 w-full">
                          <ChartContainer
                            config={{
                              value: {
                                label: "Mood",
                                color: "hsl(var(--chart-1))",
                              },
                            }}
                            className="h-full"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={moodData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                <YAxis
                                  domain={[1, 5]}
                                  ticks={[1, 2, 3, 4, 5]}
                                  tick={{ fontSize: 10 }}
                                />
                                <ChartTooltip
                                  content={<ChartTooltipContent />}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke="var(--color-value)"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </div>

                      {/* Recent Moods */}
                      <div>
                        <h3 className="mb-3 text-base font-medium text-gray-800 dark:text-gray-200">
                          Recent Moods
                        </h3>
                        <div className="space-y-2">
                          {moodEntries.slice(0, 3).map((entry) => (
                            <div
                              key={entry.id}
                              className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                            >
                              <div className="mb-1 flex items-center justify-between">
                                <div className="flex items-center">
                                  {getMoodIcon(entry.mood)}
                                  <span className="ml-2 text-sm font-medium capitalize text-gray-800 dark:text-gray-200">
                                    {entry.mood}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(entry.date)}
                                </span>
                              </div>
                              {entry.notes && (
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {entry.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Meditations Panel */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("meditations")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Meditation Library
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    expandedPanel === "meditations" ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedPanel === "meditations" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Filters */}
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedCategory("all")}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              selectedCategory === "all"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setSelectedCategory("Beginner")}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              selectedCategory === "Beginner"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            Beginner
                          </button>
                          <button
                            onClick={() => setSelectedCategory("Relaxation")}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              selectedCategory === "Relaxation"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            Relaxation
                          </button>
                          <button
                            onClick={() => setSelectedCategory("Sleep")}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              selectedCategory === "Sleep"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            Sleep
                          </button>
                          <button
                            onClick={() => setSelectedCategory("Stress Relief")}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              selectedCategory === "Stress Relief"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            Stress Relief
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search meditations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-1 pl-8 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                          />
                          <svg
                            className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
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
                      </div>

                      {/* Meditations Grid */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredMeditations.map((meditation) => (
                          <div
                            key={meditation.id}
                            className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                            onClick={() => setCurrentMeditation(meditation)}
                          >
                            <div className="relative h-40 w-full overflow-hidden">
                              <Image
                                src={
                                  meditation.imageSrc ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                alt={meditation.title}
                                fill
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(meditation.id);
                                }}
                                className={`absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-all duration-200 dark:bg-black/50 ${
                                  meditation.isFavorite
                                    ? "text-red-500"
                                    : "text-gray-600 hover:text-red-500 dark:text-gray-300"
                                }`}
                              >
                                <Heart
                                  className={`h-4 w-4 ${meditation.isFavorite ? "fill-current" : ""}`}
                                />
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-gray-800 backdrop-blur-sm dark:bg-black/50 dark:text-white">
                                  {meditation.duration} min
                                </span>
                                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-gray-800 backdrop-blur-sm dark:bg-black/50 dark:text-white">
                                  {meditation.category}
                                </span>
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="mb-1 text-base font-medium text-gray-800 dark:text-gray-200">
                                {meditation.title}
                              </h3>
                              <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                                {meditation.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40">
                <Settings className="mr-1.5 h-4 w-4" />
                Settings
              </button>
              <button className="flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40">
                <HelpCircle className="mr-1.5 h-4 w-4" />
                Help
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Find your inner peace, one breath at a time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessMeditationApp;
