"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { RecentSaleData } from "@/lib/actions/admin/dashboard-stats";

interface RecentSalesProps {
  sales: RecentSaleData[];
}

export const RecentSales = ({ sales }: RecentSalesProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="space-y-4">
      {sales.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No recent sales found
        </p>
      ) : (
        sales.map((sale, index) => (
          <motion.div
            key={sale.id}
            className="justify-between rounded-lg border p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 sm:flex sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="gap-2 flex-align-center">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={
                    sale.customer.image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                  }
                  alt={sale.customer.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1 sm:ml-4">
                <p className="text-sm font-medium">{sale.customer.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {sale.customer.email}
                </p>
              </div>
            </div>
            <div className="mt-3 sm:ml-auto sm:mt-0 sm:text-right">
              <p className="text-sm font-medium">{formatAmount(sale.amount)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {sale.component || "Unknown Component"}
              </p>
            </div>
            <div className="mt-2 flex sm:ml-4 sm:mt-0 sm:flex-col sm:items-end">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(sale.status)}`}
              >
                {sale.status}
              </span>
              <span className="ml-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatDate(sale.date)}
              </span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};
