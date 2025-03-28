"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  ChevronDown,
  Copy,
  Download,
  Edit,
  ImageIcon,
  Layers,
  Loader2,
  Maximize2,
  Minimize2,
  Palette,
  Plus,
  Redo,
  RotateCcw,
  RotateCw,
  Save,
  Share,
  Shirt,
  Shuffle,
  Sparkles,
  Trash2,
  Type,
  Undo,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface DesignElement {
  id: string;
  type: "pattern" | "graphic" | "text" | "color";
  value: string;
  position?: { x: number; y: number };
  scale?: number;
  rotation?: number;
  selected: boolean;
  color?: string;
}

interface GarmentDesign {
  id: string;
  name: string;
  type: "tshirt" | "hoodie" | "dress" | "pants" | "jacket";
  elements: DesignElement[];
  thumbnail: string;
  saved: boolean;
}

interface StylePreference {
  id: string;
  name: string;
  selected: boolean;
}

// Sample garment images
const garmentImages = {
  tshirt: "/deafult-image.jpg",
  hoodie: "/deafult-image.jpg",
  dress: "/deafult-image.jpg",
  pants: "/deafult-image.jpg",
  jacket: "/deafult-image.jpg",
};

// Sample pattern and graphic images
const designAssets = {
  patterns: {
    geometric:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    abstract:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    floral:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stripes:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    dots: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    camouflage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  graphics: {
    mountain:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    wave: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    star: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    "abstract-shape":
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    animal:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    plant:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
};

const AIFashionDesigner = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<GarmentDesign | null>(
    null,
  );
  const [savedDesigns, setSavedDesigns] = useState<GarmentDesign[]>([]);
  const [garmentType, setGarmentType] = useState<string>("tshirt");
  const [stylePreferences, setStylePreferences] = useState<StylePreference[]>(
    [],
  );
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [designPrompt, setDesignPrompt] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"front" | "back" | "3d">("front");
  const [zoom, setZoom] = useState<number>(100);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [designHistory, setDesignHistory] = useState<GarmentDesign[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [openPanels, setOpenPanels] = useState<Set<string>>(
    new Set(["designer", "results", "details"]),
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
    // Sample style preferences
    const sampleStylePreferences: StylePreference[] = [
      { id: "minimalist", name: "Minimalist", selected: false },
      { id: "streetwear", name: "Streetwear", selected: true },
      { id: "vintage", name: "Vintage", selected: false },
      { id: "bohemian", name: "Bohemian", selected: false },
      { id: "athletic", name: "Athletic", selected: false },
      { id: "formal", name: "Formal", selected: false },
      { id: "punk", name: "Punk", selected: false },
      { id: "preppy", name: "Preppy", selected: false },
    ];
    setStylePreferences(sampleStylePreferences);

    // Sample color palette
    const sampleColorPalette = [
      "#FF5A5F",
      "#3A86FF",
      "#8338EC",
      "#FB5607",
      "#06D6A0",
      "#FFBE0B",
    ];
    setColorPalette(sampleColorPalette);

    // Sample saved designs
    const sampleSavedDesigns: GarmentDesign[] = [
      {
        id: "design-1",
        name: "Urban Explorer",
        type: "tshirt",
        elements: [
          { id: "element-1", type: "color", value: "#3A86FF", selected: false },
          {
            id: "element-2",
            type: "pattern",
            value: "geometric",
            position: { x: 50, y: 50 },
            scale: 1,
            rotation: 0,
            selected: false,
          },
          {
            id: "element-3",
            type: "graphic",
            value: "mountain",
            position: { x: 50, y: 40 },
            scale: 1,
            rotation: 0,
            selected: false,
          },
        ],
        thumbnail:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        saved: true,
      },
      {
        id: "design-2",
        name: "Neon Dreams",
        type: "hoodie",
        elements: [
          { id: "element-4", type: "color", value: "#FF5A5F", selected: false },
          {
            id: "element-5",
            type: "pattern",
            value: "abstract",
            position: { x: 50, y: 50 },
            scale: 1,
            rotation: 0,
            selected: false,
          },
          {
            id: "element-6",
            type: "text",
            value: "FUTURE",
            position: { x: 50, y: 70 },
            scale: 1,
            rotation: 0,
            selected: false,
            color: "#FFFFFF",
          },
        ],
        thumbnail:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        saved: true,
      },
      {
        id: "design-3",
        name: "Vintage Vibes",
        type: "dress",
        elements: [
          { id: "element-7", type: "color", value: "#FFBE0B", selected: false },
          {
            id: "element-8",
            type: "pattern",
            value: "floral",
            position: { x: 50, y: 50 },
            scale: 1,
            rotation: 0,
            selected: false,
          },
          {
            id: "element-9",
            type: "graphic",
            value: "retro-camera",
            position: { x: 50, y: 40 },
            scale: 1,
            rotation: 0,
            selected: false,
          },
        ],
        thumbnail:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        saved: true,
      },
    ];
    setSavedDesigns(sampleSavedDesigns);

    // Set initial current design
    const initialDesign: GarmentDesign = {
      id: "current-design",
      name: "Untitled Design",
      type: "tshirt",
      elements: [
        {
          id: "current-element-1",
          type: "color",
          value: "#3A86FF",
          selected: false,
        },
      ],
      thumbnail:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      saved: false,
    };

    setCurrentDesign(initialDesign);
    // Initialize history with initial design
    setDesignHistory([initialDesign]);
    setHistoryIndex(0);
  }, []);

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

  // Toggle style preference selection
  const toggleStylePreference = (id: string) => {
    setStylePreferences(
      stylePreferences.map((pref) => ({
        ...pref,
        selected: pref.id === id ? !pref.selected : pref.selected,
      })),
    );
  };

  // Select element
  const selectElement = (id: string | null) => {
    if (!currentDesign) return;

    setSelectedElement(id);

    setCurrentDesign({
      ...currentDesign,
      elements: currentDesign.elements.map((element) => ({
        ...element,
        selected: element.id === id,
      })),
    });
  };

  // Start dragging an element
  const startDragging = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggedElement(id);
    selectElement(id);
  };

  // Add element
  const addElement = (
    type: "pattern" | "graphic" | "text" | "color",
    value: string,
  ) => {
    if (!currentDesign) return;

    const newElement: DesignElement = {
      id: `element-${Date.now()}`,
      type,
      value,
      position: { x: 50, y: 50 },
      scale: 1,
      rotation: 0,
      selected: false,
      color: type === "text" ? "#FFFFFF" : undefined,
    };

    const updatedDesign = {
      ...currentDesign,
      elements: [...currentDesign.elements, newElement],
    };

    setCurrentDesign(updatedDesign);
    addToHistory(updatedDesign);
  };

  // Remove element
  const removeElement = (id: string) => {
    if (!currentDesign) return;

    const updatedDesign = {
      ...currentDesign,
      elements: currentDesign.elements.filter((element) => element.id !== id),
    };

    setCurrentDesign(updatedDesign);
    addToHistory(updatedDesign);

    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  // Update element
  const updateElement = useCallback(
    (id: string, updates: Partial<DesignElement>) => {
      if (!currentDesign) return;

      const updatedDesign = {
        ...currentDesign,
        elements: currentDesign.elements.map((element) => {
          if (element.id === id) {
            return { ...element, ...updates };
          }
          return element;
        }),
      };

      setCurrentDesign(updatedDesign);
    },
    [currentDesign],
  );

  // Add to history
  const addToHistory = useCallback(
    (design?: GarmentDesign) => {
      if (!currentDesign && !design) return;

      const designToAdd = design || currentDesign;

      // Remove any future history if we&apos;re not at the end
      const newHistory = designHistory.slice(0, historyIndex + 1);

      // Add current design to history
      setDesignHistory([...newHistory, { ...designToAdd! }]);
      setHistoryIndex(newHistory.length);
    },
    [currentDesign, designHistory, historyIndex],
  );

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentDesign({ ...designHistory[historyIndex - 1] });
      setSelectedElement(null);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < designHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentDesign({ ...designHistory[historyIndex + 1] });
      setSelectedElement(null);
    }
  };

  // Rotate element
  const rotateElement = (
    id: string,
    direction: "clockwise" | "counterclockwise",
  ) => {
    if (!currentDesign) return;

    const element = currentDesign.elements.find((e) => e.id === id);
    if (!element) return;

    const currentRotation = element.rotation || 0;
    const rotationChange = direction === "clockwise" ? 15 : -15;

    updateElement(id, { rotation: currentRotation + rotationChange });
  };

  // Save current design
  const saveDesign = () => {
    if (!currentDesign) return;

    const designToSave = {
      ...currentDesign,
      id: `design-${Date.now()}`,
      saved: true,
    };

    setSavedDesigns([designToSave, ...savedDesigns]);

    // Update current design to be marked as saved
    setCurrentDesign({
      ...currentDesign,
      saved: true,
    });
  };

  // Load a saved design
  const loadDesign = (design: GarmentDesign) => {
    const designToLoad = { ...design, id: "current-design" };
    setCurrentDesign(designToLoad);
    setGarmentType(design.type);
    setSelectedElement(null);
    addToHistory(designToLoad);
  };

  // Delete a saved design
  const deleteSavedDesign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedDesigns(savedDesigns.filter((design) => design.id !== id));
  };

  // Duplicate a saved design
  const duplicateSavedDesign = (design: GarmentDesign, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicatedDesign = {
      ...design,
      id: `design-${Date.now()}`,
      name: `${design.name} (Copy)`,
    };
    setSavedDesigns([duplicatedDesign, ...savedDesigns]);
  };

  // Generate design with AI
  const generateDesign = async () => {
    setIsGenerating(true);

    // Get selected style preferences
    const selectedStyles = stylePreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.name);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate new design based on parameters
    const newElements: DesignElement[] = [];

    // Add base color
    const baseColor =
      colorPalette[Math.floor(Math.random() * colorPalette.length)];
    newElements.push({
      id: `element-color-${Date.now()}`,
      type: "color",
      value: baseColor,
      selected: false,
    });

    // Add pattern if applicable
    if (Math.random() > 0.3) {
      const patterns = [
        "geometric",
        "abstract",
        "floral",
        "stripes",
        "dots",
        "camouflage",
      ];
      const randomPattern =
        patterns[Math.floor(Math.random() * patterns.length)];

      newElements.push({
        id: `element-pattern-${Date.now()}`,
        type: "pattern",
        value: randomPattern,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        selected: false,
      });
    }

    // Add graphic based on prompt or style
    if (designPrompt || selectedStyles.length > 0) {
      const graphics = [
        "mountain",
        "wave",
        "star",
        "abstract-shape",
        "animal",
        "plant",
      ];
      const randomGraphic =
        graphics[Math.floor(Math.random() * graphics.length)];

      newElements.push({
        id: `element-graphic-${Date.now()}`,
        type: "graphic",
        value: randomGraphic,
        position: { x: 50, y: 40 },
        scale: 1.2,
        rotation: 0,
        selected: false,
      });
    }

    // Add text if prompted
    if (designPrompt && Math.random() > 0.5) {
      // Extract a word from the prompt or use a default
      const words = designPrompt.split(" ");
      const textValue =
        words.length > 0
          ? words[Math.floor(Math.random() * words.length)].toUpperCase()
          : "STYLE";

      newElements.push({
        id: `element-text-${Date.now()}`,
        type: "text",
        value: textValue,
        position: { x: 50, y: 70 },
        scale: 1,
        rotation: 0,
        selected: false,
        color: "#FFFFFF",
      });
    }

    // Create new design
    const newDesign: GarmentDesign = {
      id: "current-design",
      name: designPrompt
        ? `${designPrompt.substring(0, 20)}${designPrompt.length > 20 ? "..." : ""}`
        : "AI Generated Design",
      type: garmentType as "tshirt" | "hoodie" | "dress" | "pants" | "jacket",
      elements: newElements,
      thumbnail:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      saved: false,
    };

    setCurrentDesign(newDesign);
    addToHistory(newDesign);
    setIsGenerating(false);
  };

  // Change garment type
  const changeGarmentType = (type: string) => {
    setGarmentType(type);

    if (currentDesign) {
      const updatedDesign = {
        ...currentDesign,
        type: type as "tshirt" | "hoodie" | "dress" | "pants" | "jacket",
      };
      setCurrentDesign(updatedDesign);
      addToHistory(updatedDesign);
    }
  };

  // Change view mode
  const changeViewMode = (mode: "front" | "back" | "3d") => {
    setViewMode(mode);
  };

  // Update element scale
  const updateElementScale = (id: string, scale: number) => {
    updateElement(id, { scale });
  };

  // Update element rotation
  const updateElementRotation = (id: string, rotation: number) => {
    updateElement(id, { rotation });
  };

  // Update element color
  const updateElementColor = (id: string, color: string) => {
    updateElement(id, { color });
  };

  // Garment type options
  const garmentTypes = [
    { id: "tshirt", name: "T-Shirt" },
    { id: "hoodie", name: "Hoodie" },
    { id: "dress", name: "Dress" },
    { id: "pants", name: "Pants" },
    { id: "jacket", name: "Jacket" },
  ];

  // Get selected element
  const getSelectedElement = () => {
    if (!currentDesign || !selectedElement) return null;
    return currentDesign.elements.find(
      (element) => element.id === selectedElement,
    );
  };

  // Add event listeners for drag and drop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedElement && canvasRef.current && currentDesign) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - canvasRect.left) / canvasRect.width) * 100;
        const y = ((e.clientY - canvasRect.top) / canvasRect.height) * 100;

        updateElement(draggedElement, {
          position: { x, y },
        });
      }
    };

    const handleMouseUp = () => {
      if (draggedElement) {
        setDraggedElement(null);
        // Add to history when drag ends
        addToHistory();
      }
    };

    if (draggedElement) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggedElement, currentDesign, updateElement, addToHistory]);

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-screen w-full overflow-y-auto rounded-none border-0" : "max-w-4xl"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white shadow-lg">
              <Shirt className="h-5 w-5" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-xl font-bold text-transparent dark:from-pink-400 dark:to-orange-400">
                AI Fashion Designer
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create unique fashion designs with AI
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

        {/* Design Info */}
        <div className="border-b border-gray-100 p-4 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={currentDesign?.name || "Untitled Design"}
                  onChange={(e) => {
                    if (currentDesign) {
                      const updatedDesign = {
                        ...currentDesign,
                        name: e.target.value,
                      };
                      setCurrentDesign(updatedDesign);
                    }
                  }}
                  className="bg-transparent text-xl font-bold text-gray-800 focus:outline-none dark:text-white"
                  placeholder="Untitled Design"
                />
                <Edit className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={saveDesign}
                className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <Save className="mr-1 h-4 w-4" />
                Save
              </button>
              <button className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                <Share className="mr-1 h-4 w-4" />
                Share
              </button>
              <button className="flex items-center rounded-full bg-pink-100 px-3 py-1.5 text-sm text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-800/40">
                <Download className="mr-1 h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {/* Designer Panel */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("designer")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Design Canvas
                </h2>
                <div className="flex items-center">
                  <div className="mr-4 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeViewMode("front");
                      }}
                      className={`rounded-l-md border px-2 py-1 text-xs ${
                        viewMode === "front"
                          ? "border-pink-500 bg-pink-50 text-pink-700 dark:border-pink-400 dark:bg-pink-900/20 dark:text-pink-300"
                          : "border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeViewMode("back");
                      }}
                      className={`border-y px-2 py-1 text-xs ${
                        viewMode === "back"
                          ? "border-pink-500 bg-pink-50 text-pink-700 dark:border-pink-400 dark:bg-pink-900/20 dark:text-pink-300"
                          : "border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeViewMode("3d");
                      }}
                      className={`rounded-r-md border px-2 py-1 text-xs ${
                        viewMode === "3d"
                          ? "border-pink-500 bg-pink-50 text-pink-700 dark:border-pink-400 dark:bg-pink-900/20 dark:text-pink-300"
                          : "border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      3D
                    </button>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                      openPanels.has("designer") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {openPanels.has("designer") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Garment Type Selector */}
                      <div className="mb-4 flex flex-wrap justify-center gap-2">
                        {garmentTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => changeGarmentType(type.id)}
                            className={`rounded-full px-3 py-1.5 text-sm ${
                              garmentType === type.id
                                ? "bg-gradient-to-r from-pink-600 to-orange-600 text-white dark:from-pink-500 dark:to-orange-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {type.name}
                          </button>
                        ))}
                      </div>

                      {/* Design Canvas */}
                      <div
                        ref={canvasRef}
                        className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                        onClick={() => selectElement(null)}
                      >
                        {/* Placeholder for garment */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {currentDesign ? (
                            <div className="relative h-full w-full">
                              {/* Base garment color */}
                              <div
                                className="absolute inset-0"
                                style={{
                                  backgroundColor:
                                    currentDesign.elements.find(
                                      (e) => e.type === "color",
                                    )?.value || "#FFFFFF",
                                  opacity: 0.9,
                                }}
                              ></div>

                              {/* Garment outline */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                  src={
                                    garmentImages[currentDesign.type] ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                  }
                                  alt={currentDesign.type}
                                  width={600}
                                  height={600}
                                  className="h-auto max-h-full w-auto max-w-full object-contain"
                                />
                              </div>

                              {/* Design elements */}
                              {currentDesign.elements.map((element) => {
                                if (element.type === "color") return null; // Color is applied as background

                                // Position styles
                                const positionStyle = element.position
                                  ? {
                                      left: `${element.position.x}%`,
                                      top: `${element.position.y}%`,
                                      transform: `translate(-50%, -50%) scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`,
                                    }
                                  : {};

                                // Element content based on type
                                let content;
                                if (element.type === "text") {
                                  content = (
                                    <div
                                      className="text-2xl font-bold"
                                      style={{
                                        color: element.color || "#FFFFFF",
                                      }}
                                    >
                                      {element.value}
                                    </div>
                                  );
                                } else if (element.type === "pattern") {
                                  content = (
                                    <div
                                      className="h-40 w-40 bg-contain bg-center bg-no-repeat opacity-70"
                                      style={{
                                        backgroundImage: `url(${designAssets.patterns[element.value as keyof typeof designAssets.patterns] || "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"})`,
                                      }}
                                    ></div>
                                  );
                                } else if (element.type === "graphic") {
                                  content = (
                                    <div
                                      className="h-40 w-40 bg-contain bg-center bg-no-repeat"
                                      style={{
                                        backgroundImage: `url(${designAssets.graphics[element.value as keyof typeof designAssets.graphics] || "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"})`,
                                      }}
                                    ></div>
                                  );
                                }

                                return (
                                  <div
                                    key={element.id}
                                    className={`absolute cursor-move ${element.selected ? "ring-2 ring-pink-500 ring-offset-2" : ""}`}
                                    style={positionStyle}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      selectElement(element.id);
                                    }}
                                    onMouseDown={(e) =>
                                      startDragging(element.id, e)
                                    }
                                  >
                                    {content}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                              <Shirt className="mx-auto mb-2 h-12 w-12" />
                              <p>Select a garment type to start designing</p>
                            </div>
                          )}
                        </div>

                        {/* Canvas controls */}
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center space-x-2 rounded-full bg-white/80 px-3 py-1.5 backdrop-blur-sm dark:bg-gray-800/80">
                          <button
                            className="rounded-full p-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={undo}
                            disabled={historyIndex <= 0}
                          >
                            <Undo className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full p-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={redo}
                            disabled={historyIndex >= designHistory.length - 1}
                          >
                            <Redo className="h-4 w-4" />
                          </button>
                          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                          <button
                            className="rounded-full p-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => {
                              if (selectedElement) {
                                rotateElement(
                                  selectedElement,
                                  "counterclockwise",
                                );
                              }
                            }}
                            disabled={!selectedElement}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full p-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => {
                              if (selectedElement) {
                                rotateElement(selectedElement, "clockwise");
                              }
                            }}
                            disabled={!selectedElement}
                          >
                            <RotateCw className="h-4 w-4" />
                          </button>
                          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                          <button
                            className="rounded-full p-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            disabled={!selectedElement}
                          >
                            <Layers className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full p-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => {
                              if (selectedElement) {
                                removeElement(selectedElement);
                              }
                            }}
                            disabled={!selectedElement}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Element Properties (if element selected) */}
                      {selectedElement && currentDesign && (
                        <div className="mt-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                          <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Element Properties
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                                Scale
                              </label>
                              <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={getSelectedElement()?.scale || 1}
                                onChange={(e) => {
                                  if (selectedElement) {
                                    updateElementScale(
                                      selectedElement,
                                      Number.parseFloat(e.target.value),
                                    );
                                  }
                                }}
                                className="h-2 w-full appearance-none rounded-full bg-gray-200 dark:bg-gray-700"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                                Rotation
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="360"
                                step="15"
                                value={getSelectedElement()?.rotation || 0}
                                onChange={(e) => {
                                  if (selectedElement) {
                                    updateElementRotation(
                                      selectedElement,
                                      Number.parseInt(e.target.value),
                                    );
                                  }
                                }}
                                className="h-2 w-full appearance-none rounded-full bg-gray-200 dark:bg-gray-700"
                              />
                            </div>
                            {getSelectedElement()?.type === "text" && (
                              <div className="col-span-2">
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                                  Color
                                </label>
                                <div className="flex flex-wrap gap-1">
                                  {colorPalette.map((color) => (
                                    <button
                                      key={color}
                                      className={`h-6 w-6 rounded-full border ${
                                        getSelectedElement()?.color === color
                                          ? "ring-2 ring-pink-500 ring-offset-1"
                                          : "border-gray-300 dark:border-gray-600"
                                      }`}
                                      style={{ backgroundColor: color }}
                                      onClick={() => {
                                        if (selectedElement) {
                                          updateElementColor(
                                            selectedElement,
                                            color,
                                          );
                                        }
                                      }}
                                    ></button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Generator Panel */}
          <div className="col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("generator")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  AI Generator
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
                          Design Prompt
                        </label>
                        <textarea
                          value={designPrompt}
                          onChange={(e) => setDesignPrompt(e.target.value)}
                          placeholder="Describe your design idea, e.g., 'Urban streetwear with geometric patterns'"
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400 dark:focus:ring-pink-400/50"
                          rows={3}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Style Preferences
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {stylePreferences.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => toggleStylePreference(style.id)}
                              className={`rounded-full px-2 py-1 text-xs ${
                                style.selected
                                  ? "bg-gradient-to-r from-pink-600 to-orange-600 text-white dark:from-pink-500 dark:to-orange-500"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              }`}
                            >
                              {style.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Color Palette
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {colorPalette.map((color) => (
                            <button
                              key={color}
                              className="h-8 w-8 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 dark:border-gray-800"
                              style={{ backgroundColor: color }}
                            ></button>
                          ))}
                          <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500 dark:border-gray-600 dark:text-gray-500 dark:hover:border-gray-500 dark:hover:text-gray-400">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={generateDesign}
                        disabled={isGenerating}
                        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-pink-600 to-orange-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-pink-700 hover:to-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-70 dark:from-pink-500 dark:to-orange-500 dark:hover:from-pink-600 dark:hover:to-orange-600"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Design
                          </>
                        )}
                      </button>

                      <div className="mt-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Add Elements
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addElement("text", "TEXT")}
                            className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
                          >
                            <Type className="mr-1 h-4 w-4" />
                            Add Text
                          </button>
                          <button
                            onClick={() =>
                              addElement("graphic", "abstract-shape")
                            }
                            className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
                          >
                            <ImageIcon className="mr-1 h-4 w-4" />
                            Add Graphic
                          </button>
                          <button
                            onClick={() => addElement("pattern", "dots")}
                            className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
                          >
                            <Palette className="mr-1 h-4 w-4" />
                            Add Pattern
                          </button>
                          <button
                            className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
                            onClick={() => {
                              const elements = ["text", "graphic", "pattern"];
                              const randomType = elements[
                                Math.floor(Math.random() * elements.length)
                              ] as "text" | "graphic" | "pattern";

                              let randomValue = "TEXT";
                              if (randomType === "graphic") {
                                const graphics = Object.keys(
                                  designAssets.graphics,
                                );
                                randomValue =
                                  graphics[
                                    Math.floor(Math.random() * graphics.length)
                                  ];
                              } else if (randomType === "pattern") {
                                const patterns = Object.keys(
                                  designAssets.patterns,
                                );
                                randomValue =
                                  patterns[
                                    Math.floor(Math.random() * patterns.length)
                                  ];
                              }

                              addElement(randomType, randomValue);
                            }}
                          >
                            <Shuffle className="mr-1 h-4 w-4" />
                            Random Element
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Saved Designs Panel */}
            <div className="mt-4 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("saved")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Saved Designs
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    openPanels.has("saved") ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openPanels.has("saved") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {savedDesigns.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                            <Bookmark className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                          </div>
                          <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            No saved designs
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Your saved designs will appear here
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {savedDesigns.map((design) => (
                            <div
                              key={design.id}
                              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                              onClick={() => loadDesign(design)}
                            >
                              <div className="relative h-16 w-12 overflow-hidden rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                                <Image
                                  src={
                                    design.thumbnail ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                  }
                                  alt={design.name}
                                  fill
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="truncate font-medium text-gray-800 dark:text-gray-200">
                                  {design.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {design.type.charAt(0).toUpperCase() +
                                    design.type.slice(1)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <button
                                  className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                  onClick={(e) =>
                                    duplicateSavedDesign(design, e)
                                  }
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                                <button
                                  className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                  onClick={(e) =>
                                    deleteSavedDesign(design.id, e)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFashionDesigner;
