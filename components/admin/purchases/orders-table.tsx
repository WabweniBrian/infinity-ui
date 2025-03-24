"use client";

import MainPagination from "@/components/common/main-pagination";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { Pack, PaymentStatus } from "@prisma/client";
import { Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import OrdersBulkActions from "./bulk-actions";
import OrderActions from "./order-actions";

type Order = {
  id: string;
  userId: string;
  componentId: string | null;
  isBundle: boolean;
  isPack: boolean;
  isComponent: boolean;
  pack: Pack | null;
  amount: number;
  date: Date;
  status: PaymentStatus;
  orderNumber: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  component: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

interface OrderTableProps {
  orders: Order[];
  ordersCount: number;
  totalOrders: number;
  totalPages: number;
  offset: number;
}

export const OrdersTable = ({
  orders,
  ordersCount,
  totalOrders,
  totalPages,
  offset,
}: OrderTableProps) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const allSelected =
    orders.length > 0 && selectedOrders.length === orders.length;

  const toggleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

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

  const getOrderTypeIcon = (order: Order) => {
    if (order.isComponent) {
      return <Package className="mr-1 h-4 w-4" />;
    } else if (order.isPack) {
      return <ShoppingBag className="mr-1 h-4 w-4" />;
    } else if (order.isBundle) {
      return <Package className="mr-1 h-4 w-4" />;
    }
    return null;
  };

  const getOrderTypeName = (order: Order) => {
    if (order.isComponent) {
      return "Order";
    } else if (order.isPack) {
      return order.pack || "Pack";
    } else if (order.isBundle) {
      return "Bundle";
    }
    return "Unknown";
  };

  return (
    <>
      <div className="mb-4 flex justify-end text-xl font-bold md:text-2xl">
        {ordersCount} purchase(s)
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Bulk Actions Bar */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedOrders.length} order
                {selectedOrders.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <OrdersBulkActions
              ids={selectedOrders}
              setSelectedIds={setSelectedOrders}
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left dark:bg-gray-700/50">
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all orders"
                    />
                    <label htmlFor="select-all" className="sr-only">
                      Select all
                    </label>
                    Order
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Image
                        src="/no-results.png"
                        alt="No Results Image"
                        width={60}
                        height={60}
                        className="mx-auto"
                      />
                      <p className="text-gray-500 dark:text-gray-400">
                        No results.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Checkbox
                            id={`select-${order.id}`}
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => toggleSelectOrder(order.id)}
                            aria-label={`Select order ${order.orderNumber || order.id}`}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.orderNumber || `Order #${order.id}`}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {order.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={
                              order.user.image || "/images/default-avatar.png"
                            }
                            alt={order.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.user.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {order.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className="flex w-fit items-center !bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300">
                        {getOrderTypeIcon(order)}
                        {getOrderTypeName(order)}
                      </Badge>
                      {order.component && (
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {order.component.name}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(order.date)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <OrderActions id={order.id} userId={order.userId} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/50 sm:flex-row">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium">
              {offset} - {offset + orders.length}
            </span>{" "}
            of <span className="font-medium">{totalOrders}</span> orders
          </div>

          {/* Pagination */}
          <div>{totalPages > 1 && <MainPagination pages={totalPages} />}</div>
        </div>
      </div>
    </>
  );
};
