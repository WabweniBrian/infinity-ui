import MainPagination from "@/components/common/main-pagination";
import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import ComponentCard from "@/components/main/common/component-card";
import KeywordsSearch from "@/components/main/common/keywords-search";
import { formatWord } from "@/lib/utils";
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComponents } from "@/lib/actions/home/components";
import FreeComponentToggle from "@/components/main/common/free-component-toggle";
import { getCurrentUser } from "@/lib/auth";

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

type Params = {
  params: {
    category: string;
  };
  searchParams: {
    page: string;
    search: string;
    keyword: string;
    isfree: string;
  };
};

const CategoryComponents = async ({ params, searchParams }: Params) => {
  const currentUser = await getCurrentUser();
  const { page, search, keyword } = searchParams;
  const { category } = params;
  const isfree = searchParams.isfree
    ? searchParams.isfree === "true"
    : undefined;
  const limit = 10;
  const skip = (page ? parseInt(page) - 1 : 0) * limit;

  const { components, componentsCount } = await getComponents({
    category,
    search,
    limit,
    skip,
    keyword,
    isFree: isfree,
  });

  const totalPages = Math.ceil(componentsCount / limit);

  return (
    <div className="relative bg-background pb-10 pt-20">
      <header className="bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-10 text-center text-white">
        <h1 className="mb-3 text-3xl font-bold md:text-5xl">
          {formatWord(params.category)}
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-200">
          Modern, responsive UI for your next web project
        </p>
        <div className="mx-auto mt-4 max-w-3xl">
          <div className="gap-x-3 flex-align-center">
            <SearchInput
              className="sm:w-full"
              inputClassName="rounded-full bg-white text-gray-700"
              placeholder="Search for components..."
            />
            <FreeComponentToggle className="text-white" />
          </div>
        </div>
      </header>
      <div>
        <div className="mx-auto mt-4 max-w-7xl px-3">
          <KeywordsSearch category={params.category} />
        </div>
        <div className="mx-auto max-w-[1360px] px-4">
          {components.length > 0 ? (
            <div>
              <div className="mt-5 space-y-8">
                {components.map((component) => (
                  <ComponentCard
                    component={component}
                    key={component.id}
                    currentUser={currentUser}
                  />
                ))}
              </div>
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
