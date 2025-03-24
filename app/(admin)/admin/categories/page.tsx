import AddCategoryDialog from "@/components/admin/components/add-category";
import CategoryActions from "@/components/admin/components/category-actions";
import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import { getCategories } from "@/lib/actions/categories";

export const metadata = {
  title: "Categories",
};

type SearchParams = {
  searchParams: {
    search: string;
  };
};

export default async function ComponentsAndCategoriesPage({
  searchParams,
}: SearchParams) {
  const categories = await getCategories(searchParams.search);

  return (
    <div>
      <div className="rounded-xl border bg-white/60 p-4 flex-center-between dark:bg-accent/20">
        <SearchInput className="w-full" />
        <AddCategoryDialog />
      </div>
      <div>
        {categories.length === 0 && (
          <NoResults title="No categories found" className="min-h-[60vh]" />
        )}
        {categories.length !== 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                className="rounded-xl border bg-white/80 p-4 dark:bg-accent/20"
                key={category.id}
              >
                <div>
                  <div className="flex-center-between">
                    <h1 className="flex-1 truncate text-lg">{category.name}</h1>
                    <CategoryActions id={category.id} />
                  </div>
                </div>
                <div className="mt-2">
                  <p>Components: {category._count.components}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
