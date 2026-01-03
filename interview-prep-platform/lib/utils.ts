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


export const getFingerprint = (req: Request) => {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const lang = req.headers.get("accept-language") || "unknown";

  return `${ip}:${ua}:${lang}`;
}
