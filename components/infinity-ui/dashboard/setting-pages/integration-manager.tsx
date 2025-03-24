"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Link,
  Github,
  Slack,
  ChromeIcon as Google,
  Twitter,
  Figma,
  Database,
  Cloud,
  Lock,
  RefreshCw,
  Plus,
  X,
  Check,
  AlertTriangle,
  ExternalLink,
  Search,
  Settings,
  Save,
  Filter,
  Clock,
  User,
  Key,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IntegrationType = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category:
    | "productivity"
    | "development"
    | "communication"
    | "analytics"
    | "storage";
  connected: boolean;
  status: "active" | "inactive" | "error";
  lastSync?: string;
  permissions: string[];
};

type DataSourceType = {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "custom";
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  credentials: {
    host?: string;
    username?: string;
    apiKey?: boolean;
    oauth?: boolean;
  };
};

const IntegrationsManager = () => {
  const [activeTab, setActiveTab] = useState("integrations");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(
    null,
  );

  const [integrations, setIntegrations] = useState<IntegrationType[]>([
    {
      id: "github",
      name: "GitHub",
      description:
        "Connect your GitHub repositories to track issues and pull requests.",
      icon: <Github className="h-8 w-8 text-gray-800" />,
      category: "development",
      connected: true,
      status: "active",
      lastSync: "10 minutes ago",
      permissions: ["Read repositories", "Read issues", "Read pull requests"],
    },
    {
      id: "slack",
      name: "Slack",
      description:
        "Receive notifications and updates directly in your Slack workspace.",
      icon: <Slack className="h-8 w-8 text-purple-500" />,
      category: "communication",
      connected: true,
      status: "active",
      lastSync: "5 minutes ago",
      permissions: ["Post messages", "Create channels", "Invite users"],
    },
    {
      id: "google",
      name: "Google Workspace",
      description:
        "Sync calendars, contacts, and documents with Google Workspace.",
      icon: <Google className="h-8 w-8 text-blue-500" />,
      category: "productivity",
      connected: true,
      status: "error",
      lastSync: "3 days ago",
      permissions: ["Read calendar", "Read contacts", "Read/Write documents"],
    },
    {
      id: "twitter",
      name: "Twitter",
      description: "Monitor mentions and engage with your audience on Twitter.",
      icon: <Twitter className="h-8 w-8 text-blue-400" />,
      category: "communication",
      connected: false,
      status: "inactive",
      permissions: ["Read tweets", "Post tweets", "Read direct messages"],
    },
    {
      id: "figma",
      name: "Figma",
      description: "Access design files and collaborate with your design team.",
      icon: <Figma className="h-8 w-8 text-purple-600" />,
      category: "productivity",
      connected: false,
      status: "inactive",
      permissions: ["Read files", "Read comments", "Read projects"],
    },
  ]);

  const [dataSources, setDataSources] = useState<DataSourceType[]>([
    {
      id: "postgres1",
      name: "Production Database",
      type: "database",
      status: "connected",
      lastSync: "15 minutes ago",
      credentials: {
        host: "db.example.com",
        username: "db_user",
        apiKey: false,
        oauth: false,
      },
    },
    {
      id: "api1",
      name: "Weather API",
      type: "api",
      status: "connected",
      lastSync: "1 hour ago",
      credentials: {
        apiKey: true,
        oauth: false,
      },
    },
    {
      id: "storage1",
      name: "Cloud Storage",
      type: "file",
      status: "error",
      lastSync: "2 days ago",
      credentials: {
        apiKey: false,
        oauth: true,
      },
    },
    {
      id: "custom1",
      name: "Custom Data Feed",
      type: "custom",
      status: "disconnected",
      credentials: {
        apiKey: true,
        oauth: false,
      },
    },
  ]);

  const handleIntegrationToggle = (id: string) => {
    setIntegrations(
      integrations.map((integration) => {
        if (integration.id === id) {
          const connected = !integration.connected;
          return {
            ...integration,
            connected,
            status: connected ? "active" : "inactive",
          };
        }
        return integration;
      }),
    );
  };

  const handleIntegrationSync = async (id: string) => {
    setLoading(true);

    // Update the specific integration to show syncing
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, status: "active" }
          : integration,
      ),
    );

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update last sync time
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              lastSync: "Just now",
            }
          : integration,
      ),
    );

    setLoading(false);
  };

  const handleDataSourceConnect = async (id: string) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update data source status
    setDataSources(
      dataSources.map((source) =>
        source.id === id
          ? {
              ...source,
              status: "connected",
              lastSync: "Just now",
            }
          : source,
      ),
    );

    setLoading(false);
  };

  const handleDataSourceDisconnect = (id: string) => {
    setDataSources(
      dataSources.map((source) =>
        source.id === id
          ? {
              ...source,
              status: "disconnected",
              lastSync: undefined,
            }
          : source,
      ),
    );
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const getFilteredIntegrations = () => {
    let filtered = [...integrations];

    if (filter !== "all") {
      filtered = filtered.filter((integration) =>
        filter === "connected"
          ? integration.connected
          : filter === "disconnected"
            ? !integration.connected
            : integration.category === filter,
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (integration) =>
          integration.name.toLowerCase().includes(query) ||
          integration.description.toLowerCase().includes(query),
      );
    }

    return filtered;
  };

  const getDataSourceIcon = (type: string) => {
    switch (type) {
      case "database":
        return <Database className="h-6 w-6 text-blue-500" />;
      case "api":
        return <Link className="h-6 w-6 text-green-500" />;
      case "file":
        return <Cloud className="h-6 w-6 text-purple-500" />;
      case "custom":
        return <Settings className="h-6 w-6 text-orange-500" />;
      default:
        return <Database className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "connected":
        return (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
            Connected
          </span>
        );
      case "inactive":
      case "disconnected":
        return (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
            Disconnected
          </span>
        );
      case "error":
        return (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
            Error
          </span>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-lg">
      <motion.div
        className="mb-8 flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Link className="h-7 w-7 text-blue-500" />
          Integrations & Data Sources
        </h1>

        <motion.button
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          onClick={handleSaveSettings}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid grid-cols-2">
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="datasources" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Data Sources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-4 md:flex-row"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border py-2 pl-10 pr-4 md:w-64"
                  />
                </div>

                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="connected">Connected</SelectItem>
                    <SelectItem value="disconnected">Disconnected</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.button
                className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="h-4 w-4" />
                <span>Add Integration</span>
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {getFilteredIntegrations().length > 0 ? (
                getFilteredIntegrations().map((integration) => (
                  <motion.div
                    key={integration.id}
                    className="overflow-hidden rounded-lg border"
                    whileHover={{ scale: 1.01 }}
                    layout
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-gray-100 p-2">
                          {integration.icon}
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div>
                              <h3 className="text-lg font-medium">
                                {integration.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {integration.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(integration.status)}

                              <div className="flex items-center gap-2">
                                {integration.connected && (
                                  <motion.button
                                    className="rounded-md p-1.5 text-blue-500 hover:bg-blue-50"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      handleIntegrationSync(integration.id)
                                    }
                                    disabled={loading}
                                  >
                                    <RefreshCw
                                      className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                                    />
                                  </motion.button>
                                )}

                                <motion.button
                                  className="rounded-md p-1.5 text-gray-500 hover:bg-gray-50"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    setExpandedIntegration(
                                      expandedIntegration === integration.id
                                        ? null
                                        : integration.id,
                                    )
                                  }
                                >
                                  <Settings className="h-5 w-5" />
                                </motion.button>

                                <Switch
                                  checked={integration.connected}
                                  onCheckedChange={() =>
                                    handleIntegrationToggle(integration.id)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          {integration.connected && integration.lastSync && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>Last synced: {integration.lastSync}</span>
                            </div>
                          )}

                          {integration.status === "error" && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-red-500">
                              <AlertTriangle className="h-3 w-3" />
                              <span>
                                Authentication error. Please reconnect.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {expandedIntegration === integration.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 border-t pt-4"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="mb-2 text-sm font-medium">
                                Permissions
                              </h4>
                              <ul className="space-y-1">
                                {integration.permissions.map(
                                  (permission, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      <Check className="h-4 w-4 text-green-500" />
                                      <span>{permission}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>

                            <div className="flex items-center justify-between">
                              <motion.button
                                className="flex items-center gap-1 text-sm text-blue-600"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Settings className="h-4 w-4" />
                                <span>Advanced Settings</span>
                              </motion.button>

                              <motion.button
                                className="flex items-center gap-1 text-sm text-red-600"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <X className="h-4 w-4" />
                                <span>Remove Integration</span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Link className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-500">
                    No integrations found
                  </h3>
                  <p className="text-gray-400">
                    {searchQuery || filter !== "all"
                      ? "Try changing your search or filter"
                      : "Add your first integration to get started"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="datasources">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <h2 className="text-xl font-semibold">Connected Data Sources</h2>
              <motion.button
                className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="h-4 w-4" />
                <span>Add Data Source</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {dataSources.map((source) => (
                <motion.div
                  key={source.id}
                  className="rounded-lg border p-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      {getDataSourceIcon(source.type)}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{source.name}</h3>
                          <p className="text-xs capitalize text-gray-500">
                            {source.type}
                          </p>
                        </div>
                        {getStatusBadge(source.status)}
                      </div>

                      {source.status === "connected" && source.lastSync && (
                        <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Last synced: {source.lastSync}</span>
                        </div>
                      )}

                      {source.status === "error" && (
                        <div className="mb-3 flex items-center gap-1 text-xs text-red-500">
                          <AlertTriangle className="h-3 w-3" />
                          <span>
                            Connection error. Please check credentials.
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 text-xs">
                        {source.credentials.host && (
                          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                            <Database className="h-3 w-3" />
                            <span>{source.credentials.host}</span>
                          </div>
                        )}

                        {source.credentials.username && (
                          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                            <User className="h-3 w-3" />
                            <span>{source.credentials.username}</span>
                          </div>
                        )}

                        {source.credentials.apiKey && (
                          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                            <Key className="h-3 w-3" />
                            <span>API Key</span>
                          </div>
                        )}

                        {source.credentials.oauth && (
                          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                            <Lock className="h-3 w-3" />
                            <span>OAuth</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between border-t pt-3">
                    {source.status === "connected" ? (
                      <>
                        <motion.button
                          className="flex items-center gap-1 text-sm text-blue-600"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>View Data</span>
                        </motion.button>

                        <div className="flex items-center gap-2">
                          <motion.button
                            className="rounded-md p-1.5 text-blue-500 hover:bg-blue-50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleIntegrationSync(source.id)}
                            disabled={loading}
                          >
                            <RefreshCw
                              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                            />
                          </motion.button>

                          <motion.button
                            className="flex items-center gap-1 text-sm text-red-600"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleDataSourceDisconnect(source.id)
                            }
                          >
                            <X className="h-4 w-4" />
                            <span>Disconnect</span>
                          </motion.button>
                        </div>
                      </>
                    ) : (
                      <motion.button
                        className="mx-auto flex items-center gap-1 text-sm text-green-600"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDataSourceConnect(source.id)}
                      >
                        <Link className="h-4 w-4" />
                        <span>Connect</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsManager;
