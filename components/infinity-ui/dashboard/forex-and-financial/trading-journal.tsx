"use client";

import React from "react";

import {
  TradeDirection,
  TradeEntry,
  TradeResult,
  trades,
  TradeStatus,
} from "@/data/trading-journal";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Download,
  Edit,
  FileText,
  Filter,
  Plus,
  Save,
  Search,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const TradingJournal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<
    TradeDirection | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<TradeStatus | "all">(
    "all",
  );
  const [selectedResult, setSelectedResult] = useState<TradeResult | "all">(
    "all",
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof TradeEntry>("entryDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedTrades, setExpandedTrades] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<TradeEntry, "id">>({
    symbol: "",
    direction: "long",
    entryPrice: 0,
    stopLoss: 0,
    takeProfit: 0,
    size: 0.1,
    entryDate: new Date(),
    status: "open",
    tags: [],
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  // Get unique symbols from trades
  const symbols = Array.from(
    new Set(trades.map((trade) => trade.symbol)),
  ).sort();

  // Get unique tags from trades
  const tags = Array.from(
    new Set(trades.flatMap((trade) => trade.tags || [])),
  ).sort();

  // Filter trades
  const filteredTrades = trades.filter((trade) => {
    // Search filter
    const matchesSearch =
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trade.notes || "").toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Symbol filter
    if (selectedSymbols.length > 0 && !selectedSymbols.includes(trade.symbol))
      return false;

    // Direction filter
    if (selectedDirection !== "all" && trade.direction !== selectedDirection)
      return false;

    // Status filter
    if (selectedStatus !== "all" && trade.status !== selectedStatus)
      return false;

    // Result filter
    if (selectedResult !== "all" && trade.result !== selectedResult)
      return false;

    // Tags filter
    if (
      selectedTags.length > 0 &&
      !selectedTags.some((tag) => trade.tags?.includes(tag))
    )
      return false;

    return true;
  });

  // Sort trades
  const sortedTrades = [...filteredTrades].sort((a, b) => {
    let comparison = 0;

    if (sortField === "entryDate" || sortField === "exitDate") {
      const aDate = a[sortField] ? new Date(a[sortField] as Date).getTime() : 0;
      const bDate = b[sortField] ? new Date(b[sortField] as Date).getTime() : 0;
      comparison = aDate - bDate;
    } else if (
      sortField === "pnl" ||
      sortField === "pnlPercent" ||
      sortField === "entryPrice" ||
      sortField === "exitPrice" ||
      sortField === "size"
    ) {
      const aValue = a[sortField] || 0;
      const bValue = b[sortField] || 0;
      comparison = Number(aValue) - Number(bValue);
    } else {
      const aValue = String(a[sortField] || "");
      const bValue = String(b[sortField] || "");
      comparison = aValue.localeCompare(bValue);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Toggle trade expansion
  const toggleTradeExpansion = (tradeId: string) => {
    setExpandedTrades((prev) =>
      prev.includes(tradeId)
        ? prev.filter((id) => id !== tradeId)
        : [...prev, tradeId],
    );
  };

  // Toggle symbol selection
  const toggleSymbol = (symbol: string) => {
    setSelectedSymbols((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol],
    );
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Handle sort
  const handleSort = (field: keyof TradeEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (
      name === "entryPrice" ||
      name === "exitPrice" ||
      name === "stopLoss" ||
      name === "takeProfit" ||
      name === "size"
    ) {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle date change
  const handleDateChange = (name: "entryDate" | "exitDate", value: string) => {
    setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
  };

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();

      if (!formData.tags?.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTag],
        }));
      }

      e.currentTarget.value = "";
    }
  };

  // Remove tag from form
  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      symbol: "",
      direction: "long",
      entryPrice: 0,
      stopLoss: 0,
      takeProfit: 0,
      size: 0.1,
      entryDate: new Date(),
      status: "open",
      tags: [],
    });
    setFormStatus("idle");
    setStatusMessage("");
  };

  // Initialize edit form
  const initEditForm = (trade: TradeEntry) => {
    setFormData({
      symbol: trade.symbol,
      direction: trade.direction,
      entryPrice: trade.entryPrice,
      exitPrice: trade.exitPrice,
      stopLoss: trade.stopLoss,
      takeProfit: trade.takeProfit,
      size: trade.size,
      entryDate: trade.entryDate,
      exitDate: trade.exitDate,
      status: trade.status,
      result: trade.result,
      pnl: trade.pnl,
      pnlPercent: trade.pnlPercent,
      notes: trade.notes,
      tags: trade.tags || [],
      screenshots: trade.screenshots,
    });
    setEditingTradeId(trade.id);
    setShowAddForm(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      let success = false;

      if (editingTradeId) {
        // Update existing trade
        const updatedTrades = trades.map((trade) => {
          if (trade.id === editingTradeId) {
            return {
              ...trade,
              ...formData,
            };
          }
          return trade;
        });
        // Save updatedTrades to your data store
        success = true;
      } else {
        // Add new trade
        const newTrade: TradeEntry = {
          id: `trade-${trades.length + 1}`.padStart(3, "0"),
          ...formData,
        };
        trades.push(newTrade);
        // Save the updated trades array
        success = true;
      }

      if (success) {
        setFormStatus("success");
        setStatusMessage(
          editingTradeId
            ? "Trade updated successfully!"
            : "Trade added successfully!",
        );

        // Reset form after 2 seconds
        setTimeout(() => {
          resetForm();
          setShowAddForm(false);
          setEditingTradeId(null);
        }, 2000);
      } else {
        setFormStatus("error");
        setStatusMessage(
          "There was an error processing your request. Please try again.",
        );
      }
    } catch (error) {
      setFormStatus("error");
      setStatusMessage(
        "There was an error processing your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete trade
  const handleDeleteTrade = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this trade? This action cannot be undone.",
      )
    ) {
      try {
        const tradeIndex = trades.findIndex((trade) => trade.id === id);
        if (tradeIndex !== -1) {
          trades.splice(tradeIndex, 1);
          // Save the updated trades array
          // Trade deleted successfully
        }
      } catch (error) {
        console.error("Error deleting trade:", error);
      }
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const closedTrades = filteredTrades.filter(
      (trade) => trade.status === "closed",
    );

    if (closedTrades.length === 0) {
      return {
        totalTrades: 0,
        winRate: 0,
        totalPnl: 0,
        averagePnl: 0,
        profitFactor: 0,
        winningTrades: 0,
        losingTrades: 0,
        breakeven: 0,
      };
    }

    const winningTrades = closedTrades.filter(
      (trade) => trade.result === "win",
    );
    const losingTrades = closedTrades.filter(
      (trade) => trade.result === "loss",
    );
    const breakeven = closedTrades.filter(
      (trade) => trade.result === "breakeven",
    );

    const totalPnl = closedTrades.reduce(
      (sum, trade) => sum + (trade.pnl || 0),
      0,
    );
    const totalProfit = winningTrades.reduce(
      (sum, trade) => sum + (trade.pnl || 0),
      0,
    );
    const totalLoss = Math.abs(
      losingTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0),
    );

    return {
      totalTrades: closedTrades.length,
      winRate: (winningTrades.length / closedTrades.length) * 100,
      totalPnl,
      averagePnl: totalPnl / closedTrades.length,
      profitFactor: totalLoss === 0 ? totalProfit : totalProfit / totalLoss,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      breakeven: breakeven.length,
    };
  };

  const stats = calculateStats();

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">Trading Journal</h2>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetForm();
              setEditingTradeId(null);
              setShowAddForm(!showAddForm);
            }}
          >
            {showAddForm ? <X size={16} /> : <Plus size={16} />}
            <span className="text-sm">
              {showAddForm ? "Cancel" : "Add Trade"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Add/Edit Trade Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-slate-800"
          >
            <form onSubmit={handleSubmit} className="p-4">
              <h3 className="mb-4 text-lg font-medium text-white">
                {editingTradeId ? "Edit Trade" : "Add New Trade"}
              </h3>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Symbol */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Symbol
                  </label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    required
                  />
                </div>

                {/* Direction */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Direction
                  </label>
                  <select
                    name="direction"
                    value={formData.direction}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  >
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                  </select>
                </div>

                {/* Entry Price */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    name="entryPrice"
                    value={formData.entryPrice}
                    onChange={handleInputChange}
                    step="0.00001"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    required
                  />
                </div>

                {/* Exit Price */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Exit Price (if closed)
                  </label>
                  <input
                    type="number"
                    name="exitPrice"
                    value={formData.exitPrice || ""}
                    onChange={handleInputChange}
                    step="0.00001"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>

                {/* Stop Loss */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Stop Loss
                  </label>
                  <input
                    type="number"
                    name="stopLoss"
                    value={formData.stopLoss}
                    onChange={handleInputChange}
                    step="0.00001"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    required
                  />
                </div>

                {/* Take Profit */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Take Profit
                  </label>
                  <input
                    type="number"
                    name="takeProfit"
                    value={formData.takeProfit}
                    onChange={handleInputChange}
                    step="0.00001"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    required
                  />
                </div>

                {/* Position Size */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Position Size (Lots)
                  </label>
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0.01"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    required
                  />
                </div>

                {/* Entry Date */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Entry Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.entryDate.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      handleDateChange("entryDate", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    required
                  />
                </div>

                {/* Exit Date */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Exit Date (if closed)
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      formData.exitDate
                        ? formData.exitDate.toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      handleDateChange("exitDate", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-white">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Result (if closed) */}
                {formData.status === "closed" && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      Result
                    </label>
                    <select
                      name="result"
                      value={formData.result || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      required={formData.status === "closed"}
                    >
                      <option value="">Select result</option>
                      <option value="win">Win</option>
                      <option value="loss">Loss</option>
                      <option value="breakeven">Breakeven</option>
                    </select>
                  </div>
                )}

                {/* P&L (if closed) */}
                {formData.status === "closed" && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      P&L
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="pnl"
                        value={formData.pnl || ""}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <DollarSign size={14} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* P&L % (if closed) */}
                {formData.status === "closed" && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      P&L %
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="pnlPercent"
                        value={formData.pnlPercent || ""}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <span className="text-xs text-slate-400">%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-white">
                  Tags
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 rounded-lg border border-blue-500/30 bg-blue-600/20 px-2 py-1 text-blue-400"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add tag and press Enter"
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    onKeyDown={handleTagInput}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-white">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  placeholder="What did you learn from this trade? What was your strategy? What could you improve?"
                />
              </div>

              {/* Screenshots */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-white">
                  Screenshots
                </label>
                <div className="rounded-lg border border-dashed border-slate-700 p-4 text-center">
                  <Camera className="mx-auto mb-2 text-slate-400" size={24} />
                  <p className="mb-2 text-sm text-slate-400">
                    Drag and drop screenshots here or click to upload
                  </p>
                  <button
                    type="button"
                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                  >
                    <Upload size={14} className="mr-1 inline-block" />
                    <span>Upload Images</span>
                  </button>
                </div>
              </div>

              {/* Form Status */}
              <AnimatePresence>
                {formStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mb-4 flex items-center gap-2 rounded-xl p-3 ${
                      formStatus === "success"
                        ? "border border-green-500/30 bg-green-900/20"
                        : "border border-red-500/30 bg-red-900/20"
                    }`}
                  >
                    {formStatus === "success" ? (
                      <CheckCircle className="text-green-400" size={18} />
                    ) : (
                      <AlertCircle className="text-red-400" size={18} />
                    )}
                    <span
                      className={
                        formStatus === "success"
                          ? "text-green-300"
                          : "text-red-300"
                      }
                    >
                      {statusMessage}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                  onClick={() => {
                    resetForm();
                    setShowAddForm(false);
                    setEditingTradeId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save size={14} className="mr-1 inline-block" />
                      <span>
                        {editingTradeId ? "Update Trade" : "Save Trade"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics */}
      <div className="border-b border-slate-800 p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Win Rate</div>
            <div className="text-xl font-bold text-white">
              {stats.winRate.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {stats.winningTrades} W / {stats.losingTrades} L /{" "}
              {stats.breakeven} BE
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Total P&L</div>
            <div
              className={`text-xl font-bold ${stats.totalPnl >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {formatCurrency(stats.totalPnl)}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {stats.totalTrades} trades
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Avg. P&L</div>
            <div
              className={`text-xl font-bold ${stats.averagePnl >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {formatCurrency(stats.averagePnl)}
            </div>
            <div className="mt-1 text-xs text-slate-400">per trade</div>
          </div>

          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Profit Factor</div>
            <div className="text-xl font-bold text-white">
              {stats.profitFactor.toFixed(2)}
            </div>
            <div className="mt-1 text-xs text-slate-400">wins / losses</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search trades..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">
            <motion.button
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-slate-400 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span className="text-sm">Filters</span>
              {showFilters ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </motion.button>

            <motion.button
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-slate-400 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span className="text-sm">Export</span>
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Symbols Filter */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-white">
                    Symbols
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {symbols.map((symbol) => (
                      <button
                        key={symbol}
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedSymbols.length === 0 ||
                          selectedSymbols.includes(symbol)
                            ? "border border-blue-500/30 bg-blue-600/20 text-blue-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() => toggleSymbol(symbol)}
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direction, Status, Result Filters */}
                <div className="space-y-3">
                  {/* Direction */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-white">
                      Direction
                    </h3>
                    <div className="flex gap-2">
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedDirection === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                        onClick={() => setSelectedDirection("all")}
                      >
                        All
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedDirection === "long"
                            ? "border border-green-500/30 bg-green-600/20 text-green-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedDirection(
                            selectedDirection === "long" ? "all" : "long",
                          )
                        }
                      >
                        Long
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedDirection === "short"
                            ? "border border-red-500/30 bg-red-600/20 text-red-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedDirection(
                            selectedDirection === "short" ? "all" : "short",
                          )
                        }
                      >
                        Short
                      </button>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-white">
                      Status
                    </h3>
                    <div className="flex gap-2">
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedStatus === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                        onClick={() => setSelectedStatus("all")}
                      >
                        All
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedStatus === "open"
                            ? "border border-blue-500/30 bg-blue-600/20 text-blue-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedStatus(
                            selectedStatus === "open" ? "all" : "open",
                          )
                        }
                      >
                        Open
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedStatus === "closed"
                            ? "border border-green-500/30 bg-green-600/20 text-green-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedStatus(
                            selectedStatus === "closed" ? "all" : "closed",
                          )
                        }
                      >
                        Closed
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedStatus === "cancelled"
                            ? "border border-orange-500/30 bg-orange-600/20 text-orange-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedStatus(
                            selectedStatus === "cancelled"
                              ? "all"
                              : "cancelled",
                          )
                        }
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>

                  {/* Result */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-white">
                      Result
                    </h3>
                    <div className="flex gap-2">
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedResult === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                        onClick={() => setSelectedResult("all")}
                      >
                        All
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedResult === "win"
                            ? "border border-green-500/30 bg-green-600/20 text-green-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedResult(
                            selectedResult === "win" ? "all" : "win",
                          )
                        }
                      >
                        Win
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedResult === "loss"
                            ? "border border-red-500/30 bg-red-600/20 text-red-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedResult(
                            selectedResult === "loss" ? "all" : "loss",
                          )
                        }
                      >
                        Loss
                      </button>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          selectedResult === "breakeven"
                            ? "border border-yellow-500/30 bg-yellow-600/20 text-yellow-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() =>
                          setSelectedResult(
                            selectedResult === "breakeven"
                              ? "all"
                              : "breakeven",
                          )
                        }
                      >
                        Breakeven
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags Filter */}
                {tags.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-white">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm ${
                            selectedTags.length === 0 ||
                            selectedTags.includes(tag)
                              ? "border border-blue-500/30 bg-blue-600/20 text-blue-400"
                              : "border border-slate-700 bg-slate-800 text-slate-400"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          <Tag size={14} />
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trades Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 text-left">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                  onClick={() => handleSort("symbol")}
                >
                  Symbol
                  {sortField === "symbol" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>
              </th>

              <th className="p-4 text-left">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                  onClick={() => handleSort("direction")}
                >
                  Direction
                  {sortField === "direction" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>
              </th>

              <th className="p-4 text-right">
                <button
                  className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                  onClick={() => handleSort("entryDate")}
                >
                  Date
                  {sortField === "entryDate" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>
              </th>

              <th className="p-4 text-right">
                <button
                  className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>
              </th>

              <th className="p-4 text-right">
                <button
                  className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                  onClick={() => handleSort("pnl")}
                >
                  P&L
                  {sortField === "pnl" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>
              </th>

              <th className="p-4 text-right">
                <span className="text-sm font-medium text-slate-400">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedTrades.length > 0 ? (
              sortedTrades.map((trade) => (
                <React.Fragment key={trade.id}>
                  <motion.tr
                    className="cursor-pointer border-b border-slate-800/50 hover:bg-slate-800/30"
                    whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                    onClick={() => toggleTradeExpansion(trade.id)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">
                        {trade.symbol}
                      </div>
                    </td>

                    <td className="p-4">
                      <div
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          trade.direction === "long"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trade.direction === "long" ? (
                          <ArrowUpRight size={12} className="mr-1" />
                        ) : (
                          <ArrowDownRight size={12} className="mr-1" />
                        )}
                        <span>
                          {trade.direction === "long" ? "Long" : "Short"}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="text-white">
                        {formatDate(trade.entryDate)}
                      </div>
                      <div className="text-xs text-slate-400">
                        {formatTime(trade.entryDate)}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          trade.status === "open"
                            ? "bg-blue-500/20 text-blue-400"
                            : trade.status === "closed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {trade.status.charAt(0).toUpperCase() +
                          trade.status.slice(1)}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      {trade.status === "closed" && trade.pnl !== undefined ? (
                        <div
                          className={`font-medium ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {formatCurrency(trade.pnl)}
                          {trade.pnlPercent !== undefined && (
                            <span className="ml-1 text-xs">
                              ({trade.pnlPercent >= 0 ? "+" : ""}
                              {trade.pnlPercent.toFixed(2)}%)
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-slate-400">-</div>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            initEditForm(trade);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTrade(trade.id);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>

                  {/* Expanded Trade Details */}
                  <AnimatePresence>
                    {expandedTrades.includes(trade.id) && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td
                          colSpan={6}
                          className="border-b border-slate-800/50 p-0"
                        >
                          <div className="bg-slate-800/30 p-4">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                              {/* Trade Details */}
                              <div>
                                <h4 className="mb-3 text-sm font-medium text-white">
                                  Trade Details
                                </h4>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="rounded-lg bg-slate-800 p-3">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Entry Price
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {trade.entryPrice}
                                    </div>
                                  </div>

                                  <div className="rounded-lg bg-slate-800 p-3">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Exit Price
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {trade.exitPrice || "-"}
                                    </div>
                                  </div>

                                  <div className="rounded-lg bg-slate-800 p-3">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Stop Loss
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {trade.stopLoss}
                                    </div>
                                  </div>

                                  <div className="rounded-lg bg-slate-800 p-3">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Take Profit
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {trade.takeProfit}
                                    </div>
                                  </div>

                                  <div className="rounded-lg bg-slate-800 p-3">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Position Size
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {trade.size} lots
                                    </div>
                                  </div>

                                  {trade.status === "closed" &&
                                    trade.result && (
                                      <div className="rounded-lg bg-slate-800 p-3">
                                        <div className="mb-1 text-xs text-slate-400">
                                          Result
                                        </div>
                                        <div
                                          className={`text-sm font-medium ${
                                            trade.result === "win"
                                              ? "text-green-400"
                                              : trade.result === "loss"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                          }`}
                                        >
                                          {trade.result
                                            .charAt(0)
                                            .toUpperCase() +
                                            trade.result.slice(1)}
                                        </div>
                                      </div>
                                    )}
                                </div>

                                {/* Tags */}
                                {trade.tags && trade.tags.length > 0 && (
                                  <div className="mt-3">
                                    <div className="mb-2 text-xs text-slate-400">
                                      Tags
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {trade.tags.map((tag) => (
                                        <div
                                          key={tag}
                                          className="rounded-lg border border-blue-500/30 bg-blue-600/20 px-2 py-1 text-xs text-blue-400"
                                        >
                                          {tag}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Notes and Screenshots */}
                              <div>
                                {trade.notes && (
                                  <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-medium text-white">
                                      Notes
                                    </h4>
                                    <div className="rounded-lg bg-slate-800 p-3 text-sm text-slate-300">
                                      {trade.notes}
                                    </div>
                                  </div>
                                )}

                                {trade.screenshots &&
                                  trade.screenshots.length > 0 && (
                                    <div>
                                      <h4 className="mb-2 text-sm font-medium text-white">
                                        Screenshots
                                      </h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        {trade.screenshots.map(
                                          (screenshot, index) => (
                                            <div
                                              key={index}
                                              className="relative aspect-video overflow-hidden rounded-lg"
                                            >
                                              <Image
                                                src={
                                                  screenshot ||
                                                  "/placeholder.svg"
                                                }
                                                alt={`Trade screenshot ${index + 1}`}
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  <FileText className="mx-auto mb-4 text-slate-500" size={48} />
                  <h3 className="mb-2 text-lg font-medium text-white">
                    No trades found
                  </h3>
                  <p className="mb-4 text-slate-400">
                    Try adjusting your filters or add your first trade
                  </p>
                  <button
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    onClick={() => {
                      resetForm();
                      setEditingTradeId(null);
                      setShowAddForm(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Trade</span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingJournal;
