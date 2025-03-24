"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

const AnimatedParticlesFooter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const footer = canvas.parentElement
      if (footer) {
        canvas.width = footer.offsetWidth
        canvas.height = footer.offsetHeight
      }
    }

    const createParticles = () => {
      particles.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.25})`,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle, i) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw connections
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[j].x - particle.x
          const dy = particles.current[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.stroke()
          }
        }
      })

      animationFrameId.current = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    resizeCanvas()
    createParticles()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Particles Canvas */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

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
            <div className="w-20 h-1 mt-2 bg-blue-500 rounded-full"></div>
            <p className="text-gray-300">Creating beautiful, responsive UI components for modern web applications.</p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 transition-colors rounded-full bg-gray-800 hover:bg-blue-500"
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
                <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="#" className="block transition-colors hover:text-blue-400">
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
                <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="#" className="block transition-colors hover:text-blue-400">
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
                { icon: MapPin, text: "123 UI Street, Web City, Internet" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@infinityui.com" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon size={18} className="mt-1 text-blue-400" />
                  <span>{item.text}</span>
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
          className="p-6 mt-12 rounded-xl bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold">Subscribe to our newsletter</h3>
              <p className="text-gray-300">Stay updated with the latest UI trends and components</p>
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
                className="px-4 py-2 font-medium text-white bg-blue-500 rounded-r-md hover:bg-blue-600"
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
          className="pt-8 mt-12 text-center border-t border-gray-800"
        >
          <p className="text-gray-400">© {new Date().getFullYear()} Infinity UI. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <Link key={i} href="#" className="transition-colors text-gray-400 hover:text-blue-400">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default AnimatedParticlesFooter

