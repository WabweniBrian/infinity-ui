import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("You are not authenticated!", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 401 });
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user?.password!,
    );

    if (!isCurrentPasswordCorrect) {
      return new NextResponse("Current Password is wrong", { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });

    return new NextResponse("Password changed successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
