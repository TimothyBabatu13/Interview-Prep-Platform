import * as z from "zod"; 
 
export const SignUpValidation = z.object({
  email: z.string().email("Email must be a valid email").min(1, "Email cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, 
  "Password must contain letters, numbers, and special characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export const SignInValidation = z.object({
  email: z.string().email("Email must be a valid email").min(1, "Email cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, 
  "Password must contain letters, numbers, and special characters"),
  });
