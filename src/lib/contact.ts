import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[^\r\n]+$/),
  email: z
    .email()
    .max(254)
    .regex(/^[^\r\n]+$/),
  topic: z.enum(["project", "opportunity", "other"]),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  error?: "invalid" | "rateLimited" | "unavailable" | "failed";
};
