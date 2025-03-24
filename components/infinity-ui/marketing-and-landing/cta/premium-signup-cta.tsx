"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, Check, Crown, X } from "lucide-react"
import { useEffect } from "react"

const PremiumSignupCta = () => {
  const controls = useAnimation()

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
    <div className="w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
              >
                <Crown className="h-3 w-3" />
                PREMIUM FEATURES
              </motion.div>

              <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                Upgrade to Pro and Unlock Your Full Potential
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Take your productivity to the next level with advanced features, priority support, and unlimited access.
              </motion.p>

              {/* Feature comparison */}
              <motion.div variants={itemVariants} className="mb-6 space-y-4">
                <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
                  <div className="col-span-2 text-sm font-medium text-gray-700">Feature</div>
                  <div className="grid grid-cols-2 gap-2 text-center text-sm font-medium">
                    <div className="text-gray-500">Free</div>
                    <div className="text-amber-600">Pro</div>
                  </div>

                  {[
                    { name: "Projects", free: "3", pro: "Unlimited" },
                    { name: "Storage", free: "5 GB", pro: "100 GB" },
                    { name: "Team Members", free: "1", pro: "Unlimited" },
                    { name: "Priority Support", free: false, pro: true },
                    { name: "Advanced Analytics", free: false, pro: true },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="col-span-3 grid grid-cols-3 gap-4 border-t border-gray-200 py-3 text-sm"
                    >
                      <div className="col-span-2 text-gray-700">{feature.name}</div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="flex items-center justify-center text-gray-600">
                          {feature.free === false ? <X className="h-4 w-4 text-gray-400" /> : feature.free}
                        </div>
                        <div className="flex items-center justify-center font-medium text-amber-600">
                          {feature.pro === true ? <Check className="h-4 w-4" /> : feature.pro}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - Pricing */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-8 text-white md:p-10">
              <motion.div variants={itemVariants} className="mb-4">
                <div className="mb-1 text-lg font-medium">Pro Plan</div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-xl">/month</span>
                </div>
                <div className="mt-1 text-sm text-white/80">Billed annually ($228/year)</div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6 space-y-3">
                {[
                  "Unlimited projects and storage",
                  "Advanced analytics and reporting",
                  "Priority email and chat support",
                  "Team collaboration tools",
                  "API access and integrations",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-white/20 p-0.5 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-amber-600 transition-all hover:bg-white/90"
                >
                  Upgrade Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center text-sm text-white/80">
                30-day money-back guarantee, no questions asked
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PremiumSignupCta

