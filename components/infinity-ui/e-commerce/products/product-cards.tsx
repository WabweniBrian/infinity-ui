"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ArrowRight, Check } from "lucide-react";
import { products } from "@/data/products";
import StarRating from "./star-rating";

interface ProductCardsProps {
  title?: string;
  subtitle?: string;
}

const ProductCards = ({
  title = "Trending Products",
  subtitle,
}: ProductCardsProps) => {
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </motion.div>

          <motion.a
            href="#"
            className="group flex items-center text-sm font-medium text-purple-600 dark:text-purple-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            View all products
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <motion.div
          className="mt-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.slice(0, 4).map((product, index) => (
            <motion.a
              key={product.id}
              href="#"
              className="relative block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative aspect-square w-full sm:w-1/3">
                  {(product.isNew || product.isOnSale) && (
                    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
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
                  )}
                  <Image
                    src={
                      product.image ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300"
                    animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <StarRating rating={product.rating} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>

                    <motion.button
                      className={`flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-all ${
                        addedToCart[product.id]
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                      }`}
                      onClick={(e) => handleAddToCart(product.id, e)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {addedToCart[product.id] ? (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Add to Cart
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCards;
