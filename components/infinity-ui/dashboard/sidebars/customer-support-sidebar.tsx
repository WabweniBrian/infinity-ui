"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Users,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Custom TicketIcon since it's not in lucide-react
const CustomTicketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

interface Ticket {
  id: string;
  subject: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  lastUpdate: string;
  category: string;
}

const tickets: Ticket[] = [
  {
    id: "TKT-1234",
    subject: "Unable to access my account",
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    status: "open",
    priority: "high",
    lastUpdate: "10 minutes ago",
    category: "Account Access",
  },
  {
    id: "TKT-1235",
    subject: "Payment failed for subscription renewal",
    customer: {
      name: "James Rodriguez",
      email: "james.r@example.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    status: "pending",
    priority: "medium",
    lastUpdate: "2 hours ago",
    category: "Billing",
  },
  {
    id: "TKT-1236",
    subject: "How do I change my shipping address?",
    customer: {
      name: "Sophia Chen",
      email: "sophia.c@example.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    status: "open",
    priority: "low",
    lastUpdate: "1 day ago",
    category: "Orders",
  },
  {
    id: "TKT-1237",
    subject: "Product arrived damaged",
    customer: {
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    status: "open",
    priority: "high",
    lastUpdate: "3 hours ago",
    category: "Returns",
  },
  {
    id: "TKT-1238",
    subject: "Feature request: Dark mode",
    customer: {
      name: "Olivia Taylor",
      email: "olivia.t@example.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    status: "resolved",
    priority: "low",
    lastUpdate: "1 week ago",
    category: "Feature Request",
  },
];

const ticketFilters = [
  { id: "all", name: "All Tickets", count: 42 },
  { id: "open", name: "Open", count: 16 },
  { id: "pending", name: "Pending", count: 8 },
  { id: "resolved", name: "Resolved", count: 18 },
];

const categories = [
  { id: "account", name: "Account Access", count: 8 },
  { id: "billing", name: "Billing", count: 12 },
  { id: "orders", name: "Orders", count: 10 },
  { id: "returns", name: "Returns", count: 7 },
  { id: "feature", name: "Feature Requests", count: 5 },
];

export default function CustomerSupportSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.div
        className={cn(
          "relative h-full border-r border-gray-200 bg-white shadow-sm",
          isCollapsed ? "w-20" : "w-80",
        )}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    Support Desk
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleSidebar}
              className="rounded-full p-1 transition-colors hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-gray-200 p-4">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <button className="rounded-md p-2 hover:bg-gray-100">
                    <Search className="h-5 w-5 text-gray-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 p-4"
                >
                  {/* Ticket Filters */}
                  <div>
                    <div
                      className="mb-2 flex cursor-pointer items-center justify-between"
                      onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    >
                      <h3 className="text-sm font-medium text-gray-500">
                        Filters
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform",
                          isFilterExpanded && "rotate-180 transform",
                        )}
                      />
                    </div>

                    {isFilterExpanded && (
                      <div className="space-y-1">
                        {ticketFilters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                              activeFilter === filter.id
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50",
                            )}
                          >
                            <span>{filter.name}</span>
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-xs",
                                activeFilter === filter.id
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600",
                              )}
                            >
                              {filter.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <div
                      className="mb-2 flex cursor-pointer items-center justify-between"
                      onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                    >
                      <h3 className="text-sm font-medium text-gray-500">
                        Categories
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform",
                          isCategoryExpanded && "rotate-180 transform",
                        )}
                      />
                    </div>

                    {isCategoryExpanded && (
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <span>{category.name}</span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {category.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="mb-3 text-sm font-medium text-gray-500">
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-md bg-blue-50 p-3">
                        <div className="mb-1 text-xs text-blue-600">
                          Response Time
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          1.8 hrs
                        </div>
                      </div>
                      <div className="rounded-md bg-green-50 p-3">
                        <div className="mb-1 text-xs text-green-600">
                          Resolution Rate
                        </div>
                        <div className="text-lg font-semibold text-green-700">
                          94%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center space-y-4 py-4"
                >
                  <button className="rounded-md p-2 hover:bg-gray-100">
                    <CustomTicketIcon className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="rounded-md p-2 hover:bg-gray-100">
                    <Filter className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="rounded-md p-2 hover:bg-gray-100">
                    <Users className="h-5 w-5 text-gray-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-xs text-gray-500">Support Agent</div>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <Settings className="h-4 w-4 text-gray-500" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Support Tickets
            </h1>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                <PlusCircle className="h-4 w-4" />
                <span>New Ticket</span>
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={cn(
                    "cursor-pointer p-4 transition-colors hover:bg-gray-50",
                    selectedTicket === ticket.id &&
                      "bg-blue-50 hover:bg-blue-50",
                  )}
                  onClick={() =>
                    setSelectedTicket(
                      ticket.id === selectedTicket ? null : ticket.id,
                    )
                  }
                >
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <Image
                        src={
                          ticket.customer.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={ticket.customer.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {ticket.subject}
                        </h3>
                        <div className="flex items-center">
                          <span className="mr-2 text-xs text-gray-500">
                            {ticket.lastUpdate}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-1 text-xs font-medium",
                              ticket.status === "open" &&
                                "bg-yellow-100 text-yellow-800",
                              ticket.status === "pending" &&
                                "bg-blue-100 text-blue-800",
                              ticket.status === "resolved" &&
                                "bg-green-100 text-green-800",
                            )}
                          >
                            {ticket.status.charAt(0).toUpperCase() +
                              ticket.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs text-gray-500">
                          {ticket.customer.name}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {ticket.id}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            ticket.priority === "high" && "text-red-600",
                            ticket.priority === "medium" && "text-orange-600",
                            ticket.priority === "low" && "text-green-600",
                          )}
                        >
                          {ticket.priority.charAt(0).toUpperCase() +
                            ticket.priority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-gray-800">
                          {ticket.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedTicket === ticket.id && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                          <MessageSquare className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                          <ExternalLink className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
