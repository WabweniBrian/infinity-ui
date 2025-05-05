import Footer from "@/components/main/common/footer";
import Navbar from "@/components/main/common/navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { createdAt: "asc" },
  });
  return (
    <>
      <Navbar categories={categories} user={user} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
