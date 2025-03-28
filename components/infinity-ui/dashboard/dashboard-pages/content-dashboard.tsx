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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Clock,
  Edit,
  Eye,
  Facebook,
  FileText,
  Filter,
  Globe,
  ImageIcon,
  Instagram,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Play,
  Plus,
  Share2,
  ThumbsUp,
  Trash2,
  TrendingUp,
  Twitter,
  Users,
  Video,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CustomProgressBar = ({ progress }: { progress: number }) => {
  const getProgressColor = () => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 25) return "bg-blue-500";
    return "bg-amber-500";
  };

  return (
    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
      <div
        className={`h-full ${getProgressColor()} rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default function ContentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [viewsCount, setViewsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  // Simulate counts animation on load
  useEffect(() => {
    const viewsInterval = setInterval(() => {
      setViewsCount((prev) => {
        if (prev < 128500) return prev + 1000;
        clearInterval(viewsInterval);
        return prev;
      });
    }, 20);

    const followersInterval = setInterval(() => {
      setFollowersCount((prev) => {
        if (prev < 24350) return prev + 250;
        clearInterval(followersInterval);
        return prev;
      });
    }, 30);

    return () => {
      clearInterval(viewsInterval);
      clearInterval(followersInterval);
    };
  }, []);

  // Sample data
  const contentItems = [
    {
      id: "content1",
      title: "10 Essential Tips for Better Photography",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      status: "Published",
      publishDate: "Jun 10, 2023",
      views: 12500,
      likes: 843,
      comments: 156,
      shares: 324,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=150&width=300",
      platforms: ["website", "instagram", "twitter"],
    },
    {
      id: "content2",
      title: "Behind the Scenes: Mountain Landscape Shoot",
      type: "video",
      icon: <Video className="h-5 w-5" />,
      status: "Published",
      publishDate: "Jun 5, 2023",
      views: 45200,
      likes: 2184,
      comments: 342,
      shares: 876,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=150&width=300",
      platforms: ["youtube", "instagram", "website"],
    },
    {
      id: "content3",
      title: "Editing Workflow for Portrait Photography",
      type: "video",
      icon: <Video className="h-5 w-5" />,
      status: "Scheduled",
      publishDate: "Jun 18, 2023",
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=150&width=300",
      platforms: ["youtube", "website"],
    },
    {
      id: "content4",
      title: "Photography Gear Guide 2023",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      status: "Draft",
      publishDate: "",
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=150&width=300",
      platforms: [],
    },
  ];

  const upcomingContent = [
    {
      id: "upcoming1",
      title: "Lightroom Presets Collection",
      type: "product",
      dueDate: "Jun 20, 2023",
      progress: 75,
      assignee: "You",
    },
    {
      id: "upcoming2",
      title: "Interview with Pro Photographer",
      type: "podcast",
      dueDate: "Jun 25, 2023",
      progress: 40,
      assignee: "Sarah",
    },
    {
      id: "upcoming3",
      title: "Night Photography Tutorial",
      type: "video",
      dueDate: "Jul 2, 2023",
      progress: 20,
      assignee: "You",
    },
  ];

  const platformStats = [
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      color: "text-red-600 dark:text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      followers: 15800,
      engagement: 8.2,
      change: "+12%",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      color: "text-pink-600 dark:text-pink-500",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      followers: 24350,
      engagement: 4.5,
      change: "+8%",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      followers: 8200,
      engagement: 2.1,
      change: "+5%",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      color: "text-blue-800 dark:text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      followers: 12400,
      engagement: 3.8,
      change: "+3%",
    },
  ];

  const contentCalendar = [
    {
      date: "Jun 15",
      items: [
        {
          title: "Weekly Photography Tips",
          type: "article",
          platform: "website",
        },
        {
          title: "Instagram Carousel: Summer Shots",
          type: "post",
          platform: "instagram",
        },
      ],
    },
    {
      date: "Jun 18",
      items: [
        {
          title: "Editing Workflow for Portrait Photography",
          type: "video",
          platform: "youtube",
        },
      ],
    },
    {
      date: "Jun 20",
      items: [
        {
          title: "Lightroom Presets Collection",
          type: "product",
          platform: "website",
        },
      ],
    },
    {
      date: "Jun 22",
      items: [
        {
          title: "Weekly Photography Tips",
          type: "article",
          platform: "website",
        },
      ],
    },
    {
      date: "Jun 25",
      items: [
        {
          title: "Interview with Pro Photographer",
          type: "podcast",
          platform: "website",
        },
        {
          title: "Behind the Scenes Photos",
          type: "post",
          platform: "instagram",
        },
      ],
    },
  ];

  const audienceInsights = [
    {
      category: "Age",
      data: [
        { label: "18-24", value: 22 },
        { label: "25-34", value: 38 },
        { label: "35-44", value: 25 },
        { label: "45-54", value: 10 },
        { label: "55+", value: 5 },
      ],
    },
    {
      category: "Gender",
      data: [
        { label: "Male", value: 65 },
        { label: "Female", value: 34 },
        { label: "Other", value: 1 },
      ],
    },
    {
      category: "Location",
      data: [
        { label: "United States", value: 45 },
        { label: "United Kingdom", value: 15 },
        { label: "Canada", value: 10 },
        { label: "Australia", value: 8 },
        { label: "Germany", value: 7 },
        { label: "Other", value: 15 },
      ],
    },
  ];

  const performanceMetrics = [
    {
      name: "Total Views",
      value: viewsCount,
      icon: <Eye className="h-5 w-5" />,
      change: "+18%",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    },
    {
      name: "Followers",
      value: followersCount,
      icon: <Users className="h-5 w-5" />,
      change: "+8%",
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    },
    {
      name: "Engagement Rate",
      value: "5.2%",
      icon: <ThumbsUp className="h-5 w-5" />,
      change: "+0.8%",
      color:
        "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    },
    {
      name: "Avg. Watch Time",
      value: "4:32",
      icon: <Clock className="h-5 w-5" />,
      change: "+0:45",
      color:
        "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Content Creator Studio
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your content, analyze performance, and grow your audience
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>
            </Tabs>
            <Avatar className="h-10 w-10 border-2 border-purple-500">
              <AvatarImage
                src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {metric.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className={cn("mr-4 rounded-full p-2", metric.color)}>
                      {metric.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {typeof metric.value === "number"
                          ? metric.value.toLocaleString()
                          : metric.value}
                      </div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        <span>{metric.change} this month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Content Creation Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-none bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="mb-2 text-xl font-semibold">
                    Ready to create new content?
                  </h3>
                  <p className="opacity-90">
                    Start a new project and publish across multiple platforms
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    <FileText className="mr-2 h-4 w-4" />
                    Article
                  </Button>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    <Video className="mr-2 h-4 w-4" />
                    Video
                  </Button>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Image
                  </Button>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    <Mic className="mr-2 h-4 w-4" />
                    Audio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="h-full border-none bg-white shadow-md dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Content</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search content..."
                      className="w-[200px]"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Manage and track your published and upcoming content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contentItems.map((content) => (
                    <motion.div
                      key={content.id}
                      className={cn(
                        "overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-700",
                        selectedContent === content.id
                          ? "ring-2 ring-purple-500"
                          : "",
                      )}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedContent(content.id)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-40 md:h-auto md:w-1/3">
                          <Image
                            src={
                              content.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={content.title}
                            fill
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute left-2 top-2">
                            <Badge
                              className={cn(
                                content.status === "Published"
                                  ? "bg-green-500"
                                  : content.status === "Scheduled"
                                    ? "bg-blue-500"
                                    : "bg-amber-500",
                              )}
                            >
                              {content.status}
                            </Badge>
                          </div>
                          {content.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="rounded-full bg-black/50 p-3">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4 md:w-2/3 md:p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="mb-2 flex items-center">
                                <div className="mr-2 rounded bg-purple-100 p-1 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                  {content.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {content.title}
                                </h3>
                              </div>
                              {content.publishDate && (
                                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                                  Published: {content.publishDate}
                                </p>
                              )}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {content.status === "Published" && (
                            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                              <div>
                                <div className="mb-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  <Eye className="mr-1 h-4 w-4" />
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {content.views.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Views
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  <ThumbsUp className="mr-1 h-4 w-4" />
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {content.likes.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Likes
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  <MessageSquare className="mr-1 h-4 w-4" />
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {content.comments.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Comments
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  <Share2 className="mr-1 h-4 w-4" />
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {content.shares.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Shares
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mt-4 flex flex-wrap gap-2">
                            {content.platforms.map((platform) => (
                              <Badge
                                key={platform}
                                variant="outline"
                                className="font-normal"
                              >
                                {platform === "youtube" && (
                                  <Youtube className="mr-1 h-3 w-3 text-red-600 dark:text-red-500" />
                                )}
                                {platform === "instagram" && (
                                  <Instagram className="mr-1 h-3 w-3 text-pink-600 dark:text-pink-500" />
                                )}
                                {platform === "twitter" && (
                                  <Twitter className="mr-1 h-3 w-3 text-blue-600 dark:text-blue-500" />
                                )}
                                {platform === "facebook" && (
                                  <Facebook className="mr-1 h-3 w-3 text-blue-800 dark:text-blue-600" />
                                )}
                                {platform === "website" && (
                                  <Globe className="mr-1 h-3 w-3 text-gray-600 dark:text-gray-400" />
                                )}
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  className="text-purple-600 dark:text-purple-400"
                >
                  View All Content
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Platform Stats and Upcoming Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Platform Stats */}
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>
                    Followers and engagement across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformStats.map((platform) => (
                      <div
                        key={platform.name}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "mr-3 rounded-lg p-2",
                                platform.bgColor,
                              )}
                            >
                              <div className={platform.color}>
                                {platform.icon}
                              </div>
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {platform.name}
                            </h3>
                          </div>
                          <Badge variant="outline" className="font-normal">
                            {platform.change}
                          </Badge>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Followers
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {platform.followers.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Engagement
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {platform.engagement}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Content */}
              <Card className="border-none bg-white shadow-md dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Upcoming Content</CardTitle>
                  <CardDescription>
                    Content in progress and deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingContent.map((content) => (
                      <div
                        key={content.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {content.title}
                            </h3>
                            <div className="mt-1 flex items-center">
                              <Badge
                                variant="outline"
                                className="mr-2 font-normal"
                              >
                                {content.type}
                              </Badge>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Due: {content.dueDate}
                              </span>
                            </div>
                          </div>
                          <Badge
                            className={cn(
                              content.progress >= 75
                                ? "bg-green-500"
                                : content.progress >= 25
                                  ? "bg-blue-500"
                                  : "bg-amber-500",
                            )}
                          >
                            {content.progress}%
                          </Badge>
                        </div>
                        <div className="mb-3">
                          <CustomProgressBar progress={content.progress} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Assigned to:{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {content.assignee}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600 dark:text-purple-400"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Content Calendar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Content Calendar</CardTitle>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Content
                </Button>
              </div>
              <CardDescription>
                Your upcoming content publishing schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {contentCalendar.map((day) => (
                  <div key={day.date} className="flex">
                    <div className="w-24 flex-shrink-0 pt-2">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {day.date}
                      </div>
                    </div>
                    <div className="flex-grow space-y-3 border-l border-gray-200 pl-4 dark:border-gray-700">
                      {day.items.map((item, index) => (
                        <div
                          key={`${day.date}-${index}`}
                          className="rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-sm dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </h4>
                              <div className="mt-1 flex items-center">
                                <Badge
                                  variant="outline"
                                  className="mr-2 font-normal"
                                >
                                  {item.type}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  {item.platform === "youtube" && (
                                    <Youtube className="mr-1 h-3 w-3 text-red-600 dark:text-red-500" />
                                  )}
                                  {item.platform === "instagram" && (
                                    <Instagram className="mr-1 h-3 w-3 text-pink-600 dark:text-pink-500" />
                                  )}
                                  {item.platform === "twitter" && (
                                    <Twitter className="mr-1 h-3 w-3 text-blue-600 dark:text-blue-500" />
                                  )}
                                  {item.platform === "facebook" && (
                                    <Facebook className="mr-1 h-3 w-3 text-blue-800 dark:text-blue-600" />
                                  )}
                                  {item.platform === "website" && (
                                    <Globe className="mr-1 h-3 w-3 text-gray-600 dark:text-gray-400" />
                                  )}
                                  {item.platform}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audience Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-none bg-white shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>
                Understand your audience demographics and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {audienceInsights.map((insight) => (
                  <div key={insight.category}>
                    <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                      {insight.category}
                    </h3>
                    <div className="space-y-3">
                      {insight.data.map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {item.label}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.value}%
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-purple-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
