import { getComponents, getCategories } from "@/lib/actions/sitemap";
import type { ISitemapField } from "next-sitemap";
import { getServerSideSitemap } from "next-sitemap";

const BASE_URL = "https://infinityui.vercel.app";

export async function GET(request: Request) {
  const components = await getComponents();
  const categories = await getCategories();

  // Generate sitemap entries
  const sitemapEntries: ISitemapField[] = [
    {
      loc: BASE_URL,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },

    // Components
    ...components.map(
      (component): ISitemapField => ({
        loc: `${BASE_URL}/categories/${component.category.slug}?search=${component.name}`,
        lastmod: new Date(component.updatedAt).toISOString(),
        changefreq: "daily",
        priority: 0.8,
      }),
    ),

    // Categories
    ...categories.map(
      (category): ISitemapField => ({
        loc: `${BASE_URL}/categories/${category.slug}`,
        lastmod: new Date(category.updatedAt).toISOString(),
        changefreq: "daily",
        priority: 0.7,
      }),
    ),
  ];

  return getServerSideSitemap(sitemapEntries);
}
