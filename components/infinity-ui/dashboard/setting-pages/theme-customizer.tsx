"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Type,
  Sliders,
  Check,
  Undo,
  Save,
  Download,
  Upload,
  Eye,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ColorScheme = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    border: string;
    muted: string;
  };
};

type FontOption = {
  name: string;
  value: string;
  preview: string;
};

type BorderOption = {
  name: string;
  value: string;
  preview: string;
};

const defaultColorSchemes: ColorScheme[] = [
  {
    name: "Default",
    colors: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      accent: "#10b981",
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#f8fafc",
      border: "#e2e8f0",
      muted: "#f1f5f9",
    },
  },
  {
    name: "Dark",
    colors: {
      primary: "#60a5fa",
      secondary: "#a78bfa",
      accent: "#34d399",
      background: "#0f172a",
      foreground: "#f8fafc",
      card: "#1e293b",
      border: "#334155",
      muted: "#1e293b",
    },
  },
  {
    name: "Sunset",
    colors: {
      primary: "#f97316",
      secondary: "#ec4899",
      accent: "#eab308",
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#fff7ed",
      border: "#fed7aa",
      muted: "#ffedd5",
    },
  },
  {
    name: "Forest",
    colors: {
      primary: "#059669",
      secondary: "#0284c7",
      accent: "#65a30d",
      background: "#f8fafc",
      foreground: "#0f172a",
      card: "#f0fdf4",
      border: "#bbf7d0",
      muted: "#dcfce7",
    },
  },
  {
    name: "Midnight",
    colors: {
      primary: "#6366f1",
      secondary: "#a855f7",
      accent: "#06b6d4",
      background: "#020617",
      foreground: "#f8fafc",
      card: "#0f172a",
      border: "#1e293b",
      muted: "#1e293b",
    },
  },
];

const fontOptions: FontOption[] = [
  {
    name: "System UI",
    value: "ui-sans-serif, system-ui, sans-serif",
    preview: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Inter",
    value: "Inter, sans-serif",
    preview: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Roboto",
    value: "Roboto, sans-serif",
    preview: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Poppins",
    value: "Poppins, sans-serif",
    preview: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Playfair Display",
    value: "Playfair Display, serif",
    preview: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Fira Code",
    value: "Fira Code, monospace",
    preview: "The quick brown fox jumps over the lazy dog",
  },
];

const borderOptions: BorderOption[] = [
  { name: "None", value: "0", preview: "0px" },
  { name: "Hairline", value: "1", preview: "1px" },
  { name: "Thin", value: "2", preview: "2px" },
  { name: "Medium", value: "4", preview: "4px" },
  { name: "Thick", value: "8", preview: "8px" },
];

const ThemeCustomizer = () => {
  const [activeTab, setActiveTab] = useState("colors");
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(
    defaultColorSchemes[0],
  );
  const [customColors, setCustomColors] = useState<ColorScheme["colors"]>(
    defaultColorSchemes[0].colors,
  );
  const [selectedFont, setSelectedFont] = useState<FontOption>(fontOptions[0]);
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setBorderRadius] = useState(8);
  const [borderWidth, setBorderWidth] = useState(borderOptions[1]);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableShadows, setEnableShadows] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [savedThemes, setSavedThemes] = useState<
    { name: string; theme: any }[]
  >([
    {
      name: "My Custom Theme",
      theme: {
        colors: defaultColorSchemes[0].colors,
        font: fontOptions[0],
        fontSize: 16,
        borderRadius: 8,
        borderWidth: borderOptions[1],
        enableAnimations: true,
        enableShadows: true,
      },
    },
  ]);

  // Update custom colors when scheme changes
  useEffect(() => {
    setCustomColors(selectedScheme.colors);
  }, [selectedScheme]);

  const handleColorChange = (
    key: keyof ColorScheme["colors"],
    value: string,
  ) => {
    setCustomColors((prev) => ({ ...prev, [key]: value }));
  };

  const resetToScheme = () => {
    setCustomColors(selectedScheme.colors);
  };

  const saveCurrentTheme = () => {
    // In a real app, this would save to backend or localStorage
    alert("Theme saved successfully!");
  };

  const exportTheme = () => {
    const theme = {
      colors: customColors,
      font: selectedFont,
      fontSize,
      borderRadius,
      borderWidth,
      enableAnimations,
      enableShadows,
    };

    const blob = new Blob([JSON.stringify(theme, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-theme.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTheme = () => {
    // In a real app, this would open a file picker
    alert("This would open a file picker to import a theme");
  };

  const ColorPicker = ({
    color,
    label,
    value,
    onChange,
  }: {
    color: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className="h-5 w-5 rounded-full"
          style={{ backgroundColor: value }}
        ></div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 cursor-pointer rounded border-0 p-0"
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Theme Customizer
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personalize your dashboard appearance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Eye className="h-4 w-4" />
              {previewMode ? "Exit Preview" : "Preview"}
            </button>
            <button
              onClick={saveCurrentTheme}
              className="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1 border-r border-gray-200 dark:border-gray-800">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start gap-2 bg-transparent px-4 pb-0 pt-4">
              <TabsTrigger
                value="colors"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
              >
                <Palette className="mr-2 h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger
                value="typography"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
              >
                <Type className="mr-2 h-4 w-4" />
                Typography
              </TabsTrigger>
              <TabsTrigger
                value="elements"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
              >
                <Sliders className="mr-2 h-4 w-4" />
                Elements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="mt-0 space-y-6 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Color Scheme
                  </h3>
                  <button
                    onClick={resetToScheme}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <Undo className="h-3 w-3" />
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {defaultColorSchemes.map((scheme) => (
                    <button
                      key={scheme.name}
                      onClick={() => setSelectedScheme(scheme)}
                      className={`rounded-md border p-2 transition-all ${
                        selectedScheme.name === scheme.name
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium">
                          {scheme.name}
                        </span>
                        {selectedScheme.name === scheme.name && (
                          <Check className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="h-2 w-full rounded-sm"
                          style={{ backgroundColor: scheme.colors.primary }}
                        ></div>
                        <div
                          className="h-2 w-full rounded-sm"
                          style={{ backgroundColor: scheme.colors.secondary }}
                        ></div>
                        <div
                          className="h-2 w-full rounded-sm"
                          style={{ backgroundColor: scheme.colors.accent }}
                        ></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Custom Colors
                </h3>
                <div>
                  <ColorPicker
                    color={customColors.primary}
                    label="Primary"
                    value={customColors.primary}
                    onChange={(value) => handleColorChange("primary", value)}
                  />
                  <ColorPicker
                    color={customColors.secondary}
                    label="Secondary"
                    value={customColors.secondary}
                    onChange={(value) => handleColorChange("secondary", value)}
                  />
                  <ColorPicker
                    color={customColors.accent}
                    label="Accent"
                    value={customColors.accent}
                    onChange={(value) => handleColorChange("accent", value)}
                  />
                  <ColorPicker
                    color={customColors.background}
                    label="Background"
                    value={customColors.background}
                    onChange={(value) => handleColorChange("background", value)}
                  />
                  <ColorPicker
                    color={customColors.foreground}
                    label="Foreground"
                    value={customColors.foreground}
                    onChange={(value) => handleColorChange("foreground", value)}
                  />
                  <ColorPicker
                    color={customColors.card}
                    label="Card"
                    value={customColors.card}
                    onChange={(value) => handleColorChange("card", value)}
                  />
                  <ColorPicker
                    color={customColors.border}
                    label="Border"
                    value={customColors.border}
                    onChange={(value) => handleColorChange("border", value)}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={exportTheme}
                  className="flex items-center justify-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Download className="h-3 w-3" />
                  Export
                </button>
                <button
                  onClick={importTheme}
                  className="flex items-center justify-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Upload className="h-3 w-3" />
                  Import
                </button>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="mt-0 space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Font Family
                </h3>
                <div className="space-y-4">
                  {fontOptions.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => setSelectedFont(font)}
                      className={`w-full rounded-md border p-3 text-left transition-all ${
                        selectedFont.name === font.name
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium">{font.name}</span>
                        {selectedFont.name === font.name && (
                          <Check className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: font.value }}
                      >
                        {font.preview}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Font Size
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {fontSize}px
                  </span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={20}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="w-full"
                />
                <div className="pt-2">
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily: selectedFont.value,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="elements" className="mt-0 space-y-6 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Border Radius
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {borderRadius}px
                  </span>
                </div>
                <Slider
                  value={[borderRadius]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => setBorderRadius(value[0])}
                  className="w-full"
                />
                <div className="flex justify-center pt-2">
                  <div
                    className="h-16 w-16 bg-blue-500 transition-all dark:bg-blue-600"
                    style={{ borderRadius: `${borderRadius}px` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Border Width
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {borderOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setBorderWidth(option)}
                      className={`rounded-md border p-2 transition-all ${
                        borderWidth.name === option.name
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="h-4 w-full rounded-sm border-2"
                          style={{ borderWidth: `${option.value}px` }}
                        ></div>
                        <span className="text-xs">{option.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Effects
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Enable animations
                    </span>
                    <Switch
                      checked={enableAnimations}
                      onCheckedChange={setEnableAnimations}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Enable shadows
                    </span>
                    <Switch
                      checked={enableShadows}
                      onCheckedChange={setEnableShadows}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1 p-4 sm:p-6 md:col-span-2 lg:col-span-3">
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Preview
            </h3>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[500px] w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
                style={{
                  backgroundColor: customColors.background,
                  color: customColors.foreground,
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                  boxShadow: enableShadows
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    : "none",
                }}
              >
                <div
                  className="border-b p-4"
                  style={{ borderColor: customColors.border }}
                >
                  <div className="flex items-center justify-between">
                    <h2
                      className="font-bold"
                      style={{ color: customColors.foreground }}
                    >
                      Dashboard
                    </h2>
                    <div className="flex gap-2">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: customColors.primary,
                          color: "#fff",
                        }}
                      >
                        <span className="text-xs">JD</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4">
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: customColors.card,
                      borderRadius: `${borderRadius}px`,
                      borderWidth: `${borderWidth.value}px`,
                      borderStyle: "solid",
                      borderColor: customColors.border,
                      boxShadow: enableShadows
                        ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        : "none",
                    }}
                  >
                    <h3
                      className="mb-2 font-medium"
                      style={{ color: customColors.foreground }}
                    >
                      Statistics
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm"
                          style={{ color: customColors.foreground }}
                        >
                          Users
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: customColors.foreground }}
                        >
                          1,234
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm"
                          style={{ color: customColors.foreground }}
                        >
                          Revenue
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: customColors.foreground }}
                        >
                          $12,345
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm"
                          style={{ color: customColors.foreground }}
                        >
                          Growth
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: customColors.foreground }}
                        >
                          +12.3%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: customColors.card,
                      borderRadius: `${borderRadius}px`,
                      borderWidth: `${borderWidth.value}px`,
                      borderStyle: "solid",
                      borderColor: customColors.border,
                      boxShadow: enableShadows
                        ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        : "none",
                    }}
                  >
                    <h3
                      className="mb-2 font-medium"
                      style={{ color: customColors.foreground }}
                    >
                      Activity
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: customColors.primary }}
                        ></div>
                        <span
                          className="text-sm"
                          style={{ color: customColors.foreground }}
                        >
                          New user registered
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: customColors.secondary }}
                        ></div>
                        <span
                          className="text-sm"
                          style={{ color: customColors.foreground }}
                        >
                          New order received
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: customColors.accent }}
                        ></div>
                        <span
                          className="text-sm"
                          style={{ color: customColors.foreground }}
                        >
                          System update completed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-span-2 rounded-lg p-4"
                    style={{
                      backgroundColor: customColors.card,
                      borderRadius: `${borderRadius}px`,
                      borderWidth: `${borderWidth.value}px`,
                      borderStyle: "solid",
                      borderColor: customColors.border,
                      boxShadow: enableShadows
                        ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        : "none",
                    }}
                  >
                    <h3
                      className="mb-3 font-medium"
                      style={{ color: customColors.foreground }}
                    >
                      Actions
                    </h3>
                    <div className="flex gap-2">
                      <button
                        className="rounded-md px-3 py-1 text-sm"
                        style={{
                          backgroundColor: customColors.primary,
                          color: "#fff",
                          borderRadius: `${borderRadius}px`,
                        }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="rounded-md px-3 py-1 text-sm"
                        style={{
                          backgroundColor: customColors.secondary,
                          color: "#fff",
                          borderRadius: `${borderRadius}px`,
                        }}
                      >
                        Secondary Button
                      </button>
                      <button
                        className="rounded-md px-3 py-1 text-sm"
                        style={{
                          backgroundColor: "transparent",
                          color: customColors.primary,
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: customColors.primary,
                          borderRadius: `${borderRadius}px`,
                        }}
                      >
                        Outline Button
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {!previewMode && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-[1px] dark:bg-gray-900/80">
                  <button
                    onClick={() => setPreviewMode(true)}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition-colors hover:bg-blue-700"
                  >
                    <Eye className="mr-2 inline-block h-4 w-4" />
                    Click to Preview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
