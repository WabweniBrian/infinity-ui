"use server";

import { prisma } from "@/lib/prisma";
import { UserSchemaType, UserUpdateSchemaType } from "@/types";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// ----------------------------GET USERS ----------------------------------------------------------------------------------
export const getUsers = async (search: string) => {
  let whereCondition: any = {};

  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  return await prisma.user.findMany({
    where: whereCondition,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      role: true,
      password: true,
      createdAt: true,
    },
  });
};

// ----------------------------GET SINGLE USER----------------------------------------------------------------------------------
export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
    },
  });
};

// ----------------------------ADD A USER----------------------------------------------------------------------------------
export const addUser = async (data: UserSchemaType) => {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingEmail) {
      return { success: false, message: "Email Already Exists!!" };
    }

    await prisma.user.create({
      data: {
        role: data.role as UserRole,
        email: data.email,
        name: data.name,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    revalidatePath("/admin/users");

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------UPDATE A USER----------------------------------------------------------------------------------
export const updateUser = async (
  userId: string,
  data: UserUpdateSchemaType,
) => {
  try {
    const exisitingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exisitingEmail && exisitingEmail.id !== userId) {
      return { success: false, message: "User with that Email Already Exists" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        role: data.role as UserRole,
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------DELETE A USER----------------------------------------------------------------------------------
export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------DELETE MULTIPLE USERS----------------------------------------------------------------------------------
export const deleteUsers = async (userIds: string[]) => {
  try {
    await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ---------------------------- REMOVE PROFILE IMAGE ----------------------------------------------------------------------------------
export const removeImage = async (userId: string) => {
  try {
    await prisma.user.update({ where: { id: userId }, data: { image: null } });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
