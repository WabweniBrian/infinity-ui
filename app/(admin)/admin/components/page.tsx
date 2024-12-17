import AddCategoryDialog from "@/components/admin/components/add-category";
import AddComponentForm from "@/components/admin/components/add-component";
import CategoryActions from "@/components/admin/components/category-actions";
import ComponentActions from "@/components/admin/components/component-actions";
import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCategories } from "@/lib/actions/categories";
import { getComponentCategories } from "@/lib/actions/components";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";

type SearchParams = {
  searchParams: {
    search: string;
  };
};

export default async function ComponentsAndCategoriesPage({
  searchParams,
}: SearchParams) {
  const componentCategories = await getComponentCategories(searchParams.search);
  const categories = await getCategories(searchParams.search);
  const formCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Tabs defaultValue="components" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="components">
        <div>
          <div className="rounded-xl border bg-white/60 p-4 flex-center-between dark:bg-accent/20">
            <div className="flex-1">
              <SearchInput className="w-full" />
            </div>
            <AddComponentForm categories={formCategories} />
          </div>
          <div>
            {componentCategories.length === 0 && (
              <NoResults
                title="No component categories found"
                className="min-h-[60vh]"
              />
            )}
            {componentCategories.length !== 0 && (
              <>
                <Accordion type="multiple" className="mt-4 space-y-4">
                  {componentCategories.map((category) => (
                    <AccordionItem
                      key={category.id}
                      value={category.id}
                      className="my-2 rounded-xl border bg-accent/30 px-3 first:mt-0"
                    >
                      <AccordionTrigger className="text-xl font-medium">
                        {category.name} ({category.components.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        {category?.components.length !== 0 ? (
                          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {category?.components.map((component) => (
                              <div
                                key={component.id}
                                className="rounded-xl border bg-white/80 p-4 dark:bg-accent/20"
                              >
                                <div>
                                  <div className="flex-center-between">
                                    <h1 className="flex-1 truncate text-lg">
                                      {component.name}
                                    </h1>
                                    <ComponentActions id={component.id} />
                                  </div>
                                  <p>{component?.description || ""}</p>
                                </div>

                                <div className="mt-2">
                                  {component.keywords.length !== 0 && (
                                    <div className="mb-2 flex flex-wrap gap-2">
                                      {component.keywords.map((keyword) => {
                                        if (keyword.length === 0) return null;
                                        return (
                                          <Badge
                                            key={keyword}
                                            variant="secondary"
                                          >
                                            {keyword}
                                          </Badge>
                                        );
                                      })}
                                    </div>
                                  )}
                                  {component.styling.length !== 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {component.styling.map((style) => {
                                        if (style.length === 0) return null;
                                        return (
                                          <Badge key={style} variant="outline">
                                            {style}
                                          </Badge>
                                        );
                                      })}
                                    </div>
                                  )}
                                  <Link
                                    href={`/preview/${generateSlug(category.name)}/${component.slug}`}
                                    className="mt-4 inline-block text-blue-600 hover:underline"
                                  >
                                    View Component
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <NoResults
                            title="No component found"
                            className="min-h-[60vh]"
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="categories">
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
                        <h1 className="flex-1 truncate text-lg">
                          {category.name}
                        </h1>
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
      </TabsContent>
    </Tabs>
  );
}
