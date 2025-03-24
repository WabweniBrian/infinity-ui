"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Type,
  MousePointer,
  Volume2,
  Eye,
  Zap,
  Check,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccessibilitySettings = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontWeight, setFontWeight] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursorSize, setCursorSize] = useState("medium");
  const [focusHighlight, setFocusHighlight] = useState(true);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [colorBlindMode, setColorBlindMode] = useState("none");
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewText, setPreviewText] = useState(
    "The quick brown fox jumps over the lazy dog.",
  );

  const handleSaveSettings = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Accessibility settings saved successfully");
    }, 1500);
  };

  const handleResetSettings = () => {
    setFontSize(16);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setFontWeight("normal");
    setHighContrast(false);
    setReducedMotion(false);
    setCursorSize("medium");
    setFocusHighlight(true);
    setScreenReader(false);
    setKeyboardNavigation(true);
    setAutoplay(false);
    setSoundEffects(true);
    setColorBlindMode("none");
    setDyslexiaFont(false);
  };

  // Apply color blind simulation filter
  const getColorBlindFilter = () => {
    switch (colorBlindMode) {
      case "protanopia":
        return "grayscale(0%) sepia(0%) hue-rotate(0deg) invert(0%) saturate(0.5)";
      case "deuteranopia":
        return "grayscale(30%) sepia(10%) hue-rotate(230deg) invert(0%) saturate(0.7)";
      case "tritanopia":
        return "grayscale(0%) sepia(20%) hue-rotate(180deg) invert(0%) saturate(0.8)";
      case "achromatopsia":
        return "grayscale(100%) sepia(0%) hue-rotate(0deg) invert(0%) saturate(0)";
      default:
        return "none";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Accessibility Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your experience to make the dashboard more accessible
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start gap-2 bg-transparent px-4 pb-0 pt-4">
          <TabsTrigger
            value="text"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Type className="mr-2 h-4 w-4" />
            Text & Reading
          </TabsTrigger>
          <TabsTrigger
            value="visual"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Eye className="mr-2 h-4 w-4" />
            Visual
          </TabsTrigger>
          <TabsTrigger
            value="interaction"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <MousePointer className="mr-2 h-4 w-4" />
            Interaction
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <TabsContent value="text" className="mt-0 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="font-size"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Font Size
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {fontSize}px
                      </span>
                    </div>
                    <Slider
                      id="font-size"
                      value={[fontSize]}
                      min={12}
                      max={24}
                      step={1}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="line-height"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Line Height
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {lineHeight.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      id="line-height"
                      value={[lineHeight * 10]}
                      min={10}
                      max={25}
                      step={1}
                      onValueChange={(value) => setLineHeight(value[0] / 10)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="letter-spacing"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Letter Spacing
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {letterSpacing.toFixed(1)}px
                      </span>
                    </div>
                    <Slider
                      id="letter-spacing"
                      value={[letterSpacing * 10]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={(value) => setLetterSpacing(value[0] / 10)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="font-weight"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Font Weight
                    </label>
                    <Select value={fontWeight} onValueChange={setFontWeight}>
                      <SelectTrigger id="font-weight">
                        <SelectValue placeholder="Select font weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dyslexia-friendly Font
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Use a font designed to help with dyslexia
                      </p>
                    </div>
                    <Switch
                      checked={dyslexiaFont}
                      onCheckedChange={setDyslexiaFont}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preview
                  </h3>
                  <div
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight,
                      letterSpacing: `${letterSpacing}px`,
                      fontWeight: fontWeight,
                      fontFamily: dyslexiaFont
                        ? "OpenDyslexic, sans-serif"
                        : "inherit",
                    }}
                  >
                    <p className="mb-2">{previewText}</p>
                    <p>
                      This is how your text will appear throughout the
                      dashboard.
                    </p>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="preview-text"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Edit Preview Text
                    </label>
                    <textarea
                      id="preview-text"
                      value={previewText}
                      onChange={(e) => setPreviewText(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="mt-0 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        High Contrast Mode
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Increase contrast for better readability
                      </p>
                    </div>
                    <Switch
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Reduced Motion
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch
                      checked={reducedMotion}
                      onCheckedChange={setReducedMotion}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="color-blind-mode"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Color Blind Mode
                    </label>
                    <Select
                      value={colorBlindMode}
                      onValueChange={setColorBlindMode}
                    >
                      <SelectTrigger id="color-blind-mode">
                        <SelectValue placeholder="Select color blind mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="protanopia">
                          Protanopia (Red-Blind)
                        </SelectItem>
                        <SelectItem value="deuteranopia">
                          Deuteranopia (Green-Blind)
                        </SelectItem>
                        <SelectItem value="tritanopia">
                          Tritanopia (Blue-Blind)
                        </SelectItem>
                        <SelectItem value="achromatopsia">
                          Achromatopsia (Monochromacy)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Focus Highlighting
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Highlight elements when they receive focus
                      </p>
                    </div>
                    <Switch
                      checked={focusHighlight}
                      onCheckedChange={setFocusHighlight}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preview
                  </h3>
                  <div
                    className={`rounded-lg border p-4 ${
                      highContrast
                        ? "border-black bg-white text-black dark:border-white dark:bg-black dark:text-white"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                    style={{
                      filter: getColorBlindFilter(),
                    }}
                  >
                    <h4 className="mb-2 font-medium">
                      Visual Settings Preview
                    </h4>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded-full bg-red-500"></div>
                        <div className="h-6 w-6 rounded-full bg-green-500"></div>
                        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                        <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
                        <div className="h-6 w-6 rounded-full bg-purple-500"></div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className={`rounded-md px-3 py-1 text-sm ${
                            highContrast
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          Primary Button
                        </button>
                        <button
                          className={`rounded-md px-3 py-1 text-sm ${
                            highContrast
                              ? "border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white"
                              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          Secondary Button
                        </button>
                      </div>

                      <motion.div
                        animate={{ x: reducedMotion ? 0 : [0, 10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className={`rounded-md p-2 text-sm ${
                          highContrast
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {reducedMotion
                          ? "Motion is reduced"
                          : "This element has animation"}
                      </motion.div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="preview-checkbox"
                          className={`rounded ${
                            highContrast
                              ? "border-black text-black focus:ring-black dark:border-white dark:text-white dark:focus:ring-white"
                              : "border-gray-300 text-blue-600 focus:ring-blue-500"
                          }`}
                        />
                        <label htmlFor="preview-checkbox" className="text-sm">
                          Checkbox example
                        </label>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Input field example"
                          className={`w-full rounded-md ${
                            highContrast
                              ? "border-black focus:border-black focus:ring-black dark:border-white dark:focus:border-white dark:focus:ring-white"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700"
                          } ${focusHighlight ? "focus:ring-2" : "focus:ring-0"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interaction" className="mt-0 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="cursor-size"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Cursor Size
                    </label>
                    <Select value={cursorSize} onValueChange={setCursorSize}>
                      <SelectTrigger id="cursor-size">
                        <SelectValue placeholder="Select cursor size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium (Default)</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="x-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Keyboard Navigation
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enable navigation using keyboard shortcuts
                      </p>
                    </div>
                    <Switch
                      checked={keyboardNavigation}
                      onCheckedChange={setKeyboardNavigation}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Screen Reader Support
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Optimize content for screen readers
                      </p>
                    </div>
                    <Switch
                      checked={screenReader}
                      onCheckedChange={setScreenReader}
                    />
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Keyboard Shortcuts
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Dashboard Home
                        </span>
                        <div className="flex gap-1">
                          <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                            Alt
                          </kbd>
                          <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                            H
                          </kbd>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Settings
                        </span>
                        <div className="flex gap-1">
                          <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                            Alt
                          </kbd>
                          <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                            S
                          </kbd>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Search
                        </span>
                        <div className="flex gap-1">
                          <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                            /
                          </kbd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Interaction Preview
                  </h3>
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                          Hover over the buttons below to see cursor size:
                        </p>
                        <div className="flex gap-2">
                          <button
                            className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                            style={{
                              cursor:
                                cursorSize === "small"
                                  ? "default"
                                  : cursorSize === "medium"
                                    ? "pointer"
                                    : cursorSize === "large"
                                      ? "zoom-in"
                                      : "help",
                            }}
                          >
                            Hover Me
                          </button>
                          <button
                            className="rounded-md bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
                            style={{
                              cursor:
                                cursorSize === "small"
                                  ? "default"
                                  : cursorSize === "medium"
                                    ? "pointer"
                                    : cursorSize === "large"
                                      ? "zoom-in"
                                      : "help",
                            }}
                          >
                            Click Me
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                          Tab through these elements to test focus highlighting:
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="First input"
                            className={`rounded-md border-gray-300 focus:border-blue-500 ${
                              focusHighlight
                                ? "focus:ring-2 focus:ring-blue-500"
                                : "focus:ring-0"
                            } dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                          />
                          <input
                            type="text"
                            placeholder="Second input"
                            className={`rounded-md border-gray-300 focus:border-blue-500 ${
                              focusHighlight
                                ? "focus:ring-2 focus:ring-blue-500"
                                : "focus:ring-0"
                            } dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                          />
                        </div>
                      </div>

                      {screenReader && (
                        <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm text-blue-700 dark:text-blue-300">
                              Screen reader optimizations are active
                            </span>
                          </div>
                          <p className="ml-6 mt-1 text-xs text-blue-600 dark:text-blue-400">
                            Additional ARIA attributes and semantic HTML are now
                            being used.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-0 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Autoplay Media
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Automatically play videos and animations
                      </p>
                    </div>
                    <Switch checked={autoplay} onCheckedChange={setAutoplay} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sound Effects
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enable sound effects for notifications and actions
                      </p>
                    </div>
                    <Switch
                      checked={soundEffects}
                      onCheckedChange={setSoundEffects}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="volume"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Volume
                      </label>
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          70%
                        </span>
                      </div>
                    </div>
                    <Slider
                      id="volume"
                      defaultValue={[70]}
                      min={0}
                      max={100}
                      step={1}
                      disabled={!soundEffects}
                    />
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Captions & Transcripts
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Always show captions
                        </span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Generate transcripts
                        </span>
                        <Switch defaultChecked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Caption size
                        </span>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Media Preview
                  </h3>
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Video Preview
                        </p>
                        <button className="mt-2 rounded-md bg-blue-600 px-3 py-1 text-sm text-white">
                          {autoplay ? "Playing Automatically" : "Click to Play"}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-900">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Sample caption text would appear here when videos are
                        playing.
                      </p>
                    </div>

                    {soundEffects && (
                      <div className="mt-3 rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-blue-700 dark:text-blue-300">
                            Sound effects are enabled
                          </span>
                        </div>
                        <p className="ml-6 mt-1 text-xs text-blue-600 dark:text-blue-400">
                          You will hear audio feedback for notifications and
                          interactions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>

          <div className="col-span-1 border-t border-gray-200 p-4 dark:border-gray-800 sm:p-6 md:border-l md:border-t-0">
            <div className="space-y-6">
              <div>
                <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                  Accessibility Profile
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Save your settings as a profile or choose a preset
                </p>
              </div>

              <div className="space-y-3">
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium">Vision Impaired</span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-500" />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <Type className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">
                      Dyslexia Support
                    </span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-500" />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Motor Impaired</span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-500" />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium">Seizure Safe</span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                <Button
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  disabled={isLoading}
                  className="mt-2 w-full"
                >
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default AccessibilitySettings;
