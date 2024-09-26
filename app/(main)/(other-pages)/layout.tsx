import Footer from "@/components/main/common/footer";
import Navbar from "@/components/main/common/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
