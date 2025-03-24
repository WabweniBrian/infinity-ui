"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Mail,
  HelpCircle,
} from "lucide-react";

const QuizNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const steps = [
    {
      id: "email",
      title: "Join our personalized newsletter",
      description: "Enter your email to get started with our quiz",
      type: "email",
    },
    {
      id: "interests",
      title: "What topics interest you the most?",
      description: "Select one option that best matches your interests",
      type: "quiz",
      options: [
        { id: "tech", label: "Technology & Innovation" },
        { id: "business", label: "Business & Entrepreneurship" },
        { id: "design", label: "Design & Creativity" },
        { id: "lifestyle", label: "Lifestyle & Wellness" },
      ],
    },
    {
      id: "frequency",
      title: "How often would you like to hear from us?",
      description: "Select your preferred frequency",
      type: "quiz",
      options: [
        { id: "daily", label: "Daily Updates" },
        { id: "weekly", label: "Weekly Digest" },
        { id: "biweekly", label: "Bi-weekly Roundup" },
        { id: "monthly", label: "Monthly Newsletter" },
      ],
    },
    {
      id: "format",
      title: "What content format do you prefer?",
      description: "Select your preferred content type",
      type: "quiz",
      options: [
        { id: "articles", label: "Long-form Articles" },
        { id: "quick", label: "Quick Tips & Insights" },
        { id: "visual", label: "Visual Content & Infographics" },
        { id: "mixed", label: "Mixed Content" },
      ],
    },
    {
      id: "complete",
      title: "Your personalized newsletter is ready!",
      description: "We've tailored our content based on your preferences",
      type: "complete",
    },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      nextStep();
    }
  };

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
    nextStep();
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const currentStepData = steps[currentStep];

  // Calculate progress percentage
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl"
        >
          {/* Progress bar */}
          <div className="h-2 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[400px] flex-col"
              >
                <div className="mb-8 text-center">
                  <h2 className="mb-3 text-3xl font-bold text-gray-900">
                    {currentStepData.title}
                  </h2>
                  <p className="text-gray-600">{currentStepData.description}</p>
                </div>

                {currentStepData.type === "email" && (
                  <div className="flex flex-grow flex-col justify-center">
                    <form
                      onSubmit={handleEmailSubmit}
                      className="mx-auto w-full max-w-md"
                    >
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
                          className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-violet-500"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={!email}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 font-medium text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </form>
                  </div>
                )}

                {currentStepData.type === "quiz" && (
                  <div className="flex flex-grow flex-col justify-center">
                    <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-4">
                      {currentStepData.options?.map((option) => (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            handleOptionSelect(currentStepData.id, option.id)
                          }
                          className={`rounded-xl border-2 p-4 text-left transition-colors ${
                            answers[currentStepData.id] === option.id
                              ? "border-violet-500 bg-violet-50"
                              : "border-gray-200 hover:border-violet-200"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full ${
                                answers[currentStepData.id] === option.id
                                  ? "bg-violet-500 text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              {answers[currentStepData.id] === option.id ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <div className="h-3 w-3 rounded-full bg-white" />
                              )}
                            </div>
                            <span
                              className={
                                answers[currentStepData.id] === option.id
                                  ? "font-medium text-violet-700"
                                  : "text-gray-700"
                              }
                            >
                              {option.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStepData.type === "complete" && (
                  <div className="flex flex-grow flex-col items-center justify-center">
                    {!isSubmitted ? (
                      <>
                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
                          <HelpCircle className="h-12 w-12 text-violet-600" />
                        </div>

                        <div className="mb-8 w-full max-w-md rounded-xl bg-gray-50 p-6">
                          <h3 className="mb-4 font-medium text-gray-900">
                            Your Newsletter Preferences
                          </h3>
                          <ul className="space-y-3">
                            {Object.entries(answers).map(([key, value]) => {
                              const step = steps.find((s) => s.id === key);
                              const option =
                                step?.type === "quiz"
                                  ? step?.options?.find((o) => o.id === value)
                                  : null;

                              return step?.type === "quiz" ? (
                                <li
                                  key={key}
                                  className="flex items-center gap-2 text-gray-700"
                                >
                                  <CheckCircle className="h-4 w-4 text-violet-500" />
                                  <span className="font-medium">
                                    {step.title.replace("?", "")}:
                                  </span>
                                  <span>{option?.label}</span>
                                </li>
                              ) : null;
                            })}
                            <li className="flex items-center gap-2 text-gray-700">
                              <CheckCircle className="h-4 w-4 text-violet-500" />
                              <span className="font-medium">Email:</span>
                              <span>{email}</span>
                            </li>
                          </ul>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleFinalSubmit}
                          className="flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 font-medium text-white transition-all hover:shadow-lg"
                        >
                          <span>Complete Subscription</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>

                        <h3 className="mb-2 text-2xl font-bold text-gray-900">
                          Thank you for subscribing!
                        </h3>
                        <p className="mb-8 max-w-md text-gray-600">
                          Your personalized newsletter has been set up.
                          We&apos;ve sent a confirmation email to{" "}
                          <span className="font-medium">{email}</span>.
                        </p>

                        <div className="mx-auto max-w-md rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 text-white">
                          <p className="mb-4 text-white">
                            Your first personalized newsletter will arrive soon!
                          </p>
                          <div className="text-sm opacity-80">
                            Based on your preferences, we&apos;ll send you
                            content about:
                          </div>
                          <div className="mt-2 flex flex-wrap justify-center gap-2">
                            {Object.entries(answers).map(([key, value]) => {
                              const step = steps.find((s) => s.id === key);
                              const option =
                                step?.type === "quiz"
                                  ? step?.options?.find((o) => o.id === value)
                                  : null;

                              return step?.type === "quiz" && option ? (
                                <div
                                  key={key}
                                  className="rounded-full bg-white/20 px-3 py-1 text-sm"
                                >
                                  {option.label}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                {currentStep > 0 && currentStep < steps.length - 1 && (
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-1 text-gray-500 transition-colors hover:text-violet-600"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>

                    <div className="text-sm text-gray-500">
                      Step {currentStep + 1} of {steps.length}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizNewsletter;
