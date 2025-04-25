import { Suspense } from "react";
import KeywordsSearch from "@/components/main/common/all-keywords-search";
import FreeComponentToggle from "@/components/main/common/free-component-toggle";
import { getComponents } from "@/lib/actions/home/components";
import { getCurrentUser } from "@/lib/auth";
import ComponentsClient from "@/components/main/common/components-client";
import NoResults from "@/components/common/no-results";

export const metadata = {
  title: "Components",
  description:
    "Beautifully modern and accessible components designed to enhance user experience and boost conversion while helping you build your next project faster.",
};

type Params = {
  searchParams: {
    q?: string;
    keyword?: string;
    isfree?: string;
  };
};

const ITEMS_PER_PAGE = 10;

const ComponentsPage = async ({ searchParams }: Params) => {
  const currentUser = await getCurrentUser();

  const { q, keyword } = searchParams;
  const isfree = searchParams.isfree
    ? searchParams.isfree === "true"
    : undefined;

  // Initial fetch for the first page
  const { components, componentsCount } = await getComponents({
    search: q,
    limit: ITEMS_PER_PAGE,
    skip: 0,
    keyword,
    isFree: isfree,
  });

  const hasComponents = components.length > 0;

  return (
    <div className="relative bg-background pb-10 pt-20">
      <header className="bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-10 text-center text-white">
        <h1 className="mb-3 text-3xl font-bold md:text-5xl">
          UI that converts higher
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-200">
          Modern, responsive UI for your next web project
        </p>
        <div className="mx-auto mt-4 max-w-3xl">
          <div className="flex-col items-center gap-x-3 gap-y-3 flex-align-center">
            {q && (
              <h1 className="mb-4 text-center text-2xl font-bold">
                Search Results for &quot;{q}&quot;
              </h1>
            )}
            <FreeComponentToggle className="text-white" />
          </div>
        </div>
      </header>
      <div>
        <div className="mx-auto mt-4 max-w-7xl px-3">
          <KeywordsSearch />
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
                searchParams={searchParams}
              />
            ) : (
              <NoResults title="No Components found" className="min-h-[80vh]" />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
