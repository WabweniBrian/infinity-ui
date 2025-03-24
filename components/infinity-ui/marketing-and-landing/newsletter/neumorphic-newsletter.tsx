"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle, Mail, Bell, Shield, Zap } from "lucide-react";

const NeumorphicNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-[#e0e5ec] py-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[inset_2px_2px_5px_#b8b9be,inset_-3px_-3px_7px_#ffffff]">
              <Zap className="mr-2 h-4 w-4 text-blue-500" />
              <span>Stay Updated</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl">
              Subscribe to our <span className="text-blue-500">newsletter</span>{" "}
              for the latest updates
            </h2>

            <p className="mb-8 text-lg text-gray-600">
              Join our community and receive the latest insights, tips, and news
              delivered directly to your inbox.
            </p>

            <div className="mb-8 space-y-6">
              {[
                {
                  icon: <Bell className="h-5 w-5 text-blue-500" />,
                  title: "Weekly Updates",
                  description: "Get the latest news and updates every week.",
                },
                {
                  icon: <Shield className="h-5 w-5 text-blue-500" />,
                  title: "Privacy Focused",
                  description:
                    "We respect your privacy and will never share your data.",
                },
                {
                  icon: <Zap className="h-5 w-5 text-blue-500" />,
                  title: "Exclusive Content",
                  description:
                    "Access exclusive content only available to subscribers.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#e0e5ec] shadow-[2px_2px_5px_#b8b9be,-3px_-3px_7px_#ffffff]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e0e5ec] bg-white font-medium text-blue-500 shadow-[2px_2px_5px_#b8b9be,-3px_-3px_7px_#ffffff]"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>Join 25,000+ subscribers</span>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl bg-[#e0e5ec] p-8 shadow-[5px_5px_15px_#b8b9be,-5px_-5px_15px_#ffffff]">
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0e5ec] shadow-[2px_2px_5px_#b8b9be,-3px_-3px_7px_#ffffff]"
                >
                  <Mail className="h-8 w-8 text-blue-500" />
                </motion.div>

                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  Subscribe Now
                </h3>
                <p className="text-gray-600">
                  Get weekly insights in your inbox
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="neumorphic-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        id="neumorphic-name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl bg-[#e0e5ec] px-4 py-3 text-gray-800 shadow-[inset_2px_2px_5px_#b8b9be,inset_-3px_-3px_7px_#ffffff] outline-none transition-all placeholder:text-gray-500 focus:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="neumorphic-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="neumorphic-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl bg-[#e0e5ec] py-3 pl-12 pr-4 text-gray-800 shadow-[inset_2px_2px_5px_#b8b9be,inset_-3px_-3px_7px_#ffffff] outline-none transition-all placeholder:text-gray-500 focus:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex cursor-pointer items-start gap-2">
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 rounded border-none bg-[#e0e5ec] text-blue-500 shadow-[inset_1px_1px_3px_#b8b9be,inset_-1px_-1px_3px_#ffffff] focus:ring-0 focus:ring-offset-0"
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        I agree to receive marketing emails and can unsubscribe
                        anytime
                      </span>
                    </label>
                  </div>

                  <motion.button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium text-white transition-all ${
                      isHovered
                        ? "bg-blue-600 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-3px_-3px_7px_rgba(255,255,255,0.1)]"
                        : "bg-blue-500 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]"
                    }`}
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl bg-[#e0e5ec] p-6 shadow-[inset_2px_2px_5px_#b8b9be,inset_-3px_-3px_7px_#ffffff]"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h4 className="mb-1 font-medium text-gray-800">
                      Thank you for subscribing!
                    </h4>
                    <p className="text-gray-600">
                      We&apos;ve sent a confirmation email to{" "}
                      <span className="font-medium text-blue-500">{email}</span>
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NeumorphicNewsletter;
