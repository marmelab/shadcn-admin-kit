import type { Category, Contact, Folder, Label } from "../types";

export interface SeedMessage {
  author: "contact" | "me";
  /** Hours before the generation time */
  hoursAgo: number;
  message: string;
}

export interface SeedThread {
  subject: string;
  contact: Contact;
  /** Other recipients of the messages, defaults to none */
  cc?: Contact[];
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
