// Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // in hours
  progress: number;
  image: string;
  tags: string[];
  rating: number;
  enrolled: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  progress: number;
  estimatedTime: number; // in hours
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface StudySession {
  id: string;
  title: string;
  date: string;
  duration: number; // in minutes
  completed: boolean;
  courseId: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  completed: boolean;
}

export interface Recommendation {
  id: string;
  type: "course" | "resource" | "practice" | "path";
  title: string;
  description: string;
  reason: string;
  priority: "high" | "medium" | "low";
  link: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  attachments?: {
    type: "course" | "path" | "resource";
    id: string;
    title: string;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  lastPracticed: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "book" | "exercise";
  link: string;
  duration: number; // in minutes
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// Mock data
export const courses: Course[] = [
  {
    id: "c1",
    title: "Introduction to Machine Learning",
    description:
      "Learn the fundamentals of machine learning algorithms and applications.",
    category: "Data Science",
    level: "beginner",
    duration: 20,
    progress: 65,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tags: ["Python", "ML", "Data Science"],
    rating: 4.8,
    enrolled: true,
  },
  {
    id: "c2",
    title: "Advanced JavaScript Concepts",
    description:
      "Deep dive into advanced JavaScript concepts like closures, prototypes, and async patterns.",
    category: "Web Development",
    level: "advanced",
    duration: 15,
    progress: 30,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tags: ["JavaScript", "Web", "Programming"],
    rating: 4.9,
    enrolled: true,
  },
  {
    id: "c3",
    title: "UX Design Principles",
    description:
      "Master the principles of user experience design and create intuitive interfaces.",
    category: "Design",
    level: "intermediate",
    duration: 12,
    progress: 0,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tags: ["UX", "Design", "UI"],
    rating: 4.7,
    enrolled: false,
  },
  {
    id: "c4",
    title: "Data Structures and Algorithms",
    description:
      "Comprehensive guide to data structures and algorithms with practical examples.",
    category: "Computer Science",
    level: "intermediate",
    duration: 25,
    progress: 10,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tags: ["DSA", "Programming", "Algorithms"],
    rating: 4.6,
    enrolled: true,
  },
  {
    id: "c5",
    title: "Cloud Computing Fundamentals",
    description:
      "Introduction to cloud computing concepts, services, and deployment models.",
    category: "Cloud Computing",
    level: "beginner",
    duration: 18,
    progress: 0,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tags: ["Cloud", "AWS", "Azure"],
    rating: 4.5,
    enrolled: false,
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: "p1",
    title: "Become a Full-Stack Developer",
    description:
      "Comprehensive path to master both frontend and backend development.",
    courses: ["c2", "c4"],
    progress: 25,
    estimatedTime: 120,
    difficulty: "intermediate",
  },
  {
    id: "p2",
    title: "Data Science Career Path",
    description:
      "Complete journey from statistics basics to advanced machine learning.",
    courses: ["c1", "c4"],
    progress: 40,
    estimatedTime: 150,
    difficulty: "advanced",
  },
  {
    id: "p3",
    title: "UX/UI Design Mastery",
    description: "From design principles to creating professional interfaces.",
    courses: ["c3"],
    progress: 0,
    estimatedTime: 80,
    difficulty: "intermediate",
  },
];

export const studySessions: StudySession[] = [
  {
    id: "s1",
    title: "Machine Learning Basics",
    date: "2023-04-10",
    duration: 60,
    completed: true,
    courseId: "c1",
  },
  {
    id: "s2",
    title: "JavaScript Closures",
    date: "2023-04-12",
    duration: 45,
    completed: true,
    courseId: "c2",
  },
  {
    id: "s3",
    title: "Sorting Algorithms",
    date: "2023-04-15",
    duration: 90,
    completed: false,
    courseId: "c4",
  },
];

export const goals: Goal[] = [
  {
    id: "g1",
    title: "Complete Machine Learning Course",
    description: "Finish all modules and projects in the ML course",
    deadline: "2023-05-30",
    progress: 65,
    completed: false,
  },
  {
    id: "g2",
    title: "Build Portfolio Website",
    description: "Create a personal portfolio showcasing projects",
    deadline: "2023-06-15",
    progress: 40,
    completed: false,
  },
  {
    id: "g3",
    title: "Learn React Native",
    description: "Master React Native for mobile app development",
    deadline: "2023-07-20",
    progress: 10,
    completed: false,
  },
];

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    type: "course",
    title: "Deep Learning Specialization",
    description: "Advanced deep learning techniques and neural networks",
    reason: "Based on your interest in Machine Learning",
    priority: "high",
    link: "#",
  },
  {
    id: "r2",
    type: "resource",
    title: "JavaScript: The Good Parts",
    description: "Essential book on JavaScript best practices",
    reason: "Complements your Advanced JavaScript course",
    priority: "medium",
    link: "#",
  },
  {
    id: "r3",
    type: "practice",
    title: "Algorithm Challenges",
    description: "Practice sorting and searching algorithms",
    reason: "Strengthen your algorithm skills",
    priority: "high",
    link: "#",
  },
  {
    id: "r4",
    type: "path",
    title: "Cloud Architecture Path",
    description: "Comprehensive path to become a cloud architect",
    reason: "Expands your technical skillset",
    priority: "low",
    link: "#",
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "ai",
    content:
      "Hello! I'm your AI learning assistant. How can I help you with your studies today?",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "m2",
    sender: "user",
    content:
      "I'm struggling with understanding machine learning algorithms. Can you help?",
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: "m3",
    sender: "ai",
    content:
      "I'd be happy to help! Let's break down machine learning algorithms into simpler concepts. Would you like to focus on supervised learning, unsupervised learning, or reinforcement learning first?",
    timestamp: new Date(Date.now() - 3400000),
  },
  {
    id: "m4",
    sender: "user",
    content: "Let's start with supervised learning.",
    timestamp: new Date(Date.now() - 3300000),
  },
  {
    id: "m5",
    sender: "ai",
    content:
      "Great choice! Supervised learning is like learning with a teacher. The algorithm learns from labeled training data and makes predictions based on that learning.\n\nHere are some common supervised learning algorithms:\n\n1. Linear Regression - for predicting continuous values\n2. Logistic Regression - for binary classification\n3. Decision Trees - for classification and regression\n4. Support Vector Machines - for classification tasks\n\nI've also found a great resource in your current course that explains this well. Would you like me to create a study session focused on supervised learning algorithms?",
    timestamp: new Date(Date.now() - 3200000),
    attachments: [
      {
        type: "course",
        id: "c1",
        title: "Introduction to Machine Learning",
      },
    ],
  },
];

export const skills: Skill[] = [
  { id: "sk1", name: "Python", level: 75, lastPracticed: "2023-04-08" },
  { id: "sk2", name: "JavaScript", level: 85, lastPracticed: "2023-04-12" },
  {
    id: "sk3",
    name: "Machine Learning",
    level: 60,
    lastPracticed: "2023-04-10",
  },
  {
    id: "sk4",
    name: "Data Structures",
    level: 70,
    lastPracticed: "2023-04-05",
  },
  { id: "sk5", name: "UX Design", level: 40, lastPracticed: "2023-03-20" },
];

export const resources: Resource[] = [
  {
    id: "res1",
    title: "Understanding Neural Networks",
    type: "article",
    link: "#",
    duration: 15,
    completed: true,
  },
  {
    id: "res2",
    title: "JavaScript Promises Explained",
    type: "video",
    link: "#",
    duration: 25,
    completed: false,
  },
  {
    id: "res3",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    type: "book",
    link: "#",
    duration: 480,
    completed: false,
  },
  {
    id: "res4",
    title: "Sorting Algorithm Practice",
    type: "exercise",
    link: "#",
    duration: 45,
    completed: true,
  },
];

export const notes: Note[] = [
  {
    id: "n1",
    title: "Machine Learning Models Overview",
    content:
      "Key differences between supervised and unsupervised learning models...",
    courseId: "c1",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-07",
    tags: ["ML", "Models", "Important"],
  },
  {
    id: "n2",
    title: "JavaScript Closure Notes",
    content:
      "Closures are functions that have access to variables from an outer function scope...",
    courseId: "c2",
    createdAt: "2023-04-11",
    updatedAt: "2023-04-11",
    tags: ["JavaScript", "Closures"],
  },
];

// Chart data
export const weeklyStudyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 90 },
  { day: "Fri", minutes: 45 },
  { day: "Sat", minutes: 120 },
  { day: "Sun", minutes: 75 },
];

export const subjectDistributionData = [
  { name: "Data Science", value: 35 },
  { name: "Web Development", value: 25 },
  { name: "Computer Science", value: 20 },
  { name: "Design", value: 10 },
  { name: "Other", value: 10 },
];

export const COLORS = ["#8b5cf6", "#6366f1", "#3b82f6", "#10b981", "#f59e0b"];

export const progressTrendData = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 35 },
  { month: "Mar", progress: 45 },
  { month: "Apr", progress: 65 },
  { month: "May", progress: 75 },
];
