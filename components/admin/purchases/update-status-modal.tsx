"use client";

import Select from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePurchaseStatus } from "@/lib/actions/admin/orders";
import { UpdateStatusSchemaType } from "@/types";
import { updateStatusSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  currentStatus: PaymentStatus;
  orderNumber: string | null;
}

export const UpdateStatusModal = ({
  open,
  onOpenChange,
  orderId,
  currentStatus,
  orderNumber,
}: UpdateStatusModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<UpdateStatusSchemaType>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const onSubmit = async (values: UpdateStatusSchemaType) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await updatePurchaseStatus(orderId, values.status);

      if (result.success) {
        setSuccess(true);
        toast.success("Status updated successfully!");

        // Close modal after showing success message
        setTimeout(() => {
          onOpenChange(false);
        }, 2000);
      } else {
        setError(result.message || "Failed to update status");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status options
  const statusOptions = Object.values(PaymentStatus).map((status) => ({
    label: status,
    value: status,
  }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[66] flex items-center justify-center bg-black/50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Status
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order #{orderNumber}
              </p>
            </div>
            <button
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onOpenChange(false)}
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {success ? (
            <div className="p-6">
              <div className="flex items-start rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <RefreshCw className="mr-2 mt-0.5 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Status Updated Successfully!</h3>
                  <p className="mt-1 text-sm">
                    The purchase status has been updated and the customer has
                    been notified.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-6"
              >
                {error && (
                  <div className="flex items-start rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    <AlertCircle className="mr-2 mt-0.5 h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Error</h3>
                      <p className="mt-1 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current status:{" "}
                    <span className="font-medium">{currentStatus}</span>
                  </p>

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Status</FormLabel>
                        <Select
                          defaultValue={field.value}
                          options={statusOptions}
                          onSelect={field.onChange}
                          text="Select status"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-brand hover:bg-brand/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update Status
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
