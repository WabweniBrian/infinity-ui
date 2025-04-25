"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pack, PaymentStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Select from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { updatePurchase } from "@/lib/actions/admin/orders";
import { UpdatePurchaseSchemaType } from "@/types";
import { updatePurchaseSchema } from "@/validation/schemas";

type Component = {
  id: string;
  name: string;
};
type User = {
  id: string;
  name: string;
};

type OrderType = {
  id: string;
  isBundle: boolean;
  isPack: boolean;
  isComponent: boolean;
  pack: Pack | null;
  amount: number;
  status: PaymentStatus;
  orderNumber: string | null;
  componentId: string | null;
  userId: string;
  address?: string | null;
  phone?: string | null;
  zipCode?: string | null;
  paymentProvider?: string | null;
};

interface EditPurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderType;
  components: Component[];
  users: User[];
}

export const EditPurchaseModal = ({
  open,
  onOpenChange,
  order,
  components,
  users,
}: EditPurchaseModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<UpdatePurchaseSchemaType>({
    resolver: zodResolver(updatePurchaseSchema),
    defaultValues: {
      userId: order.userId,
      componentId: order.componentId || undefined,
      isBundle: order.isBundle,
      isPack: order.isPack,
      isComponent: order.isComponent,
      pack: order.pack,
      amount: order.amount,
      address: order.address || undefined,
      phone: order.phone || undefined,
      status: order.status,
      zipCode: order.zipCode || undefined,
      paymentProvider: order.paymentProvider || undefined,
    },
  });

  const watchIsComponent = form.watch("isComponent");
  const watchIsPack = form.watch("isPack");
  const watchIsBundle = form.watch("isBundle");

  // Handle type selection
  const handleTypeChange = (type: "component" | "pack" | "bundle") => {
    if (type === "component") {
      form.setValue("isComponent", true);
      form.setValue("isPack", false);
      form.setValue("isBundle", false);
      form.setValue("pack", null);
    } else if (type === "pack") {
      form.setValue("isComponent", false);
      form.setValue("isPack", true);
      form.setValue("isBundle", false);
      form.setValue("componentId", undefined);
    } else if (type === "bundle") {
      form.setValue("isComponent", false);
      form.setValue("isPack", false);
      form.setValue("isBundle", true);
      form.setValue("componentId", undefined);
      form.setValue("pack", null);
    }
  };

  const onSubmit = async (values: UpdatePurchaseSchemaType) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await updatePurchase(order.id, values);

      if (result.success) {
        setSuccess(true);
        // Close modal after showing success message
        setTimeout(() => {
          onOpenChange(false);
          setSuccess(false);
        }, 2000);
      } else {
        setError(result.message || "Failed to update purchase");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert components to select options
  const componentOptions = components.map((component) => ({
    label: component.name,
    value: component.id,
  }));

  // Convert users to select options
  const userOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  // Pack options
  const packOptions = Object.values(Pack).map((pack) => ({
    label: pack.replace("_", " "),
    value: pack,
  }));

  // Payment provider options
  const paymentProviderOptions = [
    { label: "PayPal", value: "paypal" },
    { label: "Pesapal", value: "pesapal" },
    { label: "Bank Transfer", value: "bank_transfer" },
    { label: "Other", value: "other" },
  ];

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
          className="max-h-[80vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Purchase
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order #{order.orderNumber}
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
                <Save className="mr-2 mt-0.5 h-5 w-5" />
                <div>
                  <h3 className="font-medium">
                    Purchase Updated Successfully!
                  </h3>
                  <p className="mt-1 text-sm">
                    The purchase details have been updated.
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
                  {/* User Selection */}
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer</FormLabel>
                        <Select
                          defaultValue={field.value}
                          options={userOptions}
                          onSelect={field.onChange}
                          text="Select a customer"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Purchase Type Selection */}
                  <div className="space-y-2">
                    <FormLabel>Purchase Type</FormLabel>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={watchIsComponent}
                          onCheckedChange={() => handleTypeChange("component")}
                        />
                        <span>Component</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={watchIsPack}
                          onCheckedChange={() => handleTypeChange("pack")}
                        />
                        <span>Pack</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={watchIsBundle}
                          onCheckedChange={() => handleTypeChange("bundle")}
                        />
                        <span>Bundle</span>
                      </label>
                    </div>
                    <FormDescription>
                      Select the type of purchase.
                    </FormDescription>
                  </div>

                  {/* Component Selection (if isComponent is true) */}
                  {watchIsComponent && (
                    <FormField
                      control={form.control}
                      name="componentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Component</FormLabel>
                          <Select
                            defaultValue={field.value || ""}
                            options={componentOptions}
                            onSelect={field.onChange}
                            text="Select a component"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Pack Selection (if isPack is true) */}
                  {watchIsPack && (
                    <FormField
                      control={form.control}
                      name="pack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pack</FormLabel>
                          <Select
                            defaultValue={field.value || ""}
                            options={packOptions}
                            onSelect={field.onChange}
                            text="Select a pack"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter amount"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
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

                  {/* Payment Provider */}
                  <FormField
                    control={form.control}
                    name="paymentProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Provider</FormLabel>
                        <Select
                          defaultValue={field.value || ""}
                          options={paymentProviderOptions}
                          onSelect={field.onChange}
                          text="Select payment provider"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter address"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Zip Code */}
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter zip code"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
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
                        <Save className="mr-2 h-4 w-4" />
                        Update Purchase
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
