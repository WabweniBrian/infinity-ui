"use client";

import { useState } from "react";
import {
  Code,
  Key,
  Plus,
  Copy,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
  Lock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed: Date | null;
  permissions: string[];
  status: "active" | "expired" | "revoked";
};

type Webhook = {
  id: string;
  url: string;
  events: string[];
  createdAt: Date;
  lastTriggered: Date | null;
  status: "active" | "inactive" | "failed";
};

const APIDeveloperSettings = () => {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([
    "read",
  ]);

  const [newKeyExpiration, setNewKeyExpiration] = useState("30");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewWebhookDialog, setShowNewWebhookDialog] = useState(false);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>([
    "user.created",
  ]);
  const [webhookTestResult, setWebhookTestResult] = useState<
    "success" | "error" | null
  >(null);

  // Sample data
  const apiKeys: ApiKey[] = [
    {
      id: "1",
      name: "Production API Key",
      key: "sk_prod_2Xd8jGlP0auVkPXm4TvF",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      lastUsed: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      permissions: ["read", "write", "delete"],
      status: "active",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "sk_dev_7Yt5kLpQ9zRvSbNm2WxE",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 60 days ago
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      permissions: ["read", "write"],
      status: "active",
    },
    {
      id: "3",
      name: "Testing API Key",
      key: "sk_test_3Zx9mNpR1aUvWbKl5YtG",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), // 90 days ago
      lastUsed: null,
      permissions: ["read"],
      status: "expired",
    },
  ];

  const webhooks: Webhook[] = [
    {
      id: "1",
      url: "https://example.com/webhooks/user-events",
      events: ["user.created", "user.updated", "user.deleted"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
      lastTriggered: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "active",
    },
    {
      id: "2",
      url: "https://example.com/webhooks/payment-events",
      events: ["payment.succeeded", "payment.failed"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45), // 45 days ago
      lastTriggered: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      status: "active",
    },
    {
      id: "3",
      url: "https://example.com/webhooks/order-events",
      events: ["order.created", "order.updated", "order.fulfilled"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      lastTriggered: null,
      status: "inactive",
    },
  ];

  const handleGenerateApiKey = () => {
    if (!newKeyName) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setGeneratedKey(
        "sk_" +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      );
    }, 1500);
  };

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    alert("API key copied to clipboard");
  };

  const handleRevokeApiKey = (keyId: string) => {
    // In a real app, this would call an API to revoke the key
    alert(`API key ${keyId} revoked`);
  };

  const handleCreateWebhook = () => {
    if (!newWebhookUrl) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowNewWebhookDialog(false);
      setNewWebhookUrl("");
      setNewWebhookEvents(["user.created"]);
      alert("Webhook created successfully");
    }, 1500);
  };

  const handleTestWebhook = () => {
    if (!newWebhookUrl) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Randomly succeed or fail for demo purposes
      setWebhookTestResult(Math.random() > 0.3 ? "success" : "error");
    }, 2000);
  };

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return "Never";

    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            API & Developer Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your API keys, webhooks, and developer access
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start gap-2 bg-transparent px-4 pb-0 pt-4">
          <TabsTrigger
            value="api-keys"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger
            value="webhooks"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Code className="mr-2 h-4 w-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="mt-0 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Your API Keys
            </h3>
            <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  New API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    API keys allow external services to authenticate with our
                    API. Keep your keys secure.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="key-name"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Key Name
                    </label>
                    <Input
                      id="key-name"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. Production API Key"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="perm-read"
                          checked={newKeyPermissions.includes("read")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewKeyPermissions([
                                ...newKeyPermissions,
                                "read",
                              ]);
                            } else {
                              setNewKeyPermissions(
                                newKeyPermissions.filter((p) => p !== "read"),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="perm-read"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Read (View data)
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="perm-write"
                          checked={newKeyPermissions.includes("write")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewKeyPermissions([
                                ...newKeyPermissions,
                                "write",
                              ]);
                            } else {
                              setNewKeyPermissions(
                                newKeyPermissions.filter((p) => p !== "write"),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="perm-write"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Write (Create and update data)
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="perm-delete"
                          checked={newKeyPermissions.includes("delete")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewKeyPermissions([
                                ...newKeyPermissions,
                                "delete",
                              ]);
                            } else {
                              setNewKeyPermissions(
                                newKeyPermissions.filter((p) => p !== "delete"),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="perm-delete"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Delete (Remove data)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="key-expiration"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Expiration
                    </label>
                    <Select
                      value={newKeyExpiration}
                      onValueChange={setNewKeyExpiration}
                    >
                      <SelectTrigger id="key-expiration">
                        <SelectValue placeholder="Select expiration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="0">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {generatedKey && (
                    <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Your API Key
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyApiKey(generatedKey)}
                          className="h-6 px-2"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="break-all font-mono text-sm">
                        {generatedKey}
                      </p>
                      <div className="mt-2">
                        <AlertTriangle className="mr-1 inline-block h-4 w-4 text-amber-500" />
                        <span className="text-xs text-amber-600 dark:text-amber-400">
                          This key will only be displayed once. Save it
                          somewhere secure.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewKeyDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleGenerateApiKey}
                    disabled={
                      !newKeyName || newKeyPermissions.length === 0 || isLoading
                    }
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : generatedKey ? (
                      "Done"
                    ) : (
                      "Generate Key"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {apiKey.name}
                      </h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          apiKey.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : apiKey.status === "expired"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {apiKey.status.charAt(0).toUpperCase() +
                          apiKey.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="mr-1 text-xs text-gray-500 dark:text-gray-400">
                          Created:
                        </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {formatTimeAgo(apiKey.createdAt)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-600">
                        •
                      </span>
                      <div className="flex items-center">
                        <span className="mr-1 text-xs text-gray-500 dark:text-gray-400">
                          Last used:
                        </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {formatTimeAgo(apiKey.lastUsed)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Permissions:
                        </span>
                        {apiKey.permissions.map((permission) => (
                          <span
                            key={permission}
                            className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="relative max-w-md flex-1">
                        <Input
                          value={
                            apiKey.key.substring(0, 10) + "•••••••••••••••••••"
                          }
                          readOnly
                          className="bg-gray-50 pr-10 font-mono text-xs dark:bg-gray-900"
                        />
                        <button
                          onClick={() => handleCopyApiKey(apiKey.key)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeApiKey(apiKey.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              API Documentation
            </h3>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                Learn how to integrate with our API and make the most of your
                API keys.
              </p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Getting Started Guide
                </a>
                <a
                  href="#"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  API Reference
                </a>
                <a
                  href="#"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Code Examples
                </a>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-0 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Your Webhooks
            </h3>
            <Dialog
              open={showNewWebhookDialog}
              onOpenChange={setShowNewWebhookDialog}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  New Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Webhook</DialogTitle>
                  <DialogDescription>
                    Webhooks allow your application to receive real-time updates
                    when events occur in our system.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="webhook-url"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Endpoint URL
                    </label>
                    <Input
                      id="webhook-url"
                      value={newWebhookUrl}
                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                      placeholder="https://example.com/webhooks/endpoint"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Events to Subscribe
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="event-user-created"
                          checked={newWebhookEvents.includes("user.created")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhookEvents([
                                ...newWebhookEvents,
                                "user.created",
                              ]);
                            } else {
                              setNewWebhookEvents(
                                newWebhookEvents.filter(
                                  (e) => e !== "user.created",
                                ),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="event-user-created"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          user.created
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="event-user-updated"
                          checked={newWebhookEvents.includes("user.updated")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhookEvents([
                                ...newWebhookEvents,
                                "user.updated",
                              ]);
                            } else {
                              setNewWebhookEvents(
                                newWebhookEvents.filter(
                                  (e) => e !== "user.updated",
                                ),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="event-user-updated"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          user.updated
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="event-payment-succeeded"
                          checked={newWebhookEvents.includes(
                            "payment.succeeded",
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhookEvents([
                                ...newWebhookEvents,
                                "payment.succeeded",
                              ]);
                            } else {
                              setNewWebhookEvents(
                                newWebhookEvents.filter(
                                  (e) => e !== "payment.succeeded",
                                ),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="event-payment-succeeded"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          payment.succeeded
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="event-payment-failed"
                          checked={newWebhookEvents.includes("payment.failed")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhookEvents([
                                ...newWebhookEvents,
                                "payment.failed",
                              ]);
                            } else {
                              setNewWebhookEvents(
                                newWebhookEvents.filter(
                                  (e) => e !== "payment.failed",
                                ),
                              );
                            }
                          }}
                          className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="event-payment-failed"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          payment.failed
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleTestWebhook}
                      disabled={!newWebhookUrl || isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        "Test Webhook"
                      )}
                    </Button>

                    {webhookTestResult && (
                      <div
                        className={`mt-2 rounded p-2 text-sm ${
                          webhookTestResult === "success"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {webhookTestResult === "success" ? (
                          <div className="flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            <span>
                              Test successful! Your endpoint responded
                              correctly.
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <X className="h-4 w-4" />
                            <span>
                              Test failed. Your endpoint did not respond
                              correctly.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewWebhookDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateWebhook}
                    disabled={
                      !newWebhookUrl ||
                      newWebhookEvents.length === 0 ||
                      isLoading
                    }
                  >
                    Create Webhook
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="max-w-md truncate text-sm font-medium text-gray-900 dark:text-white">
                        {webhook.url}
                      </h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          webhook.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : webhook.status === "inactive"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {webhook.status.charAt(0).toUpperCase() +
                          webhook.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="mr-1 text-xs text-gray-500 dark:text-gray-400">
                          Created:
                        </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {formatTimeAgo(webhook.createdAt)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-600">
                        •
                      </span>
                      <div className="flex items-center">
                        <span className="mr-1 text-xs text-gray-500 dark:text-gray-400">
                          Last triggered:
                        </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {formatTimeAgo(webhook.lastTriggered)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Events:
                        </span>
                        {webhook.events.map((event) => (
                          <span
                            key={event}
                            className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-2">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Webhook Security
            </h3>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Webhook Signatures
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    We sign all webhook requests with a signature that you can
                    verify to ensure the request came from us.
                  </p>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      View Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIDeveloperSettings;
