"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import { useEffect, useState } from "react"

const NewsletterSubscriptionCta = () => {
  const controls = useAnimation()
  const [email, setEmail] = useState("")

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="relative overflow-hidden p-8 sm:p-12">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
              </svg>
            </div>

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100"
              >
                <Mail className="h-8 w-8 text-rose-600" />
              </motion.div>

              <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Stay in the Loop
              </motion.h2>

              <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-lg text-gray-600">
                Subscribe to our newsletter for the latest updates, exclusive content, and special offers. We promise
                not to spam your inbox!
              </motion.p>

              {/* Email signup */}
              <motion.div variants={itemVariants} className="mx-auto mb-6 max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none placeholder:text-gray-400 focus:border-rose-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-all hover:bg-rose-700"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="text-sm text-gray-500">
                <div className="mb-2">Join 25,000+ subscribers who get our newsletter</div>
                <div className="flex justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Weekly updates</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NewsletterSubscriptionCta

