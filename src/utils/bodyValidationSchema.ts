import { z } from "zod";

export const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Full name is required",
    }),
    username: z
      .string({
        required_error: "username is required",
      })
      .min(6, { message: "Minimum 6 characters are required" })
      .max(30, { message: "username should not be more than 30 characters" }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({ required_error: "Password is required" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must be at least 8 characters with one Uppercase, one lowercase, one special character and one number",
      }),
    address: z
      .string({ required_error: "Address is required" })
      .max(100, { message: "Address is too long" }),
    pincode: z
      .string({ required_error: "Pincode is required" })
      .min(6, { message: "Pincode is invalid" })
      .max(6, { message: "Pincode is invalid" }),
    country: z
      .string({ required_error: "Country is required" })
      .max(50, { message: "Country is too long" }),
  }),
});

export const userPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z
      .string({ required_error: "New Password is required" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must be at least 8 characters with one Uppercase, one lowercase, one special character and one number",
      }),
  }),
});
