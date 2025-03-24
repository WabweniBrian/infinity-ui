"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Github, ArrowRight, Mail, Phone, MapPin } from "lucide-react"

const IsometricFooter = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const socialLinks = [
    { icon: Twitter, color: "#1DA1F2", label: "Twitter" },
    { icon: Facebook, color: "#4267B2", label: "Facebook" },
    { icon: Instagram, color: "#E1306C", label: "Instagram" },
    { icon: Linkedin, color: "#0077B5", label: "LinkedIn" },
    { icon: Github, color: "#333", label: "GitHub" },
  ]

  const quickLinks = ["Home", "About", "Services", "Portfolio", "Pricing", "Contact"]

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Isometric Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              <path d="M 0 20 L 20 0 M 40 20 L 20 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-6 pt-16 pb-8 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold">Infinity UI</h2>
              <div className="w-16 h-1 mt-2 bg-teal-500"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400"
            >
              Building the future of web interfaces with modern, responsive components.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 transform"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateX: -20,
                    rotateY: 20,
                    z: 20,
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{
                      backgroundColor: social.color,
                      transform: "translateZ(-4px)",
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                  ></div>
                  <social.icon size={18} className="relative text-white" style={{ transform: "translateZ(4px)" }} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl font-semibold"
            >
              Quick Links
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href="#" className="flex items-center group">
                    <div className="relative mr-2 overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
                      <motion.div
                        initial={{ rotateY: 0 }}
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center w-6 h-6 bg-teal-500 rounded"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <ArrowRight size={12} className="text-white" style={{ transform: "translateZ(2px)" }} />
                      </motion.div>
                    </div>
                    <span className="text-gray-300 transition-colors group-hover:text-teal-400">{link}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl font-semibold"
            >
              Contact Us
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { icon: MapPin, text: "123 Design Avenue, Creative District" },
                { icon: Phone, text: "+1 (555) 234-5678" },
                { icon: Mail, text: "contact@infinityui.com" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  whileHover={{
                    x: 5,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <div className="relative mt-1" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div
                      whileHover={{
                        rotateX: -20,
                        rotateY: 20,
                        z: 10,
                      }}
                      className="flex items-center justify-center w-8 h-8 bg-teal-500/20 rounded-md"
                    >
                      <item.icon size={16} className="text-teal-400" style={{ transform: "translateZ(4px)" }} />
                    </motion.div>
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl font-semibold"
            >
              Stay Updated
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400"
            >
              Subscribe to our newsletter for the latest updates and UI insights.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 text-gray-800 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{ transform: "translateZ(1px)" }}
              />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  rotateX: -10,
                  rotateY: 10,
                  z: 10,
                }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2 px-4 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                style={{ transform: "translateZ(4px)" }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Isometric Divider */}
        <div className="relative py-8 mt-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="px-4 bg-gray-900"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="w-12 h-12 bg-teal-500/20 rounded-md flex items-center justify-center"
                style={{
                  transform: "rotateX(45deg) rotateZ(45deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="w-6 h-6 bg-teal-500 rounded-sm" style={{ transform: "translateZ(4px)" }}></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-4 text-center"
        >
          <p className="text-gray-400">© {new Date().getFullYear()} Infinity UI. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 transition-colors hover:text-teal-400">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default IsometricFooter

