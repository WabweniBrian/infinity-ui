"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/data/products";

interface FashionCardProps {
  product: Product;
}

const FashionCard = ({ product }: FashionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
      {/* Product image */}
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-slate-800">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-all duration-700"
          style={{
            transform: isHovered ? "scale(1.03)" : "scale(1)",
          }}
        />

        {/* Favorite button */}
        <button
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-700 hover:bg-white dark:bg-slate-800/80 dark:text-gray-200 dark:hover:bg-slate-700"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Sale badge */}
        {product.isOnSale && (
          <div className="absolute left-0 top-3">
            <span className="bg-black px-2 py-1 text-xs font-medium uppercase text-white dark:bg-white dark:text-black">
              Sale
            </span>
          </div>
        )}

        {/* Limited edition badge */}
        {product.isLimitedEdition && (
          <div className="absolute left-0 top-10">
            <span className="bg-purple-600 px-2 py-1 text-xs font-medium uppercase text-white">
              Limited
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-1 font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {product.category}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.originalPrice ? (
              <>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.button
                className="flex items-center text-xs font-medium uppercase text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingBag className="mr-1 h-4 w-4" />
                Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default FashionCard;
