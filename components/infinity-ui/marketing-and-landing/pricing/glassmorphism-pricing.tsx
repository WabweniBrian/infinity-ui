"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  popular?: boolean;
  gradient: string;
  shadow: string;
}

const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: { monthly: 19, yearly: 190 },
    description: "Essential features for individuals",
    gradient: "from-blue-600/20 to-cyan-400/20",
    shadow: "shadow-blue-500/10",
    features: [
      "3 projects",
      "1 team member",
      "10GB storage",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 49, yearly: 490 },
    description: "Advanced features for professionals",
    gradient: "from-violet-600/20 to-purple-400/20",
    shadow: "shadow-violet-500/10",
    popular: true,
    features: [
      "Unlimited projects",
      "5 team members",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    description: "Complete solution for businesses",
    gradient: "from-fuchsia-600/20 to-pink-400/20",
    shadow: "shadow-fuchsia-500/10",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "500GB storage",
      "Custom analytics",
      "24/7 support",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "SSO authentication",
    ],
  },
];

export default function GlassmorphismPricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 text-white"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Background Elements */}
        <div className="animate-blob absolute left-20 top-40 h-72 w-72 rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute right-20 top-40 h-72 w-72 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-1/2 h-72 w-72 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>

        <div className="relative z-10">
          <div className="mb-16 text-center">
            <motion.h2
              className="mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              Transparent Pricing for Everyone
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              No hidden fees. Choose the plan that works best for you.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              className="mt-8 inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 p-1 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  !isYearly
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isYearly
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly <span className="font-bold text-emerald-400">-20%</span>
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br backdrop-blur-md ${plan.gradient} border border-white/10 ${plan.shadow}`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="flex items-center rounded-bl-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                      <Star className="mr-1 h-3 w-3 fill-current" />
                      POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="mt-2 h-12 text-sm text-slate-300">
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="ml-1 text-slate-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="mt-1 text-sm text-emerald-400">
                        ${plan.price.monthly * 12 - plan.price.yearly} savings
                        per year
                      </p>
                    )}
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-medium text-slate-300">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{ duration: 0.3, delay: i * 0.05 + 0.5 }}
                          className="flex items-start"
                        >
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-400" />
                          <span className="text-sm text-slate-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 font-medium ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                        : "bg-slate-700 text-white hover:bg-slate-600"
                    } `}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-slate-400">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Need a custom plan?{" "}
              <a
                href="#"
                className="font-medium text-violet-400 hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
