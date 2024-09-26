"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchemaType } from "@/types";
import { forgotPasswordSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordSchemaType) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", {
        email: values.email,
      });
      setSuccessMessage(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-center text-2xl font-bold">Forgot Password</h1>
      <p className="mb-4">
        Enter your registered email address and we send you a password reset
        link
      </p>
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      {successMessage && (
        <div className="my-2 rounded-lg bg-green-500/20 p-4">
          <span className="text-green-500">{successMessage}</span>
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
                    placeholder="Email Address"
                    className="bg-transparent"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                "Send Link"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <Link href="/sign-in" className="text-sm text-brand hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
