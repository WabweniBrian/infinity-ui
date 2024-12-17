import MainPagination from "@/components/common/main-pagination";
import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import ComponentCard from "@/components/main/common/component-card";
import KeywordsSearch from "@/components/main/common/keywords-search";
import { getCategoryComponents } from "@/lib/actions/search";
import { formatWord } from "@/lib/utils";
import { SearchResult } from "@/types";
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = params.category;
  try {
    return {
      title: formatWord(category),
    };
  } catch (error) {
    return notFound();
  }
}

const CategoryComponents = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: {
    page: string;
    search: string;
    keyword: string;
    isfree: string;
  };
}) => {
  const { page, search, keyword } = searchParams;
  const { category } = params;
  const isfree = searchParams.isfree === "true";
  const limit = 10;
  const offset = (Number(page) - 1) * limit;

  const { components, totalPages } = await getCategoryComponents(
    formatWord(category),
    search,
    limit,
    offset,
    keyword,
    // isfree,
  );

  return (
    <div className="relative bg-background pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="my-4 text-center text-3xl font-bold">
          {formatWord(params.category)}
        </h1>
        <div className="mb-4">
          <SearchInput
            className="sm:w-full"
            inputClassName="rounded-full dark:bg-accent/20 backdrop-blur-sm"
            placeholder="Search for components..."
          />
          {/* <FreeComponentToggle /> */}
        </div>
        <div className="mt-4">
          <KeywordsSearch category={formatWord(params.category)} />
        </div>
        <div>
          {components.length > 0 ? (
            <div>
              <ul className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <NoResults title="No Components found" className="min-h-[80vh]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryComponents;
