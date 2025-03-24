"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";

const GoogleButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError(null); // Reset previous errors

        const res = await axios.post("/api/auth/google", {
          access_token: tokenResponse.access_token,
          callbackUrl,
        });

        toast.success("Google login success, redirecting...");
        location.assign(res.data.callbackUrl);
      } catch (err: any) {
        console.error("Google login error:", err);
        setError(err.response?.data || "An unexpected error occurred.");
        toast.error(
          err.response?.data || "Google login failed. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google login failed. Please try again.");
      toast.error("Google login failed. Please try again.");
    },
  });

  return (
    <>
      <button
        className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-950"
        disabled={loading}
        onClick={() => login()}
      >
        {loading ? (
          <ImSpinner2 className="mr-2 animate-spin" />
        ) : (
          <FcGoogle className="mr-2" />
        )}
        Continue with Google
      </button>
      {error && <p className="mt-2 !text-red-500">{error}</p>}
    </>
  );
};

export default GoogleButton;
