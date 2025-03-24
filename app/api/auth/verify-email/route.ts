import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { email, code } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
        verificationCode: code,
      },
    });

    if (!user) {
      return new NextResponse("Verification failed, invalid email or code", {
        status: 400,
      });
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: new Date(),
        isEmailVerified: true,
        verificationCode: null,
      },
    });

    return new NextResponse("Email verified successfully");
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong, No email", { status: 500 });
  }
}
