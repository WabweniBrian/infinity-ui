"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Clipboard,
  DollarSign,
  Download,
  Filter,
  Package,
  Search,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState("inventory");

  // Sample data
  const lowStockItems = [
    {
      id: "med1",
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      currentStock: 15,
      minStock: 20,
      supplier: "MedSupply Inc.",
      reorderStatus: "Pending",
      price: "$12.99",
    },
    {
      id: "med2",
      name: "Lisinopril 10mg",
      category: "Blood Pressure",
      currentStock: 8,
      minStock: 25,
      supplier: "PharmaDirect",
      reorderStatus: "Ordered",
      price: "$15.50",
    },
    {
      id: "med3",
      name: "Albuterol Inhaler",
      category: "Respiratory",
      currentStock: 5,
      minStock: 15,
      supplier: "MedSupply Inc.",
      reorderStatus: "Pending",
      price: "$45.00",
    },
    {
      id: "med4",
      name: "Metformin 500mg",
      category: "Diabetes",
      currentStock: 12,
      minStock: 30,
      supplier: "Global Pharma",
      reorderStatus: "Pending",
      price: "$8.75",
    },
  ];

  const recentPrescriptions = [
    {
      id: "rx1",
      patient: "John Smith",
      medication: "Amoxicillin 500mg",
      dosage: "1 tablet 3x daily",
      prescriber: "Dr. Sarah Johnson",
      date: "Jun 12, 2023",
      status: "Ready for Pickup",
      statusColor: "bg-green-500",
    },
    {
      id: "rx2",
      patient: "Emily Davis",
      medication: "Lisinopril 10mg",
      dosage: "1 tablet daily",
      prescriber: "Dr. Michael Brown",
      date: "Jun 12, 2023",
      status: "Processing",
      statusColor: "bg-blue-500",
    },
    {
      id: "rx3",
      patient: "Robert Wilson",
      medication: "Atorvastatin 20mg",
      dosage: "1 tablet at bedtime",
      prescriber: "Dr. Lisa Chen",
      date: "Jun 11, 2023",
      status: "Picked Up",
      statusColor: "bg-gray-500",
    },
    {
      id: "rx4",
      patient: "Maria Garcia",
      medication: "Metformin 500mg",
      dosage: "1 tablet 2x daily",
      prescriber: "Dr. James Wilson",
      date: "Jun 11, 2023",
      status: "On Hold",
      statusColor: "bg-yellow-500",
    },
  ];

  const upcomingDeliveries = [
    {
      id: "del1",
      supplier: "MedSupply Inc.",
      items: "Antibiotics, Pain Relievers",
      date: "Jun 14, 2023",
      status: "In Transit",
    },
    {
      id: "del2",
      supplier: "PharmaDirect",
      items: "Blood Pressure Medications",
      date: "Jun 16, 2023",
      status: "Scheduled",
    },
    {
      id: "del3",
      supplier: "Global Pharma",
      items: "Diabetes Medications",
      date: "Jun 18, 2023",
      status: "Processing",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Pharmacy Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage inventory, prescriptions, and patient information
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                3
              </span>
            </div>
            <Avatar>
              <AvatarImage
                src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      1,248
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+42 new items</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <Clipboard className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      86
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+12 today</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Patients Served
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      42
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+8 from yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Daily Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                    <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      $3,842
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+15% from yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search medications, patients, or prescriptions..."
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Quick Actions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Low Stock Items */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Low Stock Items</CardTitle>
                    <CardDescription>
                      Medications that need to be reordered soon
                    </CardDescription>
                  </div>
                  <Badge variant="destructive" className="font-normal">
                    {lowStockItems.length} Items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Medication
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Supplier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Price
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {lowStockItems.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {item.category}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                {item.currentStock} / {item.minStock}
                              </span>
                              <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                                <div
                                  className="h-full rounded-full bg-red-500"
                                  style={{
                                    width: `${(item.currentStock / item.minStock) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {item.supplier}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={cn(
                                "rounded-full px-2 py-1 text-xs",
                                item.reorderStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                                  : item.reorderStatus === "Ordered"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
                              )}
                            >
                              {item.reorderStatus}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {item.price}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                            <button className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                              Reorder
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                  View All Inventory →
                </button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Recent Prescriptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Prescriptions</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    Today
                  </Badge>
                </div>
                <CardDescription>Latest prescription orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {prescription.patient}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {prescription.medication}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {prescription.dosage}
                          </p>
                        </div>
                        <Badge
                          className={cn("text-white", prescription.statusColor)}
                        >
                          {prescription.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{prescription.prescriber}</span>
                        <span>{prescription.date}</span>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-800">
                <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                  View All Prescriptions →
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Deliveries</CardTitle>
                  <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                    View All
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {upcomingDeliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                    >
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {delivery.supplier}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {delivery.items}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          {delivery.date}
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-xs",
                            delivery.status === "In Transit"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                              : delivery.status === "Scheduled"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
                          )}
                        >
                          {delivery.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
