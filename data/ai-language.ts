// Types
export interface Lesson {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  category: string;
  completed: boolean;
  progress: number;
}

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  category: string;
  mastered: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  participants: string[];
  preview: string;
}

export interface PracticeExercise {
  id: string;
  type: "translation" | "fill-in-blank" | "multiple-choice" | "listening";
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

// Mock data
export const lessons: Lesson[] = [
  {
    id: "l1",
    title: "Greetings and Introductions",
    level: "beginner",
    duration: 15,
    category: "conversation",
    completed: true,
    progress: 100,
  },
  {
    id: "l2",
    title: "Ordering Food and Drinks",
    level: "beginner",
    duration: 20,
    category: "conversation",
    completed: true,
    progress: 100,
  },
  {
    id: "l3",
    title: "Basic Grammar: Present Tense",
    level: "beginner",
    duration: 25,
    category: "grammar",
    completed: false,
    progress: 60,
  },
  {
    id: "l4",
    title: "Asking for Directions",
    level: "beginner",
    duration: 15,
    category: "conversation",
    completed: false,
    progress: 30,
  },
  {
    id: "l5",
    title: "Shopping Vocabulary",
    level: "beginner",
    duration: 20,
    category: "vocabulary",
    completed: false,
    progress: 0,
  },
];

export const vocabulary: Vocabulary[] = [
  {
    id: "v1",
    word: "Bonjour",
    translation: "Hello",
    pronunciation: "bohn-zhoor",
    example: "Bonjour, comment allez-vous?",
    category: "greetings",
    mastered: true,
  },
  {
    id: "v2",
    word: "Merci",
    translation: "Thank you",
    pronunciation: "mehr-see",
    example: "Merci beaucoup pour votre aide.",
    category: "greetings",
    mastered: true,
  },
  {
    id: "v3",
    word: "Restaurant",
    translation: "Restaurant",
    pronunciation: "res-toh-rahn",
    example: "Allons au restaurant ce soir.",
    category: "dining",
    mastered: false,
  },
  {
    id: "v4",
    word: "Café",
    translation: "Coffee",
    pronunciation: "ka-fay",
    example: "Je voudrais un café, s'il vous plaît.",
    category: "dining",
    mastered: false,
  },
  {
    id: "v5",
    word: "Bibliothèque",
    translation: "Library",
    pronunciation: "bee-blee-oh-tek",
    example: "Je vais étudier à la bibliothèque.",
    category: "places",
    mastered: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    title: "At the Café",
    level: "beginner",
    participants: ["Customer", "Waiter"],
    preview: "Bonjour, je voudrais un café s'il vous plaît.",
  },
  {
    id: "c2",
    title: "Meeting a Friend",
    level: "beginner",
    participants: ["Sophie", "Marc"],
    preview: "Salut Marc! Comment ça va?",
  },
  {
    id: "c3",
    title: "Asking for Directions",
    level: "intermediate",
    participants: ["Tourist", "Local"],
    preview: "Excusez-moi, où est la station de métro?",
  },
];

export const practiceExercises: PracticeExercise[] = [
  {
    id: "p1",
    type: "translation",
    question: 'Translate: "Hello, how are you?"',
    correctAnswer: "Bonjour, comment allez-vous?",
    explanation:
      '"Bonjour" means "Hello" and "Comment allez-vous?" means "How are you?"',
  },
  {
    id: "p2",
    type: "fill-in-blank",
    question: "Je _____ un café.",
    correctAnswer: "voudrais",
    explanation:
      '"Je voudrais un café" means "I would like a coffee." The verb "voudrais" is the conditional form of "vouloir" (to want).',
  },
  {
    id: "p3",
    type: "multiple-choice",
    question: 'Which phrase means "Thank you very much"?',
    options: [
      "Je vous en prie",
      "S'il vous plaît",
      "Merci beaucoup",
      "À bientôt",
    ],
    correctAnswer: "Merci beaucoup",
    explanation:
      '"Merci beaucoup" literally means "Thank you a lot" and is used to express gratitude.',
  },
  {
    id: "p4",
    type: "listening",
    question: 'Listen and type what you hear: [Audio: "Je m\'appelle Marie"]',
    correctAnswer: "Je m'appelle Marie",
    explanation:
      'This phrase means "My name is Marie." "Je m\'appelle" is how you introduce yourself in French.',
  },
];

// Progress data for charts
export const weeklyProgress = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 15 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 20 },
  { day: "Fri", minutes: 0 },
  { day: "Sat", minutes: 45 },
  { day: "Sun", minutes: 10 },
];

export const skillProgress = [
  { skill: "Vocabulary", progress: 65 },
  { skill: "Grammar", progress: 40 },
  { skill: "Listening", progress: 75 },
  { skill: "Speaking", progress: 50 },
  { skill: "Reading", progress: 60 },
  { skill: "Writing", progress: 35 },
];

// Initial chat messages
export const initialChatMessages: ChatMessage[] = [
  {
    id: "c1",
    sender: "user",
    content: 'Comment dit-on "library" en français?',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "c2",
    sender: "ai",
    content:
      '"Library" en français se dit "bibliothèque" (prononcé: bee-blee-oh-tek).\n\nExemple: "Je vais à la bibliothèque pour étudier." (I\'m going to the library to study.)\n\nVoulez-vous que je vous donne d\'autres mots liés aux lieux publics?',
    timestamp: new Date(Date.now() - 30000),
  },
];
