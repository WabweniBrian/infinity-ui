import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatWord } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  try {
    return {
      title: formatWord(slug),
    };
  } catch (error) {
    return notFound();
  }
}

interface PreviewPageProps {
  params: {
    category: string;
    slug: string;
  };
}

const loadComponent = async (componentPath: string) => {
  // Remove leading slash from componentPath if it exists
  const cleanPath = componentPath.startsWith("/")
    ? componentPath.slice(1)
    : componentPath;
  const component = (await import(`@/components/${cleanPath}`)).default;
  return component;
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const currentUser = await getCurrentUser();
  const { slug } = params;
  const componentData = await prisma.component.findUnique({
    where: { slug },
    select: { id: true, Componentpath: true, isfree: true, price: true },
  });

  if (!componentData) {
    notFound();
  }

  // Check if component requires premium access (not free)
  const requiresAccess = !componentData.isfree;

  // Check if user has access to this component
  const hasAccess =
    // Free components are accessible to everyone
    componentData.isfree ||
    // Premium components with no price are part of a bundle subscription
    (!componentData.isfree &&
      !componentData.price &&
      currentUser?.hasPurchased) ||
    // Components with individual prices are accessible if purchased individually
    (componentData.price &&
      currentUser?.purchasedComponents?.includes(componentData.id));

  // Dynamically import the component
  const Component = await loadComponent(
    "infinity-ui/ai/ai-policy-brief-system",
  );

  return (
    <>
      <Component />
      <p></p>
    </>
  );
}
