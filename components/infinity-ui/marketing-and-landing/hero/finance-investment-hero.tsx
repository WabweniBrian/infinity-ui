"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, ArrowUpRight, BarChart3, ChevronRight, Lock, Shield, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const FinanceInvestmentHero = () => {
  const controls = useAnimation()
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible")

    // Draw chart
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2) // For retina displays

    // Chart data
    const data = [25, 40, 30, 50, 45, 60, 55, 65, 70, 85, 80, 95]
    const maxValue = Math.max(...data)
    const canvasWidth = canvas.width / 2
    const canvasHeight = canvas.height / 2

    // Draw chart
    const drawChart = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Draw grid lines
      ctx.beginPath()
      ctx.strokeStyle = "#f1f5f9"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = canvasHeight - (i / 5) * (canvasHeight - 40)
        ctx.moveTo(30, y)
        ctx.lineTo(canvasWidth - 20, y)
      }

      // Vertical grid lines
      for (let i = 0; i <= data.length - 1; i++) {
        const x = 30 + (i / (data.length - 1)) * (canvasWidth - 50)
        ctx.moveTo(x, 40)
        ctx.lineTo(x, canvasHeight - 20)
      }

      ctx.stroke()

      // Draw chart line
      ctx.beginPath()
      ctx.strokeStyle = "#0ea5e9"
      ctx.lineWidth = 3
      ctx.lineJoin = "round"

      // Starting point
      const startX = 30
      const startY = canvasHeight - (data[0] / maxValue) * (canvasHeight - 60) - 20
      ctx.moveTo(startX, startY)

      // Draw line through all points
      for (let i = 1; i < data.length; i++) {
        const x = 30 + (i / (data.length - 1)) * (canvasWidth - 50)
        const y = canvasHeight - (data[i] / maxValue) * (canvasHeight - 60) - 20
        ctx.lineTo(x, y)
      }

      ctx.stroke()

      // Draw gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      gradient.addColorStop(0, "rgba(14, 165, 233, 0.2)")
      gradient.addColorStop(1, "rgba(14, 165, 233, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(startX, canvasHeight - 20)

      // Bottom left corner
      ctx.lineTo(startX, startY)

      // Draw line through all points again
      for (let i = 1; i < data.length; i++) {
        const x = 30 + (i / (data.length - 1)) * (canvasWidth - 50)
        const y = canvasHeight - (data[i] / maxValue) * (canvasHeight - 60) - 20
        ctx.lineTo(x, y)
      }

      // Bottom right corner
      ctx.lineTo(canvasWidth - 20, canvasHeight - 20)
      ctx.closePath()
      ctx.fill()

      // Draw data points
      for (let i = 0; i < data.length; i++) {
        const x = 30 + (i / (data.length - 1)) * (canvasWidth - 50)
        const y = canvasHeight - (data[i] / maxValue) * (canvasHeight - 60) - 20

        ctx.beginPath()
        ctx.fillStyle = "#ffffff"
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = "#0ea5e9"
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    drawChart()

    // Redraw on window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
      drawChart()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [controls])

  // Stats data
  const stats = [
    { label: "Assets Under Management", value: "$2.4B+" },
    { label: "Annual Returns", value: "12.8%" },
    { label: "Active Investors", value: "18,000+" },
  ]

  // Features data
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Portfolio",
      description: "AI-powered investment strategies tailored to your goals",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your investments protected with enterprise-grade security",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights and performance tracking",
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 py-20 md:py-28">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-sky-900/30 px-4 py-1.5 text-sm font-medium text-sky-400"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-400"></span>
              Intelligent Investing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Invest Smarter, <span className="text-sky-400">Grow Faster</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg text-slate-300"
            >
              Our data-driven platform helps you build wealth with personalized investment strategies, real-time
              analytics, and institutional-grade security.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="rounded-lg bg-slate-800/50 p-4">
                  <div className="text-2xl font-bold text-sky-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition-all hover:bg-sky-600"
              >
                Start Investing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-white transition-all hover:bg-slate-700"
              >
                <Lock className="h-4 w-4" />
                Login
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Chart and Features */}
          <div>
            {/* Interactive Chart Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="mb-6 overflow-hidden rounded-2xl bg-slate-800 p-5 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Portfolio Performance</div>
                  <div className="text-2xl font-bold text-white">$184,593.04</div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1 text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+18.4%</span>
                </div>
              </div>

              <div className="relative h-[180px] w-full">
                <canvas ref={chartRef} className="h-full w-full" />

                {/* Animated highlight on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-[25%] top-[30%] h-16 w-16 rounded-full border-2 border-sky-400 bg-transparent"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-400 text-slate-900"
                    >
                      <span className="text-xs font-bold">+</span>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </motion.div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="rounded-xl bg-slate-800/50 p-4"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-3 flex items-center gap-1 text-sm font-medium text-sky-400"
                  >
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-sky-400 blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -right-20 top-20 h-[250px] w-[250px] rounded-full bg-sky-400 blur-[100px]"
      />
    </div>
  )
}

export default FinanceInvestmentHero

