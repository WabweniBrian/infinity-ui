"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  ExternalLink,
  Users,
  Star,
  TrendingUp,
  Clock,
  Twitter,
  Instagram,
  Globe,
} from "lucide-react";

interface NFTCreatorProfileProps {
  username: string;
  displayName: string;
  avatar: string;
  coverImage: string;
  bio: string;
  isVerified: boolean;
  followers: number;
  following: number;
  totalSales: string;
  totalVolume: string;
  joinedDate: Date;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  stats: {
    floorPrice: string;
    items: number;
    owners: number;
    totalVolume: string;
  };
  collections: Array<{
    id: string;
    name: string;
    image: string;
    itemCount: number;
    floorPrice: string;
  }>;
}

const NFTCreatorProfile = ({
  username,
  displayName,
  avatar,
  coverImage,
  bio,
  isVerified,
  followers,
  following,
  totalSales,
  totalVolume,
  joinedDate,
  socialLinks,
  stats,
  collections,
}: NFTCreatorProfileProps) => {
  const [activeTab, setActiveTab] = useState<"collections" | "activity">(
    "collections",
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllBio, setShowAllBio] = useState(false);

  // Truncate bio if it's too long
  const truncatedBio =
    bio.length > 150 && !showAllBio ? bio.substring(0, 150) + "..." : bio;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Cover Image with Parallax Effect */}
      <motion.div
        className="relative h-48 overflow-hidden md:h-64"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          initial={{ y: 0 }}
          whileHover={{ y: -10 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={
              coverImage ||
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=400&width=1200"
            }
            alt={`${displayName}'s cover`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4 flex items-end justify-between">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-slate-900 md:h-32 md:w-32">
              <Image
                src={
                  avatar ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={displayName}
                fill
                className="object-cover"
              />
            </div>
            {isVerified && (
              <motion.div
                className="absolute -bottom-2 -right-2 rounded-full border-2 border-slate-900 bg-blue-500 p-1.5 text-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <BadgeCheck size={16} />
              </motion.div>
            )}
          </motion.div>

          <div className="flex gap-2">
            <motion.button
              className={`rounded-xl px-4 py-2 text-sm font-medium ${
                isFollowing
                  ? "border border-slate-700 bg-slate-800 text-white"
                  : "bg-blue-600 text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </motion.button>

            <motion.button
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-400"
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
            </motion.button>
          </div>
        </div>

        {/* Creator Info */}
        <div className="mb-6">
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{displayName}</h2>
            {isVerified && (
              <motion.div
                className="text-blue-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                }}
              >
                <BadgeCheck size={20} />
              </motion.div>
            )}
          </div>

          <div className="mb-4 text-slate-400">@{username}</div>

          <div className="mb-4">
            <p className="text-slate-300">
              {truncatedBio}
              {bio.length > 150 && (
                <button
                  className="ml-1 text-blue-400 hover:text-blue-300"
                  onClick={() => setShowAllBio(!showAllBio)}
                >
                  {showAllBio ? "Show less" : "Show more"}
                </button>
              )}
            </p>
          </div>

          {/* Social Links */}
          <div className="mb-4 flex gap-3">
            {socialLinks.twitter && (
              <motion.a
                href={socialLinks.twitter}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:text-blue-400"
                whileHover={{ y: -3 }}
              >
                <Twitter size={18} />
              </motion.a>
            )}

            {socialLinks.instagram && (
              <motion.a
                href={socialLinks.instagram}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:text-pink-400"
                whileHover={{ y: -3 }}
              >
                <Instagram size={18} />
              </motion.a>
            )}

            {socialLinks.website && (
              <motion.a
                href={socialLinks.website}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:text-green-400"
                whileHover={{ y: -3 }}
              >
                <Globe size={18} />
              </motion.a>
            )}
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-800/50 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-slate-400">
                <Users size={14} />
                <span className="text-xs">Followers</span>
              </div>
              <p className="text-lg font-bold text-white">
                {followers.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-slate-400">
                <Star size={14} />
                <span className="text-xs">Following</span>
              </div>
              <p className="text-lg font-bold text-white">
                {following.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-slate-400">
                <TrendingUp size={14} />
                <span className="text-xs">Volume</span>
              </div>
              <p className="text-lg font-bold text-white">{totalVolume}</p>
            </div>
          </div>

          {/* Joined Date */}
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Clock size={14} />
            <span>
              Joined{" "}
              {joinedDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-800">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "collections"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("collections")}
            >
              Collections
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "activity"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Collections */}
        <AnimatePresence mode="wait">
          {activeTab === "collections" && (
            <motion.div
              key="collections"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {collections.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    className="flex items-center gap-4 rounded-xl bg-slate-800/50 p-3 transition-colors hover:bg-slate-800"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                      <Image
                        src={
                          collection.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={collection.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        {collection.name}
                      </h3>
                      <div className="text-sm text-slate-400">
                        {collection.itemCount} items
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Floor</div>
                      <div className="font-medium text-white">
                        {collection.floorPrice} ETH
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-8 text-center"
            >
              <p className="text-slate-400">Activity feed coming soon</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NFTCreatorProfile;
