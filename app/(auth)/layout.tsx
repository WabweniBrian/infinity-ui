"use client";

import GoogleButton from "@/components/auth/google-button";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showGoogleSignIn = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex min-h-screen items-center justify-center bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat px-2">
        <div className="my-4 w-full max-w-md rounded-xl border-2 border-brand bg-white p-4 shadow-xl dark:bg-gray-950">
          {showGoogleSignIn && (
            <h2 className="mb-4 text-center text-2xl font-bold">
              {pathname === "/sign-in"
                ? "Login to Infinity UI"
                : "Register to Infinity UI"}
            </h2>
          )}
          <div className="mb-4 flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="mt-4">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
          {showGoogleSignIn && (
            <>
              <div className="my-6 flex-center-center">
                <hr className="h-[1px] w-full border-gray-300 dark:border-gray-700" />
                <span className="absolute bg-background text-lg text-muted-foreground">
                  or
                </span>
              </div>
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <GoogleButton />
                </Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthLayout;
