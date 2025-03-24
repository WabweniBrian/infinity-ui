"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"

const GradientWaveFooter = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`,
            }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              delay: i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-white opacity-20"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current"
          ></path>
        </svg>
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
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <h2 className="text-2xl font-bold">Infinity UI</h2>
              <div className="w-20 h-1 mt-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            </motion.div>
            <p className="text-gray-300">Creating beautiful, responsive UI components for modern web applications.</p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 transition-colors rounded-full bg-white/10 hover:bg-white/20"
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
                <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="#" className="block transition-colors hover:text-purple-300">
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
                <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="#" className="block transition-colors hover:text-purple-300">
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
                  <item.icon size={18} className="mt-1 text-purple-300" />
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
          className="p-6 mt-12 rounded-xl bg-white/5 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold">Subscribe to our newsletter</h3>
              <p className="text-gray-300">Stay updated with the latest UI trends and components</p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-md hover:from-purple-600 hover:to-pink-600"
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
          className="pt-8 mt-12 text-center border-t border-white/10"
        >
          <p className="text-gray-300">© {new Date().getFullYear()} Infinity UI. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <Link key={i} href="#" className="transition-colors hover:text-purple-300">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default GradientWaveFooter

