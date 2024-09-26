"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserLoginSchemaType } from "@/types";
import { userLoginSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";

  const form = useForm<UserLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (values: UserLoginSchemaType) => {
    try {
      await axios.post("/api/auth/sign-in", {
        email: values.email,
        password: values.password,
        callbackUrl,
      });
      setError(null);
      router.push(callbackUrl);
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      {error && (
        <div className="my-2 rounded-lg bg-red-500/20 p-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      {message && (
        <div className="my-2 rounded-lg bg-green-500/20 p-2">
          <span className="text-green-500">{message}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="bg-transparent"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-5 w-5 text-slate-600 dark:text-slate-200" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-slate-600 dark:text-slate-200" />
                      )}
                    </div>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-transparent"
                      disabled={form.formState.isSubmitting}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-brand underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-5">
            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="gap-x-2 flex-center-center">
                  <ImSpinner2 className="animate-spin text-lg" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <span className="text-sm">Don&apos;t have an account? </span>
        <Link href="/sign-up" className="text-sm text-brand hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
