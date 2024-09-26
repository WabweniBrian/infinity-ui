import { componentsData } from "@/data/components";
import { notFound } from "next/navigation";

interface PreviewPageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Helper to dynamically import the component
const loadComponent = async (componentPath: string) => {
  // Remove leading slash from componentPath if it exists
  const cleanPath = componentPath.startsWith("/")
    ? componentPath.slice(1)
    : componentPath;
  const component = (await import(`@/components/${cleanPath}`)).default;
  return component;
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug, category } = params;

  // Find the component data from the mock dataset
  const componentData = componentsData.find(
    (component) => component.slug === slug && component.category === category,
  );

  if (!componentData) {
    notFound();
  }

  // Dynamically import the component
  const Component = await loadComponent(componentData!.componentPath);

  return <Component />;
}
