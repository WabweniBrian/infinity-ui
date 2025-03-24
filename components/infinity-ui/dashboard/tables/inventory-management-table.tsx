"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  BarChart4,
  ChevronDown,
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";

// Types for our data
interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stockLevel: number;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock" | "backorder";
  location: string;
  lastUpdated: string;
  price: number;
  supplier: string;
  leadTime: number;
  reorderPoint: number;
  onOrder: number;
  expectedDelivery: string | null;
}

const InventoryManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof InventoryItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Sample inventory data
  const inventoryData: InventoryItem[] = [
    {
      id: "1",
      sku: "WF-1001",
      name: "Wireless Headphones",
      category: "Electronics",
      stockLevel: 45,
      stockStatus: "in-stock",
      location: "Warehouse A",
      lastUpdated: "2023-06-15",
      price: 89.99,
      supplier: "TechSupplies Inc.",
      leadTime: 7,
      reorderPoint: 20,
      onOrder: 0,
      expectedDelivery: null,
    },
    {
      id: "2",
      sku: "SM-2002",
      name: "Smartphone X",
      category: "Electronics",
      stockLevel: 12,
      stockStatus: "low-stock",
      location: "Warehouse B",
      lastUpdated: "2023-06-18",
      price: 699.99,
      supplier: "MobileTech Ltd.",
      leadTime: 14,
      reorderPoint: 15,
      onOrder: 30,
      expectedDelivery: "2023-07-05",
    },
    {
      id: "3",
      sku: "LT-3003",
      name: "Laptop Pro",
      category: "Electronics",
      stockLevel: 0,
      stockStatus: "out-of-stock",
      location: "Warehouse A",
      lastUpdated: "2023-06-10",
      price: 1299.99,
      supplier: "ComputerWorld",
      leadTime: 21,
      reorderPoint: 10,
      onOrder: 15,
      expectedDelivery: "2023-07-12",
    },
    {
      id: "4",
      sku: "KB-4004",
      name: "Mechanical Keyboard",
      category: "Accessories",
      stockLevel: 78,
      stockStatus: "in-stock",
      location: "Warehouse C",
      lastUpdated: "2023-06-20",
      price: 129.99,
      supplier: "PeripheralPro",
      leadTime: 5,
      reorderPoint: 25,
      onOrder: 0,
      expectedDelivery: null,
    },
    {
      id: "5",
      sku: "MS-5005",
      name: "Wireless Mouse",
      category: "Accessories",
      stockLevel: 8,
      stockStatus: "low-stock",
      location: "Warehouse A",
      lastUpdated: "2023-06-17",
      price: 49.99,
      supplier: "PeripheralPro",
      leadTime: 5,
      reorderPoint: 15,
      onOrder: 25,
      expectedDelivery: "2023-06-30",
    },
    {
      id: "6",
      sku: "TB-6006",
      name: "External SSD 1TB",
      category: "Storage",
      stockLevel: 32,
      stockStatus: "in-stock",
      location: "Warehouse B",
      lastUpdated: "2023-06-19",
      price: 159.99,
      supplier: "StorageSolutions",
      leadTime: 10,
      reorderPoint: 20,
      onOrder: 0,
      expectedDelivery: null,
    },
    {
      id: "7",
      sku: "MN-7007",
      name: '27" Monitor',
      category: "Displays",
      stockLevel: 0,
      stockStatus: "backorder",
      location: "Warehouse C",
      lastUpdated: "2023-06-05",
      price: 349.99,
      supplier: "DisplayTech",
      leadTime: 30,
      reorderPoint: 10,
      onOrder: 20,
      expectedDelivery: "2023-07-20",
    },
    {
      id: "8",
      sku: "SP-8008",
      name: "Bluetooth Speaker",
      category: "Audio",
      stockLevel: 65,
      stockStatus: "in-stock",
      location: "Warehouse A",
      lastUpdated: "2023-06-21",
      price: 79.99,
      supplier: "AudioWorld",
      leadTime: 7,
      reorderPoint: 20,
      onOrder: 0,
      expectedDelivery: null,
    },
    {
      id: "9",
      sku: "CB-9009",
      name: "USB-C Cable Pack",
      category: "Accessories",
      stockLevel: 120,
      stockStatus: "in-stock",
      location: "Warehouse B",
      lastUpdated: "2023-06-22",
      price: 19.99,
      supplier: "CableConnect",
      leadTime: 3,
      reorderPoint: 50,
      onOrder: 0,
      expectedDelivery: null,
    },
    {
      id: "10",
      sku: "CH-1010",
      name: "Wireless Charger",
      category: "Accessories",
      stockLevel: 5,
      stockStatus: "low-stock",
      location: "Warehouse A",
      lastUpdated: "2023-06-16",
      price: 39.99,
      supplier: "TechSupplies Inc.",
      leadTime: 7,
      reorderPoint: 15,
      onOrder: 30,
      expectedDelivery: "2023-07-01",
    },
  ];

  // Get unique categories
  const categories = Array.from(
    new Set(inventoryData.map((item) => item.category)),
  );

  // Get unique stock statuses
  const stockStatuses = Array.from(
    new Set(inventoryData.map((item) => item.stockStatus)),
  );

  // Filter and sort inventory data
  const getFilteredAndSortedData = () => {
    let filtered = [...inventoryData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter((item) => item.stockStatus === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  };

  const filteredAndSortedData = getFilteredAndSortedData();

  // Handle sort
  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Get stock status color
  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "out-of-stock":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "backorder":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Toggle item expansion
  const toggleItemExpansion = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Inventory Management
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Track and manage your product inventory
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-2 sm:mt-0">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <button
              onClick={() => {
                setSelectedItem({
                  id: "",
                  sku: "",
                  name: "",
                  category: categories[0],
                  stockLevel: 0,
                  stockStatus: "in-stock",
                  location: "",
                  lastUpdated: new Date().toISOString().split("T")[0],
                  price: 0,
                  supplier: "",
                  leadTime: 0,
                  reorderPoint: 0,
                  onOrder: 0,
                  expectedDelivery: null,
                });
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </button>

            <button
              onClick={toggleDarkMode}
              className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Statuses</option>
              {stockStatuses.map((status) => (
                <option key={status} value={status}>
                  {status
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>

            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </button>

            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("name")}
                  >
                    Product
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortField === "name" ? "opacity-100" : "opacity-50"}`}
                    />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("category")}
                  >
                    Category
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortField === "category" ? "opacity-100" : "opacity-50"}`}
                    />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("stockLevel")}
                  >
                    Stock
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortField === "stockLevel" ? "opacity-100" : "opacity-50"}`}
                    />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortField === "price" ? "opacity-100" : "opacity-50"}`}
                    />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("lastUpdated")}
                  >
                    Last Updated
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortField === "lastUpdated" ? "opacity-100" : "opacity-50"}`}
                    />
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {filteredAndSortedData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleItemExpansion(item.id)}
                          className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          {expandedItem === item.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4 -rotate-90 transform" />
                          )}
                        </button>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            SKU: {item.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            item.stockLevel > item.reorderPoint * 1.5
                              ? "bg-green-500"
                              : item.stockLevel > item.reorderPoint
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          } mr-2`}
                        ></div>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {item.stockLevel}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStockStatusColor(
                          item.stockStatus,
                        )}`}
                      >
                        {item.stockStatus
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.lastUpdated)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expandedItem === item.id && (
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <td colSpan={7} className="px-6 py-4">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Inventory Details
                              </h4>
                              <div className="mt-2 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Location:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {item.location}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Reorder Point:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {item.reorderPoint}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    On Order:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {item.onOrder}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Supplier Information
                              </h4>
                              <div className="mt-2 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Supplier:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {item.supplier}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Lead Time:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {item.leadTime} days
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Expected Delivery:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {formatDate(item.expectedDelivery)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Actions
                              </h4>
                              <div className="mt-2 space-y-2">
                                <button className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  Place Order
                                </button>
                                <button className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
                                  <BarChart4 className="mr-2 h-4 w-4" />
                                  View History
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedItem.id ? "Edit Item" : "Add New Item"}
                  </h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={selectedItem.name}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      SKU
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={selectedItem.sku}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          sku: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={selectedItem.category}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          category: e.target.value,
                        })
                      }
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={selectedItem.price}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Stock Level
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={selectedItem.stockLevel}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          stockLevel: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={selectedItem.stockStatus}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          stockStatus: e.target.value as any,
                        })
                      }
                    >
                      {stockStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Here would be the save logic
                      setIsEditModalOpen(false);
                    }}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default InventoryManagementTable;
