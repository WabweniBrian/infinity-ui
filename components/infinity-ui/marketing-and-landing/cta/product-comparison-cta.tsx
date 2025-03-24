"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, Check, HelpCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

const ProductComparisonCta = () => {
  const controls = useAnimation()
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [isAnnual, setIsAnnual] = useState(true)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

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
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Plan data
  const plans = [
    {
      name: "Basic",
      monthly: 9,
      annual: 90,
      features: [
        { name: "Core features", included: true },
        { name: "5 projects", included: true },
        { name: "1 team member", included: true },
        { name: "5GB storage", included: true },
        { name: "API access", included: false },
        { name: "Advanced analytics", included: false },
        { name: "24/7 support", included: false },
      ],
    },
    {
      name: "Pro",
      monthly: 19,
      annual: 190,
      popular: true,
      features: [
        { name: "Core features", included: true },
        { name: "Unlimited projects", included: true },
        { name: "5 team members", included: true },
        { name: "50GB storage", included: true },
        { name: "API access", included: true },
        { name: "Advanced analytics", included: true },
        { name: "24/7 support", included: false },
      ],
    },
    {
      name: "Enterprise",
      monthly: 49,
      annual: 490,
      features: [
        { name: "Core features", included: true },
        { name: "Unlimited projects", included: true },
        { name: "Unlimited team members", included: true },
        { name: "500GB storage", included: true },
        { name: "API access", included: true },
        { name: "Advanced analytics", included: true },
        { name: "24/7 support", included: true },
      ],
    },
  ]

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                CHOOSE YOUR PLAN
              </motion.div>

              <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold text-gray-900">
                Find the perfect plan for your needs
              </motion.h2>

              <motion.p variants={itemVariants} className="mx-auto max-w-lg text-gray-600">
                Choose the plan that works best for you and your team. All plans include a 14-day free trial.
              </motion.p>
            </div>

            {/* Billing toggle */}
            <motion.div variants={itemVariants} className="mb-8 flex justify-center">
              <div className="flex items-center gap-3 rounded-full bg-slate-100 p-1">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    !isAnnual ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isAnnual ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Annual
                  {isAnnual && (
                    <span className="absolute -right-2 -top-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save 20%
                    </span>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Plan cards */}
            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-xl border p-6 transition-all ${
                    selectedPlan === index
                      ? "border-indigo-500 ring-1 ring-indigo-500"
                      : "border-gray-200 hover:border-indigo-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-6 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">${isAnnual ? plan.annual : plan.monthly}</span>
                      <span className="text-gray-500">{isAnnual ? "/year" : "/month"}</span>
                    </div>
                    {isAnnual && (
                      <div className="mt-1 text-sm text-green-600">
                        ${Math.round(plan.annual / 12)} per month, billed annually
                      </div>
                    )}
                  </div>

                  <div className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(index)}
                    className={`group flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      selectedPlan === index
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-white text-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {selectedPlan === index ? "Selected" : "Select Plan"}
                    {selectedPlan !== index && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div variants={itemVariants} className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
              >
                Get Started with {plans[selectedPlan].name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* Additional info */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <HelpCircle className="h-4 w-4" />
              <span>
                Need help choosing?{" "}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">
                  Contact sales
                </a>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductComparisonCta

