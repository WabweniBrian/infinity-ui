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
import { useAuth } from "@/hooks/use-auth";
import { PasswordChangeSchemaType } from "@/types";
import { changePasswordSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const PasswordChangeForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { logout } = useAuth();

  const form = useForm<PasswordChangeSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (values: PasswordChangeSchemaType) => {
    setError(null);
    try {
      await axios.put("/api/auth/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed, logging out");
      setError(null);
      form.reset();
      logout();
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className="mt-8 rounded-xl border p-2 sm:p-4">
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeIcon className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      {...field}
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current Password"
                      className="bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex-col gap-4 flex-align-center sm:flex-row">
            {/* New Password */}
            <div className="w-full flex-1 sm:w-fit">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeIcon className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New Password"
                          className="bg-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm Password */}
            <div className="w-full flex-1 sm:w-fit">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeIcon className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Password Confirmation"
                          className="bg-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="gap-x-2 flex-center-center">
                  <ImSpinner2 className="animate-spin text-lg" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;
