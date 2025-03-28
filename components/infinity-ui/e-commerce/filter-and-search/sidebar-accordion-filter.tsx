"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Filter, Check } from "lucide-react"

type FilterOption = {
  id: string
  label: string
  count?: number
}

type FilterCategory = {
  id: string
  name: string
  options: FilterOption[]
}

type SidebarAccordionFilterProps = {
  categories: FilterCategory[]
  onFilterChange: (categoryId: string, optionId: string, checked: boolean) => void
  selectedFilters: Record<string, string[]>
  onClearAll: () => void
}

const SidebarAccordionFilter = ({
  categories,
  onFilterChange,
  selectedFilters,
  onClearAll,
}: SidebarAccordionFilterProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({ ...acc, [category.id]: true }), {}),
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const getSelectedCount = () => {
    return Object.values(selectedFilters).reduce((count, options) => count + options.length, 0)
  }

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-700" />
          <h2 className="font-semibold text-gray-800">Filters</h2>
          {getSelectedCount() > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-indigo-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
            >
              {getSelectedCount()}
            </motion.div>
          )}
        </div>
        {getSelectedCount() > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Clear all
          </motion.button>
        )}
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{category.name}</span>
              <motion.div
                animate={{ rotate: expandedCategories[category.id] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-gray-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedCategories[category.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    {category.options.map((option) => {
                      const isSelected = selectedFilters[category.id]?.includes(option.id) || false

                      return (
                        <motion.div
                          key={option.id}
                          whileHover={{ x: 4 }}
                          className="flex items-center px-2 py-1.5 rounded-md"
                        >
                          <label className="flex items-center w-full cursor-pointer">
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => onFilterChange(category.id, option.id, e.target.checked)}
                                className="sr-only"
                              />
                              <motion.div
                                initial={false}
                                animate={{
                                  backgroundColor: isSelected ? "#6366f1" : "transparent",
                                  borderColor: isSelected ? "#6366f1" : "#d1d5db",
                                }}
                                className="w-4 h-4 border rounded flex items-center justify-center"
                              >
                                {isSelected && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Check size={12} className="text-white" />
                                  </motion.div>
                                )}
                              </motion.div>
                            </div>
                            <div className="ml-2 flex-1 flex items-center justify-between">
                              <span
                                className={`text-sm ${isSelected ? "text-indigo-700 font-medium" : "text-gray-700"}`}
                              >
                                {option.label}
                              </span>
                              {option.count !== undefined && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {option.count}
                                </span>
                              )}
                            </div>
                          </label>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-gray-50 border-t border-gray-100"
      >
        <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors shadow-sm font-medium">
          Apply Filters
        </button>
      </motion.div>
    </div>
  )
}

export default SidebarAccordionFilter

