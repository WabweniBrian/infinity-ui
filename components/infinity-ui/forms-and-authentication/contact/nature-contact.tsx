"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Leaf } from "lucide-react";

const NatureContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const leafRefs = useRef<HTMLDivElement[]>([]);
  const controls = useAnimation();

  // Animate leaves on scroll
  useEffect(() => {
    const handleScroll = () => {
      leafRefs.current.forEach((leaf, index) => {
        if (!leaf) return;

        const scrollY = window.scrollY;
        const speed = 0.2 + (index % 3) * 0.1;
        const rotation = (scrollY * speed) % 360;
        const translateY = Math.sin(scrollY * 0.01 + index) * 10;

        leaf.style.transform = `translateY(${translateY}px) rotate(${rotation}deg)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setActiveField(field);
    controls.start({ scale: 1.02, transition: { duration: 0.3 } });
  };

  const handleBlur = () => {
    setActiveField(null);
    controls.start({ scale: 1, transition: { duration: 0.3 } });
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

  // Generate random leaves
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 16 + Math.random() * 24,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 15,
  }));

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-green-50 to-emerald-100 p-6 md:p-10">
      {/* Decorative leaves */}
      {leaves.map((leaf, index) => (
        <div
          key={leaf.id}
          ref={(el) => {
            if (el) leafRefs.current[index] = el;
          }}
          className="pointer-events-none absolute opacity-30"
          style={{
            top: leaf.top,
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animation: `float ${leaf.duration}s ease-in-out ${leaf.delay}s infinite alternate`,
          }}
        >
          <Leaf
            className="h-full w-full text-green-600"
            style={{ transform: `rotate(${Math.random() * 360}deg)` }}
          />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Image and Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="relative mb-8 h-64 overflow-hidden rounded-2xl md:h-80">
              <Image
                src="/placeholder.svg?height=320&width=480"
                alt="Nature illustration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-green-900/40 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">
                  Let&apos;s grow together
                </h3>
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-green-900 md:text-4xl">
              Connect with Nature-Inspired Design
            </h2>
            <p className="mb-6 text-green-800">
              We believe in creating sustainable, organic designs that connect
              with users on a deeper level. Reach out to start your journey with
              us.
            </p>

            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-green-800">hello@infinityui.com</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
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
                </div>
                <p className="text-green-800">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors hover:bg-green-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors hover:bg-green-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors hover:bg-green-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            animate={controls}
            className="relative overflow-hidden rounded-2xl border border-green-100 bg-white/80 p-8 shadow-lg backdrop-blur-lg"
          >
            {/* Leaf decorations */}
            <div className="absolute -right-6 -top-6 h-16 w-16 rotate-45 transform text-green-200 opacity-50">
              <Leaf className="h-full w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 h-16 w-16 -rotate-45 transform text-green-200 opacity-50">
              <Leaf className="h-full w-full" />
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-green-900">
                    Thank you!
                  </h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. We&apos;ll get back
                    to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  <h3 className="mb-6 text-2xl font-bold text-green-900">
                    Send us a message
                  </h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label
                      htmlFor="nature-name"
                      className="mb-2 block text-sm font-medium text-green-800"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="nature-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      required
                      className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="nature-email"
                      className="mb-2 block text-sm font-medium text-green-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="nature-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="nature-message"
                      className="mb-2 block text-sm font-medium text-green-800"
                    >
                      Message
                    </label>
                    <textarea
                      id="nature-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-green-200 bg-white px-4 py-3 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      placeholder="Your message here..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-600 hover:to-emerald-600"
                    >
                      Send Message
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Add CSS animation for floating leaves */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(10px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NatureContact;
