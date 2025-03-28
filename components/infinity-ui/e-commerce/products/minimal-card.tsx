"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";

interface MinimalCardProps {
  product: Product;
}

const MinimalCard = ({ product }: MinimalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.value || "",
  );

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white transition-all hover:shadow-md dark:bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-slate-800">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-all duration-500"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-sm bg-black px-2 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
              New
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="rounded-sm bg-purple-600 px-2 py-1 text-xs font-medium text-white">
              Limited Edition
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute right-3 top-3">
          <motion.button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-slate-800/80 dark:text-gray-200 dark:hover:bg-slate-700"
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Add to cart button */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white">
          <button className="flex w-full items-center justify-center text-sm font-medium text-white dark:text-black">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          {product.category}
        </p>

        {/* Color options */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-auto flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.value}
                className={`h-4 w-4 rounded-full border ${
                  selectedColor === color.value
                    ? "ring-2 ring-black dark:ring-white"
                    : "ring-1 ring-gray-300 dark:ring-gray-600"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MinimalCard;
