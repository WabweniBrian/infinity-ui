"use client";

import { Calendar } from "@/components/ui/calendar";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Layout,
  Grid,
  Columns,
  Rows,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Move,
  Lock,
  Unlock,
  Settings,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WidgetType = {
  id: string;
  name: string;
  type: string;
  size: "small" | "medium" | "large";
  visible: boolean;
  locked: boolean;
  color: string;
};

type LayoutType = {
  id: string;
  name: string;
  columns: number;
  gap: number;
  isActive: boolean;
};

const LayoutCustomizer = () => {
  const [activeTab, setActiveTab] = useState("widgets");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [editingWidget, setEditingWidget] = useState<string | null>(null);
  const [layouts, setLayouts] = useState<LayoutType[]>([
    {
      id: "layout1",
      name: "Default Layout",
      columns: 3,
      gap: 16,
      isActive: true,
    },
    {
      id: "layout2",
      name: "Analytics Focus",
      columns: 2,
      gap: 20,
      isActive: false,
    },
    {
      id: "layout3",
      name: "Compact View",
      columns: 4,
      gap: 12,
      isActive: false,
    },
  ]);
  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      id: "widget1",
      name: "Analytics Overview",
      type: "chart",
      size: "large",
      visible: true,
      locked: false,
      color: "blue",
    },
    {
      id: "widget2",
      name: "Recent Activity",
      type: "list",
      size: "medium",
      visible: true,
      locked: true,
      color: "green",
    },
    {
      id: "widget3",
      name: "Task Summary",
      type: "stats",
      size: "small",
      visible: true,
      locked: false,
      color: "purple",
    },
    {
      id: "widget4",
      name: "Calendar",
      type: "calendar",
      size: "medium",
      visible: true,
      locked: false,
      color: "orange",
    },
    {
      id: "widget5",
      name: "Performance Metrics",
      type: "chart",
      size: "medium",
      visible: false,
      locked: false,
      color: "red",
    },
    {
      id: "widget6",
      name: "Team Chat",
      type: "communication",
      size: "small",
      visible: true,
      locked: false,
      color: "teal",
    },
  ]);

  const dragConstraintsRef = useRef(null);
  const activeLayout = layouts.find((layout) => layout.isActive) || layouts[0];

  const handleWidgetVisibilityToggle = (id: string) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, visible: !widget.visible } : widget,
      ),
    );
  };

  const handleWidgetLockToggle = (id: string) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, locked: !widget.locked } : widget,
      ),
    );
  };

  const handleWidgetSizeChange = (
    id: string,
    size: "small" | "medium" | "large",
  ) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, size } : widget,
      ),
    );
  };

  const handleWidgetColorChange = (id: string, color: string) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, color } : widget,
      ),
    );
  };

  const handleWidgetDelete = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const handleLayoutActivate = (id: string) => {
    setLayouts(
      layouts.map((layout) => ({ ...layout, isActive: layout.id === id })),
    );
  };

  const handleLayoutDelete = (id: string) => {
    if (layouts.length > 1) {
      const newLayouts = layouts.filter((layout) => layout.id !== id);
      setLayouts(newLayouts);

      // If we deleted the active layout, activate the first one
      if (layouts.find((l) => l.id === id)?.isActive) {
        setLayouts(
          newLayouts.map((layout, index) => ({
            ...layout,
            isActive: index === 0,
          })),
        );
      }
    }
  };

  const handleLayoutColumnsChange = (columns: number) => {
    setLayouts(
      layouts.map((layout) =>
        layout.isActive ? { ...layout, columns } : layout,
      ),
    );
  };

  const handleLayoutGapChange = (gap: number[]) => {
    setLayouts(
      layouts.map((layout) =>
        layout.isActive ? { ...layout, gap: gap[0] } : layout,
      ),
    );
  };

  const handleAddLayout = () => {
    const newLayout = {
      id: `layout${layouts.length + 1}`,
      name: `New Layout ${layouts.length + 1}`,
      columns: 3,
      gap: 16,
      isActive: false,
    };
    setLayouts([...layouts, newLayout]);
  };

  const handleSaveConfiguration = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1 h-40";
      case "medium":
        return "col-span-1 md:col-span-2 h-60";
      case "large":
        return "col-span-1 md:col-span-3 h-80";
      default:
        return "col-span-1 h-40";
    }
  };

  const getWidgetColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 border-blue-300";
      case "green":
        return "bg-green-100 border-green-300";
      case "purple":
        return "bg-purple-100 border-purple-300";
      case "orange":
        return "bg-orange-100 border-orange-300";
      case "red":
        return "bg-red-100 border-red-300";
      case "teal":
        return "bg-teal-100 border-teal-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-lg">
      <motion.div
        className="mb-8 flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Layout className="h-7 w-7 text-blue-500" />
          Dashboard Customizer
        </h1>

        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span>Hide Preview</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Show Preview</span>
              </>
            )}
          </button>

          <motion.button
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={handleSaveConfiguration}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Layout</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid grid-cols-2">
              <TabsTrigger value="widgets" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                <span>Widgets</span>
              </TabsTrigger>
              <TabsTrigger value="layouts" className="flex items-center gap-2">
                <Columns className="h-4 w-4" />
                <span>Layouts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="widgets">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <Reorder.Group
                  axis="y"
                  values={widgets}
                  onReorder={setWidgets}
                  className="space-y-3"
                >
                  {widgets.map((widget) => (
                    <Reorder.Item
                      key={widget.id}
                      value={widget}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <motion.div
                        variants={itemVariants}
                        className={`rounded-lg border p-4 ${widget.visible ? "" : "opacity-60"}`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Move className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{widget.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleWidgetVisibilityToggle(widget.id)
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {widget.visible ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleWidgetLockToggle(widget.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {widget.locked ? (
                                <Lock className="h-4 w-4" />
                              ) : (
                                <Unlock className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                setEditingWidget(
                                  editingWidget === widget.id
                                    ? null
                                    : widget.id,
                                )
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleWidgetDelete(widget.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {editingWidget === widget.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 space-y-3 border-t pt-3">
                                <div>
                                  <label className="mb-1 block text-sm font-medium">
                                    Size
                                  </label>
                                  <Select
                                    value={widget.size}
                                    onValueChange={(
                                      value: "small" | "medium" | "large",
                                    ) =>
                                      handleWidgetSizeChange(widget.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="small">
                                        Small
                                      </SelectItem>
                                      <SelectItem value="medium">
                                        Medium
                                      </SelectItem>
                                      <SelectItem value="large">
                                        Large
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="mb-1 block text-sm font-medium">
                                    Color
                                  </label>
                                  <Select
                                    value={widget.color}
                                    onValueChange={(value) =>
                                      handleWidgetColorChange(widget.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="blue">Blue</SelectItem>
                                      <SelectItem value="green">
                                        Green
                                      </SelectItem>
                                      <SelectItem value="purple">
                                        Purple
                                      </SelectItem>
                                      <SelectItem value="orange">
                                        Orange
                                      </SelectItem>
                                      <SelectItem value="red">Red</SelectItem>
                                      <SelectItem value="teal">Teal</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </motion.div>
            </TabsContent>

            <TabsContent value="layouts">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Saved Layouts</h3>
                    <motion.button
                      className="flex items-center gap-1 text-sm text-blue-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddLayout}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New</span>
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    {layouts.map((layout) => (
                      <motion.div
                        key={layout.id}
                        className={`rounded-lg border p-4 ${layout.isActive ? "border-blue-500 bg-blue-50" : ""}`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{layout.name}</h4>
                            <p className="text-sm text-gray-500">
                              {layout.columns} columns, {layout.gap}px gap
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!layout.isActive && (
                              <button
                                onClick={() => handleLayoutActivate(layout.id)}
                                className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
                              >
                                Activate
                              </button>
                            )}
                            {layout.isActive && (
                              <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                                Active
                              </span>
                            )}
                            {layouts.length > 1 && (
                              <button
                                onClick={() => handleLayoutDelete(layout.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-lg font-semibold">Layout Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium">
                          Grid Columns
                        </label>
                        <span className="text-sm">{activeLayout.columns}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 6].map((col) => (
                          <button
                            key={col}
                            className={`flex-1 rounded border p-2 ${activeLayout.columns === col ? "border-blue-500 bg-blue-100" : ""}`}
                            onClick={() => handleLayoutColumnsChange(col)}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium">Grid Gap</label>
                        <span className="text-sm">{activeLayout.gap}px</span>
                      </div>
                      <Slider
                        value={[activeLayout.gap]}
                        min={0}
                        max={32}
                        step={4}
                        onValueChange={handleLayoutGapChange}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {showPreview && (
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-lg border bg-gray-50 p-4"
            >
              <h3 className="mb-4 text-lg font-semibold">Preview</h3>

              <div
                ref={dragConstraintsRef}
                className={`grid grid-cols-1 md:grid-cols-${activeLayout.columns} gap-${activeLayout.gap / 4}`}
                style={{
                  gridTemplateColumns: `repeat(${activeLayout.columns}, minmax(0, 1fr))`,
                  gap: `${activeLayout.gap}px`,
                }}
              >
                {widgets
                  .filter((widget) => widget.visible)
                  .map((widget) => (
                    <motion.div
                      key={widget.id}
                      className={`${getWidgetSizeClass(widget.size)} ${getWidgetColorClass(widget.color)} flex flex-col rounded-lg border p-4`}
                      whileHover={{ scale: widget.locked ? 1 : 1.02 }}
                      drag={!widget.locked}
                      dragConstraints={dragConstraintsRef}
                      dragElastic={0.1}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium">{widget.name}</h4>
                        {widget.locked && (
                          <Lock className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-1 items-center justify-center text-gray-400">
                        {widget.type === "chart" && (
                          <Grid className="h-10 w-10" />
                        )}
                        {widget.type === "list" && (
                          <Rows className="h-10 w-10" />
                        )}
                        {widget.type === "stats" && (
                          <ChevronUp className="h-10 w-10" />
                        )}
                        {widget.type === "calendar" && (
                          <Calendar className="h-10 w-10" />
                        )}
                        {widget.type === "communication" && (
                          <MessageSquare className="h-10 w-10" />
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutCustomizer;
