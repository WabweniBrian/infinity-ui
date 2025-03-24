"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";

const GlassmorphismFooter = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleAccordion = (id: string) => {
    if (isMobile) {
      setActiveAccordion(activeAccordion === id ? null : id);
    }
  };

  const footerLinks = [
    {
      id: "product",
      title: "Product",
      links: ["Features", "Pricing", "Documentation", "Resources", "Updates"],
    },
    {
      id: "company",
      title: "Company",
      links: ["About", "Blog", "Careers", "Press", "Contact"],
    },
    {
      id: "support",
      title: "Support",
      links: ["Help Center", "Community", "Status", "Tutorials", "FAQ"],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blurred circles */}
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-[100px] filter"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-[100px] filter"></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-pink-500 opacity-10 blur-[100px] filter"></div>
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-6 py-16">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md md:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Company info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-4"
            >
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                    <span className="text-xl font-bold text-white">∞</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Infinity UI</h2>
                </div>
              </div>

              <p className="mb-6 text-white/80">
                Modern UI components with a glassmorphism aesthetic. Create
                interfaces that are both beautiful and functional.
              </p>

              <div className="mb-8 flex space-x-4">
                {[Github, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-white/60" />
                  <span className="text-white/80">contact@infinityui.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-white/60" />
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-white/60" />
                  <span className="text-white/80">
                    123 Design Street, Creative City
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Links */}
            <div className="grid grid-cols-1 gap-8 md:col-span-5 md:grid-cols-3">
              {footerLinks.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div
                    className={`mb-4 flex items-center justify-between ${isMobile ? "cursor-pointer" : ""}`}
                    onClick={() => toggleAccordion(section.id)}
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {section.title}
                    </h3>
                    {isMobile && (
                      <ChevronDown
                        className={`h-5 w-5 text-white/60 transition-transform ${
                          activeAccordion === section.id
                            ? "rotate-180 transform"
                            : ""
                        }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {(!isMobile || activeAccordion === section.id) && (
                      <motion.ul
                        initial={
                          isMobile ? { height: 0, opacity: 0 } : undefined
                        }
                        animate={
                          isMobile ? { height: "auto", opacity: 1 } : undefined
                        }
                        exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {section.links.map((link, linkIndex) => (
                          <motion.li
                            key={linkIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.05 * linkIndex,
                            }}
                          >
                            <motion.a
                              href="#"
                              whileHover={{ x: 3 }}
                              className="text-white/70 transition-colors hover:text-white"
                            >
                              {link}
                            </motion.a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-3"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">
                Stay Updated
              </h3>

              <p className="mb-4 text-white/80">
                Subscribe to our newsletter for the latest updates.
              </p>

              <form className="mb-4">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center rounded-md bg-white px-4 py-2 text-blue-900 transition-colors hover:bg-white/90"
                  >
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row"
          >
            <p className="mb-4 text-sm text-white/60 md:mb-0">
              © {new Date().getFullYear()} Infinity UI. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default GlassmorphismFooter;
