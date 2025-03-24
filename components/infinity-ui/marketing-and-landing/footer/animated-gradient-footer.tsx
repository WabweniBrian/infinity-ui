"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Github, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const AnimatedGradientFooter = () => {
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const animateGradient = async () => {
      while (true) {
        await controls.start({
          background: [
            "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
            "linear-gradient(45deg, #a18cd1 0%, #fbc2eb 100%)",
            "linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%)",
            "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
          ],
          transition: {
            duration: 15,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        })
      }
    }

    animateGradient()

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setGradientPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [controls])

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={controls}
        style={{
          backgroundSize: "400% 400%",
          backgroundPosition: `${gradientPosition.x * 100}% ${gradientPosition.y * 100}%`,
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-black opacity-20"></div>

      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Infinity UI</h2>
            <div className="w-20 h-1 mt-2 bg-white rounded-full"></div>
            <p className="text-white/80">
              Vibrant, colorful UI components for modern web applications. Add life to your interfaces with our animated
              gradient designs.
            </p>
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
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center"
                >
                  <ArrowRight size={14} className="mr-2 text-white/60" />
                  <Link href="#" className="transition-colors hover:text-white">
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
                  <ArrowRight size={14} className="mr-2 text-white/60" />
                  <Link href="#" className="transition-colors hover:text-white">
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
                { icon: MapPin, text: "123 Gradient Avenue, Color City" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@infinityui.com" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon size={18} className="mt-1 text-white/60" />
                  <span className="text-white/80">{item.text}</span>
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
          className="p-6 mt-12 rounded-xl bg-white/10 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold">Subscribe to our newsletter</h3>
              <p className="text-white/80">Stay updated with the latest UI trends and components</p>
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
                className="px-4 py-2 font-medium text-white bg-black/50 backdrop-blur-sm rounded-r-md hover:bg-black/70"
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
          <p className="text-white/60">© {new Date().getFullYear()} Infinity UI. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <Link key={i} href="#" className="transition-colors text-white/60 hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default AnimatedGradientFooter

