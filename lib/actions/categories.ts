"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateSlug } from "../utils";

export async function getCategories(search?: string) {
  return await prisma.category.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {},
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      _count: {
        select: { components: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}
export async function getFormCategories() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategory(id: string) {
  return await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
    },
  });
}

export async function addCategory(data: {
  name: string;
  description?: string;
  image?: string;
}) {
  try {
    const existingCategory = await prisma.category.findFirst({
      where: { name: data.name },
    });
    if (existingCategory) {
      return {
        message: "Category already exists",
        success: false,
      };
    }

    await prisma.category.create({
      data: {
        slug: generateSlug(data.name),
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    revalidatePath("/admin/components");
    return {
      message: "Category added successfully",
      success: true,
    };
  } catch (error) {
    console.error("Failed to add category:", error);
    return { message: "Something went wrong", success: false };
  }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    description?: string;
    image?: string;
  },
) {
  try {
    const existingCategory = await prisma.category.findFirst({
      where: { name: data.name, id: { not: id } },
    });
    if (existingCategory) {
      return {
        message: "Category already exists",
        success: false,
      };
    }

    await prisma.category.update({
      where: { id },
      data: {
        slug: generateSlug(data.name!),
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    revalidatePath("/admin/components");
    return {
      message: "Category updated successfully",
      success: true,
    };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { message: "Something went wrong", success: false };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/components");
    return { message: "Category deleted successfully", success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { message: "Something went wrong", success: false };
  }
}
