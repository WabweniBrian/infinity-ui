import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import crypto from "crypto";
import { sendEmailVerification } from "@/lib/sendEmailVerificationEmail";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationCode,
      },
    });

    // await sendEmailVerification(email);

    await prisma.notification.create({
      data: {
        title: "User Registration",
        userId: user.id,
        message: `User with email ${user.email} has just registered to the platform with email and password.`,
        type: "user_registration",
        isAdmin: true,
      },
    });

    return NextResponse.json("Account created successfully");
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Server error", { status: 500 });
  }
}
