"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, BookOpen, GraduationCap, Users, Calendar } from "lucide-react"

const EducationContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    program: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "",
          program: "",
          message: "",
        })
      }, 3000)
    }, 1000)
  }

  const roles = [
    { value: "", label: "Select your role" },
    { value: "student", label: "Prospective Student" },
    { value: "parent", label: "Parent/Guardian" },
    { value: "teacher", label: "Teacher/Educator" },
    { value: "school", label: "School Administrator" },
    { value: "other", label: "Other" },
  ]

  const programs = [
    { value: "", label: "Select program of interest" },
    { value: "undergraduate", label: "Undergraduate Programs" },
    { value: "graduate", label: "Graduate Programs" },
    { value: "certificate", label: "Certificate Programs" },
    { value: "online", label: "Online Learning" },
    { value: "summer", label: "Summer Programs" },
    { value: "professional", label: "Professional Development" },
    { value: "other", label: "Other" },
  ]

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="w-full min-h-[700px] bg-gradient-to-b from-sky-50 to-white p-6 md:p-10 rounded-2xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-0 right-0 text-sky-100 w-full h-64 -mt-20"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,181.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-sky-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact <span className="text-sky-600">Admissions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our programs or the application process? Our admissions team is here to help guide you
            through your educational journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="py-16 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-sky-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your inquiry has been received. An admissions counselor will contact you shortly to discuss your
                    educational goals.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="inline-flex items-center gap-2 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-all text-sm font-medium"
                  >
                    <BookOpen className="w-4 h-4" />
                    Browse Programs
                  </motion.a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Request Information</h3>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="education-first-name" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="education-first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                        placeholder="First name"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="education-last-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="education-last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                        placeholder="Last name"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="education-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="education-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="education-phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="education-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="education-role" className="block text-sm font-medium text-gray-700 mb-2">
                      I am a...
                    </label>
                    <select
                      id="education-role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="education-program" className="block text-sm font-medium text-gray-700 mb-2">
                      Program of Interest
                    </label>
                    <select
                      id="education-program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {programs.map((program) => (
                        <option key={program.value} value={program.value}>
                          {program.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="education-message" className="block text-sm font-medium text-gray-700 mb-2">
                      Questions or Comments
                    </label>
                    <textarea
                      id="education-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all resize-none"
                      placeholder="Tell us about your educational goals or any specific questions you have..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-sky-700 transition-all shadow-lg shadow-sky-500/20"
                    >
                      Submit Request
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Us</h3>

              <div className="grid grid-cols-1 gap-4">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Accredited Programs</h4>
                    <p className="text-gray-600">
                      Our programs are nationally accredited and recognized by top employers worldwide.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Expert Faculty</h4>
                    <p className="text-gray-600">
                      Learn from industry professionals and renowned academics with real-world experience.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Flexible Learning</h4>
                    <p className="text-gray-600">
                      Choose from on-campus, online, or hybrid programs to fit your schedule and learning style.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-sky-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Schedule a Campus Tour</h4>
                  <p className="text-gray-600">Experience our campus firsthand</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-all text-sm font-medium"
                >
                  Book a Tour
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  Virtual Tour
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EducationContact

