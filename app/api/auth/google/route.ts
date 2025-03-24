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

  // Check if email or name already exists
  let user = await prisma.user.findFirst({
    where: {
      OR: [{ email: userData.email }, { name: userData.name }],
    },
    include: {
      purchases: {
        where: {
          isComponent: true,
          status: "SUCCESS",
        },
        select: {
          componentId: true,
        },
      },
    },
  });

  if (user) {
    // If email exists, check for username conflict
    if (user.email === userData.email && user.name !== userData.name) {
      return new NextResponse("Email is already in use with a different name", {
        status: 400,
      });
    }
  } else {
    // Create a new user if email and name are unique
    user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        image: userData.picture,
        method: "google",
      },
      include: {
        purchases: {
          where: {
            isComponent: true,
            status: "SUCCESS",
          },
          select: {
            componentId: true,
          },
        },
      },
    });

    // Update last login
    await prisma.user.update({
      where: { email: userData.email },
      data: { lastLogin: new Date() },
    });

    await prisma.notification.create({
      data: {
        title: "User Registration",
        userId: user.id,
        message: `User with email ${user.email} has just registered to the platform with Google sign-in.`,
        type: "user_registration",
        isAdmin: true,
      },
    });
  }

  // Extract purchased component IDs
  const purchasedComponents = user.purchases
    .filter((purchase) => purchase.componentId !== null)
    .map((purchase) => purchase.componentId as string);

  const token = await createToken({
    id: user.id,
    role: user.role,
    hasPurchased: user.hasPurchased,
    purchasedComponents,
  });

  setAuthCookie(token);

  const redirectUrl = user.role === "Admin" ? "/admin" : "/dashboard";

  const finalCallbackUrl =
    callbackUrl && callbackUrl !== "" ? callbackUrl : redirectUrl;

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
    callbackUrl: finalCallbackUrl,
  });
}
