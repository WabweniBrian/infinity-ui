"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const FloatingContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;

    const rect = formRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 100);
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="flex min-h-[600px] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-12">
      <motion.div
        ref={formRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, z: 100 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Decorative elements */}
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="relative h-12 w-12">
              <Image
                src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Get in touch
            </h2>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle className="mb-4 h-16 w-16 text-green-400" />
              <h3 className="mb-2 text-2xl font-bold text-white">
                Message sent!
              </h3>
              <p className="text-white/80">
                We&apos;ll be in touch with you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="floating-name"
                  className="mb-1 block text-sm font-medium text-white/80"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="floating-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="floating-email"
                  className="mb-1 block text-sm font-medium text-white/80"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="floating-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="floating-message"
                  className="mb-1 block text-sm font-medium text-white/80"
                >
                  Message
                </label>
                <textarea
                  id="floating-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  placeholder="How can we help you?"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:from-purple-600 hover:to-blue-600"
              >
                Send Message
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-between text-sm text-white/60"
          >
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Twitter
              </a>
              <a href="#" className="transition-colors hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Instagram
              </a>
            </div>
            <div>
              <p>hello@infinityui.com</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingContact;
