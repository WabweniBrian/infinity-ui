"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Search,
  Calendar,
  Phone,
} from "lucide-react";
import Image from "next/image";

const RealEstateSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeProperty, setActiveProperty] = useState(0);

  const properties = [
    {
      title: "Modern Luxury Villa",
      address: "123 Oceanview Drive, Malibu, CA",
      price: "$4,250,000",
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 4200,
      description:
        "Stunning contemporary villa with panoramic ocean views, infinity pool, gourmet kitchen, and smart home technology throughout. Floor-to-ceiling windows showcase breathtaking sunsets from every room.",
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Ocean View",
        "Infinity Pool",
        "Smart Home",
        "Wine Cellar",
        "Home Theater",
      ],
      color: "from-sky-500 to-blue-500",
    },
    {
      title: "Downtown Penthouse",
      address: "789 Skyline Avenue, New York, NY",
      price: "$3,850,000",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      description:
        "Luxurious penthouse in the heart of the city with private rooftop terrace, floor-to-ceiling windows, and designer finishes. Includes 24/7 concierge service and exclusive access to building amenities.",
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Rooftop Terrace",
        "Concierge",
        "Gym Access",
        "Private Elevator",
        "City Views",
      ],
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Rustic Country Estate",
      address: "456 Woodland Lane, Aspen, CO",
      price: "$5,750,000",
      bedrooms: 6,
      bathrooms: 5,
      sqft: 5800,
      description:
        "Magnificent mountain estate on 15 acres with breathtaking views, custom timber frame construction, and luxury finishes. Features include a gourmet kitchen, wine cellar, and outdoor entertainment areas.",
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Mountain View",
        "15 Acres",
        "Guest House",
        "Stone Fireplace",
        "Heated Floors",
      ],
      color: "from-amber-500 to-orange-500",
    },
  ];

  const propertyTypes = [
    { name: "Houses", icon: "🏠", count: 245 },
    { name: "Apartments", icon: "🏢", count: 183 },
    { name: "Villas", icon: "🏘️", count: 97 },
    { name: "Land", icon: "🏞️", count: 64 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/30 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="real-estate-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#real-estate-pattern)" />
          </svg>
        </div>

        {/* Floating Elements - Real Estate Icons */}
        {["🏠", "🔑", "📍", "🏢", "🏡", "🌆"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
            <span className="mx-2 font-medium text-blue-500">
              LUXURY PROPERTIES
            </span>
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Find your
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              {" "}
              dream home
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Discover exceptional properties in the most desirable locations. Our
            curated selection offers luxury, comfort, and style.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 to-sky-500/20 blur-xl"></div>
          <div className="relative rounded-2xl border border-gray-200/50 bg-white p-6 shadow-xl dark:border-gray-700/50 dark:bg-gray-800 md:p-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Find Your Perfect Property
            </h3>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, neighborhood, or address"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Property Type
                </label>
                <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400">
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Land</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price Range
                </label>
                <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400">
                  <option>Any Price</option>
                  <option>$100k - $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $5M</option>
                  <option>$5M+</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bedrooms
                </label>
                <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400">
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                </select>
              </div>
            </div>

            <button className="inline-flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-sky-600 hover:shadow-lg md:w-auto">
              <Search className="mr-2 h-5 w-5" />
              Search Properties
            </button>
          </div>
        </motion.div>

        {/* Property Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {propertyTypes.map((type, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative rounded-xl border border-gray-200/50 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-3 text-4xl">{type.icon}</div>
                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                  {type.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {type.count} listings
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured Properties */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Properties
            </h3>
            <button className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400">
              View All Properties
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative cursor-pointer overflow-hidden rounded-xl ${activeProperty === index ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900" : ""}`}
                onClick={() => setActiveProperty(index)}
              >
                <div className="relative h-48">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute right-4 top-4 rounded-lg bg-blue-500 px-3 py-1 font-bold text-white">
                    {property.price}
                  </div>
                </div>

                <div className="border border-gray-200/50 bg-white p-4 dark:border-gray-700/50 dark:bg-gray-800">
                  <h4 className="mb-1 font-bold text-gray-900 dark:text-white">
                    {property.title}
                  </h4>
                  <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{property.address}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Bed className="mr-1 h-4 w-4 text-blue-500" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="mr-1 h-4 w-4 text-blue-500" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="mr-1 h-4 w-4 text-blue-500" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Property Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProperty}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${properties[activeProperty].color} rounded-3xl opacity-20 blur-xl`}
              ></div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={
                        properties[activeProperty].image || "/placeholder.svg"
                      }
                      alt={properties[activeProperty].title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute right-4 top-4 rounded-lg bg-blue-500 px-3 py-1 font-bold text-white">
                      {properties[activeProperty].price}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {properties[activeProperty].title}
                    </h3>
                    <div className="mb-4 flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                      <span>{properties[activeProperty].address}</span>
                    </div>

                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      {properties[activeProperty].description}
                    </p>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-700/50">
                        <Bed className="mx-auto mb-1 h-5 w-5 text-blue-500" />
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Bedrooms
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {properties[activeProperty].bedrooms}
                        </div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-700/50">
                        <Bath className="mx-auto mb-1 h-5 w-5 text-blue-500" />
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Bathrooms
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {properties[activeProperty].bathrooms}
                        </div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-700/50">
                        <Square className="mx-auto mb-1 h-5 w-5 text-blue-500" />
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Square Feet
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {properties[activeProperty].sqft.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Features:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {properties[activeProperty].features.map(
                          (feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              {feature}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-sky-600 hover:shadow-lg">
                        Schedule Viewing
                        <Calendar className="ml-2 h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                        Contact Agent
                        <Phone className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RealEstateSection;
