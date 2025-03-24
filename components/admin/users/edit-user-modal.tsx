"use client";

import Select from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/admin/users";
import { UserUpdateSchemaType } from "@/types";
import { userUpdateSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const roles = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
];

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

interface EditUserProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const EditUser = ({ editModal, setEditModal, user }: EditUserProps) => {
  const form = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const onReset = () => {
    setEditModal(false);
  };

  const onSubmit = async (values: UserUpdateSchemaType) => {
    const results = await updateUser(user.id, values);
    if (results.success) {
      toast.success("User updated!");
      onReset();
    } else {
      toast.error(results.message);
    }
  };

  return (
    <Dialog open={editModal} onOpenChange={() => setEditModal(!editModal)}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      options={roles}
                      onSelect={field.onChange}
                      text="Select Role"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="gap-x-2 flex-center-center">
                    <ImSpinner2 className="animate-spin text-lg" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
