"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Aperture,
  ChevronDown,
  Clock,
  Copy,
  Crop,
  Download,
  Edit,
  Grid,
  HelpCircle,
  ImageIcon,
  Layers,
  Layout,
  Loader2,
  Maximize2,
  Minimize2,
  Moon,
  Palette,
  Plus,
  RefreshCw,
  Settings,
  Share,
  Shuffle,
  Sliders,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  isFavorite: boolean;
  style: string;
  aspectRatio: string;
}

interface StyleOption {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
}

interface AspectRatioOption {
  id: string;
  name: string;
  value: string;
  isSelected: boolean;
}

const AIImageGenerator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [styleOptions, setStyleOptions] = useState<StyleOption[]>([]);
  const [aspectRatioOptions, setAspectRatioOptions] = useState<
    AspectRatioOption[]
  >([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [numImages, setNumImages] = useState(4);
  const [guidanceScale, setGuidanceScale] = useState(7);
  const [steps, setSteps] = useState(30);
  const [seed, setSeed] = useState<number | null>(null);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [isShowingHistory, setIsShowingHistory] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState<
    "explore" | "variations" | "edit"
  >("explore");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState<GeneratedImage[]>([]);
  const [openPanels, setOpenPanels] = useState<Set<string>>(
    new Set(["generator", "results", "details"]),
  );

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
    // Sample style options
    const sampleStyleOptions: StyleOption[] = [
      {
        id: "photorealistic",
        name: "Photorealistic",
        description: "Highly detailed images that look like photographs",
        isSelected: true,
      },
      {
        id: "anime",
        name: "Anime",
        description: "Japanese animation style with vibrant colors",
        isSelected: false,
      },
      {
        id: "digital-art",
        name: "Digital Art",
        description: "Modern digital illustration style",
        isSelected: false,
      },
      {
        id: "oil-painting",
        name: "Oil Painting",
        description: "Classic oil painting with visible brushstrokes",
        isSelected: false,
      },
      {
        id: "watercolor",
        name: "Watercolor",
        description: "Soft watercolor painting with transparent colors",
        isSelected: false,
      },
      {
        id: "pixel-art",
        name: "Pixel Art",
        description: "Retro pixel-based digital art style",
        isSelected: false,
      },
      {
        id: "3d-render",
        name: "3D Render",
        description: "Computer-generated 3D imagery",
        isSelected: false,
      },
      {
        id: "sketch",
        name: "Sketch",
        description: "Hand-drawn pencil or pen sketch",
        isSelected: false,
      },
    ];
    setStyleOptions(sampleStyleOptions);

    // Sample aspect ratio options
    const sampleAspectRatioOptions: AspectRatioOption[] = [
      {
        id: "square",
        name: "Square",
        value: "1:1",
        isSelected: true,
      },
      {
        id: "portrait",
        name: "Portrait",
        value: "2:3",
        isSelected: false,
      },
      {
        id: "landscape",
        name: "Landscape",
        value: "3:2",
        isSelected: false,
      },
      {
        id: "wide",
        name: "Wide",
        value: "16:9",
        isSelected: false,
      },
      {
        id: "ultrawide",
        name: "Ultrawide",
        value: "21:9",
        isSelected: false,
      },
    ];
    setAspectRatioOptions(sampleAspectRatioOptions);

    // Sample generated images
    const sampleGeneratedImages: GeneratedImage[] = [
      {
        id: "img-1",
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt: "A futuristic cityscape with flying cars and neon lights",
        timestamp: "2023-06-15T14:30:00Z",
        isFavorite: true,
        style: "photorealistic",
        aspectRatio: "1:1",
      },
      {
        id: "img-2",
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt: "A serene mountain landscape with a lake at sunset",
        timestamp: "2023-06-14T10:15:00Z",
        isFavorite: false,
        style: "digital-art",
        aspectRatio: "1:1",
      },
      {
        id: "img-3",
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt: "A magical forest with glowing plants and mystical creatures",
        timestamp: "2023-06-13T16:45:00Z",
        isFavorite: true,
        style: "digital-art",
        aspectRatio: "2:3",
      },
      {
        id: "img-4",
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt: "An astronaut standing on an alien planet with two moons",
        timestamp: "2023-06-12T09:20:00Z",
        isFavorite: false,
        style: "photorealistic",
        aspectRatio: "3:2",
      },
      {
        id: "img-5",
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt:
          "A cyberpunk character with neon accessories and futuristic background",
        timestamp: "2023-06-11T20:10:00Z",
        isFavorite: false,
        style: "anime",
        aspectRatio: "1:1",
      },
    ];
    setGeneratedImages(sampleGeneratedImages);
    setFilteredImages(sampleGeneratedImages);
    setCurrentImage(sampleGeneratedImages[0]);

    // Sample recent prompts
    const sampleRecentPrompts: string[] = [
      "A futuristic cityscape with flying cars and neon lights",
      "A serene mountain landscape with a lake at sunset",
      "A magical forest with glowing plants and mystical creatures",
      "An astronaut standing on an alien planet with two moons",
      "A cyberpunk character with neon accessories and futuristic background",
    ];
    setRecentPrompts(sampleRecentPrompts);
  }, []);

  // Filter images when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = generatedImages.filter(
        (image) =>
          image.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          image.style.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(generatedImages);
    }
  }, [searchQuery, generatedImages]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle panel expansion
  const togglePanel = (panel: string) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(panel)) {
        next.delete(panel);
      } else {
        next.add(panel);
      }
      return next;
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  // Select style
  const selectStyle = (id: string) => {
    setStyleOptions(
      styleOptions.map((style) => ({
        ...style,
        isSelected: style.id === id,
      })),
    );
  };

  // Select aspect ratio
  const selectAspectRatio = (id: string) => {
    setAspectRatioOptions(
      aspectRatioOptions.map((ratio) => ({
        ...ratio,
        isSelected: ratio.id === id,
      })),
    );
  };

  // Generate random seed
  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000));
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setGeneratedImages(
      generatedImages.map((image) => {
        if (image.id === id) {
          return { ...image, isFavorite: !image.isFavorite };
        }
        return image;
      }),
    );

    if (currentImage && currentImage.id === id) {
      setCurrentImage({
        ...currentImage,
        isFavorite: !currentImage.isFavorite,
      });
    }
  };

  // Generate images
  const generateImages = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Get selected style
    const selectedStyle = styleOptions.find((style) => style.isSelected);

    // Get selected aspect ratio
    const selectedAspectRatio = aspectRatioOptions.find(
      (ratio) => ratio.isSelected,
    );

    // Add prompt to recent prompts if not already there
    if (!recentPrompts.includes(prompt)) {
      setRecentPrompts([prompt, ...recentPrompts.slice(0, 9)]);
    }

    // Simulate generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Generate new images
    const newImages: GeneratedImage[] = [];

    for (let i = 0; i < numImages; i++) {
      const dimensions = getDimensions(selectedAspectRatio?.value || "1:1");

      newImages.push({
        id: `img-${Date.now()}-${i}`,
        url: `https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp`,
        prompt: prompt,
        timestamp: new Date().toISOString(),
        isFavorite: false,
        style: selectedStyle?.id || "photorealistic",
        aspectRatio: selectedAspectRatio?.value || "1:1",
      });
    }

    clearInterval(interval);
    setGenerationProgress(100);

    // Add new images to the list
    setGeneratedImages([...newImages, ...generatedImages]);
    setFilteredImages([...newImages, ...filteredImages]);

    // Set current image to the first new image
    setCurrentImage(newImages[0]);

    // Reset generation state
    setIsGenerating(false);
    setGenerationProgress(0);
    // Expand results panel
    setOpenPanels((prev) => new Set(prev).add("results"));
  };

  // Get dimensions based on aspect ratio
  const getDimensions = (aspectRatio: string) => {
    const [width, height] = aspectRatio.split(":").map(Number);

    // Base size
    const baseSize = 512;

    if (width > height) {
      return {
        width: baseSize,
        height: Math.round(baseSize * (height / width)),
      };
    } else {
      return {
        width: Math.round(baseSize * (width / height)),
        height: baseSize,
      };
    }
  };

  // Load more images
  const loadMoreImages = async () => {
    setIsLoadingMore(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate more sample images
    const moreImages: GeneratedImage[] = [
      {
        id: `img-${Date.now()}-1`,
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt: "A steampunk airship flying over Victorian London",
        timestamp: new Date().toISOString(),
        isFavorite: false,
        style: "digital-art",
        aspectRatio: "1:1",
      },
      {
        id: `img-${Date.now()}-2`,
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt: "A cozy cabin in the woods during winter with snow falling",
        timestamp: new Date().toISOString(),
        isFavorite: false,
        style: "photorealistic",
        aspectRatio: "1:1",
      },
      {
        id: `img-${Date.now()}-3`,
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=768&width=512",
        prompt: "A fantasy character with magical abilities casting a spell",
        timestamp: new Date().toISOString(),
        isFavorite: false,
        style: "digital-art",
        aspectRatio: "2:3",
      },
      {
        id: `img-${Date.now()}-4`,
        url: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        prompt:
          "A futuristic laboratory with advanced technology and holograms",
        timestamp: new Date().toISOString(),
        isFavorite: false,
        style: "photorealistic",
        aspectRatio: "3:2",
      },
    ];

    setGeneratedImages([...generatedImages, ...moreImages]);
    setFilteredImages([...filteredImages, ...moreImages]);
    setIsLoadingMore(false);
  };

  // Edit current image prompt
  const editImagePrompt = () => {
    if (!currentImage || !editedPrompt.trim()) return;

    setIsEditingPrompt(false);

    // Update the current image with the edited prompt
    const updatedImage = {
      ...currentImage,
      prompt: editedPrompt,
    };

    setCurrentImage(updatedImage);

    // Update the image in the list
    setGeneratedImages(
      generatedImages.map((image) => {
        if (image.id === currentImage.id) {
          return updatedImage;
        }
        return image;
      }),
    );

    // Update filtered images as well
    setFilteredImages(
      filteredImages.map((image) => {
        if (image.id === currentImage.id) {
          return updatedImage;
        }
        return image;
      }),
    );
  };

  // Delete image
  const deleteImage = (id: string) => {
    // Remove the image from the list
    const updatedImages = generatedImages.filter((image) => image.id !== id);
    setGeneratedImages(updatedImages);
    setFilteredImages(filteredImages.filter((image) => image.id !== id));

    // If the deleted image is the current image, set the current image to the first image in the list
    if (currentImage && currentImage.id === id) {
      setCurrentImage(updatedImages.length > 0 ? updatedImages[0] : null);
    }
  };

  // Get selected style name
  const getSelectedStyleName = () => {
    const selectedStyle = styleOptions.find((style) => style.isSelected);
    return selectedStyle ? selectedStyle.name : "Photorealistic";
  };

  // Get selected aspect ratio value
  const getSelectedAspectRatioValue = () => {
    const selectedRatio = aspectRatioOptions.find((ratio) => ratio.isSelected);
    return selectedRatio ? selectedRatio.value : "1:1";
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-screen w-full overflow-y-auto rounded-none border-0" : "max-w-6xl"}`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div
            className={`flex items-center justify-between ${isFullscreen ? "mx-auto max-w-7xl" : ""}`}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
                  AI Image Generator
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create stunning images with the power of AI
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
        </div>

        <div
          className={`grid grid-cols-1 gap-4 p-4 md:grid-cols-3 ${isFullscreen ? "mx-auto max-w-7xl px-3" : ""}`}
        >
          {/* Generator Panel */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("generator")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Image Generator
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    openPanels.has("generator") ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openPanels.has("generator") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Describe the image you want to create
                        </label>
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="A futuristic cityscape with flying cars and neon lights, highly detailed, photorealistic..."
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/50"
                          rows={3}
                        />

                        {recentPrompts.length > 0 && (
                          <div className="mt-2">
                            <button
                              onClick={() =>
                                setIsShowingHistory(!isShowingHistory)
                              }
                              className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                              <Clock className="mr-1 h-3 w-3" />
                              {isShowingHistory
                                ? "Hide recent prompts"
                                : "Show recent prompts"}
                            </button>

                            <AnimatePresence>
                              {isShowingHistory && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-2 overflow-hidden"
                                >
                                  <div className="flex flex-wrap gap-2">
                                    {recentPrompts.map(
                                      (recentPrompt, index) => (
                                        <button
                                          key={index}
                                          onClick={() =>
                                            setPrompt(recentPrompt)
                                          }
                                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                          {recentPrompt.length > 30
                                            ? recentPrompt.substring(0, 30) +
                                              "..."
                                            : recentPrompt}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Style
                          </label>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Selected: {getSelectedStyleName()}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {styleOptions.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => selectStyle(style.id)}
                              className={`rounded-full px-3 py-1.5 text-xs ${
                                style.isSelected
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              }`}
                              title={style.description}
                            >
                              {style.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Aspect Ratio
                          </label>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Selected: {getSelectedAspectRatioValue()}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {aspectRatioOptions.map((ratio) => (
                            <button
                              key={ratio.id}
                              onClick={() => selectAspectRatio(ratio.id)}
                              className={`rounded-full px-3 py-1.5 text-xs ${
                                ratio.isSelected
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              }`}
                            >
                              {ratio.name} ({ratio.value})
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <button
                          onClick={() =>
                            setShowAdvancedOptions(!showAdvancedOptions)
                          }
                          className="flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                          <Sliders className="mr-2 h-4 w-4" />
                          {showAdvancedOptions
                            ? "Hide advanced options"
                            : "Show advanced options"}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                              showAdvancedOptions ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {showAdvancedOptions && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                              <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Negative Prompt (things to exclude)
                                </label>
                                <textarea
                                  value={negativePrompt}
                                  onChange={(e) =>
                                    setNegativePrompt(e.target.value)
                                  }
                                  placeholder="Low quality, blurry, distorted faces, bad anatomy..."
                                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/50"
                                  rows={2}
                                />
                              </div>

                              <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Number of Images to Generate
                                </label>
                                <div className="flex items-center">
                                  <input
                                    type="range"
                                    min="1"
                                    max="8"
                                    value={numImages}
                                    onChange={(e) =>
                                      setNumImages(parseInt(e.target.value))
                                    }
                                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-600"
                                  />
                                  <span className="ml-2 w-8 text-center text-gray-700 dark:text-gray-300">
                                    {numImages}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Guidance Scale (how closely to follow the
                                  prompt)
                                </label>
                                <div className="flex items-center">
                                  <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={guidanceScale}
                                    onChange={(e) =>
                                      setGuidanceScale(parseInt(e.target.value))
                                    }
                                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-600"
                                  />
                                  <span className="ml-2 w-8 text-center text-gray-700 dark:text-gray-300">
                                    {guidanceScale}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Generation Steps (higher = more detail,
                                  slower)
                                </label>
                                <div className="flex items-center">
                                  <input
                                    type="range"
                                    min="10"
                                    max="50"
                                    value={steps}
                                    onChange={(e) =>
                                      setSteps(parseInt(e.target.value))
                                    }
                                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-600"
                                  />
                                  <span className="ml-2 w-8 text-center text-gray-700 dark:text-gray-300">
                                    {steps}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Seed (for reproducible results)
                                </label>
                                <div className="flex items-center">
                                  <input
                                    type="number"
                                    value={seed !== null ? seed : ""}
                                    onChange={(e) =>
                                      setSeed(
                                        e.target.value
                                          ? parseInt(e.target.value)
                                          : null,
                                      )
                                    }
                                    placeholder="Random"
                                    className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/50"
                                  />
                                  <button
                                    onClick={generateRandomSeed}
                                    className="ml-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    title="Generate random seed"
                                  >
                                    <Shuffle className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={generateImages}
                          disabled={isGenerating || !prompt.trim()}
                          className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Wand2 className="mr-2 h-5 w-5" />
                              Generate Images
                            </>
                          )}
                        </button>
                      </div>

                      {isGenerating && (
                        <div className="mt-4">
                          <div className="mb-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Generating images...</span>
                            <span>{generationProgress}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500"
                              style={{ width: `${generationProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Panel */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("results")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Generated Images
                </h2>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      placeholder="Search images..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-40 rounded-full border border-gray-300 py-1 pl-8 pr-3 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400 sm:w-48"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <svg
                      className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400"
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
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                      openPanels.has("results") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {openPanels.has("results") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {filteredImages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <ImageIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            No images generated yet
                          </h3>
                          <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                            Enter a prompt and click &quot;Generate Images&quot;
                            to create AI-generated images.
                          </p>
                          <button
                            onClick={() => {
                              setOpenPanels(new Set(["generator"]));
                              setSearchQuery("");
                            }}
                            className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                          >
                            <Wand2 className="mr-2 h-4 w-4" />
                            Start Creating
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                  searchQuery
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                }`}
                              >
                                <Grid className="mr-1 h-3 w-3" />
                                {filteredImages.length}{" "}
                                {filteredImages.length === 1
                                  ? "image"
                                  : "images"}
                              </button>
                              {searchQuery && (
                                <button
                                  onClick={() => setSearchQuery("")}
                                  className="ml-2 flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                                >
                                  <Trash2 className="mr-1 h-3 w-3" />
                                  Clear search
                                </button>
                              )}
                            </div>
                            <div className="flex items-center">
                              <button className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                <Layout className="mr-1 h-3 w-3" />
                                Grid view
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {filteredImages.map((image) => (
                              <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                onClick={() => setCurrentImage(image)}
                              >
                                <div className="relative aspect-square overflow-hidden">
                                  <Image
                                    src={
                                      image.url ||
                                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                    }
                                    alt={image.prompt}
                                    fill
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(image.id);
                                    }}
                                    className={`absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-all duration-200 dark:bg-black/50 ${
                                      image.isFavorite
                                        ? "text-red-500"
                                        : "text-gray-600 hover:text-red-500 dark:text-gray-300"
                                    }`}
                                  >
                                    <Star
                                      className={`h-4 w-4 ${image.isFavorite ? "fill-current" : ""}`}
                                    />
                                  </button>
                                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-gray-800 backdrop-blur-sm dark:bg-black/50 dark:text-white">
                                      {image.aspectRatio}
                                    </span>
                                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-gray-800 backdrop-blur-sm dark:bg-black/50 dark:text-white">
                                      {image.style}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-2">
                                  <p className="line-clamp-1 text-xs text-gray-600 dark:text-gray-400">
                                    {image.prompt}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {filteredImages.length >= 8 && (
                            <div className="mt-6 flex justify-center">
                              <button
                                onClick={loadMoreImages}
                                disabled={isLoadingMore}
                                className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              >
                                {isLoadingMore ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Load more images
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Image Details Panel */}
          <div className="col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("details")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Image Details
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    openPanels.has("details") ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openPanels.has("details") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {currentImage ? (
                        <>
                          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                            <Image
                              src={
                                currentImage.url ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={currentImage.prompt}
                              width={600}
                              height={600}
                              className="h-auto w-full object-cover"
                            />
                          </div>

                          <div className="mb-4">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Prompt
                              </h3>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => {
                                    setEditedPrompt(currentImage.prompt);
                                    setIsEditingPrompt(true);
                                  }}
                                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                  title="Edit prompt"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      currentImage.prompt,
                                    )
                                  }
                                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                  title="Copy prompt"
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                              </div>
                            </div>

                            {isEditingPrompt ? (
                              <div className="mb-2">
                                <textarea
                                  value={editedPrompt}
                                  onChange={(e) =>
                                    setEditedPrompt(e.target.value)
                                  }
                                  className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                                  rows={3}
                                />
                                <div className="mt-2 flex justify-end space-x-2">
                                  <button
                                    onClick={() => setIsEditingPrompt(false)}
                                    className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={editImagePrompt}
                                    className="rounded-lg bg-purple-600 px-3 py-1 text-xs font-medium text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
                                {currentImage.prompt}
                              </p>
                            )}
                          </div>

                          <div className="mb-4 grid grid-cols-2 gap-3">
                            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Style
                              </div>
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {currentImage.style.charAt(0).toUpperCase() +
                                  currentImage.style.slice(1)}
                              </div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Aspect Ratio
                              </div>
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {currentImage.aspectRatio}
                              </div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Created
                              </div>
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {formatDate(currentImage.timestamp)}
                              </div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Status
                              </div>
                              <div className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                {currentImage.isFavorite ? (
                                  <>
                                    <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                                    Favorited
                                  </>
                                ) : (
                                  "Standard"
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Actions
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => toggleFavorite(currentImage.id)}
                                className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-medium ${
                                  currentImage.isFavorite
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                }`}
                              >
                                <Star
                                  className={`mr-1 h-3 w-3 ${currentImage.isFavorite ? "fill-current" : ""}`}
                                />
                                {currentImage.isFavorite
                                  ? "Unfavorite"
                                  : "Favorite"}
                              </button>
                              <button className="flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                <Download className="mr-1 h-3 w-3" />
                                Download
                              </button>
                              <button className="flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                <Share className="mr-1 h-3 w-3" />
                                Share
                              </button>
                              <button
                                onClick={() => {
                                  setPrompt(currentImage.prompt);
                                  togglePanel("generate");
                                }}
                                className="flex items-center rounded-lg bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                              >
                                <RefreshCw className="mr-1 h-3 w-3" />
                                Regenerate
                              </button>
                              <button
                                onClick={() => deleteImage(currentImage.id)}
                                className="flex items-center rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/40"
                              >
                                <Trash2 className="mr-1 h-3 w-3" />
                                Delete
                              </button>
                            </div>
                          </div>

                          <div>
                            <div className="mb-2">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Image Editing
                              </h3>
                            </div>
                            <div className="mb-3 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => setSelectedTab("explore")}
                                  className={`border-b-2 px-3 py-2 text-xs font-medium ${
                                    selectedTab === "explore"
                                      ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                                  }`}
                                >
                                  Explore
                                </button>
                                <button
                                  onClick={() => setSelectedTab("variations")}
                                  className={`border-b-2 px-3 py-2 text-xs font-medium ${
                                    selectedTab === "variations"
                                      ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                                  }`}
                                >
                                  Variations
                                </button>
                                <button
                                  onClick={() => setSelectedTab("edit")}
                                  className={`border-b-2 px-3 py-2 text-xs font-medium ${
                                    selectedTab === "edit"
                                      ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                                  }`}
                                >
                                  Edit
                                </button>
                              </div>
                            </div>

                            {selectedTab === "explore" && (
                              <div className="text-center">
                                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                  Discover similar images based on this style
                                </p>
                                <button className="flex w-full items-center justify-center rounded-lg bg-purple-100 px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40">
                                  <Sparkles className="mr-1 h-3 w-3" />
                                  Explore similar images
                                </button>
                              </div>
                            )}

                            {selectedTab === "variations" && (
                              <div className="text-center">
                                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                  Generate variations of this image with
                                  different styles
                                </p>
                                <button className="flex w-full items-center justify-center rounded-lg bg-purple-100 px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40">
                                  <Palette className="mr-1 h-3 w-3" />
                                  Create variations
                                </button>
                              </div>
                            )}

                            {selectedTab === "edit" && (
                              <div className="text-center">
                                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                  Edit this image with advanced tools
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  <button className="flex flex-col items-center rounded-lg bg-gray-100 p-2 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                    <Crop className="mb-1 h-4 w-4" />
                                    Crop
                                  </button>
                                  <button className="flex flex-col items-center rounded-lg bg-gray-100 p-2 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                    <Layers className="mb-1 h-4 w-4" />
                                    Layers
                                  </button>
                                  <button className="flex flex-col items-center rounded-lg bg-gray-100 p-2 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                    <Aperture className="mb-1 h-4 w-4" />
                                    Adjust
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <ImageIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            No image selected
                          </h3>
                          <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                            Select an image from the gallery to view details and
                            perform actions.
                          </p>
                        </div>
                      )}
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
              Powered by AI Image Generator
            </div>
          </div>
        </div>
      </div>
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

export default AIImageGenerator;
