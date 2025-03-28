"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, Sliders, Search, Star } from "lucide-react"

type PriceRange = {
  min: number
  max: number
}

type FilterState = {
  categories: string[]
  brands: string[]
  priceRange: PriceRange | null
  rating: number | null
  inStock: boolean
  onSale: boolean
}

type FloatingFilterPanelProps = {
  categories: { id: string; name: string }[]
  brands: { id: string; name: string }[]
  onFilterChange: (filters: FilterState) => void
  initialFilters?: Partial<FilterState>
}

const FloatingFilterPanel = ({ categories, brands, onFilterChange, initialFilters = {} }: FloatingFilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters.categories || [],
    brands: initialFilters.brands || [],
    priceRange: initialFilters.priceRange || null,
    rating: initialFilters.rating || null,
    inStock: initialFilters.inStock || false,
    onSale: initialFilters.onSale || false,
  })
  const [priceInputs, setPriceInputs] = useState({
    min: filters.priceRange?.min?.toString() || "",
    max: filters.priceRange?.max?.toString() || "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState({
    categories: categories,
    brands: brands,
  })
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setSearchResults({
        categories: categories.filter((cat) => cat.name.toLowerCase().includes(query)),
        brands: brands.filter((brand) => brand.name.toLowerCase().includes(query)),
      })
    } else {
      setSearchResults({ categories, brands })
    }
  }, [searchQuery, categories, brands])

  const toggleCategory = (categoryId: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId]

      return { ...prev, categories: newCategories }
    })
  }

  const toggleBrand = (brandId: string) => {
    setFilters((prev) => {
      const newBrands = prev.brands.includes(brandId)
        ? prev.brands.filter((id) => id !== brandId)
        : [...prev.brands, brandId]

      return { ...prev, brands: newBrands }
    })
  }

  const handlePriceChange = () => {
    const min = Number.parseInt(priceInputs.min)
    const max = Number.parseInt(priceInputs.max)

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setFilters((prev) => ({
        ...prev,
        priceRange: { min, max },
      }))
    } else if (priceInputs.min === "" && priceInputs.max === "") {
      setFilters((prev) => ({
        ...prev,
        priceRange: null,
      }))
    }
  }

  const setRating = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }))
  }

  const toggleInStock = () => {
    setFilters((prev) => ({
      ...prev,
      inStock: !prev.inStock,
    }))
  }

  const toggleOnSale = () => {
    setFilters((prev) => ({
      ...prev,
      onSale: !prev.onSale,
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: null,
      rating: null,
      inStock: false,
      onSale: false,
    })
    setPriceInputs({ min: "", max: "" })
  }

  const applyFilters = () => {
    onFilterChange(filters)
    setIsOpen(false)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.categories.length) count++
    if (filters.brands.length) count++
    if (filters.priceRange) count++
    if (filters.rating) count++
    if (filters.inStock) count++
    if (filters.onSale) count++
    return count
  }

  return (
    <div className="relative" ref={panelRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors"
      >
        <Sliders size={16} />
        <span>Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="bg-white text-indigo-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Filter size={16} />
                Advanced Filters
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Search</h4>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search categories or brands..."
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Categories</h4>
                    <span className="text-xs text-gray-500">{filters.categories.length} selected</span>
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {searchResults.categories.map((category) => (
                      <motion.div key={category.id} whileHover={{ x: 2 }} className="flex items-center">
                        <label className="flex items-center w-full cursor-pointer py-1">
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span
                            className={`ml-2 text-sm ${
                              filters.categories.includes(category.id) ? "font-medium text-indigo-700" : "text-gray-700"
                            }`}
                          >
                            {category.name}
                          </span>
                        </label>
                      </motion.div>
                    ))}
                    {searchResults.categories.length === 0 && (
                      <p className="text-sm text-gray-500 py-1">No categories found</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Brands</h4>
                    <span className="text-xs text-gray-500">{filters.brands.length} selected</span>
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {searchResults.brands.map((brand) => (
                      <motion.div key={brand.id} whileHover={{ x: 2 }} className="flex items-center">
                        <label className="flex items-center w-full cursor-pointer py-1">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span
                            className={`ml-2 text-sm ${
                              filters.brands.includes(brand.id) ? "font-medium text-indigo-700" : "text-gray-700"
                            }`}
                          >
                            {brand.name}
                          </span>
                        </label>
                      </motion.div>
                    ))}
                    {searchResults.brands.length === 0 && <p className="text-sm text-gray-500 py-1">No brands found</p>}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={priceInputs.min}
                        onChange={(e) => setPriceInputs((prev) => ({ ...prev, min: e.target.value }))}
                        placeholder="Min"
                        className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={priceInputs.max}
                        onChange={(e) => setPriceInputs((prev) => ({ ...prev, max: e.target.value }))}
                        placeholder="Max"
                        className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handlePriceChange}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Go
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setRating(rating)}
                        className={`flex items-center w-full py-1.5 px-2 rounded-md transition-colors ${
                          filters.rating === rating ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm">
                          {rating} {rating === 1 ? "star" : "stars"} & up
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={toggleInStock}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.onSale}
                      onChange={toggleOnSale}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button onClick={clearAllFilters} className="text-sm text-gray-600 hover:text-gray-800">
                Clear all
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingFilterPanel

