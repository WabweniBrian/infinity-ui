"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Home, MapPin, Phone, Mail } from "lucide-react";

const RealEstateContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    location: "",
    message: "",
    contactPreference: "email",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, contactPreference: e.target.value }));
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
          phone: "",
          propertyType: "",
          budget: "",
          location: "",
          message: "",
          contactPreference: "email",
        });
      }, 3000);
    }, 1000);
  };

  const propertyTypes = [
    { value: "", label: "Select property type" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condominium" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial Property" },
  ];

  const budgetRanges = [
    { value: "", label: "Select budget range" },
    { value: "under-200k", label: "Under $200,000" },
    { value: "200k-500k", label: "$200,000 - $500,000" },
    { value: "500k-1m", label: "$500,000 - $1,000,000" },
    { value: "1m-2m", label: "$1,000,000 - $2,000,000" },
    { value: "over-2m", label: "Over $2,000,000" },
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

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:p-10">
      {/* Background elements */}
      <div className="absolute right-0 top-0 z-0 h-full w-1/3 bg-amber-50" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Find Your Dream{" "}
                  <span className="text-amber-600">Property</span>
                </h2>
                <p className="mb-6 text-gray-600">
                  Whether you&apos;re looking to buy, sell, or rent, our team of
                  experienced real estate professionals is here to help you
                  every step of the way.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <Home className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Premium Properties
                    </h3>
                    <p className="text-gray-600">
                      Access to exclusive listings in prime locations with
                      exceptional amenities and features.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Financing Options
                    </h3>
                    <p className="text-gray-600">
                      Guidance on mortgage options, pre-approvals, and financial
                      planning for your property purchase.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Trusted Advisors
                    </h3>
                    <p className="text-gray-600">
                      Our experienced agents provide personalized service and
                      expert advice throughout your real estate journey.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="aspect-video">
                <Image
                  src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  alt="Luxury property"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="max-w-xs rounded-lg bg-white/90 p-4 backdrop-blur-sm">
                  <h3 className="mb-1 text-lg font-bold text-gray-900">
                    Featured Property
                  </h3>
                  <p className="mb-2 text-sm text-gray-700">
                    Luxury Waterfront Villa with panoramic ocean views
                  </p>
                  <p className="font-bold text-amber-600">$2,450,000</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
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
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100"
                  >
                    <CheckCircle className="h-10 w-10 text-amber-600" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Request Received!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for your interest! One of our real estate agents
                    will contact you shortly to discuss your property needs.
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
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">
                      Contact a Real Estate Agent
                    </h3>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="real-estate-name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="real-estate-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="real-estate-email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="real-estate-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="real-estate-phone"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="real-estate-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="real-estate-property-type"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Property Type
                    </label>
                    <select
                      id="real-estate-property-type"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="real-estate-budget"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Budget Range
                      </label>
                      <select
                        id="real-estate-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="real-estate-location"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        id="real-estate-location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="City, State or Neighborhood"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="real-estate-message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Additional Requirements
                    </label>
                    <textarea
                      id="real-estate-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="Tell us more about what you're looking for (bedrooms, bathrooms, amenities, etc.)"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="contact-email"
                          name="contactPreference"
                          value="email"
                          checked={formData.contactPreference === "email"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <label
                          htmlFor="contact-email"
                          className="ml-2 text-gray-700"
                        >
                          Email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="contact-phone"
                          name="contactPreference"
                          value="phone"
                          checked={formData.contactPreference === "phone"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <label
                          htmlFor="contact-phone"
                          className="ml-2 text-gray-700"
                        >
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
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-medium text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-700"
                    >
                      Submit Request
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-gray-200 pt-8 md:grid-cols-3"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <MapPin className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Office Location</h4>
              <p className="text-gray-600">
                123 Luxury Lane, Beverly Hills, CA 90210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Phone className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Phone</h4>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Mail className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Email</h4>
              <p className="text-gray-600">info@luxuryestates.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealEstateContact;
