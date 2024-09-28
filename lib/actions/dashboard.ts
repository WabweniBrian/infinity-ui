"use server";

import { prisma } from "@/lib/prisma";

export const getStats = async () => {
  const componentsCount = await prisma.component.count();
  const userCount = await prisma.user.count();
  const purchasesCount = await prisma.purchase.count();
  const purchases = await prisma.purchase.findMany({
    select: { amount: true },
  });

  const totalAmount = purchases.reduce((acc, curr) => acc + curr.amount, 0);

  return {
    componentsCount,
    userCount,
    purchasesCount,
    totalAmount,
  };
};
