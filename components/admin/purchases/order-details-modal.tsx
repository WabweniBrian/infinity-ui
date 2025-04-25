"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Check,
  Download,
  FileText,
  Mail,
  Package,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface ComponentData {
  id: string;
  name: string;
  slug: string;
}

interface UserOrderStats {
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  orderNumber: string;
  amount: number;
  date: Date;
  status: string;
  isComponent: boolean;
  isBundle: boolean;
  isPack: boolean;
  pack: string | null;
  componentId: string | null;
  user: UserData;
  component: ComponentData | null;
  userStats?: UserOrderStats;
}
interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onEmailUser: () => Promise<void>;
}

export const OrderDetailsModal = ({
  order,
  onClose,
  onEmailUser,
}: OrderDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getOrderTypeName = (order: Order) => {
    if (order.isComponent) {
      return "Component";
    } else if (order.isPack) {
      return order.pack || "Pack";
    } else if (order.isBundle) {
      return "Bundle";
    }
    return "Unknown";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-brand p-2 text-white">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {order.orderNumber || `Order #${order.id}`}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order ID: {order.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "details"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("details")}
            >
              <ShoppingCart className="mr-2 inline-block h-4 w-4" />
              Order Details
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "customer"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("customer")}
            >
              <User className="mr-2 inline-block h-4 w-4" />
              Customer
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "invoice"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("invoice")}
            >
              <FileText className="mr-2 inline-block h-4 w-4" />
              Invoice
            </button>
          </div>

          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
            {activeTab === "details" && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="mb-4 flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5 text-brand" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Order Information
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Order Number
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {order.orderNumber || `Order #${order.id}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Order Date
                        </p>
                        <div className="mt-1 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {formatDate(order.date)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <Badge
                          className={`mt-1 ${getStatusColor(order.status)}`}
                        >
                          {order.status === "SUCCESS" ? (
                            <Check className="mr-1 h-3 w-3" />
                          ) : order.status === "FAILED" ? (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          ) : null}
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="mb-4 flex items-center">
                      <Package className="mr-2 h-5 w-5 text-brand-pink" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Purchase Details
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Type
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {getOrderTypeName(order)}
                        </p>
                      </div>
                      {order.isComponent && order.component && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Component
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {order.component.name}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Amount
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ${order.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 md:col-span-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={onEmailUser}
                    >
                      <Mail className="h-4 w-4" />
                      Email Customer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "customer" && (
              <div className="p-6">
                <div className="mb-6 flex items-center">
                  <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={
                        order.user.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={order.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {order.user.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {order.user.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customer ID: {order.user.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Customer Orders
                    </h4>
                    <div className="py-6 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        This customer has made{" "}
                        <span className="font-bold text-brand">
                          {order.userStats?.totalOrders}
                        </span>{" "}
                        orders.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View All Orders
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Customer Spending
                    </h4>
                    <div className="py-6 text-center">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${order.userStats?.totalSpent.toFixed(2)}
                      </p>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Total spent
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Customer
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "invoice" && (
              <div className="p-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        INVOICE
                      </h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        {order.orderNumber || `Order #${order.id}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-brand">
                        Infinity UI
                      </div>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        123 UI Street, Component City
                        <br />
                        contact@infinityui.com
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Bill To:
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {order.user.name}
                        <br />
                        {order.user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Invoice Details:
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        Invoice Date: {formatDate(order.date)}
                        <br />
                        Due Date: {formatDate(order.date)}
                        <br />
                        Status:{" "}
                        <span
                          className={
                            order.status === "SUCCESS"
                              ? "text-green-600"
                              : order.status === "PENDING"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }
                        >
                          {order.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <table className="mb-8 w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 text-left text-gray-500 dark:text-gray-400">
                          Item
                        </th>
                        <th className="py-3 text-right text-gray-500 dark:text-gray-400">
                          Price
                        </th>
                        <th className="py-3 text-right text-gray-500 dark:text-gray-400">
                          Quantity
                        </th>
                        <th className="py-3 text-right text-gray-500 dark:text-gray-400">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-4 text-gray-900 dark:text-white">
                          {order.isComponent && order.component
                            ? order.component.name
                            : getOrderTypeName(order)}
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {order.isComponent
                              ? "Component"
                              : order.isPack
                                ? "Pack"
                                : "Bundle"}
                          </div>
                        </td>
                        <td className="py-4 text-right text-gray-900 dark:text-white">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="py-4 text-right text-gray-900 dark:text-white">
                          1
                        </td>
                        <td className="py-4 text-right text-gray-900 dark:text-white">
                          ${order.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="py-4 text-right font-medium text-gray-500 dark:text-gray-400">
                          Subtotal
                        </td>
                        <td className="py-4 text-right text-gray-900 dark:text-white">
                          ${order.amount.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="py-4 text-right font-medium text-gray-500 dark:text-gray-400">
                          Tax (0%)
                        </td>
                        <td className="py-4 text-right text-gray-900 dark:text-white">
                          $0.00
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="py-4 text-right font-bold text-gray-900 dark:text-white">
                          Total
                        </td>
                        <td className="py-4 text-right font-bold text-gray-900 dark:text-white">
                          ${order.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="border-t border-gray-200 pt-6 text-center dark:border-gray-700">
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                      Thank you for your purchase!
                    </p>
                    <Button className="bg-brand hover:bg-brand/90">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
