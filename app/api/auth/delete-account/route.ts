import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response("You are not authenticated!", { status: 401 });
    }

    await prisma.user.delete({
      where: { id: user?.id },
    });

    return new NextResponse("Account deleted succesfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new NextResponse("Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
