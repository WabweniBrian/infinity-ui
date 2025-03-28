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
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  CheckSquare,
  Clock,
  Edit,
  Eye,
  FileText,
  Filter,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function TaskManagementDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Sample data
  const tasks = [
    {
      id: "task1",
      title: "Redesign homepage",
      description: "Update the homepage design with new branding elements",
      status: "In Progress",
      statusColor: "bg-blue-500",
      priority: "High",
      priorityColor: "bg-red-500",
      dueDate: "Jun 15, 2023",
      assignee: {
        name: "Alex Morgan",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      },
      progress: 65,
      tags: ["Design", "Website"],
      comments: 5,
      attachments: 2,
    },
    {
      id: "task2",
      title: "Fix payment integration bugs",
      description: "Resolve issues with Stripe payment processing",
      status: "To Do",
      statusColor: "bg-yellow-500",
      priority: "Medium",
      priorityColor: "bg-orange-500",
      dueDate: "Jun 18, 2023",
      assignee: {
        name: "Sarah Johnson",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      },
      progress: 0,
      tags: ["Backend", "Bug Fix"],
      comments: 3,
      attachments: 1,
    },
    {
      id: "task3",
      title: "Create onboarding flow",
      description: "Design and implement user onboarding experience",
      status: "In Progress",
      statusColor: "bg-blue-500",
      priority: "High",
      priorityColor: "bg-red-500",
      dueDate: "Jun 20, 2023",
      assignee: {
        name: "Michael Brown",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      },
      progress: 40,
      tags: ["UX", "Frontend"],
      comments: 8,
      attachments: 3,
    },
    {
      id: "task4",
      title: "Write API documentation",
      description: "Create comprehensive documentation for the REST API",
      status: "Completed",
      statusColor: "bg-green-500",
      priority: "Low",
      priorityColor: "bg-blue-500",
      dueDate: "Jun 10, 2023",
      assignee: {
        name: "Emily Davis",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      },
      progress: 100,
      tags: ["Documentation", "API"],
      comments: 2,
      attachments: 1,
    },
    {
      id: "task5",
      title: "Implement analytics dashboard",
      description: "Create data visualization dashboard for user metrics",
      status: "To Do",
      statusColor: "bg-yellow-500",
      priority: "Medium",
      priorityColor: "bg-orange-500",
      dueDate: "Jun 25, 2023",
      assignee: {
        name: "Robert Wilson",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      },
      progress: 0,
      tags: ["Analytics", "Frontend"],
      comments: 0,
      attachments: 0,
    },
  ];

  const teamMembers = [
    {
      id: "user1",
      name: "Alex Morgan",
      role: "Product Manager",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tasks: {
        total: 12,
        completed: 8,
      },
    },
    {
      id: "user2",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tasks: {
        total: 15,
        completed: 10,
      },
    },
    {
      id: "user3",
      name: "Michael Brown",
      role: "UX Designer",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tasks: {
        total: 8,
        completed: 3,
      },
    },
    {
      id: "user4",
      name: "Emily Davis",
      role: "Backend Developer",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tasks: {
        total: 10,
        completed: 9,
      },
    },
  ];

  const projectStats = [
    {
      name: "Total Tasks",
      value: 48,
      icon: <CheckSquare className="h-5 w-5" />,
      change: "+5",
      iconBg: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    },
    {
      name: "In Progress",
      value: 16,
      icon: <Clock className="h-5 w-5" />,
      change: "+2",
      iconBg:
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
    },
    {
      name: "Completed",
      value: 24,
      icon: <CheckCircle className="h-5 w-5" />,
      change: "+8",
      iconBg:
        "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    },
    {
      name: "Overdue",
      value: 8,
      icon: <AlertTriangle className="h-5 w-5" />,
      change: "-3",
      iconBg: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Task Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your tasks, projects, and team productivity
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <Button className="bg-violet-600 text-white hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
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
          {projectStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className={cn("mr-4 rounded-full p-2", stat.iconBg)}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div
                        className={cn(
                          "flex items-center text-sm",
                          stat.change.startsWith("+")
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {stat.change.startsWith("+") ? (
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                        )}
                        <span>{stat.change} this week</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                  <Input placeholder="Search tasks..." className="pl-10" />
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
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-[300px]"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="mine">My Tasks</TabsTrigger>
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Tasks List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tasks</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Due Date</DropdownMenuItem>
                      <DropdownMenuItem>Priority</DropdownMenuItem>
                      <DropdownMenuItem>Status</DropdownMenuItem>
                      <DropdownMenuItem>Assignee</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  Manage and track your project tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      className={cn(
                        "rounded-lg border border-gray-200 p-4 transition-colors hover:border-violet-300 dark:border-gray-800 dark:hover:border-violet-700",
                        selectedTask === task.id
                          ? "border-violet-500 ring-1 ring-violet-500 dark:border-violet-500"
                          : "",
                      )}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={cn(
                              "mt-1 flex h-5 w-5 items-center justify-center rounded-full",
                              task.status === "Completed"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-gray-100 dark:bg-gray-800",
                            )}
                          >
                            {task.status === "Completed" ? (
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                            )}
                          </div>
                          <div>
                            <h4
                              className={cn(
                                "font-medium text-gray-900 dark:text-white",
                                task.status === "Completed"
                                  ? "text-gray-500 line-through dark:text-gray-400"
                                  : "",
                              )}
                            >
                              {task.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <Badge className={cn("text-white", task.priorityColor)}>
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {task.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className={`h-full rounded-full ${
                              task.progress === 100
                                ? "bg-green-500"
                                : task.progress > 50
                                  ? "bg-blue-500"
                                  : task.progress > 0
                                    ? "bg-yellow-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            style={{
                              width: `${task.progress}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            {task.dueDate}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <MessageSquare className="mr-1 h-3.5 w-3.5" />
                            {task.comments}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FileText className="mr-1 h-3.5 w-3.5" />
                            {task.attachments}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                            />
                            <AvatarFallback>
                              {task.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-400"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-800">
                <button className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
                  View All Tasks →
                </button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Team Members</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    {teamMembers.length}
                  </Badge>
                </div>
                <CardDescription>
                  Team workload and task distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Task Completion
                          </span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {member.tasks.completed}/{member.tasks.total}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-violet-500"
                            style={{
                              width: `${(member.tasks.completed / member.tasks.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">
                          View Tasks
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-800">
                <button className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
                  Manage Team →
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section - Task Details */}
        {selectedTask && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Task Details</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Change Priority</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Task</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {tasks.find((t) => t.id === selectedTask)?.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {tasks.find((t) => t.id === selectedTask)?.description}
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </h4>
                        <Badge
                          className={cn(
                            "text-white",
                            tasks.find((t) => t.id === selectedTask)
                              ?.statusColor,
                          )}
                        >
                          {tasks.find((t) => t.id === selectedTask)?.status}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Priority
                        </h4>
                        <Badge
                          className={cn(
                            "text-white",
                            tasks.find((t) => t.id === selectedTask)
                              ?.priorityColor,
                          )}
                        >
                          {tasks.find((t) => t.id === selectedTask)?.priority}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Due Date
                        </h4>
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          {tasks.find((t) => t.id === selectedTask)?.dueDate}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Assignee
                        </h4>
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-6 w-6">
                            <AvatarImage
                              src={
                                tasks.find((t) => t.id === selectedTask)
                                  ?.assignee.avatar
                              }
                              alt={
                                tasks.find((t) => t.id === selectedTask)
                                  ?.assignee.name
                              }
                            />
                            <AvatarFallback>
                              {tasks
                                .find((t) => t.id === selectedTask)
                                ?.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-gray-700 dark:text-gray-300">
                            {
                              tasks.find((t) => t.id === selectedTask)?.assignee
                                .name
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Progress
                      </h4>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Completion
                        </span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {tasks.find((t) => t.id === selectedTask)?.progress}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className={`h-full rounded-full ${
                            (tasks.find((t) => t.id === selectedTask)
                              ?.progress || 0) === 100
                              ? "bg-green-500"
                              : (tasks.find((t) => t.id === selectedTask)
                                    ?.progress || 0) > 50
                                ? "bg-blue-500"
                                : (tasks.find((t) => t.id === selectedTask)
                                      ?.progress || 0) > 0
                                  ? "bg-yellow-500"
                                  : "bg-gray-300 dark:bg-gray-600"
                          }`}
                          style={{
                            width: `${
                              tasks.find((t) => t.id === selectedTask)
                                ?.progress || 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tasks
                          .find((t) => t.id === selectedTask)
                          ?.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-400"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Activity
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=32&width=32"
                              alt="System"
                            />
                            <AvatarFallback>S</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              System
                            </span>{" "}
                            changed status to{" "}
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              In Progress
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            2 hours ago
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                tasks.find((t) => t.id === selectedTask)
                                  ?.assignee.avatar
                              }
                              alt={
                                tasks.find((t) => t.id === selectedTask)
                                  ?.assignee.name
                              }
                            />
                            <AvatarFallback>
                              {tasks
                                .find((t) => t.id === selectedTask)
                                ?.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {
                                tasks.find((t) => t.id === selectedTask)
                                  ?.assignee.name
                              }
                            </span>{" "}
                            added a comment
                          </p>
                          <div className="mt-1 rounded-md bg-gray-50 p-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            I&apos;ve started working on this. Will update the
                            progress soon.
                          </div>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            3 hours ago
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=32&width=32"
                              alt="Admin"
                            />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Admin
                            </span>{" "}
                            created this task and assigned it to{" "}
                            <span className="font-medium text-gray-900 dark:text-white">
                              {
                                tasks.find((t) => t.id === selectedTask)
                                  ?.assignee.name
                              }
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            1 day ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
