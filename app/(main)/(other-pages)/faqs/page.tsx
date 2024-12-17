import FAQs from "@/components/main/pricing/faqs";
import React from "react";

export const metadata = {
  title: "FAQs",
  description: "Frequently asked questions",
};

const Faqs = () => {
  return (
    <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-28">
      <div className="absolute left-1/2 top-36 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="relative z-10">
        <FAQs />
      </div>
    </div>
  );
};

export default Faqs;
