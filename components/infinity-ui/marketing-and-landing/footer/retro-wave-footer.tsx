"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const RetroWaveFooter = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%),
            linear-gradient(to right, #ff00cc, #3333ff)
          `,
          backgroundSize: "cover",
          opacity: 0.8,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center bottom",
          height: "100%",
        }}
      />

      {/* Sun/circle */}
      <div
        className="absolute bottom-0 left-1/2 z-0 h-48 w-96 rounded-t-full"
        style={{
          background: "linear-gradient(to top, #ff00cc, #ff8800)",
          transform: "translateX(-50%)",
          boxShadow: "0 0 40px rgba(255, 0, 204, 0.6)",
          opacity: 0.7,
        }}
      />

      <div className="container relative z-10 mx-auto px-6 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <motion.h2
                className="text-3xl font-bold"
                style={{
                  textShadow:
                    "0 0 10px #ff00cc, 0 0 20px #ff00cc, 0 0 30px #ff00cc",
                }}
              >
                INFINITY UI
              </motion.h2>
              <div className="mt-2 h-1 w-32 bg-gradient-to-r from-pink-500 to-blue-500"></div>
            </div>
            <p className="text-gray-300">
              Retro-futuristic UI components for your next web project. Bringing
              the 80s back with a modern twist.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      filter: "drop-shadow(0 0 8px #ff00cc)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gray-800/50 p-2 transition-colors hover:bg-pink-500/50"
                  >
                    <Icon size={18} />
                  </motion.a>
                ),
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3
              className="text-xl font-semibold"
              style={{
                textShadow: "0 0 5px #3333ff, 0 0 10px #3333ff",
              }}
            >
              NAVIGATE
            </h3>
            <ul className="space-y-2">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Blog",
                "Contact",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="#"
                    className="flex items-center transition-colors hover:text-pink-400"
                  >
                    <ArrowRight size={14} className="mr-2 text-blue-400" />
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3
              className="text-xl font-semibold"
              style={{
                textShadow: "0 0 5px #3333ff, 0 0 10px #3333ff",
              }}
            >
              RESOURCES
            </h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "Tutorials",
                "Components",
                "Templates",
                "Support",
                "FAQ",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="#"
                    className="flex items-center transition-colors hover:text-pink-400"
                  >
                    <ArrowRight size={14} className="mr-2 text-blue-400" />
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3
              className="text-xl font-semibold"
              style={{
                textShadow: "0 0 5px #3333ff, 0 0 10px #3333ff",
              }}
            >
              CONTACT
            </h3>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: "123 Neon Street, Retro City, 80s" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@infinityui.com" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon
                    size={18}
                    className="mt-1 text-pink-400"
                    style={{
                      filter: "drop-shadow(0 0 2px #ff00cc)",
                    }}
                  />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-xl p-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(51, 51, 255, 0.2), rgba(255, 0, 204, 0.2))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3
                className="text-xl font-semibold"
                style={{
                  textShadow: "0 0 5px #ff00cc, 0 0 10px #ff00cc",
                }}
              >
                JOIN OUR NETWORK
              </h3>
              <p className="text-gray-300">
                Stay updated with the latest retro UI trends and components
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-pink-500/30 bg-gray-800/70 px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
              />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 0, 204, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-r-md px-4 py-2 font-medium text-white"
                style={{
                  background: "linear-gradient(to right, #ff00cc, #3333ff)",
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} INFINITY UI. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-gray-400 transition-colors hover:text-pink-400"
                  style={{
                    textShadow: "0 0 5px rgba(255, 0, 204, 0.5)",
                  }}
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default RetroWaveFooter;
