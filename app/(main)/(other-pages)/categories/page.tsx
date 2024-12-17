import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/main/common/page-header";
import CategoryGrid from "@/components/main/categories/category-grid";

export const metadata = {
  title: "Categories",
  description: "Explore our wide range of UI component categories",
};

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, description: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-24">
      <PageHeader
        heading="Categories"
        text="Explore our wide range of UI component categories"
      />
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid categories={categories} />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;

const CategoryGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-2">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
};
