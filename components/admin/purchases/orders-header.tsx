"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { AddPurchaseModal } from "./add-purchase-modal";

type User = {
  id: string;
  name: string;
};

type Component = {
  id: string;
  name: string;
};

interface OrderHeaderProps {
  users: User[];
  components: Component[];
}

export const OrdersHeader = ({ users, components }: OrderHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Orders/Purchases
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage customer orders and purchases
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export orders as CSV</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Upload size={16} className="mr-2" />
                  Import
                </Button>
              </TooltipTrigger>
              <TooltipContent>Import orders from CSV</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <FileText size={16} className="mr-2" />
                  Generate Report
                </Button>
              </TooltipTrigger>
              <TooltipContent>Generate detailed sales report</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <AddPurchaseModal users={users} components={components} />
        </div>
      </div>
    </motion.div>
  );
};
