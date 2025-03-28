"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";

interface FlipCardProps {
  product: Product;
}

const FlipCard = ({ product }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div
      className="perspective-1000 h-[400px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsFlipped(false);
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="transform-style-3d relative h-full w-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="backface-hidden absolute inset-0 rounded-2xl bg-white shadow-lg dark:bg-slate-800">
          <div className="relative h-full overflow-hidden rounded-2xl">
            {/* Product image */}
            <div className="relative h-3/4 w-full overflow-hidden">
              <Image
                src={
                  product.image ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-500 ease-out"
                style={{
                  transform:
                    isHovered && !isFlipped ? "scale(1.05)" : "scale(1)",
                }}
              />

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
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
            </div>

            {/* Product info */}
            <div className="absolute bottom-0 w-full bg-white p-4 dark:bg-slate-800">
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
              <div className="mt-2 flex items-center justify-between">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600"
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="backface-hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 p-6 text-white shadow-lg"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="mt-4 text-white/90">{product.description}</p>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-medium">{product.rating} ★</span>
                </div>
                <div className="flex justify-between">
                  <span>In Stock:</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-white/70 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <motion.button
                className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 font-medium text-purple-600 transition-colors hover:bg-white/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
