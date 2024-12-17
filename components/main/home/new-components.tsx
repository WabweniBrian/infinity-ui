import { prisma } from "@/lib/prisma";
import ComponentCard from "../common/component-card";

type Component = {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  description: string | null;
  keywords: string[];
  category_name: string;
};

const NewComponentsSection = async () => {
  const components = await prisma.component.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      keywords: true,
      description: true,
      image: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedComponents: Component[] = components.map((component) => ({
    id: component.id,
    name: component.name,
    image: component.image,
    slug: component.slug,
    description: component.description,
    keywords: component.keywords,
    category_name: component.category.name,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {formattedComponents.map((component) => (
        <ComponentCard component={component} key={component.id} />
      ))}
    </div>
  );
};

export default NewComponentsSection;
