// Types
export type Symptom = {
  id: string;
  name: string;
  severity: "Mild" | "Moderate" | "Severe";
  duration: string;
  frequency: string;
  description: string;
  relatedConditions: string[];
};

export type Medication = {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  form: "Tablet" | "Capsule" | "Liquid" | "Injection" | "Topical";
  frequency: string;
  purpose: string;
  sideEffects: string[];
  warnings: string[];
  interactions: string[];
  imageUrl: string;
  manufacturer: string;
  price: number;
  currency: string;
  requiresPrescription: boolean;
};

export type HealthRecord = {
  id: string;
  type: "Allergy" | "Condition" | "Vaccination" | "Surgery" | "Test";
  name: string;
  date: string;
  details: string;
  provider?: string;
};

export type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes: string;
};

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  weight: number;
  height: number;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  healthRecords: HealthRecord[];
  appointments: Appointment[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  medicationSuggestions?: Medication[];
  feedback?: "like" | "dislike" | null;
};

// Sample data
export const sampleSymptoms: Symptom[] = [
  {
    id: "s1",
    name: "Headache",
    severity: "Moderate",
    duration: "3 hours",
    frequency: "Daily",
    description: "Throbbing pain in the forehead and temples",
    relatedConditions: ["Migraine", "Tension headache", "Sinusitis"],
  },
  {
    id: "s2",
    name: "Fatigue",
    severity: "Moderate",
    duration: "All day",
    frequency: "Daily",
    description: "Persistent tiredness and lack of energy",
    relatedConditions: [
      "Anemia",
      "Sleep apnea",
      "Depression",
      "Hypothyroidism",
    ],
  },
  {
    id: "s3",
    name: "Joint Pain",
    severity: "Mild",
    duration: "Several hours",
    frequency: "3-4 times per week",
    description: "Aching pain in knees and fingers",
    relatedConditions: ["Arthritis", "Rheumatoid arthritis", "Gout"],
  },
];

export const sampleMedications: Medication[] = [
  {
    id: "m1",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "NSAID",
    dosage: "200-400mg",
    form: "Tablet",
    frequency: "Every 4-6 hours as needed",
    purpose: "Pain relief, inflammation reduction",
    sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Mild headache"],
    warnings: [
      "Not for long-term use",
      "May increase risk of heart attack or stroke",
      "May cause stomach bleeding",
    ],
    interactions: ["Blood thinners", "Aspirin", "ACE inhibitors", "Diuretics"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    manufacturer: "Various",
    price: 8.99,
    currency: "$",
    requiresPrescription: false,
  },
  {
    id: "m2",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    dosage: "250-500mg",
    form: "Capsule",
    frequency: "Every 8 hours",
    purpose: "Treatment of bacterial infections",
    sideEffects: ["Diarrhea", "Stomach pain", "Nausea", "Vomiting", "Rash"],
    warnings: [
      "Complete full course of treatment",
      "May cause allergic reactions",
      "May reduce effectiveness of birth control pills",
    ],
    interactions: [
      "Probenecid",
      "Allopurinol",
      "Certain blood thinners",
      "Other antibiotics",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    manufacturer: "Various",
    price: 12.99,
    currency: "$",
    requiresPrescription: true,
  },
  {
    id: "m3",
    name: "Loratadine",
    genericName: "Loratadine",
    category: "Antihistamine",
    dosage: "10mg",
    form: "Tablet",
    frequency: "Once daily",
    purpose: "Relief of allergy symptoms",
    sideEffects: ["Headache", "Drowsiness", "Dry mouth", "Fatigue"],
    warnings: [
      "May cause drowsiness in some individuals",
      "Avoid alcohol",
      "Use caution when driving",
    ],
    interactions: ["Ketoconazole", "Erythromycin", "Cimetidine"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    manufacturer: "Various",
    price: 9.99,
    currency: "$",
    requiresPrescription: false,
  },
  {
    id: "m4",
    name: "Lisinopril",
    genericName: "Lisinopril",
    category: "ACE Inhibitor",
    dosage: "10-40mg",
    form: "Tablet",
    frequency: "Once daily",
    purpose: "Treatment of high blood pressure and heart failure",
    sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
    warnings: [
      "May cause kidney problems",
      "May cause high potassium levels",
      "Not safe during pregnancy",
    ],
    interactions: [
      "Potassium supplements",
      "Salt substitutes",
      "Lithium",
      "NSAIDs",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    manufacturer: "Various",
    price: 14.99,
    currency: "$",
    requiresPrescription: true,
  },
  {
    id: "m5",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    category: "Antidiabetic",
    dosage: "500-1000mg",
    form: "Tablet",
    frequency: "Twice daily with meals",
    purpose: "Management of type 2 diabetes",
    sideEffects: ["Nausea", "Diarrhea", "Stomach pain", "Metallic taste"],
    warnings: [
      "May cause lactic acidosis",
      "Not for patients with kidney disease",
      "Avoid excessive alcohol",
    ],
    interactions: [
      "Certain diabetes medications",
      "Cimetidine",
      "Furosemide",
      "Nifedipine",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    manufacturer: "Various",
    price: 11.99,
    currency: "$",
    requiresPrescription: true,
  },
];

export const sampleUserProfile: UserProfile = {
  id: "u1",
  name: "Alex Johnson",
  age: 42,
  gender: "Male",
  weight: 78,
  height: 175,
  bloodType: "O+",
  allergies: ["Penicillin", "Peanuts"],
  conditions: ["Hypertension", "Seasonal allergies"],
  medications: ["Lisinopril", "Loratadine"],
  healthRecords: [
    {
      id: "hr1",
      type: "Vaccination",
      name: "Influenza Vaccine",
      date: "2023-10-15",
      details: "Annual flu shot",
      provider: "Dr. Sarah Williams",
    },
    {
      id: "hr2",
      type: "Test",
      name: "Complete Blood Count",
      date: "2023-09-05",
      details: "All values within normal range",
      provider: "Quest Diagnostics",
    },
    {
      id: "hr3",
      type: "Surgery",
      name: "Appendectomy",
      date: "2010-03-22",
      details: "Laparoscopic procedure",
      provider: "Dr. Michael Chen",
    },
  ],
  appointments: [
    {
      id: "a1",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Cardiology",
      date: "2023-11-15",
      time: "10:30 AM",
      location: "Heart Health Clinic",
      notes: "Annual checkup",
    },
    {
      id: "a2",
      doctorName: "Dr. James Wilson",
      specialty: "General Practice",
      date: "2023-12-05",
      time: "2:15 PM",
      location: "Community Health Center",
      notes: "Follow-up on medication adjustment",
    },
  ],
};

export const sampleChatMessages: ChatMessage[] = [
  {
    id: "msg1",
    role: "assistant",
    content:
      "Hello! I'm your AI medical assistant. I can help you understand symptoms, learn about medications, and provide general health information. What can I help you with today?",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "msg2",
    role: "user",
    content: "I've been having headaches almost every day for the past week.",
    timestamp: new Date(Date.now() - 86300000).toISOString(),
  },
  {
    id: "msg3",
    role: "assistant",
    content:
      "I'm sorry to hear you&apos;ve been experiencing frequent headaches. This could be due to various factors such as stress, dehydration, eye strain, or tension. For persistent headaches, over-the-counter pain relievers might help. Here are some options:",
    timestamp: new Date(Date.now() - 86200000).toISOString(),
    medicationSuggestions: [sampleMedications[0]],
  },
];

// Health metrics data for charts
export const bloodPressureData = [
  { date: "2023-05-01", systolic: 135, diastolic: 85 },
  { date: "2023-06-01", systolic: 130, diastolic: 82 },
  { date: "2023-07-01", systolic: 128, diastolic: 80 },
  { date: "2023-08-01", systolic: 125, diastolic: 78 },
  { date: "2023-09-01", systolic: 122, diastolic: 76 },
  { date: "2023-10-01", systolic: 120, diastolic: 75 },
];

export const glucoseData = [
  { date: "2023-05-01", level: 110 },
  { date: "2023-06-01", level: 105 },
  { date: "2023-07-01", level: 102 },
  { date: "2023-08-01", level: 100 },
  { date: "2023-09-01", level: 98 },
  { date: "2023-10-01", level: 95 },
];

export const medicationAdherenceData = [
  { day: "Mon", percentage: 100 },
  { day: "Tue", percentage: 100 },
  { day: "Wed", percentage: 75 },
  { day: "Thu", percentage: 100 },
  { day: "Fri", percentage: 100 },
  { day: "Sat", percentage: 50 },
  { day: "Sun", percentage: 100 },
];
