import ComponentCardSkeleton from "@/components/main/common/component-card-skeleton";
import Hero from "@/components/main/home/hero";
import NewComponentsSection from "@/components/main/home/new-components";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <section className="bg-gradient-to-b from-background to-background/80 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            New Components
          </h2>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ComponentCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <NewComponentsSection />
          </Suspense>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/search?q=" className="flex-align-center">
                View All Components <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
