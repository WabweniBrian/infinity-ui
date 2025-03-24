"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Download,
  File,
  Folder,
  Search,
  Share,
  X,
  FolderOpen,
  Star,
  Tag,
  List,
  LayoutGrid,
  FolderTree,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Home,
} from "lucide-react";

// Types for our data
interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: number;
  modified?: string;
  children?: TreeNode[];
  metadata?: Record<string, any>;
  permissions?: string[];
  owner?: string;
  shared?: boolean;
  favorite?: boolean;
  tags?: string[];
}

const HierarchicalDataExplorer = () => {
  const [data, setData] = useState<TreeNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {},
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [isNodeDetailsOpen, setIsNodeDetailsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "type" | "size" | "modified">(
    "name",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"tree" | "list" | "grid">("tree");
  const [breadcrumbs, setBreadcrumbs] = useState<TreeNode[]>([]);
  const [currentFolder, setCurrentFolder] = useState<TreeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Initialize sample data
  useEffect(() => {
    const sampleData: TreeNode[] = [
      {
        id: "folder-1",
        name: "Documents",
        type: "folder",
        modified: "2023-06-15",
        owner: "Alex Johnson",
        permissions: ["read", "write", "delete"],
        children: [
          {
            id: "folder-1-1",
            name: "Work",
            type: "folder",
            modified: "2023-06-10",
            owner: "Alex Johnson",
            permissions: ["read", "write", "delete"],
            children: [
              {
                id: "file-1-1-1",
                name: "Project Proposal.docx",
                type: "file",
                size: 2500000,
                modified: "2023-06-08",
                owner: "Alex Johnson",
                permissions: ["read", "write"],
                metadata: {
                  type: "Word Document",
                  pages: 15,
                  author: "Alex Johnson",
                },
                tags: ["work", "proposal", "important"],
              },
              {
                id: "file-1-1-2",
                name: "Budget.xlsx",
                type: "file",
                size: 1800000,
                modified: "2023-06-05",
                owner: "Alex Johnson",
                permissions: ["read", "write"],
                metadata: {
                  type: "Excel Spreadsheet",
                  sheets: 5,
                  author: "Alex Johnson",
                },
                tags: ["work", "finance"],
                favorite: true,
              },
            ],
          },
          {
            id: "folder-1-2",
            name: "Personal",
            type: "folder",
            modified: "2023-06-12",
            owner: "Alex Johnson",
            permissions: ["read", "write", "delete"],
            children: [
              {
                id: "file-1-2-1",
                name: "Resume.pdf",
                type: "file",
                size: 500000,
                modified: "2023-05-20",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "PDF Document",
                  pages: 2,
                  author: "Alex Johnson",
                },
                tags: ["personal", "job"],
              },
              {
                id: "file-1-2-2",
                name: "Tax Return.pdf",
                type: "file",
                size: 3500000,
                modified: "2023-04-15",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "PDF Document",
                  pages: 25,
                  author: "Tax Service",
                },
                tags: ["personal", "finance", "important"],
                favorite: true,
              },
            ],
          },
        ],
      },
      {
        id: "folder-2",
        name: "Photos",
        type: "folder",
        modified: "2023-06-18",
        owner: "Alex Johnson",
        permissions: ["read", "write", "delete"],
        children: [
          {
            id: "folder-2-1",
            name: "Vacation",
            type: "folder",
            modified: "2023-06-18",
            owner: "Alex Johnson",
            permissions: ["read", "write", "delete"],
            children: [
              {
                id: "file-2-1-1",
                name: "Beach.jpg",
                type: "file",
                size: 4500000,
                modified: "2023-06-18",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "JPEG Image",
                  dimensions: "3840x2160",
                  camera: "iPhone 13 Pro",
                },
                tags: ["vacation", "beach", "summer"],
                favorite: true,
              },
              {
                id: "file-2-1-2",
                name: "Mountains.jpg",
                type: "file",
                size: 5200000,
                modified: "2023-06-17",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "JPEG Image",
                  dimensions: "3840x2160",
                  camera: "iPhone 13 Pro",
                },
                tags: ["vacation", "mountains", "hiking"],
              },
            ],
          },
          {
            id: "folder-2-2",
            name: "Family",
            type: "folder",
            modified: "2023-05-30",
            owner: "Alex Johnson",
            permissions: ["read", "write", "delete"],
            children: [
              {
                id: "file-2-2-1",
                name: "Birthday Party.jpg",
                type: "file",
                size: 3800000,
                modified: "2023-05-30",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "JPEG Image",
                  dimensions: "3840x2160",
                  camera: "Canon EOS R5",
                },
                tags: ["family", "birthday", "party"],
                shared: true,
              },
            ],
          },
        ],
      },
      {
        id: "folder-3",
        name: "Projects",
        type: "folder",
        modified: "2023-06-20",
        owner: "Alex Johnson",
        permissions: ["read", "write", "delete"],
        children: [
          {
            id: "folder-3-1",
            name: "Website Redesign",
            type: "folder",
            modified: "2023-06-20",
            owner: "Alex Johnson",
            permissions: ["read", "write", "delete"],
            children: [
              {
                id: "file-3-1-1",
                name: "Homepage Mockup.psd",
                type: "file",
                size: 25000000,
                modified: "2023-06-20",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "Photoshop Document",
                  dimensions: "1920x1080",
                  author: "Sarah Chen",
                },
                tags: ["design", "website", "mockup"],
                shared: true,
              },
              {
                id: "file-3-1-2",
                name: "Color Palette.ai",
                type: "file",
                size: 1200000,
                modified: "2023-06-19",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "Illustrator Document",
                  author: "Sarah Chen",
                },
                tags: ["design", "colors"],
              },
            ],
          },
          {
            id: "folder-3-2",
            name: "Mobile App",
            type: "folder",
            modified: "2023-06-15",
            owner: "Alex Johnson",
            permissions: ["read", "write", "delete"],
            children: [
              {
                id: "file-3-2-1",
                name: "App Wireframes.sketch",
                type: "file",
                size: 18000000,
                modified: "2023-06-15",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "Sketch Document",
                  artboards: 12,
                  author: "Sarah Chen",
                },
                tags: ["design", "mobile", "wireframes"],
                favorite: true,
              },
              {
                id: "file-3-2-2",
                name: "User Flow.pdf",
                type: "file",
                size: 2800000,
                modified: "2023-06-14",
                owner: "Alex Johnson",
                permissions: ["read", "write", "delete"],
                metadata: {
                  type: "PDF Document",
                  pages: 5,
                  author: "Miguel Rodriguez",
                },
                tags: ["design", "ux", "user flow"],
                shared: true,
              },
            ],
          },
        ],
      },
    ];

    setData(sampleData);

    // Initialize expanded state for all nodes
    const initialExpandedState: Record<string, boolean> = {};
    const traverseNodes = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        initialExpandedState[node.id] = false;
        if (node.children) {
          traverseNodes(node.children);
        }
      });
    };

    traverseNodes(sampleData);
    setExpandedNodes(initialExpandedState);
  }, []);

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (bytes === undefined) return "";

    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Search nodes
  const searchNodes = (nodes: TreeNode[], term: string): TreeNode[] => {
    return nodes
      .filter((node) => {
        const matchesName = node.name
          .toLowerCase()
          .includes(term.toLowerCase());

        let childMatches: TreeNode[] = [];
        if (node.children) {
          childMatches = searchNodes(node.children, term);
        }

        if (childMatches.length > 0) {
          return true;
        }

        return matchesName;
      })
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: searchNodes(node.children, term),
          };
        }
        return node;
      });
  };

  // Get filtered and sorted nodes
  const getFilteredAndSortedNodes = () => {
    let filteredNodes = [...data];

    // Apply search filter
    if (searchTerm) {
      filteredNodes = searchNodes(filteredNodes, searchTerm);
    }

    // Apply sorting
    const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
      return [...nodes]
        .sort((a, b) => {
          let aValue: any;
          let bValue: any;

          switch (sortBy) {
            case "name":
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
              break;
            case "type":
              aValue = a.type;
              bValue = b.type;
              break;
            case "size":
              aValue = a.size || 0;
              bValue = b.size || 0;
              break;
            case "modified":
              aValue = a.modified ? new Date(a.modified).getTime() : 0;
              bValue = b.modified ? new Date(b.modified).getTime() : 0;
              break;
            default:
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
          }

          if (sortDirection === "asc") {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
          }
        })
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: sortNodes(node.children),
            };
          }
          return node;
        });
    };

    return sortNodes(filteredNodes);
  };

  // Get current view nodes
  const getCurrentViewNodes = () => {
    if (viewMode === "tree" || !currentFolder) {
      return getFilteredAndSortedNodes();
    }

    return currentFolder.children || [];
  };

  // Navigate to folder
  const navigateToFolder = (node: TreeNode) => {
    if (node.type !== "folder") return;

    setCurrentFolder(node);

    // Update breadcrumbs
    const newBreadcrumbs = [...breadcrumbs, node];
    setBreadcrumbs(newBreadcrumbs);
  };

  // Navigate to breadcrumb
  const navigateToBreadcrumb = (index: number) => {
    if (index === -1) {
      setCurrentFolder(null);
      setBreadcrumbs([]);
      return;
    }

    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1]);
  };

  // Get file icon color based on extension
  const getFileIconColor = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return "text-rose-500 dark:text-rose-400";
      case "doc":
      case "docx":
        return "text-blue-500 dark:text-blue-400";
      case "xls":
      case "xlsx":
        return "text-emerald-500 dark:text-emerald-400";
      case "ppt":
      case "pptx":
        return "text-orange-500 dark:text-orange-400";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "text-purple-500 dark:text-purple-400";
      case "psd":
      case "ai":
      case "sketch":
        return "text-indigo-500 dark:text-indigo-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  // Render tree node
  const renderTreeNode = (node: TreeNode, level = 0) => {
    const isExpanded = expandedNodes[node.id];
    const isHovered = hoveredNode === node.id;

    return (
      <div key={node.id} className="relative">
        <div
          className={`flex cursor-pointer items-center px-2 py-2 transition-all duration-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/50 ${
            selectedNode?.id === node.id
              ? "bg-indigo-50 dark:bg-indigo-900/20"
              : ""
          } ${isHovered ? "bg-gray-50 dark:bg-gray-800/70" : ""}`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => setSelectedNode(node)}
          onDoubleClick={() => {
            if (node.type === "folder") {
              toggleNodeExpansion(node.id);
            } else {
              setIsNodeDetailsOpen(true);
            }
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <button
            className={`mr-1 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 ${node.type !== "folder" ? "invisible" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeExpansion(node.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          <div className="mr-2">
            {node.type === "folder" ? (
              isExpanded ? (
                <FolderOpen className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              ) : (
                <Folder className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              )
            ) : (
              <File className={`h-5 w-5 ${getFileIconColor(node.name)}`} />
            )}
          </div>

          <div className="flex-1 truncate font-medium text-gray-700 dark:text-gray-200">
            {node.name}
          </div>

          {node.favorite && <Star className="ml-1 h-4 w-4 text-amber-400" />}

          {node.shared && (
            <Share className="ml-1 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          )}

          {node.type === "file" && (
            <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              {formatFileSize(node.size)}
            </div>
          )}

          <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
            {formatDate(node.modified)}
          </div>
        </div>

        {isExpanded && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((childNode) =>
              renderTreeNode(childNode, level + 1),
            )}
          </motion.div>
        )}
      </div>
    );
  };

  // Render list view
  const renderListView = (nodes: TreeNode[]) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50/80 dark:bg-gray-700/80">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                onClick={() => {
                  if (sortBy === "name") {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("name");
                    setSortDirection("asc");
                  }
                }}
              >
                <div className="flex cursor-pointer items-center">
                  Name
                  {sortBy === "name" && (
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                onClick={() => {
                  if (sortBy === "type") {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("type");
                    setSortDirection("asc");
                  }
                }}
              >
                <div className="flex cursor-pointer items-center">
                  Type
                  {sortBy === "type" && (
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                onClick={() => {
                  if (sortBy === "size") {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("size");
                    setSortDirection("asc");
                  }
                }}
              >
                <div className="flex cursor-pointer items-center">
                  Size
                  {sortBy === "size" && (
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                onClick={() => {
                  if (sortBy === "modified") {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("modified");
                    setSortDirection("asc");
                  }
                }}
              >
                <div className="flex cursor-pointer items-center">
                  Modified
                  {sortBy === "modified" && (
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Owner
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {nodes.map((node) => (
              <tr
                key={node.id}
                className={`cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  selectedNode?.id === node.id
                    ? "bg-indigo-50 dark:bg-indigo-900/20"
                    : ""
                }`}
                onClick={() => setSelectedNode(node)}
                onDoubleClick={() => {
                  if (node.type === "folder") {
                    navigateToFolder(node);
                  } else {
                    setIsNodeDetailsOpen(true);
                  }
                }}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {node.type === "folder" ? (
                        <Folder className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                      ) : (
                        <File
                          className={`h-5 w-5 ${getFileIconColor(node.name)}`}
                        />
                      )}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {node.name}
                    </div>
                    {node.favorite && (
                      <Star className="ml-2 h-4 w-4 text-amber-400" />
                    )}
                    {node.shared && (
                      <Share className="ml-2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {node.type === "file"
                    ? node.name.split(".").pop()?.toUpperCase() || "FILE"
                    : "Folder"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {node.type === "file" ? formatFileSize(node.size) : "--"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(node.modified)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {node.owner || "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render grid view
  const renderGridView = (nodes: TreeNode[]) => {
    return (
      <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.03 }}
            className={`flex cursor-pointer flex-col items-center rounded-xl border border-gray-200/60 p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md dark:border-gray-700/60 dark:hover:border-indigo-800/60 ${
              selectedNode?.id === node.id
                ? "border-indigo-300 bg-indigo-50/50 dark:border-indigo-700/60 dark:bg-indigo-900/20"
                : "bg-white dark:bg-gray-800"
            }`}
            onClick={() => setSelectedNode(node)}
            onDoubleClick={() => {
              if (node.type === "folder") {
                navigateToFolder(node);
              } else {
                setIsNodeDetailsOpen(true);
              }
            }}
          >
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm dark:from-gray-700 dark:to-gray-800">
              {node.type === "folder" ? (
                <Folder className="h-12 w-12 text-amber-500 dark:text-amber-400" />
              ) : (
                <File className={`h-12 w-12 ${getFileIconColor(node.name)}`} />
              )}
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="max-w-[120px] truncate font-medium text-gray-900 dark:text-white">
                  {node.name}
                </div>
                {node.favorite && (
                  <Star className="ml-1 h-4 w-4 text-amber-400" />
                )}
                {node.shared && (
                  <Share className="ml-1 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                )}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {node.type === "file" ? formatFileSize(node.size) : "Folder"}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatDate(node.modified)}
              </div>
              {node.tags && node.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {node.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {node.tags.length > 2 && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      +{node.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50 sm:flex-row">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
              Data Explorer
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Browse and manage your hierarchical data
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-3 sm:mt-0">
            <div className="flex rounded-full shadow-sm">
              <button
                onClick={() => setViewMode("tree")}
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  viewMode === "tree"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                } rounded-l-full border border-gray-200 dark:border-gray-700`}
              >
                <FolderTree className="mr-1.5 h-4 w-4" />
                Tree
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                } border-y border-gray-200 dark:border-gray-700`}
              >
                <List className="mr-1.5 h-4 w-4" />
                List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                } rounded-r-full border border-gray-200 dark:border-gray-700`}
              >
                <LayoutGrid className="mr-1.5 h-4 w-4" />
                Grid
              </button>
            </div>

            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-100 p-2.5 text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/50 p-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
              placeholder="Search files and folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Settings
            </button>
            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        {(viewMode !== "tree" || searchTerm) && (
          <div className="flex items-center overflow-x-auto border-b border-gray-100 bg-white p-4 dark:border-gray-700/50 dark:bg-gray-800">
            <button
              onClick={() => navigateToBreadcrumb(-1)}
              className="mr-2 rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <Home className="h-5 w-5" />
            </button>
            <div className="flex items-center overflow-x-auto">
              <button
                onClick={() => navigateToBreadcrumb(-1)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Root
              </button>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  <ChevronRight className="mx-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <button
                    onClick={() => navigateToBreadcrumb(index)}
                    className={`text-sm font-medium ${
                      index === breadcrumbs.length - 1
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    }`}
                  >
                    {crumb.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="min-h-[500px]">
          {viewMode === "tree" && !searchTerm && (
            <div className="p-4">
              {getCurrentViewNodes().map((node) => renderTreeNode(node))}
            </div>
          )}

          {viewMode === "list" && renderListView(getCurrentViewNodes())}

          {viewMode === "grid" && renderGridView(getCurrentViewNodes())}

          {searchTerm && getCurrentViewNodes().length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center">
              <Search className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                No results found
              </p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search term
              </p>
            </div>
          )}
        </div>

        {/* Node Details Modal */}
        <AnimatePresence>
          {isNodeDetailsOpen && selectedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedNode.type === "folder" ? "Folder" : "File"} Details
                  </h3>
                  <button
                    onClick={() => setIsNodeDetailsOpen(false)}
                    className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm dark:from-gray-700 dark:to-gray-800">
                      {selectedNode.type === "folder" ? (
                        <Folder className="h-10 w-10 text-amber-500 dark:text-amber-400" />
                      ) : (
                        <File
                          className={`h-10 w-10 ${getFileIconColor(selectedNode.name)}`}
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {selectedNode.name}
                        </h2>
                        {selectedNode.favorite && (
                          <Star className="ml-2 h-5 w-5 text-amber-400" />
                        )}
                        {selectedNode.shared && (
                          <Share className="ml-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedNode.type === "file"
                          ? `${formatFileSize(selectedNode.size)} • Last modified ${formatDate(selectedNode.modified)}`
                          : `Folder • Last modified ${formatDate(selectedNode.modified)}`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        General Information
                      </h4>
                      <div className="mt-2 space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Type
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedNode.type === "file"
                              ? selectedNode.name
                                  .split(".")
                                  .pop()
                                  ?.toUpperCase() || "File"
                              : "Folder"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Owner
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedNode.owner || "--"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Last Modified
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(selectedNode.modified)}
                          </span>
                        </div>
                        {selectedNode.type === "file" && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Size
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatFileSize(selectedNode.size)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        Permissions
                      </h4>
                      <div className="mt-2 space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        {selectedNode.permissions?.map((permission) => (
                          <div key={permission} className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                            <span className="text-sm capitalize text-gray-900 dark:text-white">
                              {permission}
                            </span>
                          </div>
                        ))}
                        {(!selectedNode.permissions ||
                          selectedNode.permissions.length === 0) && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            No permissions specified
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedNode.type === "file" && selectedNode.metadata && (
                      <div className="sm:col-span-2">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          Metadata
                        </h4>
                        <div className="mt-2 space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                          {Object.entries(selectedNode.metadata).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-sm capitalize text-gray-500 dark:text-gray-400">
                                  {key}
                                </span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {value}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {selectedNode.tags && selectedNode.tags.length > 0 && (
                      <div className="sm:col-span-2">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          Tags
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedNode.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                            >
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <div className="flex space-x-2">
                      {selectedNode.shared && (
                        <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                          <Share className="mr-2 h-4 w-4" />
                          Shared
                        </button>
                      )}
                      {selectedNode.favorite && (
                        <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                          <Star className="mr-2 h-4 w-4 text-amber-400" />
                          Favorite
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setIsNodeDetailsOpen(false)}
                      className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: rgba(107, 114, 128, 0.5);
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default HierarchicalDataExplorer;
