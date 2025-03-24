"use client";

import Select from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateNotification } from "@/lib/actions/admin/notifications";
import { NotificationSchemaType } from "@/types";
import { notificationSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const notificationTypes = [
  { value: "system", label: "System" },
  { value: "user_registration", label: "User Registration" },
  { value: "purchase", label: "Purchase" },
  { value: "welcome", label: "Welcome" },
  { value: "info", label: "Information" },
];

type Notification = {
  id: string;
  userId: string | null;
  type: string;
  isAdmin: boolean | null;
  title: string;
  message: string;
};

interface EditNotificationProps {
  notification: Notification;
  users: { id: string; name: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditNotification = ({
  notification,
  users,
  open,
  onOpenChange,
}: EditNotificationProps) => {
  const form = useForm<NotificationSchemaType>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: notification?.title,
      message: notification?.message,
      type: notification?.type,
      userId: notification?.userId || undefined,
      isAdmin: notification?.isAdmin || false,
    },
  });

  // Form submission handler
  const onSubmit = async (values: NotificationSchemaType) => {
    const results = await updateNotification(notification.id, values);
    if (results.success) {
      toast.success("Notification sent!");
      onOpenChange(false);
    } else {
      toast.error(results.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Notification title"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onSelect={field.onChange}
                      options={notificationTypes}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter notification message"
                      className="min-h-[120px]"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User (Optional)</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onSelect={field.onChange}
                      options={users.map((user) => ({
                        value: user.id,
                        label: user.name,
                      }))}
                    />
                    <FormDescription>Select user to send to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Admin Only</FormLabel>
                      <FormDescription>
                        Only visible to administrators
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNotification;
