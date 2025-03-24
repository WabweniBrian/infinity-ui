"use server";

import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserSchemaType, UserUpdateSchemaType } from "@/types";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

type UsersSearchParams = {
  search?: string;
  role?: string;
  verification?: string;
  purchase?: string;
  authMethod?: string;
  joinDateFrom?: string;
  joinDateTo?: string;
  isActive?: string;
  limit?: number;
  skip?: number;
};

// ----------------------------GET USERS ----------------------------------------------------------------------------------
export const getUsers = async ({
  search,
  role,
  verification,
  purchase,
  authMethod,
  joinDateFrom,
  joinDateTo,
  isActive,
  limit = 10,
  skip = 0,
}: UsersSearchParams) => {
  // Build the where clause for filtering
  const where: any = {};

  // Text search
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  // Role filter
  if (role && role !== "all") {
    where.role = role;
  }

  // Verification filter
  if (verification && verification === "Verified") {
    where.isEmailVerified = true;
  } else if (verification && verification === "Unverified") {
    where.isEmailVerified = false;
  }

  // Purchase filter
  if (purchase && purchase === "Has Purchased") {
    where.hasPurchased = true;
  } else if (purchase && purchase === "No Purchases") {
    where.hasPurchased = false;
  }

  // Auth method filter
  if (authMethod && authMethod === "Google") {
    where.method = "google";
  } else if (authMethod && authMethod === "Email Password") {
    where.method = "email_password";
  }

  // Active status filter
  if (isActive === "true") {
    where.isActive = true;
  } else if (isActive === "false") {
    where.isActive = false;
  }

  // Join date range filter
  if (joinDateFrom || joinDateTo) {
    where.createdAt = {};

    if (joinDateFrom) {
      where.createdAt.gte = new Date(joinDateFrom);
    }

    if (joinDateTo) {
      where.createdAt.lte = new Date(joinDateTo);
    }
  }

  const [users, usersCount, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
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
        isEmailVerified: true,
        hasPurchased: true,
        method: true,
        isActive: true,
        createdAt: true,
      },
      skip: skip,
      take: limit,
    }),

    prisma.user.count({
      where,
    }),

    prisma.user.count(),
  ]);

  return {
    users,
    usersCount,
    totalUsers,
  };
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
      isActive: true,
    },
  });
};

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      method: true,
      isEmailVerified: true,
      hasPurchased: true,
      createdAt: true,
      updatedAt: true,
      purchases: {
        select: {
          id: true,
          component: {
            select: {
              name: true,
            },
          },
          amount: true,
          date: true,
          status: true,
        },
      },
      notifications: {
        select: {
          id: true,
          title: true,
          message: true,
          createdAt: true,
          isRead: true,
        },
      },
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

export const resetUserPassword = async (
  userId: string,
  newPassword: string,
) => {
  try {
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};

export const toggleUserStatus = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};
