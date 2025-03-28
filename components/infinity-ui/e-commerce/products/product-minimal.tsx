"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { products } from "@/data/products";
import StarRating from "./star-rating";

interface ProductMinimalProps {
  title?: string;
  subtitle?: string;
}

const ProductMinimal = ({
  title = "Bestsellers",
  subtitle,
}: ProductMinimalProps) => {
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleAddToCart = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setAddedToCart((prev) => ({
      ...prev,
      [productId]: true,
    }));

    // Reset the "Added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [productId]: false,
      }));
    }, 2000);
  };

  return (
    <section className="bg-gray-50 py-16 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          className="mt-12 space-y-4 divide-y divide-gray-200 dark:divide-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.slice(0, 5).map((product, index) => (
            <motion.div
              key={product.id}
              className="group flex items-center gap-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ x: 5 }}
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-700 sm:h-24 sm:w-24">
                {(product.isNew || product.isOnSale) && (
                  <div className="absolute left-0 top-0 z-10">
                    {product.isNew && (
                      <span className="inline-block bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                        New
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="inline-block bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        Sale
                      </span>
                    )}
                  </div>
                )}
                <Image
                  src={
                    product.image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={product.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white sm:text-lg">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-base font-medium text-gray-900 dark:text-white sm:text-lg">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-500 line-through dark:text-gray-400">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </div>

                  <motion.button
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      addedToCart[product.id]
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600"
                    }`}
                    onClick={(e) => handleAddToCart(product.id, e)}
                    whileTap={{ scale: 0.9 }}
                  >
                    {addedToCart[product.id] ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductMinimal;
