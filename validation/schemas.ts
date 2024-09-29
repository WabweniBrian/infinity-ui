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
  categoryType: z.enum(
    [
      "Landing_And_Marketing",
      "Dashboard",
      "SaaS",
      "Ecommerce",
      "Blogging",
      "Portfolio",
      "Forms_And_Authentication",
    ],
    {
      required_error: "Please select a category type.",
    },
  ),
});

// Components -------------------------------------------------------------------------------------------------------
const codeSnippetSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  extension: z.string().min(1, "File extension is required"),
  language: z.string().min(1, "Language is required"),
  code: z.string().min(1, "Code snippet is required"),
});

const dependencySchema = z.object({
  value: z.string().min(1, "Dependency is required"),
});

const stylingSchema = z.object({
  value: z.string().min(1, "Styling option is required"),
});

export const componentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  componentPath: z.string().min(1, "Component path is required"),
  dependencies: z
    .array(dependencySchema)
    .min(1, "At least one dependency is required"),
  styling: z
    .array(stylingSchema)
    .min(1, "At least one styling option is required"),
  codeSnippets: z
    .array(codeSnippetSchema)
    .min(1, "At least one code snippet is required"),
});
