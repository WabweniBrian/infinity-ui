"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, DollarSign, Shield, LineChart, Lock } from "lucide-react"

const FinanceContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    accountType: "",
    message: "",
    preferredContact: "email",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, preferredContact: e.target.value }))
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
          serviceType: "",
          accountType: "",
          message: "",
          preferredContact: "email",
        })
      }, 3000)
    }, 1000)
  }

  const serviceTypes = [
    { value: "", label: "Select service type" },
    { value: "banking", label: "Personal Banking" },
    { value: "business", label: "Business Banking" },
    { value: "investment", label: "Investment Services" },
    { value: "loans", label: "Loans & Mortgages" },
    { value: "retirement", label: "Retirement Planning" },
    { value: "insurance", label: "Insurance Products" },
    { value: "other", label: "Other Services" },
  ]

  const accountTypes = [
    { value: "", label: "Select account type" },
    { value: "checking", label: "Checking Account" },
    { value: "savings", label: "Savings Account" },
    { value: "business", label: "Business Account" },
    { value: "investment", label: "Investment Account" },
    { value: "retirement", label: "Retirement Account" },
    { value: "none", label: "No Account Yet" },
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

  const featureVariants = {
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
    <div className="w-full min-h-[700px] bg-gradient-to-b from-slate-50 to-white p-6 md:p-10 rounded-2xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <svg className="absolute top-0 right-0 opacity-10" width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern id="finance-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-slate-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#finance-grid)" />
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
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Financial <span className="text-green-600">Consultation</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Speak with our financial experts to get personalized advice on banking, investments, and financial planning
            tailored to your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
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
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received</h3>
                  <p className="text-slate-600 mb-6">
                    Thank you for contacting us. A financial advisor will reach out to you within one business day to
                    discuss your financial needs.
                  </p>
                  <p className="text-sm text-slate-500">
                    Reference #: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </p>
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
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Contact a Financial Advisor</h3>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="finance-first-name" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="finance-first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="First name"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="finance-last-name" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="finance-last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="Last name"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="finance-email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="finance-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="finance-phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="finance-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="finance-service-type" className="block text-sm font-medium text-slate-700 mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="finance-service-type"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="finance-account-type" className="block text-sm font-medium text-slate-700 mb-2">
                      Current Account Type
                    </label>
                    <select
                      id="finance-account-type"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {accountTypes.map((account) => (
                        <option key={account.value} value={account.value}>
                          {account.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="finance-message" className="block text-sm font-medium text-slate-700 mb-2">
                      How Can We Help You?
                    </label>
                    <textarea
                      id="finance-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                      placeholder="Please describe your financial goals or questions..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Contact Method</label>
                    <div className="flex gap-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="contact-email"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={handleRadioChange}
                          className="w-4 h-4 text-green-600 border-slate-300 focus:ring-green-500"
                        />
                        <label htmlFor="contact-email" className="ml-2 text-slate-700">
                          Email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="contact-phone"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={handleRadioChange}
                          className="w-4 h-4 text-green-600 border-slate-300 focus:ring-green-500"
                        />
                        <label htmlFor="contact-phone" className="ml-2 text-slate-700">
                          Phone
                        </label>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-500/20"
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Our Financial Services</h3>

              <div className="grid grid-cols-1 gap-4">
                <motion.div
                  variants={featureVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <LineChart className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Investment Planning</h4>
                    <p className="text-slate-600">
                      Personalized investment strategies to help you achieve your financial goals with confidence.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={featureVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Mortgage Solutions</h4>
                    <p className="text-slate-600">
                      Competitive rates and flexible terms to help you find the perfect home financing option.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={featureVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Retirement Planning</h4>
                    <p className="text-slate-600">
                      Secure your future with our comprehensive retirement planning services and solutions.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-800 p-6 rounded-xl text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Secure Banking</h4>
                  <p className="text-slate-300">Your financial security is our top priority</p>
                </div>
              </div>

              <p className="text-slate-300 mb-4">
                Our online banking platform uses industry-leading encryption and multi-factor authentication to keep
                your financial information safe and secure.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Online Banking
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-all text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Live Support
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FinanceContact

