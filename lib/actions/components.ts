"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateSlug } from "../utils";

export const getComponentCategories = async (search?: string) => {
  return await prisma.category.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            {
              components: {
                some: { name: { contains: search, mode: "insensitive" } },
              },
            },
            {
              components: {
                some: {
                  description: { contains: search, mode: "insensitive" },
                },
              },
            },
          ],
        }
      : {},
    select: {
      id: true,
      name: true,
      description: true,
      components: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          Componentpath: true,
          dependencies: true,
          styling: true,
          keywords: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

export const getComponent = async (id: string) => {
  return await prisma.component.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      name: true,
      category: {
        select: {
          name: true,
        },
      },
      codeSnippets: {
        select: {
          id: true,
          fileName: true,
          extension: true,
          language: true,
          code: true,
        },
      },
    },
  });
};

export const getFormComponent = async (id: string) => {
  return await prisma.component.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      description: true,
      Componentpath: true,
      dependencies: true,
      isfree: true,
      styling: true,
      keywords: true,
      categoryId: true,
      codeSnippets: {
        select: {
          id: true,
          fileName: true,
          extension: true,
          language: true,
          code: true,
        },
      },
    },
  });
};

const generateUniqueSlug = async (baseSlug: string): Promise<string> => {
  let slug = baseSlug;
  let isUnique = false;

  while (!isUnique) {
    // Check if the slug exists
    const existingComponent = await prisma.component.findUnique({
      where: { slug: slug },
    });

    if (!existingComponent) {
      isUnique = true;
    } else {
      // If slug exists, append a random 4-digit number
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      slug = `${baseSlug}-${randomSuffix}`;
    }
  }

  return slug;
};

export async function addComponent(data: {
  dependencies: string[];
  styling: string[];
  keywords: string[];
  name: string;
  slug: string;
  image: string;
  isfree: boolean;
  categoryId: string;
  componentPath: string;
  codeSnippets: {
    code: string;
    fileName: string;
    extension: string;
    language: string;
  }[];
  description?: string | undefined;
}) {
  try {
    const uniqueSlug = await generateUniqueSlug(data.slug);
    await prisma.component.create({
      data: {
        name: data.name,
        slug: generateSlug(uniqueSlug),
        image: data.image,
        isfree: data.isfree,
        description: data.description,
        categoryId: data.categoryId,
        Componentpath: data.componentPath,
        dependencies: data.dependencies,
        styling: data.styling,
        keywords: data.keywords,
        codeSnippets: {
          create: data.codeSnippets,
        },
      },
    });

    revalidatePath("/admin/components");
    return {
      message: "Component added successfully",
      success: true,
    };
  } catch (error) {
    console.error("Failed to add component:", error);
    return { message: "Something went wrong", success: false };
  }
}

const generateUniqueUpdateSlug = async (
  baseSlug: string,
  componentId: string,
): Promise<string> => {
  let slug = baseSlug;
  let isUnique = false;

  while (!isUnique) {
    // Check if the slug exists for any other component
    const existingComponent = await prisma.component.findFirst({
      where: {
        slug: slug,
        NOT: { id: componentId },
      },
    });

    if (!existingComponent) {
      isUnique = true;
    } else {
      // If slug exists, append a random 4-digit number
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      slug = `${baseSlug}-${randomSuffix}`;
    }
  }

  return slug;
};

export async function updateComponent(
  componentId: string,
  data: {
    name?: string;
    slug?: string;
    image: string;
    isfree: boolean;
    description?: string;
    categoryId?: string;
    componentPath?: string;
    dependencies?: string[];
    styling?: string[];
    keywords?: string[];
    codeSnippets?: {
      id?: string;
      fileName: string;
      extension: string;
      language: string;
      code: string;
    }[];
  },
) {
  try {
    if (data.slug) {
      data.slug = await generateUniqueUpdateSlug(data.slug, componentId);
    }

    await prisma.component.update({
      where: { id: componentId },
      data: {
        name: data.name,
        slug: data.slug,
        image: data.image,
        isfree: data.isfree,
        description: data.description,
        categoryId: data.categoryId,
        Componentpath: data.componentPath,
        dependencies: data.dependencies,
        styling: data.styling,
        keywords: data.keywords,
        codeSnippets: {
          deleteMany: {},
          create: data.codeSnippets?.map((snippet) => ({
            fileName: snippet.fileName,
            extension: snippet.extension,
            language: snippet.language,
            code: snippet.code,
          })),
        },
      },
    });

    revalidatePath("/admin/components");
    return {
      message: "Component updated successfully",
      success: true,
    };
  } catch (error) {
    console.error("Failed to update component:", error);
    return { message: "Something went wrong", success: false };
  }
}

export async function deleteComponent(componentId: string) {
  try {
    await prisma.component.delete({
      where: { id: componentId },
    });
    revalidatePath("/admin/components");
    return { message: "Component deleted successfully", success: true };
  } catch (error) {
    console.error("Failed to delete component:", error);
    return { message: "Something went wrong", success: false };
  }
}
