import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function thaidate(isodate: string) {
  const date = new Date(isodate);
  const options = { timeZone: "Asia/Bangkok", hour24: false };
  console.log(date.toLocaleString("th-TH", options));
  return date.toLocaleString("th-TH", options)
}
