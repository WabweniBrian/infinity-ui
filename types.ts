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
