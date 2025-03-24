"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ComponentsSearchParams = {
  search?: string;
  category?: string;
  isFree?: string;
  isFeatured?: string;
  isNew?: string;
  isAI?: string;
  show?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  skip?: number;
};

/**
 * Get components with filtering, pagination and counts
 */
export const getComponents = async ({
  search,
  category,
  isFree,
  isFeatured,
  isNew,
  isAI,
  show,
  minPrice,
  maxPrice,
  limit = 10,
  skip = 0,
}: ComponentsSearchParams) => {
  // Build the where clause for filtering
  const where: any = {};

  // Text search
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      { keywords: { has: search } },
    ];
  }

  // Category filter
  if (category && category !== "all") {
    where.category = { slug: category };
  }

  if (isFree && isFree === "true") {
    where.isfree = true;
  }

  if (isFeatured && isFeatured === "true") {
    where.isFeatured = true;
  }

  if (isNew && isNew === "true") {
    where.isNew = true;
  }

  if (isAI && isAI === "true") {
    where.isAI = true;
  }

  // Show/hide filter - only apply if explicitly set
  if (show && show === "true") {
    where.show = show;
  }

  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
    }
  }

  const [components, componentsCount, totalComponents] = await Promise.all([
    prisma.component.findMany({
      where,
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    }),

    prisma.component.count({
      where,
    }),

    prisma.component.count(),
  ]);

  return {
    components,
    componentsCount,
    totalComponents,
  };
};

/**
 * Get component by ID
 *
 */

export const getComponentById = async (id: string) => {
  return await prisma.component.findUnique({
    where: { id },
    include: {
      category: {
        select: { name: true, slug: true },
      },
      codeSnippets: true,
    },
  });
};

/**
 *
 * Delete component
 * */
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

/**
 * Update component feature status
 */
export async function toggleComponentFeature(id: string) {
  try {
    // Get current feature status
    const component = await prisma.component.findUnique({
      where: { id },
      select: { isFeatured: true },
    });

    if (!component) {
      throw new Error("Component not found");
    }

    // Toggle the feature status
    await prisma.component.update({
      where: { id },
      data: { isFeatured: !component.isFeatured },
    });

    revalidatePath("/admin/components");
    return {
      success: true,
      isFeatured: !component.isFeatured,
    };
  } catch (error) {
    console.error("Error toggling component feature status:", error);
    return { success: false, message: "Failed to update component" };
  }
}

/**
 * Update component visibility
 */
export async function toggleComponentVisibility(id: string) {
  try {
    // Get current visibility status
    const component = await prisma.component.findUnique({
      where: { id },
      select: { show: true },
    });

    if (!component) {
      throw new Error("Component not found");
    }

    // Toggle the visibility
    await prisma.component.update({
      where: { id },
      data: { show: !component.show },
    });

    revalidatePath("/admin/components");
    return {
      success: true,
      show: !component.show,
    };
  } catch (error) {
    console.error("Error toggling component visibility:", error);
    return { success: false, message: "Failed to update component" };
  }
}

/**
 * Update component "new" status
 */
export async function toggleComponentNew(id: string) {
  try {
    // Get current "new" status
    const component = await prisma.component.findUnique({
      where: { id },
      select: { isNew: true },
    });

    if (!component) {
      throw new Error("Component not found");
    }

    // Toggle the "new" status
    await prisma.component.update({
      where: { id },
      data: { isNew: !component.isNew },
    });

    revalidatePath("/admin/components");
    return {
      success: true,
      isNew: !component.isNew,
    };
  } catch (error) {
    console.error("Error toggling component new status:", error);
    return { success: false, message: "Failed to update component" };
  }
}

/**
 * Delete multiple components
 */
export async function deleteComponents(ids: string[]) {
  try {
    await prisma.component.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    revalidatePath("/admin/components");
    return { success: true };
  } catch (error) {
    console.error("Error deleting components:", error);
    return { success: false, message: "Failed to delete components" };
  }
}

/**
 * Update feature status for multiple components
 */
export async function toggleComponentsFeature(
  ids: string[],
  isFeatured: boolean,
) {
  try {
    await prisma.component.updateMany({
      where: {
        id: { in: ids },
      },
      data: { isFeatured },
    });

    revalidatePath("/admin/components");
    return { success: true };
  } catch (error) {
    console.error("Error updating components feature status:", error);
    return { success: false, message: "Failed to update components" };
  }
}

/**
 * Update visibility for multiple components
 */
export async function toggleComponentsVisibility(ids: string[], show: boolean) {
  try {
    await prisma.component.updateMany({
      where: {
        id: { in: ids },
      },
      data: { show },
    });

    revalidatePath("/admin/components");
    return { success: true };
  } catch (error) {
    console.error("Error updating components visibility:", error);
    return { success: false, message: "Failed to update components" };
  }
}

/**
 * Update "new" status for multiple components
 */
export async function toggleComponentsNew(ids: string[], isNew: boolean) {
  try {
    await prisma.component.updateMany({
      where: {
        id: { in: ids },
      },
      data: { isNew },
    });

    revalidatePath("/admin/components");
    return { success: true };
  } catch (error) {
    console.error("Error updating components new status:", error);
    return { success: false, message: "Failed to update components" };
  }
}
