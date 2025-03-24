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
  const { slug } = params;
  const componentData = await prisma.component.findUnique({
    where: { slug },
    select: { Componentpath: true },
  });

  if (!componentData) {
    notFound();
  }

  // Dynamically import the component
  const Component = await loadComponent(componentData.Componentpath);

  return (
    <>
      <Component />
      <p></p>
    </>
  );
}
