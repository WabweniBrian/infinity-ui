"use server";

import { prisma } from "@/lib/prisma";

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
