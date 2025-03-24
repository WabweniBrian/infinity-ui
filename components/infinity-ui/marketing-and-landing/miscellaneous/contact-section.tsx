"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
    setFormState("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormState("success");
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState("idle");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["1234 Innovation Drive", "San Francisco, CA 94103"],
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri, 9am-6pm PST"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@infinityui.com", "support@infinityui.com"],
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-white to-white dark:from-purple-950/30 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="contact-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 0M0 0L40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-pattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-purple-300/20 to-indigo-300/20 blur-3xl dark:from-purple-900/10 dark:to-indigo-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl dark:from-blue-900/10 dark:to-cyan-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-purple-500"></span>
            <span className="mx-2 font-medium text-purple-500">
              GET IN TOUCH
            </span>
            <span className="h-1 w-12 rounded-full bg-purple-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Let&apos;s start a
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              conversation
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Have questions or want to learn more about our services? We&apos;re
            here to help you bring your vision to life.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${info.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              <div className="relative h-full rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${info.color} mb-6 flex items-center justify-center`}
                  >
                    <info.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {info.title}
                  </h3>

                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 dark:text-gray-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-xl"></div>
            <div className="relative rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Send us a message
              </h3>

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Message Sent!
                  </h4>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. We&apos;ll get back to you
                    shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                        placeholder="John Doe"
                        disabled={formState !== "idle"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                        placeholder="john@example.com"
                        disabled={formState !== "idle"}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                      disabled={formState !== "idle"}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Partnership">Partnership</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                      placeholder="How can we help you?"
                      disabled={formState !== "idle"}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formState !== "idle"}
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-70"
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl"></div>
            <div className="relative h-full rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Our Location
              </h3>

              <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-2xl md:h-[400px]">
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Stylized Map Placeholder */}
                  <div className="relative h-full w-full bg-blue-50 dark:bg-gray-800">
                    <div className="absolute inset-0">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 800 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-gray-300 dark:text-gray-700"
                        >
                          <path d="M0,100 L800,100" />
                          <path d="M0,200 L800,200" />
                          <path d="M0,300 L800,300" />
                          <path d="M0,400 L800,400" />
                          <path d="M0,500 L800,500" />
                          <path d="M100,0 L100,600" />
                          <path d="M200,0 L200,600" />
                          <path d="M300,0 L300,600" />
                          <path d="M400,0 L400,600" />
                          <path d="M500,0 L500,600" />
                          <path d="M600,0 L600,600" />
                          <path d="M700,0 L700,600" />
                        </g>
                        <path
                          d="M300,200 Q400,100 500,200 T700,300 Q600,400 500,350 T300,400 Q200,350 300,200"
                          fill="rgba(59, 130, 246, 0.1)"
                          stroke="#3B82F6"
                          strokeWidth="2"
                        />
                        <circle cx="400" cy="300" r="10" fill="#3B82F6" />
                        <circle
                          cx="400"
                          cy="300"
                          r="20"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2"
                        >
                          <animate
                            attributeName="r"
                            from="20"
                            to="40"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="1"
                            to="0"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </svg>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg dark:bg-gray-800">
                      <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 mt-1 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Infinity UI Headquarters
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      1234 Innovation Drive, San Francisco, CA 94103
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-3 mt-1 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Business Hours
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday: 9am - 6pm PST
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Clock = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export default ContactSection;
