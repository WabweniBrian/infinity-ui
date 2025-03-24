import MainPagination from "@/components/common/main-pagination";
import NoResults from "@/components/common/no-results";
import ComponentCard from "@/components/main/common/component-card";
import FreeComponentToggle from "@/components/main/common/free-component-toggle";
import KeywordsSearch from "@/components/main/common/all-keywords-search";
import { getComponents } from "@/lib/actions/home/components";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";

export const metadata = {
  title: "Components",
  description:
    "Beautifully modern and accessible components designed to enhance user experience and boost conversion while helping you build your next project faster.",
};

type Params = {
  searchParams: {
    page: string;
    q: string;
    keyword: string;
    isfree: string;
  };
};

const SearchPage = async ({ searchParams }: Params) => {
  const currentUser = await getCurrentUser();
  const { page, q, keyword } = searchParams;
  const isfree = searchParams.isfree
    ? searchParams.isfree === "true"
    : undefined;
  const limit = 10;
  const skip = (page ? parseInt(page) - 1 : 0) * limit;

  const { components, componentsCount } = await getComponents({
    search: q,
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

export default SearchPage;
