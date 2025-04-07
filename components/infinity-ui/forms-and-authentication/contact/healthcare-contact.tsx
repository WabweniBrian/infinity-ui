"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock, Shield, Phone } from "lucide-react";

const HealthcareContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    isNewPatient: "yes",
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
    setFormData((prev) => ({ ...prev, isNewPatient: e.target.value }));
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
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          appointmentType: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
          isNewPatient: "yes",
        });
      }, 3000);
    }, 1000);
  };

  const appointmentTypes = [
    { value: "", label: "Select appointment type" },
    { value: "consultation", label: "General Consultation" },
    { value: "checkup", label: "Annual Check-up" },
    { value: "followup", label: "Follow-up Appointment" },
    { value: "specialist", label: "Specialist Consultation" },
    { value: "emergency", label: "Urgent Care" },
  ];

  const timeSlots = [
    { value: "", label: "Select preferred time" },
    { value: "morning", label: "Morning (9AM - 12PM)" },
    { value: "afternoon", label: "Afternoon (12PM - 3PM)" },
    { value: "evening", label: "Evening (3PM - 6PM)" },
  ];

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50 to-white p-6 md:p-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-full">
          <svg
            className="absolute right-0 top-0 h-64 w-full text-blue-100"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
            Schedule Your Appointment
          </h2>
          <p className="mx-auto max-w-2xl text-blue-700">
            Your health is our priority. Fill out the form below to request an
            appointment with one of our healthcare professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-blue-100 bg-white p-8 shadow-xl lg:col-span-3"
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
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckCircle className="h-10 w-10 shrink-0 text-green-600" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-blue-900">
                    Appointment Request Received!
                  </h3>
                  <p className="text-blue-700">
                    Thank you for your request. Our staff will review your
                    information and contact you within 24 hours to confirm your
                    appointment.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="healthcare-first-name"
                        className="mb-2 block text-sm font-medium text-blue-900"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="healthcare-first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="John"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="healthcare-last-name"
                        className="mb-2 block text-sm font-medium text-blue-900"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="healthcare-last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Doe"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        htmlFor="healthcare-email"
                        className="mb-2 block text-sm font-medium text-blue-900"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="healthcare-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        htmlFor="healthcare-phone"
                        className="mb-2 block text-sm font-medium text-blue-900"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="healthcare-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      htmlFor="healthcare-appointment-type"
                      className="mb-2 block text-sm font-medium text-blue-900"
                    >
                      Appointment Type
                    </label>
                    <select
                      id="healthcare-appointment-type"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {appointmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label
                        htmlFor="healthcare-preferred-date"
                        className="mb-2 block text-sm font-medium text-blue-900"
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="healthcare-preferred-date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label
                        htmlFor="healthcare-preferred-time"
                        className="mb-2 block text-sm font-medium text-blue-900"
                      >
                        Preferred Time
                      </label>
                      <select
                        id="healthcare-preferred-time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="mb-2 block text-sm font-medium text-blue-900">
                      Are you a new patient?
                    </label>
                    <div className="flex gap-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="new-patient-yes"
                          name="isNewPatient"
                          value="yes"
                          checked={formData.isNewPatient === "yes"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="new-patient-yes"
                          className="ml-2 text-blue-900"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="new-patient-no"
                          name="isNewPatient"
                          value="no"
                          checked={formData.isNewPatient === "no"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="new-patient-no"
                          className="ml-2 text-blue-900"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label
                      htmlFor="healthcare-message"
                      className="mb-2 block text-sm font-medium text-blue-900"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="healthcare-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Please share any symptoms or concerns you'd like to discuss..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
                    >
                      Request Appointment
                      <Calendar className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">Office Hours</h3>
                  <ul className="space-y-1 text-blue-700">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">
                    Emergency Contact
                  </h3>
                  <p className="mb-2 text-blue-700">
                    For medical emergencies, please call our 24/7 hotline:
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    (555) 911-1234
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">Insurance</h3>
                  <p className="mb-2 text-blue-700">
                    We accept most major insurance plans. Please bring your
                    insurance card to your appointment.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#"
                    className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    View accepted insurances
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareContact;
