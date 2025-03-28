"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Check } from "lucide-react";
import { Product } from "@/data/products";

interface TechCardProps {
  product: Product;
}

const TechCard = ({ product }: TechCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <motion.div
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl dark:bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-white p-6 dark:bg-slate-800">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          fill
          className="object-contain object-center transition-all duration-500"
        />

        {/* Sale badge */}
        {product.isOnSale && (
          <div className="absolute left-2 top-2">
            <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
              SAVE ${(product.originalPrice || 0) - product.price}
            </span>
          </div>
        )}

        {/* Favorite button */}
        <button
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
        </button>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900 dark:text-white">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="mb-2 flex items-center">
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
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
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
        </div>

        {/* Add to cart button */}
        <motion.button
          className={`mt-auto flex w-full items-center justify-center rounded py-2 text-sm font-medium ${
            isAddedToCart
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
        >
          {isAddedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TechCard;
