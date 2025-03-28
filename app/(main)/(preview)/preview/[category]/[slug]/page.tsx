import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const getComponent = async (slug: string) => {
  return await prisma.component.findUnique({
    where: { slug, show: true },
    select: { Componentpath: true, name: true },
  });
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  try {
    const component = await getComponent(slug);
    if (!component) notFound();
    return {
      title: component.name,
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
  const { slug } = params;
  const componentData = await getComponent(slug);

  if (!componentData) {
    notFound();
  }

  // Dynamically import the component
  const Component = await loadComponent(componentData.Componentpath);

  return <Component />;
}
