"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface SneakerCardProps {
  product: Product;
}

const SneakerCard = ({ product }: SneakerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <motion.div
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Product image with background */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-all duration-700"
          style={{
            transform: isHovered
              ? "scale(1.05) rotate(2deg)"
              : "scale(1) rotate(0deg)",
          }}
        />

        {/* New badge */}
        {product.isNew && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase text-white dark:bg-white dark:text-black">
              Just In
            </span>
          </div>
        )}

        {/* Limited edition badge */}
        {product.isLimitedEdition && (
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">
              Limited
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          {product.category}
        </p>

        {/* Size selector */}
        <AnimatePresence>
          {isHovered && product.sizes && product.sizes.length > 0 && (
            <motion.div
              className="mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`flex h-8 w-10 items-center justify-center rounded border text-xs font-medium transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-300 bg-white text-gray-900 hover:border-gray-900 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to bag button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              className="mt-4 w-full rounded-full bg-black py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              Add to Bag
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SneakerCard;
