"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Plane, Calendar, MapPin } from "lucide-react";

const TravelContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    duration: "",
    travelers: "",
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
          phone: "",
          destination: "",
          travelDate: "",
          duration: "",
          travelers: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  const destinations = [
    { value: "", label: "Select destination" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "north-america", label: "North America" },
    { value: "south-america", label: "South America" },
    { value: "australia", label: "Australia & Oceania" },
    { value: "multiple", label: "Multiple Destinations" },
    { value: "not-sure", label: "Not Sure Yet" },
  ];

  const durations = [
    { value: "", label: "Select duration" },
    { value: "weekend", label: "Weekend Getaway (1-3 days)" },
    { value: "short", label: "Short Trip (4-7 days)" },
    { value: "medium", label: "Medium Trip (8-14 days)" },
    { value: "long", label: "Long Trip (15-30 days)" },
    { value: "extended", label: "Extended Trip (30+ days)" },
  ];

  const travelerOptions = [
    { value: "", label: "Select number of travelers" },
    { value: "1", label: "1 Traveler" },
    { value: "2", label: "2 Travelers" },
    { value: "3-5", label: "3-5 Travelers" },
    { value: "6-10", label: "6-10 Travelers" },
    { value: "10+", label: "More than 10 Travelers" },
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

  const destinationCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-50 to-white p-6 md:p-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 h-64 w-full text-cyan-100"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100">
              <Plane className="h-8 w-8 text-cyan-600" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Plan Your <span className="text-cyan-600">Dream Vacation</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Let our travel experts help you create the perfect getaway. Fill out
            the form below and we&apos;ll craft a personalized itinerary just
            for you.
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
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100"
                  >
                    <CheckCircle className="h-10 w-10 text-cyan-600" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Bon Voyage!
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Thank you for your travel inquiry. One of our travel
                    specialists will contact you within 24 hours to discuss your
                    dream vacation.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-cyan-700"
                  >
                    <MapPin className="h-4 w-4" />
                    Browse Destinations
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
                    <h3 className="mb-6 text-xl font-bold text-gray-900">
                      Travel Inquiry
                    </h3>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="travel-name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="travel-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="travel-email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="travel-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="travel-phone"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="travel-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="travel-destination"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Destination
                    </label>
                    <select
                      id="travel-destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {destinations.map((destination) => (
                        <option
                          key={destination.value}
                          value={destination.value}
                        >
                          {destination.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="travel-date"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Preferred Travel Date
                      </label>
                      <input
                        type="date"
                        id="travel-date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="travel-duration"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Trip Duration
                      </label>
                      <select
                        id="travel-duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {durations.map((duration) => (
                          <option key={duration.value} value={duration.value}>
                            {duration.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="travel-travelers"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Number of Travelers
                    </label>
                    <select
                      id="travel-travelers"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {travelerOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="travel-message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Additional Details
                    </label>
                    <textarea
                      id="travel-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      placeholder="Tell us about your travel preferences, interests, or any special requirements..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-700"
                    >
                      Submit Inquiry
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
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Featured Destinations
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div
                  variants={destinationCardVariants}
                  whileHover="hover"
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/x5rzloae9ypoanfsill5ugevz3qluxcjbomr6fkiwaj9hpkp"
                    alt="Santorini, Greece"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="font-bold text-white">Santorini, Greece</h4>
                    <p className="text-sm text-white/80">
                      Mediterranean paradise with stunning views
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={destinationCardVariants}
                  whileHover="hover"
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/x5rzloae9ypoanfsill5ugevz3qluxcjbomr6fkiwaj9hpkp"
                    alt="Bali, Indonesia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="font-bold text-white">Bali, Indonesia</h4>
                    <p className="text-sm text-white/80">
                      Tropical paradise with rich culture
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={destinationCardVariants}
                  whileHover="hover"
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/x5rzloae9ypoanfsill5ugevz3qluxcjbomr6fkiwaj9hpkp"
                    alt="Kyoto, Japan"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="font-bold text-white">Kyoto, Japan</h4>
                    <p className="text-sm text-white/80">
                      Ancient temples and traditional gardens
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={destinationCardVariants}
                  whileHover="hover"
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/x5rzloae9ypoanfsill5ugevz3qluxcjbomr6fkiwaj9hpkp"
                    alt="Amalfi Coast, Italy"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="font-bold text-white">
                      Amalfi Coast, Italy
                    </h4>
                    <p className="text-sm text-white/80">
                      Dramatic coastline and charming villages
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-cyan-100 bg-cyan-50 p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
                  <Calendar className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    Need Immediate Assistance?
                  </h4>
                  <p className="text-gray-600">
                    Our travel experts are ready to help
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+18001234567"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-cyan-700"
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
                  Call Us
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50"
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TravelContact;
