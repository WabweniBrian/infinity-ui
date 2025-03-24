"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Star,
  Users,
  Clock,
} from "lucide-react";

const ParallaxNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-orange-50 to-amber-50 py-32"
    >
      {/* Parallax elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute left-[10%] top-0 h-64 w-64 rounded-full bg-orange-200 mix-blend-multiply blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-amber-200 mix-blend-multiply blur-3xl"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute bottom-[10%] left-[20%] h-80 w-80 rounded-full bg-yellow-200 mix-blend-multiply blur-3xl"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600"
            >
              <Star className="mr-2 h-4 w-4" />
              <span>Join 50,000+ subscribers</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6 text-4xl font-bold sm:text-5xl"
            >
              Subscribe to our{" "}
              <span className="text-orange-600">newsletter</span> for daily
              updates
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-8 max-w-xl text-lg text-gray-600"
            >
              Stay informed with our daily newsletter. Get the latest news,
              updates, and exclusive content delivered straight to your inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
            >
              {[
                {
                  icon: <Clock className="h-5 w-5 text-orange-600" />,
                  title: "Daily Updates",
                  description: "Fresh content every day",
                },
                {
                  icon: <Users className="h-5 w-5 text-orange-600" />,
                  title: "Community",
                  description: "Join our growing community",
                },
                {
                  icon: <Star className="h-5 w-5 text-orange-600" />,
                  title: "Exclusive Content",
                  description: "Subscriber-only articles",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-orange-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    {feature.icon}
                  </div>
                  <h3 className="mb-1 font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 text-sm text-gray-500"
            >
              {[
                "Technology",
                "Business",
                "Design",
                "Marketing",
                "Development",
              ].map((tag, index) => (
                <div
                  key={index}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2"
                >
                  {tag}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-8 shadow-xl sm:p-10">
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
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-100 to-amber-100"
                  >
                    <Mail className="h-8 w-8 text-orange-600" />
                  </motion.div>

                  <h3 className="mb-2 text-2xl font-bold">Subscribe Now</h3>
                  <p className="text-gray-600">
                    Get daily updates in your inbox
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="parallax-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        id="parallax-name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="parallax-email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="parallax-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Frequency
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Daily", "Weekly", "Monthly"].map(
                          (frequency, index) => (
                            <label
                              key={index}
                              className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-3 transition-colors hover:border-orange-500"
                            >
                              <input
                                type="radio"
                                name="frequency"
                                className="sr-only"
                              />
                              <span className="text-sm font-medium">
                                {frequency}
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                        <span className="font-medium">{email}</span>. Please
                        check your inbox to complete your subscription.
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    By subscribing, you agree to our{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxNewsletter;
