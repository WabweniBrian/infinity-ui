"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Cpu, Database, Globe, Lock, Zap } from "lucide-react"

const ProductFeaturesGrid = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      title: "AI-Powered Insights",
      description: "Leverage machine learning algorithms to extract actionable insights from your data.",
      icon: Cpu,
      color: "from-rose-500 to-pink-500",
      position: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      title: "Global CDN",
      description: "Lightning-fast content delivery across 200+ data centers worldwide.",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      position: "col-span-1 row-span-1",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and advanced threat protection for your data.",
      icon: Lock,
      color: "from-emerald-500 to-teal-500",
      position: "col-span-1 row-span-1",
    },
    {
      title: "Scalable Infrastructure",
      description: "Automatically scales to handle millions of users without performance degradation.",
      icon: Database,
      color: "from-amber-500 to-orange-500",
      position: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      title: "Lightning Performance",
      description: "Optimized for speed with 99.9% uptime guarantee and sub-second response times.",
      icon: Zap,
      color: "from-violet-500 to-purple-500",
      position: "col-span-1 md:col-span-2 row-span-1",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="diagonalHatch"
                width="10"
                height="10"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-rose-300/20 to-pink-300/20 dark:from-rose-900/10 dark:to-pink-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300/20 to-cyan-300/20 dark:from-blue-900/10 dark:to-cyan-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="w-12 h-1 bg-rose-500 rounded-full"></span>
            <span className="mx-2 text-rose-500 font-medium">PRODUCT FEATURES</span>
            <span className="w-12 h-1 bg-rose-500 rounded-full"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">modern</span>{" "}
            businesses
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design to deliver a seamless experience that
            drives real business results.
          </p>
        </motion.div>

        {/* Asymmetrical Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`${feature.position} relative group`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-lg`}
              ></div>

              <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group-hover:border-transparent transition-colors duration-300 shadow-lg">
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{feature.description}</p>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300">
                    <span className="font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to transform your business?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of companies that are already using our platform to drive growth and innovation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-medium inline-flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/25">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium">
                    View Demo
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-3xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-rose-500/5 to-pink-500/5 dark:from-rose-500/10 dark:to-pink-500/10 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Active Users", value: "10M+" },
                      { label: "Data Processed", value: "500TB" },
                      { label: "Uptime", value: "99.9%" },
                      { label: "Response Time", value: "<100ms" },
                    ].map((stat, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm">
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductFeaturesGrid

