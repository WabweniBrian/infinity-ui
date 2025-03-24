"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, BellRing, Home, Lightbulb, Lock, Thermometer, Wifi } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const SmartHomeHero = () => {
  const controls = useAnimation()
  const [activeRoom, setActiveRoom] = useState(0)
  const [lightBrightness, setLightBrightness] = useState(80)
  const [temperature, setTemperature] = useState(72)
  const [securityStatus, setSecurityStatus] = useState(true)

  // Rooms data
  const rooms = [
    { name: "Living Room", devices: 6, image: "/placeholder.svg?height=300&width=400&text=LivingRoom" },
    { name: "Kitchen", devices: 4, image: "/placeholder.svg?height=300&width=400&text=Kitchen" },
    { name: "Bedroom", devices: 5, image: "/placeholder.svg?height=300&width=400&text=Bedroom" },
    { name: "Office", devices: 3, image: "/placeholder.svg?height=300&width=400&text=Office" },
  ]

  // Start animations when component mounts
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
        delayChildren: 0.3,
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
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Circuit pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23000' strokeWidth='1'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23000'/%3E%3Ccircle cx='0' cy='50' r='3' fill='%23000'/%3E%3Ccircle cx='100' cy='50' r='3' fill='%23000'/%3E%3Ccircle cx='50' cy='0' r='3' fill='%23000'/%3E%3Ccircle cx='50' cy='100' r='3' fill='%23000'/%3E%3C/svg%3E")`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Accent colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-blue-500 blur-[80px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-cyan-500 blur-[80px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
              Smart Living Made Simple
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Control your home{" "}
              <span className="relative text-blue-600">
                intelligently
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-blue-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mb-8 max-w-lg text-lg text-gray-600">
              Transform your living space with our integrated smart home solutions. Control lighting, temperature,
              security, and more from a single intuitive app.
            </motion.p>

            {/* Smart home features */}
            <motion.div variants={itemVariants} className="mb-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Lightbulb, title: "Smart Lighting", desc: "Automate and control your lights" },
                { icon: Thermometer, title: "Climate Control", desc: "Perfect temperature, always" },
                { icon: Lock, title: "Security System", desc: "Keep your home safe and secure" },
                { icon: Wifi, title: "Seamless Connectivity", desc: "All devices work together" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Home className="h-4 w-4" />
                Schedule Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">1M+</span> Homes Connected
                </span>
              </div>

              <div className="h-8 w-[1px] bg-gray-200" />

              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">24/7</span> Support
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Smart Home Dashboard */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Smart home dashboard */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="bg-blue-600 p-4 text-white">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-lg font-bold">Smart Home</div>
                    <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      Connected
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-white">
                      <Image
                        src="/placeholder.svg?height=40&width=40&text=U"
                        alt="User"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Welcome back, Alex</div>
                      <div className="text-xs text-white/80">All systems normal</div>
                    </div>
                  </div>
                </div>

                {/* Room selection */}
                <div className="p-4">
                  <div className="mb-4 text-sm font-medium text-gray-700">Select Room</div>
                  <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {rooms.map((room, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveRoom(index)}
                        className={`flex flex-col items-center rounded-lg p-3 transition-all ${
                          activeRoom === index
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Home className="mb-1 h-5 w-5" />
                        <div className="text-xs font-medium">{room.name}</div>
                        <div className="text-xs opacity-70">{room.devices} devices</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Room preview */}
                  <div className="mb-6 overflow-hidden rounded-xl">
                    <div className="relative h-40 w-full">
                      <Image
                        src={rooms[activeRoom].image || "/placeholder.svg"}
                        alt={rooms[activeRoom].name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="font-medium">{rooms[activeRoom].name}</div>
                        <div className="text-xs">{rooms[activeRoom].devices} connected devices</div>
                      </div>
                    </div>
                  </div>

                  {/* Device controls */}
                  <div className="space-y-4">
                    {/* Lighting control */}
                    <div className="rounded-lg border border-gray-200 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lightbulb
                            className={`h-5 w-5 ${lightBrightness > 0 ? "text-yellow-500" : "text-gray-400"}`}
                          />
                          <span className="font-medium text-gray-900">Smart Lighting</span>
                        </div>
                        <div className="text-xs text-gray-500">{lightBrightness}%</div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={lightBrightness}
                        onChange={(e) => setLightBrightness(Number.parseInt(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                        style={{
                          background: `linear-gradient(to right, #facc15 0%, #facc15 ${lightBrightness}%, #e5e7eb ${lightBrightness}%, #e5e7eb 100%)`,
                        }}
                      />
                    </div>

                    {/* Temperature control */}
                    <div className="rounded-lg border border-gray-200 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-5 w-5 text-blue-500" />
                          <span className="font-medium text-gray-900">Temperature</span>
                        </div>
                        <div className="text-xs text-gray-500">{temperature}°F</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setTemperature(Math.max(60, temperature - 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          -
                        </motion.button>

                        <div className="h-2 flex-1 rounded-full bg-gray-200 mx-3">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${((temperature - 60) / 30) * 100}%` }}
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setTemperature(Math.min(90, temperature + 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>

                    {/* Security control */}
                    <div className="rounded-lg border border-gray-200 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className={`h-5 w-5 ${securityStatus ? "text-green-500" : "text-gray-400"}`} />
                          <span className="font-medium text-gray-900">Security System</span>
                        </div>

                        <button
                          onClick={() => setSecurityStatus(!securityStatus)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            securityStatus ? "bg-green-500" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              securityStatus ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        {securityStatus ? "System armed and active" : "System disarmed"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 top-10 rounded-lg bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Energy Saving</div>
                    <div className="text-gray-600">-32% this month</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -bottom-8 -right-10 rounded-lg bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <BellRing className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Motion Detected</div>
                    <div className="text-gray-600">Front door - 2m ago</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SmartHomeHero

