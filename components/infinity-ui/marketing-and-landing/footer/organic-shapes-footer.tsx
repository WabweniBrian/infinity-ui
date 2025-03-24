"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  ArrowRight,
} from "lucide-react";

const OrganicShapesFooter = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-green-50 pb-16 pt-32 text-gray-800"
    >
      {/* Organic Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.3))",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -right-1/4 top-1/4 h-1/2 w-1/2 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.3))",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute -bottom-1/4 left-1/4 h-1/2 w-1/2 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.3))",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* SVG Blob Divider */}
      <div className="leading-0 absolute left-0 top-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-32 w-full"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-green-50"
          ></path>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <div className="mb-6">
              <div className="flex items-center">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600">
                  <span className="text-xl font-bold text-white">∞</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Infinity UI
                </h2>
              </div>
            </div>

            <p className="mb-6 text-gray-600">
              Organic, nature-inspired UI components for sustainable web design.
              Creating interfaces that feel natural and harmonious.
            </p>

            <div className="mb-8 flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-white p-2 text-gray-600 shadow-sm transition-colors hover:bg-green-100 hover:text-green-600"
                  >
                    <Icon size={18} />
                  </motion.a>
                ),
              )}
            </div>

            <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Get in Touch
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "123 Nature Lane, Green Valley" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: Mail, text: "hello@infinityui.com" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <item.icon size={16} />
                    </div>
                    <span className="mt-1 text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Middle Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Explore
                </h3>
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
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        href="#"
                        className="flex items-center text-gray-600 transition-colors hover:text-green-600"
                      >
                        <ArrowRight size={14} className="mr-2 text-green-500" />
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Resources
                </h3>
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
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        href="#"
                        className="flex items-center text-gray-600 transition-colors hover:text-green-600"
                      >
                        <ArrowRight size={14} className="mr-2 text-green-500" />
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 rounded-xl border border-green-100 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Our Mission
              </h3>
              <p className="text-gray-600">
                We&apos;re committed to creating sustainable, accessible UI
                components that respect both users and the environment. Our
                design philosophy embraces natural patterns and organic shapes.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Sustainable",
                  "Accessible",
                  "Organic",
                  "Natural",
                  "Eco-friendly",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Stay Connected
              </h3>
              <p className="mb-4 text-gray-600">
                Subscribe to our newsletter for the latest updates on
                sustainable UI design.
              </p>
              <form className="space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-md bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-white transition-colors hover:from-green-600 hover:to-emerald-700"
                >
                  Subscribe
                </motion.button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <h4 className="mb-3 text-sm font-medium text-gray-700">
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-green-100 hover:text-green-600"
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-col items-center justify-between border-t border-green-100 pt-8 md:flex-row"
        >
          <p className="mb-4 text-sm text-gray-500 md:mb-0">
            © {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-green-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-green-600"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-green-600"
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default OrganicShapesFooter;
