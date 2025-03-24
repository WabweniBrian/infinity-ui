"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Info,
  BarChart2,
  Clock,
  Tag,
  Shield,
  Heart,
  Share2,
  Eye,
} from "lucide-react";
import { nfts } from "@/data/nfts";

interface NFTDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: (typeof nfts)[0];
}

const NFTDetailsModal = ({ isOpen, onClose, nft }: NFTDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "attributes" | "history">(
    "info",
  );
  const [isLiked, setIsLiked] = useState(false);

  const tabs = [
    { id: "info", label: "Info", icon: Info },
    { id: "attributes", label: "Attributes", icon: Tag },
    { id: "history", label: "History", icon: Clock },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 z-10 rounded-full bg-slate-800/80 p-2 text-slate-400 backdrop-blur-sm transition-colors hover:text-white"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <div className="flex h-full max-h-[90vh] flex-col overflow-y-auto lg:flex-row">
              {/* NFT Image Section */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 lg:w-1/2 lg:p-8">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-purple-600/30 to-blue-600/30 blur-sm" />

                  <div className="relative overflow-hidden rounded-xl border border-slate-700/50">
                    <Image
                      src={nft.image || "/default-image.jpg"}
                      alt={nft.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Collection badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/80 px-3 py-1.5 backdrop-blur-sm">
                    <div className="relative h-5 w-5 overflow-hidden rounded-full">
                      <Image
                        src={nft.collectionImage || "/default-image.jpg"}
                        alt={nft.collection!}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-white">
                      {nft.collection}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    <motion.button
                      className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md ${isLiked ? "bg-red-500/90 text-white" : "bg-slate-800/80 text-slate-300"}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart size={16} fill={isLiked ? "white" : "none"} />
                    </motion.button>
                    <motion.button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 backdrop-blur-md"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 size={16} />
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                      <Eye size={14} />
                      <span>{nft.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                      <Heart size={14} fill={isLiked ? "white" : "none"} />
                      <span>{isLiked ? nft.likes + 1 : nft.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NFT Details Section */}
              <div className="flex flex-col md:overflow-hidden lg:w-1/2">
                <div className="border-b border-slate-700/50 p-6">
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    {nft.name}
                  </h2>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-white">
                          <Image
                            src={nft.creatorAvatar || "/default-image.jpg"}
                            alt={nft.creator}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-slate-400">
                            Creator
                          </span>
                          <p className="text-sm font-medium text-white">
                            @{nft.creator}
                          </p>
                        </div>
                      </div>

                      <div className="h-8 w-px bg-slate-700" />

                      <div className="flex items-center gap-2">
                        <div className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-white">
                          <Image
                            src={nft.ownerAvatar || "/default-image.jpg"}
                            alt={nft.owner!}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-slate-400">Owner</span>
                          <p className="text-sm font-medium text-white">
                            @{nft.owner}
                          </p>
                        </div>
                      </div>
                    </div>

                    <a
                      href="#"
                      className="flex items-center gap-1 text-blue-400 transition-colors hover:text-blue-300"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">View on chain</span>
                    </a>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-sm text-slate-400">
                        Current Price
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">
                          {nft.price}
                        </span>
                        <span className="text-blue-400">{nft.currency}</span>
                      </div>
                      {nft.highestBid && (
                        <div className="mt-1 text-xs text-slate-400">
                          Highest bid:{" "}
                          <span className="text-white">
                            {nft.highestBid} {nft.currency}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Make Offer
                      </motion.button>
                      <motion.button
                        className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-700/50">
                  <div className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab(tab.id as any)}
                      >
                        <tab.icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === "info" && (
                    <div>
                      <h3 className="mb-3 text-lg font-medium text-white">
                        Description
                      </h3>
                      <p className="mb-6 text-slate-300">{nft.description}</p>

                      <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Shield size={18} className="text-blue-400" />
                          <h4 className="font-medium text-white">
                            Authenticity Verification
                          </h4>
                        </div>
                        <p className="text-sm text-slate-300">
                          This NFT has been verified for authenticity and is
                          backed by blockchain proof of ownership. The digital
                          asset is stored securely and can be transferred to any
                          compatible wallet.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "attributes" && (
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-white">
                        Properties
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {nft?.attributes!.map((attr, index) => (
                          <motion.div
                            key={`${attr.trait_type}-${index}`}
                            className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <span className="mb-1 block text-xs text-blue-400">
                              {attr.trait_type}
                            </span>
                            <span className="mb-1 block text-sm font-medium text-white">
                              {attr.value}
                            </span>
                            {attr.rarity && (
                              <span className="text-xs text-slate-400">
                                {attr.rarity} rarity
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "history" && (
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-white">
                        Transaction History
                      </h3>
                      <div className="space-y-3">
                        {nft?.history!.map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-4 rounded-lg border border-slate-700/50 bg-slate-800/50 p-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div
                              className={`rounded-full p-2 ${
                                item.event === "Minted"
                                  ? "bg-green-500/20 text-green-400"
                                  : item.event === "Listed"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : item.event === "Sale"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "bg-slate-500/20 text-slate-400"
                              }`}
                            >
                              {item.event === "Minted" && <Shield size={18} />}
                              {item.event === "Listed" && <Tag size={18} />}
                              {item.event === "Sale" && <BarChart2 size={18} />}
                              {!["Minted", "Listed", "Sale"].includes(
                                item.event,
                              ) && <Clock size={18} />}
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-white">
                                  {item.event}
                                </span>
                                <span className="text-sm text-slate-400">
                                  {item.date.toLocaleDateString()}
                                </span>
                              </div>
                              <div className="text-sm text-slate-300">
                                {item.from && <span>From: {item.from}</span>}
                                {item.to && <span> To: {item.to}</span>}
                                {item.price && (
                                  <span className="ml-2 text-blue-400">
                                    {item.price} {nft.currency}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NFTDetailsModal;
