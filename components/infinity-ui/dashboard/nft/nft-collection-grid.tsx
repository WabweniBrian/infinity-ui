"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid3X3, LayoutGrid, Search } from "lucide-react";
import NFTCard from "./nft-card";
import { nfts } from "@/data/nfts";

const NFTCollectionGrid = () => {
  const [layout, setLayout] = useState<"grid" | "compact">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-8 text-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Trending NFTs
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Discover the most sought-after digital collectibles in our
            marketplace
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or creator..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
            <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-1">
              <button
                className={`rounded-lg p-2 ${layout === "grid" ? "bg-slate-700 text-white" : "text-slate-400"}`}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`rounded-lg p-2 ${layout === "compact" ? "bg-slate-700 text-white" : "text-slate-400"}`}
                onClick={() => setLayout("compact")}
              >
                <Grid3X3 size={18} />
              </button>
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <div
          className={`grid gap-6 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}
        >
          {filteredNFTs.length > 0 ? (
            filteredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <NFTCard {...nft} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400">
              <p className="mb-2 text-xl">No NFTs found</p>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredNFTs.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              className="rounded-xl border border-slate-700 bg-slate-800 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NFTCollectionGrid;
