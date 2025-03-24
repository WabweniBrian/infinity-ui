"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Globe, Clock, Award } from "lucide-react"

const StatsMetricsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const metrics = [
    {
      title: "Active Users",
      value: "2.4M+",
      change: "+24%",
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      description: "Monthly active users across all platforms",
    },
    {
      title: "Global Reach",
      value: "120+",
      change: "+12",
      icon: Globe,
      color: "from-emerald-500 to-teal-500",
      description: "Countries with active user base",
    },
    {
      title: "Response Time",
      value: "45ms",
      change: "-15ms",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      description: "Average server response time",
    },
    {
      title: "Customer Rating",
      value: "4.9/5",
      change: "+0.3",
      icon: Award,
      color: "from-rose-500 to-pink-500",
      description: "Average customer satisfaction score",
    },
  ]

  const growthData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 30 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 40 },
    { month: "May", value: 35 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 60 },
    { month: "Aug", value: 75 },
    { month: "Sep", value: 80 },
    { month: "Oct", value: 95 },
    { month: "Nov", value: 85 },
    { month: "Dec", value: 100 },
  ]

  const chartHeight = 200
  const chartWidth = 100 // percentage

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-[120px] opacity-50 dark:opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/30 to-teal-400/30 rounded-full blur-[100px] opacity-50 dark:opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="stats-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="w-12 h-1 bg-blue-500 rounded-full"></span>
            <span className="mx-2 text-blue-500 font-medium">METRICS</span>
            <span className="w-12 h-1 bg-blue-500 rounded-full"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Driving growth with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              data-driven insights
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform delivers exceptional results through continuous monitoring and optimization of key performance
            indicators.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-white to-white dark:from-gray-800 dark:to-gray-800 rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"></div>
              <div
                className={`absolute -inset-1 bg-gradient-to-br ${metric.color} opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-lg`}
              ></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      metric.change.startsWith("+")
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    {metric.change}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{metric.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mb-16"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Annual Growth</h3>
                <p className="text-gray-600 dark:text-gray-300">Year-over-year performance metrics</p>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-500 font-medium">+42% from last year</span>
              </div>
            </div>

            <div className="relative h-[300px]">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0">
                {[0, 25, 50, 75, 100].map((tick, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                    style={{ top: `${100 - tick}%` }}
                  >
                    <span className="absolute -top-3 -left-8 text-xs text-gray-500 dark:text-gray-400">{tick}%</span>
                  </div>
                ))}
              </div>

              {/* Chart Bars */}
              <div className="absolute inset-0 flex items-end justify-between pt-6">
                {growthData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-full">
                    <motion.div
                      className="w-8 rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-500"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${(item.value / 100) * chartHeight}px` } : { height: 0 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded">
                          {item.value}%
                        </div>
                      </div>
                    </motion.div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Industry Average",
              value: "3.2%",
              description: "Conversion rate across the industry",
              color: "bg-gray-100 dark:bg-gray-800",
              textColor: "text-gray-900 dark:text-white",
            },
            {
              title: "Our Platform",
              value: "8.7%",
              description: "Our average conversion rate",
              color: "bg-gradient-to-r from-blue-500 to-indigo-500",
              textColor: "text-white",
            },
            {
              title: "Improvement",
              value: "+171%",
              description: "Performance increase with our solution",
              color: "bg-gray-100 dark:bg-gray-800",
              textColor: "text-gray-900 dark:text-white",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`${stat.color} rounded-3xl p-6 shadow-lg`}
            >
              <h3
                className={`text-lg font-medium ${index === 1 ? "text-blue-100" : "text-gray-500 dark:text-gray-400"} mb-2`}
              >
                {stat.title}
              </h3>
              <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>{stat.value}</div>
              <p className={`text-sm ${index === 1 ? "text-blue-100" : "text-gray-600 dark:text-gray-300"}`}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Ready to see how our platform can transform your business metrics?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium inline-flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsMetricsSection

