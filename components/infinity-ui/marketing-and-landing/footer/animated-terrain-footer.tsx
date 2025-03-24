"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Github, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const AnimatedTerrainFooter = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer ref={ref} className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden pt-24">
      {/* Animated terrain SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
          <motion.path
            initial={{ d: "M0,0 C300,20 400,40 600,30 C800,20 900,80 1200,10 L1200,120 L0,120 Z" }}
            animate={{
              d: [
                "M0,0 C300,20 400,40 600,30 C800,20 900,80 1200,10 L1200,120 L0,120 Z",
                "M0,0 C300,40 400,10 600,40 C800,10 900,30 1200,20 L1200,120 L0,120 Z",
                "M0,0 C300,20 400,40 600,30 C800,20 900,80 1200,10 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 20,
              ease: "easeInOut",
            }}
            fill="#3B82F6"
            opacity="0.2"
          />
          <motion.path
            initial={{
              d: "M0,20 C150,40 350,30 500,50 C650,70 700,40 900,30 C1050,20 1150,50 1200,40 L1200,120 L0,120 Z",
            }}
            animate={{
              d: [
                "M0,20 C150,40 350,30 500,50 C650,70 700,40 900,30 C1050,20 1150,50 1200,40 L1200,120 L0,120 Z",
                "M0,30 C150,10 350,50 500,30 C650,10 700,50 900,40 C1050,30 1150,10 1200,20 L1200,120 L0,120 Z",
                "M0,20 C150,40 350,30 500,50 C650,70 700,40 900,30 C1050,20 1150,50 1200,40 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 15,
              ease: "easeInOut",
            }}
            fill="#60A5FA"
            opacity="0.2"
          />
          <motion.path
            initial={{ d: "M0,40 C200,60 300,30 500,70 C700,90 900,50 1200,60 L1200,120 L0,120 Z" }}
            animate={{
              d: [
                "M0,40 C200,60 300,30 500,70 C700,90 900,50 1200,60 L1200,120 L0,120 Z",
                "M0,60 C200,30 300,70 500,40 C700,20 900,80 1200,50 L1200,120 L0,120 Z",
                "M0,40 C200,60 300,30 500,70 C700,90 900,50 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 10,
              ease: "easeInOut",
            }}
            fill="#93C5FD"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-12 gap-10"
        >
          {/* Company info */}
          <motion.div variants={item} className="md:col-span-4">
            <div className="mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xl">∞</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Infinity UI</h2>
              </div>
            </div>

            <p className="mb-6 text-gray-600">
              Beautiful UI components inspired by nature and organic shapes. Create interfaces that feel alive and
              responsive.
            </p>

            <div className="flex space-x-4 mb-8">
              {[Github, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-600">contact@infinityui.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-600">123 Design Street, Creative City</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={item} className="md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Product</h3>

            <ul className="space-y-2">
              {["Features", "Pricing", "Documentation", "Updates", "Roadmap"].map((item, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Company</h3>

            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Press", "Contact"].map((item, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Resources</h3>

            <ul className="space-y-2">
              {["Community", "Help Center", "Partners", "Changelog", "Newsletter"].map((item, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item} className="md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Stay Updated</h3>

            <p className="mb-4 text-gray-600">Subscribe to our newsletter for the latest updates.</p>

            <form className="mb-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default AnimatedTerrainFooter

