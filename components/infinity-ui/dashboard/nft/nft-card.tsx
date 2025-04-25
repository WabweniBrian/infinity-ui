"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, Share2 } from "lucide-react";

interface NFTCardProps {
  id: string;
  name: string;
  creator: string;
  creatorAvatar: string;
  image: string;
  price: string;
  currency: string;
  likes: number;
  isLiked?: boolean;
}

const NFTCard = ({
  id,
  name,
  creator,
  creatorAvatar,
  image,
  price,
  currency,
  likes,
  isLiked = false,
}: NFTCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-950 to-slate-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={
            image ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={name}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

        {/* Hot badge */}
        <motion.div
          className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-500/90 px-3 py-1 text-xs font-medium backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={12} />
          <span>Hot</span>
        </motion.div>

        {/* Action buttons */}
        <div className="absolute right-3 top-3 flex gap-2">
          <motion.button
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md ${liked ? "bg-red-500/90 text-white" : "bg-slate-800/70 text-slate-300"}`}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
          >
            <Heart size={16} fill={liked ? "white" : "none"} />
          </motion.button>
          <motion.button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/70 text-slate-300 backdrop-blur-md"
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={16} />
          </motion.button>
        </div>

        {/* Creator info */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                creatorAvatar ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              alt={creator}
              fill
              className="object-cover"
            />
          </div>
          <span className="rounded-full bg-black/20 px-2 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            @{creator}
          </span>
        </div>
      </div>

      {/* NFT Details */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="truncate text-lg font-bold text-white">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Heart size={14} fill={liked ? "currentColor" : "none"} />
            <span>{likeCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Current Price</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">{price}</span>
              <span className="text-sm text-blue-400">{currency}</span>
            </div>
          </div>

          <motion.button
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NFTCard;
