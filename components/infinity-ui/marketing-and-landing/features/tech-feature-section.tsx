"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Zap, Shield, Layers } from "lucide-react"

const TechFeatureSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Code,
      title: "Clean API",
      description:
        "Build with our intuitive API designed for developers, by developers. Simple, powerful, and flexible.",
      color: "group-hover:from-violet-600 group-hover:to-indigo-600",
      lightColor: "from-violet-200/40 to-indigo-200/40",
      darkColor: "from-violet-900/20 to-indigo-900/20",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with 99.9% uptime. Your applications will load in milliseconds, not seconds.",
      color: "group-hover:from-amber-500 group-hover:to-orange-600",
      lightColor: "from-amber-200/40 to-orange-200/40",
      darkColor: "from-amber-900/20 to-orange-900/20",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols keep your data safe and compliant with regulations.",
      color: "group-hover:from-emerald-500 group-hover:to-teal-600",
      lightColor: "from-emerald-200/40 to-teal-200/40",
      darkColor: "from-emerald-900/20 to-teal-900/20",
    },
    {
      icon: Layers,
      title: "Scalable Infrastructure",
      description: "From startup to enterprise, our platform grows with you. No limits, no compromises.",
      color: "group-hover:from-blue-500 group-hover:to-cyan-600",
      lightColor: "from-blue-200/40 to-cyan-200/40",
      darkColor: "from-blue-900/20 to-cyan-900/20",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[80%] rounded-full bg-gradient-to-br from-indigo-100/30 to-violet-100/30 dark:from-indigo-900/10 dark:to-violet-900/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[80%] rounded-full bg-gradient-to-tr from-blue-100/30 to-cyan-100/30 dark:from-blue-900/10 dark:to-cyan-900/10 blur-3xl"></div>

        <svg
          className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="url(#gridGradient)"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-500/30 dark:bg-indigo-500/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20 text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-4">
              Powerful Features
            </span>
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 leading-tight mb-6">
              Built for developers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides everything you need to build, deploy, and scale your applications.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.lightColor} dark:${feature.darkColor} rounded-2xl transform transition-all duration-300 group-hover:scale-[1.03] opacity-80`}
              ></div>

              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl transition-opacity duration-300 group-hover:opacity-0"></div>

              <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 rounded-2xl ${feature.color} group-hover:opacity-90"></div>

              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="mt-auto pt-6 flex justify-between items-center">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300">
                    Learn more
                  </span>
                  <svg
                    className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300 transform translate-x-0 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/5 dark:to-violet-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/5 dark:to-violet-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl transform rotate-1 scale-[1.03] opacity-70 blur-sm"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 bg-[length:20px_20px]"></div>
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to transform your development workflow?
                </h3>
                <p className="text-indigo-100 mb-8">
                  Join thousands of developers who are shipping faster and building better with our platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg shadow-indigo-700/30">
                    Get started for free
                  </button>
                  <button className="bg-indigo-700/50 hover:bg-indigo-700/70 backdrop-blur-sm text-white border border-indigo-400/30 px-6 py-3 rounded-xl font-medium transition-colors duration-200">
                    View documentation
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-gray-400 text-sm">Terminal</div>
                    </div>
                    <div className="p-4 font-mono text-sm text-green-400">
                      <div className="flex">
                        <span className="text-gray-500 mr-2">$</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          npm install @infinity/ui
                        </motion.span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        className="mt-2"
                      >
                        <span className="text-gray-400">Installing packages...</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 1.6 }}
                        className="mt-2"
                      >
                        <span className="text-gray-400">✓ Packages installed successfully</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 2 }}
                        className="mt-2 flex"
                      >
                        <span className="text-gray-500 mr-2">$</span>
                        <span className="relative">
                          npx infinity init
                          <span className="absolute right-0 top-0 h-full w-1 bg-white animate-blink"></span>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-600 rounded-full blur-2xl opacity-30"></div>
                <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-600 rounded-full blur-2xl opacity-30"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechFeatureSection

