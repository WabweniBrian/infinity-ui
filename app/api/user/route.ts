import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    hasPurchased: user.hasPurchased,
    purchasedComponents: user.purchasedComponents,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedData = await req.json();
    const allowedFields = ["name", "email", "image"];

    const filteredData = Object.keys(updatedData).reduce(
      (acc, key) => {
        if (allowedFields.includes(key)) {
          acc[key] = updatedData[key];
        }
        return acc;
      },
      {} as Partial<typeof updatedData>,
    );

    // Check if the user email already exists
    if (filteredData.email) {
      const existingUser = await prisma.user.findFirst({
        where: { email: filteredData.email },
      });

      if (existingUser && existingUser.id !== currentUser.id) {
        return new NextResponse("Email already exists", { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: filteredData,
      select: { id: true, name: true, email: true, image: true, role: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
