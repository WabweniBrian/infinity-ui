"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { PaymentStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Download,
  Eye,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";
import { InvoicePreviewModal } from "./invoice-preview-modal";
import { SessionUser } from "@/types";

type UserPurchase = {
  id: string;
  isComponent: boolean;
  status: PaymentStatus;
  isBundle: boolean;
  isPack: boolean;
  amount: number;
  date: Date;
  address: string | null;
  phone: string | null;
  zipCode: string | null;
  orderNumber: string | null;
  component: {
    name: string;
  } | null;
  paymentProvider: string | null;
};

interface PurchaseDetailsModalProps {
  purchase: UserPurchase;
  onClose: () => void;
  user: SessionUser;
}

export const PurchaseDetailsModal = ({
  purchase,
  onClose,
  user,
}: PurchaseDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "!bg-green-100 text-green-800 dark:!bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "!bg-yellow-100 text-yellow-800 dark:!bg-yellow-900/30 dark:text-yellow-400";
      case "FAILED":
        return "!bg-red-100 text-red-800 dark:!bg-red-900/30 dark:text-red-400";
      default:
        return "!bg-gray-100 text-gray-800 dark:!bg-gray-900/30 dark:text-gray-400";
    }
  };

  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-brand p-2 text-white">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order #{purchase.orderNumber}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order ID: {purchase.id}
                </p>
              </div>
            </div>
            <button
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6 p-6">
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                  <div className="mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-brand" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Order Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order Date
                      </p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {formatDate(purchase.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                      <Badge
                        className={`mt-1 ${getStatusColor(purchase.status)}`}
                      >
                        {purchase.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                  <div className="mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-brand-pink" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Payment Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Payment Provider
                      </p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {purchase.paymentProvider || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Amount
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${purchase.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Order Items
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {purchase?.component?.name || "Bundle"}
                      </p>
                      {purchase.isComponent && (
                        <p className="ml-2 text-gray-500 dark:text-gray-400">
                          Component
                        </p>
                      )}
                      {purchase.isBundle && (
                        <p className="ml-2 text-gray-500 dark:text-gray-400">
                          Bundle
                        </p>
                      )}
                      {purchase.isPack && (
                        <p className="ml-2 text-gray-500 dark:text-gray-400">
                          Pack
                        </p>
                      )}
                    </div>
                    <Badge className="!bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300">
                      1x
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowInvoicePreview(true)}
              >
                <Eye className="h-4 w-4" />
                Preview Invoice
              </Button>
              {/* <Button className="flex items-center gap-2 bg-brand hover:bg-brand/90">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button> */}
            </div>
          </div>
          {showInvoicePreview && (
            <InvoicePreviewModal
              purchase={purchase}
              onClose={() => setShowInvoicePreview(false)}
              user={user}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
