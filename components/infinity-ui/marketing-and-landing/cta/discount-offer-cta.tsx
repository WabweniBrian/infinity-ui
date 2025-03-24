"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const DiscountOfferCta = () => {
  const controls = useAnimation();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59,
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="relative overflow-hidden p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-100"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-100"></div>

            <div className="relative">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
              >
                FLASH SALE
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                Get <span className="text-purple-600">40% OFF</span> on All
                Premium Templates
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mb-6 max-w-lg text-gray-600"
              >
                Limited time offer! Grab our entire collection of premium
                website templates at an unbeatable price. Perfect for designers,
                developers, and agencies.
              </motion.p>

              {/* Countdown timer */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>Offer Ends In:</span>
                </div>
                <div className="flex gap-3">
                  {[
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Minutes" },
                    { value: timeLeft.seconds, label: "Seconds" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-900 text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-medium text-white transition-all hover:bg-purple-700"
                >
                  Claim Discount Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span>Use code:</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 font-mono font-bold text-purple-600">
                    FLASH40
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscountOfferCta;
