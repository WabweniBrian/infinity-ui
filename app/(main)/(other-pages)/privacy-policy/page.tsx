import PrivacyPolicy from "@/components/main/legal/privacy-policy";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy",
};

const PrivacyPolicyPage = () => {
  return notFound();
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;
