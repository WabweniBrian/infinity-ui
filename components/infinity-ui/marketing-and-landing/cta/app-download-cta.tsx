"use client";

import { motion, useAnimation } from "framer-motion";
import { Apple, Star } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const AppDownloadCta = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

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

  const phoneVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.4,
      },
    },
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-gray-800 shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 text-white md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-300"
              >
                <Star className="h-3 w-3 text-yellow-400" />
                4.9 STAR RATED APP
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-3xl font-bold sm:text-4xl"
              >
                Get our app and <span className="text-cyan-400">transform</span>{" "}
                your experience
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-300">
                Download our mobile app to access exclusive features, faster
                performance, and a seamless experience on the go.
              </motion.p>

              {/* App store buttons */}
              <motion.div
                variants={itemVariants}
                className="mb-8 flex flex-wrap gap-4"
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 rounded-lg bg-black px-5 py-3 transition-all hover:bg-gray-900"
                >
                  <Apple className="h-6 w-6" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 rounded-lg bg-black px-5 py-3 transition-all hover:bg-gray-900"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.273-.635V2.449c0-.228.08-.45.273-.635zM14.4 12.6L16.801 15l-7.2 4.2 4.8-6.6zm3.6 3.6l2.4 1.5c.48.3.6.9.3 1.2l-.3.3-2.4 1.5L16.8 15zM9.6 1.5L16.8 9l-2.4 2.4-4.8-6.6 7.2 4.2-9.6-7.5z" />
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-8"
              >
                <div>
                  <div className="text-2xl font-bold text-cyan-400">1M+</div>
                  <div className="text-sm text-gray-400">Downloads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">4.9/5</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-8 md:p-0">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Phone mockup */}
              <motion.div
                variants={phoneVariants}
                className="relative h-[400px] w-[200px] rounded-[32px] border-[8px] border-gray-800 bg-gray-800 shadow-2xl"
              >
                {/* Screen content */}
                <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-gray-100">
                  <Image
                    src="/images/ch.png"
                    alt="App screenshot"
                    fill
                    className="object-cover"
                  />

                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-gray-800"></div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-1 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-full bg-gray-600"></div>
              </motion.div>

              {/* QR code */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-8 right-8 rounded-lg bg-white p-2 shadow-lg"
              >
                <div className="h-16 w-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMCAwaDEwMHYxMDBIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTAgMTBoMTB2MTBIMTB6TTMwIDEwaDEwdjEwSDMwek01MCAxMGgxMHYxMEg1MHpNNzAgMTBoMTB2MTBINzB6TTEwIDMwaDEwdjEwSDEwek0zMCAzMGgxMHYxMEgzMHpNNTAgMzBoMTB2MTBINTN6TTcwIDMwaDEwdjEwSDcwek0xMCA1MGgxMHYxMEgxMHpNMzAgNTBoMTB2MTBIMzB6TTUwIDUwaDEwdjEwSDUwek03MCA1MGgxMHYxMEg3MHpNMTAgNzBoMTB2MTBIMTBNMzAgNzBoMTB2MTBIMzB6TTUwIDcwaDEwdjEwSDUwek03MCA3MGgxMHYxMEg3MHoiLz48L3N2Zz4=')] bg-cover"></div>
                <div className="mt-1 text-center text-xs font-medium text-gray-900">
                  Scan to download
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppDownloadCta;
