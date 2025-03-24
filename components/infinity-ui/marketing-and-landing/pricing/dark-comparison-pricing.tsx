"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

interface PricingTier {
  name: string;
  description: string;
  leadsPerMonth: string;
  features: string[];
  gradient?: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "10+ monthly opportunities",
    leadsPerMonth: "1000 - 1500 leads per month",
    features: [
      "Sending mailboxes",
      "Sales development representative",
      "Lead researcher",
      "Dedicated account manager",
      "Email deliverability specialist",
      "A/B testing",
      "No show rebooking",
    ],
  },
  {
    name: "Professional",
    description: "+20 monthly opportunities",
    leadsPerMonth: "1500 - 1300 leads per month",
    features: [
      "Sending mailboxes",
      "Sales development representative",
      "Lead researcher",
      "Dedicated account manager",
      "Email deliverability specialist",
      "A/B testing",
      "No show rebooking",
      "Priority support",
      "Advanced analytics",
    ],
    gradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Speak with us for a custom growth plan",
    leadsPerMonth: "+ 3000 leads per month",
    features: [
      "Sending mailboxes",
      "Sales development representative",
      "Lead researcher",
      "Dedicated account manager",
      "Email deliverability specialist",
      "A/B testing",
      "No show rebooking",
      "Custom integration",
      "Dedicated success manager",
      "Custom reporting",
    ],
  },
];

export default function DarkComparisonPricing() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <section className="w-full overflow-hidden bg-slate-950 px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            We&apos;re all about giving you value right from the start —
            <br />
            <span className="text-slate-400">
              no setup costs or fixed fees.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-slate-400"
          >
            Our deal is simple: we get paid for the meetings we bring in each
            month. Our success is tied to yours, and as a little extra, the
            first 5 meetings are on us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredTier(tier.name)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`relative rounded-2xl p-8 ${
                tier.gradient || "bg-slate-900"
              } border border-slate-800 transition-transform duration-300 ${
                hoveredTier === tier.name ? "scale-105" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-violet-600 px-4 py-1 text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold">{tier.name}</h3>
                <p className="text-slate-400">{tier.description}</p>
              </div>

              <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="mb-1 font-medium text-violet-400">
                  Lead Generation
                </div>
                <div className="text-lg">{tier.leadsPerMonth}</div>
              </div>

              <div className="mb-8 space-y-4">
                {tier.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                      <Check className="h-3 w-3 text-violet-400" />
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium ${
                  tier.popular
                    ? "bg-violet-600 text-white hover:bg-violet-500"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400">
            Need a custom plan?{" "}
            <a
              href="#"
              className="font-medium text-violet-400 hover:text-violet-300"
            >
              Contact our sales team
            </a>{" "}
            for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
