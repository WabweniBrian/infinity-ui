"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Bed,
  Calendar,
  Home,
  Mail,
  MapPin,
  Phone,
  ShowerHead,
  Square,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const RealEstateCta = () => {
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [loanAmount, setLoanAmount] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Property images
  const propertyImages = [
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo66WwfRzvhV0osXNSKE3eCpjGD9ukzWbgBlRm",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypopVXi2QTMstyAN5nWO1VuQDxjmXLf6dJzBC8i",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypox9xCXXtFC1a2S06AJNu9MsdPXG8D5oerTblR",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoNw1FxtevQcXsCAeDKuhTdZ6t5Ln07OGN1iEa",
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoDCA6BA2OeWJqXBEQTpvwrsimgD836Ro5tMP4",
  ];

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2);
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Property Images & Details */}
            <div>
              {/* Property image gallery */}
              <div className="relative h-[300px] md:h-[400px]">
                {propertyImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeImage === index ? 1 : 0,
                      scale: activeImage === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}

                {/* Image navigation */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {propertyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`h-2 rounded-full transition-all ${
                        activeImage === index
                          ? "w-8 bg-white"
                          : "w-2 bg-white/60"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Virtual tour button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm transition-all hover:bg-white"
                >
                  <svg
                    className="h-4 w-4 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Virtual Tour
                </motion.button>

                {/* Property status */}
                <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                  FOR SALE
                </div>
              </div>

              {/* Thumbnail navigation */}
              <div className="grid grid-cols-5 gap-2 p-2">
                {propertyImages.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative h-16 cursor-pointer overflow-hidden rounded-md ${
                      activeImage === index ? "ring-2 ring-emerald-500" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Property thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Property details */}
              <div className="p-6">
                <motion.div
                  variants={itemVariants}
                  className="mb-2 flex items-center gap-2 text-sm text-gray-500"
                >
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <span>123 Willow Creek Drive, Beverly Hills, CA 90210</span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="mb-4 text-2xl font-bold text-gray-900"
                >
                  Luxury Modern Villa with Pool
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="mb-4 text-3xl font-bold text-emerald-600"
                >
                  $1,250,000
                </motion.div>

                {/* Property features */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 flex flex-wrap gap-6"
                >
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">4 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShowerHead className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">3.5 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">3,200 sq ft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">Built in 2020</span>
                  </div>
                </motion.div>

                {/* Property description */}
                <motion.p
                  variants={itemVariants}
                  className="mb-6 text-gray-600"
                >
                  This stunning modern villa offers luxurious living with
                  high-end finishes throughout. Featuring an open floor plan,
                  gourmet kitchen, private pool, and breathtaking views. Located
                  in a prestigious neighborhood with top-rated schools and
                  amenities.
                </motion.p>

                {/* Key features */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Key Features:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Gourmet Kitchen",
                      "Swimming Pool",
                      "Home Theater",
                      "Smart Home System",
                      "Wine Cellar",
                      "3-Car Garage",
                      "Outdoor Kitchen",
                      "Solar Panels",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Content - Tabs for Contact, Calculator, etc. */}
            <div className="border-t border-gray-200 p-6 md:border-l md:border-t-0">
              {/* Tabs */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex border-b border-gray-200">
                  {[
                    "Contact Agent",
                    "Mortgage Calculator",
                    "Schedule Tour",
                  ].map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`relative flex-1 py-3 text-sm font-medium transition-all ${
                        activeTab === index
                          ? "text-emerald-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                      {activeTab === index && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Tab content */}
              <div className="min-h-[400px]">
                {/* Contact Agent Tab */}
                {activeTab === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6 flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src="/images/1.png"
                          alt="Real Estate Agent"
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-medium text-gray-900">
                          Jennifer Davis
                        </div>
                        <div className="text-sm text-gray-500">
                          Luxury Property Specialist
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                              <svg
                                key={i}
                                className="h-4 w-4 fill-yellow-400"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            (128 reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Your Name
                        </label>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                          <User className="h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          placeholder="I'm interested in this property and would like more information..."
                          rows={4}
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none placeholder:text-gray-400"
                        ></textarea>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                    >
                      Contact Agent
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Mortgage Calculator Tab */}
                {activeTab === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6">
                      <div className="mb-4 text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          ${calculateMonthlyPayment()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Estimated Monthly Payment
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                              Home Price: ${loanAmount.toLocaleString()}
                            </label>
                          </div>
                          <input
                            type="range"
                            min="100000"
                            max="2000000"
                            step="10000"
                            value={loanAmount}
                            onChange={(e) =>
                              setLoanAmount(Number.parseInt(e.target.value))
                            }
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                          />
                        </div>

                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                              Down Payment: ${downPayment.toLocaleString()} (
                              {((downPayment / loanAmount) * 100).toFixed(0)}%)
                            </label>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={loanAmount * 0.5}
                            step="5000"
                            value={downPayment}
                            onChange={(e) =>
                              setDownPayment(Number.parseInt(e.target.value))
                            }
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                          />
                        </div>

                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                              Interest Rate: {interestRate}%
                            </label>
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="8"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) =>
                              setInterestRate(Number.parseFloat(e.target.value))
                            }
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                          />
                        </div>

                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                              Loan Term: {loanTerm} years
                            </label>
                          </div>
                          <div className="flex gap-2">
                            {[15, 20, 30].map((term) => (
                              <button
                                key={term}
                                onClick={() => setLoanTerm(term)}
                                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                                  loanTerm === term
                                    ? "bg-emerald-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {term} Years
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 text-sm font-medium text-gray-700">
                        Payment Breakdown
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Principal & Interest
                          </span>
                          <span className="font-medium text-gray-900">
                            ${calculateMonthlyPayment()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Property Taxes (est.)
                          </span>
                          <span className="font-medium text-gray-900">
                            $625
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Home Insurance (est.)
                          </span>
                          <span className="font-medium text-gray-900">
                            $175
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex items-center justify-between font-medium">
                            <span className="text-gray-700">
                              Total Monthly Payment
                            </span>
                            <span className="text-emerald-600">
                              $
                              {(
                                parseFloat(calculateMonthlyPayment() || "0") +
                                625 +
                                175
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 rounded-lg bg-emerald-600 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                      >
                        Get Pre-Approved
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                      >
                        Save Calculation
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Schedule Tour Tab */}
                {activeTab === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6">
                      <div className="mb-4 text-center">
                        <div className="text-lg font-medium text-gray-900">
                          Schedule a Tour
                        </div>
                        <div className="text-sm text-gray-500">
                          Choose your preferred date and time to visit this
                          property
                        </div>
                      </div>

                      {/* Tour options */}
                      <div className="mb-4 flex gap-2">
                        {["In-Person Tour", "Video Tour"].map(
                          (option, index) => (
                            <button
                              key={index}
                              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                                index === 0
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {option}
                            </button>
                          ),
                        )}
                      </div>

                      {/* Calendar */}
                      <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>
                          <div className="font-medium text-gray-900">
                            June 2023
                          </div>
                          <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center text-sm">
                          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                            <div key={i} className="py-1 text-gray-500">
                              {day}
                            </div>
                          ))}

                          {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const isToday = day === 15;
                            const isSelected = day === 18;
                            const isAvailable = ![
                              1, 2, 3, 7, 13, 20, 27,
                            ].includes(day);

                            return (
                              <button
                                key={i}
                                disabled={!isAvailable}
                                className={`rounded-full p-1 ${
                                  isSelected
                                    ? "bg-emerald-600 text-white"
                                    : isToday
                                      ? "border border-emerald-600 text-emerald-600"
                                      : isAvailable
                                        ? "hover:bg-gray-100"
                                        : "cursor-not-allowed text-gray-300"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      <div className="mb-6">
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Available Time Slots
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            "10:00 AM",
                            "11:30 AM",
                            "1:00 PM",
                            "2:30 PM",
                            "4:00 PM",
                            "5:30 PM",
                          ].map((time, i) => (
                            <button
                              key={i}
                              className={`rounded-lg border py-2 text-sm transition-all ${
                                i === 2
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                                  : "border-gray-200 hover:border-emerald-600 hover:bg-emerald-50"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contact info */}
                      <div className="mb-6 space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Your Name
                          </label>
                          <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                            <User className="h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                    >
                      <Calendar className="h-5 w-5" />
                      Schedule Tour
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealEstateCta;
