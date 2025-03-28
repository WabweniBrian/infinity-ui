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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Clock,
  DollarSign,
  Download,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  PieChart,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const recentLeads = [
    {
      id: "lead1",
      name: "Sarah Johnson",
      company: "Acme Inc.",
      email: "sarah@acmeinc.com",
      phone: "(555) 123-4567",
      status: "New Lead",
      statusColor: "bg-blue-500",
      source: "Website",
      date: "Jun 12, 2023",
      value: "$12,000",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    {
      id: "lead2",
      name: "Michael Brown",
      company: "XYZ Corp",
      email: "michael@xyzcorp.com",
      phone: "(555) 987-6543",
      status: "Qualified",
      statusColor: "bg-green-500",
      source: "Referral",
      date: "Jun 11, 2023",
      value: "$8,500",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    {
      id: "lead3",
      name: "Emily Davis",
      company: "Tech Solutions",
      email: "emily@techsolutions.com",
      phone: "(555) 456-7890",
      status: "Negotiation",
      statusColor: "bg-purple-500",
      source: "LinkedIn",
      date: "Jun 10, 2023",
      value: "$15,000",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    {
      id: "lead4",
      name: "Robert Wilson",
      company: "Global Enterprises",
      email: "robert@globalent.com",
      phone: "(555) 789-0123",
      status: "Proposal",
      statusColor: "bg-yellow-500",
      source: "Trade Show",
      date: "Jun 9, 2023",
      value: "$22,000",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
  ];

  const upcomingActivities = [
    {
      id: "act1",
      type: "Call",
      icon: <Phone className="h-4 w-4" />,
      iconBg:
        "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
      contact: "Sarah Johnson",
      company: "Acme Inc.",
      time: "Today, 2:00 PM",
      notes: "Follow up on proposal",
    },
    {
      id: "act2",
      type: "Meeting",
      icon: <Users className="h-4 w-4" />,
      iconBg:
        "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
      contact: "Michael Brown",
      company: "XYZ Corp",
      time: "Tomorrow, 10:00 AM",
      notes: "Product demo",
    },
    {
      id: "act3",
      type: "Email",
      icon: <Mail className="h-4 w-4" />,
      iconBg:
        "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
      contact: "Emily Davis",
      company: "Tech Solutions",
      time: "Today, 4:30 PM",
      notes: "Send pricing information",
    },
  ];

  const salesPipeline = [
    { stage: "Lead", count: 45, value: "$125,000", color: "bg-blue-500" },
    {
      stage: "Qualified",
      count: 32,
      value: "$280,000",
      color: "bg-indigo-500",
    },
    { stage: "Proposal", count: 18, value: "$320,000", color: "bg-violet-500" },
    {
      stage: "Negotiation",
      count: 12,
      value: "$240,000",
      color: "bg-purple-500",
    },
    { stage: "Closed Won", count: 8, value: "$180,000", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              CRM Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your leads, deals, and customer relationships
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
              </TabsList>
            </Tabs>
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
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      145
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+12% this month</span>
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
                  Open Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      62
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+5% this month</span>
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
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <PieChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      24.8%
                    </div>
                    <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      <span>-2.1% this month</span>
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
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                    <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      $180,245
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+8.3% this month</span>
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
                    placeholder="Search leads, companies, or contacts..."
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
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Add Lead
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Leads */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Leads</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View All Leads</DropdownMenuItem>
                      <DropdownMenuItem>Add New Lead</DropdownMenuItem>
                      <DropdownMenuItem>Export Leads</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  Your most recent lead acquisitions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {recentLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <Avatar>
                                  <AvatarImage
                                    src={lead.avatar}
                                    alt={lead.name}
                                  />
                                  <AvatarFallback>
                                    {lead.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {lead.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {lead.company}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={cn(
                                "rounded-full px-2 py-1 text-xs text-white",
                                lead.statusColor,
                              )}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {lead.source}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {lead.value}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {lead.date}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                            <button className="font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                  View All Leads →
                </button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Upcoming Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Activities</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    Today
                  </Badge>
                </div>
                <CardDescription>
                  Your scheduled calls, meetings, and tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                    >
                      <div className="flex items-start">
                        <div
                          className={cn(
                            "mr-4 rounded-full p-2",
                            activity.iconBg,
                          )}
                        >
                          {activity.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {activity.type} with {activity.contact}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.company}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {activity.time}
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {activity.notes}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                          Reschedule
                        </button>
                        <button className="rounded bg-indigo-100 px-2 py-1 text-xs text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50">
                          Confirm
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-800">
                <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                  View Calendar →
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section - Sales Pipeline */}
        <div className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sales Pipeline</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                      <DropdownMenuItem>Customize View</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  Current distribution of deals across sales stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                  {salesPipeline.map((stage, index) => (
                    <div
                      key={stage.stage}
                      className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {stage.stage}
                        </h4>
                        <Badge className={cn("text-white", stage.color)}>
                          {stage.count}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stage.value}
                        </div>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className={`h-full ${stage.color} rounded-full`}
                          style={{ width: `${100 - index * 15}%` }}
                        ></div>
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
