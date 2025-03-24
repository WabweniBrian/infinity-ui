"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { formatDate } from "@/lib/utils";
import { SessionUser } from "@/types";
import type { PaymentStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer, X } from "lucide-react";
import { useState } from "react";

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
};

interface InvoicePreviewModalProps {
  purchase: UserPurchase;
  onClose: () => void;
  user: SessionUser;
}

export const InvoicePreviewModal = ({
  purchase,
  onClose,
  user,
}: InvoicePreviewModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-print-content");
    const originalContents = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      // Reattach event handlers after printing
      window.location.reload();
    }
  };

  // Generate invoice item based on purchase type
  const getInvoiceItem = () => {
    let itemName = "Unknown Item";
    let itemType = "Item";

    if (purchase.isComponent && purchase.component) {
      itemName = purchase.component.name;
      itemType = "Component";
    } else if (purchase.isBundle) {
      itemName = "Bundle Package";
      itemType = "Bundle";
    } else if (purchase.isPack) {
      itemName = "Component Pack";
      itemType = "Pack";
    }

    return {
      name: itemName,
      type: itemType,
      price: purchase.amount,
    };
  };

  const invoiceItem = getInvoiceItem();

  // Calculate subtotal, tax, and total
  const subtotal = invoiceItem.price;
  const taxRate = 0.0; //
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-[66] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl rounded-xl bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold">Invoice Preview</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              {/* <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button> */}
              <button
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                onClick={onClose}
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="max-h-[80vh] overflow-y-auto p-6"
            id="invoice-print-content"
          >
            {/* Invoice Header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                <p className="mt-1 text-gray-600">
                  #{purchase.orderNumber || "N/A"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-brand">Infinity UI</div>
                <p className="text-gray-600">Kololo</p>
                <p className="text-gray-600">Kampala Uganda</p>
                <p className="text-gray-600">support@infinityui.dev</p>
              </div>
            </div>

            {/* Invoice Info */}
            <div className="mb-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-2 font-medium text-gray-500">Bill To:</h3>
                <p className="font-medium">{user?.name}</p>
                <p className="text-gray-600">{user?.email}</p>
                {purchase?.address && (
                  <p className="text-gray-600">
                    {purchase?.address}{" "}
                    {purchase.zipCode && <span>, {purchase.zipCode} </span>}
                  </p>
                )}
                <p className="text-gray-600">{purchase?.phone}</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="mb-2 font-medium text-gray-500">
                      Invoice Number:
                    </h3>
                    <p className="font-medium">
                      INV-{purchase.orderNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-gray-500">Date:</h3>
                    <p className="font-medium">{formatDate(purchase.date)}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-gray-500">
                      Payment Status:
                    </h3>
                    <p
                      className={`font-medium ${
                        purchase.status === "SUCCESS"
                          ? "text-green-600"
                          : purchase.status === "PENDING"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {purchase.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-gray-500">
                      Due Date:
                    </h3>
                    <p className="font-medium">{formatDate(purchase.date)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="border-b px-4 py-3 font-medium text-gray-600">
                      Item
                    </th>
                    <th className="border-b px-4 py-3 font-medium text-gray-600">
                      Type
                    </th>
                    <th className="border-b px-4 py-3 text-right font-medium text-gray-600">
                      Price
                    </th>
                    <th className="border-b px-4 py-3 text-center font-medium text-gray-600">
                      Qty
                    </th>
                    <th className="border-b px-4 py-3 text-right font-medium text-gray-600">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-4">{invoiceItem.name}</td>
                    <td className="px-4 py-4">{invoiceItem.type}</td>
                    <td className="px-4 py-4 text-right">
                      ${invoiceItem.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center">1</td>
                    <td className="px-4 py-4 text-right">
                      ${invoiceItem.price.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Invoice Summary */}
            <div className="mb-8 flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (0.0%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-gray-200 py-2">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Invoice Notes */}
            <div className="border-t pt-6">
              <h3 className="mb-2 font-medium text-gray-500">Notes:</h3>
              <p className="text-gray-600">
                Thank you for your purchase! If you have any questions about
                this invoice, please contact our support team at
                support@infinityui.com.
              </p>
            </div>

            {/* Invoice Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                This is a computer-generated document. No signature is required.
              </p>
            </div>
          </div>

          {/* Pagination controls - only show if we have multiple pages */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t p-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
