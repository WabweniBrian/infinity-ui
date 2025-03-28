"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight,
  X,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart2,
  DollarSign,
  Tag,
  Layers,
} from "lucide-react";

interface NFTData {
  id: string;
  name: string;
  image: string;
  collection: string;
  collectionImage: string;
  price: string;
  lastSale?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
    rarity?: number;
  }>;
  rarityRank?: number;
  rarityScore?: number;
  owner?: string;
  tokenId?: string;
}

interface NFTComparisonToolProps {
  availableNFTs: NFTData[];
  onClose?: () => void;
}

const NFTComparisonTool = ({
  availableNFTs,
  onClose,
}: NFTComparisonToolProps) => {
  const [selectedNFTs, setSelectedNFTs] = useState<NFTData[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "attributes",
    "price",
  ]);

  // Filter available NFTs based on search query
  const filteredNFTs = availableNFTs.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Add NFT to comparison
  const addNFT = (nft: NFTData) => {
    if (selectedNFTs.length < 3 && !selectedNFTs.some((n) => n.id === nft.id)) {
      setSelectedNFTs([...selectedNFTs, nft]);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  // Remove NFT from comparison
  const removeNFT = (nftId: string) => {
    setSelectedNFTs(selectedNFTs.filter((nft) => nft.id !== nftId));
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  // Get all unique trait types from selected NFTs
  const getAllTraitTypes = () => {
    const traitTypes = new Set<string>();
    selectedNFTs.forEach((nft) => {
      nft.attributes.forEach((attr) => {
        traitTypes.add(attr.trait_type);
      });
    });
    return Array.from(traitTypes);
  };

  // Get trait value for a specific NFT and trait type
  const getTraitValue = (nft: NFTData, traitType: string) => {
    const trait = nft.attributes.find((attr) => attr.trait_type === traitType);
    return trait ? trait.value : "-";
  };

  // Get trait rarity for a specific NFT and trait type
  const getTraitRarity = (nft: NFTData, traitType: string) => {
    const trait = nft.attributes.find((attr) => attr.trait_type === traitType);
    return trait && trait.rarity !== undefined ? trait.rarity : null;
  };

  // Get color based on rarity
  const getRarityColor = (rarity: number | null) => {
    if (rarity === null) return "text-slate-400";
    if (rarity <= 1) return "text-yellow-400";
    if (rarity <= 5) return "text-purple-400";
    if (rarity <= 15) return "text-blue-400";
    if (rarity <= 35) return "text-green-400";
    return "text-slate-400";
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">NFT Comparison</h2>
        </div>

        {onClose && (
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* NFT Selection */}
      <div className="border-b border-slate-800 p-4">
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => {
            const nft = selectedNFTs[index];

            return (
              <div
                key={`slot-${index}`}
                className="relative aspect-square overflow-hidden rounded-xl border border-slate-700"
              >
                {nft ? (
                  <div className="relative h-full">
                    <Image
                      src={
                        nft.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=300&width=300"
                      }
                      alt={nft.name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="relative h-5 w-5 overflow-hidden rounded-full">
                          <Image
                            src={
                              nft.collectionImage ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50"
                            }
                            alt={nft.collection}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="truncate text-xs text-white">
                          {nft.collection}
                        </span>
                      </div>
                      <h3 className="mb-2 truncate text-sm font-medium text-white">
                        {nft.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-300">
                          {nft.price} ETH
                        </div>
                        <motion.button
                          className="rounded-full bg-slate-800/80 p-1 text-slate-400 hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeNFT(nft.id)}
                        >
                          <X size={14} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    className="flex h-full w-full flex-col items-center justify-center bg-slate-800/50 transition-colors hover:bg-slate-800"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSearch(true)}
                    disabled={showSearch}
                  >
                    <Plus size={24} className="mb-2 text-slate-400" />
                    <span className="text-sm text-slate-400">Add NFT</span>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="border-b border-slate-800 p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="mb-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search NFTs by name or collection..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-slate-400 hover:text-white"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredNFTs.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {filteredNFTs.map((nft) => (
                    <motion.div
                      key={nft.id}
                      className={`relative overflow-hidden rounded-xl border ${
                        selectedNFTs.some((n) => n.id === nft.id)
                          ? "cursor-not-allowed border-blue-500 opacity-50"
                          : "cursor-pointer border-slate-700 hover:border-blue-500"
                      }`}
                      whileHover={{
                        scale: selectedNFTs.some((n) => n.id === nft.id)
                          ? 1
                          : 1.03,
                      }}
                      onClick={() => {
                        if (!selectedNFTs.some((n) => n.id === nft.id)) {
                          addNFT(nft);
                        }
                      }}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={
                            nft.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={nft.name}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />

                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <div className="mb-1 flex items-center gap-1">
                            <div className="relative h-4 w-4 overflow-hidden rounded-full">
                              <Image
                                src={
                                  nft.collectionImage ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50"
                                }
                                alt={nft.collection}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="truncate text-xs text-white">
                              {nft.collection}
                            </span>
                          </div>
                          <h3 className="truncate text-xs font-medium text-white">
                            {nft.name}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-slate-400">
                    No NFTs found matching your search
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Content */}
      {selectedNFTs.length > 0 && (
        <div className="p-4">
          {/* Price Section */}
          <div className="mb-4">
            <button
              className="flex w-full items-center justify-between rounded-xl bg-slate-800/50 p-3 text-left"
              onClick={() => toggleSection("price")}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-green-400" />
                <h3 className="font-medium text-white">Price Comparison</h3>
              </div>
              {expandedSections.includes("price") ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.includes("price") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {selectedNFTs.map((nft) => (
                      <div
                        key={`price-${nft.id}`}
                        className="rounded-xl bg-slate-800/30 p-3"
                      >
                        <div className="mb-1 text-sm text-slate-400">
                          Current Price
                        </div>
                        <div className="mb-2 text-lg font-bold text-white">
                          {nft.price} ETH
                        </div>

                        {nft.lastSale && (
                          <>
                            <div className="mb-1 text-xs text-slate-400">
                              Last Sale
                            </div>
                            <div className="text-sm text-slate-300">
                              {nft.lastSale} ETH
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rarity Section */}
          <div className="mb-4">
            <button
              className="flex w-full items-center justify-between rounded-xl bg-slate-800/50 p-3 text-left"
              onClick={() => toggleSection("rarity")}
            >
              <div className="flex items-center gap-2">
                <BarChart2 size={18} className="text-purple-400" />
                <h3 className="font-medium text-white">Rarity Comparison</h3>
              </div>
              {expandedSections.includes("rarity") ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.includes("rarity") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {selectedNFTs.map((nft) => (
                      <div
                        key={`rarity-${nft.id}`}
                        className="rounded-xl bg-slate-800/30 p-3"
                      >
                        {nft.rarityRank ? (
                          <>
                            <div className="mb-1 text-sm text-slate-400">
                              Rarity Rank
                            </div>
                            <div className="mb-2 text-lg font-bold text-white">
                              #{nft.rarityRank}
                            </div>
                          </>
                        ) : (
                          <div className="mb-2 text-sm text-slate-400">
                            Rarity rank not available
                          </div>
                        )}

                        {nft.rarityScore && (
                          <>
                            <div className="mb-1 text-xs text-slate-400">
                              Rarity Score
                            </div>
                            <div className="text-sm text-slate-300">
                              {nft.rarityScore.toFixed(2)}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Attributes Section */}
          <div className="mb-4">
            <button
              className="flex w-full items-center justify-between rounded-xl bg-slate-800/50 p-3 text-left"
              onClick={() => toggleSection("attributes")}
            >
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-blue-400" />
                <h3 className="font-medium text-white">Attribute Comparison</h3>
              </div>
              {expandedSections.includes("attributes") ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.includes("attributes") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-800">
                          <th className="p-2 text-left text-sm font-medium text-slate-400">
                            Trait
                          </th>
                          {selectedNFTs.map((nft) => (
                            <th
                              key={`header-${nft.id}`}
                              className="p-2 text-left text-sm font-medium text-slate-400"
                            >
                              {nft.name.length > 10
                                ? `${nft.name.substring(0, 10)}...`
                                : nft.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getAllTraitTypes().map((traitType) => (
                          <tr
                            key={traitType}
                            className="border-b border-slate-800/50"
                          >
                            <td className="p-2 text-sm font-medium text-white">
                              {traitType}
                            </td>
                            {selectedNFTs.map((nft) => {
                              const traitValue = getTraitValue(nft, traitType);
                              const traitRarity = getTraitRarity(
                                nft,
                                traitType,
                              );

                              return (
                                <td
                                  key={`${nft.id}-${traitType}`}
                                  className="p-2"
                                >
                                  <div className="text-sm text-white">
                                    {traitValue}
                                  </div>
                                  {traitRarity !== null && (
                                    <div
                                      className={`text-xs ${getRarityColor(traitRarity)}`}
                                    >
                                      {traitRarity}%
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Details Section */}
          <div>
            <button
              className="flex w-full items-center justify-between rounded-xl bg-slate-800/50 p-3 text-left"
              onClick={() => toggleSection("details")}
            >
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-orange-400" />
                <h3 className="font-medium text-white">Additional Details</h3>
              </div>
              {expandedSections.includes("details") ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.includes("details") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {selectedNFTs.map((nft) => (
                      <div
                        key={`details-${nft.id}`}
                        className="rounded-xl bg-slate-800/30 p-3"
                      >
                        {nft.owner && (
                          <div className="mb-2">
                            <div className="mb-1 text-xs text-slate-400">
                              Owner
                            </div>
                            <div className="truncate text-sm text-slate-300">
                              {nft.owner}
                            </div>
                          </div>
                        )}

                        {nft.tokenId && (
                          <div>
                            <div className="mb-1 text-xs text-slate-400">
                              Token ID
                            </div>
                            <div className="truncate text-sm text-slate-300">
                              {nft.tokenId}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTComparisonTool;
