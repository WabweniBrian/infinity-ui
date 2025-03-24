"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Moon,
  Sun,
  Bell,
  Eye,
  EyeOff,
  Save,
  Upload,
  Trash2,
  RefreshCw,
  Languages,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfilePreferences = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    "/placeholder.svg?height=100&width=100",
  );
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Product Manager",
    bio: "Passionate about creating intuitive user experiences and driving product innovation.",
    language: "english",
    timezone: "utc-8",
    fontScale: [1],
    animationSpeed: [1],
    notifications: {
      email: true,
      push: true,
      sound: false,
      updates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      activityTracking: true,
      dataSharing: false,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (
    category: string,
    setting: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, boolean>),
        [setting]: checked,
      },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle dark class on document element
    document.documentElement.classList.toggle("dark");
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
    <div
      className={`mx-auto w-full max-w-6xl rounded-xl p-6 shadow-lg ${darkMode ? "dark bg-gray-900 text-white" : "bg-white"}`}
    >
      <div className="mb-8 flex items-center justify-between">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Account Settings
        </motion.h1>

        <motion.button
          className={`rounded-full p-2 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-8 md:flex-row"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <motion.img
                    src={avatarPreview}
                    alt="Profile"
                    className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 text-white" />
                      <input
                        id="avatar-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload a photo (max 2MB)
                </p>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Language
                </label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    handleSelectChange("language", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Timezone
                </label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) =>
                    handleSelectChange("timezone", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                    <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                    <SelectItem value="utc">UTC+00:00</SelectItem>
                    <SelectItem value="utc+1">UTC+01:00 (CET)</SelectItem>
                    <SelectItem value="utc+8">UTC+08:00 (CST)</SelectItem>
                    <SelectItem value="utc+9">UTC+09:00 (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Interface Settings</h3>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">Font Size</label>
                    <span className="text-sm">{formData.fontScale[0]}x</span>
                  </div>
                  <Slider
                    value={formData.fontScale}
                    min={0.8}
                    max={1.5}
                    step={0.1}
                    onValueChange={(value) =>
                      handleSliderChange("fontScale", value)
                    }
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Animation Speed
                    </label>
                    <span className="text-sm">
                      {formData.animationSpeed[0]}x
                    </span>
                  </div>
                  <Slider
                    value={formData.animationSpeed}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={(value) =>
                      handleSliderChange("animationSpeed", value)
                    }
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <span>Email Notifications</span>
                  </div>
                  <Switch
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("notifications", "email", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-purple-500" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("notifications", "push", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-green-500" />
                    <span>Sound Notifications</span>
                  </div>
                  <Switch
                    checked={formData.notifications.sound}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("notifications", "sound", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-orange-500" />
                    <span>Product Updates</span>
                  </div>
                  <Switch
                    checked={formData.notifications.updates}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("notifications", "updates", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-red-500" />
                    <span>Marketing Communications</span>
                  </div>
                  <Switch
                    checked={formData.notifications.marketing}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("notifications", "marketing", checked)
                    }
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Privacy Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Profile Visibility
                  </label>
                  <Select
                    value={formData.privacy.profileVisibility}
                    onValueChange={(value) =>
                      handleSelectChange("privacy.profileVisibility", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="contacts">Contacts Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <span>Activity Tracking</span>
                  </div>
                  <Switch
                    checked={formData.privacy.activityTracking}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("privacy", "activityTracking", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-5 w-5 text-red-500" />
                    <span>Data Sharing with Partners</span>
                  </div>
                  <Switch
                    checked={formData.privacy.dataSharing}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("privacy", "dataSharing", checked)
                    }
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Account Management</h3>

              <div className="space-y-4">
                <motion.button
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-orange-500 p-3 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Request Data Export</span>
                </motion.button>

                <motion.button
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-red-500 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete Account</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="mt-8 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          onClick={handleSaveSettings}
        >
          {loading ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProfilePreferences;
