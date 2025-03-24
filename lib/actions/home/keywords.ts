"use server";

import { prisma } from "@/lib/prisma";

export type KeywordWithCount = {
  keyword: string;
  count: number;
};

export type CategoryWithKeywords = {
  name: string;
  keywords: KeywordWithCount[];
};

// ----------------------------------------------------- GET KEYWORDS -----------------------------------------------------

/**
 * Gets keywords for the home page grouped by category
 */
export const getKeywordsByCategory = async (): Promise<
  CategoryWithKeywords[]
> => {
  // Get all categories with their components' keywords
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      components: {
        where: {
          show: true,
        },
        select: {
          id: true,
          keywords: true,
        },
      },
    },
  });

  // Process and format the results
  const categoriesWithKeywords = categories.map((category) => {
    // Count components for each keyword
    const keywordComponentCounts: Record<string, Set<string>> = {};

    category.components.forEach((component) => {
      component.keywords.forEach((keyword) => {
        if (!keywordComponentCounts[keyword]) {
          keywordComponentCounts[keyword] = new Set();
        }
        keywordComponentCounts[keyword].add(component.id);
      });
    });

    // Convert to array of objects with keyword and component count
    const sortedKeywords = Object.entries(keywordComponentCounts)
      .map(([keyword, componentIds]) => ({
        keyword,
        count: componentIds.size,
      }))
      .sort((a, b) => a.keyword.localeCompare(b.keyword));

    return {
      name: category.name,
      keywords: sortedKeywords,
    };
  });

  // Filter out categories with no keywords
  return categoriesWithKeywords.filter(
    (category) => category.keywords.length > 0,
  );
};

/**
 * Gets keywords for a specific category page
 */
export const getKeywordsBySpecificCategory = async (
  categoryName: string,
): Promise<KeywordWithCount[]> => {
  // Find the category by name
  const category = await prisma.category.findFirst({
    where: {
      slug: categoryName,
    },
    select: {
      components: {
        where: {
          show: true,
        },
        select: {
          id: true,
          keywords: true,
        },
      },
    },
  });

  if (!category) {
    return [];
  }

  // Count components for each keyword
  const keywordComponentCounts: Record<string, Set<string>> = {};

  category.components.forEach((component) => {
    component.keywords.forEach((keyword) => {
      if (!keywordComponentCounts[keyword]) {
        keywordComponentCounts[keyword] = new Set();
      }
      keywordComponentCounts[keyword].add(component.id);
    });
  });

  // Convert to array of objects with keyword and component count
  const sortedKeywords = Object.entries(keywordComponentCounts)
    .map(([keyword, componentIds]) => ({
      keyword,
      count: componentIds.size,
    }))
    .sort((a, b) => a.keyword.localeCompare(b.keyword));

  return sortedKeywords;
};

/**
 * Gets all unique keywords across all categories
 */
export const getAllUniqueKeywords = async (): Promise<KeywordWithCount[]> => {
  // Get all components with their keywords
  const components = await prisma.component.findMany({
    where: {
      show: true,
    },
    select: {
      id: true,
      keywords: true,
    },
  });

  // Count components for each keyword
  const keywordComponentCounts: Record<string, Set<string>> = {};

  components.forEach((component) => {
    component.keywords.forEach((keyword) => {
      if (!keywordComponentCounts[keyword]) {
        keywordComponentCounts[keyword] = new Set();
      }
      keywordComponentCounts[keyword].add(component.id);
    });
  });

  // Convert to array of objects with keyword and component count
  const sortedKeywords = Object.entries(keywordComponentCounts)
    .map(([keyword, componentIds]) => ({
      keyword,
      count: componentIds.size,
    }))
    .sort((a, b) => a.keyword.localeCompare(b.keyword));

  return sortedKeywords;
};
