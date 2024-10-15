import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Min 8 characters for a password is neccessary")
    .max(25, "no more than 25"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3).max(25),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Min 8 characters for a password is neccessary")
    .max(25, "no more than 25"),
});
