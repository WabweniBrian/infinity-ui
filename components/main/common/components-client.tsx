"use client";

import NoResults from "@/components/common/no-results";
import ComponentCard from "@/components/main/common/component-card";
import { getComponents } from "@/lib/actions/home/components";
import { ComponentType, SessionUser } from "@/types";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ComponentsClientProps {
  initialComponents: ComponentType[];
  initialComponentsCount: number;
  currentUser: SessionUser;
  searchParams: {
    q?: string;
    keyword?: string;
    isfree?: string;
    category?: string;
  };
}

const ITEMS_PER_PAGE = 10;

export default function ComponentsClient({
  initialComponents,
  initialComponentsCount,
  currentUser,
  searchParams,
}: ComponentsClientProps) {
  const [components, setComponents] =
    useState<ComponentType[]>(initialComponents);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialComponentsCount > initialComponents.length,
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const q = searchParams.q || "";
  const keyword = searchParams.keyword || "";
  const isFree = searchParams.isfree === "true";

  // Function to fetch more components
  const loadMoreComponents = useCallback(async () => {
    setLoading(true);
    try {
      // Calculate the number of items to skip
      const skip = components.length;

      const result = await getComponents({
        search: q,
        limit: ITEMS_PER_PAGE,
        skip,
        keyword,
        isFree: isFree ? true : undefined,
        category: searchParams.category,
      });

      if (result.components.length > 0) {
        setComponents((prev) => [...prev, ...result.components]);
        setHasMore(
          components.length + result.components.length < result.componentsCount,
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more components:", error);
    } finally {
      setLoading(false);
    }
  }, [components.length, q, keyword, isFree, searchParams.category]);

  // Reference for the last element in the list
  const lastComponentRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      // Disconnect previous observer if it exists
      if (observer.current) observer.current.disconnect();

      // Create new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreComponents();
        }
      });

      // Observe the last element
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreComponents],
  );

  // Reset when search params change (in URL)
  useEffect(() => {
    // Reset to initial data when search params change
    setComponents(initialComponents);
    setHasMore(initialComponentsCount > initialComponents.length);
  }, [initialComponents, initialComponentsCount, q, keyword, isFree]);

  if (components.length === 0) {
    return <NoResults title="No Components found" className="min-h-[80vh]" />;
  }

  return (
    <div>
      <div className="mt-5 space-y-8">
        {components.map((component, index) => {
          // If this is the last item, add a ref for infinite scrolling
          if (index === components.length - 1) {
            return (
              <div key={component.id} ref={lastComponentRef}>
                <ComponentCard
                  component={component}
                  currentUser={currentUser}
                />
              </div>
            );
          } else {
            return (
              <ComponentCard
                component={component}
                key={component.id}
                currentUser={currentUser}
              />
            );
          }
        })}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!hasMore && components.length > ITEMS_PER_PAGE && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          You&apos;ve reached the end
        </div>
      )}
    </div>
  );
}
