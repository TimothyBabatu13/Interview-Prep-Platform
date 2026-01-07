import { MAX_RESUME_FILE_SIZE } from "@/constants/constants";
import { z } from "zod";

export const UPLOAD_RESUME_FILE_VALIDATION = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "application/pdf",
      ].includes(file.type),
    { message: "File format can only be in pdf format" }
  ).refine((file) => file.size <= MAX_RESUME_FILE_SIZE, {
    message: "File size should not exceed 5MB",
  });