"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/data/products";

interface GradientCardProps {
  product: Product;
}

const GradientCard = ({ product }: GradientCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div
      className="relative h-[400px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 p-[2px]">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(to bottom right, #9333ea, #3b82f6, #ec4899)",
                  "linear-gradient(to bottom right, #3b82f6, #ec4899, #9333ea)",
                  "linear-gradient(to bottom right, #ec4899, #9333ea, #3b82f6)",
                  "linear-gradient(to bottom right, #9333ea, #3b82f6, #ec4899)",
                ]
              : "linear-gradient(to bottom right, #9333ea, #3b82f6, #ec4899)",
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Card content */}
        <div className="relative h-full w-full rounded-[calc(1rem-1px)] bg-white p-4 dark:bg-slate-900">
          {/* Product image */}
          <div className="relative h-3/5 w-full overflow-hidden rounded-lg">
            <Image
              src={
                product.image ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              alt={product.name}
              fill
              className="object-cover object-center transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />

            {/* Badges */}
            <div className="absolute left-2 top-2 flex flex-col gap-2">
              {product.isNew && (
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                  New
                </span>
              )}
              {product.isOnSale && (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
                  Sale
                </span>
              )}
            </div>

            {/* Quick actions */}
            <motion.div
              className="absolute right-2 top-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-slate-800/80 dark:text-gray-200">
                <Heart className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Product info */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {product.rating}
                </span>
              </div>
            </div>

            <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {product.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <motion.button
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-[1px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative rounded-full bg-white px-4 py-1 text-sm font-medium text-purple-600 transition-colors group-hover:bg-transparent group-hover:text-white dark:bg-slate-900 dark:text-blue-400 dark:group-hover:bg-transparent dark:group-hover:text-white">
                  <ShoppingCart className="mr-2 inline-block h-4 w-4" />
                  Add to Cart
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
