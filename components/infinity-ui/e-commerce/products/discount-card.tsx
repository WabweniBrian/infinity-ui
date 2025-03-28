"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Clock } from "lucide-react";
import { Product } from "@/data/products";

interface DiscountCardProps {
  product: Product;
}

const DiscountCard = ({ product }: DiscountCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <motion.div
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-white p-4 dark:bg-slate-800">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          fill
          className="object-contain object-center transition-all duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Discount badge */}
        {product.discount && (
          <div className="absolute left-2 top-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Best seller badge */}
        {product.isBestSeller && (
          <div className="absolute right-2 top-2">
            <span className="rounded bg-orange-500 px-2 py-1 text-xs font-medium text-white">
              Best Seller
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900 dark:text-white">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
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
        <div className="mb-3">
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

          {/* Free shipping */}
          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
            Free shipping
          </p>
        </div>

        {/* Stock warning */}
        {product.stock < 20 && (
          <div className="mb-3 flex items-center text-xs text-orange-600 dark:text-orange-400">
            <Clock className="mr-1 h-3 w-3" />
            Only {product.stock} left in stock
          </div>
        )}

        {/* Add to cart button */}
        <motion.button
          className="mt-auto flex w-full items-center justify-center rounded-full bg-yellow-400 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-yellow-500 dark:hover:bg-yellow-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DiscountCard;
