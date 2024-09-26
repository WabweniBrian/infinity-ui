import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userLoginSchema,
  userProfileSchema,
  userRegistrationSchema,
} from "@/validation/schemas";
import * as z from "zod";

// --------------------------- FORMS TYPES--------------------------------------------------------------------------------------
export type UserRegistrationSchemaType = z.infer<typeof userRegistrationSchema>;
export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;
export type PasswordChangeSchemaType = z.infer<typeof changePasswordSchema>;
