"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  HelpCircle,
  User,
  Briefcase,
} from "lucide-react";

const InteractiveQuizNewsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [persona, setPersona] = useState("");

  const questions = [
    {
      id: "role",
      question: "What best describes your role?",
      options: [
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
        { value: "marketer", label: "Marketer" },
        { value: "manager", label: "Manager" },
      ],
    },
    {
      id: "experience",
      question: "How much experience do you have?",
      options: [
        { value: "beginner", label: "Just starting out" },
        { value: "intermediate", label: "1-3 years" },
        { value: "experienced", label: "4-7 years" },
        { value: "expert", label: "8+ years" },
      ],
    },
    {
      id: "goal",
      question: "What's your primary goal?",
      options: [
        { value: "learn", label: "Learn new skills" },
        { value: "stay-updated", label: "Stay updated on trends" },
        { value: "network", label: "Network with peers" },
        { value: "grow-career", label: "Grow my career" },
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));

    setStep((prevStep) => {
      if (prevStep < questions.length) {
        return prevStep + 1;
      } else {
        finishQuiz();
        return prevStep;
      }
    });
  };

  const determinePersona = () => {
    const role = answers.role;
    const experience = answers.experience;

    if (role === "developer") {
      if (experience === "beginner" || experience === "intermediate") {
        return "Emerging Developer";
      } else {
        return "Senior Developer";
      }
    } else if (role === "designer") {
      if (experience === "beginner" || experience === "intermediate") {
        return "Design Enthusiast";
      } else {
        return "Design Leader";
      }
    } else if (role === "marketer") {
      if (experience === "beginner" || experience === "intermediate") {
        return "Marketing Specialist";
      } else {
        return "Marketing Strategist";
      }
    } else {
      if (experience === "beginner" || experience === "intermediate") {
        return "Team Leader";
      } else {
        return "Executive";
      }
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(0);
  };

  const startQuiz = () => {
    setStep(1);
  };

  const finishQuiz = () => {
    const determinedPersona = determinePersona();
    setPersona(determinedPersona);
    setStep(questions.length + 1);
  };

  return (
    <section className="w-full bg-gradient-to-b from-purple-50 to-white py-20">
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
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / (questions.length + 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                      <HelpCircle className="h-8 w-8 text-purple-600" />
                    </div>

                    <h2 className="mb-4 text-3xl font-bold">
                      Personalize your newsletter experience
                    </h2>

                    <p className="mx-auto mb-8 max-w-xl text-gray-600">
                      Take our quick quiz to help us tailor our newsletter
                      content to your specific needs and interests.
                    </p>

                    <div className="mx-auto max-w-md">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="quiz-name"
                            className="block text-left text-sm font-medium text-gray-700"
                          >
                            Your Name
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="quiz-name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="quiz-email"
                            className="block text-left text-sm font-medium text-gray-700"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="quiz-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                              className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startQuiz}
                        disabled={!email}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span>Start Quiz</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {questions.map(
                  (q, index) =>
                    step === index + 1 && (
                      <motion.div
                        key={`question-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                          <span className="text-2xl font-bold text-purple-600">
                            {index + 1}
                          </span>
                        </div>

                        <h2 className="mb-8 text-2xl font-bold">
                          {q.question}
                        </h2>

                        <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
                          {q.options.map((option) => (
                            <motion.button
                              key={option.value}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                handleAnswerSelect(q.id, option.value)
                              }
                              className={`rounded-xl border-2 p-4 text-left transition-colors ${
                                answers[q.id] === option.value
                                  ? "border-purple-500 bg-purple-50"
                                  : "border-gray-200 hover:border-purple-200"
                              }`}
                            >
                              <span
                                className={
                                  answers[q.id] === option.value
                                    ? "text-purple-700"
                                    : "text-gray-700"
                                }
                              >
                                {option.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ),
                )}

                {step === questions.length + 1 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                      <Briefcase className="h-8 w-8 text-purple-600" />
                    </div>

                    <h2 className="mb-2 text-3xl font-bold">
                      Your Personalized Newsletter
                    </h2>

                    <p className="mx-auto mb-8 max-w-xl text-gray-600">
                      Based on your answers, we&apos;ve identified you as a:
                    </p>

                    <div className="mx-auto mb-8 max-w-md rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                      <h3 className="mb-2 text-2xl font-bold">{persona}</h3>
                      <p className="text-gray-100">
                        We&apos;ll tailor our newsletter content to match your
                        profile and interests.
                      </p>
                    </div>

                    {!isSubmitted ? (
                      <form
                        onSubmit={handleSubmit}
                        className="mx-auto max-w-md"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white transition-all hover:shadow-lg"
                        >
                          <span>Complete Subscription</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>

                        <button
                          type="button"
                          onClick={resetQuiz}
                          className="mt-4 text-sm text-purple-600 hover:underline"
                        >
                          Retake Quiz
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto flex max-w-md items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-6"
                      >
                        <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                        <div className="text-left">
                          <h4 className="mb-1 font-medium text-green-800">
                            Thank you for subscribing!
                          </h4>
                          <p className="text-green-700">
                            We&apos;ve sent a confirmation email to{" "}
                            <span className="font-medium">{email}</span>. Your
                            personalized newsletter will be tailored for a{" "}
                            <span className="font-medium">{persona}</span>.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Steps indicator */}
              <div className="mt-12 flex justify-center gap-2">
                {[...Array(questions.length + 2)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i === step
                        ? "bg-purple-600"
                        : i < step
                          ? "bg-purple-300"
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

export default InteractiveQuizNewsletter;
