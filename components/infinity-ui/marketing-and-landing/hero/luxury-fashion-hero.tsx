"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Package,
  Search,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LuxuryFashionHero = () => {
  const controls = useAnimation();
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  // Product data
  const products = [
    {
      name: "Silk Couture Dress",
      price: "$1,295",
      rating: 4.9,
      reviews: 124,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo4jrE1EdV8HBnj2sim5N7M41k9TADhtKvdpry",
    },
    {
      name: "Cashmere Overcoat",
      price: "$2,450",
      rating: 4.8,
      reviews: 86,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5RtxVVjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    {
      name: "Leather Crossbody Bag",
      price: "$895",
      rating: 4.7,
      reviews: 152,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypom3Yq1wGMcq2hSYiK0RjVdusB8bOIWnCQy9fp",
    },
  ];

  // Categories
  const categories = ["New Arrivals", "Women", "Men", "Accessories", "Sale"];

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");

    // Auto-rotate products
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, products.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#f8f5f2] py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-amber-200 blur-[80px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-rose-200 blur-[80px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500"></span>
              Fall Collection 2023
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 font-serif text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Timeless{" "}
              <span className="relative font-medium italic text-amber-800">
                elegance
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 w-full bg-amber-200"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>{" "}
              redefined
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Discover our curated collection of luxury pieces crafted with
              exceptional materials and impeccable attention to detail. Elevate
              your wardrobe with timeless sophistication.
            </motion.p>

            {/* Category navigation */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(index)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === index
                        ? "bg-amber-800 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Search bar */}
            <motion.div
              variants={itemVariants}
              className="mb-8 overflow-hidden rounded-full border border-gray-200 bg-white"
            >
              <div className="flex items-center">
                <div className="flex flex-1 items-center px-4 py-3">
                  <Search className="mr-2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for luxury items..."
                    className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="px-1">
                  <button className="rounded-full bg-amber-800 px-6 py-3 font-medium text-white transition-all hover:bg-amber-900">
                    Search
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-amber-800 px-6 py-3 font-medium text-white transition-all hover:bg-amber-900"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <ShoppingBag className="h-4 w-4" />
                View Lookbook
              </motion.button>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Package, text: "Easy Returns" },
                { icon: Star, text: "Premium Quality" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <benefit.icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {benefit.text}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Product showcase */}
              <div className="relative h-[500px]">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{
                      opacity: activeProduct === index ? 1 : 0,
                      scale: activeProduct === index ? 1 : 0.9,
                      x: activeProduct === index ? 0 : 50,
                      zIndex: activeProduct === index ? 30 : 10,
                    }}
                    transition={{
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`absolute inset-0 ${activeProduct === index ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                      <div className="relative h-[350px] w-full">
                        <Image
                          src={
                            product.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-amber-800 backdrop-blur-sm hover:bg-white"
                        >
                          <Heart className="h-5 w-5" />
                        </motion.button>

                        <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-amber-800 backdrop-blur-sm">
                          Limited Edition
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-1 flex items-center gap-1 text-xs text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-amber-500" : ""}`}
                            />
                          ))}
                          <span className="ml-1 text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        <h3 className="mb-1 text-lg font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <div className="mb-4 text-lg font-bold text-amber-800">
                          {product.price}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            4 colors available
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 rounded-full bg-amber-800 px-4 py-2 text-xs font-medium text-white hover:bg-amber-900"
                          >
                            Add to Bag
                            <ShoppingBag className="h-3 w-3" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Product navigation */}
              <div className="mt-4 flex justify-center gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProduct(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeProduct === index
                        ? "w-8 bg-amber-800"
                        : "w-2 bg-gray-300"
                    }`}
                    aria-label={`View product ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 top-10 z-40 rounded-lg bg-white p-3 shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <Star className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      Editor&apos;s Choice
                    </div>
                    <div className="text-gray-600">Featured in Vogue</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -bottom-8 -right-10 z-40 rounded-lg bg-white p-3 shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      Exclusive Offer
                    </div>
                    <div className="text-gray-600">20% Off First Order</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryFashionHero;
