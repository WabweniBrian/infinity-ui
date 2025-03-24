"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle,
  X,
  Info,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Calculator,
} from "lucide-react";
import { pairs } from "@/data/forex-market-overview";

const ForexOrderForm = () => {
  const [selectedPair, setSelectedPair] = useState("EUR/USD");
  const currentPair =
    pairs.find((pair) => pair.symbol === selectedPair) || pairs[0];
  const symbol = currentPair.symbol;
  const baseCurrency = currentPair.baseCurrency;
  const quoteCurrency = currentPair.quoteCurrency;
  const bid = currentPair.bid;
  const ask = currentPair.ask;
  const spread = currentPair.spread;
  const pipValue = 10;
  const leverage = 30;
  const balance = 10000;
  const accountCurrency = "USD";
  // Form state
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">(
    "market",
  );
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState(0.1);
  const [limitPrice, setLimitPrice] = useState(direction === "buy" ? ask : bid);
  const [stopLoss, setStopLoss] = useState<number | null>(null);
  const [takeProfit, setTakeProfit] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculator state
  const [riskAmount, setRiskAmount] = useState(balance * 0.02); // 2% of balance
  const [riskPercent, setRiskPercent] = useState(2);
  const [stopPips, setStopPips] = useState(50);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  // Update limit price when direction changes
  useEffect(() => {
    setLimitPrice(direction === "buy" ? ask : bid);
  }, [direction, ask, bid]);

  // Format price with appropriate decimal places
  const formatPrice = (price: number) => {
    const decimalPlaces = symbol.includes("JPY") ? 3 : 5;
    return price.toFixed(decimalPlaces);
  };

  // Format pips
  const formatPips = (pips: number) => {
    return pips.toFixed(1);
  };

  // Convert price difference to pips
  const priceToPips = (price1: number, price2: number) => {
    const multiplier = symbol.includes("JPY") ? 100 : 10000;
    return Math.abs(price1 - price2) * multiplier;
  };

  // Convert pips to price difference
  const pipsToPrice = (pips: number) => {
    const divisor = symbol.includes("JPY") ? 100 : 10000;
    return pips / divisor;
  };

  // Calculate position value
  const calculatePositionValue = () => {
    const lotSize = 100000; // Standard lot size
    const positionSize = amount * lotSize;
    return positionSize;
  };

  // Calculate required margin
  const calculateRequiredMargin = () => {
    const positionValue = calculatePositionValue();
    return positionValue / leverage;
  };

  // Calculate potential profit/loss
  const calculatePotentialPL = () => {
    const positionValue = calculatePositionValue();
    let entryPrice = direction === "buy" ? ask : bid;

    if (orderType !== "market") {
      entryPrice = limitPrice;
    }

    let tpPL = 0;
    let slPL = 0;

    if (takeProfit !== null) {
      const tpDiff =
        direction === "buy" ? takeProfit - entryPrice : entryPrice - takeProfit;
      tpPL = tpDiff * positionValue;
    }

    if (stopLoss !== null) {
      const slDiff =
        direction === "buy" ? entryPrice - stopLoss : stopLoss - entryPrice;
      slPL = slDiff * positionValue * -1;
    }

    return { takeProfit: tpPL, stopLoss: slPL };
  };

  // Calculate position size based on risk
  const calculatePositionSize = () => {
    if (stopPips <= 0) return 0;

    const riskPerPip = riskAmount / stopPips;
    const lotSize = riskPerPip / pipValue;
    return Math.min(Math.max(lotSize, 0.01), 100); // Limit between 0.01 and 100 lots
  };

  // Update risk amount when percent changes
  const updateRiskFromPercent = (percent: number) => {
    setRiskPercent(percent);
    setRiskAmount(balance * (percent / 100));
  };

  // Update risk percent when amount changes
  const updateRiskFromAmount = (amount: number) => {
    setRiskAmount(amount);
    setRiskPercent((amount / balance) * 100);
  };

  // Apply calculated position size
  const applyCalculatedSize = () => {
    const calculatedSize = calculatePositionSize();
    setAmount(Number.parseFloat(calculatedSize.toFixed(2)));
    setShowCalculator(false);

    // Calculate and set stop loss based on entry price and stop pips
    const entryPrice = direction === "buy" ? ask : bid;
    const stopPriceOffset = pipsToPrice(stopPips);
    const newStopLoss =
      direction === "buy"
        ? entryPrice - stopPriceOffset
        : entryPrice + stopPriceOffset;

    setStopLoss(
      Number.parseFloat(newStopLoss.toFixed(symbol.includes("JPY") ? 3 : 5)),
    );
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  // Handle limit price change
  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLimitPrice(value);
    }
  };

  // Handle stop loss change
  const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? null : Number.parseFloat(e.target.value);
    if (value === null || !isNaN(value)) {
      setStopLoss(value);
    }
  };

  // Handle take profit change
  const handleTakeProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? null : Number.parseFloat(e.target.value);
    if (value === null || !isNaN(value)) {
      setTakeProfit(value);
    }
  };

  const onSubmitOrder = async (orderData: any) => {
    console.log("Submitting order:", orderData);
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setOrderStatus("idle");

    try {
      const success = await onSubmitOrder({
        symbol,
        type: orderType,
        direction,
        amount,
        price: orderType !== "market" ? limitPrice : undefined,
        stopLoss: stopLoss || undefined,
        takeProfit: takeProfit || undefined,
      });

      if (success) {
        setOrderStatus("success");
        setStatusMessage(
          `Order ${orderType === "market" ? "executed" : "placed"} successfully!`,
        );

        // Reset form after 3 seconds
        setTimeout(() => {
          setOrderStatus("idle");
          setStatusMessage("");

          // Reset form fields
          setAmount(0.1);
          setStopLoss(null);
          setTakeProfit(null);
        }, 3000);
      } else {
        setOrderStatus("error");
        setStatusMessage(
          "There was an error processing your order. Please try again.",
        );
      }
    } catch (error) {
      setOrderStatus("error");
      setStatusMessage(
        "There was an error processing your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    if (amount <= 0) return false;

    if (orderType !== "market" && (!limitPrice || limitPrice <= 0))
      return false;

    // Check if stop loss is valid
    if (stopLoss !== null) {
      if (
        direction === "buy" &&
        stopLoss >= (orderType === "market" ? ask : limitPrice)
      )
        return false;
      if (
        direction === "sell" &&
        stopLoss <= (orderType === "market" ? bid : limitPrice)
      )
        return false;
    }

    // Check if take profit is valid
    if (takeProfit !== null) {
      if (
        direction === "buy" &&
        takeProfit <= (orderType === "market" ? ask : limitPrice)
      )
        return false;
      if (
        direction === "sell" &&
        takeProfit >= (orderType === "market" ? bid : limitPrice)
      )
        return false;
    }

    return true;
  };

  // Calculate potential profit/loss values
  const potentialPL = calculatePotentialPL();

  // Calculate margin requirements
  const requiredMargin = calculateRequiredMargin();
  const marginPercentage = (requiredMargin / balance) * 100;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="text-blue-400" size={20} />
          <div>
            <h2 className="text-xl font-bold text-white">New Order</h2>
            <div className="text-sm text-slate-400">
              {symbol} ({baseCurrency}/{quoteCurrency})
            </div>
          </div>
        </div>
      </div>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="p-4">
        {/* Price Information */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-800/50 p-3">
          <div>
            <div className="mb-1 text-xs text-slate-400">Bid</div>
            <div className="text-lg font-bold text-white">
              {formatPrice(bid)}
            </div>
          </div>

          <div className="text-center">
            <div className="mb-1 text-xs text-slate-400">Spread</div>
            <div className="text-sm text-slate-300">
              {formatPips(spread)} pips
            </div>
          </div>

          <div className="text-right">
            <div className="mb-1 text-xs text-slate-400">Ask</div>
            <div className="text-lg font-bold text-white">
              {formatPrice(ask)}
            </div>
          </div>
        </div>

        {/* Order Type */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Order Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className={`rounded-lg py-2 text-sm font-medium ${
                orderType === "market"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              onClick={() => setOrderType("market")}
            >
              Market
            </button>
            <button
              type="button"
              className={`rounded-lg py-2 text-sm font-medium ${
                orderType === "limit"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              onClick={() => setOrderType("limit")}
            >
              Limit
            </button>
            <button
              type="button"
              className={`rounded-lg py-2 text-sm font-medium ${
                orderType === "stop"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              onClick={() => setOrderType("stop")}
            >
              Stop
            </button>
          </div>
        </div>

        {/* Direction */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Direction
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-xl py-3 font-medium text-white ${
                direction === "buy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              onClick={() => setDirection("buy")}
            >
              <TrendingUp size={18} />
              <span>Buy / Long</span>
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-xl py-3 font-medium text-white ${
                direction === "sell"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              onClick={() => setDirection("sell")}
            >
              <TrendingDown size={18} />
              <span>Sell / Short</span>
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="amount" className="text-sm font-medium text-white">
              Amount (Lots)
            </label>
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              <Calculator size={14} />
              <span>Position Calculator</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              step="0.01"
              min="0.01"
              max="100"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-blue-500/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
            />

            <div className="absolute inset-y-0 right-3 flex items-center">
              <div className="flex flex-col">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() =>
                    setAmount((prev) => Math.min(prev + 0.01, 100))
                  }
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() =>
                    setAmount((prev) => Math.max(prev - 0.01, 0.01))
                  }
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-1 flex justify-between text-xs text-slate-400">
            <span>
              Position Value: {calculatePositionValue().toLocaleString()}{" "}
              {baseCurrency}
            </span>
            <span>
              Margin: {requiredMargin.toLocaleString()} {accountCurrency} (
              {marginPercentage.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Position Size Calculator */}
        <AnimatePresence>
          {showCalculator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                <h3 className="mb-3 text-sm font-medium text-white">
                  Position Size Calculator
                </h3>

                <div className="space-y-3">
                  {/* Risk Amount */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">
                      Risk Amount ({accountCurrency})
                    </label>
                    <input
                      type="number"
                      value={riskAmount}
                      onChange={(e) =>
                        updateRiskFromAmount(Number.parseFloat(e.target.value))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white [appearance:textfield] focus:outline-none focus:ring-1 focus:ring-blue-500/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>

                  {/* Risk Percent */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">
                      Risk Percentage
                    </label>
                    <div className="flex items-center gap-2">
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
                        className="h-2 flex-1 cursor-pointer rounded-lg bg-slate-700 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <div className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-center text-sm text-white">
                        {riskPercent.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Stop Loss in Pips */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">
                      Stop Loss (Pips)
                    </label>
                    <input
                      type="number"
                      value={stopPips}
                      onChange={(e) =>
                        setStopPips(Number.parseFloat(e.target.value))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white [appearance:textfield] focus:outline-none focus:ring-1 focus:ring-blue-500/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>

                  {/* Calculated Position Size */}
                  <div className="border-t border-slate-700 pt-2">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Calculated Position Size:
                      </span>
                      <span className="text-sm font-medium text-white">
                        {calculatePositionSize().toFixed(2)} Lots
                      </span>
                    </div>

                    <button
                      type="button"
                      className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      onClick={applyCalculatedSize}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Limit Price (for limit and stop orders) */}
        {orderType !== "market" && (
          <div className="mb-4">
            <label
              htmlFor="limitPrice"
              className="mb-2 block text-sm font-medium text-white"
            >
              {orderType === "limit" ? "Limit Price" : "Stop Price"}
            </label>
            <div className="relative">
              <input
                type="number"
                id="limitPrice"
                value={limitPrice}
                onChange={handleLimitPriceChange}
                step="0.00001"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-blue-500/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                required
              />

              <div className="absolute inset-y-0 right-3 flex items-center">
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-white"
                    onClick={() =>
                      setLimitPrice(
                        (prev) =>
                          prev + (symbol.includes("JPY") ? 0.001 : 0.00001),
                      )
                    }
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-white"
                    onClick={() =>
                      setLimitPrice(
                        (prev) =>
                          prev - (symbol.includes("JPY") ? 0.001 : 0.00001),
                      )
                    }
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stop Loss */}
        <div className="mb-4">
          <label
            htmlFor="stopLoss"
            className="mb-2 block text-sm font-medium text-white"
          >
            Stop Loss (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              id="stopLoss"
              value={stopLoss === null ? "" : stopLoss}
              onChange={handleStopLossChange}
              step="0.00001"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-blue-500/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <div className="absolute inset-y-0 right-3 flex items-center">
              <div className="flex flex-col">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() =>
                    setStopLoss((prev) =>
                      prev === null
                        ? null
                        : prev + (symbol.includes("JPY") ? 0.001 : 0.00001),
                    )
                  }
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() =>
                    setStopLoss((prev) =>
                      prev === null
                        ? null
                        : prev - (symbol.includes("JPY") ? 0.001 : 0.00001),
                    )
                  }
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {stopLoss !== null && (
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-slate-400">
                Distance:{" "}
                {formatPips(
                  priceToPips(
                    orderType === "market"
                      ? direction === "buy"
                        ? ask
                        : bid
                      : limitPrice,
                    stopLoss,
                  ),
                )}{" "}
                pips
              </span>
              <span className="text-red-400">
                Potential Loss: {potentialPL.stopLoss.toFixed(2)}{" "}
                {accountCurrency}
              </span>
            </div>
          )}
        </div>

        {/* Take Profit */}
        <div className="mb-6">
          <label
            htmlFor="takeProfit"
            className="mb-2 block text-sm font-medium text-white"
          >
            Take Profit (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              id="takeProfit"
              value={takeProfit === null ? "" : takeProfit}
              onChange={handleTakeProfitChange}
              step="0.00001"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-blue-500/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <div className="absolute inset-y-0 right-3 flex items-center">
              <div className="flex flex-col">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() =>
                    setTakeProfit((prev) =>
                      prev === null
                        ? null
                        : prev + (symbol.includes("JPY") ? 0.001 : 0.00001),
                    )
                  }
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() =>
                    setTakeProfit((prev) =>
                      prev === null
                        ? null
                        : prev - (symbol.includes("JPY") ? 0.001 : 0.00001),
                    )
                  }
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {takeProfit !== null && (
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-slate-400">
                Distance:{" "}
                {formatPips(
                  priceToPips(
                    orderType === "market"
                      ? direction === "buy"
                        ? ask
                        : bid
                      : limitPrice,
                    takeProfit,
                  ),
                )}{" "}
                pips
              </span>
              <span className="text-green-400">
                Potential Profit: {potentialPL.takeProfit.toFixed(2)}{" "}
                {accountCurrency}
              </span>
            </div>
          )}
        </div>

        {/* Order Status */}
        <AnimatePresence>
          {orderStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-4 flex items-center gap-2 rounded-xl p-3 ${
                orderStatus === "success"
                  ? "border border-green-500/30 bg-green-900/20"
                  : "border border-red-500/30 bg-red-900/20"
              }`}
            >
              {orderStatus === "success" ? (
                <CheckCircle className="text-green-400" size={18} />
              ) : (
                <AlertCircle className="text-red-400" size={18} />
              )}
              <span
                className={
                  orderStatus === "success" ? "text-green-300" : "text-red-300"
                }
              >
                {statusMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full rounded-xl py-3 font-medium ${
            direction === "buy"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-600 text-white hover:bg-red-700"
          } transition-colors disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <>
              {orderType === "market" ? (
                <span>
                  {direction === "buy" ? "Buy" : "Sell"} {symbol} at Market
                </span>
              ) : (
                <span>
                  Place {orderType.charAt(0).toUpperCase() + orderType.slice(1)}{" "}
                  Order
                </span>
              )}
            </>
          )}
        </button>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
          <Info size={14} className="mt-0.5 flex-shrink-0" />
          <p>
            Trading forex involves substantial risk of loss and is not suitable
            for all investors. Please ensure you fully understand the risks
            involved before trading.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForexOrderForm;
