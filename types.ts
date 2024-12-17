import {
  categorySchema,
  changePasswordSchema,
  componentSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userLoginSchema,
  userProfileSchema,
  userRegistrationSchema,
  userSchema,
  userUpdateSchema,
} from "@/validation/schemas";
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

export type AutocompleteSuggestion =
  | SearchSuggestion
  | CategorySuggestion
  | KeywordSuggestion;

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

export interface SearchResult {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  description: string | null;
  keywords: string[];
  isfree: boolean;
  category_name: string;
  rank: number;
  name_similarity: number;
  description_similarity: number;
  keywords_similarity: number;
  max_similarity: number;
}

export interface ComponentData {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  description: string | null;
  keywords: string[];
  category_name: string;
}

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
