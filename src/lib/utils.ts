import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Normalizes a proper name: trims, collapses spaces, and capitalizes each word.
 *  "robert charlie" → "Robert Charlie" | "PEREZ" → "Perez" */
export function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
