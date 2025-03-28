"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Send, CheckCircle, ArrowRight } from "lucide-react";

const PerspectiveContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
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
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 p-6 md:p-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-xl text-purple-200/80">
            Have a project in mind? Let&apos;s collaborate and bring your vision
            to life.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="perspective-1000 relative mx-auto max-w-3xl"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="relative rounded-2xl border border-white/20 bg-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-10"
          >
            <div className="absolute -left-5 -top-5 h-20 w-20">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-pink-500 to-purple-500 opacity-80 blur-md" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Send className="h-5 w-5 text-purple-600" />
                </div>
              </div>
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Message Sent!
                  </h3>
                  <p className="text-purple-200/80">
                    We&apos;ve received your message and will get back to you
                    soon.
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
                        htmlFor="perspective-name"
                        className="mb-2 block text-sm font-medium text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="perspective-name"
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
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="perspective-email"
                        className="mb-2 block text-sm font-medium text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="perspective-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="perspective-message"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="perspective-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-600 hover:to-pink-600"
                    >
                      Send Message
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* 3D effect highlights */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
              <div className="absolute bottom-0 right-0 top-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/70"
        >
          <a href="#" className="transition-colors hover:text-white">
            Twitter
          </a>
          <span>•</span>
          <a href="#" className="transition-colors hover:text-white">
            LinkedIn
          </a>
          <span>•</span>
          <a href="#" className="transition-colors hover:text-white">
            Instagram
          </a>
          <span>•</span>
          <a href="#" className="transition-colors hover:text-white">
            hello@infinityui.com
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PerspectiveContact;
