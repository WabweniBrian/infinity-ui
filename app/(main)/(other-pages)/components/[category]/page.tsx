import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import ComponentsList from "@/components/main/components/components-list";
import { prisma } from "@/lib/prisma";
import { formatWord } from "@/lib/utils";
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

const Components = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { search: string };
}) => {
  const search = searchParams.search || "";

  const components = await prisma.component.findMany({
    where: {
      category: { name: formatWord(params.category) },
      ...(search
        ? {
            OR: [{ name: { contains: search, mode: "insensitive" } }],
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      Componentpath: true,
      dependencies: true,
      category: { select: { name: true } },
      codeSnippets: {
        select: {
          id: true,
          fileName: true,
          extension: true,
          language: true,
          code: true,
        },
      },
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative h-full w-full bg-background pb-10 pt-28">
      <div className="fixed bottom-0 left-[-20%] right-0 top-[-10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="fixed bottom-0 right-[-20%] top-[-10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-2">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {formatWord(params.category)} Components
        </h1>
        <div className="mx-auto max-w-4xl">
          <SearchInput
            className="mb-6 sm:w-full"
            inputClassName="rounded-full dark:bg-accent/20 backdrop-blur-sm"
            placeholder="Search for components..."
          />
        </div>
        {components.length === 0 && (
          <NoResults title="No components yet" className="min-h-[80vh]" />
        )}
        {components.length !== 0 && <ComponentsList components={components} />}
      </div>
    </div>
  );
};

export default Components;
