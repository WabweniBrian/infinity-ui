"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Copy, Gift, Share2, Users } from "lucide-react";
import { useEffect, useState } from "react";

const ReferralProgramCta = () => {
  const controls = useAnimation();
  const [copied, setCopied] = useState(false);
  const referralCode = "FRIEND50";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <div className="w-full bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700"
              >
                <Gift className="h-3 w-3" />
                REFER & EARN
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Share the love, earn rewards
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Invite your friends to join and both of you will receive $50 in
                credit. The more friends you refer, the more rewards you earn!
              </motion.p>

              {/* How it works */}
              <motion.div variants={itemVariants} className="mb-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  How it works:
                </h3>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Share your unique referral code with friends via email,
                    social media, or text
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Your friend signs up using your referral code and makes
                    their first purchase
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Both you and your friend receive $50 in credit automatically
                    applied to your accounts
                  </div>
                </div>
              </motion.div>

              {/* Referral code */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-2 text-sm font-medium text-gray-700">
                  Your referral code:
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-lg font-bold text-gray-800">
                    {referralCode}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200"
                  >
                    {copied ? "Copied!" : "Copy"}
                    <Copy className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Share buttons */}
              <motion.div variants={itemVariants}>
                <div className="mb-2 text-sm font-medium text-gray-700">
                  Share via:
                </div>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-sky-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-900"
                  >
                    <Share2 className="h-4 w-4" />
                    More Options
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 text-white md:p-10">
              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="mb-4 text-xl font-bold">Your Referral Stats</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">$150</div>
                    <div className="text-sm text-white/80">Total Earned</div>
                  </div>

                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">3</div>
                    <div className="text-sm text-white/80">
                      Friends Referred
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Referral leaderboard */}
              <motion.div variants={itemVariants}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
                  <Users className="h-5 w-5" />
                  Referral Leaderboard
                </h3>

                <div className="space-y-3">
                  {[
                    { name: "Wabweni B.", count: 24, amount: "$1,200" },
                    { name: "Michael R.", count: 18, amount: "$900" },
                    { name: "David K.", count: 15, amount: "$750" },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-white/80">
                            {user.count} referrals
                          </div>
                        </div>
                      </div>
                      <div className="font-bold">{user.amount}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-orange-600 transition-all hover:bg-white/90"
                  >
                    Start Referring
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralProgramCta;
