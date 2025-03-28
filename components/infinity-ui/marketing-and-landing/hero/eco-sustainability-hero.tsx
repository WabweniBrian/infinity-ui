"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Droplet,
  Leaf,
  Recycle,
  Sun,
  TreePine,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EcoSustainabilityHero = () => {
  const controls = useAnimation();
  const [activeProduct, setActiveProduct] = useState(0);

  // Products data
  const products = [
    {
      name: "Bamboo Water Bottle",
      description: "Sustainable, BPA-free, and biodegradable",
      price: "$24.99",
      impact: "Saves 167 plastic bottles per year",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoKjjZD8bFM6wEXh7LJj93cm4UaIW2nQN1uCVT",
    },
    {
      name: "Organic Cotton Tote",
      description: "Ethically sourced and naturally dyed",
      price: "$18.99",
      impact: "Replaces 700+ single-use bags",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoKjHPOBaFM6wEXh7LJj93cm4UaIW2nQN1uCVT",
    },
    {
      name: "Solar Power Bank",
      description: "Harness the sun's energy on the go",
      price: "$39.99",
      impact: "100% renewable energy source",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo1AAINS1ZzfEpmIkG3Q9nNcdoiOUZFRY8MTyb",
    },
  ];

  // Impact metrics
  const impactMetrics = [
    { label: "Trees Planted", value: "125,430", icon: TreePine },
    { label: "Plastic Saved", value: "32 Tons", icon: Recycle },
    { label: "Water Conserved", value: "1.2M Gal", icon: Droplet },
  ];

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
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-green-50 to-white py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-green-100 opacity-50 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-40 right-0 h-[300px] w-[300px] rounded-full bg-yellow-100 opacity-50 blur-3xl"
        />

        {/* Floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 360,
            }}
            animate={{
              opacity: 0.5,
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              rotate: [
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360,
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15 + Math.random() * 10,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Leaf
              className="h-6 w-6 text-green-300"
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          </motion.div>
        ))}
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
              className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
              Sustainable Living Made Simple
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Small changes,{" "}
              <span className="relative text-green-600">
                big impact
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-green-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Discover eco-friendly products that help you reduce your
              environmental footprint without compromising on quality or
              convenience.
            </motion.p>

            {/* Impact metrics */}
            <motion.div
              variants={itemVariants}
              className="mb-8 grid grid-cols-3 gap-4"
            >
              {impactMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-green-100 bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <metric.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Eco benefits */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-4 text-sm font-medium text-gray-700">
                Why Choose Eco-Friendly?
              </div>
              <div className="space-y-3">
                {[
                  "Reduces landfill waste and ocean pollution",
                  "Conserves natural resources for future generations",
                  "Minimizes your carbon footprint and combats climate change",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1 text-green-600">
                      <Check className="h-3 w-3" />
                    </div>
                    <div className="text-gray-600">{benefit}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-medium text-white transition-all hover:bg-green-700"
              >
                Shop Eco Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Leaf className="h-4 w-4" />
                Our Sustainability Pledge
              </motion.button>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              {[
                { name: "Certified B Corp", icon: "B" },
                { name: "Carbon Neutral", icon: "C" },
                { name: "1% For The Planet", icon: "1%" },
              ].map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                    {cert.icon}
                  </div>
                  <div className="text-sm text-gray-600">{cert.name}</div>
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
              {/* Nature-inspired frame */}
              <div className="relative rounded-2xl bg-white p-6 shadow-xl">
                {/* Decorative leaf patterns */}
                <div className="absolute -left-3 -top-3 h-12 w-12 text-green-200">
                  <Leaf className="h-full w-full" />
                </div>
                <div className="absolute -bottom-3 -right-3 h-12 w-12 text-green-200">
                  <Leaf
                    className="h-full w-full"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </div>

                {/* Product carousel */}
                <div className="relative h-[400px]">
                  {products.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: activeProduct === index ? 1 : 0,
                        scale: activeProduct === index ? 1 : 0.9,
                        zIndex: activeProduct === index ? 30 : 10,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 ${activeProduct === index ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <div className="flex h-full flex-col">
                        <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
                          <Image
                            src={
                              product.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-1 text-sm font-bold text-green-600">
                            {product.price}
                          </div>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mb-3 text-sm text-gray-600">
                          {product.description}
                        </p>

                        <div className="mt-auto flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                          <Leaf className="h-4 w-4" />
                          <span>{product.impact}</span>
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
                          ? "w-8 bg-green-500"
                          : "w-2 bg-green-200"
                      }`}
                      aria-label={`View product ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 top-10 z-40 rounded-lg bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <Sun className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Eco Tip</div>
                    <div className="text-gray-600">Reuse, reduce, recycle!</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -bottom-8 -right-10 z-20 rounded-lg bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Recycle className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Made From</div>
                    <div className="text-gray-600">100% recycled materials</div>
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

export default EcoSustainabilityHero;
