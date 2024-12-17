"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Check,
  FormInput,
  LayoutDashboard,
  Rocket,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import PricingCard from "./pricing-card";
import FAQs from "./faqs";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("bundle");

  const bundlePlans = [
    {
      title: "Solo Plan",
      price: "$230",
      description: "Perfect for individual developers and small projects",
      features: [
        "Single user license",
        "Access to all components",
        "Lifetime access",
        "Unlimited projects",
        "Customer support",
        "Free updates",
      ],
    },
    {
      title: "Team Plan",
      price: "$350",
      description: "Ideal for teams and larger projects",
      features: [
        "30 user licenses",
        "Access to all components",
        "Lifetime access",
        "Unlimited projects",
        "Customer support",
        "Free updates",
      ],
      popularPlan: true,
    },
  ];

  const componentPacks = [
    {
      title: "Dashboard & Application",
      price: "$80",
      description:
        "Essential components for building powerful dashboards and app interfaces",
      features: [
        "Charts included",
        "Lifetime access",
        "Unlimited projects",
        "Customer support",
        "Free updates",
      ],
      icon: <LayoutDashboard className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Landing & Marketing (+SaaS)",
      price: "$80",
      description:
        "Create stunning landing pages and marketing sites with ease",
      features: [
        "SaaS components included",
        "Lifetime access",
        "Unlimited projects",
        "Customer support",
        "Free updates",
      ],
      icon: <Rocket className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Forms & Authentication",
      price: "$80",
      description:
        "Build secure and user-friendly forms and authentication flows",
      features: [
        "Form validation included",
        "Lifetime access",
        "Unlimited projects",
        "Customer support",
        "Free updates",
      ],
      icon: <FormInput className="h-6 w-6 text-green-500" />,
    },
    {
      title: "E-commerce & Shopping",
      price: "$80",
      description: "Build feature-rich online stores and shopping experiences",
      features: [
        "Lifetime access",
        "Unlimited projects",
        "Customer support",
        "Free updates",
      ],
      icon: <ShoppingCart className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 pt-20 text-gray-900 dark:bg-background dark:text-white">
      <div className="absolute left-1/2 top-36 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="relative z-20 mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
            Get lifetime access.
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
            Choose a plan that fits your needs. All plans come with lifetime
            access, free updates, and customer support
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="mx-auto w-fit rounded-full bg-blue-100 p-1 flex-center-center dark:bg-gray-800">
            <TabsTrigger
              value="bundle"
              className="rounded-full px-4 py-2 transition-all data-[state=active]:bg-brand data-[state=active]:text-white"
            >
              Bundle
            </TabsTrigger>
            <TabsTrigger
              value="packs"
              className="rounded-full px-4 py-2 transition-all data-[state=active]:bg-brand data-[state=active]:text-white"
            >
              Packs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bundle">
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {bundlePlans.map((plan, index) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PricingCard {...plan} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="packs">
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {componentPacks.map((pack, index) => (
                <motion.div
                  key={pack.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PricingCard {...pack} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="rounded-2xl border bg-white p-8 text-center dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-4 text-2xl font-bold">All Plans Include</h2>
          <ul className="mx-auto grid max-w-3xl gap-4 text-left md:grid-cols-3">
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Lifetime access
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Free updates
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              TypeScript support
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Responsive design
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Dark mode included
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Accessibility features
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <FAQs />
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
