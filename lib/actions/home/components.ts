"use server";

import { prisma } from "@/lib/prisma";
import { ComponentType } from "@/types";

type Component = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isFree: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isAI: boolean;
  price: number | null;
  keywords: string[];
  category_name: string;
  category_slug: string;
  codeSnippets: {
    id: string;
    code: string;
    fileName: string;
    extension: string;
    language: string;
  }[];
};

// ----------------------------------------------------- GET COMPONENTS -----------------------------------------------------
export const getComponents = async ({
  search,
  category,
  keyword,
  isFree,
  isFeatured,
  skip = 0,
  limit,
}: {
  search?: string;
  category?: string;
  keyword?: string;
  isFree?: boolean;
  isFeatured?: boolean;
  limit?: number;
  skip?: number;
}): Promise<{ components: ComponentType[]; componentsCount: number }> => {
  const components = await prisma.$queryRaw<Component[]>`
    WITH SearchResults AS (
      SELECT
        c.id,
        c.name,
        c.slug,
        c.description,
        c.isfree AS "isFree",
        c."isFeatured",
        c."isNew",
        c."isAI",
        c.price,
        c.keywords,
        c."createdAt",
        cat.name AS category_name,
        cat.slug AS category_slug,
        CASE WHEN COALESCE(${search}::TEXT, '') <> '' THEN
          ts_rank(
            to_tsvector('english', 
              c.name || ' ' || 
              COALESCE(c.description, '') || ' ' || 
              array_to_string(c.keywords, ' ') || ' ' || 
              cat.name
            ),
            plainto_tsquery('english', ${search})
          )
        ELSE 0 END AS rank,
        CASE WHEN COALESCE(${search}::TEXT, '') <> '' THEN
          greatest(
            similarity(c.name, ${search}),
            similarity(COALESCE(c.description, ''), ${search})
          )
        ELSE 0 END AS similarity
      FROM "Component" c
      LEFT JOIN "Category" cat ON c."categoryId" = cat.id
      WHERE
        c.show = true
        AND (COALESCE(${category}::TEXT, '') = '' OR cat.slug = ${category})
        AND (COALESCE(${keyword}::TEXT, '') = '' OR ${keyword} = ANY(c.keywords))
        AND (${isFree}::BOOLEAN IS NULL OR c.isfree = ${isFree})
        AND (${isFeatured}::BOOLEAN IS NULL OR c."isFeatured" = ${isFeatured})
        AND (COALESCE(${search}::TEXT, '') = '' OR (
          to_tsvector('english', 
            c.name || ' ' || 
            COALESCE(c.description, '') || ' ' || 
            array_to_string(c.keywords, ' ') || ' ' || 
            cat.name
          ) @@ plainto_tsquery('english', ${search})
          OR similarity(c.name, ${search}) > 0.1
          OR similarity(COALESCE(c.description, ''), ${search}) > 0.1
            OR similarity(cat.name, ${search}) > 0.1
        OR similarity(array_to_string(c.keywords, ' '), ${search}) > 0.1
        ))
    )
    SELECT *
    FROM SearchResults
    ORDER BY 
      rank DESC,
      similarity DESC,
      RANDOM()
    LIMIT ${limit} OFFSET ${skip};
  `;

  // Get the total count
  const totalCountResult = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(DISTINCT c.id) AS count
    FROM "Component" c
    LEFT JOIN "Category" cat ON c."categoryId" = cat.id
    WHERE
      c.show = true
      AND (COALESCE(${category}::TEXT, '') = '' OR cat.slug = ${category})
      AND (COALESCE(${keyword}::TEXT, '') = '' OR ${keyword} = ANY(c.keywords))
      AND (${isFree}::BOOLEAN IS NULL OR c.isfree = ${isFree})
      AND (${isFeatured}::BOOLEAN IS NULL OR c."isFeatured" = ${isFeatured})
      AND (COALESCE(${search}::TEXT, '') = '' OR (
        to_tsvector('english', 
          c.name || ' ' || 
          COALESCE(c.description, '') || ' ' || 
          array_to_string(c.keywords, ' ') || ' ' || 
          cat.name
        ) @@ plainto_tsquery('english', ${search})
        OR similarity(c.name, ${search}) > 0.1
        OR similarity(COALESCE(c.description, ''), ${search}) > 0.1
        OR similarity(cat.name, ${search}) > 0.1
        OR similarity(array_to_string(c.keywords, ' '), ${search}) > 0.1
      ));
  `;

  // Get code snippets for each component
  const componentsWithCodeSnippets = await Promise.all(
    components.map(async (component) => {
      const codeSnippets = await prisma.codeSnippet.findMany({
        where: {
          componentId: component.id,
        },
        select: {
          id: true,
          code: true,
          fileName: true,
          extension: true,
          language: true,
        },
      });

      return {
        ...component,
        codeSnippets,
      };
    }),
  );

  return {
    components: componentsWithCodeSnippets.map((component) => ({
      id: component.id,
      name: component.name,
      slug: component.slug,
      description: component.description,
      isFree: component.isFree,
      isFeatured: component.isFeatured,
      isNew: component.isNew,
      isAI: component.isAI,
      price: component.price,
      keywords: component.keywords,
      category: {
        name: component.category_name,
        slug: component.category_slug,
      },
      codeSnippets: component.codeSnippets,
    })),
    componentsCount: Number(totalCountResult[0].count),
  };
};
