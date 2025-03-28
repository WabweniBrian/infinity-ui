// Types
export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: "new" | "open" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  assignee?: Agent;
  tags: string[];
  messages: Message[];
  satisfaction?: "satisfied" | "neutral" | "unsatisfied";
  responseTime?: number; // in minutes
  resolutionTime?: number; // in minutes
  aiSuggestions?: AISuggestion[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar?: string;
  tier: "free" | "premium" | "enterprise";
  timezone: string;
  language: string;
  lastContact?: string;
  totalTickets: number;
  sentiment: "positive" | "neutral" | "negative";
  lifetimeValue?: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "agent" | "admin" | "supervisor";
  department: string;
  status: "available" | "busy" | "offline";
  expertise: string[];
  performance: {
    responseTime: number; // in minutes
    resolutionTime: number; // in minutes
    satisfaction: number; // percentage
    ticketsResolved: number;
  };
}

export interface Message {
  id: string;
  sender: "customer" | "agent" | "system" | "ai";
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  isInternal?: boolean;
  aiGenerated?: boolean;
  edited?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface AISuggestion {
  id: string;
  type: "response" | "category" | "priority" | "agent" | "knowledge";
  content: string;
  confidence: number;
  used: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  lastUpdated: string;
  relatedArticles: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  actions: {
    type: string;
    value: string;
  }[];
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

export interface InsightData {
  ticketVolume: { date: string; count: number }[];
  responseTime: { date: string; time: number }[];
  resolutionTime: { date: string; time: number }[];
  responseResolutionTime: {
    date: string;
    responseTime: number;
    resolutionTime: number;
  }[];
  satisfaction: { date: string; score: number }[];
  categoryDistribution: { name: string; value: number }[];
  agentPerformance: {
    agent: string;
    responseTime: number;
    resolutionTime: number;
    satisfaction: number;
    ticketsResolved: number;
  }[];
}

export interface AIInsight {
  id: string;
  type: "trend" | "anomaly" | "suggestion" | "prediction";
  title: string;
  description: string;
  impact: "positive" | "neutral" | "negative";
  confidence: number;
  category: string;
  createdAt: string;
  relatedData?: any;
}

export const tickets: Ticket[] = [
  {
    id: "TKT-1001",
    subject: "Cannot access my account after password reset",
    description:
      "I tried to reset my password but now I can't log in with the new password. I've tried multiple times but keep getting an 'invalid credentials' error.",
    status: "open",
    priority: "high",
    category: "Account Access",
    createdAt: "2023-04-10T14:30:00Z",
    updatedAt: "2023-04-10T15:45:00Z",
    customer: {
      id: "CUST-501",
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      company: "Global Tech Solutions",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tier: "premium",
      timezone: "America/New_York",
      language: "English",
      lastContact: "2023-04-05T11:20:00Z",
      totalTickets: 3,
      sentiment: "negative",
      lifetimeValue: 2500,
    },
    assignee: {
      id: "AGT-101",
      name: "Alex Rivera",
      email: "alex.rivera@support.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      role: "agent",
      department: "Technical Support",
      status: "available",
      expertise: ["Account Management", "Authentication", "Password Recovery"],
      performance: {
        responseTime: 12,
        resolutionTime: 240,
        satisfaction: 94,
        ticketsResolved: 342,
      },
    },
    tags: ["password-reset", "login-issue", "urgent"],
    messages: [
      {
        id: "MSG-2001",
        sender: "customer",
        content:
          "I tried to reset my password but now I can't log in with the new password. I've tried multiple times but keep getting an 'invalid credentials' error.",
        timestamp: "2023-04-10T14:30:00Z",
      },
      {
        id: "MSG-2002",
        sender: "system",
        content: "Ticket assigned to Alex Rivera",
        timestamp: "2023-04-10T14:32:00Z",
        isInternal: true,
      },
      {
        id: "MSG-2003",
        sender: "ai",
        content:
          "I notice you're having trouble logging in after a password reset. Let me help you troubleshoot this issue. Could you confirm if you received a confirmation email after resetting your password? Also, are you using the exact password from the reset email, and are you ensuring that caps lock is not enabled?",
        timestamp: "2023-04-10T14:35:00Z",
        aiGenerated: true,
      },
      {
        id: "MSG-2004",
        sender: "agent",
        content:
          "Hi Emma, I'm Alex from the support team. I see you're having trouble logging in after resetting your password. Let's troubleshoot this together. Could you confirm if you received a confirmation email after resetting your password? Also, are you using the exact password from the reset email, and are you ensuring that caps lock is not enabled?",
        timestamp: "2023-04-10T14:45:00Z",
      },
      {
        id: "MSG-2005",
        sender: "customer",
        content:
          "Hi Alex, yes I did receive the confirmation email and I'm sure I'm entering the password correctly. I've tried on both my laptop and phone with the same result.",
        timestamp: "2023-04-10T15:00:00Z",
      },
      {
        id: "MSG-2006",
        sender: "agent",
        content:
          "Thanks for confirming, Emma. Let me check your account status in our system. There might be a technical issue with your account that's preventing the new password from being recognized. I'll look into this right away and get back to you shortly.",
        timestamp: "2023-04-10T15:15:00Z",
      },
      {
        id: "MSG-2007",
        sender: "agent",
        content:
          "I've checked our system and found that there was a synchronization issue with our authentication servers. I've manually reset your password to 'TempPass123!' and cleared the cache on your account. Please try logging in with this temporary password, and then you can change it to something of your choice. Let me know if this resolves the issue.",
        timestamp: "2023-04-10T15:45:00Z",
      },
    ],
    responseTime: 15,
    aiSuggestions: [
      {
        id: "SUGG-101",
        type: "response",
        content:
          "I notice you're having trouble logging in after a password reset. Let me help you troubleshoot this issue. Could you confirm if you received a confirmation email after resetting your password? Also, are you using the exact password from the reset email, and are you ensuring that caps lock is not enabled?",
        confidence: 0.92,
        used: true,
      },
      {
        id: "SUGG-102",
        type: "category",
        content: "Account Access",
        confidence: 0.95,
        used: true,
      },
      {
        id: "SUGG-103",
        type: "priority",
        content: "high",
        confidence: 0.88,
        used: true,
      },
      {
        id: "SUGG-104",
        type: "knowledge",
        content: "KB-2034: Troubleshooting Login Issues After Password Reset",
        confidence: 0.91,
        used: false,
      },
    ],
  },
  {
    id: "TKT-1002",
    subject: "Billing discrepancy on my latest invoice",
    description:
      "My latest invoice shows charges for services I didn&apos;t use. I'm being charged for the premium plan but I downgraded to the basic plan last month.",
    status: "pending",
    priority: "medium",
    category: "Billing",
    createdAt: "2023-04-09T10:15:00Z",
    updatedAt: "2023-04-10T11:30:00Z",
    customer: {
      id: "CUST-502",
      name: "James Wilson",
      email: "james.wilson@example.com",
      company: "Wilson Consulting",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tier: "enterprise",
      timezone: "Europe/London",
      language: "English",
      lastContact: "2023-03-28T09:45:00Z",
      totalTickets: 5,
      sentiment: "negative",
      lifetimeValue: 12000,
    },
    assignee: {
      id: "AGT-102",
      name: "Sophia Chen",
      email: "sophia.chen@support.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      role: "agent",
      department: "Billing Support",
      status: "busy",
      expertise: ["Invoicing", "Refunds", "Subscription Management"],
      performance: {
        responseTime: 18,
        resolutionTime: 360,
        satisfaction: 92,
        ticketsResolved: 289,
      },
    },
    tags: ["billing", "invoice", "refund"],
    messages: [
      {
        id: "MSG-3001",
        sender: "customer",
        content:
          "My latest invoice shows charges for services I didn&apos;t use. I'm being charged for the premium plan but I downgraded to the basic plan last month.",
        timestamp: "2023-04-09T10:15:00Z",
      },
      {
        id: "MSG-3002",
        sender: "system",
        content: "Ticket assigned to Sophia Chen",
        timestamp: "2023-04-09T10:18:00Z",
        isInternal: true,
      },
      {
        id: "MSG-3003",
        sender: "agent",
        content:
          "Hello James, I'm Sophia from the Billing Support team. I apologize for the confusion with your invoice. I'll look into this discrepancy right away and check your account history to verify the downgrade from premium to basic plan. I'll get back to you as soon as I have more information.",
        timestamp: "2023-04-09T10:30:00Z",
      },
      {
        id: "MSG-3004",
        sender: "agent",
        content:
          "I've checked your account history and I can confirm that you requested a downgrade on March 15th. However, according to our records, the downgrade was scheduled to take effect at the end of your billing cycle, which was April 5th. This is why your latest invoice still shows the premium plan charges. For future reference, plan changes take effect at the end of the current billing cycle unless specifically requested as immediate. Would you like me to process a refund for the difference between the premium and basic plans?",
        timestamp: "2023-04-09T11:15:00Z",
      },
      {
        id: "MSG-3005",
        sender: "customer",
        content:
          "I see, I wasn't aware of that policy. Yes, please process a refund for the difference. Also, can you confirm that my next invoice will correctly show the basic plan charges?",
        timestamp: "2023-04-09T14:20:00Z",
      },
      {
        id: "MSG-3006",
        sender: "agent",
        content:
          "I've processed a refund of $50, which is the difference between the premium and basic plans. You should see this credited back to your payment method within 3-5 business days. And yes, I can confirm that your next invoice will correctly reflect the basic plan charges. Your account is now properly set to the basic plan. Is there anything else I can help you with?",
        timestamp: "2023-04-10T09:45:00Z",
      },
      {
        id: "MSG-3007",
        sender: "customer",
        content: "That's all, thank you for your help!",
        timestamp: "2023-04-10T11:30:00Z",
      },
    ],
    responseTime: 15,
    aiSuggestions: [
      {
        id: "SUGG-201",
        type: "response",
        content:
          "I apologize for the confusion with your invoice. I'll look into this discrepancy right away and check your account history to verify the downgrade from premium to basic plan. I'll get back to you as soon as I have more information.",
        confidence: 0.89,
        used: true,
      },
      {
        id: "SUGG-202",
        type: "category",
        content: "Billing",
        confidence: 0.97,
        used: true,
      },
      {
        id: "SUGG-203",
        type: "priority",
        content: "medium",
        confidence: 0.85,
        used: true,
      },
      {
        id: "SUGG-204",
        type: "knowledge",
        content: "KB-1056: Understanding Billing Cycles and Plan Changes",
        confidence: 0.93,
        used: false,
      },
    ],
  },
  {
    id: "TKT-1003",
    subject: "Feature request: Dark mode for mobile app",
    description:
      "I love your mobile app but using it at night is hard on the eyes. Could you please add a dark mode option? Many other apps have this feature and it would greatly improve user experience.",
    status: "new",
    priority: "low",
    category: "Feature Request",
    createdAt: "2023-04-10T18:20:00Z",
    updatedAt: "2023-04-10T18:20:00Z",
    customer: {
      id: "CUST-503",
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tier: "free",
      timezone: "America/Los_Angeles",
      language: "English",
      lastContact: "2023-02-15T16:40:00Z",
      totalTickets: 1,
      sentiment: "positive",
      lifetimeValue: 0,
    },
    tags: ["feature-request", "mobile-app", "dark-mode"],
    messages: [
      {
        id: "MSG-4001",
        sender: "customer",
        content:
          "I love your mobile app but using it at night is hard on the eyes. Could you please add a dark mode option? Many other apps have this feature and it would greatly improve user experience.",
        timestamp: "2023-04-10T18:20:00Z",
      },
    ],
    aiSuggestions: [
      {
        id: "SUGG-301",
        type: "response",
        content:
          "Thank you for your feedback about our mobile app! We appreciate you taking the time to suggest a dark mode feature. This is actually something our product team has been considering, and your feedback helps us prioritize future developments. I've forwarded your request to our product team. While I can't provide a specific timeline for implementation, I want you to know that we value this kind of user input. Would you be interested in participating in beta testing if we develop this feature?",
        confidence: 0.94,
        used: false,
      },
      {
        id: "SUGG-302",
        type: "category",
        content: "Feature Request",
        confidence: 0.96,
        used: true,
      },
      {
        id: "SUGG-303",
        type: "priority",
        content: "low",
        confidence: 0.82,
        used: true,
      },
      {
        id: "SUGG-304",
        type: "agent",
        content: "AGT-105",
        confidence: 0.88,
        used: false,
      },
    ],
  },
  {
    id: "TKT-1004",
    subject: "Integration with Salesforce not working",
    description:
      "We recently set up the integration with Salesforce but data isn't syncing properly. We've followed all the steps in the documentation but customer data from the last week isn't showing up in our Salesforce account.",
    status: "open",
    priority: "urgent",
    category: "Integrations",
    createdAt: "2023-04-10T09:45:00Z",
    updatedAt: "2023-04-10T10:30:00Z",
    customer: {
      id: "CUST-504",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      company: "Johnson & Partners",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tier: "enterprise",
      timezone: "America/Chicago",
      language: "English",
      lastContact: "2023-04-01T14:15:00Z",
      totalTickets: 8,
      sentiment: "negative",
      lifetimeValue: 20000,
    },
    assignee: {
      id: "AGT-103",
      name: "Daniel Kim",
      email: "daniel.kim@support.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      role: "agent",
      department: "Technical Support",
      status: "available",
      expertise: ["API", "Integrations", "Salesforce"],
      performance: {
        responseTime: 10,
        resolutionTime: 180,
        satisfaction: 96,
        ticketsResolved: 412,
      },
    },
    tags: ["integration", "salesforce", "sync-issue", "enterprise"],
    messages: [
      {
        id: "MSG-5001",
        sender: "customer",
        content:
          "We recently set up the integration with Salesforce but data isn't syncing properly. We've followed all the steps in the documentation but customer data from the last week isn't showing up in our Salesforce account.",
        timestamp: "2023-04-10T09:45:00Z",
      },
      {
        id: "MSG-5002",
        sender: "system",
        content: "Ticket assigned to Daniel Kim",
        timestamp: "2023-04-10T09:47:00Z",
        isInternal: true,
      },
      {
        id: "MSG-5003",
        sender: "agent",
        content:
          "Hello Robert, I'm Daniel from the Technical Support team. I understand you're experiencing issues with the Salesforce integration. This is definitely a priority, and I'll help you resolve this as quickly as possible. To better diagnose the issue, could you please provide me with your Salesforce instance URL and the last successful sync date according to your logs? Also, have you made any changes to your Salesforce configuration or our API settings recently?",
        timestamp: "2023-04-10T10:00:00Z",
      },
      {
        id: "MSG-5004",
        sender: "agent",
        content:
          "While I wait for your response, I've checked our system logs and noticed there might be an issue with the API key permissions for your account. There was a recent update to our Salesforce connector that requires additional permissions. I'll prepare the steps to update your integration configuration so we can resolve this quickly once I have more information from you.",
        timestamp: "2023-04-10T10:30:00Z",
      },
    ],
    responseTime: 15,
    aiSuggestions: [
      {
        id: "SUGG-401",
        type: "response",
        content:
          "I understand you're experiencing issues with the Salesforce integration. This is definitely a priority, and I'll help you resolve this as quickly as possible. To better diagnose the issue, could you please provide me with your Salesforce instance URL and the last successful sync date according to your logs? Also, have you made any changes to your Salesforce configuration or our API settings recently?",
        confidence: 0.91,
        used: true,
      },
      {
        id: "SUGG-402",
        type: "category",
        content: "Integrations",
        confidence: 0.98,
        used: true,
      },
      {
        id: "SUGG-403",
        type: "priority",
        content: "urgent",
        confidence: 0.89,
        used: true,
      },
      {
        id: "SUGG-404",
        type: "agent",
        content: "AGT-103",
        confidence: 0.95,
        used: true,
      },
    ],
  },
  {
    id: "TKT-1005",
    subject: "How to export data in CSV format?",
    description:
      "I need to export my customer data for a presentation. Is there a way to export it in CSV format? I couldn't find this option in the dashboard.",
    status: "resolved",
    priority: "medium",
    category: "How-to",
    createdAt: "2023-04-08T13:10:00Z",
    updatedAt: "2023-04-08T14:25:00Z",
    customer: {
      id: "CUST-505",
      name: "Sarah Lee",
      email: "sarah.lee@example.com",
      company: "Lee Enterprises",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      tier: "premium",
      timezone: "Asia/Tokyo",
      language: "English",
      lastContact: "2023-03-20T11:30:00Z",
      totalTickets: 4,
      sentiment: "neutral",
      lifetimeValue: 5000,
    },
    assignee: {
      id: "AGT-104",
      name: "Michael Brown",
      email: "michael.brown@support.com",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      role: "agent",
      department: "Product Support",
      status: "available",
      expertise: ["Data Export", "Reporting", "Dashboard"],
      performance: {
        responseTime: 14,
        resolutionTime: 120,
        satisfaction: 95,
        ticketsResolved: 378,
      },
    },
    tags: ["data-export", "csv", "dashboard"],
    messages: [
      {
        id: "MSG-6001",
        sender: "customer",
        content:
          "I need to export my customer data for a presentation. Is there a way to export it in CSV format? I couldn't find this option in the dashboard.",
        timestamp: "2023-04-08T13:10:00Z",
      },
      {
        id: "MSG-6002",
        sender: "system",
        content: "Ticket assigned to Michael Brown",
        timestamp: "2023-04-08T13:12:00Z",
        isInternal: true,
      },
      {
        id: "MSG-6003",
        sender: "agent",
        content:
          "Hi Sarah, I'm Michael from Product Support. Yes, you can definitely export your customer data in CSV format. Here's how to do it:\n\n1. Go to the 'Reports' section in your dashboard\n2. Select 'Customer Data' from the dropdown menu\n3. Use the filters to select the data you want to export\n4. Click the 'Export' button in the top-right corner\n5. Select 'CSV' as the export format\n\nThe export will begin processing and you'll receive an email when it's ready to download. For large datasets, this might take a few minutes.\n\nLet me know if you have any questions or if you encounter any issues with these steps!",
        timestamp: "2023-04-08T13:25:00Z",
      },
      {
        id: "MSG-6004",
        sender: "customer",
        content:
          "Thank you, Michael! I found the export option and was able to download my data. This is exactly what I needed for my presentation.",
        timestamp: "2023-04-08T14:15:00Z",
      },
      {
        id: "MSG-6005",
        sender: "agent",
        content:
          "You're welcome, Sarah! I'm glad you were able to export your data successfully. If you need any help with formatting or analyzing the data for your presentation, feel free to reach out. Is there anything else I can assist you with today?",
        timestamp: "2023-04-08T14:25:00Z",
      },
      {
        id: "MSG-6006",
        sender: "customer",
        content: "No, that's all I needed. Thanks again for your help!",
        timestamp: "2023-04-08T14:30:00Z",
      },
      {
        id: "MSG-6007",
        sender: "system",
        content: "Ticket resolved by Michael Brown",
        timestamp: "2023-04-08T14:35:00Z",
        isInternal: true,
      },
    ],
    responseTime: 15,
    resolutionTime: 85,
    satisfaction: "satisfied",
    aiSuggestions: [
      {
        id: "SUGG-501",
        type: "response",
        content:
          "Yes, you can definitely export your customer data in CSV format. Here's how to do it:\n\n1. Go to the 'Reports' section in your dashboard\n2. Select 'Customer Data' from the dropdown menu\n3. Use the filters to select the data you want to export\n4. Click the 'Export' button in the top-right corner\n5. Select 'CSV' as the export format\n\nThe export will begin processing and you'll receive an email when it's ready to download. For large datasets, this might take a few minutes.\n\nLet me know if you have any questions or if you encounter any issues with these steps!",
        confidence: 0.96,
        used: true,
      },
      {
        id: "SUGG-502",
        type: "category",
        content: "How-to",
        confidence: 0.94,
        used: true,
      },
      {
        id: "SUGG-503",
        type: "priority",
        content: "medium",
        confidence: 0.87,
        used: true,
      },
      {
        id: "SUGG-504",
        type: "knowledge",
        content: "KB-3045: Exporting Data in Different Formats",
        confidence: 0.92,
        used: false,
      },
    ],
  },
];

export const agents: Agent[] = [
  {
    id: "AGT-101",
    name: "Alex Rivera",
    email: "alex.rivera@support.com",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    role: "agent",
    department: "Technical Support",
    status: "available",
    expertise: ["Account Management", "Authentication", "Password Recovery"],
    performance: {
      responseTime: 12,
      resolutionTime: 240,
      satisfaction: 94,
      ticketsResolved: 342,
    },
  },
  {
    id: "AGT-102",
    name: "Sophia Chen",
    email: "sophia.chen@support.com",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    role: "agent",
    department: "Billing Support",
    status: "busy",
    expertise: ["Invoicing", "Refunds", "Subscription Management"],
    performance: {
      responseTime: 18,
      resolutionTime: 360,
      satisfaction: 92,
      ticketsResolved: 289,
    },
  },
  {
    id: "AGT-103",
    name: "Daniel Kim",
    email: "daniel.kim@support.com",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    role: "agent",
    department: "Technical Support",
    status: "available",
    expertise: ["API", "Integrations", "Salesforce"],
    performance: {
      responseTime: 10,
      resolutionTime: 180,
      satisfaction: 96,
      ticketsResolved: 412,
    },
  },
  {
    id: "AGT-104",
    name: "Michael Brown",
    email: "michael.brown@support.com",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    role: "agent",
    department: "Product Support",
    status: "available",
    expertise: ["Data Export", "Reporting", "Dashboard"],
    performance: {
      responseTime: 14,
      resolutionTime: 120,
      satisfaction: 95,
      ticketsResolved: 378,
    },
  },
  {
    id: "AGT-105",
    name: "Emily Johnson",
    email: "emily.johnson@support.com",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    role: "supervisor",
    department: "Customer Success",
    status: "available",
    expertise: [
      "Customer Retention",
      "Account Management",
      "Upselling",
      "Product Training",
    ],
    performance: {
      responseTime: 15,
      resolutionTime: 200,
      satisfaction: 97,
      ticketsResolved: 325,
    },
  },
];

export const knowledgeBase: KnowledgeBaseArticle[] = [
  {
    id: "KB-1001",
    title: "How to Reset Your Password",
    content:
      "This article guides you through the process of resetting your password if you&apos;ve forgotten it or need to change it for security reasons...",
    category: "Account Management",
    tags: ["password", "reset", "account", "login"],
    views: 1245,
    helpful: 1089,
    lastUpdated: "2023-03-15T10:30:00Z",
    relatedArticles: ["KB-1002", "KB-1003"],
  },
  {
    id: "KB-1002",
    title: "Understanding Your Invoice",
    content:
      "This article explains how to read and understand your monthly invoice, including charges, credits, and proration...",
    category: "Billing",
    tags: ["invoice", "billing", "charges", "payment"],
    views: 876,
    helpful: 750,
    lastUpdated: "2023-02-28T14:45:00Z",
    relatedArticles: ["KB-1004", "KB-1005"],
  },
  {
    id: "KB-1003",
    title: "Setting Up Salesforce Integration",
    content:
      "Learn how to integrate our platform with Salesforce to sync customer data, transactions, and support tickets...",
    category: "Integrations",
    tags: ["salesforce", "integration", "sync", "api"],
    views: 654,
    helpful: 598,
    lastUpdated: "2023-03-20T09:15:00Z",
    relatedArticles: ["KB-1006", "KB-1007"],
  },
  {
    id: "KB-1004",
    title: "Exporting Data in Different Formats",
    content:
      "This guide shows you how to export your data in various formats including CSV, Excel, PDF, and JSON...",
    category: "Data Management",
    tags: ["export", "data", "csv", "excel", "pdf", "json"],
    views: 789,
    helpful: 720,
    lastUpdated: "2023-03-10T11:20:00Z",
    relatedArticles: ["KB-1008", "KB-1009"],
  },
  {
    id: "KB-1005",
    title: "Troubleshooting Common API Errors",
    content:
      "This article helps you identify and resolve common API errors, including authentication issues, rate limiting, and data format problems...",
    category: "API",
    tags: ["api", "errors", "troubleshooting", "authentication"],
    views: 932,
    helpful: 875,
    lastUpdated: "2023-03-25T16:40:00Z",
    relatedArticles: ["KB-1010", "KB-1011"],
  },
];

export const automationRules: AutomationRule[] = [
  {
    id: "RULE-101",
    name: "High Priority for Enterprise Customers",
    conditions: [
      {
        field: "customer.tier",
        operator: "equals",
        value: "enterprise",
      },
    ],
    actions: [
      {
        type: "set_priority",
        value: "high",
      },
    ],
    active: true,
    createdAt: "2023-01-15T09:30:00Z",
    lastTriggered: "2023-04-10T09:47:00Z",
    triggerCount: 156,
  },
  {
    id: "RULE-102",
    name: "Auto-assign Billing Issues",
    conditions: [
      {
        field: "ticket.category",
        operator: "equals",
        value: "Billing",
      },
    ],
    actions: [
      {
        type: "assign_department",
        value: "Billing Support",
      },
    ],
    active: true,
    createdAt: "2023-01-20T14:15:00Z",
    lastTriggered: "2023-04-09T10:18:00Z",
    triggerCount: 243,
  },
  {
    id: "RULE-103",
    name: "Auto-respond to Feature Requests",
    conditions: [
      {
        field: "ticket.category",
        operator: "equals",
        value: "Feature Request",
      },
    ],
    actions: [
      {
        type: "send_auto_response",
        value: "TEMPLATE-201",
      },
    ],
    active: true,
    createdAt: "2023-02-05T11:45:00Z",
    lastTriggered: "2023-04-10T18:22:00Z",
    triggerCount: 87,
  },
  {
    id: "RULE-104",
    name: "Escalate Urgent Tickets",
    conditions: [
      {
        field: "ticket.priority",
        operator: "equals",
        value: "urgent",
      },
      {
        field: "ticket.status",
        operator: "equals",
        value: "open",
      },
      {
        field: "ticket.updated_at",
        operator: "older_than",
        value: "30m",
      },
    ],
    actions: [
      {
        type: "escalate",
        value: "supervisor",
      },
      {
        type: "send_notification",
        value: "team_lead",
      },
    ],
    active: true,
    createdAt: "2023-02-10T16:20:00Z",
    lastTriggered: "2023-04-10T10:17:00Z",
    triggerCount: 42,
  },
  {
    id: "RULE-105",
    name: "Tag Tickets with Negative Sentiment",
    conditions: [
      {
        field: "customer.sentiment",
        operator: "equals",
        value: "negative",
      },
    ],
    actions: [
      {
        type: "add_tag",
        value: "negative-sentiment",
      },
      {
        type: "set_priority",
        value: "high",
      },
    ],
    active: true,
    createdAt: "2023-03-01T10:10:00Z",
    lastTriggered: "2023-04-10T14:32:00Z",
    triggerCount: 118,
  },
];

export const insightData: InsightData = {
  ticketVolume: [
    { date: "2023-04-04", count: 42 },
    { date: "2023-04-05", count: 38 },
    { date: "2023-04-06", count: 45 },
    { date: "2023-04-07", count: 39 },
    { date: "2023-04-08", count: 28 },
    { date: "2023-04-09", count: 25 },
    { date: "2023-04-10", count: 47 },
  ],
  responseTime: [
    { date: "2023-04-04", time: 14 },
    { date: "2023-04-05", time: 16 },
    { date: "2023-04-06", time: 12 },
    { date: "2023-04-07", time: 15 },
    { date: "2023-04-08", time: 13 },
    { date: "2023-04-09", time: 14 },
    { date: "2023-04-10", time: 11 },
  ],
  resolutionTime: [
    { date: "2023-04-04", time: 240 },
    { date: "2023-04-05", time: 210 },
    { date: "2023-04-06", time: 255 },
    { date: "2023-04-07", time: 225 },
    { date: "2023-04-08", time: 195 },
    { date: "2023-04-09", time: 230 },
    { date: "2023-04-10", time: 205 },
  ],
  responseResolutionTime: [
    { date: "2023-04-04", responseTime: 14, resolutionTime: 9 },
    { date: "2023-04-05", responseTime: 16, resolutionTime: 10 },
    { date: "2023-04-06", responseTime: 12, resolutionTime: 12 },
    { date: "2023-04-07", responseTime: 15, resolutionTime: 10 },
    { date: "2023-04-08", responseTime: 13, resolutionTime: 4 },
    { date: "2023-04-09", responseTime: 14, resolutionTime: 5 },
    { date: "2023-04-10", responseTime: 11, resolutionTime: 14 },
  ],
  satisfaction: [
    { date: "2023-04-04", score: 92 },
    { date: "2023-04-05", score: 94 },
    { date: "2023-04-06", score: 91 },
    { date: "2023-04-07", score: 93 },
    { date: "2023-04-08", score: 95 },
    { date: "2023-04-09", score: 92 },
    { date: "2023-04-10", score: 94 },
  ],
  categoryDistribution: [
    { name: "Account Access", value: 28 },
    { name: "Billing", value: 22 },
    { name: "Technical Support", value: 35 },
    { name: "Feature Request", value: 15 },
    { name: "How-to", value: 20 },
  ],
  agentPerformance: [
    {
      agent: "Alex Rivera",
      responseTime: 12,
      resolutionTime: 240,
      satisfaction: 94,
      ticketsResolved: 342,
    },
    {
      agent: "Sophia Chen",
      responseTime: 18,
      resolutionTime: 360,
      satisfaction: 92,
      ticketsResolved: 289,
    },
    {
      agent: "Daniel Kim",
      responseTime: 10,
      resolutionTime: 180,
      satisfaction: 96,
      ticketsResolved: 412,
    },
    {
      agent: "Michael Brown",
      responseTime: 14,
      resolutionTime: 120,
      satisfaction: 95,
      ticketsResolved: 378,
    },
    {
      agent: "Emily Johnson",
      responseTime: 15,
      resolutionTime: 200,
      satisfaction: 97,
      ticketsResolved: 325,
    },
  ],
};

export const aiInsights: AIInsight[] = [
  {
    id: "INSIGHT-101",
    type: "trend",
    title: "Increasing Account Access Issues",
    description:
      "There has been a 27% increase in account access related tickets over the past week, primarily from mobile app users. This correlates with the recent app update (v2.4.0) released on April 3rd.",
    impact: "negative",
    confidence: 0.92,
    category: "Technical",
    createdAt: "2023-04-10T08:30:00Z",
    relatedData: {
      ticketIds: ["TKT-1001", "TKT-998", "TKT-982", "TKT-975"],
      timeframe: "past_week",
      comparisonPeriod: "previous_week",
    },
  },
  {
    id: "INSIGHT-102",
    type: "anomaly",
    title: "Unusual Spike in Enterprise Customer Tickets",
    description:
      "Enterprise customers have submitted 45% more tickets than usual in the past 48 hours, primarily related to API and integration issues. This may indicate a potential problem with the latest API update.",
    impact: "negative",
    confidence: 0.88,
    category: "Technical",
    createdAt: "2023-04-10T09:15:00Z",
    relatedData: {
      ticketIds: ["TKT-1004", "TKT-1000", "TKT-997", "TKT-990"],
      timeframe: "past_48h",
      comparisonPeriod: "average_48h",
    },
  },
  {
    id: "INSIGHT-103",
    type: "suggestion",
    title: "Knowledge Base Article Update Needed",
    description:
      "The 'Password Reset' article (KB-1001) has been referenced in 35 tickets in the past month, but 40% of customers still needed additional support after reading it. Consider updating the article with clearer instructions and screenshots for the new user interface.",
    impact: "neutral",
    confidence: 0.94,
    category: "Content",
    createdAt: "2023-04-09T14:20:00Z",
    relatedData: {
      articleId: "KB-1001",
      ticketCount: 35,
      additionalSupportRate: 0.4,
      timeframe: "past_month",
    },
  },
  {
    id: "INSIGHT-104",
    type: "prediction",
    title: "Expected Increase in Billing Inquiries",
    description:
      "Based on historical patterns, we predict a 30-40% increase in billing-related tickets between April 15-20 due to the upcoming quarterly billing cycle. Consider preparing response templates and ensuring adequate staffing in the Billing department during this period.",
    impact: "neutral",
    confidence: 0.85,
    category: "Operational",
    createdAt: "2023-04-10T11:45:00Z",
    relatedData: {
      predictedTicketIncrease: "30-40%",
      timeframe: "April 15-20",
      historicalPattern: "quarterly_billing",
      recommendedAction: "staffing_adjustment",
    },
  },
  {
    id: "INSIGHT-105",
    type: "suggestion",
    title: "Agent Training Opportunity",
    description:
      "Agents in the Technical Support department have a 15% longer average resolution time for Salesforce integration issues compared to other integration types. Consider providing additional training or creating specialized documentation for this integration.",
    impact: "neutral",
    confidence: 0.89,
    category: "Training",
    createdAt: "2023-04-08T16:30:00Z",
    relatedData: {
      department: "Technical Support",
      issueType: "Salesforce Integration",
      performanceDifference: "15% longer resolution",
      comparisonGroup: "other_integrations",
    },
  },
];
