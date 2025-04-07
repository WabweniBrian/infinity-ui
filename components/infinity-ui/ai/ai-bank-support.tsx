"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Globe,
  Home,
  Info,
  Link2,
  Lock,
  LogOut,
  LucideIcon,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sun,
  ThumbsUp,
  Ticket,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Types
interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  accountNumber: string;
  accountType: string;
  lastActive: string;
  status: "online" | "offline";
  verified: boolean;
}

interface Message {
  id: string;
  sender: "customer" | "agent" | "ai";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  isInternal?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface Conversation {
  id: string;
  customer: Customer;
  subject: string;
  status: "active" | "resolved" | "pending";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  category: string;
  tags: string[];
}

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  lastUpdated: Date;
}

interface SupportTicket {
  id: string;
  customer: Customer;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
}

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "agent" | "admin" | "supervisor";
  department: string;
  status: "available" | "busy" | "offline";
  performance: {
    responseTime: number; // in minutes
    resolutionTime: number; // in hours
    satisfaction: number; // percentage
    ticketsResolved: number;
  };
}

interface DashboardMetrics {
  totalConversations: number;
  activeConversations: number;
  avgResponseTime: number; // in minutes
  avgResolutionTime: number; // in hours
  customerSatisfaction: number; // percentage
  ticketsCreated: number;
  ticketsResolved: number;
  knowledgeBaseViews: number;
}

interface TimeSeriesData {
  date: string;
  conversations: number;
  tickets: number;
  satisfaction: number;
}

interface CategoryDistribution {
  name: string;
  value: number;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    avatar: "/images/default-avatar.png",
    accountNumber: "****5678",
    accountType: "Savings",
    lastActive: "2023-04-10T14:30:00Z",
    status: "online",
    verified: true,
  },
  {
    id: "cust-002",
    name: "James Wilson",
    email: "james.wilson@example.com",
    avatar: "/images/default-avatar.png",
    accountNumber: "****4321",
    accountType: "Checking",
    lastActive: "2023-04-09T10:15:00Z",
    status: "offline",
    verified: true,
  },
  {
    id: "cust-003",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    avatar: "/images/default-avatar.png",
    accountNumber: "****9876",
    accountType: "Premium",
    lastActive: "2023-04-10T09:45:00Z",
    status: "online",
    verified: true,
  },
];

const mockConversations: Conversation[] = [
  {
    id: "conv-001",
    customer: mockCustomers[0],
    subject: "Credit card transaction dispute",
    status: "active",
    priority: "high",
    assignedTo: "agent-001",
    messages: [
      {
        id: "msg-001",
        sender: "customer",
        content:
          "I noticed a transaction on my credit card that I don't recognize. I need help disputing this charge.",
        timestamp: new Date("2023-04-10T14:30:00Z"),
      },
      {
        id: "msg-002",
        sender: "ai",
        content:
          "I understand your concern about the unrecognized transaction. I'd be happy to help you with disputing this charge. Could you please provide the date and amount of the transaction in question?",
        timestamp: new Date("2023-04-10T14:32:00Z"),
      },
      {
        id: "msg-003",
        sender: "customer",
        content: "It was on April 8th for $89.99 at 'TechGadgets Online'.",
        timestamp: new Date("2023-04-10T14:35:00Z"),
      },
      {
        id: "msg-004",
        sender: "agent",
        content:
          "Thank you for providing those details, Ms. Thompson. I've located the transaction in question. I'll initiate a dispute for this charge right away. In the meantime, as a security measure, would you like us to issue you a new card with a different number?",
        timestamp: new Date("2023-04-10T14:40:00Z"),
      },
    ],
    createdAt: new Date("2023-04-10T14:30:00Z"),
    updatedAt: new Date("2023-04-10T14:40:00Z"),
    category: "Fraud & Disputes",
    tags: ["credit-card", "dispute", "fraud"],
  },
  {
    id: "conv-002",
    customer: mockCustomers[1],
    subject: "Mobile banking app login issues",
    status: "pending",
    priority: "medium",
    assignedTo: "agent-002",
    messages: [
      {
        id: "msg-005",
        sender: "customer",
        content:
          "I'm having trouble logging into the mobile banking app. It keeps saying 'authentication failed' even though I'm sure my password is correct.",
        timestamp: new Date("2023-04-09T10:15:00Z"),
      },
      {
        id: "msg-006",
        sender: "ai",
        content:
          "I'm sorry to hear you're having trouble accessing the mobile app. Let's troubleshoot this together. Have you tried resetting your password? Also, please confirm if you're using the latest version of our mobile app.",
        timestamp: new Date("2023-04-09T10:17:00Z"),
      },
      {
        id: "msg-007",
        sender: "customer",
        content:
          "I haven't tried resetting my password yet. And yes, I updated the app yesterday.",
        timestamp: new Date("2023-04-09T10:20:00Z"),
      },
    ],
    createdAt: new Date("2023-04-09T10:15:00Z"),
    updatedAt: new Date("2023-04-09T10:20:00Z"),
    category: "Digital Banking",
    tags: ["mobile-app", "login", "authentication"],
  },
  {
    id: "conv-003",
    customer: mockCustomers[2],
    subject: "International wire transfer inquiry",
    status: "resolved",
    priority: "medium",
    assignedTo: "agent-003",
    messages: [
      {
        id: "msg-008",
        sender: "customer",
        content:
          "I need to make an international wire transfer to my family overseas. What information do I need and what are the fees involved?",
        timestamp: new Date("2023-04-10T09:45:00Z"),
      },
      {
        id: "msg-009",
        sender: "ai",
        content:
          "Thank you for your inquiry about international wire transfers. To proceed, you'll need the recipient's full name, bank name, account number, and SWIFT/BIC code. Our fee for international transfers is $45, and there might be additional fees from intermediary or receiving banks. Would you like me to guide you through the process?",
        timestamp: new Date("2023-04-10T09:47:00Z"),
      },
      {
        id: "msg-010",
        sender: "customer",
        content:
          "Yes, please guide me through the process. I have all the required information ready.",
        timestamp: new Date("2023-04-10T09:50:00Z"),
      },
      {
        id: "msg-011",
        sender: "agent",
        content:
          "I'd be happy to help you with the international wire transfer. You can initiate this through our online banking portal under 'Transfers & Payments' > 'International Wire'. Alternatively, I can help you complete this right now. Would you prefer to do it yourself online or would you like my assistance?",
        timestamp: new Date("2023-04-10T09:55:00Z"),
      },
      {
        id: "msg-012",
        sender: "customer",
        content:
          "I'll try doing it myself through the online portal. If I have any issues, I'll come back. Thank you!",
        timestamp: new Date("2023-04-10T10:00:00Z"),
      },
      {
        id: "msg-013",
        sender: "agent",
        content:
          "You're welcome! That sounds like a good plan. If you encounter any difficulties, don't hesitate to reach out. We're here to help 24/7. Is there anything else I can assist you with today?",
        timestamp: new Date("2023-04-10T10:05:00Z"),
      },
      {
        id: "msg-014",
        sender: "customer",
        content: "No, that's all. Thank you for your help!",
        timestamp: new Date("2023-04-10T10:07:00Z"),
      },
    ],
    createdAt: new Date("2023-04-10T09:45:00Z"),
    updatedAt: new Date("2023-04-10T10:07:00Z"),
    category: "International Banking",
    tags: ["wire-transfer", "international", "fees"],
  },
];

const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: "kb-001",
    title: "How to Dispute a Credit Card Transaction",
    content:
      "This guide walks you through the process of disputing unauthorized or incorrect charges on your credit card...",
    category: "Credit Cards",
    tags: ["dispute", "fraud", "credit-card", "transactions"],
    views: 1245,
    helpful: 1089,
    lastUpdated: new Date("2023-03-15T10:30:00Z"),
  },
  {
    id: "kb-002",
    title: "Mobile Banking App Troubleshooting",
    content:
      "Common issues with the mobile banking app and their solutions, including login problems, transaction errors, and app crashes...",
    category: "Digital Banking",
    tags: ["mobile-app", "troubleshooting", "login", "authentication"],
    views: 2367,
    helpful: 2105,
    lastUpdated: new Date("2023-03-20T14:45:00Z"),
  },
  {
    id: "kb-003",
    title: "International Wire Transfer Guide",
    content:
      "Everything you need to know about sending money internationally, including required information, fees, processing times, and security measures...",
    category: "International Banking",
    tags: ["wire-transfer", "international", "fees", "swift"],
    views: 876,
    helpful: 750,
    lastUpdated: new Date("2023-02-28T09:15:00Z"),
  },
  {
    id: "kb-004",
    title: "Understanding Overdraft Protection",
    content:
      "Learn about overdraft protection options, how they work, associated fees, and how to enroll or opt out...",
    category: "Accounts",
    tags: ["overdraft", "fees", "checking-account", "protection"],
    views: 1532,
    helpful: 1298,
    lastUpdated: new Date("2023-03-10T11:20:00Z"),
  },
  {
    id: "kb-005",
    title: "Mortgage Application Process",
    content:
      "A step-by-step guide to applying for a mortgage, including required documentation, credit score requirements, and timeline expectations...",
    category: "Loans & Mortgages",
    tags: ["mortgage", "loan", "application", "home-buying"],
    views: 3421,
    helpful: 3156,
    lastUpdated: new Date("2023-03-05T16:40:00Z"),
  },
];

const mockTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    customer: mockCustomers[0],
    subject: "Request for credit limit increase",
    description:
      "I would like to request an increase in my credit card limit from $5,000 to $10,000 due to upcoming travel expenses.",
    status: "open",
    priority: "medium",
    category: "Credit Cards",
    assignedTo: "agent-001",
    createdAt: new Date("2023-04-09T15:30:00Z"),
    updatedAt: new Date("2023-04-09T15:30:00Z"),
    dueDate: new Date("2023-04-12T15:30:00Z"),
    tags: ["credit-card", "limit-increase"],
  },
  {
    id: "ticket-002",
    customer: mockCustomers[1],
    subject: "Statement discrepancy",
    description:
      "My monthly statement shows a balance that doesn't match my transaction history. There appears to be a deposit of $500 missing.",
    status: "in_progress",
    priority: "high",
    category: "Accounts",
    assignedTo: "agent-002",
    createdAt: new Date("2023-04-08T10:15:00Z"),
    updatedAt: new Date("2023-04-10T09:20:00Z"),
    dueDate: new Date("2023-04-11T10:15:00Z"),
    tags: ["statement", "discrepancy", "deposit"],
  },
  {
    id: "ticket-003",
    customer: mockCustomers[2],
    subject: "Lost debit card",
    description:
      "I lost my debit card while traveling. I need to report it lost and request a replacement card as soon as possible.",
    status: "resolved",
    priority: "urgent",
    category: "Cards",
    assignedTo: "agent-003",
    createdAt: new Date("2023-04-07T14:45:00Z"),
    updatedAt: new Date("2023-04-07T16:30:00Z"),
    tags: ["debit-card", "lost-card", "replacement"],
  },
  {
    id: "ticket-004",
    customer: mockCustomers[0],
    subject: "Automatic payment setup",
    description:
      "I would like to set up automatic payments for my mortgage from my checking account.",
    status: "closed",
    priority: "low",
    category: "Loans & Mortgages",
    assignedTo: "agent-004",
    createdAt: new Date("2023-04-05T11:20:00Z"),
    updatedAt: new Date("2023-04-06T14:15:00Z"),
    tags: ["automatic-payment", "mortgage", "setup"],
  },
  {
    id: "ticket-005",
    customer: mockCustomers[1],
    subject: "Online banking password reset",
    description:
      "I forgot my online banking password and the reset link in the email isn't working.",
    status: "open",
    priority: "medium",
    category: "Digital Banking",
    createdAt: new Date("2023-04-10T08:30:00Z"),
    updatedAt: new Date("2023-04-10T08:30:00Z"),
    dueDate: new Date("2023-04-11T08:30:00Z"),
    tags: ["password", "reset", "online-banking"],
  },
];

const mockAgents: Agent[] = [
  {
    id: "agent-001",
    name: "Alex Rivera",
    email: "alex.rivera@bankname.com",
    avatar: "/images/default-avatar.png",
    role: "agent",
    department: "Credit Cards",
    status: "available",
    performance: {
      responseTime: 3, // minutes
      resolutionTime: 2.5, // hours
      satisfaction: 94, // percentage
      ticketsResolved: 342,
    },
  },
  {
    id: "agent-002",
    name: "Samantha Lee",
    email: "samantha.lee@bankname.com",
    avatar: "/images/default-avatar.png",
    role: "supervisor",
    department: "Accounts",
    status: "busy",
    performance: {
      responseTime: 5, // minutes
      resolutionTime: 3.2, // hours
      satisfaction: 92, // percentage
      ticketsResolved: 289,
    },
  },
  {
    id: "agent-003",
    name: "Michael Johnson",
    email: "michael.johnson@bankname.com",
    avatar: "/images/default-avatar.png",
    role: "agent",
    department: "Cards",
    status: "available",
    performance: {
      responseTime: 2, // minutes
      resolutionTime: 1.8, // hours
      satisfaction: 96, // percentage
      ticketsResolved: 412,
    },
  },
  {
    id: "agent-004",
    name: "Jessica Brown",
    email: "jessica.brown@bankname.com",
    avatar: "/images/default-avatar.png",
    role: "agent",
    department: "Loans & Mortgages",
    status: "offline",
    performance: {
      responseTime: 4, // minutes
      resolutionTime: 4.5, // hours
      satisfaction: 90, // percentage
      ticketsResolved: 275,
    },
  },
];

const mockDashboardMetrics: DashboardMetrics = {
  totalConversations: 1245,
  activeConversations: 32,
  avgResponseTime: 3.5, // minutes
  avgResolutionTime: 2.8, // hours
  customerSatisfaction: 93, // percentage
  ticketsCreated: 456,
  ticketsResolved: 412,
  knowledgeBaseViews: 3567,
};

const mockTimeSeriesData: TimeSeriesData[] = [
  { date: "2023-04-04", conversations: 42, tickets: 18, satisfaction: 92 },
  { date: "2023-04-05", conversations: 38, tickets: 15, satisfaction: 94 },
  { date: "2023-04-06", conversations: 45, tickets: 22, satisfaction: 91 },
  { date: "2023-04-07", conversations: 39, tickets: 17, satisfaction: 93 },
  { date: "2023-04-08", conversations: 28, tickets: 12, satisfaction: 95 },
  { date: "2023-04-09", conversations: 35, tickets: 16, satisfaction: 92 },
  { date: "2023-04-10", conversations: 47, tickets: 24, satisfaction: 94 },
];

const mockCategoryDistribution: CategoryDistribution[] = [
  { name: "Credit Cards", value: 28 },
  { name: "Accounts", value: 22 },
  { name: "Digital Banking", value: 18 },
  { name: "Loans & Mortgages", value: 15 },
  { name: "International Banking", value: 10 },
  { name: "Other", value: 7 },
];

const AIBankSupport = () => {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] =
    useState<Conversation[]>(mockConversations);
  const [filteredTickets, setFilteredTickets] =
    useState<SupportTicket[]>(mockTickets);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(false);
  const [showCustomerPanel, setShowCustomerPanel] = useState(false);
  const [selectedArticle, setSelectedArticle] =
    useState<KnowledgeArticle | null>(null);
  const [showArticleDetails, setShowArticleDetails] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [dateRange, setDateRange] = useState<
    "today" | "week" | "month" | "quarter"
  >("week");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Check if system prefers dark mode
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current && selectedConversation) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation]);

  // Filter conversations and tickets based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      // Filter conversations
      const filteredConvs = mockConversations.filter(
        (conv) =>
          conv.subject.toLowerCase().includes(query) ||
          conv.customer.name.toLowerCase().includes(query) ||
          conv.customer.email.toLowerCase().includes(query) ||
          conv.category.toLowerCase().includes(query) ||
          conv.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
      setFilteredConversations(filteredConvs);

      // Filter tickets
      const filteredTkts = mockTickets.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.customer.name.toLowerCase().includes(query) ||
          ticket.customer.email.toLowerCase().includes(query) ||
          ticket.category.toLowerCase().includes(query) ||
          ticket.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
      setFilteredTickets(filteredTkts);
    } else {
      setFilteredConversations(mockConversations);
      setFilteredTickets(mockTickets);
    }
  }, [searchQuery]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle conversation selection
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  // Handle ticket selection
  const handleTicketSelect = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  // Handle article selection
  const handleArticleSelect = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
    setShowArticleDetails(true);
  };

  // Handle agent selection
  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentDetails(true);
  };

  // Send message in conversation
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const updatedConversation = {
      ...selectedConversation,
      messages: [
        ...selectedConversation.messages,
        {
          id: `msg-${Date.now()}`,
          sender: "agent" as const,
          content: newMessage,
          timestamp: new Date(),
        },
      ],
      updatedAt: new Date(),
    };

    // Update the conversation in the filtered list
    setFilteredConversations(
      filteredConversations.map((conv) =>
        conv.id === selectedConversation.id ? updatedConversation : conv,
      ),
    );

    // Update the selected conversation
    setSelectedConversation(updatedConversation);
    setNewMessage("");

    // Simulate AI response
    simulateAIResponse(updatedConversation);
  };

  // Simulate AI response
  const simulateAIResponse = (conversation: Conversation) => {
    setIsGeneratingResponse(true);

    // Simulate delay
    setTimeout(() => {
      const aiResponses = [
        "Thank you for providing that information. I've noted the details in your account. Is there anything else you'd like to know about this matter?",
        "I understand your concern. Based on our bank's policy, I can confirm that this situation is covered under our customer protection program. Would you like me to provide more details about the next steps?",
        "I've checked your account history and everything seems to be in order. The transaction you mentioned has been processed successfully. Is there anything specific about this transaction you'd like to discuss?",
        "I've escalated this matter to our specialized team who will review your case in detail. You should receive an update within 24-48 hours. In the meantime, is there anything else I can assist you with?",
        "Based on your account status, you're eligible for our premium banking services which include priority customer support and reduced fees. Would you like me to provide more information about these benefits?",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const updatedConversation = {
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            id: `msg-${Date.now()}`,
            sender: "ai" as const,
            content: randomResponse,
            timestamp: new Date(),
          },
        ],
        updatedAt: new Date(),
      };

      // Update the conversation in the filtered list
      setFilteredConversations(
        filteredConversations.map((conv) =>
          conv.id === conversation.id ? updatedConversation : conv,
        ),
      );

      // Update the selected conversation
      setSelectedConversation(updatedConversation);
      setIsGeneratingResponse(false);
    }, 2000);
  };

  // Generate AI response for selected conversation
  const generateAIResponse = () => {
    if (!selectedConversation) return;

    setIsGeneratingResponse(true);

    // Simulate delay
    setTimeout(() => {
      const aiResponses = [
        "Based on your account history and the details you've provided, I recommend checking if there have been any other unauthorized transactions. Would you like me to help you review your recent account activity?",
        "I understand your frustration with this issue. Our security team takes these matters very seriously. I've flagged this for immediate review, and in the meantime, I suggest enabling two-factor authentication for added security. Would you like instructions on how to set that up?",
        "Thank you for your patience. I've analyzed your situation and found that you're eligible for our fee reimbursement program in this case. I'll initiate the process to credit the fees back to your account, which should be completed within 2-3 business days.",
        "I notice this is related to your recent international transaction. These sometimes require additional verification due to our fraud protection measures. I can help expedite the verification process so your transaction can be processed more quickly.",
        "Looking at your account profile, I see you might benefit from our Premium Banking package, which includes priority service for issues like this and lower fees for international transfers. Would you like to learn more about upgrading your account?",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const updatedConversation = {
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          {
            id: `msg-${Date.now()}`,
            sender: "ai" as const,
            content: randomResponse,
            timestamp: new Date(),
          },
        ],
        updatedAt: new Date(),
      };

      // Update the conversation in the filtered list
      setFilteredConversations(
        filteredConversations.map((conv) =>
          conv.id === selectedConversation.id ? updatedConversation : conv,
        ),
      );

      // Update the selected conversation
      setSelectedConversation(updatedConversation);
      setIsGeneratingResponse(false);
    }, 2000);
  };

  // Change date range for dashboard metrics
  const changeDateRange = (range: "today" | "week" | "month" | "quarter") => {
    setDateRange(range);
    // In a real application, this would fetch new data based on the selected range
  };

  // Render dashboard charts
  const renderConversationChart = () => {
    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockTimeSeriesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="colorConversations"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                color: isDarkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value} conversations`, "Volume"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Area
              type="monotone"
              dataKey="conversations"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorConversations)"
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCategoryDistributionChart = () => {
    const COLORS = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#6b7280",
    ];

    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockCategoryDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              animationDuration={1500}
            >
              {mockCategoryDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                color: isDarkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value} tickets`, "Count"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSatisfactionChart = () => {
    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockTimeSeriesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}
              domain={[80, 100]}
              label={{
                value: "Satisfaction (%)",
                angle: -90,
                position: "insideLeft",
                style: { fill: isDarkMode ? "#e5e7eb" : "#4b5563" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                color: isDarkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value}%`, "Satisfaction"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Line
              type="monotone"
              dataKey="satisfaction"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderAgentPerformanceChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockAgents}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                color: isDarkMode ? "#e5e7eb" : "#4b5563",
              }}
            />
            <Legend />
            <Bar
              dataKey="performance.satisfaction"
              name="Satisfaction (%)"
              fill="#10b981"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            />
            <Bar
              dataKey="performance.responseTime"
              name="Avg. Response Time (min)"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // View rendering functions
  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg dark:from-blue-800 dark:to-indigo-900"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Support Team!</h2>
            <p className="mt-1 text-blue-100">
              Here&apos;s your support overview for today
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeDateRange("today")}
              className={`rounded-md px-3 py-1 text-sm ${
                dateRange === "today"
                  ? "bg-white/20 font-medium"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => changeDateRange("week")}
              className={`rounded-md px-3 py-1 text-sm ${
                dateRange === "week"
                  ? "bg-white/20 font-medium"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => changeDateRange("month")}
              className={`rounded-md px-3 py-1 text-sm ${
                dateRange === "month"
                  ? "bg-white/20 font-medium"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => changeDateRange("quarter")}
              className={`rounded-md px-3 py-1 text-sm ${
                dateRange === "quarter"
                  ? "bg-white/20 font-medium"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              Quarter
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-blue-100">Active Conversations</p>
            <p className="text-xl font-bold">
              {mockDashboardMetrics.activeConversations}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-blue-100">Avg. Response Time</p>
            <p className="text-xl font-bold">
              {mockDashboardMetrics.avgResponseTime} min
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-blue-100">Customer Satisfaction</p>
            <p className="text-xl font-bold">
              {mockDashboardMetrics.customerSatisfaction}%
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-blue-100">Open Tickets</p>
            <p className="text-xl font-bold">
              {mockDashboardMetrics.ticketsCreated -
                mockDashboardMetrics.ticketsResolved}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Conversation Volume
            </h3>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              Last 7 days
            </span>
          </div>
          {renderConversationChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Total conversations this week:{" "}
            {mockTimeSeriesData.reduce(
              (sum, day) => sum + day.conversations,
              0,
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Customer Satisfaction
            </h3>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
              Trending Up
            </span>
          </div>
          {renderSatisfactionChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Average satisfaction:{" "}
            {Math.round(
              mockTimeSeriesData.reduce(
                (sum, day) => sum + day.satisfaction,
                0,
              ) / mockTimeSeriesData.length,
            )}
            %
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Ticket Categories
            </h3>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              This month
            </span>
          </div>
          {renderCategoryDistributionChart()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Agent Performance
          </h3>
          {renderAgentPerformanceChart()}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <MessageCircle size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    New conversation started
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    10 minutes ago
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Emma Thompson started a new conversation about a credit card
                  transaction dispute.
                </p>
                <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  View conversation
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Ticket size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Ticket resolved
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Michael Johnson resolved a ticket about a lost debit card.
                </p>
                <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  View ticket
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <BookOpen size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium dark:text-white">
                    Knowledge base updated
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    3 hours ago
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  The article &quot;International Wire Transfer Guide&quot; was
                  updated with new information.
                </p>
                <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  View article
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderConversations = () => (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold dark:text-white">
          Customer Conversations
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter size={16} className="mr-1" />
            Filters
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status-active"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                    />
                    <label
                      htmlFor="status-active"
                      className="ml-2 text-sm dark:text-white"
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status-pending"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                    />
                    <label
                      htmlFor="status-pending"
                      className="ml-2 text-sm dark:text-white"
                    >
                      Pending
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status-resolved"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                    />
                    <label
                      htmlFor="status-resolved"
                      className="ml-2 text-sm dark:text-white"
                    >
                      Resolved
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
                  <option value="">All Categories</option>
                  <option value="fraud-disputes">Fraud & Disputes</option>
                  <option value="digital-banking">Digital Banking</option>
                  <option value="international-banking">
                    International Banking
                  </option>
                  <option value="accounts">Accounts</option>
                  <option value="loans-mortgages">Loans & Mortgages</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date Range
                </label>
                <select className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-30-days">Last 30 days</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowFilterPanel(false)}
              >
                Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                onClick={() => setShowFilterPanel(false)}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <div className="grid h-full grid-cols-1 md:grid-cols-[350px_1fr]">
          <div className="border-r border-gray-200 dark:border-gray-700">
            <div className="h-full overflow-y-auto p-4">
              {filteredConversations.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                    <MessageCircle size={32} className="text-gray-400" />
                  </div>
                  <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                    No conversations match your filters
                  </p>
                  <button
                    className="mt-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() => {
                      setSearchQuery("");
                      setFilteredConversations(mockConversations);
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredConversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay:
                          filteredConversations.indexOf(conversation) * 0.05,
                      }}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${
                        selectedConversation?.id === conversation.id
                          ? "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/30"
                          : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-800 dark:hover:bg-blue-900/20"
                      }`}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative mr-3 h-8 w-8 flex-shrink-0">
                            <Image
                              src={
                                conversation.customer.avatar ||
                                "/images/default-avatar.png"
                              }
                              alt={conversation.customer.name}
                              className="h-full w-full rounded-full object-cover"
                              fill
                            />
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white ${
                                conversation.customer.status === "online"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              } dark:border-gray-800`}
                            ></div>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">
                              {conversation.customer.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {conversation.customer.accountType} Account
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            conversation.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                              : conversation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                          }`}
                        >
                          {conversation.status.charAt(0).toUpperCase() +
                            conversation.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="mt-2 line-clamp-1 font-medium dark:text-white">
                        {conversation.subject}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {
                          conversation.messages[
                            conversation.messages.length - 1
                          ].content
                        }
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {conversation.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {conversation.tags.length > 2 && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              +{conversation.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(conversation.updatedAt).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full flex-col">
            {selectedConversation ? (
              <div className="flex h-full flex-col">
                <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold dark:text-white">
                          {selectedConversation.subject}
                        </h3>
                        <span
                          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            selectedConversation.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                              : selectedConversation.priority === "high"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                                : selectedConversation.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          }`}
                        >
                          {selectedConversation.priority
                            .charAt(0)
                            .toUpperCase() +
                            selectedConversation.priority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>
                          Started{" "}
                          {new Date(
                            selectedConversation.createdAt,
                          ).toLocaleString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{selectedConversation.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setShowCustomerPanel(!showCustomerPanel)}
                      >
                        <User size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() =>
                          setShowKnowledgePanel(!showKnowledgePanel)
                        }
                      >
                        <BookOpen size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <MoreHorizontal size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4"
                >
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.sender === "customer"
                              ? "bg-gray-100 dark:bg-gray-700"
                              : message.sender === "agent"
                                ? "bg-blue-100 dark:bg-blue-900/20"
                                : "bg-green-100 dark:bg-green-900/20"
                          }`}
                        >
                          <div className="flex items-center">
                            {message.sender === "customer" && (
                              <div className="relative mr-2 h-6 w-6 flex-shrink-0">
                                <Image
                                  src={
                                    selectedConversation.customer.avatar ||
                                    "/images/default-avatar.png"
                                  }
                                  alt={selectedConversation.customer.name}
                                  className="h-full w-full rounded-full object-cover"
                                  fill
                                />
                              </div>
                            )}
                            <div className="flex items-center">
                              <span className="font-medium">
                                {message.sender === "customer"
                                  ? selectedConversation.customer.name
                                  : message.sender === "agent"
                                    ? "Support Agent"
                                    : "AI Assistant"}
                              </span>
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                {new Date(message.timestamp).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </span>
                            </div>
                          </div>
                          <p className="mt-1 whitespace-pre-wrap">
                            {message.content}
                          </p>
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
                                  >
                                    <Paperclip
                                      size={14}
                                      className="mr-2 text-gray-500"
                                    />
                                    <span className="flex-1 text-sm">
                                      {attachment.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {(attachment.size / 1024).toFixed(1)} KB
                                    </span>
                                    <button className="ml-2 rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <Download size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                    ))}

                    {isGeneratingResponse && (
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-lg bg-green-100 p-4 dark:bg-green-900/20">
                          <div className="flex items-center">
                            <span className="font-medium">AI Assistant</span>
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                              {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="mt-2 flex space-x-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-green-600 dark:bg-green-400"></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-green-600 dark:bg-green-400"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-green-600 dark:bg-green-400"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={generateAIResponse}
                      >
                        <Zap size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <Paperclip size={18} />
                      </motion.button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select className="rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      >
                        Update
                      </motion.button>
                    </div>
                  </div>
                  <div>
                    <textarea
                      ref={messageInputRef}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Send email notification
                          </span>
                        </label>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                        disabled={!newMessage.trim()}
                        onClick={sendMessage}
                      >
                        <Send size={16} className="mr-1" />
                        Send Reply
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-4">
                <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-700">
                  <MessageCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium dark:text-white">
                  No conversation selected
                </h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                  Select a conversation from the list to view details and
                  respond
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showKnowledgePanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 z-20 w-80 border-l border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen
                      size={18}
                      className="mr-2 text-blue-600 dark:text-blue-400"
                    />
                    <h3 className="text-lg font-semibold dark:text-white">
                      Knowledge Base
                    </h3>
                  </div>
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={() => setShowKnowledgePanel(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Search knowledge base..."
                    className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-blue-600 dark:text-blue-400">
                        <Info size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-300">
                          Suggested Articles
                        </p>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                          Based on the conversation, these articles may help
                          resolve the issue.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {mockKnowledgeArticles.map((article) => (
                      <motion.div
                        key={article.id}
                        whileHover={{
                          y: -2,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
                        onClick={() => handleArticleSelect(article)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium dark:text-white">
                            {article.title}
                          </h4>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                            {article.category}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                          {article.content}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Eye size={12} className="mr-1" />
                            {article.views} views
                            <span className="mx-1">•</span>
                            <ThumbsUp size={12} className="mr-1" />
                            {article.helpful} helpful
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Copy size={14} />
                            </button>
                            <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomerPanel && selectedConversation && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 z-20 w-80 border-l border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User
                      size={18}
                      className="mr-2 text-blue-600 dark:text-blue-400"
                    />
                    <h3 className="text-lg font-semibold dark:text-white">
                      Customer Profile
                    </h3>
                  </div>
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={() => setShowCustomerPanel(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <Image
                        src={
                          selectedConversation.customer.avatar ||
                          "/images/default-avatar.png"
                        }
                        alt={selectedConversation.customer.name}
                        className="h-16 w-16 rounded-full object-cover"
                        width={64}
                        height={64}
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          selectedConversation.customer.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        } dark:border-gray-800`}
                      ></div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold dark:text-white">
                          {selectedConversation.customer.name}
                        </h4>
                        {selectedConversation.customer.verified && (
                          <ShieldCheck
                            size={16}
                            className="ml-1 text-blue-600 dark:text-blue-400"
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedConversation.customer.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Account Number
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedConversation.customer.accountNumber}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Account Type
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedConversation.customer.accountType}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last Active
                      </p>
                      <p className="font-medium dark:text-white">
                        {new Date(
                          selectedConversation.customer.lastActive,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                      <div className="mt-1 flex items-center">
                        <div
                          className={`mr-2 h-3 w-3 rounded-full ${
                            selectedConversation.customer.status === "online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <p className="font-medium dark:text-white">
                          {selectedConversation.customer.status
                            .charAt(0)
                            .toUpperCase() +
                            selectedConversation.customer.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium dark:text-white">
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard
                              size={14}
                              className="mr-2 text-blue-600 dark:text-blue-400"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              Card Transaction
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            2 days ago
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          $89.99 at TechGadgets Online
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DollarSign
                              size={14}
                              className="mr-2 text-green-600 dark:text-green-400"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              Deposit
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            5 days ago
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          $1,250.00 - Direct Deposit
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Lock
                              size={14}
                              className="mr-2 text-blue-600 dark:text-blue-400"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              Password Reset
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            1 week ago
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          Online banking password was reset
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-blue-600 dark:text-blue-400">
                        <Info size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-300">
                          Customer Insights
                        </p>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                          This customer has been with the bank for 5+ years and
                          maintains multiple accounts. They typically respond
                          well to personalized service and have referred 3 other
                          customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Users size={16} className="mr-1" />
                  View Full Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showArticleDetails && selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowArticleDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowArticleDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold dark:text-white">
                  {selectedArticle.title}
                </h2>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  {selectedArticle.category}
                </span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-blue dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedArticle.content}
                </p>

                <h3 className="mt-6 text-lg font-semibold dark:text-white">
                  Additional Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  For more detailed information on this topic, please refer to
                  our comprehensive documentation or contact our specialized
                  support team.
                </p>

                <h3 className="mt-6 text-lg font-semibold dark:text-white">
                  Related Articles
                </h3>
                <ul className="list-disc pl-5">
                  {mockKnowledgeArticles
                    .filter((article) => article.id !== selectedArticle.id)
                    .slice(0, 3)
                    .map((article) => (
                      <li key={article.id} className="mb-2">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {article.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Eye size={16} className="mr-1" />
                  {selectedArticle.views} views
                  <span className="mx-2">•</span>
                  <ThumbsUp size={16} className="mr-1" />
                  {selectedArticle.helpful} found this helpful
                  <span className="mx-2">•</span>
                  <span>
                    Last updated:{" "}
                    {new Date(selectedArticle.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <Copy size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <Link2 size={18} />
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowArticleDetails(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Insert in Reply
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderTickets = () => (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold dark:text-white">Support Tickets</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Plus size={16} className="mr-1" />
            New Ticket
          </motion.button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            true
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        <button
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            false
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Open
        </button>
        <button
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            false
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          In Progress
        </button>
        <button
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            false
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Resolved
        </button>
        <button
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            false
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Closed
        </button>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <div className="h-full overflow-y-auto p-4">
          {filteredTickets.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                <Ticket size={32} className="text-gray-400" />
              </div>
              <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                No tickets match your filters
              </p>
              <button
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => {
                  setSearchQuery("");
                  setFilteredTickets(mockTickets);
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Ticket
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Assigned To
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {filteredTickets.map((ticket) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: filteredTickets.indexOf(ticket) * 0.05,
                      }}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleTicketSelect(ticket)}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {ticket.subject}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {ticket.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0">
                            <Image
                              className="h-8 w-8 rounded-full"
                              width={32}
                              height={32}
                              src={
                                ticket.customer.avatar ||
                                "/images/default-avatar.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {ticket.customer.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {ticket.customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {ticket.category}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            ticket.status === "open"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                              : ticket.status === "in_progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                : ticket.status === "resolved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {ticket.status
                            .replace("_", " ")
                            .charAt(0)
                            .toUpperCase() +
                            ticket.status.replace("_", " ").slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            ticket.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                              : ticket.priority === "high"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                                : ticket.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          }`}
                        >
                          {ticket.priority.charAt(0).toUpperCase() +
                            ticket.priority.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {ticket.assignedTo
                          ? mockAgents.find(
                              (agent) => agent.id === ticket.assignedTo,
                            )?.name || "Unassigned"
                          : "Unassigned"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          Edit
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold dark:text-white">Knowledge Base</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Plus size={16} className="mr-1" />
            New Article
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 space-y-4">
          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Categories
            </h3>
            <div className="space-y-2">
              <button className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <CreditCard
                    size={16}
                    className="mr-2 text-blue-600 dark:text-blue-400"
                  />
                  <span className="text-sm font-medium dark:text-white">
                    Credit Cards
                  </span>
                </div>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  12
                </span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <DollarSign
                    size={16}
                    className="mr-2 text-green-600 dark:text-green-400"
                  />
                  <span className="text-sm font-medium dark:text-white">
                    Accounts
                  </span>
                </div>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  8
                </span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <Globe
                    size={16}
                    className="mr-2 text-purple-600 dark:text-purple-400"
                  />
                  <span className="text-sm font-medium dark:text-white">
                    International Banking
                  </span>
                </div>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  5
                </span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <Lock
                    size={16}
                    className="mr-2 text-blue-600 dark:text-blue-400"
                  />
                  <span className="text-sm font-medium dark:text-white">
                    Digital Banking
                  </span>
                </div>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  10
                </span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <Home
                    size={16}
                    className="mr-2 text-orange-600 dark:text-orange-400"
                  />
                  <span className="text-sm font-medium dark:text-white">
                    Loans & Mortgages
                  </span>
                </div>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  7
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                fraud
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                mobile-app
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                wire-transfer
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                credit-card
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                dispute
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                fees
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                login
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                mortgage
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-4 md:col-span-2">
          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Popular Articles
            </h3>
            <div className="space-y-4">
              {mockKnowledgeArticles
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
                .map((article) => (
                  <motion.div
                    key={article.id}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
                    onClick={() => handleArticleSelect(article)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium dark:text-white">
                        {article.title}
                      </h4>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                        {article.category}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {article.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Eye size={12} className="mr-1" />
                        {article.views} views
                        <span className="mx-1">•</span>
                        <ThumbsUp size={12} className="mr-1" />
                        {article.helpful} helpful
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated{" "}
                        {new Date(article.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Recently Updated
            </h3>
            <div className="space-y-4">
              {mockKnowledgeArticles
                .sort(
                  (a, b) =>
                    new Date(b.lastUpdated).getTime() -
                    new Date(a.lastUpdated).getTime(),
                )
                .slice(0, 3)
                .map((article) => (
                  <motion.div
                    key={article.id}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
                    onClick={() => handleArticleSelect(article)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium dark:text-white">
                        {article.title}
                      </h4>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                        {article.category}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {article.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated{" "}
                        {new Date(article.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold dark:text-white">Support Agents</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Plus size={16} className="mr-1" />
            Add Agent
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockAgents.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mockAgents.indexOf(agent) * 0.05 }}
            whileHover={{
              y: -3,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            className="cursor-pointer rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
            onClick={() => handleAgentSelect(agent)}
          >
            <div className="flex items-center">
              <div className="relative mr-4">
                <Image
                  src={agent.avatar || "/images/default-avatar.png"}
                  alt={agent.name}
                  className="h-12 w-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                    agent.status === "available"
                      ? "bg-green-500"
                      : agent.status === "busy"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  } dark:border-gray-800`}
                ></div>
              </div>
              <div>
                <h4 className="text-lg font-semibold dark:text-white">
                  {agent.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {agent.role}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Satisfaction
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {agent.performance.satisfaction}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${agent.performance.satisfaction}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Response Time
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {agent.performance.responseTime} min
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${(agent.performance.responseTime / 10) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  agent.status === "available"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                    : agent.status === "busy"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
              <button className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold dark:text-white">Settings</h2>

      <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </label>
            <div className="mt-1.5 flex items-center space-x-3">
              <button
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={toggleDarkMode}
              >
                Dark
              </button>
              <button
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  !isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={toggleDarkMode}
              >
                Light
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Notifications
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Push Notifications
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Change Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Update Password
          </motion.button>
        </div>
      </div>
    </div>
  );

  // Main rendering logic
  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-200`}
    >
      <div className="flex h-screen">
        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 shadow-lg dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold dark:text-white">
                  AI Bank Support
                </span>
                <button
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X size={18} />
                </button>
              </div>
              {renderSidebarContent()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar (Hidden on Mobile) */}
        {!isMobile && (
          <div className="hidden w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 md:block">
            <div className="flex h-full flex-col">
              <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <span className="text-lg font-semibold dark:text-white">
                  AI Bank Support
                </span>
              </div>
              {renderSidebarContent()}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
            {isMobile && (
              <button
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={() => setShowMobileMenu(true)}
              >
                <Menu size={18} />
              </button>
            )}
            <div className="flex items-center space-x-4">
              <button
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                <Bell size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "conversations" && renderConversations()}
            {activeTab === "tickets" && renderTickets()}
            {activeTab === "knowledge-base" && renderKnowledgeBase()}
            {activeTab === "agents" && renderAgents()}
            {activeTab === "settings" && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );

  function renderSidebarContent() {
    return (
      <nav className="flex-1 space-y-1 p-4">
        <SidebarLink
          label="Dashboard"
          icon={Home}
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <SidebarLink
          label="Conversations"
          icon={MessageSquare}
          active={activeTab === "conversations"}
          onClick={() => setActiveTab("conversations")}
        />
        <SidebarLink
          label="Tickets"
          icon={Ticket}
          active={activeTab === "tickets"}
          onClick={() => setActiveTab("tickets")}
        />
        <SidebarLink
          label="Knowledge Base"
          icon={BookOpen}
          active={activeTab === "knowledge-base"}
          onClick={() => setActiveTab("knowledge-base")}
        />
        <SidebarLink
          label="Agents"
          icon={Users}
          active={activeTab === "agents"}
          onClick={() => setActiveTab("agents")}
        />
        <SidebarLink
          label="Settings"
          icon={Settings}
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
          <button className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    );
  }
};

interface SidebarLinkProps {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  label,
  icon: Icon,
  active,
  onClick,
}) => (
  <button
    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
      active
        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
    }`}
    onClick={onClick}
  >
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

export default AIBankSupport;
