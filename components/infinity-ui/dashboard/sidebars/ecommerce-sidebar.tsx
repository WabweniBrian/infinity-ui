"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  Star,
  Check,
  ShoppingBag,
  Heart,
  RefreshCw,
  Truck,
  Percent,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

type FilterCategory = {
  name: string;
  options: { id: string; name: string; count: number }[];
};

type ColorOption = {
  id: string;
  name: string;
  color: string;
  count: number;
};

const EcommerceSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Category",
    "Brand",
  ]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId],
    );
  };

  const setRating = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedColors([]);
    setSelectedRating(null);
    setPriceRange([0, 1000]);
  };

  const filterCategories: FilterCategory[] = [
    {
      name: "Category",
      options: [
        { id: "clothing", name: "Clothing", count: 125 },
        { id: "shoes", name: "Shoes", count: 86 },
        { id: "accessories", name: "Accessories", count: 54 },
        { id: "bags", name: "Bags", count: 32 },
        { id: "jewelry", name: "Jewelry", count: 41 },
      ],
    },
    {
      name: "Brand",
      options: [
        { id: "nike", name: "Nike", count: 45 },
        { id: "adidas", name: "Adidas", count: 38 },
        { id: "puma", name: "Puma", count: 29 },
        { id: "reebok", name: "Reebok", count: 24 },
        { id: "newbalance", name: "New Balance", count: 18 },
      ],
    },
    {
      name: "Size",
      options: [
        { id: "xs", name: "XS", count: 28 },
        { id: "s", name: "S", count: 42 },
        { id: "m", name: "M", count: 56 },
        { id: "l", name: "L", count: 48 },
        { id: "xl", name: "XL", count: 36 },
        { id: "xxl", name: "XXL", count: 24 },
      ],
    },
  ];

  const colorOptions: ColorOption[] = [
    { id: "black", name: "Black", color: "bg-black", count: 45 },
    {
      id: "white",
      name: "White",
      color: "bg-white border border-gray-200",
      count: 32,
    },
    { id: "gray", name: "Gray", color: "bg-gray-500", count: 28 },
    { id: "red", name: "Red", color: "bg-red-500", count: 24 },
    { id: "blue", name: "Blue", color: "bg-blue-500", count: 36 },
    { id: "green", name: "Green", color: "bg-green-500", count: 18 },
    { id: "yellow", name: "Yellow", color: "bg-yellow-400", count: 12 },
    { id: "purple", name: "Purple", color: "bg-purple-500", count: 9 },
  ];

  const specialFilters = [
    { id: "sale", name: "On Sale", icon: <Percent className="mr-2 h-4 w-4" /> },
    {
      id: "new",
      name: "New Arrivals",
      icon: <RefreshCw className="mr-2 h-4 w-4" />,
    },
    {
      id: "free-shipping",
      name: "Free Shipping",
      icon: <Truck className="mr-2 h-4 w-4" />,
    },
  ];

  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Overlay variants
  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile filter button */}
      <div className="fixed left-4 top-4 z-40 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 768 && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={window.innerWidth < 768 ? "closed" : "open"}
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed bottom-0 left-0 top-0 z-50 flex w-80 flex-col bg-white shadow-lg transition-colors duration-200"
          >
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              {/* Active filters */}
              {(selectedFilters.length > 0 ||
                selectedColors.length > 0 ||
                selectedRating !== null) && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    Active Filters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filterId) => {
                      const category = filterCategories.find((cat) =>
                        cat.options.some((opt) => opt.id === filterId),
                      );
                      const option = category?.options.find(
                        (opt) => opt.id === filterId,
                      );
                      return (
                        option && (
                          <button
                            key={filterId}
                            onClick={() => toggleFilter(filterId)}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                          >
                            {option.name}
                            <X className="ml-1 h-3 w-3" />
                          </button>
                        )
                      );
                    })}
                    {selectedColors.map((colorId) => {
                      const color = colorOptions.find((c) => c.id === colorId);
                      return (
                        color && (
                          <button
                            key={colorId}
                            onClick={() => toggleColor(colorId)}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                          >
                            {color.name}
                            <X className="ml-1 h-3 w-3" />
                          </button>
                        )
                      );
                    })}
                    {selectedRating !== null && (
                      <button
                        onClick={() => setSelectedRating(null)}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                      >
                        {selectedRating}+ Stars
                        <X className="ml-1 h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Price Range
                  </h3>
                  <span className="text-sm text-gray-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>

              {/* Special Filters */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">
                  Special Offers
                </h3>
                <div className="space-y-2">
                  {specialFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`flex w-full items-center rounded-md px-3 py-2 text-sm ${
                        selectedFilters.includes(filter.id)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {filter.icon}
                      {filter.name}
                      {selectedFilters.includes(filter.id) && (
                        <Check className="ml-auto h-4 w-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRating(rating)}
                      className={`flex w-full items-center rounded-md px-3 py-2 text-sm ${
                        selectedRating === rating
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2">{rating}+ Stars</span>
                      </div>
                      {selectedRating === rating && (
                        <Check className="ml-auto h-4 w-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => toggleColor(color.id)}
                      className="flex flex-col items-center space-y-1"
                    >
                      <div
                        className={`h-8 w-8 rounded-full ${color.color} flex items-center justify-center ${
                          selectedColors.includes(color.id)
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                        }`}
                      >
                        {selectedColors.includes(color.id) && (
                          <Check
                            className={`h-4 w-4 ${color.id === "white" ? "text-gray-900" : "text-white"}`}
                          />
                        )}
                      </div>
                      <span className="text-xs text-gray-700">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Categories */}
              {filterCategories.map((category) => (
                <div key={category.name} className="border-t pt-4">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="mb-2 flex w-full items-center justify-between text-sm font-medium text-gray-900"
                  >
                    <span>{category.name}</span>
                    {expandedCategories.includes(category.name) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedCategories.includes(category.name) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        {category.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => toggleFilter(option.id)}
                            className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm ${
                              selectedFilters.includes(option.id)
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <span>{option.name}</span>
                            <div className="flex items-center">
                              <span className="mr-2 text-xs text-gray-500">
                                {option.count}
                              </span>
                              {selectedFilters.includes(option.id) && (
                                <Check className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Apply Filters Button (Mobile) */}
            <div className="border-t p-4 md:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${isOpen ? "md:ml-80" : ""}`}
      >
        <div className="p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="min-h-[calc(100vh-4rem)] rounded-lg bg-white p-6 shadow">
              <h1 className="mb-4 text-2xl font-bold text-gray-900">
                Product Catalog
              </h1>
              <p className="mb-6 text-gray-600">
                This is an e-commerce sidebar example with product filtering
                capabilities. On desktop, the sidebar is always visible. On
                mobile, it can be toggled with the filter button.
              </p>

              {/* Product Grid Placeholder */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-lg bg-gray-50 p-4"
                  >
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200">
                      <div className="h-48 w-full animate-pulse bg-gray-200"></div>
                    </div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
                      <div className="flex space-x-2">
                        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                          <Heart className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                          <ShoppingBag className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceSidebar;
