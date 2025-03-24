"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Github, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

const StackedCardsFooter = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    {
      title: "Documentation",
      description: "Explore our comprehensive guides and documentation",
      icon: ExternalLink,
      color: "bg-blue-500",
    },
    {
      title: "Components",
      description: "Browse our library of ready-to-use UI components",
      icon: ExternalLink,
      color: "bg-purple-500",
    },
    {
      title: "Support",
      description: "Get help from our friendly support team",
      icon: ExternalLink,
      color: "bg-pink-500",
    },
  ]

  return (
    <footer className="relative bg-gray-50 text-gray-800 pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Stacked Cards */}
        <div className="relative mb-16">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full md:w-1/3 max-w-sm"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div
                  className={`absolute inset-0 rounded-xl ${card.color} shadow-lg`}
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: hoveredCard === index ? -3 : 0,
                    scale: hoveredCard === index ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ zIndex: 1 }}
                />
                <motion.div
                  className="absolute inset-0 bg-white rounded-xl shadow-lg"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: hoveredCard === index ? 3 : 0,
                    scale: hoveredCard === index ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ zIndex: 2 }}
                />
                <motion.div
                  className="relative p-6 bg-white rounded-xl shadow-lg"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: hoveredCard === index ? 0 : 0,
                    y: hoveredCard === index ? -5 : 0,
                    scale: hoveredCard === index ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ zIndex: 3 }}
                >
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <motion.a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium ${
                      card.color === "bg-blue-500"
                        ? "text-blue-600"
                        : card.color === "bg-purple-500"
                          ? "text-purple-600"
                          : "text-pink-600"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ExternalLink size={14} className="ml-1" />
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4"
          >
            <div className="mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">∞</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Infinity UI</h2>
              </div>
            </div>

            <p className="mb-6 text-gray-600">
              Layered UI components with depth and dimension. Create interfaces that stand out with our stacked card
              design system.
            </p>

            <div className="flex space-x-4 mb-8">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 transition-colors rounded-full bg-white shadow-sm hover:bg-gray-100"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Team", "Careers", "Blog", "Press"].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Integrations", "Changelog", "Roadmap"].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <span className="text-gray-600">123 Design Street, Creative City, 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">hello@infinityui.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscribe</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-r-md"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default StackedCardsFooter

