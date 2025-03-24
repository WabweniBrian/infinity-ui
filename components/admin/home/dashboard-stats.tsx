import { Card, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/actions/admin/dashboard-stats";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const IconMap = {
  "dollar-sign": DollarSign,
  package: Package,
  "shopping-cart": ShoppingCart,
  users: Users,
};

export const DashboardStats = async () => {
  const stats = await getDashboardStats();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = IconMap[stat.icon as keyof typeof IconMap];

        return (
          <div key={index}>
            <Card className="overflow-hidden">
              <div className="flex">
                <div className="flex-1 p-4">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className="mt-3 text-2xl font-bold">{stat.value}</div>
                  <div className="mt-1 flex items-center text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      from last month
                    </span>
                  </div>
                </div>
                <div
                  className={`flex w-16 items-center justify-center ${stat.color}`}
                >
                  <IconComponent size={24} />
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
