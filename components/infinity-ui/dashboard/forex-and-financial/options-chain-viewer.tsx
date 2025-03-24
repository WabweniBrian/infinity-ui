"use client";

import type React from "react";

import {
  expirationDates,
  formatCurrency,
  formatLargeNumber,
  formatNumber,
  formatPercent,
  generateOptionsChain,
  getChangeColor,
  OptionContract,
} from "@/data/options-chain";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  Clock,
  Eye,
  Info,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const OptionsChainViewer = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockPrice, setStockPrice] = useState(195.71);
  const [selectedExpiration, setSelectedExpiration] = useState(
    expirationDates[0]?.date || "",
  );
  const [optionsChain, setOptionsChain] = useState<OptionContract[]>(
    generateOptionsChain(stockPrice),
  );
  const [view, setView] = useState<"basic" | "greeks">("basic");
  const [showCalls, setShowCalls] = useState(true);
  const [showPuts, setShowPuts] = useState(true);
  const [showITM, setShowITM] = useState(true);
  const [showOTM, setShowOTM] = useState(true);
  const [searchSymbol, setSearchSymbol] = useState(symbol);
  const [isLoading, setIsLoading] = useState(false);

  // Filter options chain based on settings
  const filteredOptionsChain = optionsChain.filter((contract) => {
    if (!showITM && (contract.call.inTheMoney || contract.put.inTheMoney)) {
      return false;
    }
    if (!showOTM && (!contract.call.inTheMoney || !contract.put.inTheMoney)) {
      return false;
    }
    return true;
  });

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setOptionsChain(generateOptionsChain(stockPrice));
      setIsLoading(false);
      console.log("Options chain refreshed");
    }, 1000);
  };

  // Handle expiration change
  const handleExpirationChange = (date: string) => {
    setSelectedExpiration(date);
    console.log("Selected expiration changed to:", date);

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setOptionsChain(generateOptionsChain(stockPrice));
      setIsLoading(false);
    }, 500);
  };

  // Handle symbol change
  const handleSymbolChange = () => {
    if (searchSymbol.trim() === "") return;

    console.log("Symbol changed to:", searchSymbol);

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setOptionsChain(generateOptionsChain(stockPrice));
      setIsLoading(false);
    }, 500);
  };

  // Handle symbol search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSymbolChange();
  };

  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center text-2xl font-bold text-white">
              <BarChart2 className="mr-2" />
              Options Chain Viewer
            </h2>
            <p className="mt-1 text-indigo-200">
              Analyze options contracts and strategies
            </p>
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
                className="w-32 rounded-lg border border-indigo-700 bg-indigo-800/50 px-4 py-2 pr-10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Symbol"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-indigo-300 hover:text-white"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <motion.button
              className="flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </motion.button>
          </div>
        </div>

        {/* Stock Info */}
        <div className="mt-6 rounded-lg bg-indigo-800/30 p-4 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">{symbol}</h3>
              <p className="text-sm text-indigo-200">
                Last Price: {formatCurrency(stockPrice)}
              </p>
            </div>

            <div className="mt-2 sm:mt-0">
              <div className="text-sm text-indigo-200">
                Selected Expiration:
                <select
                  value={selectedExpiration}
                  onChange={(e) => handleExpirationChange(e.target.value)}
                  className="ml-2 rounded-lg border border-indigo-600 bg-indigo-700 px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {expirationDates.map((date) => (
                    <option key={date.date} value={date.date}>
                      {date.label} ({date.daysToExpiration} days)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-800 p-4">
        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "basic"
              ? "bg-indigo-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("basic")}
        >
          <Activity className="mr-2 h-4 w-4" />
          Basic View
        </motion.button>

        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "greeks"
              ? "bg-indigo-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("greeks")}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Greeks View
        </motion.button>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center">
            <button
              className={`flex items-center rounded-l-lg px-3 py-1 ${
                showCalls
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-slate-200"
              }`}
              onClick={() => setShowCalls(!showCalls)}
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              Calls
            </button>
            <button
              className={`flex items-center rounded-r-lg px-3 py-1 ${
                showPuts
                  ? "bg-red-600 text-white"
                  : "bg-slate-700 text-slate-200"
              }`}
              onClick={() => setShowPuts(!showPuts)}
            >
              <TrendingDown className="mr-1 h-3 w-3" />
              Puts
            </button>
          </div>

          <div className="flex items-center">
            <button
              className={`flex items-center rounded-l-lg px-3 py-1 ${
                showITM
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-200"
              }`}
              onClick={() => setShowITM(!showITM)}
            >
              <Eye className="mr-1 h-3 w-3" />
              ITM
            </button>
            <button
              className={`flex items-center rounded-r-lg px-3 py-1 ${
                showOTM
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-200"
              }`}
              onClick={() => setShowOTM(!showOTM)}
            >
              <Eye className="mr-1 h-3 w-3" />
              OTM
            </button>
          </div>
        </div>
      </div>

      {/* Options Chain Table */}
      <div className="overflow-x-auto bg-slate-900 p-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="flex flex-col items-center">
                <RefreshCw className="mb-4 h-10 w-10 animate-spin text-indigo-500" />
                <p className="text-slate-400">Loading options data...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <table className="min-w-full divide-y divide-slate-700">
                <thead>
                  <tr className="text-xs uppercase text-slate-400">
                    {showCalls && (
                      <>
                        {view === "basic" && (
                          <>
                            <th className="px-3 py-3 text-center">Volume</th>
                            <th className="px-3 py-3 text-center">Open Int</th>
                            <th className="px-3 py-3 text-center">Bid</th>
                            <th className="px-3 py-3 text-center">Ask</th>
                            <th className="px-3 py-3 text-center">Last</th>
                            <th className="px-3 py-3 text-center">Change</th>
                          </>
                        )}
                        {view === "greeks" && (
                          <>
                            <th className="px-3 py-3 text-center">IV</th>
                            <th className="px-3 py-3 text-center">Delta</th>
                            <th className="px-3 py-3 text-center">Gamma</th>
                            <th className="px-3 py-3 text-center">Theta</th>
                            <th className="px-3 py-3 text-center">Vega</th>
                          </>
                        )}
                      </>
                    )}

                    <th className="bg-slate-800 px-3 py-3 text-center">
                      Strike
                    </th>

                    {showPuts && (
                      <>
                        {view === "basic" && (
                          <>
                            <th className="px-3 py-3 text-center">Last</th>
                            <th className="px-3 py-3 text-center">Change</th>
                            <th className="px-3 py-3 text-center">Bid</th>
                            <th className="px-3 py-3 text-center">Ask</th>
                            <th className="px-3 py-3 text-center">Open Int</th>
                            <th className="px-3 py-3 text-center">Volume</th>
                          </>
                        )}
                        {view === "greeks" && (
                          <>
                            <th className="px-3 py-3 text-center">IV</th>
                            <th className="px-3 py-3 text-center">Delta</th>
                            <th className="px-3 py-3 text-center">Gamma</th>
                            <th className="px-3 py-3 text-center">Theta</th>
                            <th className="px-3 py-3 text-center">Vega</th>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredOptionsChain.map((contract) => (
                    <motion.tr
                      key={contract.strike}
                      className={`text-sm ${
                        contract.strike === Math.round(stockPrice)
                          ? "bg-slate-800/50"
                          : ""
                      } hover:bg-slate-800/30`}
                      whileHover={{
                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                      }}
                    >
                      {showCalls && (
                        <>
                          {view === "basic" && (
                            <>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatLargeNumber(contract.call.volume)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatLargeNumber(contract.call.openInterest)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatCurrency(contract.call.bid)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatCurrency(contract.call.ask)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatCurrency(contract.call.last)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${getChangeColor(contract.call.change)}`}
                              >
                                {formatPercent(contract.call.changePercent)}
                              </td>
                            </>
                          )}
                          {view === "greeks" && (
                            <>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatNumber(
                                  contract.call.impliedVolatility * 100,
                                )}
                                %
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.call.delta)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.call.gamma, 3)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.call.theta, 3)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.call.inTheMoney ? "text-green-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.call.vega, 3)}
                              </td>
                            </>
                          )}
                        </>
                      )}

                      <td className="bg-slate-800 px-3 py-2 text-center font-bold text-white">
                        {formatCurrency(contract.strike).replace("$", "")}
                      </td>

                      {showPuts && (
                        <>
                          {view === "basic" && (
                            <>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatCurrency(contract.put.last)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${getChangeColor(contract.put.change)}`}
                              >
                                {formatPercent(contract.put.changePercent)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatCurrency(contract.put.bid)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatCurrency(contract.put.ask)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatLargeNumber(contract.put.openInterest)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatLargeNumber(contract.put.volume)}
                              </td>
                            </>
                          )}
                          {view === "greeks" && (
                            <>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatNumber(
                                  contract.put.impliedVolatility * 100,
                                )}
                                %
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.put.delta)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.put.gamma, 3)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.put.theta, 3)}
                              </td>
                              <td
                                className={`px-3 py-2 text-center ${contract.put.inTheMoney ? "text-red-400" : "text-slate-300"}`}
                              >
                                {formatNumber(contract.put.vega, 3)}
                              </td>
                            </>
                          )}
                        </>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between bg-slate-800 p-4 text-xs text-slate-400">
        <div className="flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
        <div className="flex items-center">
          <Info className="mr-1 h-3 w-3" />
          Data is delayed by 15 minutes
        </div>
      </div>
    </div>
  );
};

export default OptionsChainViewer;
