"use server";

import { SearchResult } from "@/types";
import { prisma } from "../prisma";

export const getAutocompleteSuggestions = async (
  query: string,
): Promise<{ plain: string; highlighted: string }[]> => {
  if (!query) return [];

  const searchTerm = query.toLowerCase();

  // Fetch all relevant data
  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  const components = await prisma.component.findMany({
    select: { name: true, keywords: true },
  });

  const suggestions = new Map<string, string>(); // Store plain and highlighted text

  // Helper to add suggestions with highlighting
  const addSuggestion = (text: string) => {
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(searchTerm);

    if (index !== -1) {
      const highlighted =
        text.slice(0, index) +
        `<b>${text.slice(index, index + query.length)}</b>` +
        text.slice(index + query.length);

      suggestions.set(text, highlighted);
    }
  };

  // Process categories
  categories.forEach((category) => addSuggestion(category.name));

  // Process components and keywords
  components.forEach((component) => {
    addSuggestion(component.name);
    component.keywords.forEach((keyword) => addSuggestion(keyword));
  });

  // Sort: Prioritize results starting with the query
  const sortedSuggestions = Array.from(suggestions.entries()).sort((a, b) => {
    const aStartsWith = a[0].toLowerCase().startsWith(searchTerm) ? -1 : 1;
    const bStartsWith = b[0].toLowerCase().startsWith(searchTerm) ? -1 : 1;
    return aStartsWith - bStartsWith || a[0].localeCompare(b[0]);
  });

  // Return the top 5 sorted results
  return sortedSuggestions.slice(0, 5).map(([plain, highlighted]) => ({
    plain,
    highlighted,
  }));
};

export const searchComponents = async (
  query: string,
  limit: number = 10,
  offset: number = 0,
): Promise<{ components: SearchResult[]; totalPages: number }> => {
  // Using ILIKE for partial matching (case-insensitive)
  const components = await prisma.$queryRaw<SearchResult[]>`
    SELECT
      c.id,
      c.name,
      c.image,
      c.slug,
      c.description,
      c.keywords,
      cat.name AS category_name,
      ts_rank(
        to_tsvector('english', c.name || ' ' || coalesce(c.description, '') || ' ' || array_to_string(c.keywords, ' ')),
        plainto_tsquery('english', ${query})
      ) AS rank,
      similarity(c.name, ${query}) AS name_similarity,
      similarity(COALESCE(c.description, ''), ${query}) AS description_similarity,
      similarity(array_to_string(c.keywords, ' '), ${query}) AS keywords_similarity
    FROM "Component" c
    JOIN "Category" cat ON c."categoryId" = cat.id
    WHERE
      to_tsvector('english', c.name || ' ' || coalesce(c.description, '') || ' ' || array_to_string(c.keywords, ' ') || ' ' || cat.name) @@ plainto_tsquery('english', ${query})
    OR
      (similarity(c.name, ${query}) > 0.2
      OR similarity(COALESCE(c.description, ''), ${query}) > 0.2
      OR similarity(array_to_string(c.keywords, ' '), ${query}) > 0.2)
    OR
      c.name ILIKE '%' || ${query} || '%'
    OR
      c.description ILIKE '%' || ${query} || '%'
    OR
      array_to_string(c.keywords, ' ') ILIKE '%' || ${query} || '%'
    ORDER BY rank DESC,
      GREATEST(
        similarity(c.name, ${query}),
        similarity(COALESCE(c.description, ''), ${query}),
        similarity(array_to_string(c.keywords, ' '), ${query})
      ) DESC
    LIMIT ${limit} OFFSET ${offset};
  `;

  // Total number of components that match the query (without pagination).
  const totalCountResult = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) AS count
    FROM "Component" c
    JOIN "Category" cat ON c."categoryId" = cat.id
    WHERE
      to_tsvector('english', c.name || ' ' || coalesce(c.description, '') || ' ' || array_to_string(c.keywords, ' ') || ' ' || cat.name) @@ plainto_tsquery('english', ${query})
    OR
      (similarity(c.name, ${query}) > 0.2
      OR similarity(COALESCE(c.description, ''), ${query}) > 0.2
      OR similarity(array_to_string(c.keywords, ' '), ${query}) > 0.2)
    OR
      c.name ILIKE '%' || ${query} || '%'
    OR
      c.description ILIKE '%' || ${query} || '%'
    OR
      array_to_string(c.keywords, ' ') ILIKE '%' || ${query} || '%'
  `;

  // Convert BigInt to Number and calculate total pages
  const totalCount = Number(totalCountResult[0].count);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    components: components.map((component) => ({
      ...component,
      category: { name: component.category_name },
    })),
    totalPages,
  };
};

export const getCategoryComponents = async (
  category: string,
  query?: string,
  limit: number = 10,
  offset: number = 0,
  keyword?: string,
): Promise<{ components: SearchResult[]; totalPages: number }> => {
  if (!category) {
    throw new Error("Category is required.");
  }

  const filters: any = {
    category: { name: { equals: category, mode: "insensitive" } },
    OR: [
      { name: { contains: query || "", mode: "insensitive" } },
      { description: { contains: query || "", mode: "insensitive" } },
      { keywords: { has: query || "" } },
      { category: { name: { contains: query || "", mode: "insensitive" } } },
    ],
  };

  if (keyword) {
    filters.keywords = { has: keyword };
  }

  // Fetch components with filters, pagination, and sorting
  const components = await prisma.component.findMany({
    where: filters,
    include: { category: true },
    skip: offset > 0 ? offset : 0,
    take: limit > 0 ? limit : 10,
    orderBy: {
      name: "asc",
    },
  });

  // Count total matching records
  const totalCount = await prisma.component.count({ where: filters });
  const totalPages = Math.ceil(totalCount / limit);

  // Transform data to match the SearchResult structure
  const transformedComponents: SearchResult[] = components.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.image,
    slug: c.slug,
    description: c.description,
    keywords: c.keywords,
    isfree: c.isfree,
    category_name: c.category?.name || "",
    rank: 0, // Placeholder
    name_similarity: 0, // Placeholder
    description_similarity: 0, // Placeholder
    keywords_similarity: 0, // Placeholder
    max_similarity: 0, // Placeholder
  }));

  return { components: transformedComponents, totalPages };
};
