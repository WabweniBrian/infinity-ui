"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
    badge?: "subscriber" | "contributor" | "moderator";
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isHighlighted?: boolean;
  isAuthorResponse?: boolean;
};

const demoComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Elena Martinez",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      badge: "subscriber",
    },
    content:
      "This article brilliantly articulates what I've been trying to explain to my colleagues for months. The point about ethical considerations in AI development is particularly important as we move forward in this field.",
    timestamp: "2 hours ago",
    likes: 47,
    replies: 5,
    isHighlighted: true,
  },
  {
    id: "2",
    user: {
      name: "James Wilson",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    content:
      "I appreciate the balanced perspective here, but I think there's an important aspect missing: the role of government regulation in ensuring these technologies develop responsibly.",
    timestamp: "5 hours ago",
    likes: 23,
    replies: 8,
  },
  {
    id: "3",
    user: {
      name: "Dr. Sarah Chen",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      badge: "contributor",
    },
    content:
      "As someone working in this field, I can confirm many of the points raised. However, I'd add that the pace of development is even faster than described here, which makes addressing these challenges all the more urgent.",
    timestamp: "8 hours ago",
    likes: 89,
    replies: 12,
    isHighlighted: true,
  },
  {
    id: "4",
    user: {
      name: "Michael Johnson",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      badge: "moderator",
    },
    content:
      "The discussion here has been excellent. I'd like to remind everyone to keep the conversation focused on the technology and policy aspects rather than personal opinions about specific companies.",
    timestamp: "10 hours ago",
    likes: 34,
    replies: 2,
  },
  {
    id: "5",
    user: {
      name: "Alexandra Rivera",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    content:
      "I found the historical context particularly valuable. Too often we discuss these technologies as if they emerged from nowhere, without understanding the decades of research that led to this point.",
    timestamp: "12 hours ago",
    likes: 41,
    replies: 3,
  },
  {
    id: "6",
    user: {
      name: "Jonathan Harrington",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    content:
      "Thank you all for the thoughtful comments. I especially appreciate Dr. Chen's insights from within the field. To address James's point about regulation, I'm actually working on a follow-up piece that explores this aspect in depth.",
    timestamp: "1 hour ago",
    likes: 56,
    replies: 0,
    isAuthorResponse: true,
  },
];

const ReaderDiscussionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState<"highlighted" | "all" | "newest">(
    "highlighted",
  );

  const filteredComments =
    activeTab === "highlighted"
      ? demoComments.filter(
          (comment) => comment.isHighlighted || comment.isAuthorResponse,
        )
      : activeTab === "newest"
        ? [...demoComments].sort((a, b) => {
            const timeA = Number.parseInt(a.timestamp.split(" ")[0]);
            const timeB = Number.parseInt(b.timestamp.split(" ")[0]);
            return timeA - timeB;
          })
        : demoComments;

  const getBadgeLabel = (
    badge?: "subscriber" | "contributor" | "moderator",
  ) => {
    switch (badge) {
      case "subscriber":
        return "Subscriber";
      case "contributor":
        return "Contributor";
      case "moderator":
        return "Moderator";
      default:
        return null;
    }
  };

  const getBadgeColor = (
    badge?: "subscriber" | "contributor" | "moderator",
  ) => {
    switch (badge) {
      case "subscriber":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "contributor":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "moderator":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "";
    }
  };

  return (
    <section ref={ref} className="bg-white px-4 py-24 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 dark:border-gray-700 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  Reader Discussion
                </h2>
              </div>
              <p className="max-w-2xl text-slate-600 dark:text-slate-400">
                Join the conversation with our community of readers and the
                author.
              </p>
            </div>

            <div className="flex">
              <button
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "highlighted"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("highlighted")}
              >
                Highlighted
              </button>
              <button
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "all"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Comments
              </button>
              <button
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "newest"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("newest")}
              >
                Newest First
              </button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              className={`rounded-xl p-6 ${
                comment.isHighlighted
                  ? "border border-blue-100 bg-blue-50 dark:border-blue-900/20 dark:bg-blue-900/10"
                  : comment.isAuthorResponse
                    ? "border border-amber-100 bg-amber-50 dark:border-amber-900/20 dark:bg-amber-900/10"
                    : "border border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={
                        comment.user.avatar ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={comment.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {comment.user.name}
                    </h4>

                    {comment.isAuthorResponse && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        Author
                      </span>
                    )}

                    {comment.user.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${getBadgeColor(comment.user.badge)}`}
                      >
                        {getBadgeLabel(comment.user.badge)}
                      </span>
                    )}

                    {comment.isHighlighted && !comment.isAuthorResponse && (
                      <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                        </svg>
                        Highlighted
                      </span>
                    )}

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {comment.timestamp}
                    </span>
                  </div>

                  <p className="mb-4 text-slate-700 dark:text-slate-300">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 10v12"></path>
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                      </svg>
                      {comment.likes}
                    </button>

                    <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {comment.replies > 0
                        ? `${comment.replies} replies`
                        : "Reply"}
                    </button>

                    <button className="ml-auto flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="mb-4 text-lg font-medium text-slate-900 dark:text-white">
            Join the conversation
          </h3>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            </div>
            <div className="flex-1">
              <textarea
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:ring-blue-400"
                placeholder="Add your thoughts..."
                rows={3}
              ></textarea>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Please keep comments respectful and constructive.
                </div>
                <motion.button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Post Comment
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReaderDiscussionSection;
