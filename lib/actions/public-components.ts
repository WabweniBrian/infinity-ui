"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicComponentsData(search?: string) {
  const categories = await prisma.category.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {},
    include: {
      Component: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
      },
    },
  });

  const groupedCategories = categories.reduce(
    (acc, category) => {
      if (!acc[category.categoryType]) {
        acc[category.categoryType] = [];
      }
      acc[category.categoryType].push(category);
      return acc;
    },
    {} as Record<string, typeof categories>,
  );

  return {
    success: true,
    data: groupedCategories,
  };
}
