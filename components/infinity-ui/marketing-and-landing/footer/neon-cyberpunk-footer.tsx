"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Instagram, Linkedin } from "lucide-react";

const NeonCyberpunkFooter = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateGlow = (x: number, y: number) => {
    if (windowSize.width === 0) return { x: "50%", y: "50%" };
    return {
      x: `${(x / windowSize.width) * 100}%`,
      y: `${(y / windowSize.height) * 100}%`,
    };
  };

  const glow = calculateGlow(mousePosition.x, mousePosition.y);

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Cyberpunk grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00f0ff 1px, transparent 1px),
            linear-gradient(to bottom, #00f0ff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 80%)",
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background: `radial-gradient(circle 400px at ${glow.x} ${glow.y}, rgba(0, 240, 255, 0.4), transparent)`,
          pointerEvents: "none",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Logo and company info */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center">
                <div className="relative mr-3 h-10 w-10">
                  <div className="absolute inset-0 rounded-md bg-cyan-500 opacity-70 blur-sm"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-md border border-cyan-400 bg-black">
                    <span className="text-xl font-bold text-cyan-400">∞</span>
                  </div>
                </div>
                <h2 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                  INFINITY UI
                </h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-gray-400"
            >
              Building the interface of tomorrow with cutting-edge design and
              technology. Push the boundaries of what&apos;s possible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex space-x-4"
            >
              {[Github, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{
                    scale: 1.1,
                    color: ["#00f0ff", "#ff00f0", "#f0ff00", "#00f0ff"][
                      index % 4
                    ],
                  }}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-lg font-bold text-cyan-400"
            >
              NAVIGATE
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              {["Home", "About", "Services", "Portfolio", "Blog"].map(
                (item, index) => (
                  <motion.li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#00f0ff" }}
                      className="flex items-center text-gray-400 transition-colors hover:text-white"
                    >
                      <span className="mr-1 text-xs">{">"}</span> {item}
                    </motion.a>
                  </motion.li>
                ),
              )}
            </motion.ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-lg font-bold text-purple-400"
            >
              RESOURCES
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              {[
                "Documentation",
                "Tutorials",
                "Components",
                "Templates",
                "Support",
              ].map((item, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5, color: "#ff00f0" }}
                    className="flex items-center text-gray-400 transition-colors hover:text-white"
                  >
                    <span className="mr-1 text-xs">{">"}</span> {item}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-lg font-bold text-transparent"
            >
              JOIN THE NETWORK
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-gray-400"
            >
              Subscribe to get the latest updates and exclusive content.
            </motion.p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 p-2 text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex space-x-4"
            >
              <a
                href="#"
                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-cyan-400 transition-colors hover:bg-gray-700"
              >
                #cyberpunk
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-purple-400 transition-colors hover:bg-gray-700"
              >
                #futuristic
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-pink-400 transition-colors hover:bg-gray-700"
              >
                #neon
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row"
        >
          <p className="mb-4 text-sm text-gray-500 md:mb-0">
            © {new Date().getFullYear()} INFINITY UI. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scan line animation */}
      <motion.div
        initial={{ top: "-100%" }}
        animate={{ top: "100%" }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "linear",
        }}
        className="absolute left-0 right-0 z-0 h-[1px] bg-cyan-400 opacity-30"
        style={{
          boxShadow: "0 0 10px 1px #00f0ff",
        }}
      />
    </footer>
  );
};

export default NeonCyberpunkFooter;
