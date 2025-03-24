"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, MessageSquare, Users } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const CommunityMembershipCta = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Image */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-500 p-8 md:p-0">
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="smallGrid"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#smallGrid)" />
                </svg>
              </div>

              <div className="relative text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <Users className="h-10 w-10" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="mb-2 text-2xl font-bold">
                    Join Our Community
                  </div>
                  <div className="text-white/80">
                    Connect with 5,000+ members
                  </div>
                </motion.div>

                {/* Member avatars */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 flex justify-center"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 overflow-hidden rounded-full border-2 border-teal-500"
                      >
                        <Image
                          src={`/images/1.png`}
                          alt={`Member ${i + 1}`}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-500 bg-white text-xs font-medium text-teal-600">
                      +5K
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Content - Join Form */}
            <div className="p-8 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700"
              >
                <MessageSquare className="h-3 w-3" />
                EXCLUSIVE MEMBERSHIP
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Be Part of Something Special
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Join our thriving community of like-minded individuals. Share
                ideas, get support, and grow together.
              </motion.p>

              {/* Benefits */}
              <motion.div variants={itemVariants} className="mb-6 space-y-3">
                {[
                  "Access to exclusive content and resources",
                  "Weekly live Q&A sessions with experts",
                  "Private networking opportunities",
                  "Member-only discounts and offers",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-teal-100 p-0.5 text-teal-600">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </motion.div>

              {/* Testimonial */}
              <motion.div
                variants={itemVariants}
                className="mb-6 rounded-lg bg-gray-50 p-4"
              >
                <div className="mb-2 text-sm italic text-gray-600">
                  &quot;Joining this community was one of the best decisions
                  I&apos;ve made. The support and resources are
                  invaluable!&quot;
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src="/images/1.png"
                      alt="Member"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-gray-500">Member since 2022</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition-all hover:bg-teal-700"
                >
                  Join Our Community
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <div className="mt-3 text-center text-xs text-gray-500">
                  Already a member?{" "}
                  <a
                    href="#"
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    Sign in
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityMembershipCta;
