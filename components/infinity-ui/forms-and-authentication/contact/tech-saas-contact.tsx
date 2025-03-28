"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Code, Server, Database, Globe } from "lucide-react";

const TechSaasContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
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
          company: "",
          projectType: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

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

  const iconBoxVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const projectTypes = [
    { value: "", label: "Select project type" },
    { value: "web-app", label: "Web Application" },
    { value: "mobile-app", label: "Mobile Application" },
    { value: "api", label: "API Integration" },
    { value: "cloud", label: "Cloud Migration" },
    { value: "ai", label: "AI/ML Solution" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-slate-50 p-6 md:p-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-full">
          <svg
            className="absolute right-0 top-0 opacity-10"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
          >
            <defs>
              <pattern
                id="tech-grid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-slate-300"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#tech-grid)" />
          </svg>

          <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Innovative
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Ready to transform your business with cutting-edge technology? Our
            team of experts is here to help you build the perfect solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl"
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
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    Request Received!
                  </h3>
                  <p className="text-slate-600">
                    Thanks for reaching out! Our tech team will analyze your
                    requirements and get back to you within 24 hours.
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
                      htmlFor="tech-name"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="tech-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="tech-email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="tech-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="john@company.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="tech-company"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="tech-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Acme Inc."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="tech-project-type"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Project Type
                    </label>
                    <select
                      id="tech-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="tech-message"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="tech-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Tell us about your project requirements..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-cyan-600"
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
            className="flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                Why work with us?
              </h3>
              <p className="mb-6 text-slate-600">
                We specialize in building scalable, secure, and high-performance
                applications using the latest technologies. Our team of experts
                will guide you through every step of the development process.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  variants={iconBoxVariants}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Custom Development
                    </h4>
                    <p className="text-sm text-slate-500">
                      Tailored solutions for your unique needs
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={iconBoxVariants}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-100">
                    <Server className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Cloud Solutions
                    </h4>
                    <p className="text-sm text-slate-500">
                      Scalable infrastructure for growth
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={iconBoxVariants}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Data Analytics
                    </h4>
                    <p className="text-sm text-slate-500">
                      Turn your data into insights
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={iconBoxVariants}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-100">
                    <Globe className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      API Integration
                    </h4>
                    <p className="text-sm text-slate-500">
                      Connect with any service
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                  <svg
                    className="h-6 w-6 text-blue-400"
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
                <h4 className="text-xl font-bold">
                  Need help choosing a solution?
                </h4>
              </div>
              <p className="mb-4 text-slate-300">
                Schedule a free consultation with our technical team to discuss
                your project requirements and find the best approach.
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="inline-flex items-center gap-2 font-medium text-blue-400 hover:text-blue-300"
              >
                Book a consultation
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TechSaasContact;
