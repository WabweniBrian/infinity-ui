"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/data/products";

interface GlassCardProps {
  product: Product;
}

const GlassCard = ({ product }: GlassCardProps) => {
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
      className="group relative h-[400px] w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={
            product.image ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Glassmorphism card */}
      <motion.div
        className="absolute inset-x-4 bottom-4 overflow-hidden rounded-xl bg-white/20 p-4 backdrop-blur-lg transition-all duration-300 dark:bg-black/40"
        animate={{
          height: isHovered ? "75%" : "30%",
          y: isHovered ? -20 : 0,
        }}
      >
        {/* Badges */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
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

        <h3 className="text-xl font-bold text-white">{product.name}</h3>

        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-white/80">
            ({product.reviewCount})
          </span>
        </div>

        <motion.p
          className="mt-3 text-sm text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
        >
          {product.description}
        </motion.p>

        <motion.div
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-white/70 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <motion.button
              className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm ${
                isFavorite
                  ? "bg-red-500/80 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
            </motion.button>

            <motion.button
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GlassCard;
