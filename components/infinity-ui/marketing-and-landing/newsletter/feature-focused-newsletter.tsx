"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Zap,
  Shield,
  Clock,
  Gift,
} from "lucide-react";

const FeatureFocusedNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const features = [
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      title: "Trending Topics",
      description:
        "Stay ahead with the latest industry trends and insights delivered weekly.",
    },
    {
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
      title: "Exclusive Content",
      description:
        "Get access to subscriber-only content, guides, and resources.",
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: "Time-Saving Digests",
      description:
        "Curated content that saves you hours of research every week.",
    },
    {
      icon: <Gift className="h-5 w-5 text-purple-500" />,
      title: "Special Offers",
      description:
        "Exclusive deals and discounts only available to our subscribers.",
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-600">
              <Mail className="mr-2 h-4 w-4" />
              <span>Join Our Newsletter</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Why subscribe to our{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                weekly newsletter
              </span>
            </h2>

            <p className="mb-8 text-gray-600">
              Our newsletter delivers valuable insights, expert tips, and
              exclusive content directly to your inbox. Here&apos;s what
              you&apos;ll get:
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {["Marketers", "Entrepreneurs", "Designers", "Developers"].map(
                (audience, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >
                    {audience}
                  </div>
                ),
              )}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 sm:p-10"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="smallGrid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="black"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
              </svg>
            </div>

            <div className="relative">
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-100 to-orange-100"
                >
                  <Mail className="h-8 w-8 text-amber-600" />
                </motion.div>

                <h3 className="mb-2 text-2xl font-bold">Subscribe Now</h3>
                <p className="mb-6 text-gray-600">
                  Join 35,000+ subscribers and get our newsletter every week.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-amber-500"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 font-medium text-white transition-all hover:shadow-lg"
                  >
                    <span>Subscribe for Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-6"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h4 className="mb-1 font-medium text-green-800">
                      Thank you for subscribing!
                    </h4>
                    <p className="text-green-700">
                      We&apos;ve sent a confirmation email to{" "}
                      <span className="font-medium">{email}</span>. Please check
                      your inbox to complete your subscription.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 text-center text-sm text-gray-500">
                <p className="mb-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-amber-500" />
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>Weekly updates</span>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-700">
                    JD
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-xs text-gray-500">
                      Marketing Director
                    </div>
                  </div>
                </div>
                <p className="text-sm italic text-gray-600">
                  &quot;This newsletter has been a game-changer for our team.
                  The insights are actionable and the content is always
                  relevant.&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureFocusedNewsletter;
