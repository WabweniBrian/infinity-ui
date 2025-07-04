import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { prisma } from "./prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

interface JWTPayload {
  id: string;
  role: string;
  hasPurchased: boolean;
  purchasedComponents: string[];
  [key: string]: string | number | boolean | string[];
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createToken(user: {
  id: string;
  role: string;
  hasPurchased: boolean;
  purchasedComponents: string[];
}): Promise<string> {
  const payload: JWTPayload = {
    id: user.id,
    role: user.role,
    hasPurchased: user.hasPurchased,
    purchasedComponents: user.purchasedComponents || [],
  };
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("90d")
    .sign(JWT_SECRET);
}

export function setAuthCookie(token: string): void {
  cookies().set("infinityui_session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 90, // 90 days - 3 months
    path: "/",
  });
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function getServerSession() {
  const token = cookies().get("infinityui_session_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session || typeof session.id !== "string") return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      hasPurchased: true,
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

  if (!user) return null;

  // Extract purchased component IDs
  const purchasedComponents = user.purchases
    .filter((purchase) => purchase.componentId !== null)
    .map((purchase) => purchase.componentId as string);

  return {
    ...user,
    purchasedComponents,
    purchases: undefined, // Remove the purchases array from the returned user object
  };
}
