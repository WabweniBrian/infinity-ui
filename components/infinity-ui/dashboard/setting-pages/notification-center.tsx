"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  BellOff,
  Mail,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Smartphone,
  Laptop,
  Save,
  RefreshCw,
  Trash2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Settings,
  Eye,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

type NotificationType = {
  id: string
  title: string
  description: string
  time: string
  type: "message" | "alert" | "info" | "calendar" | "success"
  read: boolean
}

type ChannelType = {
  id: string
  name: string
  icon: React.ReactNode
  enabled: boolean
  priority: "high" | "medium" | "low"
  sound: boolean
  desktop: boolean
  mobile: boolean
  email: boolean
  quiet: {
    enabled: boolean
    from: string
    to: string
  }
}

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState("notifications")
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null)

  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: "notif1",
      title: "New message from Sarah",
      description: "Hey, can we discuss the project timeline?",
      time: "5 minutes ago",
      type: "message",
      read: false,
    },
    {
      id: "notif2",
      title: "Meeting reminder",
      description: "Team standup in 15 minutes",
      time: "10 minutes ago",
      type: "calendar",
      read: false,
    },
    {
      id: "notif3",
      title: "System update completed",
      description: "All systems are now running on version 2.4.0",
      time: "1 hour ago",
      type: "success",
      read: true,
    },
    {
      id: "notif4",
      title: "Storage limit reached",
      description: "You have reached 90% of your storage limit",
      time: "3 hours ago",
      type: "alert",
      read: true,
    },
    {
      id: "notif5",
      title: "New feature available",
      description: "Check out our new analytics dashboard",
      time: "1 day ago",
      type: "info",
      read: true,
    },
  ])

  const [channels, setChannels] = useState<ChannelType[]>([
    {
      id: "channel1",
      name: "Direct Messages",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      enabled: true,
      priority: "high",
      sound: true,
      desktop: true,
      mobile: true,
      email: false,
      quiet: {
        enabled: true,
        from: "22:00",
        to: "08:00",
      },
    },
    {
      id: "channel2",
      name: "Calendar Events",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      enabled: true,
      priority: "medium",
      sound: false,
      desktop: true,
      mobile: true,
      email: true,
      quiet: {
        enabled: false,
        from: "22:00",
        to: "08:00",
      },
    },
    {
      id: "channel3",
      name: "System Alerts",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      enabled: true,
      priority: "high",
      sound: true,
      desktop: true,
      mobile: true,
      email: true,
      quiet: {
        enabled: false,
        from: "22:00",
        to: "08:00",
      },
    },
    {
      id: "channel4",
      name: "Updates & News",
      icon: <Info className="h-5 w-5 text-purple-500" />,
      enabled: false,
      priority: "low",
      sound: false,
      desktop: true,
      mobile: false,
      email: false,
      quiet: {
        enabled: false,
        from: "22:00",
        to: "08:00",
      },
    },
  ])

  const [settings, setSettings] = useState({
    globalMute: false,
    batchNotifications: true,
    notificationVolume: [70],
    deleteAfter: "30days",
    showBadges: true,
    showPreview: true,
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleChannelToggle = (id: string) => {
    setChannels(channels.map((channel) => (channel.id === id ? { ...channel, enabled: !channel.enabled } : channel)))
  }

  const handleChannelSettingToggle = (
    id: string,
    setting: "sound" | "desktop" | "mobile" | "email" | "quiet.enabled",
  ) => {
    setChannels(
      channels.map((channel) => {
        if (channel.id === id) {
          if (setting === "quiet.enabled") {
            return {
              ...channel,
              quiet: {
                ...channel.quiet,
                enabled: !channel.quiet.enabled,
              },
            }
          } else {
            return {
              ...channel,
              [setting]: !channel[setting],
            }
          }
        }
        return channel
      }),
    )
  }

  const handleChannelPriorityChange = (id: string, priority: "high" | "medium" | "low") => {
    setChannels(channels.map((channel) => (channel.id === id ? { ...channel, priority } : channel)))
  }

  const handleQuietHoursChange = (id: string, field: "from" | "to", value: string) => {
    setChannels(
      channels.map((channel) => {
        if (channel.id === id) {
          return {
            ...channel,
            quiet: {
              ...channel.quiet,
              [field]: value,
            },
          }
        }
        return channel
      }),
    )
  }

  const handleSettingChange = (setting: string, value: any) => {
    setSettings({
      ...settings,
      [setting]: value,
    })
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
  }

  const getFilteredNotifications = () => {
    let filtered = [...notifications]

    if (filter === "unread") {
      filtered = filtered.filter((notif) => !notif.read)
    } else if (filter !== "all") {
      filtered = filtered.filter((notif) => notif.type === filter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (notif) => notif.title.toLowerCase().includes(query) || notif.description.toLowerCase().includes(query),
      )
    }

    return filtered
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "info":
        return <Info className="h-5 w-5 text-purple-500" />
      case "calendar":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 rounded-xl shadow-lg bg-white">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-7 w-7 text-blue-500" />
          Notification Center
        </h1>

        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          onClick={handleSaveSettings}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Preferences</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Channels</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                  />
                </div>

                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="message">Messages</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="calendar">Calendar</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </button>
                <button
                  className="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                  onClick={handleClearAll}
                >
                  Clear all
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-blue-50 border-blue-200"}`}
                    whileHover={{ scale: 1.01 }}
                    layout
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${notification.read ? "" : "font-semibold"}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BellOff className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-500">No notifications found</h3>
                  <p className="text-gray-400">
                    {searchQuery || filter !== "all" ? "Try changing your search or filter" : "You're all caught up!"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="channels">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              {channels.map((channel) => (
                <motion.div
                  key={channel.id}
                  className="border rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  layout
                >
                  <div
                    className={`p-4 flex items-center justify-between cursor-pointer ${channel.enabled ? "" : "opacity-60"}`}
                    onClick={() => setExpandedChannel(expandedChannel === channel.id ? null : channel.id)}
                  >
                    <div className="flex items-center gap-3">
                      {channel.icon}
                      <div>
                        <h3 className="font-medium">{channel.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full ${
                              channel.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : channel.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {channel.priority.charAt(0).toUpperCase() + channel.priority.slice(1)}
                          </span>
                          {channel.desktop && <Laptop className="h-3 w-3" />}
                          {channel.mobile && <Smartphone className="h-3 w-3" />}
                          {channel.email && <Mail className="h-3 w-3" />}
                          {channel.sound && <span>🔊</span>}
                          {channel.quiet.enabled && <Clock className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={channel.enabled}
                        onCheckedChange={() => handleChannelToggle(channel.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {expandedChannel === channel.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {expandedChannel === channel.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t p-4 bg-gray-50"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Priority Level</label>
                          <Select
                            value={channel.priority}
                            onValueChange={(value: "high" | "medium" | "low") =>
                              handleChannelPriorityChange(channel.id, value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Delivery Methods</h4>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Laptop className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Desktop</span>
                              </div>
                              <Switch
                                checked={channel.desktop}
                                onCheckedChange={() => handleChannelSettingToggle(channel.id, "desktop")}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Mobile</span>
                              </div>
                              <Switch
                                checked={channel.mobile}
                                onCheckedChange={() => handleChannelSettingToggle(channel.id, "mobile")}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Email</span>
                              </div>
                              <Switch
                                checked={channel.email}
                                onCheckedChange={() => handleChannelSettingToggle(channel.id, "email")}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Sound</span>
                              </div>
                              <Switch
                                checked={channel.sound}
                                onCheckedChange={() => handleChannelSettingToggle(channel.id, "sound")}
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">Quiet Hours</h4>
                              <Switch
                                checked={channel.quiet.enabled}
                                onCheckedChange={() => handleChannelSettingToggle(channel.id, "quiet.enabled")}
                              />
                            </div>

                            {channel.quiet.enabled && (
                              <div className="grid grid-cols-2 gap-3 mt-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">From</label>
                                  <input
                                    type="time"
                                    value={channel.quiet.from}
                                    onChange={(e) => handleQuietHoursChange(channel.id, "from", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">To</label>
                                  <input
                                    type="time"
                                    value={channel.quiet.to}
                                    onChange={(e) => handleQuietHoursChange(channel.id, "to", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">General Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellOff className="h-5 w-5 text-red-500" />
                    <span>Do Not Disturb</span>
                  </div>
                  <Switch
                    checked={settings.globalMute}
                    onCheckedChange={(checked) => handleSettingChange("globalMute", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <span>Batch Notifications</span>
                  </div>
                  <Switch
                    checked={settings.batchNotifications}
                    onCheckedChange={(checked) => handleSettingChange("batchNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-purple-500" />
                    <span>Show Notification Badges</span>
                  </div>
                  <Switch
                    checked={settings.showBadges}
                    onCheckedChange={(checked) => handleSettingChange("showBadges", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-green-500" />
                    <span>Show Notification Preview</span>
                  </div>
                  <Switch
                    checked={settings.showPreview}
                    onCheckedChange={(checked) => handleSettingChange("showPreview", checked)}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Sound & Volume</h3>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Notification Volume</label>
                  <span className="text-sm">{settings.notificationVolume[0]}%</span>
                </div>
                <Slider
                  value={settings.notificationVolume}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSettingChange("notificationVolume", value)}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Storage</h3>

              <div>
                <label className="block text-sm font-medium mb-2">Delete Notifications After</label>
                <Select
                  value={settings.deleteAfter}
                  onValueChange={(value) => handleSettingChange("deleteAfter", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="7days">7 Days</SelectItem>
                    <SelectItem value="30days">30 Days</SelectItem>
                    <SelectItem value="90days">90 Days</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NotificationCenter

