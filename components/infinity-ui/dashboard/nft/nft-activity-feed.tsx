"use client";

import {
  activityData,
  ActivityItem,
  ActivityType,
} from "@/data/nft-acitvity-feed";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  DollarSign,
  Filter,
  Gift,
  RefreshCw,
  Tag,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const NFTActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>(activityData);
  const [activeFilter, setActiveFilter] = useState<ActivityType>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter activities based on selected type
  const filteredActivities =
    activeFilter === "all"
      ? activities
      : activities.filter((activity) => activity.type === activeFilter);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Activity type filters
  const filters: { value: ActivityType; label: string; icon: any }[] = [
    { value: "all", label: "All Activity", icon: Zap },
    { value: "sale", label: "Sales", icon: DollarSign },
    { value: "listing", label: "Listings", icon: Tag },
    { value: "offer", label: "Offers", icon: DollarSign },
    { value: "transfer", label: "Transfers", icon: Gift },
    { value: "mint", label: "Mints", icon: Zap },
  ];

  // Get icon for activity type
  const getActivityIcon = (type: Exclude<ActivityType, "all">) => {
    switch (type) {
      case "sale":
        return DollarSign;
      case "listing":
        return Tag;
      case "offer":
        return DollarSign;
      case "transfer":
        return Gift;
      case "mint":
        return Zap;
      default:
        return Clock;
    }
  };

  // Get color for activity type
  const getActivityColor = (type: Exclude<ActivityType, "all">) => {
    switch (type) {
      case "sale":
        return "bg-green-500/20 text-green-400";
      case "listing":
        return "bg-blue-500/20 text-blue-400";
      case "offer":
        return "bg-purple-500/20 text-purple-400";
      case "transfer":
        return "bg-orange-500/20 text-orange-400";
      case "mint":
        return "bg-pink-500/20 text-pink-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  // Get text for activity type
  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case "sale":
        return (
          <span>
            <span className="font-medium text-white">
              {activity.from.username}
            </span>
            {" sold "}
            <span className="font-medium text-white">{activity.nftName}</span>
            {" to "}
            <span className="font-medium text-white">
              {activity.to?.username}
            </span>
            {" for "}
            <span className="font-medium text-white">{activity.price} ETH</span>
          </span>
        );
      case "listing":
        return (
          <span>
            <span className="font-medium text-white">
              {activity.from.username}
            </span>
            {" listed "}
            <span className="font-medium text-white">{activity.nftName}</span>
            {" for "}
            <span className="font-medium text-white">{activity.price} ETH</span>
          </span>
        );
      case "offer":
        return (
          <span>
            <span className="font-medium text-white">
              {activity.from.username}
            </span>
            {" made an offer for "}
            <span className="font-medium text-white">{activity.nftName}</span>
            {" of "}
            <span className="font-medium text-white">{activity.price} ETH</span>
          </span>
        );
      case "transfer":
        return (
          <span>
            <span className="font-medium text-white">
              {activity.from.username}
            </span>
            {" transferred "}
            <span className="font-medium text-white">{activity.nftName}</span>
            {" to "}
            <span className="font-medium text-white">
              {activity.to?.username}
            </span>
          </span>
        );
      case "mint":
        return (
          <span>
            <span className="font-medium text-white">
              {activity.from.username}
            </span>
            {" minted "}
            <span className="font-medium text-white">{activity.nftName}</span>
          </span>
        );
      default:
        return "";
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - timestamp.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }

    return timestamp.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <h2 className="text-xl font-bold text-white">Activity Feed</h2>

          <motion.button
            className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:text-white"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={18}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </motion.button>
        </div>

        {/* Filters */}
        <div className="border-b border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter.value}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm ${
                    activeFilter === filter.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  <filter.icon size={14} />
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="relative">
              <motion.button
                className="flex items-center gap-1 rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Filter size={16} />
                <ChevronDown size={14} />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg bg-slate-800 shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-2">
                      <button
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
                        onClick={() => {
                          // Apply filter logic here
                          setShowDropdown(false);
                        }}
                      >
                        Last 24 hours
                      </button>
                      <button
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
                        onClick={() => {
                          // Apply filter logic here
                          setShowDropdown(false);
                        }}
                      >
                        Last 7 days
                      </button>
                      <button
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
                        onClick={() => {
                          // Apply filter logic here
                          setShowDropdown(false);
                        }}
                      >
                        Last 30 days
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="hide-scrollbar max-h-[600px] overflow-y-auto">
          {isRefreshing ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="divide-y divide-slate-800/50">
              {filteredActivities.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);

                return (
                  <motion.div
                    key={activity.id}
                    className="p-4 transition-colors hover:bg-slate-800/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex gap-3">
                      {/* Activity Icon */}
                      <div
                        className={`rounded-lg p-2 flex-center-center ${getActivityColor(activity.type)}`}
                      >
                        <ActivityIcon size={16} />
                      </div>

                      {/* NFT Image */}
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image
                          src={
                            activity.nftImage ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={activity.nftName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Activity Details */}
                      <div className="flex-1">
                        <div className="mb-1 text-sm text-slate-300">
                          {getActivityText(activity)}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="relative h-4 w-4 overflow-hidden rounded-full">
                              <Image
                                src={
                                  activity.collectionImage ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                alt={activity.collectionName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs text-slate-400">
                              {activity.collectionName}
                            </span>
                          </div>

                          <span className="text-xs text-slate-500">•</span>

                          <span className="text-xs text-slate-400">
                            {formatTimestamp(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <Zap size={32} className="mb-2 text-slate-500" />
              <p className="font-medium text-slate-300">No activity found</p>
              <p className="mt-1 text-sm text-slate-400">
                {activeFilter === "all"
                  ? "There is no recent activity to display"
                  : `No ${activeFilter} activity found`}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4 text-center">
          <button className="text-sm font-medium text-blue-400 hover:text-blue-300">
            View All Activity
          </button>
        </div>

        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default NFTActivityFeed;
