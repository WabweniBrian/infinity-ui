"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";

const NFTAuctionTimer = () => {
  // Create auction end time (3 days from now)
  const [endTime] = useState(() => {
    const auctionEndTime = new Date();
    auctionEndTime.setDate(auctionEndTime.getDate() + 3);
    return auctionEndTime;
  });

  const highestBid = "2.7";
  const currency = "ETH";
  const bidCount = 18;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);

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

      // Set urgent flag if less than 1 hour remains
      setIsUrgent(difference < 1000 * 60 * 60);
    };

    // Calculate immediately on mount
    calculateTimeLeft();

    // Then set up the interval
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]); // Empty dependency array since endTime is constant after mount

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-8 text-white">
      <motion.div
        className={`mx-auto max-w-2xl overflow-hidden rounded-2xl ${isUrgent ? "bg-gradient-to-r from-red-900/40 to-orange-900/40" : "bg-slate-800/50"} border ${isUrgent ? "border-red-500/30" : "border-slate-700/50"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isUrgent ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Flame className="text-red-500" size={20} />
                </motion.div>
              ) : (
                <Clock className="text-blue-400" size={20} />
              )}
              <h3
                className={`text-lg font-bold ${isUrgent ? "text-red-200" : "text-white"}`}
              >
                {isUrgent ? "Ending Soon!" : "Auction Ending In"}
              </h3>
            </div>
            <div className="text-sm text-slate-400">{bidCount} bids</div>
          </div>

          {/* Timer Display */}
          <div className="mb-6 grid grid-cols-4 gap-2">
            {timeUnits.map((unit, index) => (
              <div key={unit.label} className="text-center">
                <motion.div
                  className={`relative overflow-hidden rounded-lg ${isUrgent ? "bg-red-900/30" : "bg-slate-700/50"} px-1 py-3`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Animated background for urgent timer */}
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
                    className="block text-2xl font-bold text-white"
                    key={`${unit.label}-${unit.value}`} // Force re-render on value change
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.span>
                  <span className="text-xs text-slate-400">{unit.label}</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Bid Information */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="block text-sm text-slate-400">Current Bid</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">
                  {highestBid}
                </span>
                <span className="text-blue-400">{currency}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-sm text-slate-400">
                Minimum Increase
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-white">0.1</span>
                <span className="text-blue-400">{currency}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            className={`w-full rounded-xl py-3 font-medium ${
              isUrgent
                ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("Placing a bid...")}
          >
            Place a Bid
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NFTAuctionTimer;
