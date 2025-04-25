"use client";

import { useState } from "react";
import {
  CreditCard,
  Globe,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";

// TypeScript interfaces
interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

interface PaymentProvider {
  id: string;
  name: string;
  description: string;
  supportedMethods: PaymentMethod[];
}

// Payment methods data
const paymentProviders: PaymentProvider[] = [
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

interface PaymentMethodProps {
  provider: PaymentProvider;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const PaymentMethod = ({
  provider,
  isExpanded,
  toggleExpand,
}: PaymentMethodProps) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div
        className="flex cursor-pointer items-center justify-between p-4 transition hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={toggleExpand}
      >
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-blue-50 p-2 dark:bg-blue-900">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {provider.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {provider.description}
            </p>
          </div>
        </div>
        <div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="dark:bg-gray-750 border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-700">
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Supported payment methods:
          </p>
          <div className="flex flex-wrap gap-3">
            {provider.supportedMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center rounded-md border border-gray-100 bg-white p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                  <Image
                    src={method.logo}
                    alt={method.name}
                    width={48}
                    height={32}
                    className="max-h-6 max-w-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = "/default-image.jpg";
                      e.currentTarget.alt = "Logo placeholder";
                    }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function PaymentSection(): JSX.Element {
  const [expandedId, setExpandedId] = useState<string | null>("paypal");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-gradient-to-br from-cyan-50 to-blue-100 py-12 dark:from-gray-900 dark:to-cyan-950/80 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Supported Payment Methods
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Choose from our wide range of secure payment methods for a seamless
            checkout experience. All these are handled by our trusted payment
            providers to ensure your data is safe and secure.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {paymentProviders.map((provider) => (
              <PaymentMethod
                key={provider.id}
                provider={provider}
                isExpanded={expandedId === provider.id}
                toggleExpand={() => toggleExpand(provider.id)}
              />
            ))}
          </div>
          <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="mb-4 flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Additional Payment Options
              </h3>
            </div>
            <div className="mb-6 rounded-md border border-blue-100 bg-white p-4 dark:border-blue-800 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                Direct Bank Transfer
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We also accept direct bank transfers for your convenience. The
                payment will be manually verified by our team.
              </p>
            </div>
            <div className="rounded-md border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                For more details about our payment methods or to request special
                payment arrangements, please contact our support team.
              </p>
              <a
                href="/support"
                className="group inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Contact Support
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
