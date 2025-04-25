"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import NFTMintingWizard from "./nft-minting-wizard";

const collectionOptions = [
  {
    id: "1",
    name: "Cosmic Series",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoXr60I3aE9ypokK1iYOj830UwuGLFVzJgBhCr",
  },
  {
    id: "2",
    name: "Abstract Collection",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxppOJrtFC1a2S06AJNu9MsdPXG8D5oerTblR",
  },
  {
    id: "3",
    name: "Future Relics",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypokRuewWrPieNLljoZXDu7tSgcd5rJ2sYCBAxK",
  },
];

const NFTMinting = () => {
  const [showMintingWizard, setShowMintingWizard] = useState(false);

  // Handle mint NFT
  const handleMintNFT = async (data: any) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        console.log("Minting NFT with data:", data);
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">NFT Minting Wizard</h2>
            <motion.button
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMintingWizard(true)}
            >
              Create New NFT
            </motion.button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Create Your Own NFT
              </h3>
              <p className="mb-6 text-slate-400">
                Use our step-by-step wizard to mint your own NFT. Upload your
                artwork, set properties, and define pricing.
              </p>
              <motion.button
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMintingWizard(true)}
              >
                Start Creating
              </motion.button>
            </div>
          </div>

          {showMintingWizard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
              <div className="max-h-[90vh] w-full max-w-3xl overflow-auto">
                <NFTMintingWizard
                  collections={collectionOptions}
                  onMint={handleMintNFT}
                  onClose={() => setShowMintingWizard(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTMinting;
