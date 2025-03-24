"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Send,
  X,
} from "lucide-react";

const ExpandingContactFooter = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("message");

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <footer className="relative overflow-hidden bg-slate-50 text-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Infinity UI</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-emerald-500"></div>
            <p className="text-slate-600">
              Beautiful UI components for modern web applications.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-600"
                  >
                    <Icon size={18} />
                  </motion.a>
                ),
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Blog",
                "Contact",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="#"
                    className="block transition-colors hover:text-emerald-600"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "Tutorials",
                "Components",
                "Templates",
                "Support",
                "FAQ",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="#"
                    className="block transition-colors hover:text-emerald-600"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <p className="text-slate-600">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
            <motion.button
              onClick={toggleContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 border-t border-slate-200 pt-8 text-center"
        >
          <p className="text-slate-600">
            © {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-slate-600 transition-colors hover:text-emerald-600"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </motion.div>
      </div>

      {/* Expanding Contact Form */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={toggleContact}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Get in Touch
                </h2>
                <p className="text-slate-600">
                  We&apos;d love to hear from you. How can we help?
                </p>
              </div>

              <div className="mb-6 flex space-x-2 border-b border-slate-200">
                <button
                  onClick={() => setActiveTab("message")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === "message"
                      ? "border-b-2 border-emerald-600 text-emerald-600"
                      : "text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  Send Message
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === "info"
                      ? "border-b-2 border-emerald-600 text-emerald-600"
                      : "text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  Contact Info
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "message" ? (
                  <motion.form
                    key="message-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1 block text-sm font-medium text-slate-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1 block text-sm font-medium text-slate-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1 block text-sm font-medium text-slate-700"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Subject"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1 block text-sm font-medium text-slate-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Your message"
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                      <Send size={18} className="mr-2" />
                      Send Message
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {[
                        {
                          icon: MapPin,
                          title: "Our Location",
                          content: "123 UI Street, Web City, Internet, 12345",
                          color: "bg-blue-100 text-blue-600",
                        },
                        {
                          icon: Phone,
                          title: "Phone Number",
                          content: "+1 (555) 123-4567",
                          color: "bg-emerald-100 text-emerald-600",
                        },
                        {
                          icon: Mail,
                          title: "Email Address",
                          content: "hello@infinityui.com",
                          color: "bg-amber-100 text-amber-600",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -5 }}
                          className="rounded-lg bg-white p-6 text-center shadow-sm"
                        >
                          <div
                            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-opacity-20"
                            style={{
                              backgroundColor: item.color.split(" ")[0],
                            }}
                          >
                            <item.icon
                              className={item.color.split(" ")[1]}
                              size={24}
                            />
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-slate-800">
                            {item.title}
                          </h3>
                          <p className="text-slate-600">{item.content}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-slate-100 p-6">
                      <h3 className="mb-4 text-lg font-semibold text-slate-800">
                        Business Hours
                      </h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="flex justify-between rounded-md bg-white p-2">
                          <span className="font-medium">Monday - Friday</span>
                          <span>9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between rounded-md bg-white p-2">
                          <span className="font-medium">Saturday</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between rounded-md bg-white p-2">
                          <span className="font-medium">Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {[Twitter, Facebook, Instagram, Linkedin, Github].map(
                        (Icon, i) => (
                          <motion.a
                            key={i}
                            href="#"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full bg-slate-200 p-3 text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-600"
                          >
                            <Icon size={20} />
                          </motion.a>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default ExpandingContactFooter;
