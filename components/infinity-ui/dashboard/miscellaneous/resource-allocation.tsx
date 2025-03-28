"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  Clock,
  BarChart,
  PieChart,
  ArrowRight,
  Filter,
  Search,
  X,
  Info,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface Resource {
  id: string;
  name: string;
  role: string;
  avatar: string;
  allocation: number;
  projects: {
    id: string;
    name: string;
    allocation: number;
    color: string;
  }[];
}

interface Project {
  id: string;
  name: string;
  totalAllocation: number;
  color: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "planned" | "completed";
}

const ResourceAllocation = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"resources" | "projects">("resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "planned" | "completed"
  >("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockProjects: Project[] = [
          {
            id: "1",
            name: "Website Redesign",
            totalAllocation: 35,
            color: "#3b82f6",
            startDate: new Date(2023, 8, 1),
            endDate: new Date(2023, 11, 15),
            status: "active",
          },
          {
            id: "2",
            name: "Mobile App Development",
            totalAllocation: 45,
            color: "#10b981",
            startDate: new Date(2023, 7, 15),
            endDate: new Date(2024, 1, 28),
            status: "active",
          },
          {
            id: "3",
            name: "Marketing Campaign",
            totalAllocation: 20,
            color: "#8b5cf6",
            startDate: new Date(2023, 9, 1),
            endDate: new Date(2023, 11, 31),
            status: "planned",
          },
          {
            id: "4",
            name: "Product Launch",
            totalAllocation: 15,
            color: "#f59e0b",
            startDate: new Date(2023, 10, 15),
            endDate: new Date(2024, 0, 15),
            status: "planned",
          },
          {
            id: "5",
            name: "Brand Refresh",
            totalAllocation: 10,
            color: "#ec4899",
            startDate: new Date(2023, 6, 1),
            endDate: new Date(2023, 8, 30),
            status: "completed",
          },
        ];

        const mockResources: Resource[] = [
          {
            id: "1",
            name: "Alex Johnson",
            role: "UI/UX Designer",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            allocation: 90,
            projects: [
              {
                id: "1",
                name: "Website Redesign",
                allocation: 60,
                color: "#3b82f6",
              },
              {
                id: "2",
                name: "Mobile App Development",
                allocation: 30,
                color: "#10b981",
              },
            ],
          },
          {
            id: "2",
            name: "Sarah Williams",
            role: "Frontend Developer",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            allocation: 100,
            projects: [
              {
                id: "1",
                name: "Website Redesign",
                allocation: 50,
                color: "#3b82f6",
              },
              {
                id: "2",
                name: "Mobile App Development",
                allocation: 50,
                color: "#10b981",
              },
            ],
          },
          {
            id: "3",
            name: "Michael Brown",
            role: "Backend Developer",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            allocation: 80,
            projects: [
              {
                id: "2",
                name: "Mobile App Development",
                allocation: 80,
                color: "#10b981",
              },
            ],
          },
          {
            id: "4",
            name: "Emily Davis",
            role: "Project Manager",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            allocation: 70,
            projects: [
              {
                id: "1",
                name: "Website Redesign",
                allocation: 30,
                color: "#3b82f6",
              },
              {
                id: "3",
                name: "Marketing Campaign",
                allocation: 40,
                color: "#8b5cf6",
              },
            ],
          },
          {
            id: "5",
            name: "David Wilson",
            role: "Marketing Specialist",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            allocation: 60,
            projects: [
              {
                id: "3",
                name: "Marketing Campaign",
                allocation: 40,
                color: "#8b5cf6",
              },
              {
                id: "4",
                name: "Product Launch",
                allocation: 20,
                color: "#f59e0b",
              },
            ],
          },
          {
            id: "6",
            name: "Jessica Taylor",
            role: "Content Strategist",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            allocation: 50,
            projects: [
              {
                id: "3",
                name: "Marketing Campaign",
                allocation: 30,
                color: "#8b5cf6",
              },
              {
                id: "5",
                name: "Brand Refresh",
                allocation: 20,
                color: "#ec4899",
              },
            ],
          },
        ];

        setProjects(mockProjects);
        setResources(mockResources);
        setError(null);
      } catch (err) {
        setError(
          "Failed to load resource allocation data. Please try again later.",
        );
        console.error("Error fetching resource data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: "active" | "planned" | "completed") => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "planned":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getAllocationColor = (allocation: number) => {
    if (allocation > 90) return "text-red-500";
    if (allocation > 70) return "text-amber-500";
    return "text-green-500";
  };

  const filteredResources = searchQuery
    ? resources.filter(
        (resource) =>
          resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.role.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : resources;

  const filteredProjects = projects.filter((project) => {
    if (statusFilter !== "all" && project.status !== statusFilter) return false;
    if (searchQuery) {
      return project.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Resource Allocation
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-800">
              <button
                className={`px-3 py-1 text-sm ${view === "resources" ? "bg-gray-100 font-medium dark:bg-gray-800" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"}`}
                onClick={() => setView("resources")}
              >
                Resources
              </button>
              <button
                className={`px-3 py-1 text-sm ${view === "projects" ? "bg-gray-100 font-medium dark:bg-gray-800" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"}`}
                onClick={() => setView("projects")}
              >
                Projects
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`rounded-md p-1.5 ${view === "resources" ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
                onClick={() => setView("resources")}
              >
                <BarChart className="h-4 w-4" />
              </button>
              <button
                className={`rounded-md p-1.5 ${view === "projects" ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
                onClick={() => setView("projects")}
              >
                <PieChart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={
                view === "resources"
                  ? "Search resources..."
                  : "Search projects..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-teal-400 dark:focus:ring-teal-400"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {view === "projects" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Filter className="mr-1 h-4 w-4" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("planned")}>
                  Planned
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-teal-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading allocation data...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
            <button
              className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : view === "resources" ? (
          <div>
            {filteredResources.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="mb-2 h-12 w-12 text-gray-400" />
                <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                  No resources found
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "Try a different search term"
                    : "Add resources to get started"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Team Allocation
                  </h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {resources.length} team members
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              resource.avatar ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            width={40}
                            height={40}
                            alt={resource.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {resource.name}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {resource.role}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${getAllocationColor(resource.allocation)}`}
                          >
                            {resource.allocation}%
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Allocated
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            Project allocation
                          </span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {resource.allocation}%
                          </span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="flex h-full">
                            {resource.projects.map((project) => (
                              <motion.div
                                key={project.id}
                                className="h-full"
                                style={{
                                  backgroundColor: project.color,
                                  width: `${project.allocation}%`,
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${project.allocation}%` }}
                                transition={{ duration: 1 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {resource.projects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800"
                          >
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: project.color }}
                            ></div>
                            <span className="text-gray-700 dark:text-gray-300">
                              {project.name}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {project.allocation}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="mb-2 h-12 w-12 text-gray-400" />
                <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                  No projects found
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Add projects to get started"}
                </p>
                {(searchQuery || statusFilter !== "all") && (
                  <button
                    className="mt-4 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Project Allocation
                  </h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {projects.length} projects
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${project.color}20` }}
                          >
                            <Briefcase
                              style={{ color: project.color }}
                              className="h-5 w-5"
                            />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {project.name}
                            </h5>
                            <div className="mt-1 flex items-center gap-2 text-xs">
                              <span
                                className={`rounded-full px-2 py-0.5 font-medium ${getStatusColor(project.status)}`}
                              >
                                {project.status}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                {formatDate(project.startDate)} -{" "}
                                {formatDate(project.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {project.totalAllocation}%
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Total allocation
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            Resource allocation
                          </span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {project.totalAllocation}%
                          </span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: project.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${project.totalAllocation}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <h6 className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                          Team members
                        </h6>
                        <div className="flex -space-x-2">
                          {resources
                            .filter((resource) =>
                              resource.projects.some(
                                (p) => p.id === project.id,
                              ),
                            )
                            .slice(0, 5)
                            .map((resource) => (
                              <Image
                                key={resource.id}
                                src={
                                  resource.avatar ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                width={32}
                                height={32}
                                alt={resource.name}
                                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-gray-900"
                                title={resource.name}
                              />
                            ))}

                          {resources.filter((resource) =>
                            resource.projects.some((p) => p.id === project.id),
                          ).length > 5 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-800 dark:border-gray-900 dark:bg-gray-700 dark:text-gray-300">
                              +
                              {resources.filter((resource) =>
                                resource.projects.some(
                                  (p) => p.id === project.id,
                                ),
                              ).length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;
