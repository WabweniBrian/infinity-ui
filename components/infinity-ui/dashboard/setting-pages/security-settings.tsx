"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  LogOut,
  AlertTriangle,
  Check,
  X,
  Clock,
  RefreshCw,
  Globe,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type LoginSession = {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: Date;
  browser: string;
  os: string;
};

type SecurityActivity = {
  id: string;
  type:
    | "login"
    | "password_change"
    | "security_update"
    | "device_authorized"
    | "failed_login";
  timestamp: Date;
  details: string;
  location?: string;
  ip?: string;
  device?: string;
};

const SecuritySettings = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data
  const loginSessions: LoginSession[] = [
    {
      id: "1",
      device: "MacBook Pro",
      location: "San Francisco, CA",
      ip: "192.168.1.1",
      lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      browser: "Chrome",
      os: "macOS",
    },
    {
      id: "2",
      device: "iPhone 13",
      location: "San Francisco, CA",
      ip: "192.168.1.2",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      browser: "Safari",
      os: "iOS",
    },
    {
      id: "3",
      device: "Windows PC",
      location: "New York, NY",
      ip: "192.168.1.3",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      browser: "Firefox",
      os: "Windows",
    },
  ];

  const securityActivity: SecurityActivity[] = [
    {
      id: "1",
      type: "login",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      details: "Successful login",
      location: "San Francisco, CA",
      ip: "192.168.1.1",
      device: "MacBook Pro",
    },
    {
      id: "2",
      type: "password_change",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      details: "Password changed",
    },
    {
      id: "3",
      type: "failed_login",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
      details: "Failed login attempt",
      location: "Unknown",
      ip: "203.0.113.1",
    },
    {
      id: "4",
      type: "security_update",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      details: "Two-factor authentication enabled",
    },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);

    // Simple password strength calculation
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  const handleEnableTwoFactor = () => {
    setShowQRCode(true);
  };

  const handleVerifyTwoFactor = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setTwoFactorEnabled(true);
      setShowQRCode(false);
      setVerificationCode("");
    }, 1500);
  };

  const handleTerminateSession = (sessionId: string) => {
    // In a real app, this would call an API to terminate the session
    alert(`Session ${sessionId} terminated`);
  };

  const formatTimeAgo = (date: Date) => {
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

  const getActivityIcon = (type: SecurityActivity["type"]) => {
    switch (type) {
      case "login":
        return <LogOut className="h-4 w-4 text-green-500" />;
      case "password_change":
        return <Key className="h-4 w-4 text-blue-500" />;
      case "security_update":
        return <Shield className="h-4 w-4 text-purple-500" />;
      case "device_authorized":
        return <Smartphone className="h-4 w-4 text-indigo-500" />;
      case "failed_login":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Security Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your account security and authentication
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start gap-2 bg-transparent px-4 pb-0 pt-4">
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger
            value="two-factor"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Smartphone className="mr-2 h-4 w-4" />
            Two-Factor
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Globe className="mr-2 h-4 w-4" />
            Sessions
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
          >
            <Clock className="mr-2 h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="mt-0 space-y-6 p-4 sm:p-6">
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="current-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="new-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {newPassword && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Password strength:
                    </span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className={`h-full ${
                          passwordStrength === 0
                            ? "bg-red-500"
                            : passwordStrength === 1
                              ? "bg-orange-500"
                              : passwordStrength === 2
                                ? "bg-yellow-500"
                                : passwordStrength === 3
                                  ? "bg-green-500"
                                  : "bg-green-600"
                        }`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">
                      {passwordStrength === 0
                        ? "Weak"
                        : passwordStrength === 1
                          ? "Fair"
                          : passwordStrength === 2
                            ? "Good"
                            : passwordStrength === 3
                              ? "Strong"
                              : "Very Strong"}
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <li className="flex items-center gap-1">
                      {newPassword.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-1">
                      {/[A-Z]/.test(newPassword) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center gap-1">
                      {/[0-9]/.test(newPassword) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      At least one number
                    </li>
                    <li className="flex items-center gap-1">
                      {/[^A-Za-z0-9]/.test(newPassword) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
            </div>

            <Button
              onClick={handleUpdatePassword}
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword ||
                isLoading
              }
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="two-factor" className="mt-0 space-y-6 p-4 sm:p-6">
          <div className="max-w-md">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                disabled={isLoading}
              />
            </div>

            {twoFactorEnabled ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/20">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-400">
                      Two-factor authentication is enabled
                    </h4>
                    <p className="mt-1 text-xs text-green-700 dark:text-green-500">
                      Your account is now more secure. You&apos;ll need to enter
                      a verification code when signing in.
                    </p>
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTwoFactorEnabled(false)}
                        className="h-8 text-xs"
                      >
                        Disable Two-Factor
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : showQRCode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Scan QR Code
                </h4>
                <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                  Scan this QR code with your authenticator app (Google
                  Authenticator, Authy, etc.)
                </p>

                <div className="mb-4 flex justify-center">
                  <div className="h-48 w-48 rounded-lg bg-white p-2">
                    <Image
                      src="/placeholder.svg?height=180&width=180"
                      alt="QR Code"
                      height={192}
                      width={192}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="verification-code"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Verification Code
                    </label>
                    <Input
                      id="verification-code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleVerifyTwoFactor}
                      disabled={verificationCode.length !== 6 || isLoading}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Enable"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowQRCode(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Why use two-factor authentication?
                </h4>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span>Adds an extra layer of security to your account</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span>
                      Protects against unauthorized access even if your password
                      is compromised
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span>
                      Verifies your identity with a time-based code from your
                      mobile device
                    </span>
                  </li>
                </ul>
                <Button onClick={handleEnableTwoFactor}>
                  Enable Two-Factor Authentication
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="mt-0 space-y-6 p-4 sm:p-6">
          <div>
            <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              Active Sessions
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              These are the devices that are currently logged into your account
            </p>

            <div className="space-y-4">
              {loginSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {session.device.includes("iPhone") ||
                        session.device.includes("Android") ? (
                          <Smartphone className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Globe className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {session.device}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {session.browser} on {session.os}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {session.ip}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {session.location}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Last active: {formatTimeAgo(session.lastActive)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTerminateSession(session.id)}
                      className="h-8 text-xs"
                    >
                      {session.lastActive >
                      new Date(Date.now() - 1000 * 60 * 15)
                        ? "Current Session"
                        : "Terminate"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Session Settings
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Session Timeout
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Automatically log out after a period of inactivity
                  </p>
                </div>
                <Select
                  value={sessionTimeout}
                  onValueChange={setSessionTimeout}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Login Notifications
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive email notifications for new login attempts
                  </p>
                </div>
                <Switch
                  checked={loginNotifications}
                  onCheckedChange={setLoginNotifications}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-0 p-4 sm:p-6">
          <div>
            <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              Security Activity
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Recent security-related activity on your account
            </p>

            <div className="space-y-4">
              {securityActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.details}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                      {activity.location && activity.ip && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.ip}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.location}
                          </span>
                        </div>
                      )}
                      {activity.device && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Device: {activity.device}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Activity
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettings;
