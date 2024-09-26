import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { email, token, newPassword } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json("Password reset successfully");
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
