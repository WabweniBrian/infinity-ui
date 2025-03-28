"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"

type ColorOption = {
  id: string
  name: string
  value: string
}

type SizeOption = {
  id: string
  label: string
}

type PriceRange = {
  min: number
  max: number
  label: string
}

type VisualFilterSelectorProps = {
  colors: ColorOption[]
  sizes: SizeOption[]
  priceRanges: PriceRange[]
  onFilterChange: (type: "color" | "size" | "price", value: string) => void
  selectedFilters: {
    colors: string[]
    sizes: string[]
    price: string | null
  }
  onClearFilters: () => void
}

const VisualFilterSelector = ({
  colors,
  sizes,
  priceRanges,
  onFilterChange,
  selectedFilters,
  onClearFilters,
}: VisualFilterSelectorProps) => {
  const [activeTab, setActiveTab] = useState<"color" | "size" | "price">("color")

  const hasFilters =
    selectedFilters.colors.length > 0 || selectedFilters.sizes.length > 0 || selectedFilters.price !== null

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("color")}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "color" ? "text-indigo-600" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Colors
          {selectedFilters.colors.length > 0 && (
            <span className="absolute top-2 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {selectedFilters.colors.length}
            </span>
          )}
          {activeTab === "color" && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("size")}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "size" ? "text-indigo-600" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Sizes
          {selectedFilters.sizes.length > 0 && (
            <span className="absolute top-2 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {selectedFilters.sizes.length}
            </span>
          )}
          {activeTab === "size" && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("price")}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "price" ? "text-indigo-600" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Price
          {selectedFilters.price && (
            <span className="absolute top-2 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          )}
          {activeTab === "price" && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
            />
          )}
        </button>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === "color" && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-6 gap-3"
            >
              {colors.map((color) => {
                const isSelected = selectedFilters.colors.includes(color.id)
                return (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange("color", color.id)}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 ${
                        isSelected ? "border-indigo-600" : "border-gray-200"
                      } flex items-center justify-center`}
                      style={{ backgroundColor: color.value }}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          <Check size={12} className="text-indigo-600" />
                        </motion.div>
                      )}
                    </div>
                    <span className="mt-1 text-xs text-gray-600">{color.name}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          )}

          {activeTab === "size" && (
            <motion.div
              key="sizes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-4 gap-3"
            >
              {sizes.map((size) => {
                const isSelected = selectedFilters.sizes.includes(size.id)
                return (
                  <motion.button
                    key={size.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange("size", size.id)}
                    className={`py-2 rounded-md border-2 transition-colors ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {size.label}
                  </motion.button>
                )
              })}
            </motion.div>
          )}

          {activeTab === "price" && (
            <motion.div
              key="price"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {priceRanges.map((range) => {
                const isSelected = selectedFilters.price === `${range.min}-${range.max}`
                return (
                  <motion.button
                    key={`${range.min}-${range.max}`}
                    whileHover={{ x: 4 }}
                    onClick={() => onFilterChange("price", `${range.min}-${range.max}`)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                      isSelected ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="font-medium">{range.label}</span>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check size={18} className="text-indigo-600" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center"
        >
          <div className="text-sm text-gray-500">
            {selectedFilters.colors.length + selectedFilters.sizes.length + (selectedFilters.price ? 1 : 0)} filters
            applied
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X size={14} />
            Clear all
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default VisualFilterSelector

