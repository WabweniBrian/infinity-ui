"use client";

import { nfts } from "@/data/nfts";
import { useState } from "react";
import NFTCard from "./nft-card";
import NFTDetailsModal from "./nft-details-modal";

const NFTFeatured = () => {
  const [selectedNFT, setSelectedNFT] = useState(nfts[0]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Set auction end time to 3 days from now
  const auctionEndTime = new Date();
  auctionEndTime.setDate(auctionEndTime.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-12 text-white">
      <div className="mx-auto max-w-sm">
        <h2 className="mb-6 text-2xl font-bold">Featured NFT</h2>
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <NFTCard
            id={selectedNFT.id}
            name={selectedNFT.name}
            creator={selectedNFT.creator}
            creatorAvatar={selectedNFT.creatorAvatar}
            image={selectedNFT.image}
            price={selectedNFT.price}
            currency={selectedNFT.currency}
            likes={selectedNFT.likes}
            isLiked={selectedNFT.isLiked}
          />
        </div>
      </div>

      <NFTDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nft={selectedNFT}
      />
    </div>
  );
};

export default NFTFeatured;
