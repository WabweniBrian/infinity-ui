"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Instagram, Linkedin } from "lucide-react";

const MinimalistSplitFooter = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-white">
      <div className="container mx-auto">
        {/* Top section with split design */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-12 md:p-16 lg:p-24"
          >
            <div className="max-w-xs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-black">
                    <span className="text-xl font-bold text-white">∞</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Infinity UI
                  </h2>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 text-gray-600"
              >
                Clean, minimal, and functional UI components for modern web
                applications.
              </motion.p>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex space-x-5"
              >
                {[Github, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="text-gray-400 transition-colors hover:text-black"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-12 md:p-16 lg:p-24"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.h3
                  variants={itemVariants}
                  className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900"
                >
                  Product
                </motion.h3>
                <ul className="space-y-2">
                  {["Features", "Pricing", "Documentation", "Releases"].map(
                    (item, index) => (
                      <motion.li key={index} variants={itemVariants}>
                        <a
                          href="#"
                          className="text-gray-500 transition-colors hover:text-black"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ),
                  )}
                </ul>
              </motion.div>

              <motion.div variants={container} initial="hidden" animate="show">
                <motion.h3
                  variants={itemVariants}
                  className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900"
                >
                  Company
                </motion.h3>
                <ul className="space-y-2">
                  {["About", "Blog", "Careers", "Contact"].map(
                    (item, index) => (
                      <motion.li key={index} variants={itemVariants}>
                        <a
                          href="#"
                          className="text-gray-500 transition-colors hover:text-black"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ),
                  )}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
                Subscribe to our newsletter
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow rounded-l-md border-none bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center justify-between border-t border-gray-200 px-12 py-6 md:flex-row md:px-16 lg:px-24"
        >
          <p className="mb-4 text-sm text-gray-500 md:mb-0">
            © {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-black"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-black"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-black"
            >
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default MinimalistSplitFooter;
