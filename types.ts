import {
  categorySchema,
  changePasswordSchema,
  componentSchema,
  createPurchaseSchema,
  forgotPasswordSchema,
  notificationSchema,
  resetPasswordSchema,
  updatePurchaseSchema,
  updateStatusSchema,
  userLoginSchema,
  userProfileSchema,
  userRegistrationSchema,
  userSchema,
  userUpdateSchema,
} from "@/validation/schemas";
import { Pack, PaymentStatus, UserRole } from "@prisma/client";
import * as z from "zod";

// --------------------------- FORMS TYPES--------------------------------------------------------------------------------------
export type UserSchemaType = z.infer<typeof userSchema>;
export type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>;
export type UserRegistrationSchemaType = z.infer<typeof userRegistrationSchema>;
export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;
export type PasswordChangeSchemaType = z.infer<typeof changePasswordSchema>;
export type CategorySchemaType = z.infer<typeof categorySchema>;
export type ComponentSchemaType = z.infer<typeof componentSchema>;
export type NotificationSchemaType = z.infer<typeof notificationSchema>;
export type CreatePurchaseSchemaType = z.infer<typeof createPurchaseSchema>;
export type UpdatePurchaseSchemaType = z.infer<typeof updatePurchaseSchema>;
export type UpdateStatusSchemaType = z.infer<typeof updateStatusSchema>;

export type AutocompleteSuggestion =
  | SearchSuggestion
  | CategorySuggestion
  | KeywordSuggestion;

export type SessionUser = {
  name: string;
  id: string;
  email: string;
  image: string | null;
  role: UserRole;
  hasPurchased: boolean;
  purchasedComponents: string[]; // Array of component IDs the user has purchased
} | null;

interface SearchSuggestion {
  type: "search";
  query: string;
}

interface CategorySuggestion {
  type: "category";
  name: string;
}

interface KeywordSuggestion {
  type: "keyword";
  name: string;
}

export type ComponentType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isFree: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isAI: boolean;
  price: number | null;
  keywords: string[];
  category: {
    slug: string;
    name: string;
  };
  codeSnippets: {
    id: string;
    code: string;
    fileName: string;
    extension: string;
    language: string;
  }[];
};

export type Component = {
  id: string;
  slug: string;
  name: string;
  category: {
    name: string;
  };
  codeSnippets: {
    id: string;
    code: string;
    fileName: string;
    extension: string;
    language: string;
  }[];
};

export type OrderWithDetails = {
  id: string;
  orderNumber: string | null;
  amount: number;
  date: Date;
  status: PaymentStatus;
  isComponent: boolean;
  isBundle: boolean;
  isPack: boolean;
  pack: Pack | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  component: {
    id: string;
    name: string;
  } | null;
  address: string | null;
  phone: string | null;
  zipCode: string | null;
  createdAt: Date;
};
