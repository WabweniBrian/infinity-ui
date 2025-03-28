"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Star, Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";

interface FloatingCardProps {
  product: Product;
}

const FloatingCard = ({ product }: FloatingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <motion.div
      className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-slate-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Product image */}
      <div className="relative h-3/5 w-full overflow-hidden">
        <Image
          src={
            product.image ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />

        {/* Floating badges */}
        <AnimatePresence>
          {product.isNew && (
            <motion.div
              className="absolute left-4 top-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                New
              </span>
            </motion.div>
          )}

          {product.isOnSale && (
            <motion.div
              className="absolute left-4 top-14"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                Sale
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating heart button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="h-5 w-5 text-gray-600 dark:text-gray-200" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through dark:text-gray-400">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Floating quantity selector and add to cart button */}
        <AnimatePresence>
          {isHovered ? (
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                <button
                  className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <motion.button
                className="flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 py-2 text-sm font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FloatingCard;
