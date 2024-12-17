import Pricing from "@/components/main/pricing/pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the perfect plan for your UI component needs",
};

const PricingPage = () => {
  return <Pricing />;
};

export default PricingPage;
