import { Pack, PaymentStatus } from "@prisma/client";
import * as z from "zod";

// User Registration Schema ---------------------------------------------------------------------------------------------------------------
export const userRegistrationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

// Profile Update Schema ---------------------------------------------------------------------------------------------------------------
export const profileUpdateSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
});

// User Login Schema ---------------------------------------------------------------------------------------------------------------
export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  password: z.string({ required_error: "Password is required" }),
});

// Forgot Password Schema ---------------------------------------------------------------------------------------------------------------
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email adddress"),
});

// Reset Password Schema ---------------------------------------------------------------------------------------------------------------
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: "New Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User Profile Edit Schema ---------------------------------------------------------------------------------------------------------------
export const userProfileSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
});

// Change Password Schema ---------------------------------------------------------------------------------------------------------------
export const changePasswordSchema = z
  .object({
    currentPassword: z.string({
      required_error: "Current Password is required",
    }),
    newPassword: z
      .string({ required_error: "New Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User  Schema ---------------------------------------------------------------------------------------------------------------
export const userSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(3),
    email: z
      .string({ required_error: "Email address is required" })
      .email("Invalid email address"),
    role: z.string({ required_error: "Please select a role" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User Update Schema ---------------------------------------------------------------------------------------------------------------
export const userUpdateSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  role: z.string({ required_error: "Please select a role" }),
});

// Category Schema -------------------------------------------------------------------------------------------------
export const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

// Components -------------------------------------------------------------------------------------------------------
const codeSnippetSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  extension: z.string().min(1, "File extension is required"),
  language: z.string().min(1, "Language is required"),
  code: z.string().min(1, "Code snippet is required"),
});

export const componentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  isfree: z.boolean().default(true),
  categoryId: z.string().uuid("Invalid category ID"),
  componentPath: z.string().min(1, "Component path is required"),
  codeSnippets: z
    .array(codeSnippetSchema)
    .min(1, "At least one code snippet is required"),
});

// Notification schema for validation
export const notificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  type: z.string().min(1, "Type is required"),
  userId: z.string().optional(),
  isAdmin: z.boolean().default(false),
});

// Create Purchase Schema ---------------------------------------------------------------------------------------------------------------
export const createPurchaseSchema = z.object({
  userId: z.string().min(1, "User is required"),
  componentId: z.string().optional(),
  isBundle: z.boolean().default(false),
  isPack: z.boolean().default(false),
  isComponent: z.boolean().default(false),
  pack: z.nativeEnum(Pack).optional().nullable(),
  amount: z.number().min(0, "Amount must be a positive number"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.nativeEnum(PaymentStatus).default("PENDING"),
  zipCode: z.string().optional(),
  paymentProvider: z.string().optional(),
});

// Update Purchase Schema ---------------------------------------------------------------------------------------------------------------
export const updatePurchaseSchema = z.object({
  userId: z.string().min(1, "User is required"),
  componentId: z.string().optional(),
  isBundle: z.boolean().optional(),
  isPack: z.boolean().optional(),
  isComponent: z.boolean().optional(),
  pack: z.nativeEnum(Pack).optional().nullable(),
  amount: z.number().min(0, "Amount must be a positive number").optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.nativeEnum(PaymentStatus).optional(),
  zipCode: z.string().optional(),
  paymentProvider: z.string().optional(),
});

// Update Purchase Status Schema ---------------------------------------------------------------------------------------------------------------
export const updateStatusSchema = z.object({
  status: z.nativeEnum(PaymentStatus),
});
