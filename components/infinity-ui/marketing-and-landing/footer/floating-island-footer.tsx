"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Github, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const FloatingIslandFooter = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const cloudVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  const islandVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <footer
      ref={footerRef}
      className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50 text-slate-800"
    >
      {/* Clouds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cloudVariants}
            initial="hidden"
            animate={controls}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 10}%`,
              opacity: 0.8 - (i % 3) * 0.2,
            }}
          >
            <div
              className="w-24 h-8 bg-white rounded-full"
              style={{
                filter: "blur(8px)",
                transform: `scale(${1 + (i % 4) * 0.5})`,
              }}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* Main Island */}
      <motion.div
        variants={islandVariants}
        initial="hidden"
        animate={controls}
        className="container relative z-10 px-6 mx-auto"
      >
        <div className="relative p-8 bg-white rounded-xl shadow-xl lg:p-12">
          {/* Island Top Decoration */}
          <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden transform -translate-y-1/2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-green-400 rounded-full"
                style={{
                  left: `${i * 5}%`,
                  top: "0",
                  opacity: 0.8 - (i % 5) * 0.1,
                }}
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl font-bold">Infinity UI</h2>
              <div className="w-20 h-1 mt-2 bg-green-500 rounded-full"></div>
              <p className="text-slate-600">Crafting beautiful UI components for modern web applications.</p>
              <div className="flex space-x-3">
                {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-slate-600 transition-colors rounded-full bg-slate-100 hover:bg-green-100 hover:text-green-600"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center"
                  >
                    <ArrowRight size={14} className="mr-2 text-green-500" />
                    <Link href="#" className="transition-colors hover:text-green-600">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold">Resources</h3>
              <ul className="space-y-2">
                {["Documentation", "Tutorials", "Components", "Templates", "Support", "FAQ"].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center"
                  >
                    <ArrowRight size={14} className="mr-2 text-green-500" />
                    <Link href="#" className="transition-colors hover:text-green-600">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold">Stay Updated</h3>
              <p className="text-slate-600">Subscribe to our newsletter for the latest updates and UI insights.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 font-medium text-white bg-green-500 rounded-r-lg hover:bg-green-600"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-6 p-6 mt-12 bg-slate-50 rounded-xl md:grid-cols-3"
          >
            {[
              { icon: MapPin, title: "Address", content: "123 UI Street, Web City, Internet" },
              { icon: Phone, title: "Phone", content: "+1 (555) 123-4567" },
              { icon: Mail, title: "Email", content: "hello@infinityui.com" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex items-start p-4 space-x-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 mt-1 bg-green-100 rounded-full">
                  <item.icon size={18} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">{item.title}</h4>
                  <p className="text-slate-600">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemVariants} className="pt-8 mt-12 text-center border-t border-slate-200">
            <p className="text-slate-600">© {new Date().getFullYear()} Infinity UI. All rights reserved.</p>
            <div className="flex justify-center mt-4 space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                <Link key={i} href="#" className="text-slate-600 transition-colors hover:text-green-600">
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Water Waves */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-blue-400 opacity-20">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-blue-500 opacity-30">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </footer>
  )
}

export default FloatingIslandFooter

