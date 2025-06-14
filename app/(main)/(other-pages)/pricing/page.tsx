import { Metadata } from "next";

import LifetimeDealCTA from "@/components/main/common/lifetime-deal";
import FAQs from "@/components/main/pricing/faqs";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the perfect plan for your UI component needs",
};

const PricingPage = () => {
  return notFound();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 pt-20 dark:bg-background">
      <div className="absolute left-1/2 top-36 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="w-full">
        <LifetimeDealCTA />
      </div>

      <div className="pb-20">
        <FAQs />
      </div>
    </div>
  );
};

export default PricingPage;
