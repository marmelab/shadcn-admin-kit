import type { Category, Folder, Label } from "../types";

export interface SeedMessage {
  author: "contact" | "me";
  /** Hours before the generation time */
  hoursAgo: number;
  message: string;
}

export interface SeedThread {
  subject: string;
  contact: { name: string; email: string };
  folder: Folder;
  /** Defaults to "primary" */
  category?: Category;
  labels?: Label[];
  /** Defaults to true */
  read?: boolean;
  starred?: boolean;
  muted?: boolean;
  messages: SeedMessage[];
}
