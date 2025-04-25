import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SearchInput from "@/components/common/search-input";
import KeywordsSearch from "@/components/main/common/keywords-search";
import FreeComponentToggle from "@/components/main/common/free-component-toggle";
import { formatWord } from "@/lib/utils";
import { getComponents } from "@/lib/actions/home/components";
import { getCurrentUser } from "@/lib/auth";
import ComponentsClient from "@/components/main/common/components-client";
import NoResults from "@/components/common/no-results";

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
    search?: string;
    keyword?: string;
    isfree?: string;
  };
};

const ITEMS_PER_PAGE = 10;

const CategoryComponents = async ({ params, searchParams }: Params) => {
  const currentUser = await getCurrentUser();
  const { search, keyword } = searchParams;
  const { category } = params;
  const isfree = searchParams.isfree
    ? searchParams.isfree === "true"
    : undefined;

  // Initial fetch for the first page
  const { components, componentsCount } = await getComponents({
    category,
    search,
    limit: ITEMS_PER_PAGE,
    skip: 0,
    keyword,
    isFree: isfree,
  });

  const hasComponents = components.length > 0;
  const categoryName = formatWord(category);

  return (
    <div className="relative bg-background pb-10 pt-20">
      <header className="bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-10 text-center text-white">
        <h1 className="mb-3 text-3xl font-bold md:text-5xl">{categoryName}</h1>
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
          <KeywordsSearch category={category} />
        </div>
        <div className="mx-auto max-w-[1360px] px-4">
          <Suspense
            fallback={
              <div className="min-h-[80vh] flex-center-center">Loading...</div>
            }
          >
            {hasComponents ? (
              <ComponentsClient
                initialComponents={components}
                initialComponentsCount={componentsCount}
                currentUser={currentUser}
                searchParams={{
                  ...searchParams,
                  category,
                }}
              />
            ) : (
              <NoResults
                title={`No ${categoryName} Components Found`}
                className="min-h-[80vh]"
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponents;
