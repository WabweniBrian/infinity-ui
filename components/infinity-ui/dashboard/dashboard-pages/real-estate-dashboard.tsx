"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  Home,
  MapPin,
  MoreHorizontal,
  Square,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RealEstateDashboard() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Sample data
  const propertyListings = [
    {
      id: "prop1",
      title: "Modern Apartment",
      address: "123 Main St, New York, NY",
      price: "$2,500/mo",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
      beds: 2,
      baths: 2,
      sqft: 1200,
      status: "Available",
      statusColor: "bg-green-500",
    },
    {
      id: "prop2",
      title: "Luxury Condo",
      address: "456 Park Ave, New York, NY",
      price: "$3,800/mo",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
      beds: 3,
      baths: 2,
      sqft: 1800,
      status: "Pending",
      statusColor: "bg-yellow-500",
    },
    {
      id: "prop3",
      title: "Townhouse",
      address: "789 Broadway, New York, NY",
      price: "$4,200/mo",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
      beds: 4,
      baths: 3,
      sqft: 2400,
      status: "Available",
      statusColor: "bg-green-500",
    },
    {
      id: "prop4",
      title: "Studio Apartment",
      address: "101 Village St, New York, NY",
      price: "$1,800/mo",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
      beds: 1,
      baths: 1,
      sqft: 650,
      status: "Rented",
      statusColor: "bg-blue-500",
    },
  ];

  const maintenanceRequests = [
    {
      id: "req1",
      property: "Modern Apartment",
      issue: "Leaking faucet in bathroom",
      tenant: "John Smith",
      date: "Jun 12, 2023",
      status: "Pending",
      priority: "Medium",
      priorityColor: "bg-yellow-500",
    },
    {
      id: "req2",
      property: "Luxury Condo",
      issue: "AC not working properly",
      tenant: "Sarah Johnson",
      date: "Jun 10, 2023",
      status: "In Progress",
      priority: "High",
      priorityColor: "bg-red-500",
    },
    {
      id: "req3",
      property: "Townhouse",
      issue: "Broken window in living room",
      tenant: "Michael Brown",
      date: "Jun 8, 2023",
      status: "Completed",
      priority: "High",
      priorityColor: "bg-red-500",
    },
    {
      id: "req4",
      property: "Studio Apartment",
      issue: "Smoke detector needs battery",
      tenant: "Emily Davis",
      date: "Jun 5, 2023",
      status: "Scheduled",
      priority: "Low",
      priorityColor: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Property Management Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your properties, tenants, and maintenance requests
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              Add Property
            </button>
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
                  Total Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      24
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+2 this month</span>
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
                  Occupancy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <Home className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      92%
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+5% from last month</span>
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
                  Total Tenants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      68
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+3 this month</span>
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
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                    <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      $86,429
                    </div>
                    <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      <span>-2.3% from last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Property Listings */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Property Listings</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View All Properties</DropdownMenuItem>
                      <DropdownMenuItem>Add New Property</DropdownMenuItem>
                      <DropdownMenuItem>Export List</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  Manage your property listings and view their status
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                  {propertyListings.map((property) => (
                    <motion.div
                      key={property.id}
                      className={cn(
                        "overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800",
                        selectedProperty === property.id
                          ? "ring-2 ring-indigo-500"
                          : "",
                      )}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedProperty(property.id)}
                    >
                      <div className="relative">
                        <Image
                          src={
                            property.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={property.title}
                          width={160}
                          height={160}
                          className="h-40 w-full object-cover"
                        />
                        <div className="absolute right-2 top-2">
                          <Badge
                            className={cn("text-white", property.statusColor)}
                          >
                            {property.status}
                          </Badge>
                        </div>
                        <button className="absolute left-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-700 hover:text-red-500 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:text-red-400">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {property.title}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="mr-1 h-3.5 w-3.5" />
                          {property.address}
                        </div>
                        <div className="mt-3 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {property.price}
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <BedDouble className="mr-1 h-4 w-4" />
                            {property.beds} Beds
                          </div>
                          <div className="flex items-center">
                            <Bath className="mr-1 h-4 w-4" />
                            {property.baths} Baths
                          </div>
                          <div className="flex items-center">
                            <Square className="mr-1 h-4 w-4" />
                            {property.sqft} sqft
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                  View All Properties →
                </button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Maintenance Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Maintenance Requests</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    4 New
                  </Badge>
                </div>
                <CardDescription>
                  Recent maintenance requests from tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {request.issue}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {request.property}
                          </p>
                        </div>
                        <Badge
                          className={cn("text-white", request.priorityColor)}
                        >
                          {request.priority}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <User className="mr-1 h-3.5 w-3.5" />
                          {request.tenant}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          {request.date}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-xs",
                            request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                              : request.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                                : request.status === "Completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
                          )}
                        >
                          {request.status}
                        </span>
                        <button className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-800">
                <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                  View All Requests →
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
                  <CardTitle>Upcoming Events</CardTitle>
                  <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                    View Calendar
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Property Viewing
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Modern Apartment
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        Today, 2:00 PM
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <User className="mr-1 h-3.5 w-3.5" />
                        John Smith
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Lease Signing
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Luxury Condo
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        Tomorrow, 10:00 AM
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <User className="mr-1 h-3.5 w-3.5" />
                        Sarah Johnson
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-yellow-100 p-2 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Maintenance Visit
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Townhouse
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        Jun 15, 9:00 AM
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <User className="mr-1 h-3.5 w-3.5" />
                        Michael Brown
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
