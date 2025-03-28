"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import GradientCard from "./gradient-card";

interface HorizontalGridProps {
  title?: string;
  subtitle?: string;
}

const HorizontalGrid = ({
  title = "Bestsellers",
  subtitle,
}: HorizontalGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const opacity = useTransform(scrollXProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollXProgress, [0, 0.1], [1, 0.8]);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ opacity, scale }}
            className="origin-left"
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

        <div
          ref={containerRef}
          className="scrollbar-hide mt-12 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="min-w-[300px] flex-shrink-0 snap-center sm:min-w-[350px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <GradientCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGrid;
