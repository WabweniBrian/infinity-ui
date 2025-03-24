"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Heart, Share2 } from "lucide-react"

interface NFTCardProps {
  id: string
  name: string
  creator: string
  creatorAvatar: string
  image: string
  price: string
  currency: string
  likes: number
  isLiked?: boolean
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
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 z-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

        {/* Hot badge */}
        <motion.div
          className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center gap-1 text-xs font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={12} />
          <span>Hot</span>
        </motion.div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md ${liked ? "bg-red-500/90 text-white" : "bg-slate-800/70 text-slate-300"}`}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
          >
            <Heart size={16} fill={liked ? "white" : "none"} />
          </motion.button>
          <motion.button
            className="w-8 h-8 rounded-full bg-slate-800/70 backdrop-blur-md flex items-center justify-center text-slate-300"
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={16} />
          </motion.button>
        </div>

        {/* Creator info */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white">
            <Image src={creatorAvatar || "/placeholder.svg"} alt={creator} fill className="object-cover" />
          </div>
          <span className="text-xs font-medium text-white/90 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-full">
            @{creator}
          </span>
        </div>
      </div>

      {/* NFT Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white truncate">{name}</h3>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Heart size={14} fill={liked ? "currentColor" : "none"} />
            <span>{likeCount}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Current Price</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">{price}</span>
              <span className="text-sm text-blue-400">{currency}</span>
            </div>
          </div>

          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default NFTCard

