"use client";

import { motion, useAnimation } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Heart,
  Shield,
  User,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const HealthcareHero = () => {
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState(0);

  // Services data
  const services = [
    { name: "Primary Care", icon: User },
    { name: "Cardiology", icon: Heart },
    { name: "Pediatrics", icon: User },
    { name: "Mental Health", icon: Activity },
  ];

  // Doctors data
  const doctors = [
    {
      name: "Dr. Wabweni Brian",
      specialty: "Cardiologist",
      rating: 4.9,
      availability: "Available Today",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoBr65FLq9k2zJh4F5OKicHTlarv3YGQjpDZbw",
    },
    {
      name: "Dr. Sarah Chen",
      specialty: "Family Medicine",
      rating: 4.8,
      availability: "Next Available: Tomorrow",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoHRKBF64LPQRizs519hDeHlYBAUcyNFxWk2M6",
    },
  ];

  // Start animations when component mounts
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
        delayChildren: 0.3,
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

  // Health metrics animation
  const healthMetrics = [
    { label: "Heart Rate", value: "72", unit: "bpm", color: "text-red-500" },
    {
      label: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      color: "text-blue-500",
    },
    { label: "Oxygen", value: "98", unit: "%", color: "text-teal-500" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-blue-100 opacity-50 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-40 right-0 h-[300px] w-[300px] rounded-full bg-teal-100 opacity-50 blur-3xl"
        />

        {/* DNA helix decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute right-10 top-10 h-[200px] w-[100px]"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="relative">
              <motion.div
                animate={{
                  x: [0, 20, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="absolute h-2 w-2 rounded-full bg-blue-500"
                style={{ top: i * 20 }}
              />
              <motion.div
                animate={{
                  x: [0, -20, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="absolute h-2 w-2 rounded-full bg-teal-500"
                style={{ top: i * 20, right: 0 }}
              />
            </div>
          ))}
        </motion.div>
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
              Your Health, Our Priority
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Modern healthcare{" "}
              <span className="relative text-blue-600">
                for everyone
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-blue-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Experience personalized care with our team of expert doctors. Book
              appointments online, access your health records, and receive the
              care you deserve.
            </motion.p>

            {/* Appointment Booking */}
            <motion.div
              variants={itemVariants}
              className="mb-8 rounded-xl bg-white shadow-md"
            >
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                {["Book Appointment", "Virtual Visit", "Find Doctor"].map(
                  (tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`relative flex-1 px-4 py-3 text-sm font-medium transition-all ${
                        activeTab === index
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                      {activeTab === index && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </button>
                  ),
                )}
              </div>

              {/* Form fields */}
              <div className="p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="specialty"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Specialty
                    </label>
                    <div className="relative">
                      <select
                        id="specialty"
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 outline-none"
                      >
                        <option value="" disabled selected>
                          Select specialty
                        </option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="pediatrics">Pediatrics</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="appointment-date"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <div className="relative flex items-center rounded-lg border border-gray-300">
                      <div className="pointer-events-none absolute left-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="appointment-date"
                        type="datetime-local"
                        className="w-full bg-transparent py-2 pl-10 pr-3 text-sm outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all hover:bg-blue-700">
                  Find Appointments
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Our Services
              </div>
              <div className="flex flex-wrap gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <service.icon className="h-4 w-4 text-blue-500" />
                    {service.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Shield className="h-4 w-4" />
                Insurance Info
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                <span>
                  <strong className="font-bold text-gray-900">50+</strong>{" "}
                  Specialists
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>
                  <strong className="font-bold text-gray-900">24/7</strong>{" "}
                  Support
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Health Dashboard */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Health dashboard */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="bg-blue-600 p-4 text-white">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-lg font-bold">Health Dashboard</div>
                    <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      Updated 2h ago
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-white">
                      <Image
                        src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxC0nRZtFC1a2S06AJNu9MsdPXG8D5oerTblR"
                        alt="Patient"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Jessica Thompson</div>
                      <div className="text-xs text-white/80">
                        Patient ID: #38291
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health metrics */}
                <div className="p-4">
                  <div className="mb-4 text-sm font-medium text-gray-700">
                    Vital Signs
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {healthMetrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                        className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                        <div className="flex items-end gap-1">
                          <motion.div
                            className={`text-2xl font-bold ${metric.color}`}
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              duration: index === 0 ? 0.8 : 1.2,
                              repeatDelay: 1,
                            }}
                          >
                            {metric.value}
                          </motion.div>
                          <div className="text-xs text-gray-500">
                            {metric.unit}
                          </div>
                        </div>

                        {/* Mini chart */}
                        <div className="mt-2 flex h-6 items-end gap-1">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: "30%" }}
                              animate={{
                                height: `${30 + Math.random() * 70}%`,
                              }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                duration: 2,
                                delay: i * 0.2,
                              }}
                              className={`w-1 rounded-sm ${
                                index === 0
                                  ? "bg-red-200"
                                  : index === 1
                                    ? "bg-blue-200"
                                    : "bg-teal-200"
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Upcoming appointments */}
                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">
                        Upcoming Appointments
                      </div>
                      <div className="text-xs font-medium text-blue-600">
                        View All
                      </div>
                    </div>

                    <div className="space-y-3">
                      {doctors.map((doctor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 1.2 + index * 0.2,
                            duration: 0.5,
                          }}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                        >
                          <div className="h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={
                                doctor.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={doctor.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {doctor.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {doctor.specialty}
                            </div>
                          </div>

                          <div className="text-right">
                            <div
                              className={`text-xs font-medium ${index === 0 ? "text-green-600" : "text-blue-600"}`}
                            >
                              {doctor.availability}
                            </div>
                            <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {doctor.rating}
                            </div>
                          </div>
                        </motion.div>
                      ))}
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
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Health Tip</div>
                    <div className="text-gray-600">Stay hydrated!</div>
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
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      Medication Reminder
                    </div>
                    <div className="text-gray-600">Next dose in 2 hours</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthcareHero;
