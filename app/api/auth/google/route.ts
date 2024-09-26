import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { access_token, callbackUrl } = await request.json();

  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const userData = await response.json();

  if (!userData.email) {
    return new NextResponse("Unable to retrieve user information", {
      status: 400,
    });
  }

  let user = await prisma.user.findUnique({ where: { email: userData.email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        image: userData.picture,
      },
    });
  }

  const token = await createToken({ id: user.id });
  setAuthCookie(token);

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
    callbackUrl: callbackUrl || "/dashboard",
  });
}
