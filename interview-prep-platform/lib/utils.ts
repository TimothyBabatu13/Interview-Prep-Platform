import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatZodError = (error: ZodError) => {
  return error.issues.map((e) => {
    return `${e.message}`;
  }).join("\n");
};