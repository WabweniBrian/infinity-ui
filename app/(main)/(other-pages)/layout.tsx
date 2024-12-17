import Footer from "@/components/main/common/footer";
import Navbar from "@/components/main/common/navbar";
import { prisma } from "@/lib/prisma";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" },
  });
  return (
    <>
      <Navbar categories={categories} />
      <main className="min-h-screen">{children}</main>
      <Footer categories={categories} />
    </>
  );
};

export default HomeLayout;
