"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Gift,
  Trophy,
  Zap,
  Award,
} from "lucide-react";

const GamifiedNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      setPoints((prev) => prev - 10);
    } else {
      setSelectedInterests([...selectedInterests, interest]);
      setPoints((prev) => prev + 10);
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    setPoints((prev) => prev + 20);
  };

  const interests = [
    { name: "Technology", icon: <Zap className="h-4 w-4" /> },
    { name: "Business", icon: <Trophy className="h-4 w-4" /> },
    { name: "Design", icon: <Award className="h-4 w-4" /> },
    { name: "Marketing", icon: <Gift className="h-4 w-4" /> },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-indigo-50 to-white py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl bg-white shadow-xl"
        >
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gray-100">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: "33.33%" }}
                animate={{ width: `${step * 33.33}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-4 sm:p-12">
              <div className="mb-8 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Level Up Your Inbox</span>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2">
                  <Trophy className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-600">
                    {points} points
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-center text-3xl font-bold">
                      Join our{" "}
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        gamified newsletter
                      </span>
                    </h2>

                    <p className="mx-auto mb-8 max-w-xl text-center text-gray-600">
                      Level up your knowledge and earn rewards by subscribing to
                      our interactive newsletter experience.
                    </p>

                    <div className="mx-auto max-w-md">
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
                          className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-indigo-500"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={nextStep}
                        disabled={!email}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-medium text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span>Continue (+20 points)</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-center text-3xl font-bold">
                      Select your interests
                    </h2>

                    <p className="mx-auto mb-8 max-w-xl text-center text-gray-600">
                      Choose topics you&apos;re interested in to personalize
                      your newsletter experience. Each selection earns you 10
                      points!
                    </p>

                    <div className="mx-auto max-w-md">
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        {interests.map((interest, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInterestToggle(interest.name)}
                            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${
                              selectedInterests.includes(interest.name)
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:border-indigo-200"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                selectedInterests.includes(interest.name)
                                  ? "bg-indigo-100 text-indigo-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {interest.icon}
                            </div>
                            <span
                              className={
                                selectedInterests.includes(interest.name)
                                  ? "text-indigo-700"
                                  : "text-gray-700"
                              }
                            >
                              {interest.name}
                            </span>
                            {selectedInterests.includes(interest.name) && (
                              <span className="text-xs text-indigo-500">
                                +10 points
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={nextStep}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-medium text-white transition-all hover:shadow-lg"
                      >
                        <span>Continue (+20 points)</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-center text-3xl font-bold">
                      Complete your subscription
                    </h2>

                    <p className="mx-auto mb-8 max-w-xl text-center text-gray-600">
                      You&apos;re almost there! Complete your subscription to
                      unlock your first reward.
                    </p>

                    <div className="mx-auto max-w-md">
                      {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="mb-6 rounded-xl bg-indigo-50 p-6">
                            <h3 className="mb-2 flex items-center gap-2 font-medium text-indigo-700">
                              <Trophy className="h-5 w-5" />
                              Your Rewards
                            </h3>
                            <ul className="space-y-3">
                              <li className="flex items-center gap-2 text-indigo-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Exclusive welcome guide</span>
                              </li>
                              <li className="flex items-center gap-2 text-indigo-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Early access to new content</span>
                              </li>
                              <li className="flex items-center gap-2 text-indigo-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Monthly subscriber-only resources</span>
                              </li>
                            </ul>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-medium text-white transition-all hover:shadow-lg"
                          >
                            <span>Complete Subscription (+50 points)</span>
                            <ArrowRight className="h-4 w-4" />
                          </motion.button>
                        </form>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                          </div>

                          <h3 className="mb-2 text-2xl font-bold text-gray-900">
                            Congratulations!
                          </h3>
                          <p className="mb-6 text-gray-600">
                            You&apos;ve earned{" "}
                            <span className="font-bold text-purple-600">
                              {points + 50} points
                            </span>{" "}
                            and unlocked your first reward.
                          </p>

                          <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                            <div className="mb-4 flex items-center justify-between">
                              <h4 className="font-bold">Welcome Reward</h4>
                              <Gift className="h-6 w-6" />
                            </div>
                            <p className="mb-4 text-blue-200">
                              Your exclusive welcome guide has been sent to your
                              email.
                            </p>
                            <div className="text-sm opacity-80">
                              Check your inbox at {email}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Steps indicator */}
              <div className="mt-12 flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2.5 w-2.5 rounded-full ${
                      s === step
                        ? "bg-indigo-600"
                        : s < step
                          ? "bg-indigo-300"
                          : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GamifiedNewsletter;
