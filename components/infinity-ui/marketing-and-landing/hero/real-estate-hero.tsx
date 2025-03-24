"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Bed,
  ChevronDown,
  Home,
  MapPin,
  Search,
  ShowerHead,
  Square,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const RealEstateHero = () => {
  const controls = useAnimation();
  const [activeProperty, setActiveProperty] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [priceRange, setPriceRange] = useState("Any Price");

  const handleSearch = () => {
    alert(
      `Searching for ${propertyType} properties in "${location}" with price range: ${priceRange}`,
    );
  };

  // Filter options
  const filterOptions = ["Buy", "Rent", "Sell", "Estimate"];

  // Property data
  const properties = [
    {
      id: 1,
      title: "Modern Waterfront Villa",
      address: "123 Coastal Drive, Malibu, CA",
      price: "$2,495,000",
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoefk094BGZljIQpV8xdfgatbs5J3rcz1Tw6F2",
      featured: true,
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      address: "456 Urban Avenue, Los Angeles, CA",
      price: "$1,250,000",
      beds: 2,
      baths: 2,
      sqft: 1800,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypor1XrC2sRM6SezdhwEl4xm7yqiGfjgZWu9KB2",
    },
    {
      id: 3,
      title: "Suburban Family Home",
      address: "789 Maple Street, Pasadena, CA",
      price: "$875,000",
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypodYYKgV1mGvCoVSZFp2YyKNeTHljBX90gxEh6",
    },
  ];

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");

    // Auto-rotate properties
    const interval = setInterval(() => {
      setActiveProperty((prev) => (prev + 1) % properties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, properties.length]);

  return (
    <div className="relative w-full overflow-hidden bg-white py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="black"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              Find Your Dream Home
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Discover a place{" "}
              <span className="relative text-emerald-600">
                you&apos;ll love
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-emerald-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>{" "}
              to call home
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              With thousands of properties for sale and rent, we make finding
              your next home easy. Let&apos;s find a home that&apos;s perfect
              for you.
            </motion.p>

            {/* Search Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 rounded-xl bg-white shadow-md"
            >
              {/* Filter tabs */}
              <div className="flex border-b border-gray-200">
                {filterOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(option)}
                    className={`relative flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeFilter === option
                        ? "text-emerald-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {option}
                    {activeFilter === option && (
                      <motion.div
                        layoutId="activeFilterIndicator"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Location
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City, neighborhood, or address"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Property Type
                  </label>
                  <div className="relative flex items-center rounded-lg border border-gray-300">
                    <select
                      className="w-full appearance-none bg-transparent px-3 py-2 pr-8 text-sm text-gray-700 outline-none"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="Any">Any</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Condo">Condo</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Land">Land</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Price Range
                  </label>
                  <div className="relative flex items-center rounded-lg border border-gray-300">
                    <select
                      className="w-full appearance-none bg-transparent px-3 py-2 pr-8 text-sm text-gray-700 outline-none"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    >
                      <option value="Any Price">Any Price</option>
                      <option value="Under $200k">Under $200k</option>
                      <option value="$200k - $400k">$200k - $400k</option>
                      <option value="$400k - $600k">$400k - $600k</option>
                      <option value="$600k - $800k">$600k - $800k</option>
                      <option value="$800k - $1M">$800k - $1M</option>
                      <option value="$1M+">$1M+</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4" /> Search Properties
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700"
              >
                Browse Properties
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Home className="h-4 w-4" />
                Sell Your Home
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-8 text-sm text-gray-600"
            >
              <div>
                <div className="text-2xl font-bold text-emerald-600">15K+</div>
                <div>Properties Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  9.4/10
                </div>
                <div>Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">$2.1B</div>
                <div>Property Value Sold</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Property Showcase */}
          <div className="relative">
            {/* Map background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-emerald-50 opacity-50 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Property cards */}
              <div className="relative h-[400px]">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: activeProperty === index ? 1 : 0.5,
                      scale: activeProperty === index ? 1 : 0.9,
                      y: activeProperty === index ? 0 : 20,
                      zIndex: activeProperty === index ? 30 : 10,
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveProperty(index)}
                    className={`absolute left-0 top-0 w-full cursor-pointer rounded-2xl bg-white shadow-xl transition-all ${
                      activeProperty === index ? "z-30" : "z-10"
                    }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                      <Image
                        src={property.image || "/default-image.jpg"}
                        alt={property.title}
                        fill
                        className="object-cover transition-all duration-700 hover:scale-110"
                      />
                      {property.featured && (
                        <div className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-600">
                        {property.price}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="mb-1 text-lg font-bold text-gray-900">
                        {property.title}
                      </h3>
                      <div className="mb-3 flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-700">
                            <Bed className="h-4 w-4 text-gray-400" />
                            {property.beds} beds
                          </div>
                          <div className="flex items-center gap-1 text-gray-700">
                            <ShowerHead className="h-4 w-4 text-gray-400" />
                            {property.baths} baths
                          </div>
                          <div className="flex items-center gap-1 text-gray-700">
                            <Square className="h-4 w-4 text-gray-400" />
                            {property.sqft} sqft
                          </div>
                        </div>

                        <button className="rounded-full bg-emerald-100 p-2 text-emerald-600 transition-all hover:bg-emerald-200">
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Property navigation dots */}
              <div className="mt-4 flex justify-center gap-2">
                {properties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProperty(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeProperty === index
                        ? "w-8 bg-emerald-500"
                        : "w-2 bg-emerald-200"
                    }`}
                    aria-label={`View property ${index + 1}`}
                  />
                ))}
              </div>

              {/* Map preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-16 -right-16 rounded-xl bg-white p-2 shadow-lg"
              >
                <div className="relative h-32 w-48 overflow-hidden rounded-lg">
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9yponsqmO9HkZTfiFCGP2SjpuR60dcYLrWkal19K"
                    alt="Map preview"
                    width={192}
                    height={128}
                    className="h-full w-full object-cover"
                  />

                  {/* Location markers */}
                  <div className="absolute left-1/4 top-1/3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      }}
                      className="h-3 w-3 rounded-full bg-emerald-500"
                    />
                  </div>

                  <div className="absolute right-1/3 top-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        delay: 0.5,
                      }}
                      className="h-3 w-3 rounded-full bg-emerald-500"
                    />
                  </div>

                  <div className="absolute bottom-1/4 left-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        delay: 1,
                      }}
                      className="h-3 w-3 rounded-full bg-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-2 text-center text-xs font-medium text-gray-700">
                  View on Map
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateHero;
