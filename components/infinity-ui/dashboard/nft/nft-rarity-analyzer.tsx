"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Diamond,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  Award,
  Star,
} from "lucide-react";

const rarityData = {
  nftName: "Cosmic Voyager #042",
  nftImage:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoPGN5EkURmqDpgTYnlJ0VQxFuAyXbhka81jzw",
  collectionName: "Cosmic Series",
  collectionSize: 10000,
  rarityRank: 156,
  rarityScore: 86.42,
  attributes: [
    {
      trait_type: "Background",
      value: "Deep Space",
      rarity: 8.5,
      rarityScore: 11.76,
    },
    {
      trait_type: "Character",
      value: "Voyager",
      rarity: 12.3,
      rarityScore: 8.13,
    },
    {
      trait_type: "Accessory",
      value: "Nebula Map",
      rarity: 3.2,
      rarityScore: 31.25,
    },
    {
      trait_type: "Helmet",
      value: "Crystal Visor",
      rarity: 1.5,
      rarityScore: 66.67,
    },
    {
      trait_type: "Suit",
      value: "Quantum Armor",
      rarity: 5.7,
      rarityScore: 17.54,
    },
    {
      trait_type: "Rarity",
      value: "Legendary",
      rarity: 2.1,
      rarityScore: 47.62,
    },
  ],
};

const NFTRarityAnalyzer = () => {
  const [expandedTraits, setExpandedTraits] = useState<string[]>([]);

  const {
    nftName,
    nftImage,
    collectionName,
    collectionSize,
    rarityRank,
    rarityScore,
    attributes,
  } = rarityData;

  // Toggle trait expansion
  const toggleTrait = (traitType: string) => {
    if (expandedTraits.includes(traitType)) {
      setExpandedTraits(expandedTraits.filter((t) => t !== traitType));
    } else {
      setExpandedTraits([...expandedTraits, traitType]);
    }
  };
  // Group attributes by trait type
  const traitTypes = Array.from(
    new Set(attributes.map((attr) => attr.trait_type)),
  );

  // Calculate percentile rank (lower is better)
  const percentileRank = (rarityRank / collectionSize) * 100;

  // Get rarity tier
  const getRarityTier = () => {
    if (percentileRank <= 1)
      return {
        name: "Legendary",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
      };
    if (percentileRank <= 5)
      return {
        name: "Epic",
        color: "text-purple-400",
        bgColor: "bg-purple-500/20",
      };
    if (percentileRank <= 15)
      return {
        name: "Rare",
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
      };
    if (percentileRank <= 35)
      return {
        name: "Uncommon",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
      };
    return {
      name: "Common",
      color: "text-slate-400",
      bgColor: "bg-slate-500/20",
    };
  };

  const rarityTier = getRarityTier();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">Rarity Analyzer</h2>
        <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {/* Header */}
          <div className="border-b border-slate-800 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Diamond className="text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-white">Rarity Analysis</h2>
            </div>

            <div className="flex flex-col gap-6 md:flex-row">
              {/* NFT Image */}
              <div className="md:w-1/3">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={
                      nftImage ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=300"
                    }
                    alt={nftName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* NFT Info */}
              <div className="md:w-2/3">
                <h3 className="mb-1 text-lg font-bold text-white">{nftName}</h3>
                <p className="mb-4 text-slate-400">{collectionName}</p>

                {/* Rarity Stats */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-800/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-slate-400">
                      <Award size={16} />
                      <span className="text-sm">Rarity Rank</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">
                        #{rarityRank}
                      </span>
                      <span className="text-sm text-slate-400">
                        of {collectionSize}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-800/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-slate-400">
                      <Star size={16} />
                      <span className="text-sm">Rarity Score</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {rarityScore.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Rarity Tier */}
                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 ${rarityTier.bgColor} mb-4`}
                >
                  <Sparkles className={rarityTier.color} size={18} />
                  <span className={`font-medium ${rarityTier.color}`}>
                    {rarityTier.name} Tier
                  </span>
                  <span className="ml-auto text-sm text-slate-400">
                    Top {percentileRank.toFixed(2)}%
                  </span>
                </div>

                {/* Percentile Visualization */}
                <div className="mb-2">
                  <div className="mb-1 flex justify-between text-xs text-slate-400">
                    <span>More Rare</span>
                    <span>Less Rare</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"
                      style={{ width: `${percentileRank}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentileRank}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trait Analysis */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Trait Analysis</h3>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Info size={14} />
                <span>Lower % = More Rare</span>
              </div>
            </div>

            <div className="space-y-3">
              {traitTypes.map((traitType) => {
                const traitsOfType = attributes.filter(
                  (attr) => attr.trait_type === traitType,
                );
                const isExpanded = expandedTraits.includes(traitType);

                return (
                  <div
                    key={traitType}
                    className="overflow-hidden rounded-xl bg-slate-800/50"
                  >
                    <button
                      className="flex w-full items-center justify-between p-4 text-left"
                      onClick={() => toggleTrait(traitType)}
                    >
                      <div>
                        <h4 className="font-medium text-white">{traitType}</h4>
                        <p className="text-sm text-slate-400">
                          {traitsOfType.length} traits
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {traitsOfType.length > 1 && (
                          <span className="text-sm text-slate-400">
                            {isExpanded ? "Hide" : "Show All"}
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {(isExpanded || traitsOfType.length === 1) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-2 px-4 pb-4">
                            {traitsOfType.map((trait, index) => (
                              <div
                                key={`${trait.trait_type}-${trait.value}-${index}`}
                                className="flex items-center gap-3"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">
                                      {trait.value}
                                    </span>
                                    <div
                                      className={`rounded-full px-2 py-0.5 text-xs ${
                                        trait.rarity <= 1
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : trait.rarity <= 5
                                            ? "bg-purple-500/20 text-purple-400"
                                            : trait.rarity <= 15
                                              ? "bg-blue-500/20 text-blue-400"
                                              : trait.rarity <= 35
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-slate-500/20 text-slate-400"
                                      }`}
                                    >
                                      {trait.rarity}%
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <span>Score:</span>
                                    <span className="text-blue-400">
                                      {trait.rarityScore.toFixed(2)}
                                    </span>
                                  </div>
                                </div>

                                <div className="w-32">
                                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                                    <motion.div
                                      className={`h-full ${
                                        trait.rarity <= 1
                                          ? "bg-yellow-500"
                                          : trait.rarity <= 5
                                            ? "bg-purple-500"
                                            : trait.rarity <= 15
                                              ? "bg-blue-500"
                                              : trait.rarity <= 35
                                                ? "bg-green-500"
                                                : "bg-slate-500"
                                      }`}
                                      style={{ width: `${trait.rarity}%` }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${trait.rarity}%` }}
                                      transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTRarityAnalyzer;
