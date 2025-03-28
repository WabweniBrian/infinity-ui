"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  ShoppingBag,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

const EcommerceContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    inquiryType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          orderNumber: "",
          inquiryType: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  const inquiryTypes = [
    { value: "", label: "Select inquiry type" },
    { value: "order-status", label: "Order Status" },
    { value: "returns", label: "Returns & Exchanges" },
    { value: "product", label: "Product Information" },
    { value: "payment", label: "Payment Issues" },
    { value: "shipping", label: "Shipping & Delivery" },
    { value: "other", label: "Other" },
  ];

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-rose-50 to-white p-6 md:p-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute right-0 top-0 -mt-20 h-64 w-full text-rose-100"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <ShoppingBag className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Customer Support
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Need help with your order or have questions about our products? Our
            customer support team is here to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100"
                  >
                    <CheckCircle className="h-10 w-10 text-rose-600" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Request Received!
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Thank you for contacting our customer support. We&apos;ve
                    received your inquiry and will respond within 24 hours.
                  </p>
                  <p className="text-sm text-gray-500">
                    Reference #:{" "}
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
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
                    <label
                      htmlFor="ecommerce-name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="ecommerce-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="ecommerce-email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="ecommerce-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="ecommerce-order-number"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      id="ecommerce-order-number"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      placeholder="e.g. ORD-12345678"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="ecommerce-inquiry-type"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="ecommerce-inquiry-type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="ecommerce-message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="ecommerce-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3 font-medium text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-700"
                    >
                      Submit Request
                      <Send className="h-4 w-4" />
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
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Quick Help
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100">
                    <Truck className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">Shipping</h4>
                    <p className="text-sm text-gray-600">
                      Track your order or check delivery times
                    </p>
                    <a
                      href="#"
                      className="mt-1 inline-block text-sm font-medium text-rose-600 hover:text-rose-700"
                    >
                      Track Order →
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100">
                    <RotateCcw className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">Returns</h4>
                    <p className="text-sm text-gray-600">
                      Start a return or check return status
                    </p>
                    <a
                      href="#"
                      className="mt-1 inline-block text-sm font-medium text-rose-600 hover:text-rose-700"
                    >
                      Return Policy →
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100">
                    <CreditCard className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">Payment</h4>
                    <p className="text-sm text-gray-600">
                      View payment options and manage billing
                    </p>
                    <a
                      href="#"
                      className="mt-1 inline-block text-sm font-medium text-rose-600 hover:text-rose-700"
                    >
                      Payment Options →
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100">
                    <svg
                      className="h-5 w-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">FAQs</h4>
                    <p className="text-sm text-gray-600">
                      Find answers to common questions
                    </p>
                    <a
                      href="#"
                      className="mt-1 inline-block text-sm font-medium text-rose-600 hover:text-rose-700"
                    >
                      View FAQs →
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-xl border border-rose-100 bg-rose-50 p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Product support"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    Need immediate assistance?
                  </h4>
                  <p className="text-gray-600">
                    Our support team is available 24/7
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rose-700"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Live Chat
                </a>
                <a
                  href="tel:+18001234567"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  1-800-123-4567
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceContact;
