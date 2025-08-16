import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.string().min(1, "Please select your age range"),
  occupation: z.string().min(2, "Please enter your occupation"),
});

export const step2Schema = z.object({
  primaryRole: z.enum(["developer", "designer", "manager", "student", "other"]),
  experienceLevel: z.enum(["0-1", "2-5", "6-10", "10+"]),
  techStack: z
    .array(z.string())
    .min(1, "Please select at least one technology"),
  workStyle: z.enum(["remote", "hybrid", "office", "freelance"]),
  learningPreferences: z
    .array(z.string())
    .min(1, "Please select at least one learning preference"),
  communicationStyle: z.enum([
    "direct",
    "collaborative",
    "analytical",
    "creative",
  ]),
  challenges: z
    .array(z.string())
    .min(1, "Please select at least one challenge"),
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
