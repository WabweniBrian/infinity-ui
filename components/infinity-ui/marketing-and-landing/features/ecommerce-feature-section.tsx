"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  CreditCard,
  Star,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const EcommerceFeatureSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const features = [
    {
      icon: ShoppingBag,
      title: "Curated Collections",
      description:
        "Discover handpicked products that match your style and preferences.",
      color: "from-rose-400 to-red-500",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Free shipping on orders over $50 with 2-day delivery on all items.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Hassle-free 30-day returns with prepaid shipping labels.",
      color: "from-emerald-400 to-green-500",
    },
    {
      icon: CreditCard,
      title: "Secure Checkout",
      description: "Multiple payment options with enterprise-grade security.",
      color: "from-blue-400 to-indigo-500",
    },
  ];

  const products = [
    {
      name: "Modern Lounge Chair",
      price: "$249",
      rating: 4.8,
      reviews: 124,
      image: "/default-image.jpg",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      name: "Ceramic Table Lamp",
      price: "$89",
      rating: 4.7,
      reviews: 86,
      image: "/default-image.jpg",
      color: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      name: "Minimalist Desk",
      price: "$349",
      rating: 4.9,
      reviews: 215,
      image: "/default-image.jpg",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-to-b from-rose-100/30 to-transparent dark:from-rose-900/10 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-gradient-to-t from-amber-100/30 to-transparent dark:from-amber-900/10 dark:to-transparent"></div>

        <svg
          className="absolute left-0 top-0 h-full w-full opacity-30 dark:opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="rgba(229, 62, 62, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-rose-300/20 to-amber-300/20 blur-3xl dark:from-rose-900/10 dark:to-amber-900/10"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-300/20 to-emerald-300/20 blur-3xl dark:from-blue-900/10 dark:to-emerald-900/10"
        ></motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-rose-500/10 to-amber-500/10 px-3 py-1 text-sm font-medium text-rose-600 dark:from-rose-500/20 dark:to-amber-500/20 dark:text-rose-400">
            Shopping Made Simple
          </span>
          <h2 className="mt-2 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl">
            The future of{" "}
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              retail
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Discover a shopping experience designed around what matters most to
            you.
          </p>
        </motion.div>

        <div className="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 -rotate-2 transform rounded-3xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-xl"></div>
              <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-800">
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group relative"
                      whileHover={{ y: -5 }}
                    >
                      <div className="absolute inset-0 transform rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 transition-transform duration-300 group-hover:scale-95 dark:from-gray-800 dark:to-gray-700"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-rose-500/20 dark:to-amber-500/20"></div>

                      <div className="relative p-6">
                        <div
                          className={`mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br ${feature.color} flex transform items-center justify-center transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110`}
                        >
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        Ready to transform your shopping?
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Join thousands of satisfied customers today.
                      </p>
                    </div>
                    <button className="rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-3 font-medium text-white shadow-lg shadow-rose-500/20 transition-colors hover:from-rose-600 hover:to-amber-600">
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
              <div className="p-8">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Featured Products
                  </h3>
                  <button className="flex items-center text-sm font-medium text-rose-600 dark:text-rose-400">
                    View all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="group relative"
                      onMouseEnter={() => setHoveredProduct(index)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center space-x-6">
                        <div
                          className={`relative h-24 w-24 rounded-2xl ${product.color} flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-lg`}
                        >
                          <motion.div
                            animate={
                              hoveredProduct === index
                                ? { scale: 1.1, rotate: -5 }
                                : { scale: 1, rotate: 0 }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            <Image
                              src={product.image || "/default-image.jpg"}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="h-20 w-20 object-contain"
                            />
                          </motion.div>
                        </div>

                        <div className="flex-1">
                          <h4 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                            {product.name}
                          </h4>
                          <div className="mb-2 flex items-center">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-amber-400 text-amber-400"
                                      : i < product.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {product.price}
                            </span>
                            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-900 transition-colors duration-300 hover:bg-rose-500 hover:text-white dark:bg-gray-700 dark:text-white">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>

                      {index < products.length - 1 && (
                        <div className="absolute bottom-0 left-12 right-0 h-px translate-y-3 transform bg-gray-100 dark:bg-gray-700"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-rose-500 to-amber-500">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="relative flex h-full items-center p-8">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      New arrivals are here
                    </h3>
                    <p className="mb-4 max-w-md text-white/80">
                      Check out the latest options from our summer small-batch
                      release while they&apos;re still in stock.
                    </p>
                    <button className="rounded-lg bg-white px-6 py-2 font-medium text-rose-600 transition-colors hover:bg-rose-50">
                      Shop New Arrivals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 blur-xl"></div>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center p-8 md:p-12">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-rose-500/10 to-amber-500/10 px-3 py-1 text-sm font-medium text-rose-600 dark:from-rose-500/20 dark:to-amber-500/20 dark:text-rose-400">
                    Limited Time Offer
                  </span>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                    Get 20% off your first purchase
                  </h3>
                  <p className="mb-8 max-w-md text-gray-600 dark:text-gray-300">
                    Sign up for our newsletter and receive a special discount
                    code for your first order. Plus, get early access to sales
                    and exclusive offers.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-rose-400"
                    />
                    <button className="whitespace-nowrap rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-3 font-medium text-white shadow-lg shadow-rose-500/20 transition-colors hover:from-rose-600 hover:to-amber-600">
                      Subscribe Now
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    By subscribing, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </div>
              </div>

              <div className="relative h-64 lg:h-auto">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=600&width=800')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent dark:from-gray-800"></div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-xl dark:bg-gray-900"
                  >
                    <div className="text-center">
                      <span className="block text-4xl font-bold text-rose-600 dark:text-rose-400">
                        20%
                      </span>
                      <span className="block font-medium text-gray-900 dark:text-white">
                        OFF
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EcommerceFeatureSection;
