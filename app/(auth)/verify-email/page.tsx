"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { ImSpinner } from "react-icons/im";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const email = searchParams.get("email") as string;

  useEffect(() => {
    if (!email) {
      router.push("/sign-up");
    }
  }, [email, router]);

  const handleVerify = useCallback(async () => {
    try {
      setLoading(true);
      await axios.put("/api/auth/verify-email", {
        email,
      });
      setSuccessMessage(
        `Email ${email} has been successfully verified, you can continue`,
      );
    } catch (error: any) {
      toast.error(error.response.data);
      setError(
        "Something went wrong, please try again! Maybe the email address is wrong?",
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    handleVerify();
  }, [handleVerify]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex-center-center">
        <ImSpinner className="animate-spin text-6xl" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex-center-center">
      {successMessage && (
        <div className="w-full max-w-xs rounded-xl border border-green-500 bg-green-500/20 p-4 text-center flex-center-center">
          <div>
            <p className="text-lg text-green-500">{successMessage}</p>
            <Button className="mx-auto mt-4 w-max" asChild>
              <Link href="/sign-in">Proceed to sign in</Link>
            </Button>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full max-w-xs rounded-xl border border-red-500 bg-red-500/20 p-4 text-center flex-center-center">
          <div>
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
