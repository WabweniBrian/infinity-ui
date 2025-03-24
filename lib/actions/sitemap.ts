"use server";

import { prisma } from "@/lib/prisma";

export const getComponents = async () => {
  return prisma.component.findMany({
    select: {
      slug: true,
      name: true,
      updatedAt: true,
      category: { select: { slug: true } },
    },
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({ select: { slug: true, updatedAt: true } });
};
