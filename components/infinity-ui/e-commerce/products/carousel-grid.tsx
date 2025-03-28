"use client";

import { products } from "@/data/products";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExpandingCard from "./expanding-card";

interface CarouselGridProps {
  title?: string;
  subtitle?: string;
}

const CarouselGrid = ({
  title = "New Arrivals",
  subtitle,
}: CarouselGridProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  // Determine how many items to show based on container width
  const getItemsToShow = () => {
    if (containerWidth < 640) return itemsPerPage.sm;
    if (containerWidth < 1024) return itemsPerPage.md;
    return itemsPerPage.lg;
  };

  const itemsToShow = getItemsToShow();
  const totalPages = Math.ceil(products.length / itemsToShow);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-16">
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

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex"
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: `${100 * Math.ceil(products.length / itemsToShow)}%`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="px-3"
                style={{
                  width: `${100 / (itemsToShow * Math.ceil(products.length / itemsToShow))}%`,
                }}
              >
                <ExpandingCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarouselGrid;
