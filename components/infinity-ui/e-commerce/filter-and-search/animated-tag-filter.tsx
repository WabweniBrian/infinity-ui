"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Filter } from "lucide-react"

interface FilterTag {
  id: string
  label: string
  category: string
  color?: string
}

interface AnimatedTagFilterProps {
  tags: FilterTag[]
  onFilterChange: (selectedTags: string[]) => void
  initialSelected?: string[]
  showCounts?: boolean
}

const AnimatedTagFilter = ({
  tags,
  onFilterChange,
  initialSelected = [],
  showCounts = true,
}: AnimatedTagFilterProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelected)
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(tags.map((tag) => tag.category)))
    setCategories(uniqueCategories)
    if (uniqueCategories.length > 0 && !activeCategory) {
      setActiveCategory(uniqueCategories[0])
    }
  }, [tags, activeCategory])

  // Notify parent component when selection changes
  useEffect(() => {
    onFilterChange(selectedTags)
  }, [selectedTags, onFilterChange])

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const clearAllTags = () => {
    setSelectedTags([])
  }

  const getTagsForCategory = (category: string) => {
    return tags.filter((tag) => tag.category === category)
  }

  const getSelectedCount = () => {
    return selectedTags.length
  }

  return (
    <div className="w-full">
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <span className="flex items-center gap-2">
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            {getSelectedCount() > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-medium text-white bg-indigo-600 rounded-full">
                {getSelectedCount()}
              </span>
            )}
          </span>
          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>
      </div>

      {/* Filter content */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Category tabs */}
              <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-3 whitespace-nowrap font-medium text-sm transition-colors duration-200 ${
                      activeCategory === category
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {category}
                    {showCounts && (
                      <span className="ml-1 text-xs text-gray-500">({getTagsForCategory(category).length})</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected tags */}
              {selectedTags.length > 0 && (
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Selected Filters</h3>
                    <button
                      onClick={clearAllTags}
                      className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {selectedTags.map((tagId) => {
                        const tag = tags.find((t) => t.id === tagId)
                        if (!tag) return null

                        return (
                          <motion.div
                            key={tag.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              tag.color ? tag.color : "bg-indigo-100 text-indigo-800"
                            }`}
                          >
                            <Check size={14} className="mr-1" />
                            {tag.label}
                            <button
                              onClick={() => toggleTag(tag.id)}
                              className="ml-1 rounded-full p-0.5 hover:bg-black/10 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Tags for active category */}
              {activeCategory && (
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {getTagsForCategory(activeCategory).map((tag) => (
                      <motion.button
                        key={tag.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTag(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedTags.includes(tag.id)
                            ? tag.color || "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {selectedTags.includes(tag.id) && <Check size={14} className="inline-block mr-1" />}
                        {tag.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedTagFilter

