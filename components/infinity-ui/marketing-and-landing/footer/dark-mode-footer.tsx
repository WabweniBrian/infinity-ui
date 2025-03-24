"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Sun,
  Moon,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react"

const DarkModeFooter = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle initial dark mode based on system preference
  useEffect(() => {
    setMounted(true)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)

    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  // Avoid hydration mismatch
  if (!mounted) return null

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              id="pattern-circle"
              cx="10"
              cy="10"
              r="1.6257413380501518"
              fill={isDarkMode ? "#fff" : "#000"}
            ></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-0 right-0 z-20 p-4">
        <motion.button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-gray-800"}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDarkMode ? "dark" : "light"}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="container relative z-10 px-6 pt-16 pb-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Infinity UI</h2>
            <div className={`w-20 h-1 mt-2 ${isDarkMode ? "bg-violet-500" : "bg-blue-600"} rounded-full`}></div>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Modern UI components for your next web project.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-violet-600 text-white"
                      : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center"
                >
                  <ChevronRight size={14} className={isDarkMode ? "text-violet-400" : "text-blue-500"} />
                  <Link
                    href="#"
                    className={`ml-1 transition-colors ${isDarkMode ? "hover:text-violet-400" : "hover:text-blue-600"}`}
                  >
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
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "Tutorials", "Components", "Templates", "Support", "FAQ"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center"
                >
                  <ChevronRight size={14} className={isDarkMode ? "text-violet-400" : "text-blue-500"} />
                  <Link
                    href="#"
                    className={`ml-1 transition-colors ${isDarkMode ? "hover:text-violet-400" : "hover:text-blue-600"}`}
                  >
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
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: "123 UI Street, Web City, Internet" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@infinityui.com" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon size={18} className={`mt-1 ${isDarkMode ? "text-violet-400" : "text-blue-500"}`} />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{item.text}</span>
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
          className={`p-6 mt-12 rounded-xl ${isDarkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-gray-100"}`}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold">Subscribe to our newsletter</h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Stay updated with the latest UI trends and components
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-l-md focus:outline-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-violet-500"
                    : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-medium text-white rounded-r-md ${
                  isDarkMode ? "bg-violet-600 hover:bg-violet-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
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
          className={`pt-8 mt-12 text-center border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            © {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <Link
                key={i}
                href="#"
                className={`transition-colors ${
                  isDarkMode ? "text-gray-400 hover:text-violet-400" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default DarkModeFooter

