"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MessageSquare, User } from "lucide-react";

const CreativeContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-[700px] w-full rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="relative mb-8 h-64 md:h-96">
              <Image
                src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                alt="Contact illustration"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-teal-900 md:text-4xl">
              Let&apos;s create something amazing together
            </h2>
            <p className="mb-6 text-teal-700">
              Have a project in mind? We&apos;d love to hear about it. Drop us a
              message and let&apos;s start a conversation.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <motion.a
                variants={itemVariants}
                href="#"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-teal-600 shadow-sm transition-all hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100">
                  <svg
                    className="h-3 w-3 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </span>
                Twitter
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="#"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-teal-600 shadow-sm transition-all hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100">
                  <svg
                    className="h-3 w-3 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </span>
                LinkedIn
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="#"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-teal-600 shadow-sm transition-all hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100">
                  <svg
                    className="h-3 w-3 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                GitHub
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl"
          >
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-cyan-100" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-32 w-32 rounded-full bg-teal-100" />

            <div className="relative z-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                    <CheckCircle className="h-10 w-10 text-teal-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    Message sent!
                  </h3>
                  <p className="text-gray-600">
                    Thanks for reaching out! We&apos;ll get back to you as soon
                    as possible.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="mb-6 text-2xl font-bold text-gray-800">
                    Send us a message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      className="relative"
                      animate={{
                        y: activeField === "name" ? -4 : 0,
                      }}
                    >
                      <div
                        className={`absolute left-3 top-3 transition-all ${activeField === "name" || formData.name ? "text-teal-500" : "text-gray-400"}`}
                      >
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        id="creative-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        placeholder="Your name"
                      />
                    </motion.div>

                    <motion.div
                      className="relative"
                      animate={{
                        y: activeField === "email" ? -4 : 0,
                      }}
                    >
                      <div
                        className={`absolute left-3 top-3 transition-all ${activeField === "email" || formData.email ? "text-teal-500" : "text-gray-400"}`}
                      >
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        type="email"
                        id="creative-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        placeholder="Your email"
                      />
                    </motion.div>

                    <motion.div
                      className="relative"
                      animate={{
                        y: activeField === "message" ? -4 : 0,
                      }}
                    >
                      <div
                        className={`absolute left-3 top-3 transition-all ${activeField === "message" || formData.message ? "text-teal-500" : "text-gray-400"}`}
                      >
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <textarea
                        id="creative-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        required
                        rows={5}
                        className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        placeholder="Your message"
                      />
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:from-teal-600 hover:to-cyan-600"
                    >
                      Send Message
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreativeContact;
