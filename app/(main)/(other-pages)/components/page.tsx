import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import { getPublicComponentsData } from "@/lib/actions/public-components";
import { formatWord, generateSlug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Components",
};

export default async function PublicComponentsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const result = await getPublicComponentsData(searchParams.search);

  const groupedCategories = result.data;

  return (
    <div className="relative h-full w-full bg-background pb-10 pt-28">
      <div className="fixed bottom-0 left-[-20%] right-0 top-[-10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="fixed bottom-0 right-[-20%] top-[-10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-2">
        <div className="mx-auto max-w-4xl">
          <SearchInput
            className="mb-6 sm:w-full"
            inputClassName="rounded-full dark:bg-accent/20 backdrop-blur-sm"
            placeholder="Search for category e.g forms"
          />
        </div>
        {Object.entries(groupedCategories).length === 0 && (
          <NoResults title="No components yet" className="min-h-[80vh]" />
        )}
        {Object.entries(groupedCategories).map(
          ([componentType, categories]) => (
            <div key={componentType} className="mb-12 mt-6">
              <h2 className="mb-4 text-2xl font-semibold">
                {formatWord(componentType)}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link
                    href={`/components/${generateSlug(category.name)}`}
                    className="overflow-hidden rounded-xl border bg-white/60 backdrop-blur-md transition-a hover:scale-105 hover:shadow-2xl dark:bg-accent/40"
                    key={category.id}
                  >
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={category.image || "/default-image.jpg"}
                        alt={category.name}
                        className="objec-cover"
                        fill
                      />
                    </div>
                    <div className="p-3">
                      <h1 className="text-lg font-semibold">{category.name}</h1>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {category.Component.length} component(s)
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
