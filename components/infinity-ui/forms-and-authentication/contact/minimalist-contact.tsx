"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"

const MinimalistContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (field: string) => {
    setActiveField(field)
  }

  const handleBlur = () => {
    setActiveField(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", message: "" })
      }, 3000)
    }, 1000)
  }

  return (
    <div className="w-full min-h-[600px] bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Get in touch</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Have a question or want to work together? Drop us a message and we&apos;ll get back to you.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 flex flex-col items-center justify-center text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your message</h3>
            <p className="text-gray-500 max-w-md">
              We&apos;ve received your message and will respond as soon as possible.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <motion.div
                  animate={{
                    y: activeField === "name" ? -8 : 0,
                    color: activeField === "name" ? "#6366f1" : "#374151",
                  }}
                  className="mb-2 text-gray-700 font-medium"
                >
                  <label htmlFor="name">Name</label>
                </motion.div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-0 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <motion.div
                  animate={{
                    y: activeField === "email" ? -8 : 0,
                    color: activeField === "email" ? "#6366f1" : "#374151",
                  }}
                  className="mb-2 text-gray-700 font-medium"
                >
                  <label htmlFor="email">Email</label>
                </motion.div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-0 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <motion.div
                animate={{
                  y: activeField === "message" ? -8 : 0,
                  color: activeField === "message" ? "#6366f1" : "#374151",
                }}
                className="mb-2 text-gray-700 font-medium"
              >
                <label htmlFor="message">Message</label>
              </motion.div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                required
                rows={5}
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-0 outline-none transition-all resize-none"
                placeholder="Your message here..."
              />
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group inline-flex items-center gap-2 bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-600 transition-all"
              >
                Send Message
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.form>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Email</h4>
            <p className="text-gray-700">hello@infinityui.com</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Phone</h4>
            <p className="text-gray-700">+1 (555) 123-4567</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Office</h4>
            <p className="text-gray-700">123 Design Street, San Francisco, CA</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MinimalistContact

