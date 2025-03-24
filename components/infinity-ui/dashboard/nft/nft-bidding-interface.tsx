"use client";

import type React from "react";

import { bidHistoryData } from "@/data/nft-bidding-interface";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Clock,
  DollarSign,
  Gavel,
  History,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const NFTBiddingInterface = () => {
  // Create auction end time (3 days from now)
  const [endTime] = useState(() => {
    const auctionEndTime = new Date();
    auctionEndTime.setDate(auctionEndTime.getDate() + 3);
    return auctionEndTime;
  });

  const nftName = "Cosmic Voyager #042";
  const nftImage =
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp";
  const collectionName = "Cosmic Series";
  const collectionImage =
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo";
  const currentBid = "2.7";
  const minBidIncrement = "0.1";
  const currency = "ETH";
  const bidHistory = bidHistoryData;
  const userBalance = "5.0";

  const [bidAmount, setBidAmount] = useState(
    (
      Number.parseFloat(currentBid) + Number.parseFloat(minBidIncrement)
    ).toFixed(3),
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidStatus, setBidStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });

      // Set urgent flag if less than 10 minutes remain
      setIsUrgent(difference < 1000 * 60 * 10);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // Handle bid amount change
  const handleBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Only allow numbers and decimal point
      setBidAmount(value);
    }
  };

  // Increment bid amount
  const incrementBid = () => {
    const newAmount = (
      Number.parseFloat(bidAmount) + Number.parseFloat(minBidIncrement)
    ).toFixed(3);
    setBidAmount(newAmount);
  };

  // Decrement bid amount
  const decrementBid = () => {
    const minAmount =
      Number.parseFloat(currentBid) + Number.parseFloat(minBidIncrement);
    const newAmount = Math.max(
      minAmount,
      Number.parseFloat(bidAmount) - Number.parseFloat(minBidIncrement),
    ).toFixed(3);
    setBidAmount(newAmount);
  };

  // Check if bid is valid
  const isBidValid = () => {
    const amount = Number.parseFloat(bidAmount);
    const minAmount =
      Number.parseFloat(currentBid) + Number.parseFloat(minBidIncrement);
    const balance = Number.parseFloat(userBalance);

    return amount >= minAmount && amount <= balance;
  };

  const onPlaceBid = async (amount: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  // Handle place bid
  const handlePlaceBid = async () => {
    if (!isBidValid() || !onPlaceBid) return;

    setIsSubmitting(true);
    setBidStatus("idle");

    try {
      const success = await onPlaceBid(bidAmount);

      if (success) {
        setBidStatus("success");
        setStatusMessage("Your bid was placed successfully!");

        // Reset after 3 seconds
        setTimeout(() => {
          setBidStatus("idle");
          setStatusMessage("");
        }, 3000);
      } else {
        setBidStatus("error");
        setStatusMessage(
          "There was an error placing your bid. Please try again.",
        );
      }
    } catch (error) {
      setBidStatus("error");
      setStatusMessage(
        "There was an error placing your bid. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time unit
  const formatTimeUnit = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - timestamp.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    return timestamp.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-2">
            <Gavel className="text-blue-400" size={20} />
            <h2 className="text-xl font-bold text-white">Place a Bid</h2>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* NFT Preview */}
            <div className="md:w-1/3">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
                <Image
                  src={nftImage || "/default-image.jpg"}
                  alt={nftName}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="relative h-5 w-5 overflow-hidden rounded-full">
                    <Image
                      src={
                        collectionImage || "/placeholder.svg?height=50&width=50"
                      }
                      alt={collectionName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-white">
                    {collectionName}
                  </span>
                </div>
              </div>

              <h3 className="mb-1 text-lg font-bold text-white">{nftName}</h3>

              {/* Current Bid */}
              <div className="mb-4">
                <div className="mb-1 text-sm text-slate-400">Current Bid</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">
                    {currentBid}
                  </span>
                  <span className="text-blue-400">{currency}</span>
                </div>
              </div>

              {/* Auction Timer */}
              <div
                className={`rounded-xl p-3 ${isUrgent ? "border border-red-500/30 bg-red-900/20" : "bg-slate-800/50"}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Clock
                    className={isUrgent ? "text-red-400" : "text-blue-400"}
                    size={16}
                  />
                  <span
                    className={`text-sm font-medium ${isUrgent ? "text-red-300" : "text-white"}`}
                  >
                    {isUrgent ? "Ending Soon!" : "Auction Ends In"}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="text-center">
                      <motion.div
                        className={`relative overflow-hidden rounded-lg ${isUrgent ? "bg-red-900/30" : "bg-slate-700/50"} px-1 py-2`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {isUrgent && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent"
                            animate={{
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        )}

                        <motion.span
                          className="block text-xl font-bold text-white"
                          key={`${unit.label}-${unit.value}`} // Force re-render on value change
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        >
                          {formatTimeUnit(unit.value)}
                        </motion.span>
                        <span className="text-xs text-slate-400">
                          {unit.label}
                        </span>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bidding Form */}
            <div className="md:w-2/3">
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-white">
                    Your Bid Amount
                  </label>
                  <div className="text-xs text-slate-400">
                    Balance:{" "}
                    <span className="text-white">
                      {userBalance} {currency}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <DollarSign className="text-slate-400" size={16} />
                  </div>

                  <input
                    type="text"
                    value={bidAmount}
                    onChange={handleBidAmountChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pl-10 pr-20 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />

                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <div className="flex flex-col">
                      <button
                        className="p-1 text-slate-400 hover:text-white"
                        onClick={incrementBid}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        className="p-1 text-slate-400 hover:text-white"
                        onClick={decrementBid}
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex justify-between text-xs">
                  <div className="text-slate-400">
                    Min bid:{" "}
                    <span className="text-white">
                      {(
                        Number.parseFloat(currentBid) +
                        Number.parseFloat(minBidIncrement)
                      ).toFixed(3)}{" "}
                      {currency}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Bid increment:{" "}
                    <span className="text-white">
                      {minBidIncrement} {currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bid Status */}
              <AnimatePresence>
                {bidStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mb-4 flex items-center gap-2 rounded-xl p-3 ${
                      bidStatus === "success"
                        ? "border border-green-500/30 bg-green-900/20"
                        : "border border-red-500/30 bg-red-900/20"
                    }`}
                  >
                    {bidStatus === "success" ? (
                      <CheckCircle className="text-green-400" size={18} />
                    ) : (
                      <AlertCircle className="text-red-400" size={18} />
                    )}
                    <span
                      className={
                        bidStatus === "success"
                          ? "text-green-300"
                          : "text-red-300"
                      }
                    >
                      {statusMessage}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Place Bid Button */}
              <motion.button
                className={`mb-4 w-full rounded-xl py-3 font-medium ${
                  isBidValid()
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "cursor-not-allowed bg-slate-800 text-slate-400"
                }`}
                whileHover={isBidValid() ? { scale: 1.02 } : {}}
                whileTap={isBidValid() ? { scale: 0.98 } : {}}
                onClick={handlePlaceBid}
                disabled={!isBidValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Place Bid"
                )}
              </motion.button>

              {/* Bid Info */}
              <div className="mb-4 rounded-xl bg-slate-800/50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Users className="text-blue-400" size={16} />
                  <span className="text-sm font-medium text-white">
                    Auction Information
                  </span>
                </div>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 pt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    </div>
                    <span className="text-slate-300">
                      Your bid will be binding and cannot be canceled.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 pt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    </div>
                    <span className="text-slate-300">
                      If you are outbid, your funds will be returned to your
                      wallet automatically.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 pt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    </div>
                    <span className="text-slate-300">
                      The auction will extend by 10 minutes if a bid is placed
                      in the last 10 minutes.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Bid History Toggle */}
              <button
                className="flex w-full items-center justify-between rounded-xl bg-slate-800/50 p-3 text-left"
                onClick={() => setShowHistory(!showHistory)}
              >
                <div className="flex items-center gap-2">
                  <History className="text-blue-400" size={16} />
                  <span className="text-sm font-medium text-white">
                    Bid History ({bidHistory.length})
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: showHistory ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDown size={16} />
                </motion.div>
              </button>

              {/* Bid History */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 max-h-60 overflow-y-auto"
                  >
                    {bidHistory.length > 0 ? (
                      <div className="space-y-3">
                        {bidHistory.map((bid, index) => (
                          <motion.div
                            key={bid.id}
                            className="flex items-center gap-3 rounded-xl bg-slate-800/30 p-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="relative h-8 w-8 rounded-full">
                              <Image
                                src={
                                  bid.bidder.avatar ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                                }
                                alt={bid.bidder.username}
                                fill
                                className="rounded-full object-cover"
                              />
                              {bid.bidder.isVerified && (
                                <div className="absolute bottom-0 right-0 z-10 rounded-full bg-blue-500 p-0.5 text-white">
                                  <CheckCircle size={8} />
                                </div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-white">
                                  {bid.bidder.username}
                                </span>
                                {index === 0 && (
                                  <div className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">
                                    Highest
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-slate-400">
                                {formatTimestamp(bid.timestamp)}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-medium text-white">
                                {bid.amount} {currency}
                              </div>
                              {index === 0 && (
                                <div className="text-xs text-green-400">
                                  Current Bid
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-slate-400">
                        No bids yet. Be the first to place a bid!
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTBiddingInterface;
