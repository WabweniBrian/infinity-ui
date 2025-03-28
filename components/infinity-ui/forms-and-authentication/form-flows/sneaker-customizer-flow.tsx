"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Layers,
  Package,
  Palette,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type FormData = {
  baseColor: string;
  accentColor: string;
  soleColor: string;
  material: string;
  size: string;
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const SneakerCustomizerFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    baseColor: "white",
    accentColor: "black",
    soleColor: "white",
    material: "canvas",
    size: "",
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (colorType: string, color: string) => {
    setFormData((prev) => ({ ...prev, [colorType]: color }));
  };

  const handleMaterialChange = (material: string) => {
    setFormData((prev) => ({ ...prev, material }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
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

  const baseColors = ["white", "black", "gray", "navy", "red"];
  const accentColors = [
    "black",
    "white",
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
  ];
  const soleColors = ["white", "black", "gum", "transparent", "red"];
  const materials = [
    { id: "canvas", name: "Canvas", description: "Lightweight and breathable" },
    { id: "leather", name: "Leather", description: "Premium and durable" },
    { id: "suede", name: "Suede", description: "Soft and stylish" },
    { id: "knit", name: "Knit", description: "Flexible and comfortable" },
  ];
  const sizes = ["6", "7", "8", "9", "10", "11", "12", "13"];

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

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <Palette className="h-5 w-5" />;
      case 2:
        return <Layers className="h-5 w-5" />;
      case 3:
        return <Package className="h-5 w-5" />;
      case 4:
        return <CreditCard className="h-5 w-5" />;
      default:
        return <Palette className="h-5 w-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Choose Colors";
      case 2:
        return "Select Material";
      case 3:
        return "Size & Details";
      case 4:
        return "Payment";
      default:
        return "Customize";
    }
  };

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Your Custom Sneakers Are On The Way!
            </h2>
            <p className="mx-auto mb-8 max-w-md text-gray-600">
              Thank you for your order. We&apos;ve received your custom design
              and will begin crafting your unique sneakers right away.
            </p>
            <div className="mx-auto mb-8 max-w-md rounded-2xl bg-indigo-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold">
                  #SN{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold">
                  {new Date(
                    Date.now() + 14 * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="my-4 h-px bg-indigo-100"></div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <ShoppingBag className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Custom{" "}
                    {formData.material.charAt(0).toUpperCase() +
                      formData.material.slice(1)}{" "}
                    Sneakers
                  </h3>
                  <p className="text-sm text-gray-500">
                    Size: {formData.size} • {formData.baseColor}/
                    {formData.accentColor}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-indigo-600 px-8 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Design Another Pair
            </button>
          </motion.div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Design Your Custom Sneakers
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  Step {step} of {totalSteps}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full bg-indigo-600"
                  initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-2 flex justify-between">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center ${i + 1 <= step ? "text-indigo-600" : "text-gray-400"}`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${i + 1 <= step ? "bg-indigo-100" : "bg-gray-100"}`}
                    >
                      {getStepIcon(i + 1)}
                    </div>
                    <span className="mt-1 hidden text-xs sm:block">
                      {getStepTitle(i + 1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Preview column */}
              <div className="lg:col-span-2">
                <div className="sticky top-8 rounded-3xl bg-white p-6 shadow-lg">
                  <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-gray-50">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      alt="Sneaker preview"
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-gray-500">Sneaker Preview</p>
                        <p className="text-sm text-gray-400">
                          Base: {formData.baseColor}
                        </p>
                        <p className="text-sm text-gray-400">
                          Accent: {formData.accentColor}
                        </p>
                        <p className="text-sm text-gray-400">
                          Material: {formData.material}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Base Color</span>
                      <span className="font-medium capitalize text-gray-900">
                        {formData.baseColor}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Accent Color</span>
                      <span className="font-medium capitalize text-gray-900">
                        {formData.accentColor}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Sole Color</span>
                      <span className="font-medium capitalize text-gray-900">
                        {formData.soleColor}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Material</span>
                      <span className="font-medium capitalize text-gray-900">
                        {formData.material}
                      </span>
                    </div>
                    {formData.size && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Size</span>
                        <span className="font-medium text-gray-900">
                          {formData.size}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-gray-500">
                        Base Price
                      </span>
                      <span className="font-medium text-gray-900">$129.00</span>
                    </div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-gray-500">
                        Customization
                      </span>
                      <span className="font-medium text-gray-900">$20.00</span>
                    </div>
                    <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">$149.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form column */}
              <div className="lg:col-span-3">
                <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.h3
                          variants={itemVariants}
                          className="mb-6 text-xl font-bold text-gray-900"
                        >
                          Choose Your Colors
                        </motion.h3>

                        <motion.div variants={itemVariants} className="mb-8">
                          <label className="mb-3 block text-sm font-medium text-gray-700">
                            Base Color
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {baseColors.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() =>
                                  handleColorChange("baseColor", color)
                                }
                                className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform ${formData.baseColor === color ? "scale-110 ring-2 ring-indigo-600 ring-offset-2" : ""}`}
                                style={{
                                  backgroundColor:
                                    color === "navy" ? "#0a192f" : color,
                                }}
                              >
                                {formData.baseColor === color && (
                                  <Check
                                    className={`h-5 w-5 ${["white", "yellow"].includes(color) ? "text-gray-900" : "text-white"}`}
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8">
                          <label className="mb-3 block text-sm font-medium text-gray-700">
                            Accent Color
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {accentColors.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() =>
                                  handleColorChange("accentColor", color)
                                }
                                className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform ${formData.accentColor === color ? "scale-110 ring-2 ring-indigo-600 ring-offset-2" : ""}`}
                                style={{ backgroundColor: color }}
                              >
                                {formData.accentColor === color && (
                                  <Check
                                    className={`h-5 w-5 ${["white", "yellow"].includes(color) ? "text-gray-900" : "text-white"}`}
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8">
                          <label className="mb-3 block text-sm font-medium text-gray-700">
                            Sole Color
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {soleColors.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() =>
                                  handleColorChange("soleColor", color)
                                }
                                className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform ${formData.soleColor === color ? "scale-110 ring-2 ring-indigo-600 ring-offset-2" : ""}`}
                                style={{
                                  backgroundColor:
                                    color === "gum"
                                      ? "#d3a57c"
                                      : color === "transparent"
                                        ? "rgba(255,255,255,0.5)"
                                        : color,
                                  border:
                                    color === "transparent"
                                      ? "1px dashed #ccc"
                                      : "none",
                                }}
                              >
                                {formData.soleColor === color && (
                                  <Check
                                    className={`h-5 w-5 ${["white", "yellow", "transparent", "gum"].includes(color) ? "text-gray-900" : "text-white"}`}
                                  />
                                )}
                              </button>
                            ))}
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
                          className="mb-6 text-xl font-bold text-gray-900"
                        >
                          Select Material
                        </motion.h3>

                        <motion.div
                          variants={itemVariants}
                          className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2"
                        >
                          {materials.map((material) => (
                            <button
                              key={material.id}
                              type="button"
                              onClick={() => handleMaterialChange(material.id)}
                              className={`rounded-2xl border-2 p-4 text-left transition-all ${
                                formData.material === material.id
                                  ? "border-indigo-600 bg-indigo-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">
                                  {material.name}
                                </h4>
                                <div
                                  className={`h-5 w-5 rounded-full ${
                                    formData.material === material.id
                                      ? "bg-indigo-600"
                                      : "bg-gray-200"
                                  } flex items-center justify-center`}
                                >
                                  {formData.material === material.id && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">
                                {material.description}
                              </p>
                            </button>
                          ))}
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="mb-8 rounded-2xl bg-gray-50 p-4"
                        >
                          <h4 className="mb-2 font-medium text-gray-900">
                            Material Details
                          </h4>
                          <p className="mb-4 text-sm text-gray-600">
                            {formData.material === "canvas" &&
                              "Canvas is a durable plain-woven fabric that's lightweight and breathable. Perfect for everyday wear and warmer weather."}
                            {formData.material === "leather" &&
                              "Premium leather offers exceptional durability and a luxurious look. It molds to your foot over time for a custom fit."}
                            {formData.material === "suede" &&
                              "Suede provides a soft, velvety texture with a stylish appearance. It's comfortable but requires more care to maintain."}
                            {formData.material === "knit" &&
                              "Knit material creates a sock-like fit that's extremely flexible and comfortable. It's breathable and perfect for an active lifestyle."}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-indigo-600">
                            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                            <span>
                              Care instructions will be included with your order
                            </span>
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
                      >
                        <motion.h3
                          variants={itemVariants}
                          className="mb-6 text-xl font-bold text-gray-900"
                        >
                          Size & Details
                        </motion.h3>

                        <motion.div variants={itemVariants} className="mb-8">
                          <label className="mb-3 block text-sm font-medium text-gray-700">
                            Select Your Size
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({ ...prev, size }))
                                }
                                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                                  formData.size === size
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8">
                          <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Your name"
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8">
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
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="your@email.com"
                          />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <label
                            htmlFor="address"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Shipping Address
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange as any}
                            required
                            rows={3}
                            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Your full shipping address"
                          />
                        </motion.div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.h3
                          variants={itemVariants}
                          className="mb-6 text-xl font-bold text-gray-900"
                        >
                          Payment Details
                        </motion.h3>

                        <motion.div variants={itemVariants} className="mb-8">
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
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="1234 5678 9012 3456"
                          />
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="mb-8 grid grid-cols-2 gap-4"
                        >
                          <div>
                            <label
                              htmlFor="expiry"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleChange}
                              required
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                              placeholder="123"
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="mb-8 rounded-2xl bg-indigo-50 p-6"
                        >
                          <h4 className="mb-4 font-medium text-gray-900">
                            Order Summary
                          </h4>
                          <div className="mb-2 flex justify-between">
                            <span className="text-gray-600">
                              Custom {formData.material} Sneakers
                            </span>
                            <span className="font-medium">$149.00</span>
                          </div>
                          <div className="mb-2 flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">Free</span>
                          </div>
                          <div className="mb-2 flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium">$11.92</span>
                          </div>
                          <div className="my-4 h-px bg-indigo-100"></div>
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">
                              Total
                            </span>
                            <span className="font-bold text-gray-900">
                              $160.92
                            </span>
                          </div>
                        </motion.div>
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
                      <ChevronLeft className="h-5 w-5" />
                      Back
                    </button>

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
                      >
                        Continue
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
                      >
                        Complete Order
                        <Check className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SneakerCustomizerFlow;
