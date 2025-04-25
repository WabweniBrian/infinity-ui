"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import NFTGalleryViewer from "./nft-gallery-viewer";

const galleryItems = [
  {
    id: "1",
    name: "Cosmic Voyager #042",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoPGN5EkURmqDpgTYnlJ0VQxFuAyXbhka81jzw",
    creator: "stellarartist",
    price: "2.5",
    currency: "ETH",
    description:
      "A unique digital artwork exploring the depths of cosmic imagination.",
    likes: 142,
    views: 1024,
  },
  {
    id: "2",
    name: "Digital Dreamscape",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxppOJrtFC1a2S06AJNu9MsdPXG8D5oerTblR",
    creator: "pixelmaster",
    price: "1.8",
    currency: "ETH",
    description: "An immersive digital landscape from the realm of dreams.",
    likes: 89,
    views: 756,
  },
  {
    id: "3",
    name: "Abstract Dimensions #023",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoBFgRTlkq9k2zJh4F5OKicHTlarv3YGQjpDZb",
    creator: "cryptoartist",
    price: "3.2",
    currency: "ETH",
    description:
      "A multi-dimensional abstract artwork pushing the boundaries of digital art.",
    likes: 215,
    views: 1432,
  },
  {
    id: "4",
    name: "Future Relic #007",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypokRuewWrPieNLljoZXDu7tSgcd5rJ2sYCBAxK",
    creator: "neodesigner",
    price: "0.9",
    currency: "ETH",
    description: "A digital artifact from a future civilization.",
    likes: 56,
    views: 412,
  },
];

const NFTGallery = () => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-4 text-white">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">NFT Gallery Viewer</h2>
          <motion.button
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGallery(true)}
          >
            Open Gallery
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGallery(true)}
            >
              <div className="h-full w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-slate-400">
          Click on any image to open the gallery viewer. The viewer also
          supports all kinds of keyboard shortcuts for easy navigation.
          <br /> E.g <br /> Esc: Close the viewer, <br /> Arrow keys: Navigate
          through images, <br /> r: Rotate, <br /> +: Zoom in, <br /> -: Zoom
          out, <br /> i: Toggle Info, <br /> f: Toggle Fullscreen, <br />
        </p>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-50">
          <NFTGalleryViewer
            title="NFT Collection Gallery"
            items={galleryItems}
            onClose={() => setShowGallery(false)}
          />
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
