export interface PricingFeature {
  id: string;
  name: string;
  description?: string;
  tiers: {
    [key: string]: boolean | string | number | null;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    annually: number;
  };
  description: string;
  highlighted?: boolean;
  features?: {
    [key: string]: boolean | string | number | null;
  };
}

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: {
      monthly: 0,
      annually: 0,
    },
    description: "For individuals just getting started",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: {
      monthly: 15,
      annually: 144,
    },
    description: "For professionals and small teams",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    price: {
      monthly: 30,
      annually: 288,
    },
    description: "For growing businesses and teams",
    highlighted: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 100,
      annually: 960,
    },
    description: "For large organizations with custom needs",
    highlighted: false,
  },
];

export const pricingFeatures: PricingFeature[] = [
  {
    id: "storage",
    name: "Storage",
    description: "Cloud storage for your files and documents",
    tiers: {
      free: "5 GB",
      pro: "100 GB",
      business: "1 TB",
      enterprise: "Unlimited",
    },
  },
  {
    id: "users",
    name: "Team Members",
    description: "Number of users who can access your workspace",
    tiers: {
      free: "1 user",
      pro: "5 users",
      business: "20 users",
      enterprise: "Unlimited",
    },
  },
  {
    id: "projects",
    name: "Projects",
    description: "Number of active projects you can have",
    tiers: {
      free: "3",
      pro: "10",
      business: "50",
      enterprise: "Unlimited",
    },
  },
  {
    id: "support",
    name: "Customer Support",
    description: "Access to our support team",
    tiers: {
      free: false,
      pro: true,
      business: true,
      enterprise: true,
    },
  },
  {
    id: "api",
    name: "API Access",
    description: "Programmatic access to our platform",
    tiers: {
      free: false,
      pro: false,
      business: true,
      enterprise: true,
    },
  },
  {
    id: "sso",
    name: "Single Sign-On",
    description: "Enterprise-grade security with SSO",
    tiers: {
      free: false,
      pro: false,
      business: false,
      enterprise: true,
    },
  },
];
