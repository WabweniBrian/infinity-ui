"use server";

import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
      categoryType: true,
      _count: {
        select: { Component: true },
      },
    },
    orderBy: { createdAt: "desc" },
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
      categoryType: true,
    },
  });
}

export async function addCategory(data: {
  name: string;
  description?: string;
  image?: string;
  categoryType: CategoryType;
}) {
  try {
    await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        categoryType: data.categoryType,
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
    categoryType?: CategoryType;
  },
) {
  try {
    await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        categoryType: data.categoryType,
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
