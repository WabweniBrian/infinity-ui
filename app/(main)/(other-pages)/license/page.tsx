import License from "@/components/main/legal/license";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "License",
  description: "View our license agreement",
};

const LicensePage = () => {
  return notFound();
  return <License />;
};

export default LicensePage;
