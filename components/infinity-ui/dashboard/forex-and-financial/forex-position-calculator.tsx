"use client";

import { currencyPairs } from "@/data/forex-position-calc";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Calculator,
  ChevronDown,
  ChevronUp,
  DollarSign,
  HelpCircle,
  Info,
  Percent,
  RefreshCw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const ForexPositionCalculator = () => {
  const defaultAccountCurrency = "USD";
  const defaultLeverage = 30;
  const defaultBalance = 10000;
  // Form state

  const [showPositionCalculator, setShowPositionCalculator] = useState(true);
  const [accountCurrency, setAccountCurrency] = useState(
    defaultAccountCurrency,
  );
  const [accountBalance, setAccountBalance] = useState(defaultBalance);
  const [selectedPair, setSelectedPair] = useState("EUR/USD");
  const [leverage, setLeverage] = useState(defaultLeverage);
  const [riskPercent, setRiskPercent] = useState(2);
  const [riskAmount, setRiskAmount] = useState(
    accountBalance * (riskPercent / 100),
  );
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopLossPrice, setStopLossPrice] = useState(0);
  const [stopLossPips, setStopLossPips] = useState(50);
  const [takeProfitPrice, setTakeProfitPrice] = useState(0);
  const [takeProfitPips, setTakeProfitPips] = useState(100);
  const [positionSize, setPositionSize] = useState(0);
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // UI state
  const [isCalculating, setIsCalculating] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Get current pair data
  const currentPair =
    currencyPairs.find((pair) => pair.symbol === selectedPair) ||
    currencyPairs[0];

  // Update risk amount when percent changes
  const updateRiskFromPercent = (percent: number) => {
    setRiskPercent(percent);
    setRiskAmount(accountBalance * (percent / 100));
  };

  // Update risk percent when amount changes
  const updateRiskFromAmount = (amount: number) => {
    setRiskAmount(amount);
    setRiskPercent((amount / accountBalance) * 100);
  };

  // Update stop loss price from pips
  const updateStopLossFromPips = useCallback(
    (pips: number) => {
      setStopLossPips(pips);

      const pipValue = Math.pow(10, -currentPair.pipDecimal);
      const priceDifference = pips * pipValue;

      const newStopLossPrice =
        direction === "buy"
          ? entryPrice - priceDifference
          : entryPrice + priceDifference;

      setStopLossPrice(
        Number.parseFloat(newStopLossPrice.toFixed(currentPair.pipDecimal + 1)),
      );
    },
    [currentPair.pipDecimal, direction, entryPrice],
  );

  // Update stop loss pips from price
  const updateStopLossFromPrice = (price: number) => {
    setStopLossPrice(price);

    const pipValue = Math.pow(10, -currentPair.pipDecimal);
    const priceDifference =
      direction === "buy" ? entryPrice - price : price - entryPrice;

    const newPips = priceDifference / pipValue;
    setStopLossPips(Number.parseFloat(newPips.toFixed(1)));
  };

  // Update take profit price from pips
  const updateTakeProfitFromPips = useCallback(
    (pips: number) => {
      setTakeProfitPips(pips);

      const pipValue = Math.pow(10, -currentPair.pipDecimal);
      const priceDifference = pips * pipValue;

      const newTakeProfitPrice =
        direction === "buy"
          ? entryPrice + priceDifference
          : entryPrice - priceDifference;

      setTakeProfitPrice(
        Number.parseFloat(
          newTakeProfitPrice.toFixed(currentPair.pipDecimal + 1),
        ),
      );
    },
    [currentPair.pipDecimal, direction, entryPrice],
  );

  // Update take profit pips from price
  const updateTakeProfitFromPrice = (price: number) => {
    setTakeProfitPrice(price);

    const pipValue = Math.pow(10, -currentPair.pipDecimal);
    const priceDifference =
      direction === "buy" ? price - entryPrice : entryPrice - price;

    const newPips = priceDifference / pipValue;
    setTakeProfitPips(Number.parseFloat(newPips.toFixed(1)));
  };

  // Calculate position size
  const calculatePosition = () => {
    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const pipValue = Math.pow(10, -currentPair.pipDecimal);
      const priceDifference = stopLossPips * pipValue;

      // Standard lot size
      const standardLot = 100000;

      // Calculate pip value in account currency
      let pipValueInAccountCurrency;

      if (currentPair.quoteCurrency === accountCurrency) {
        // Direct quote (e.g., EUR/USD for USD account)
        pipValueInAccountCurrency = pipValue * standardLot;
      } else if (currentPair.baseCurrency === accountCurrency) {
        // Indirect quote (e.g., USD/JPY for USD account)
        pipValueInAccountCurrency = (pipValue * standardLot) / entryPrice;
      } else {
        // Cross rate (e.g., EUR/GBP for USD account)
        // This is simplified; in reality, you'd need conversion rates
        pipValueInAccountCurrency = pipValue * standardLot * 1.0; // Assuming 1:1 conversion for simplicity
      }

      // Calculate position size in lots
      const positionSizeInLots =
        riskAmount / (stopLossPips * pipValueInAccountCurrency);

      // Round to 2 decimal places and limit between 0.01 and 100 lots
      const roundedPositionSize = Math.min(
        Math.max(Math.round(positionSizeInLots * 100) / 100, 0.01),
        100,
      );

      setPositionSize(roundedPositionSize);
      setIsCalculating(false);
    }, 500);
  };

  // Initialize entry price when pair changes
  useEffect(() => {
    setEntryPrice(currentPair.price);
    updateStopLossFromPips(stopLossPips);
    updateTakeProfitFromPips(takeProfitPips);
  }, [
    selectedPair,
    currentPair.price,
    direction,
    updateStopLossFromPips,
    stopLossPips,
    updateTakeProfitFromPips,
    takeProfitPips,
  ]);

  // Calculate results
  const calculateResults = () => {
    const standardLot = 100000;
    const positionSizeInUnits = positionSize * standardLot;

    // Calculate margin required
    const marginRequired = (positionSizeInUnits * entryPrice) / leverage;

    // Calculate pip value
    const pipValue = Math.pow(10, -currentPair.pipDecimal);
    const pipValueInAccountCurrency = pipValue * positionSizeInUnits;

    // Calculate potential profit/loss
    const takeProfitAmount = takeProfitPips * pipValueInAccountCurrency;
    const stopLossAmount = stopLossPips * pipValueInAccountCurrency * -1;

    // Calculate risk-reward ratio
    const riskRewardRatio = takeProfitPips / stopLossPips;

    return {
      positionSizeInUnits,
      marginRequired,
      pipValueInAccountCurrency,
      takeProfitAmount,
      stopLossAmount,
      riskRewardRatio,
    };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Position Calculator</h2>
          <motion.button
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPositionCalculator(true)}
          >
            Open Calculator
          </motion.button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Position Size Calculator
            </h3>
            <p className="mb-6 text-slate-400">
              Calculate the optimal position size based on your risk tolerance,
              account balance, and stop loss level. Manage your risk effectively
              with our advanced position calculator.
            </p>
            <motion.button
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPositionCalculator(true)}
            >
              Open Calculator
            </motion.button>
          </div>
        </div>
        {showPositionCalculator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-auto">
              <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 p-4">
                  <div className="flex items-center gap-2">
                    <Calculator className="text-blue-400" size={20} />
                    <h2 className="text-xl font-bold text-white">
                      Position Size Calculator
                    </h2>
                  </div>
                  <button
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                    onClick={() => setShowPositionCalculator(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Input Form */}
                    <div>
                      {/* Account Information */}
                      <div className="mb-6">
                        <h3 className="mb-3 flex items-center justify-between text-sm font-medium text-white">
                          <span>Account Information</span>
                          <button
                            className="text-slate-400 hover:text-white"
                            onClick={() => setShowHelp(!showHelp)}
                          >
                            <HelpCircle size={16} />
                          </button>
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1 block text-xs text-slate-400">
                              Account Currency
                            </label>
                            <select
                              value={accountCurrency}
                              onChange={(e) =>
                                setAccountCurrency(e.target.value)
                              }
                              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="JPY">JPY</option>
                              <option value="AUD">AUD</option>
                            </select>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-400">
                              Account Balance
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={accountBalance}
                                onChange={(e) =>
                                  setAccountBalance(
                                    Number.parseFloat(e.target.value),
                                  )
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                <DollarSign
                                  size={14}
                                  className="text-slate-400"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Trade Information */}
                      <div className="mb-6">
                        <h3 className="mb-3 text-sm font-medium text-white">
                          Trade Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-xs text-slate-400">
                              Currency Pair
                            </label>
                            <select
                              value={selectedPair}
                              onChange={(e) => setSelectedPair(e.target.value)}
                              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                            >
                              {currencyPairs.map((pair) => (
                                <option key={pair.symbol} value={pair.symbol}>
                                  {pair.symbol}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-400">
                              Direction
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                className={`rounded-lg py-2 text-sm font-medium ${
                                  direction === "buy"
                                    ? "bg-green-600 text-white"
                                    : "bg-slate-800 text-slate-400 hover:text-white"
                                }`}
                                onClick={() => setDirection("buy")}
                              >
                                Buy / Long
                              </button>
                              <button
                                type="button"
                                className={`rounded-lg py-2 text-sm font-medium ${
                                  direction === "sell"
                                    ? "bg-red-600 text-white"
                                    : "bg-slate-800 text-slate-400 hover:text-white"
                                }`}
                                onClick={() => setDirection("sell")}
                              >
                                Sell / Short
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-xs text-slate-400">
                                Entry Price
                              </label>
                              <input
                                type="number"
                                value={entryPrice}
                                onChange={(e) =>
                                  setEntryPrice(
                                    Number.parseFloat(e.target.value),
                                  )
                                }
                                step="0.00001"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs text-slate-400">
                                Leverage
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={leverage}
                                  onChange={(e) =>
                                    setLeverage(
                                      Number.parseFloat(e.target.value),
                                    )
                                  }
                                  min="1"
                                  max="500"
                                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                  <span className="text-xs text-slate-400">
                                    x
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Risk Management */}
                      <div className="mb-6">
                        <h3 className="mb-3 text-sm font-medium text-white">
                          Risk Management
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-xs text-slate-400">
                              Risk Percentage
                            </label>
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min="0.1"
                                max="10"
                                step="0.1"
                                value={riskPercent}
                                onChange={(e) =>
                                  updateRiskFromPercent(
                                    Number.parseFloat(e.target.value),
                                  )
                                }
                                className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700"
                              />
                              <div className="relative w-24">
                                <input
                                  type="number"
                                  value={riskPercent}
                                  onChange={(e) =>
                                    updateRiskFromPercent(
                                      Number.parseFloat(e.target.value),
                                    )
                                  }
                                  min="0.1"
                                  max="100"
                                  step="0.1"
                                  className="w-full rounded-lg border border-slate-700 bg-slate-800 py-1 pl-3 pr-8 text-center text-sm text-white"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                  <Percent
                                    size={12}
                                    className="text-slate-400"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-400">
                              Risk Amount
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={riskAmount}
                                onChange={(e) =>
                                  updateRiskFromAmount(
                                    Number.parseFloat(e.target.value),
                                  )
                                }
                                min="0"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                <DollarSign
                                  size={14}
                                  className="text-slate-400"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-xs text-slate-400">
                                Stop Loss (Pips)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={stopLossPips}
                                  onChange={(e) =>
                                    updateStopLossFromPips(
                                      Number.parseFloat(e.target.value),
                                    )
                                  }
                                  min="1"
                                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center">
                                  <div className="flex flex-col">
                                    <button
                                      type="button"
                                      className="p-0.5 text-slate-400 hover:text-white"
                                      onClick={() =>
                                        updateStopLossFromPips(stopLossPips + 1)
                                      }
                                    >
                                      <ArrowUp size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      className="p-0.5 text-slate-400 hover:text-white"
                                      onClick={() =>
                                        updateStopLossFromPips(
                                          Math.max(1, stopLossPips - 1),
                                        )
                                      }
                                    >
                                      <ArrowDown size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="mb-1 block text-xs text-slate-400">
                                Stop Loss Price
                              </label>
                              <input
                                type="number"
                                value={stopLossPrice}
                                onChange={(e) =>
                                  updateStopLossFromPrice(
                                    Number.parseFloat(e.target.value),
                                  )
                                }
                                step="0.00001"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-xs text-slate-400">
                                Take Profit (Pips)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={takeProfitPips}
                                  onChange={(e) =>
                                    updateTakeProfitFromPips(
                                      Number.parseFloat(e.target.value),
                                    )
                                  }
                                  min="1"
                                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center">
                                  <div className="flex flex-col">
                                    <button
                                      type="button"
                                      className="p-0.5 text-slate-400 hover:text-white"
                                      onClick={() =>
                                        updateTakeProfitFromPips(
                                          takeProfitPips + 1,
                                        )
                                      }
                                    >
                                      <ArrowUp size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      className="p-0.5 text-slate-400 hover:text-white"
                                      onClick={() =>
                                        updateTakeProfitFromPips(
                                          Math.max(1, takeProfitPips - 1),
                                        )
                                      }
                                    >
                                      <ArrowDown size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="mb-1 block text-xs text-slate-400">
                                Take Profit Price
                              </label>
                              <input
                                type="number"
                                value={takeProfitPrice}
                                onChange={(e) =>
                                  updateTakeProfitFromPrice(
                                    Number.parseFloat(e.target.value),
                                  )
                                }
                                step="0.00001"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Calculate Button */}
                      <button
                        type="button"
                        className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                        onClick={calculatePosition}
                        disabled={isCalculating}
                      >
                        {isCalculating ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw size={16} className="animate-spin" />
                            <span>Calculating...</span>
                          </div>
                        ) : (
                          "Calculate Position Size"
                        )}
                      </button>
                    </div>
                    {/* Results */}
                    <div>
                      {/* Position Size Result */}
                      <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                        <h3 className="mb-3 text-sm font-medium text-white">
                          Position Size
                        </h3>
                        <div className="text-center">
                          <div className="mb-1 text-4xl font-bold text-white">
                            {positionSize.toFixed(2)}
                          </div>
                          <div className="text-sm text-slate-400">
                            Lots ({results.positionSizeInUnits.toLocaleString()}{" "}
                            {currentPair.baseCurrency})
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-lg bg-slate-800 p-3">
                            <div className="mb-1 text-xs text-slate-400">
                              Margin Required
                            </div>
                            <div className="text-lg font-medium text-white">
                              {results.marginRequired.toFixed(2)}{" "}
                              {accountCurrency}
                            </div>
                          </div>
                          <div className="rounded-lg bg-slate-800 p-3">
                            <div className="mb-1 text-xs text-slate-400">
                              Pip Value
                            </div>
                            <div className="text-lg font-medium text-white">
                              {results.pipValueInAccountCurrency.toFixed(2)}{" "}
                              {accountCurrency}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Profit/Loss Projection */}
                      <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                        <h3 className="mb-3 text-sm font-medium text-white">
                          Profit/Loss Projection
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg border border-green-500/30 bg-green-900/20 p-3">
                            <div className="mb-1 text-xs text-green-400">
                              Take Profit
                            </div>
                            <div className="text-lg font-medium text-white">
                              {results.takeProfitAmount.toFixed(2)}{" "}
                              {accountCurrency}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              {takeProfitPips} pips
                            </div>
                          </div>
                          <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-3">
                            <div className="mb-1 text-xs text-red-400">
                              Stop Loss
                            </div>
                            <div className="text-lg font-medium text-white">
                              {Math.abs(results.stopLossAmount).toFixed(2)}{" "}
                              {accountCurrency}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              {stopLossPips} pips
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 rounded-lg bg-slate-800 p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">
                              Risk/Reward Ratio
                            </div>
                            <div className="text-sm font-medium text-white">
                              1:{results.riskRewardRatio.toFixed(2)}
                            </div>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-green-500"
                              style={{
                                width: `${(results.riskRewardRatio / (1 + results.riskRewardRatio)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Advanced Settings */}
                      <div>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl bg-slate-800/50 p-3 text-left"
                          onClick={() => setShowAdvanced(!showAdvanced)}
                        >
                          <span className="text-sm font-medium text-white">
                            Advanced Settings
                          </span>
                          {showAdvanced ? (
                            <ChevronUp size={16} className="text-white" />
                          ) : (
                            <ChevronDown size={16} className="text-white" />
                          )}
                        </button>
                        <AnimatePresence>
                          {showAdvanced && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 rounded-xl border border-slate-700 bg-slate-800/50 p-4"
                            >
                              <div className="space-y-3">
                                <div>
                                  <label className="mb-1 block text-xs text-slate-400">
                                    Commission per Lot
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      defaultValue={7}
                                      min="0"
                                      className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                      <DollarSign
                                        size={14}
                                        className="text-slate-400"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="mb-1 block text-xs text-slate-400">
                                    Swap Long (per Lot)
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      defaultValue={-2.5}
                                      className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                      <DollarSign
                                        size={14}
                                        className="text-slate-400"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="mb-1 block text-xs text-slate-400">
                                    Swap Short (per Lot)
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      defaultValue={-3.2}
                                      className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                      <DollarSign
                                        size={14}
                                        className="text-slate-400"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  {/* Help Modal */}
                  <AnimatePresence>
                    {showHelp && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                        onClick={() => setShowHelp(false)}
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 p-4">
                            <div className="flex items-center gap-2">
                              <Info className="text-blue-400" size={20} />
                              <h2 className="text-xl font-bold text-white">
                                Position Size Calculator Help
                              </h2>
                            </div>
                            <button
                              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                              onClick={() => setShowHelp(false)}
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <div className="max-h-[70vh] overflow-y-auto p-4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="mb-2 text-lg font-medium text-white">
                                  What is Position Sizing?
                                </h3>
                                <p className="text-slate-300">
                                  Position sizing is a risk management technique
                                  that determines how much of your capital to
                                  risk on a single trade. Proper position sizing
                                  helps protect your trading account from
                                  significant losses.
                                </p>
                              </div>
                              <div>
                                <h3 className="mb-2 text-lg font-medium text-white">
                                  How to Use This Calculator
                                </h3>
                                <ol className="list-inside list-decimal space-y-2 text-slate-300">
                                  <li>
                                    Enter your account balance and select your
                                    account currency.
                                  </li>
                                  <li>
                                    Choose the currency pair you want to trade.
                                  </li>
                                  <li>
                                    Set your entry price and stop loss level.
                                  </li>
                                  <li>
                                    Determine how much of your account
                                    you&apos;re willing to risk (1-2% is
                                    recommended).
                                  </li>
                                  <li>
                                    Click &quot;Calculate Position Size&quot; to
                                    get the recommended position size in lots.
                                  </li>
                                </ol>
                              </div>
                              <div>
                                <h3 className="mb-2 text-lg font-medium text-white">
                                  Understanding the Results
                                </h3>
                                <ul className="list-inside list-disc space-y-2 text-slate-300">
                                  <li>
                                    <span className="font-medium text-white">
                                      Position Size:
                                    </span>{" "}
                                    The recommended size of your trade in lots.
                                  </li>
                                  <li>
                                    <span className="font-medium text-white">
                                      Margin Required:
                                    </span>{" "}
                                    The amount of capital needed to open the
                                    position.
                                  </li>
                                  <li>
                                    <span className="font-medium text-white">
                                      Pip Value:
                                    </span>{" "}
                                    The monetary value of a single pip movement.
                                  </li>
                                  <li>
                                    <span className="font-medium text-white">
                                      Risk/Reward Ratio:
                                    </span>{" "}
                                    The ratio between your potential loss and
                                    potential gain.
                                  </li>
                                </ul>
                              </div>
                              <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-3">
                                <div className="flex items-start gap-2">
                                  <Info
                                    size={18}
                                    className="mt-0.5 text-blue-400"
                                  />
                                  <div>
                                    <h4 className="mb-1 text-sm font-medium text-white">
                                      Risk Management Tip
                                    </h4>
                                    <p className="text-sm text-slate-300">
                                      Most professional traders risk no more
                                      than 1-2% of their account on a single
                                      trade. This helps ensure that a string of
                                      losses won&apos;t significantly deplete
                                      your trading capital.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForexPositionCalculator;
