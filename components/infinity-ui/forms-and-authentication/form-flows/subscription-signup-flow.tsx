"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, User, Package, Shield, Zap } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  plan: string;
  billingCycle: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
  agreeToTerms: boolean;
};

const SubscriptionSignupFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    plan: "pro",
    billingCycle: "annual",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    agreeToTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePlanSelect = (plan: string) => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const handleBillingCycleSelect = (billingCycle: string) => {
    setFormData((prev) => ({ ...prev, billingCycle }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form data:", formData);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: { monthly: 9.99, annual: 7.99 },
      features: [
        "Access to basic features",
        "1 user account",
        "5GB storage",
        "Email support",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      price: { monthly: 19.99, annual: 16.99 },
      features: [
        "All Basic features",
        "5 user accounts",
        "20GB storage",
        "Priority email support",
        "Advanced analytics",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 49.99, annual: 39.99 },
      features: [
        "All Professional features",
        "Unlimited user accounts",
        "100GB storage",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated account manager",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
    selected: {
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <User className="h-5 w-5" />;
      case 2:
        return <Package className="h-5 w-5" />;
      case 3:
        return <CreditCard className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Account";
      case 2:
        return "Choose Plan";
      case 3:
        return "Payment";
      default:
        return "Step";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <Check className="h-10 w-10 text-purple-600" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Welcome to the {plans.find((p) => p.id === formData.plan)?.name}{" "}
              Plan!
            </h2>
            <p className="mx-auto mb-8 max-w-md text-gray-600">
              Thank you for subscribing. Your account has been created and your
              subscription is now active.
            </p>
            <div className="mx-auto mb-8 max-w-md rounded-2xl bg-purple-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Account Email:</span>
                <span className="font-semibold">{formData.email}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">
                  {plans.find((p) => p.id === formData.plan)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Billing Cycle:</span>
                <span className="font-semibold capitalize">
                  {formData.billingCycle}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="rounded-full bg-purple-600 px-8 py-3 font-medium text-white transition-colors hover:bg-purple-700"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => (window.location.href = "/account")}
                className="rounded-full border border-gray-200 bg-white px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                View Account
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                Join Thousands of Happy Users
              </h2>
              <p className="mx-auto max-w-xl text-gray-600">
                Choose the perfect plan for your needs and get started in
                minutes.
              </p>
            </div>

            {/* Progress steps */}
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="flex justify-between">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    <div
                      className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                        i + 1 < step
                          ? "bg-purple-600 text-white"
                          : i + 1 === step
                            ? "bg-purple-600 text-white ring-4 ring-purple-100"
                            : "border-2 border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {i + 1 < step ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        getStepIcon(i + 1)
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm ${i + 1 <= step ? "font-medium text-purple-600" : "text-gray-500"}`}
                    >
                      {getStepTitle(i + 1)}
                    </span>

                    {/* Connector line */}
                    {i < totalSteps - 1 && (
                      <div className="absolute left-10 top-5 h-0.5 w-full bg-gray-200">
                        <div
                          className={`h-full bg-purple-600 transition-all ${
                            i + 1 < step
                              ? "w-full"
                              : i + 1 === step
                                ? "w-1/2"
                                : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mx-auto max-w-md space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Create Your Account
                    </motion.h3>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                          placeholder="First name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                          placeholder="Last name"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
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
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="Create a secure password"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Password must be at least 8 characters long with a mix
                        of letters, numbers, and symbols.
                      </p>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-purple-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Your data is secure
                          </h4>
                          <p className="text-sm text-gray-600">
                            We use industry-standard encryption to protect your
                            personal information. We will never share your data
                            with third parties without your consent.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-center text-xl font-bold text-gray-900"
                    >
                      Choose Your Plan
                    </motion.h3>

                    <motion.div variants={itemVariants} className="mb-8">
                      <div className="mb-6 flex justify-center">
                        <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
                          <button
                            type="button"
                            onClick={() => handleBillingCycleSelect("monthly")}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              formData.billingCycle === "monthly"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBillingCycleSelect("annual")}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              formData.billingCycle === "annual"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            Annual
                            <span className="ml-1 text-xs font-normal text-purple-600">
                              Save 20%
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {plans.map((plan) => (
                          <motion.div
                            key={plan.id}
                            variants={cardVariants}
                            whileHover="hover"
                            animate={
                              formData.plan === plan.id ? "selected" : "visible"
                            }
                            onClick={() => handlePlanSelect(plan.id)}
                            className={`relative cursor-pointer rounded-2xl border-2 bg-white p-6 transition-all ${
                              formData.plan === plan.id
                                ? "border-purple-600"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {plan.popular && (
                              <div className="absolute -right-3 -top-3">
                                <div className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                                  Popular
                                </div>
                              </div>
                            )}

                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                  {plan.name}
                                </h4>
                                <div className="mt-1">
                                  <span className="text-2xl font-bold text-gray-900">
                                    {formatPrice(
                                      plan.price[
                                        formData.billingCycle as keyof typeof plan.price
                                      ],
                                    )}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    /mo
                                    {formData.billingCycle === "annual" &&
                                      ", billed annually"}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                                  formData.plan === plan.id
                                    ? "border-purple-600 bg-purple-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {formData.plan === plan.id && (
                                  <Check className="h-4 w-4 text-white" />
                                )}
                              </div>
                            </div>

                            <div className="my-4 h-px bg-gray-100"></div>

                            <ul className="space-y-3">
                              {plan.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                                    <Check className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="mx-auto max-w-2xl rounded-2xl bg-purple-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            All plans include:
                          </h4>
                          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-gray-600">
                                30-day money-back guarantee
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-gray-600">
                                Cancel anytime
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-gray-600">
                                Automatic backups
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-gray-600">
                                Regular updates
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mx-auto max-w-2xl"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-center text-xl font-bold text-gray-900"
                    >
                      Payment Details
                    </motion.h3>

                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-5">
                      <div className="md:col-span-3">
                        <motion.div
                          variants={itemVariants}
                          className="space-y-6"
                        >
                          <div>
                            <label
                              htmlFor="cardName"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                              required
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                              placeholder="Full name on card"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="cardNumber"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="cardExpiry"
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="cardExpiry"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                placeholder="MM/YY"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="cardCvc"
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                CVC
                              </label>
                              <input
                                type="text"
                                id="cardCvc"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                placeholder="123"
                              />
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="agreeToTerms"
                              name="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleChange}
                              required
                              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label
                              htmlFor="agreeToTerms"
                              className="text-sm text-gray-600"
                            >
                              I agree to the{" "}
                              <a
                                href="#"
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="#"
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        variants={itemVariants}
                        className="md:col-span-2"
                      >
                        <div className="rounded-2xl bg-gray-50 p-6">
                          <h4 className="mb-4 font-medium text-gray-900">
                            Order Summary
                          </h4>

                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-gray-600">
                              {plans.find((p) => p.id === formData.plan)?.name}{" "}
                              Plan
                            </span>
                            <span className="font-medium">
                              {(() => {
                                const plan = plans.find(
                                  (p) => p.id === formData.plan,
                                );
                                const price = plan
                                  ? plan.price[
                                      formData.billingCycle as keyof typeof plan.price
                                    ]
                                  : 0;
                                return formatPrice(price);
                              })()}
                            </span>
                          </div>

                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-gray-600">Billing</span>
                            <span className="font-medium capitalize">
                              {formData.billingCycle}
                            </span>
                          </div>

                          {formData.billingCycle === "annual" && (
                            <div className="mb-2 flex items-center justify-between text-green-600">
                              <span>Annual discount</span>
                              <span>-20%</span>
                            </div>
                          )}

                          <div className="my-4 h-px bg-gray-200"></div>

                          <div className="mb-1 flex items-center justify-between">
                            <span className="font-bold text-gray-900">
                              Total
                            </span>
                            <span className="font-bold text-gray-900">
                              {(() => {
                                const plan = plans.find(
                                  (p) => p.id === formData.plan,
                                );
                                const price = plan
                                  ? plan.price[
                                      formData.billingCycle as keyof typeof plan.price
                                    ]
                                  : 0;
                                return formatPrice(price);
                              })()}
                              <span className="text-sm font-normal text-gray-600">
                                /mo
                                {formData.billingCycle === "annual" &&
                                  ", billed annually"}
                              </span>
                            </span>
                          </div>

                          <div className="mb-4 text-xs text-gray-500">
                            {formData.billingCycle === "annual"
                              ? `You&apos;ll be charged ${(() => {
                                  const plan = plans.find(
                                    (p) => p.id === formData.plan,
                                  );
                                  const annualPrice = plan
                                    ? plan.price.annual * 12
                                    : 0;
                                  return formatPrice(annualPrice);
                                })()} today.`
                              : "Your first payment will be charged today."}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-purple-600">
                            <Shield className="h-4 w-4" />
                            <span>Secure payment processing</span>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                          <div className="h-6 w-10 rounded bg-gray-100">
                            <svg
                              viewBox="0 0 38 24"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              width="38"
                              height="24"
                              aria-labelledby="pi-visa"
                            >
                              <title id="pi-visa">Visa</title>
                              <path
                                opacity=".07"
                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                              ></path>
                              <path
                                fill="#142688"
                                d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                              ></path>
                            </svg>
                          </div>
                          <div className="h-6 w-10 rounded bg-gray-100">
                            <svg
                              viewBox="0 0 38 24"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              width="38"
                              height="24"
                              aria-labelledby="pi-master"
                            >
                              <title id="pi-master">Mastercard</title>
                              <path
                                opacity=".07"
                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                              ></path>
                              <circle
                                fill="#EB001B"
                                cx="15"
                                cy="12"
                                r="7"
                              ></circle>
                              <circle
                                fill="#F79E1B"
                                cx="23"
                                cy="12"
                                r="7"
                              ></circle>
                              <path
                                fill="#FF5F00"
                                d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.3 3-3.4 3-5.7z"
                              ></path>
                            </svg>
                          </div>
                          <div className="h-6 w-10 rounded bg-gray-100">
                            <svg
                              viewBox="0 0 38 24"
                              xmlns="http://www.w3.org/2000/svg"
                              width="38"
                              height="24"
                              role="img"
                              aria-labelledby="pi-paypal"
                            >
                              <title id="pi-paypal">PayPal</title>
                              <path
                                opacity=".07"
                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                              ></path>
                              <path
                                fill="#003087"
                                d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                              ></path>
                              <path
                                fill="#3086C8"
                                d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                              ></path>
                              <path
                                fill="#012169"
                                d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 transition-colors ${
                    step === 1
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.agreeToTerms}
                    className={`flex items-center gap-2 rounded-full px-6 py-3 transition-colors ${
                      formData.agreeToTerms
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    Complete Subscription
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSignupFlow;
