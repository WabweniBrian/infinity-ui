"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ConsultationBookingCta = () => {
  const controls = useAnimation();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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

  // Sample dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      weekday: date.toLocaleString("default", { weekday: "short" }),
      full: date.toISOString().split("T")[0],
    };
  });

  // Sample time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Consultant Info */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white md:p-10">
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <MessageCircle className="h-3 w-3" />
                  FREE CONSULTATION
                </div>

                <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                  Book Your Strategy Session
                </h2>

                <p className="text-blue-100">
                  Schedule a free 30-minute consultation with our expert team to
                  discuss your needs and how we can help you achieve your goals.
                </p>
              </motion.div>

              {/* Consultant profile */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-center gap-4"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/30">
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypomfLdI2Mcq2hSYiK0RjVdusB8bOIWnCQy9fpv"
                    alt="Consultant"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">Wabweni Brian</div>
                  <div className="text-sm text-blue-200">
                    Senior Strategy Consultant
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-blue-200">
                      (128 reviews)
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* What to expect */}
              <motion.div
                variants={itemVariants}
                className="mb-6 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
              >
                <h3 className="mb-3 font-medium">What to expect:</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Personalized assessment of your current situation",
                    "Strategic recommendations tailored to your goals",
                    "Clear action steps to move forward",
                    "Q&A session to address your specific questions",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="mt-1 h-4 w-4 flex-shrink-0 text-blue-300"
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
              >
                <p className="mb-3 text-sm italic text-blue-100">
                  &quot;The consultation was incredibly valuable. The team
                  provided insights that completely transformed our approach and
                  led to a 40% increase in conversions.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-white/30">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoZPrIJnh2BRxjvs0lePWdUT3JIKoAfbgqLw8z"
                      alt="Client"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Michael Rodriguez</div>
                    <div className="text-xs text-blue-200">
                      Marketing Director, TechCorp
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Booking Form */}
            <div className="p-8 md:p-10">
              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Schedule Your Free Consultation
                </h3>
                <p className="text-gray-600">
                  Select a date and time that works for you, and we&apos;ll
                  confirm your appointment.
                </p>
              </motion.div>

              {/* Date selection */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select a Date
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(index)}
                      className={`flex flex-col items-center rounded-lg p-2 text-center transition-all ${
                        selectedDate === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xs">{date.weekday}</span>
                      <span className="text-lg font-bold">{date.day}</span>
                      <span className="text-xs">{date.month}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Time selection */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select a Time
                </label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(index)}
                      className={`flex items-center justify-center rounded-lg py-2 text-sm transition-all ${
                        selectedTime === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Contact information */}
              <motion.div variants={itemVariants} className="mb-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    What would you like to discuss? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you'd like to discuss during the consultation..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none placeholder:text-gray-400"
                  ></textarea>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                <Calendar className="h-5 w-5" />
                Book Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500"
              >
                <Clock className="h-4 w-4" />
                <span>30-minute session • No obligation • 100% free</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationBookingCta;
