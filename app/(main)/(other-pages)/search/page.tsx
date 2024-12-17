import MainPagination from "@/components/common/main-pagination";
import NoResults from "@/components/common/no-results";
import ComponentCard from "@/components/main/common/component-card";
import { searchComponents } from "@/lib/actions/search";
import { SearchResult } from "@/types";
import { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  const { q, page } = searchParams;
  const limit = 10;
  const offset = (Number(page) - 1) * limit;
  const { components, totalPages } = await searchComponents(q, limit, offset);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-24">
      {q?.length > 0 && (
        <h1 className="mb-4 text-2xl font-bold">
          Search Results for &quot;{q}&quot;
        </h1>
      )}
      {components.length > 0 ? (
        <div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component: SearchResult) => (
              <ComponentCard component={component} key={component.id} />
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="mt-6 flex-center-center">
              <Suspense fallback={null}>
                <MainPagination pages={totalPages} />
              </Suspense>
            </div>
          )}
        </div>
      ) : (
        <NoResults title="No Results found" className="min-h-[80vh]" />
      )}
    </div>
  );
};

export default SearchPage;
