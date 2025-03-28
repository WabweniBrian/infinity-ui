"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingBag, TrendingUp, Users, CreditCard } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Total Orders",
    value: "2.4M+",
    description: "Orders processed in the last year",
    color:
      "bg-gradient-to-br from-orange-400 to-amber-500 dark:from-orange-300 dark:to-amber-400",
    index: 0,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Conversion Rate",
    value: "8.7%",
    description: "Industry average: 2.3%",
    color:
      "bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-300 dark:to-teal-400",
    index: 1,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Repeat Customers",
    value: "78%",
    description: "Customers who purchase again",
    color:
      "bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-300 dark:to-indigo-400",
    index: 2,
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Average Order",
    value: "$128.50",
    description: "Average order value (AOV)",
    color:
      "bg-gradient-to-br from-fuchsia-400 to-purple-500 dark:from-fuchsia-300 dark:to-purple-400",
    index: 3,
  },
];

// Shopping bag animation
const ShoppingBagAnimation = () => {
  return (
    <div className="absolute right-20 top-20 opacity-10 dark:opacity-5">
      <motion.div
        className="h-40 w-40"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ShoppingBag className="h-full w-full text-orange-500 dark:text-orange-400" />
      </motion.div>
    </div>
  );
};

// Product dots animation
const ProductDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 60 + 10}, 70%, 60%)`,
            opacity: 0.3,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const EcommerceStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Product Dots Background */}
      <ProductDots />

      {/* Shopping Bag Animation */}
      <ShoppingBagAnimation />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-orange-100 px-4 py-1 dark:bg-orange-900/30">
            <ShoppingBag className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
              Retail Excellence
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Driving{" "}
            <span className="text-orange-600 dark:text-orange-400">
              e-commerce growth
            </span>{" "}
            at scale
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our platform helps retailers achieve exceptional results across all
            channels
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
              onHoverStart={() => setHoveredIndex(stat.index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Product Tag */}
              <div className="absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-gray-100 dark:bg-slate-700" />

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}
              >
                {stat.icon}
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <motion.p
                className="mt-2 text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>

              {/* Shopping Cart Animation on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 right-4"
                  >
                    <div className="relative h-8 w-8">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <ShoppingBag className="h-full w-full text-orange-500 dark:text-orange-400" />
                      </motion.div>
                      <motion.div
                        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        +1
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Progress Bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-300 dark:to-amber-400"
                initial={{ width: 0 }}
                animate={
                  isInView
                    ? { width: hoveredIndex === stat.index ? "100%" : "60%" }
                    : { width: 0 }
                }
                transition={{ duration: 0.8, delay: stat.index * 0.1 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceStats;
