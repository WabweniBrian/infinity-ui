"use server";

import { prisma } from "../prisma";

export async function getKeywords(category?: string): Promise<string[]> {
  const components = await prisma.component.findMany({
    where: category
      ? {
          category: { name: category },
        }
      : {},
    select: {
      keywords: true,
    },
  });

  const allKeywords = components.flatMap((component) => component.keywords);
  const uniqueKeywords = Array.from(new Set(allKeywords));

  return uniqueKeywords.sort((a, b) => a.localeCompare(b));
}
