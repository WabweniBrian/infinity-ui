"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Image from "next/image";

const SocialProofNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      quote:
        "This newsletter has transformed our marketing strategy. The insights are actionable and the content is always relevant to current trends.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      quote:
        "I've subscribed to dozens of newsletters, but this one consistently delivers the most value. It's the first email I open every week.",
      stars: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Product Designer",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      quote:
        "The curated content has directly influenced several of our product decisions. It's like having an expert consultant in your inbox.",
      stars: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left side - Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600">
              <Star className="mr-2 h-4 w-4" />
              <span>Trusted by 50,000+ subscribers</span>
            </div>

            <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
              Don&apos;t just take our word for it
            </h2>

            <div className="relative h-[300px] overflow-hidden rounded-2xl bg-purple-50 p-8">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="quotesPattern"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <text x="0" y="30" fontSize="40" fill="black">
                        &quot;
                      </text>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#quotesPattern)" />
                </svg>
              </div>

              {/* Testimonial carousel */}
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex-grow">
                      <p className="mb-6 text-lg italic text-gray-700">
                        &quot;{testimonials[currentTestimonial].quote}&quot;
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-purple-200">
                        <Image
                          src={
                            testimonials[currentTestimonial].image ||
                            "/placeholder.svg"
                          }
                          width={48}
                          height={48}
                          alt={testimonials[currentTestimonial].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonials[currentTestimonial].stars)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="absolute bottom-0 right-0 flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:bg-purple-100"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:bg-purple-100"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Pagination dots */}
                <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 transform gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentTestimonial
                          ? "bg-purple-600"
                          : "bg-purple-200"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: "50,000+", label: "Subscribers" },
                { value: "98%", label: "Open Rate" },
                { value: "Weekly", label: "Frequency" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
                >
                  <div className="mb-1 text-2xl font-bold text-purple-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl sm:p-10">
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100"
                >
                  <Mail className="h-8 w-8 text-purple-600" />
                </motion.div>

                <h3 className="mb-2 text-2xl font-bold">Join our newsletter</h3>
                <p className="mb-6 text-gray-600">
                  Get weekly insights from industry experts
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="social-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="social-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Marketing", "Design", "Development", "Business"].map(
                        (interest, index) => (
                          <label
                            key={index}
                            className="group inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-3 py-1.5 transition-colors hover:bg-purple-50"
                          >
                            <input type="checkbox" className="sr-only" />
                            <span className="text-sm text-gray-700 group-hover:text-purple-600">
                              {interest}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white transition-all hover:shadow-lg"
                  >
                    <span>Subscribe Now</span>
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
                <p>
                  By subscribing, you agree to our{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofNewsletter;
