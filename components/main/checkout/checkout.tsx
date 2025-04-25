"use client";

import type { SessionUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Component = {
  id: string;
  name: string;
  price: number | null;
  category: { name: string };
};

interface CheckoutProps {
  user: SessionUser;
  component: Component | null;
  paymentFor: string;
}

const formSchema = z.object({
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  phone: z.string().optional(),
  zipCode: z.string().optional(),
});

// Payment methods
const paymentProviders = [
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay securely using your PayPal account",
    supportedMethods: [
      { id: "visa", name: "Visa", logo: "/images/visa.png" },
      { id: "mastercard", name: "Mastercard", logo: "/images/mastercard.png" },
      { id: "amex", name: "American Express", logo: "/images/amex.png" },
      { id: "discover", name: "Discover", logo: "/images/discover.png" },
    ],
  },
  {
    id: "pesapal",
    name: "Pesapal",
    description: "Pay with MTN Mobile money, M-Pesa, Airtel Money, and more",
    supportedMethods: [
      { id: "mpesa", name: "M-Pesa", logo: "/images/mpesa.png" },
      { id: "mtn", name: "MTN Mobile Money", logo: "/images/mtn.png" },
      { id: "airtel", name: "Airtel Money", logo: "/images/airtel.png" },
      { id: "visa", name: "Visa", logo: "/images/visa.png" },
      { id: "mastercard", name: "Mastercard", logo: "/images/mastercard.png" },
    ],
  },
];

export default function Checkout({
  component,
  paymentFor,
  user,
}: CheckoutProps) {
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<
    string | null
  >(null);
  const [billingInfo, setBillingInfo] = useState({
    address: "",
    phone: "",
    zipCode: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phone: "",
      zipCode: "",
    },
  });

  const handlePaymentProviderSelect = (providerId: string) => {
    setSelectedPaymentProvider(providerId);
  };
  const handleBillingInfoChange = (values: z.infer<typeof formSchema>) => {
    setBillingInfo({
      address: values.address,
      phone: values.phone || "",
      zipCode: values.zipCode || "",
    });
  };

  // Update billing info on form change
  form.watch((data) => {
    if (data.address) {
      setBillingInfo(data as any);
    }
  });

  const isFormValid = !!form.getValues().address && !!selectedPaymentProvider;

  let paymentDetails = null;

  if (paymentFor === "component" && component) {
    paymentDetails = {
      type: "component",
      details: {
        name: component.name,
        price: component.price || 0,
        category: component.category.name,
      },
    };
  } else if (paymentFor === "bundle") {
    paymentDetails = {
      type: "bundle",
      details: { name: "Infinity UI Bundle", price: 149 },
    };
  } else if (paymentFor === "pack") {
    paymentDetails = {
      type: "pack",
      details: { name: "Infinity UI Pack", price: 249 },
    };
  }

  const handleContinueToPayment = () => {
    console.log("Continue to payment with:", {
      billingInfo,
      paymentProvider: selectedPaymentProvider,
    });

    const formattedData = {
      userId: user?.id!,
      componentId: component?.id || null,
      isComponent: paymentFor === "component" || false,
      isBundle: paymentFor === "bundle" || false,
      isPack: paymentFor === "pack" || false,
      paymentProvider: selectedPaymentProvider!,
      ...billingInfo,
      amount: paymentDetails
        ? (paymentDetails.details.price + paymentDetails.details.price).toFixed(
            2,
          )
        : 0,
    };

    console.log("Formatted Data:", formattedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 dark:from-gray-950 dark:to-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Billing Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleBillingInfoChange)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Address <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone Number{" "}
                              <span className="text-sm font-normal text-gray-400">
                                (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Zip Code{" "}
                              <span className="text-sm font-normal text-gray-400">
                                (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your zip code"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Payment Providers */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {paymentProviders.map((provider) => (
                    <div
                      key={provider.id}
                      onClick={() => handlePaymentProviderSelect(provider.id)}
                      className={`relative cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md ${
                        selectedPaymentProvider === provider.id
                          ? "border-brand bg-brand/5"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-800"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="relative h-10 w-10">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div>
                              {provider.id === "paypal" && (
                                <Image
                                  src="/images/paypal.png"
                                  alt="Paypal logo"
                                  width={40}
                                  height={40}
                                  className="w-16 object-contain"
                                />
                              )}
                              {provider.id === "flutterwave" && (
                                <Image
                                  src="/images/flutterwave.png"
                                  alt="Flutterwave logo"
                                  width={20}
                                  height={20}
                                  className="w-12 object-contain"
                                />
                              )}
                              {provider.id === "pesapal" && (
                                <Image
                                  src="/images/pesapal.png"
                                  alt="Pesapal logo"
                                  width={40}
                                  height={40}
                                  className="w-16 object-contain"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            selectedPaymentProvider === provider.id
                              ? "border-brand"
                              : ""
                          }`}
                        >
                          {selectedPaymentProvider === provider.id && (
                            <div className="h-3 w-3 rounded-full bg-brand" />
                          )}
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {provider.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        {provider.description}
                      </p>

                      {/* Payment method logos */}
                      <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                          Supported payment methods:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {provider.supportedMethods.map((method) => (
                            <div
                              key={`${provider.id}-${method.id}`}
                              className="relative h-8 w-12 rounded bg-white p-1 shadow-sm dark:bg-gray-800"
                              title={method.name}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                  src={method.logo || "/placeholder.svg"}
                                  alt={`${method.name} logo`}
                                  width={40}
                                  height={24}
                                  className="max-h-6 w-auto object-contain"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/30">
                  <div className="flex items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Note:</span> We also
                        accept direct bank transfers. To use this payment
                        method, please{" "}
                        <Link
                          href="/support"
                          className="font-medium text-brand hover:underline"
                        >
                          contact our team
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {/* Order Summary */}
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentDetails ? (
                  <>
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                      {paymentDetails.type === "component" && (
                        <>
                          <h3 className="font-medium">
                            {paymentDetails.details.name}
                          </h3>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-500 dark:text-gray-300">
                              Category:
                            </span>
                            <span className="font-medium">
                              {paymentDetails.details.category}
                            </span>
                            <span className="text-gray-500 dark:text-gray-300">
                              Price:
                            </span>
                            <span className="font-medium">
                              ${paymentDetails.details.price}
                            </span>
                          </div>
                        </>
                      )}

                      {paymentDetails.type === "bundle" && (
                        <>
                          <h3 className="font-medium">
                            {paymentDetails.details.name}
                          </h3>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-500 dark:text-gray-300">
                              Price:
                            </span>
                            <span className="font-medium">
                              ${paymentDetails.details.price}
                            </span>
                          </div>
                        </>
                      )}

                      {paymentDetails.type === "pack" && (
                        <>
                          <h3 className="font-medium">
                            {paymentDetails.details.name}
                          </h3>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-500 dark:text-gray-300">
                              Price:
                            </span>
                            <span className="font-medium">
                              ${paymentDetails.details.price}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Subtotal
                        </span>
                        <span className="text-sm font-medium">
                          ${paymentDetails.details.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Tax
                        </span>
                        <span className="text-sm font-medium">
                          ${paymentDetails.details.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold">Total</span>
                        <span className="text-base font-semibold">
                          $
                          {(
                            paymentDetails.details.price +
                            paymentDetails.details.price
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-300">
                      No items selected
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleContinueToPayment}
                  disabled={!isFormValid}
                >
                  Continue to Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
