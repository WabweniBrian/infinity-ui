import { ComponentsHeader } from "@/components/admin/components/components-header";
import { ComponentsFilters } from "@/components/admin/components/components-filters";
import { ComponentsTable } from "@/components/admin/components/components-table";
import { getComponents } from "@/lib/actions/admin/components";
import { prisma } from "@/lib/prisma";
import { ComponentsStats } from "@/components/admin/components/components-stats";

export const metadata = {
  title: "Components",
};

type SearchParams = {
  searchParams: {
    search?: string;
    category?: string;
    isFree?: string;
    isFeatured?: string;
    isNew?: string;
    isAI?: string;
    show?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
};

const ComponentsPage = async ({ searchParams }: SearchParams) => {
  const limit = 10;
  const skip = (Number(searchParams.page || "1") - 1) * limit || 0;

  const { components, componentsCount, totalComponents } = await getComponents({
    search: searchParams.search,
    category: searchParams.category,
    isFree: searchParams.isFree,
    isFeatured: searchParams.isFeatured,
    isNew: searchParams.isNew,
    isAI: searchParams.isAI,
    show: searchParams.show,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    limit,
    skip,
  });

  const categories = await prisma.category.findMany({
    select: { slug: true, name: true, id: true },
  });

  return (
    <div className="space-y-6">
      <ComponentsHeader
        categories={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />
      <ComponentsStats />
      <ComponentsFilters categories={categories} />
      <ComponentsTable
        components={components}
        componentsCount={componentsCount}
        totalComponents={totalComponents}
        totalPages={Math.ceil(componentsCount / limit)}
        offset={skip}
      />
    </div>
  );
};

export default ComponentsPage;
