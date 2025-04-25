"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Search, Filter, ChevronDown, X, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseDetailsModal } from "./purchase-details-modal";
import { InvoicePreviewModal } from "./invoice-preview-modal";
import { PaymentStatus } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { SessionUser } from "@/types";
import Link from "next/link";

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
  paymentProvider: string | null;
  component: {
    name: string;
  } | null;
};

interface UserPurchasesProps {
  userPurchases: UserPurchase[];
  user: SessionUser;
}

export const UserPurchases = ({ userPurchases, user }: UserPurchasesProps) => {
  const [selectedPurchase, setSelectedPurchase] = useState<UserPurchase | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [previewPurchase, setPreviewPurchase] = useState<UserPurchase | null>(
    null,
  );

  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const clearFilters = () => {
    setStatusFilter([]);
    setSearchTerm("");
  };

  const filteredPurchases = userPurchases.filter((purchase) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      purchase?.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase?.component?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(purchase.status);

    return matchesSearch && matchesStatus;
  });

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

  const openPurchaseDetails = (purchase: UserPurchase) => {
    setSelectedPurchase(purchase);
  };

  const closePurchaseDetails = () => {
    setSelectedPurchase(null);
  };

  const openInvoicePreview = (purchase: UserPurchase) => {
    setPreviewPurchase(purchase);
  };

  const closeInvoicePreview = () => {
    setPreviewPurchase(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          My Purchases
        </h2>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 outline-none focus:ring-2 focus:ring-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown
              className={`h-4 w-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleStatusFilter("SUCCESS")}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusFilter.includes("SUCCESS")
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => toggleStatusFilter("PENDING")}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusFilter.includes("PENDING")
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => toggleStatusFilter("FAILED")}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusFilter.includes("FAILED")
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  Failed
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {(statusFilter.length > 0 || searchTerm) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Active Filters:
          </span>

          {statusFilter.map((status) => (
            <div
              key={status}
              className="flex items-center gap-1 rounded-lg bg-brand/10 px-2 py-1 text-sm text-brand"
            >
              Status: {status}
              <button onClick={() => toggleStatusFilter(status)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {searchTerm && (
            <div className="flex items-center gap-1 rounded-lg bg-brand/10 px-2 py-1 text-sm text-brand">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm("")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <button
            className="text-sm text-brand hover:underline"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      )}

      {filteredPurchases.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No purchases found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter.length > 0
              ? "Try adjusting your filters to find what you&apos;re looking for."
              : "You haven&apos;t made any purchases yet."}
          </p>
          {!searchTerm && statusFilter.length === 0 && (
            <Button className="mx-auto mt-4 w-fit">
              <Link href="/pricing">Purchase Now</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPurchases.map((purchase, index) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Order #{purchase.orderNumber}
                    </h3>
                    <Badge className={getStatusColor(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(purchase.date)}
                  </p>
                  <div className="mt-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {purchase?.component?.name || "Bundle"}
                      </span>
                      {purchase.isComponent && (
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                          (Component)
                        </span>
                      )}
                      {purchase.isBundle && (
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                          (Bundle)
                        </span>
                      )}
                      {purchase.isPack && (
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                          (Pack)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ${purchase.amount.toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => openPurchaseDetails(purchase)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => openInvoicePreview(purchase)}
                    >
                      <Eye className="h-4 w-4" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedPurchase && (
        <PurchaseDetailsModal
          purchase={selectedPurchase}
          onClose={closePurchaseDetails}
          user={user}
        />
      )}
      {previewPurchase && (
        <InvoicePreviewModal
          purchase={previewPurchase}
          onClose={closeInvoicePreview}
          user={user}
        />
      )}
    </div>
  );
};
